import { useEffect, useState } from "react";
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

  useEffect(() => {
    (async () => {
      const ref = doc(db, ...CONTENT_DOC_PATH);
      const snap = await getDoc(ref);
      setData(snap.exists() ? { ...defaultContent, ...snap.data() } : defaultContent);
    })();
  }, []);

  function updateSection(key, value) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    setStatus("Saving…");
    try {
      await setDoc(doc(db, ...CONTENT_DOC_PATH), data);
      setStatus("Saved.");
    } catch {
      setStatus("Save failed — check your connection and try again.");
    }
    setTimeout(() => setStatus(""), 3000);
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
      <header className="sticky top-0 z-10 glass px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">Portfolio Admin</h1>
        <div className="flex items-center gap-3">
          <a href="/" className="text-sm text-muted hover:text-accent">
            View site
          </a>
          <button
            onClick={handleSave}
            className="rounded-lg bg-accent text-white text-sm font-medium px-4 py-2"
          >
            Save changes
          </button>
          <button
            onClick={logout}
            className="rounded-lg border border-border text-sm px-4 py-2"
          >
            Log out
          </button>
        </div>
      </header>

      {status && (
        <div className="px-6 py-2 text-sm text-accent-2">{status}</div>
      )}

      <div className="px-6 py-4 flex gap-2 flex-wrap border-b border-border">
        {TABS.map((name) => (
          <button
            key={name}
            onClick={() => setTab(name)}
            className={`rounded-full px-4 py-1.5 text-sm border ${
              tab === name
                ? "bg-accent text-white border-accent"
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
      <TextField label="Icon (github, linkedin, email, whatsapp)" value={value.icon} onChange={set("icon")} />
    </>
  );
}

const emptyProject = () => ({
  id: "",
  title: "",
  description: { en: "", fr: "", ht: "" },
  image: "",
  date: "",
  tags: [],
  liveUrl: "",
  repoUrl: "",
});

const emptyExperience = () => ({
  id: "",
  role: { en: "", fr: "", ht: "" },
  org: "",
  dateLabel: "",
  description: { en: "", fr: "", ht: "" },
  image: "",
  tags: [],
});

const emptyGalleryItem = () => ({
  id: "",
  image: "",
  caption: { en: "", fr: "", ht: "" },
});

const emptySocial = () => ({ name: "", url: "", icon: "" });
