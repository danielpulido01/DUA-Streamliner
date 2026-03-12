import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { DEFAULT_THEME, isThemeName, themes, type Theme, type ThemeName } from "../styles/theme";

type ThemeContextValue = {
  themeName: ThemeName;
  theme: Theme;
  setTheme: (themeName: ThemeName) => void;
  availableThemes: ThemeName[];
};

const STORAGE_KEY = "app.theme";

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readInitialTheme(): ThemeName {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved && isThemeName(saved)) {
    return saved;
  }
  return DEFAULT_THEME;
}

function applyThemeToDocument(themeName: ThemeName): void {
  const activeTheme = themes[themeName];
  const root = document.documentElement;

  root.setAttribute("data-theme", themeName);
  root.style.setProperty("--color-primary", activeTheme.colors.primary);
  root.style.setProperty("--color-secondary", activeTheme.colors.secondary);
  root.style.setProperty("--color-danger", activeTheme.colors.danger);
  root.style.setProperty("--color-background", activeTheme.colors.background);
  root.style.setProperty("--spacing-sm", activeTheme.spacing.sm);
  root.style.setProperty("--spacing-md", activeTheme.spacing.md);
  root.style.setProperty("--spacing-lg", activeTheme.spacing.lg);
  root.style.setProperty("--radius-sm", activeTheme.radius.sm);
  root.style.setProperty("--radius-md", activeTheme.radius.md);
  root.style.setProperty("--radius-lg", activeTheme.radius.lg);
  root.style.setProperty("--font-family-base", activeTheme.typography.fontFamily);
  root.style.setProperty("--font-weight-heading", String(activeTheme.typography.headingWeight));
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeName, setThemeName] = useState<ThemeName>(() => readInitialTheme());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, themeName);
    applyThemeToDocument(themeName);
  }, [themeName]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      themeName,
      theme: themes[themeName],
      setTheme: setThemeName,
      availableThemes: Object.keys(themes) as ThemeName[],
    }),
    [themeName]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used inside ThemeProvider");
  }
  return context;
}
