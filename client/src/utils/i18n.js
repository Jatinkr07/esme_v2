import enTranslations from "../locales/en.json";
import arTranslations from "../locales/ar.json";

const translations = {
  en: enTranslations,
  ar: arTranslations,
};

export const useTranslation = (language = "en") => {
  const t = (key, options = {}) => {
    const keys = key.split(".");
    let value = translations[language];

    for (const k of keys) {
      value = value?.[k];
    }

    if (options.returnObjects && typeof value === "object") {
      return value;
    }

    return value || key;
  };

  return { t };
};

export default { useTranslation };
