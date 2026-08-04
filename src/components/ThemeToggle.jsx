import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="glass glass-hover flex items-center justify-center w-8 h-8 rounded-full text-text"
    >
      {theme === "dark" ? <FiSun size={15} /> : <FiMoon size={15} />}
    </button>
  );
}
