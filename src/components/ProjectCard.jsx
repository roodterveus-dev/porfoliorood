import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

function formatDate(date) {
  if (!date) return null;
  const [year, month] = date.split("-");
  const d = new Date(Number(year), Number(month) - 1);
  return d.toLocaleDateString(undefined, { month: "short", year: "numeric" });
}

export default function ProjectCard({ project, index }) {
  const { title, description, image, date, dateLabel, tags, liveUrl, repoUrl } =
    project;
  const { t, pick } = useLanguage();

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
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted text-sm">
            {t.project.imageComingSoon}
          </div>
        )}
      </div>

      <div className="p-5 text-left">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold text-text">{title}</h3>
          {(dateLabel || date) && (
            <span className="text-xs text-muted whitespace-nowrap">
              {dateLabel || formatDate(date)}
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
                className="text-xs px-2 py-1 rounded-full bg-bg border border-border text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {(liveUrl || repoUrl) && (
          <div className="mt-4 flex gap-4 text-sm">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noreferrer"
                className="text-accent hover:underline"
              >
                {t.project.live}
              </a>
            )}
            {repoUrl && (
              <a
                href={repoUrl}
                target="_blank"
                rel="noreferrer"
                className="text-accent hover:underline"
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
