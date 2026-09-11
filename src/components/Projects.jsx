import { motion } from "framer-motion";
import { usePortfolioData } from "../context/PortfolioDataContext";
import ProjectCard from "./ProjectCard";
import { useLanguage } from "../context/LanguageContext";

export default function Projects() {
  const { projects } = usePortfolioData();
  const { t } = useLanguage();

  return (
    <section id="projects" className="px-6 py-24 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 mb-10"
      >
        <span className="w-8 h-0.5 rounded-full bg-accent" aria-hidden />
        <h2 className="text-2xl font-semibold text-text">{t.headings.projects}</h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
