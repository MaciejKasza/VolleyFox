import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import pl from "./locales/pl.json";
import en from "./locales/en.json";

export const supportedLanguages = ["pl", "en"] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

const DEFAULT_LANG: SupportedLanguage = "pl";
const STORAGE_KEY = "vf_lang";

function getInitialLanguage(): SupportedLanguage {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "pl" || saved === "en") return saved;

  const browser = navigator.language?.toLowerCase() ?? "";
  if (browser.startsWith("pl")) return "pl";
  if (browser.startsWith("en")) return "en";

  return DEFAULT_LANG;
}

i18n.use(initReactI18next).init({
  resources: {
    pl: { translation: pl },
    en: { translation: en },
  },
  lng: getInitialLanguage(),
  fallbackLng: DEFAULT_LANG,
  interpolation: { escapeValue: false },
});

export function setLanguage(lang: SupportedLanguage) {
  i18n.changeLanguage(lang);
  localStorage.setItem(STORAGE_KEY, lang);
}

export default i18n;
