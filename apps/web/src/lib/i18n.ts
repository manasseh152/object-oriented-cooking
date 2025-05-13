import i18n from 'i18next';
import HttpApi from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import { env } from '@/config/env';
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from '@/config/language';

i18n
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    fallbackLng: DEFAULT_LANGUAGE.code,
    supportedLngs: SUPPORTED_LANGUAGES,
    debug: env.dev,
    interpolation: {
      escapeValue: false, // React already does escaping
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  });
