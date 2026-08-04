import { createContext, useContext, useEffect, useState } from "react";
import { translations } from "../i18n/translations";

const LanguageContext = createContext(null);

const STORAGE_KEY = "portfolio-language";
const SUPPORTED = ["en", "fr", "ht"];

function getInitialLanguage() {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return SUPPORTED.includes(stored) ? stored : "en";
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const t = translations[language];

  // pick(field) resolves a { en, fr, ht } content object to the current
  // language's string, falling back to English if a translation is missing.
  const pick = (field) => {
    if (field == null) return field;
    if (typeof field === "string") return field;
    return field[language] ?? field.en ?? "";
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, pick }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
