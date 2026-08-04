import { motion } from "framer-motion";
import { projects } from "../data/portfolio";
import ProjectCard from "./ProjectCard";
import { useLanguage } from "../context/LanguageContext";

export default function Projects() {
  const { t } = useLanguage();

  return (
    <section id="projects" className="px-6 py-24 max-w-5xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-semibold text-text mb-10 text-left"
      >
        {t.headings.projects}
      </motion.h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
