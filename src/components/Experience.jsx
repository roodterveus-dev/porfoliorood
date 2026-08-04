import { motion } from "framer-motion";
import { usePortfolioData } from "../context/PortfolioDataContext";
import { useLanguage } from "../context/LanguageContext";

export default function Experience() {
  const { experience } = usePortfolioData();
  const { t, pick } = useLanguage();

  return (
    <section id="experience" className="px-6 py-24 max-w-3xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-semibold text-text mb-10 text-left"
      >
        {t.headings.experience}
      </motion.h2>

      <div className="space-y-10">
        {experience.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="glass glass-hover flex flex-col sm:flex-row gap-5 text-left rounded-xl p-4"
          >
            <div className="sm:w-40 shrink-0 aspect-video sm:aspect-square rounded-lg overflow-hidden bg-surface border border-border">
              {item.image ? (
                <img
                  src={item.image}
                  alt={pick(item.role)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted text-xs">
                  {t.project.imageComingSoon}
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <h3 className="font-semibold text-text">{pick(item.role)}</h3>
                <span className="text-xs text-muted whitespace-nowrap">
                  {item.dateLabel}
                </span>
              </div>
              <p className="text-sm text-accent mt-0.5">{item.org}</p>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                {pick(item.description)}
              </p>

              {item.tags?.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-full bg-bg border border-border text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
