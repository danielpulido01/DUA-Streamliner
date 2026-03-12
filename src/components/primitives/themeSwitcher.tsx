import { useTheme } from "../../hooks/useTheme";
import { isThemeName } from "../../styles/theme";

const labels: Record<string, string> = {
  light: "Light",
  dark: "Dark",
};

export function ThemeSwitcher() {
  const { themeName, setTheme, availableThemes } = useTheme();

  function onChange(value: string) {
    if (isThemeName(value)) {
      setTheme(value);
    }
  }

  return (
    <label>
      Theme
      <select value={themeName} onChange={(event) => onChange(event.target.value)}>
        {availableThemes.map((name) => (
          <option key={name} value={name}>
            {labels[name] ?? name}
          </option>
        ))}
      </select>
    </label>
  );
}
