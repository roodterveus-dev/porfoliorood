import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { usePortfolioData } from "../context/PortfolioDataContext";
import { useLanguage } from "../context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";

const sectionIds = ["top", "about", "projects", "experience", "gallery", "contact"];

export default function Navbar() {
  const { profile } = usePortfolioData();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("top");
  const { t } = useLanguage();

  const links = [
    { label: t.nav.about, href: "#about", id: "about" },
    { label: t.nav.projects, href: "#projects", id: "projects" },
    { label: t.nav.experience, href: "#experience", id: "experience" },
    { label: t.nav.gallery, href: "#gallery", id: "gallery" },
    { label: t.nav.contact, href: "#contact", id: "contact" },
  ];

  // Closing the menu cancels the browser's own anchor scroll on phones (the
  // hash changes but the page stays put), so scroll explicitly.
  const goTo = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
      history.replaceState(null, "", `#${id}`);
    });
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled || menuOpen ? "glass" : ""
      }`}
    >
      <nav className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="#top" className="font-display text-lg font-bold tracking-tight text-text">
          {profile.name}
        </a>
        <div className="flex items-center gap-6">
          <ul className="hidden lg:flex items-center gap-8 text-sm text-muted">
            {links.map((link) => (
              <li key={link.href} className="relative">
                <a
                  href={link.href}
                  className={`transition-colors ${
                    active === link.id ? "text-text" : "hover:text-text"
                  }`}
                >
                  {link.label}
                </a>
                <motion.div
                  initial={false}
                  animate={{ opacity: active === link.id ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full bg-accent"
                />
              </li>
            ))}
          </ul>
          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="lg:hidden btn btn-ghost btn-circle text-text"
          >
            {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, overflow: "hidden" }}
            animate={{
              opacity: 1,
              height: "auto",
              // Let the language dropdown extend past the menu once open.
              transitionEnd: { overflow: "visible" },
            }}
            exit={{ opacity: 0, height: 0, overflow: "hidden" }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-border"
          >
            <ul className="px-6 py-2 flex flex-col divide-y divide-border">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => goTo(e, link.id)}
                    className={`block py-3 text-base ${active === link.id ? "text-accent font-medium" : "text-text"}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="px-6 pb-4 flex flex-wrap items-center gap-3">
              <LanguageSwitcher inline />
              <ThemeToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
