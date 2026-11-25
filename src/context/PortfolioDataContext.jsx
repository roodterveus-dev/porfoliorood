import { createContext, useContext, useEffect, useState } from "react";
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
    let cancelled = false;
    let unsubscribe = () => {};

    // Firestore is large, so load it after the static content has rendered.
    Promise.all([import("firebase/firestore"), import("../firebase")])
      .then(([{ doc, onSnapshot }, { db }]) => {
        if (cancelled) return;
        unsubscribe = onSnapshot(
          doc(db, ...CONTENT_DOC_PATH),
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
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
      unsubscribe();
    };
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
