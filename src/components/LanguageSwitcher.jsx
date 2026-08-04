import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext";
import { languageLabels } from "../i18n/translations";
import FlagIcon from "./FlagIcon";

const order = ["en", "fr", "ht"];

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="glass glass-hover flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full text-sm font-medium text-text"
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
            className="glass absolute right-0 mt-2 w-40 rounded-xl p-1.5 z-20 origin-top-right"
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
                  className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-colors ${
                    language === code
                      ? "bg-accent text-white"
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
