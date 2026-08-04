import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaWhatsapp,
} from "react-icons/fa";
import { usePortfolioData } from "../context/PortfolioDataContext";
import { useLanguage } from "../context/LanguageContext";

const icons = {
  github: FaGithub,
  linkedin: FaLinkedin,
  twitter: FaTwitter,
  email: FaEnvelope,
  whatsapp: FaWhatsapp,
};

export default function Footer() {
  const { profile, socials } = usePortfolioData();
  const { t } = useLanguage();

  return (
    <footer className="px-6 py-10 border-t border-border">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} {profile.name}. {t.footer.rights}
        </p>

        <div className="flex items-center gap-5">
          {socials.map((social) => {
            const Icon = icons[social.icon];
            return (
              <a
                key={social.name}
                href={social.url}
                target={social.icon === "email" ? undefined : "_blank"}
                rel="noreferrer"
                aria-label={social.name}
                className="text-muted hover:text-accent transition-colors"
              >
                {Icon ? <Icon size={18} /> : social.name}
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
