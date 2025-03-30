import { ReactElement } from "react";
import { THEME, useTheme } from "../context/ThemeProvider";

export default function ThemeToggleButton(): ReactElement {
  const { theme, toggleTheme } = useTheme();
  const isLightMode = theme === THEME.LIGHT;

  return (
    <button
      onClick={toggleTheme}
      style={{
        backgroundColor: isLightMode ? "gray" : "rgb(46, 46, 46)",
        color: isLightMode ? "black" : "white",
      }}
      className="px-4 py-2 mt-4 rounded-md font-semibold shadow-md border transition-all"
    >
      {isLightMode ? "🌚" : "🌞"}
    </button>
  );
}