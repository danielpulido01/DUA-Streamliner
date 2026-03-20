import { Languages } from "lucide-react";
import { type LanguageCode, useTranslation } from "../i18n";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const labels: Record<string, string> = {
  en: "English",
  es: "Español",
};

export function LanguageSwitcher() {
  const { language, setLanguage, supportedLanguages, t } = useTranslation();

  return (
    <div className="flex min-w-40 items-center gap-2 rounded-xl border bg-card px-3 py-2">
      <Languages className="size-4 text-primary" />
      <Select value={language} onValueChange={(value) => setLanguage(value as LanguageCode)}>
        <SelectTrigger className="h-auto border-0 bg-transparent px-0 py-0 shadow-none focus:ring-0">
          <SelectValue placeholder={t("workspace.topbar.language")} />
        </SelectTrigger>
        <SelectContent>
          {supportedLanguages.map((languageCode) => (
            <SelectItem key={languageCode} value={languageCode}>
              {labels[languageCode]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

