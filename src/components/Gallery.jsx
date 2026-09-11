import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePortfolioData } from "../context/PortfolioDataContext";
import { useLanguage } from "../context/LanguageContext";

export default function Gallery() {
  const { gallery } = usePortfolioData();
  const [active, setActive] = useState(null);
  const { t, pick } = useLanguage();

  return (
    <section id="gallery" className="px-6 py-24 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 mb-10"
      >
        <span className="w-8 h-0.5 rounded-full bg-accent" aria-hidden />
        <h2 className="text-2xl font-semibold text-text">{t.headings.gallery}</h2>
      </motion.div>

      <div className="columns-2 sm:columns-3 gap-4 space-y-4">
        {gallery.map((item, i) => (
          <motion.button
            key={item.id}
            type="button"
            onClick={() => setActive(item)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="glass glass-hover group block w-full break-inside-avoid overflow-hidden rounded-xl cursor-zoom-in"
          >
            <img
              src={item.image}
              alt={pick(item.caption)}
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
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-6 cursor-zoom-out"
          >
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
                className="w-full h-auto rounded-lg"
              />
              <figcaption className="mt-3 text-center text-sm text-muted">
                {pick(active.caption)}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
