import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "black";

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-ghost btn-circle swap swap-rotate"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="size-5 transition-transform duration-300 hover:rotate-12" />
      ) : (
        <Moon className="size-5 transition-transform duration-300 hover:-rotate-12" />
      )}
    </button>
  );
};

export default ThemeToggle;
