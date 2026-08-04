import { motion } from "framer-motion";
import { profile } from "../data/portfolio";
import { useLanguage } from "../context/LanguageContext";

export default function Hero() {
  const { t, pick } = useLanguage();

  return (
    <section
      id="top"
      className="min-h-screen flex items-center px-6 relative overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_20%,color-mix(in_oklab,var(--color-accent)_15%,transparent),transparent_60%)]"
      />

      <div className="max-w-5xl mx-auto w-full grid md:grid-cols-2 items-center gap-12">
        <div className="text-center md:text-left order-2 md:order-1">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-semibold tracking-tight text-text"
          >
            {profile.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 text-lg text-accent font-medium"
          >
            {pick(profile.role)}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-5 max-w-xl mx-auto md:mx-0 text-muted"
          >
            {pick(profile.tagline)}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex items-center justify-center md:justify-start gap-4"
          >
            <a
              href="#projects"
              className="px-5 py-2.5 rounded-full bg-accent text-white text-sm font-medium hover:opacity-90 transition-opacity"
            >
              {t.hero.viewProjects}
            </a>
            <a
              href="#contact"
              className="glass glass-hover px-5 py-2.5 rounded-full text-sm font-medium text-text"
            >
              {t.hero.getInTouch}
            </a>
          </motion.div>
        </div>

        {profile.avatar && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="order-1 md:order-2 flex justify-center md:justify-end"
          >
            <img
              src={profile.avatar}
              alt={profile.name}
              onError={(e) => (e.currentTarget.style.display = "none")}
              className="w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 rounded-full object-cover border border-border"
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}
