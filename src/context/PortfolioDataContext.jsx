import { createContext, useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import * as defaults from "../data/portfolio";

export const CONTENT_DOC_PATH = ["content", "site"];

export const defaultContent = {
  profile: defaults.profile,
  about: defaults.about,
  projects: defaults.projects,
  experience: defaults.experience,
  gallery: defaults.gallery,
  socials: defaults.socials,
};

const PortfolioDataContext = createContext({
  ...defaultContent,
  loading: true,
});

export function PortfolioDataProvider({ children }) {
  const [content, setContent] = useState(defaultContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ref = doc(db, ...CONTENT_DOC_PATH);
    const unsubscribe = onSnapshot(
      ref,
      (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          setContent({
            profile: data.profile ?? defaults.profile,
            about: data.about ?? defaults.about,
            projects: data.projects ?? defaults.projects,
            experience: data.experience ?? defaults.experience,
            gallery: data.gallery ?? defaults.gallery,
            socials: data.socials ?? defaults.socials,
          });
        } else {
          setContent(defaultContent);
        }
        setLoading(false);
      },
      () => {
        // No read access yet, or offline — fall back to the static defaults.
        setContent(defaultContent);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, []);

  return (
    <PortfolioDataContext.Provider value={{ ...content, loading }}>
      {children}
    </PortfolioDataContext.Provider>
  );
}

export function usePortfolioData() {
  return useContext(PortfolioDataContext);
}
