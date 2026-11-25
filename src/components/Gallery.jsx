import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import { usePortfolioData } from "../context/PortfolioDataContext";
import { useLanguage } from "../context/LanguageContext";

const CATEGORIES = ["usfah", "field", "other"];
const categoryOf = (item) =>
  CATEGORIES.includes(item.category) ? item.category : "other";

export default function Gallery() {
  const { gallery } = usePortfolioData();
  const [active, setActive] = useState(null);
  const [filter, setFilter] = useState("all");
  const { t, pick } = useLanguage();

  // Only offer filters that have photos in them.
  const filters = [
    "all",
    ...CATEGORIES.filter((c) => gallery.some((item) => categoryOf(item) === c)),
  ];
  const visible =
    filter === "all" ? gallery : gallery.filter((item) => categoryOf(item) === filter);

  // Lightbox: close on Escape and stop the page scrolling behind it.
  useEffect(() => {
    if (!active) return;
    const onKey = (e) => e.key === "Escape" && setActive(null);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <section id="gallery" className="px-6 py-24 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 mb-6"
      >
        <span className="w-8 h-0.5 rounded-full bg-accent" aria-hidden />
        <h2 className="font-display text-3xl font-bold tracking-tight text-text">{t.headings.gallery}</h2>
      </motion.div>

      {filters.length > 2 && (
        <div role="group" aria-label={t.headings.gallery} className="flex flex-wrap gap-2 mb-8">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={`btn btn-sm rounded-full px-4 ${
                filter === f
                  ? "btn-primary"
                  : "btn-outline border-border text-muted hover:border-accent hover:bg-transparent hover:text-accent"
              }`}
            >
              {t.galleryFilters[f]}
            </button>
          ))}
        </div>
      )}

      <div className="columns-2 sm:columns-3 gap-4">
        {visible.map((item, i) => (
          <motion.button
            key={item.id}
            type="button"
            onClick={() => setActive(item)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: Math.min(i, 5) * 0.06 }}
            className="glass glass-hover group block w-full mb-4 break-inside-avoid overflow-hidden rounded-xl cursor-zoom-in"
          >
            <img
              src={item.image}
              alt={pick(item.caption)}
              loading="lazy"
              decoding="async"
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={pick(active.caption)}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-6 cursor-zoom-out"
          >
            <button
              type="button"
              autoFocus
              aria-label="Close"
              onClick={() => setActive(null)}
              className="absolute top-4 right-4 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <FiX size={20} />
            </button>
            <motion.figure
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="max-w-3xl w-full"
            >
              <img
                src={active.image}
                alt={pick(active.caption)}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
              <figcaption className="mt-3 text-center text-sm text-white/80">
                {pick(active.caption)}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
