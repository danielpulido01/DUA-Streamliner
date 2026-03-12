// src/components/LanguageSwitcher.tsx
import { useTranslation } from "react-i18next";
import { setLanguage } from "../i18n/config";

const labels: Record<string, string> = {
  en: "English",
  es: "Español",
  //Add new language
};

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <select value={i18n.resolvedLanguage?.split("-")[0] ?? "en"} onChange={(e) => setLanguage(e.target.value)}>
      {SUPPORTED_LANGUAGES.map((code) => (
        <option key={code} value={code}>
          {labels[code] ?? code.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
