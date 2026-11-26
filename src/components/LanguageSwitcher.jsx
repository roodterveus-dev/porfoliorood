import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext";
import { languageLabels } from "../i18n/translations";
import FlagIcon from "./FlagIcon";

const order = ["en", "fr", "ht"];

// Mobile menu: plain buttons, no popover, so nothing can be clipped or
// covered and every option is a single tap.
function InlineLanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  return (
    <div role="group" aria-label="Language" className="join">
      {order.map((code) => (
        <button
          key={code}
          type="button"
          aria-pressed={language === code}
          aria-label={languageLabels[code]}
          onClick={() => setLanguage(code)}
          className={`join-item btn btn-sm h-10 gap-1.5 px-3 ${
            language === code ? "btn-primary" : "btn-ghost border-border"
          }`}
        >
          <FlagIcon code={code} />
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export default function LanguageSwitcher({ inline = false }) {
  if (inline) return <InlineLanguageSwitcher />;
  return <DropdownLanguageSwitcher />;
}

function DropdownLanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onClickOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onClickOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="btn btn-ghost rounded-full gap-2 px-3 font-medium text-text"
      >
        <FlagIcon code={language} />
        <span>{languageLabels[language]}</span>
        <FiChevronDown
          size={14}
          className={`text-muted transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="glass absolute left-0 lg:left-auto lg:right-0 mt-2 w-40 rounded-xl p-1.5 z-20 origin-top-left lg:origin-top-right"
          >
            {order.map((code) => (
              <li key={code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={language === code}
                  onClick={() => {
                    setLanguage(code);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    language === code
                      ? "bg-accent text-on-accent"
                      : "text-text hover:bg-bg/60"
                  }`}
                >
                  <FlagIcon code={code} />
                  {languageLabels[code]}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
