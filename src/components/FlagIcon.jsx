// Emoji flags don't render as flags on Windows (falls back to letter codes),
// so these are small hand-drawn SVGs to guarantee a consistent look everywhere.
const flags = {
  en: (
    <svg viewBox="0 0 24 16" className="w-full h-full">
      <rect width="24" height="16" fill="#B22234" />
      {[0, 2, 4, 6, 8, 10, 12].map((y) => (
        <rect key={y} y={y} width="24" height="1.23" fill="#fff" />
      ))}
      <rect width="10" height="8.6" fill="#3C3B6E" />
    </svg>
  ),
  fr: (
    <svg viewBox="0 0 24 16" className="w-full h-full">
      <rect width="8" height="16" fill="#0055A4" />
      <rect x="8" width="8" height="16" fill="#fff" />
      <rect x="16" width="8" height="16" fill="#EF4135" />
    </svg>
  ),
  ht: (
    <svg viewBox="0 0 24 16" className="w-full h-full">
      <rect width="24" height="8" fill="#00209F" />
      <rect y="8" width="24" height="8" fill="#D21034" />
    </svg>
  ),
};

export default function FlagIcon({ code }) {
  return (
    <span className="inline-block w-5 h-3.5 rounded-[2px] overflow-hidden shadow-sm">
      {flags[code]}
    </span>
  );
}
