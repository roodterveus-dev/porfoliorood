import { motion } from "framer-motion";
import { usePortfolioData } from "../context/PortfolioDataContext";
import { useLanguage } from "../context/LanguageContext";

export default function About() {
  const { t, pick } = useLanguage();
  const { about } = usePortfolioData();

  return (
    <section id="about" className="px-6 py-24 max-w-3xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-semibold text-text mb-6"
      >
        {t.headings.about}
      </motion.h2>

      <div className="space-y-4">
        {about.bio.map((paragraph, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="text-muted leading-relaxed"
          >
            {pick(paragraph)}
          </motion.p>
        ))}
      </div>

      {about.closing && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: about.bio.length * 0.1 }}
          className="mt-6 text-text font-medium"
        >
          {pick(about.closing)}
        </motion.p>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8 flex flex-wrap gap-2"
      >
        {about.skills.map((skill) => (
          <span
            key={skill}
            className="glass px-3 py-1 rounded-full text-sm text-muted"
          >
            {skill}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
