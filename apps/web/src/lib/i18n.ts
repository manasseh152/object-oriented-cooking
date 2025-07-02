import i18n from "i18next";
import HttpApi from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import { safeParse } from "valibot";

import type { SupportedLanguages } from "@/config/language";

import { env } from "@/config/env";
import { DEFAULT_LANGUAGE, LanguageSchema, LOCAL_STORAGE_KEY, SUPPORTED_LANGUAGES } from "@/config/language";

import { logger } from "./logger";

declare global {
  // eslint-disable-next-line ts/consistent-type-definitions
  interface Window {
    setLanguage: (language: SupportedLanguages) => void;
  }
}

export function getLanguage() {
  const language = safeParse(LanguageSchema, localStorage.getItem(LOCAL_STORAGE_KEY));

  if (!language.success) {
    return DEFAULT_LANGUAGE.code;
  }

  return language.output;
}

export function setLanguage(value: unknown) {
  const parsedValue = safeParse(LanguageSchema, value);

  if (!parsedValue.success) {
    logger.error(`LanguageSelector: Failed to parse language value: ${value}.`, { parsedValue });
    return;
  }

  i18n.changeLanguage(parsedValue.output);
}

i18n
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    lng: getLanguage(),
    fallbackLng: DEFAULT_LANGUAGE.code,
    supportedLngs: SUPPORTED_LANGUAGES,
    debug: env.dev,
    interpolation: {
      escapeValue: false, // React already does escaping
    },
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
  });

if (typeof window !== "undefined") {
  window.setLanguage = setLanguage;
}
