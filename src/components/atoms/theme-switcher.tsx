import { Palette } from "lucide-react";
import { useTranslation } from "../i18n";
import { useTheme } from "../styles/ThemeProvider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export function ThemeSwitcher() {
  const { theme, setTheme, availableThemes } = useTheme();
  const { t } = useTranslation();

  return (
    <div className="flex min-w-40 items-center gap-2 rounded-xl border bg-card px-3 py-2">
      <Palette className="size-4 text-primary" />
      <Select value={theme} onValueChange={(value) => setTheme(value as typeof theme)}>
        <SelectTrigger className="h-auto border-0 bg-transparent px-0 py-0 shadow-none focus:ring-0">
          <SelectValue placeholder={t("workspace.topbar.theme")} />
        </SelectTrigger>
        <SelectContent>
          {availableThemes.map((themeName) => (
            <SelectItem key={themeName} value={themeName}>
              {t(`theme.${themeName}`)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

