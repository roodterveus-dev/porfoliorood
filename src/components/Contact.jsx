import { useState } from "react";
import { motion } from "framer-motion";
import { FaLinkedin } from "react-icons/fa";
import { usePortfolioData } from "../context/PortfolioDataContext";
import { useLanguage } from "../context/LanguageContext";

// No backend in this project yet, so submitting opens the visitor's email
// client with the message prefilled. Swap this for a form service (Formspree,
// EmailJS) or your own API endpoint when you're ready to wire one up.
export default function Contact() {
  const { profile, socials } = usePortfolioData();
  const linkedin = socials.find((s) => s.icon === "linkedin");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const { t } = useLanguage();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = t.contact.errorName;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = t.contact.errorEmail;
    if (!form.message.trim()) next.message = t.contact.errorMessage;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`);
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name} (${form.email})`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  const fieldClasses =
    "w-full rounded-lg bg-bg/40 border border-border px-4 py-2.5 text-text placeholder:text-muted focus:outline-none focus:border-accent transition-colors";

  return (
    <section id="contact" className="px-6 py-24 max-w-xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 mb-3"
      >
        <span className="w-8 h-0.5 rounded-full bg-accent" aria-hidden />
        <h2 className="text-2xl font-semibold text-text">{t.headings.contact}</h2>
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="text-muted text-left mb-8"
      >
        {t.contact.subheading}
      </motion.p>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        onSubmit={handleSubmit}
        noValidate
        className="glass rounded-xl p-6 space-y-4 text-left"
      >
        <div>
          <label htmlFor="name" className="sr-only">
            {t.contact.namePlaceholder}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder={t.contact.namePlaceholder}
            value={form.name}
            onChange={handleChange}
            className={fieldClasses}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-400">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="sr-only">
            {t.contact.emailPlaceholder}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder={t.contact.emailPlaceholder}
            value={form.email}
            onChange={handleChange}
            className={fieldClasses}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-400">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="sr-only">
            {t.contact.messagePlaceholder}
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder={t.contact.messagePlaceholder}
            value={form.message}
            onChange={handleChange}
            className={`${fieldClasses} resize-none`}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-400">{errors.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 rounded-full bg-accent text-white text-sm font-medium hover:opacity-90 transition-opacity"
        >
          {t.contact.send}
        </button>
      </motion.form>

      {linkedin && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-10 pt-8 border-t border-border flex items-center justify-between flex-wrap gap-4"
        >
          <p className="text-sm text-muted">{t.contact.linkedinPrompt}</p>
          <a
            href={linkedin.url}
            target="_blank"
            rel="noreferrer"
            className="glass inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-text hover:text-accent transition-colors"
          >
            <FaLinkedin size={18} />
            {t.contact.connectLinkedin}
          </a>
        </motion.div>
      )}
    </section>
  );
}
