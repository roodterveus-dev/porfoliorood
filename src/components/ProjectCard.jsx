import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

function formatDate(date, language) {
  if (!date) return null;
  const [year, month] = date.split("-").map(Number);
  if (!year) return date;
  if (!month) return String(year);
  return new Date(year, month - 1).toLocaleDateString(language, {
    month: "short",
    year: "numeric",
  });
}

export default function ProjectCard({ project, index }) {
  const { title, description, image, date, dateLabel, tags, liveUrl, repoUrl } =
    project;
  const { t, pick, language } = useLanguage();

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="glass glass-hover group rounded-xl overflow-hidden"
    >
      <div className="aspect-video bg-bg overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted text-sm">
            {t.project.imageComingSoon}
          </div>
        )}
      </div>

      <div className="p-5 text-left">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-semibold leading-snug text-text">{title}</h3>
          {(dateLabel || date) && (
            <span className="text-xs text-muted whitespace-nowrap">
              {dateLabel || formatDate(date, language)}
            </span>
          )}
        </div>

        <p className="mt-2 text-sm text-muted leading-relaxed">
          {pick(description)}
        </p>

        {tags?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="badge badge-sm badge-outline border-border text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {(liveUrl || repoUrl) && (
          <div className="mt-3 -ml-3 flex flex-wrap gap-1">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost text-accent"
              >
                {t.project.live}
              </a>
            )}
            {repoUrl && (
              <a
                href={repoUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost text-accent"
              >
                {t.project.code}
              </a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}
