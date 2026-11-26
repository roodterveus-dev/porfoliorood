import { useEffect, useRef, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { CONTENT_DOC_PATH } from "../context/PortfolioDataContext";
import { defaultContent } from "../context/PortfolioDataContext";
import { TextField, TranslatableField, TagsField } from "./fields";

const TABS = ["Profile", "About", "Projects", "Experience", "Gallery", "Socials"];

export default function Dashboard() {
  const { logout } = useAuth();
  const [data, setData] = useState(null);
  const [tab, setTab] = useState("Profile");
  const [status, setStatus] = useState("");
  const [loadFailed, setLoadFailed] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const statusTimer = useRef();
  // Bumped on every edit so a slow save can't mark newer edits as saved.
  const revision = useRef(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const snap = await getDoc(doc(db, ...CONTENT_DOC_PATH));
        if (cancelled) return;
        setData(snap.exists() ? { ...defaultContent, ...snap.data() } : defaultContent);
      } catch {
        // Never fall back to defaults here: saving them would overwrite real content.
        if (!cancelled) setLoadFailed(true);
      }
    })();
    return () => {
      cancelled = true;
      clearTimeout(statusTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!dirty) return;
    const warn = (e) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  function updateSection(key, value) {
    revision.current += 1;
    setDirty(true);
    setData((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    const savedRevision = revision.current;
    clearTimeout(statusTimer.current);
    setSaving(true);
    setStatus("Saving…");
    try {
      await setDoc(doc(db, ...CONTENT_DOC_PATH), data);
      if (revision.current === savedRevision) setDirty(false);
      setStatus("Saved.");
      statusTimer.current = setTimeout(() => setStatus(""), 3000);
    } catch {
      // Stays visible until the next save attempt.
      setStatus("Save failed — your edits are still here. Check your connection and try again.");
    } finally {
      setSaving(false);
    }
  }

  function handleLogout() {
    if (dirty && !window.confirm("You have unsaved changes. Log out anyway?")) return;
    logout();
  }

  if (loadFailed) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-bg text-text px-6 text-center">
        <p>Couldn't load the site content. Nothing has been changed.</p>
        <button
          onClick={() => window.location.reload()}
          className="rounded-lg border border-border text-sm px-4 py-2"
        >
          Try again
        </button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg text-text">
        Loading…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg text-text">
      <header className="sticky top-0 z-10 glass px-6 py-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-lg font-semibold">Portfolio Admin</h1>
        <div className="flex flex-wrap items-center gap-3">
          <a href="/" className="text-sm text-muted hover:text-accent">
            View site
          </a>
          <button
            onClick={handleSave}
            disabled={saving || !dirty}
            className="rounded-lg bg-accent text-on-accent text-sm font-medium px-4 py-2 disabled:opacity-50"
          >
            {saving ? "Saving…" : dirty ? "Save changes" : "Saved"}
          </button>
          <button
            onClick={handleLogout}
            className="rounded-lg border border-border text-sm px-4 py-2"
          >
            Log out
          </button>
        </div>
      </header>

      {status && (
        <div role="status" className="px-6 py-2 text-sm text-accent-2">{status}</div>
      )}

      <div className="px-6 py-4 flex gap-2 flex-wrap border-b border-border">
        {TABS.map((name) => (
          <button
            key={name}
            onClick={() => setTab(name)}
            className={`rounded-full px-4 py-1.5 text-sm border ${
              tab === name
                ? "bg-accent text-on-accent border-accent"
                : "border-border text-muted hover:text-text"
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      <main className="px-6 py-8 max-w-3xl mx-auto space-y-8">
        {tab === "Profile" && (
          <ProfileEditor value={data.profile} onChange={(v) => updateSection("profile", v)} />
        )}
        {tab === "About" && (
          <AboutEditor value={data.about} onChange={(v) => updateSection("about", v)} />
        )}
        {tab === "Projects" && (
          <ListEditor
            items={data.projects}
            onChange={(v) => updateSection("projects", v)}
            itemLabel="Project"
            emptyItem={emptyProject}
            renderFields={ProjectFields}
          />
        )}
        {tab === "Experience" && (
          <ListEditor
            items={data.experience}
            onChange={(v) => updateSection("experience", v)}
            itemLabel="Experience"
            emptyItem={emptyExperience}
            renderFields={ExperienceFields}
          />
        )}
        {tab === "Gallery" && (
          <ListEditor
            items={data.gallery}
            onChange={(v) => updateSection("gallery", v)}
            itemLabel="Photo"
            emptyItem={emptyGalleryItem}
            renderFields={GalleryFields}
          />
        )}
        {tab === "Socials" && (
          <ListEditor
            items={data.socials}
            onChange={(v) => updateSection("socials", v)}
            itemLabel="Social link"
            emptyItem={emptySocial}
            renderFields={SocialFields}
          />
        )}
      </main>
    </div>
  );
}

function ProfileEditor({ value, onChange }) {
  const set = (key) => (v) => onChange({ ...value, [key]: v });
  return (
    <div className="space-y-4">
      <TextField label="Name" value={value.name} onChange={set("name")} />
      <TranslatableField label="Role" value={value.role} onChange={set("role")} />
      <TranslatableField
        label="Tagline"
        value={value.tagline}
        onChange={set("tagline")}
        multiline
      />
      <TextField label="Avatar path/URL" value={value.avatar} onChange={set("avatar")} />
      <TextField label="Resume URL" value={value.resumeUrl} onChange={set("resumeUrl")} />
      <TextField label="Location" value={value.location} onChange={set("location")} />
      <TextField label="Email" value={value.email} onChange={set("email")} />
    </div>
  );
}

function AboutEditor({ value, onChange }) {
  const bio = value.bio ?? [];

  function updateParagraph(i, v) {
    const next = [...bio];
    next[i] = v;
    onChange({ ...value, bio: next });
  }
  function addParagraph() {
    onChange({ ...value, bio: [...bio, { en: "", fr: "", ht: "" }] });
  }
  function removeParagraph(i) {
    onChange({ ...value, bio: bio.filter((_, idx) => idx !== i) });
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <span className="text-sm text-muted">Bio paragraphs</span>
        {bio.map((p, i) => (
          <div key={i} className="rounded-xl border border-border p-4 space-y-2">
            <TranslatableField
              label={`Paragraph ${i + 1}`}
              value={p}
              onChange={(v) => updateParagraph(i, v)}
              multiline
            />
            <button
              onClick={() => removeParagraph(i)}
              className="text-sm text-red-400"
            >
              Remove paragraph
            </button>
          </div>
        ))}
        <button
          onClick={addParagraph}
          className="rounded-lg border border-border text-sm px-4 py-2"
        >
          + Add paragraph
        </button>
      </div>

      <TranslatableField
        label="Closing line"
        value={value.closing}
        onChange={(v) => onChange({ ...value, closing: v })}
      />
      <TagsField
        label="Skills"
        value={value.skills}
        onChange={(v) => onChange({ ...value, skills: v })}
      />
    </div>
  );
}

function ListEditor({ items, onChange, itemLabel, emptyItem, renderFields: Fields }) {
  function updateItem(i, v) {
    const next = [...items];
    next[i] = v;
    onChange(next);
  }
  function removeItem(i) {
    onChange(items.filter((_, idx) => idx !== i));
  }
  function addItem() {
    onChange([...items, emptyItem()]);
  }
  function move(i, dir) {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  }

  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={i} className="rounded-xl border border-border p-4 space-y-3">
          <Fields value={item} onChange={(v) => updateItem(i, v)} />
          <div className="flex gap-3 text-sm pt-1">
            <button onClick={() => move(i, -1)} className="text-muted hover:text-text">
              Move up
            </button>
            <button onClick={() => move(i, 1)} className="text-muted hover:text-text">
              Move down
            </button>
            <button onClick={() => removeItem(i)} className="text-red-400">
              Remove {itemLabel.toLowerCase()}
            </button>
          </div>
        </div>
      ))}
      <button
        onClick={addItem}
        className="rounded-lg border border-border text-sm px-4 py-2"
      >
        + Add {itemLabel.toLowerCase()}
      </button>
    </div>
  );
}

function ProjectFields({ value, onChange }) {
  const set = (key) => (v) => onChange({ ...value, [key]: v });
  return (
    <>
      <TextField label="ID (unique slug)" value={value.id} onChange={set("id")} />
      <TextField label="Title" value={value.title} onChange={set("title")} />
      <TranslatableField
        label="Description"
        value={value.description}
        onChange={set("description")}
        multiline
      />
      <TextField label="Image path/URL" value={value.image} onChange={set("image")} />
      <TextField label="Date (YYYY-MM)" value={value.date} onChange={set("date")} />
      <TextField label="Date label (overrides Date)" value={value.dateLabel} onChange={set("dateLabel")} />
      <TagsField label="Tags" value={value.tags} onChange={set("tags")} />
      <TextField label="Live URL" value={value.liveUrl} onChange={set("liveUrl")} />
      <TextField label="Repo URL" value={value.repoUrl} onChange={set("repoUrl")} />
    </>
  );
}

function ExperienceFields({ value, onChange }) {
  const set = (key) => (v) => onChange({ ...value, [key]: v });
  return (
    <>
      <TextField label="ID (unique slug)" value={value.id} onChange={set("id")} />
      <TranslatableField label="Role" value={value.role} onChange={set("role")} />
      <TextField label="Organization" value={value.org} onChange={set("org")} />
      <TextField label="Date label" value={value.dateLabel} onChange={set("dateLabel")} />
      <TranslatableField
        label="Description"
        value={value.description}
        onChange={set("description")}
        multiline
      />
      <TextField label="Image path/URL" value={value.image} onChange={set("image")} />
      <TagsField label="Tags" value={value.tags} onChange={set("tags")} />
    </>
  );
}

function GalleryFields({ value, onChange }) {
  const set = (key) => (v) => onChange({ ...value, [key]: v });
  return (
    <>
      <TextField label="ID (unique slug)" value={value.id} onChange={set("id")} />
      <TextField label="Image path/URL" value={value.image} onChange={set("image")} />
      <label className="block space-y-1">
        <span className="text-sm text-muted">Category</span>
        <select
          value={value.category ?? "other"}
          onChange={(e) => set("category")(e.target.value)}
          className="w-full rounded-lg bg-surface border border-border px-3 py-2 outline-none focus:border-accent text-sm"
        >
          <option value="usfah">USFAH Media</option>
          <option value="field">On site</option>
          <option value="other">Other</option>
        </select>
      </label>
      <TranslatableField label="Caption" value={value.caption} onChange={set("caption")} />
    </>
  );
}

function SocialFields({ value, onChange }) {
  const set = (key) => (v) => onChange({ ...value, [key]: v });
  return (
    <>
      <TextField label="Name" value={value.name} onChange={set("name")} />
      <TextField label="URL" value={value.url} onChange={set("url")} />
      <TextField label="Icon (github, linkedin, x, instagram, facebook, tiktok, youtube, email, whatsapp)" value={value.icon} onChange={set("icon")} />
    </>
  );
}

const emptyProject = () => ({
  id: crypto.randomUUID(),
  title: "",
  description: { en: "", fr: "", ht: "" },
  image: "",
  date: "",
  tags: [],
  liveUrl: "",
  repoUrl: "",
});

const emptyExperience = () => ({
  id: crypto.randomUUID(),
  role: { en: "", fr: "", ht: "" },
  org: "",
  dateLabel: "",
  description: { en: "", fr: "", ht: "" },
  image: "",
  tags: [],
});

const emptyGalleryItem = () => ({
  id: crypto.randomUUID(),
  image: "",
  category: "other",
  caption: { en: "", fr: "", ht: "" },
});

const emptySocial = () => ({ name: "", url: "", icon: "" });
