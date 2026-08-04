export function TextField({ label, value, onChange, type = "text" }) {
  return (
    <label className="block space-y-1">
      <span className="text-sm text-muted">{label}</span>
      <input
        type={type}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg bg-surface border border-border px-3 py-2 outline-none focus:border-accent text-sm"
      />
    </label>
  );
}

export function TextAreaField({ label, value, onChange }) {
  return (
    <label className="block space-y-1">
      <span className="text-sm text-muted">{label}</span>
      <textarea
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full rounded-lg bg-surface border border-border px-3 py-2 outline-none focus:border-accent text-sm resize-y"
      />
    </label>
  );
}

// Editor for the { en, fr, ht } translatable-string shape used throughout portfolio.js.
export function TranslatableField({ label, value, onChange, multiline }) {
  const val = value ?? { en: "", fr: "", ht: "" };
  const Field = multiline ? TextAreaField : TextField;
  return (
    <div className="space-y-2">
      <span className="text-sm text-muted">{label}</span>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {["en", "fr", "ht"].map((lang) => (
          <Field
            key={lang}
            label={lang.toUpperCase()}
            value={val[lang]}
            onChange={(next) => onChange({ ...val, [lang]: next })}
          />
        ))}
      </div>
    </div>
  );
}

export function TagsField({ label, value, onChange }) {
  return (
    <TextField
      label={`${label} (comma-separated)`}
      value={(value ?? []).join(", ")}
      onChange={(next) =>
        onChange(
          next
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        )
      }
    />
  );
}
