import i18n from "i18next";
import { setLanguage, type SupportedLanguage } from "./i18n";

export function useLang() {
  const lang = (
    i18n.language?.startsWith("en") ? "en" : "pl"
  ) as SupportedLanguage;

  return {
    lang,
    setLang: (l: SupportedLanguage) => setLanguage(l),
    toggle: () => setLanguage(lang === "pl" ? "en" : "pl"),
  };
}
