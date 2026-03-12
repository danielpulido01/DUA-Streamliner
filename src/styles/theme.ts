import { colors, spacing, radius } from "./tokens";

export type Theme = {
  colors: typeof colors;
  spacing: typeof spacing;
  radius: typeof radius;
  typography: { fontFamily: string; headingWeight: number };
};

export const themes = {
  light: {
    colors,
    spacing,
    radius,
    typography: { fontFamily: "Inter, sans-serif", headingWeight: 600 },
  },
  dark: {
    colors: {
      ...colors,
      primary: "#4C9AFF",
      secondary: "#4FD1A1",
      danger: "#FF6B6B",
      background: "#111827",
    },
    spacing,
    radius,
    typography: { fontFamily: "Inter, sans-serif", headingWeight: 600 },
  },
} satisfies Record<string, Theme>;

export type ThemeName = keyof typeof themes;

export const DEFAULT_THEME: ThemeName = "light";

export function isThemeName(value: string): value is ThemeName {
  return value in themes;
}
