/* eslint-disable react-refresh/only-export-components */
import type { FC } from 'react';

import { picklist } from 'valibot';

export const SUPPORTED_LANGUAGES = [
  'en',
  'nl',
] as const;
export type SupportedLanguages = typeof SUPPORTED_LANGUAGES[number];
export const LanguageSchema = picklist(SUPPORTED_LANGUAGES, 'value is not a valid language');

export type Language = {
  code: SupportedLanguages;
  name: string;
  icon: FC;
};

export const LANGUAGES: Language[] = [
  {
    code: 'en',
    name: 'English',
    icon: () => <span>🇬🇧</span>,
  },
  {
    code: 'nl',
    name: 'Nederlands',
    icon: () => <span>🇳🇱</span>,
  },
];

export const DEFAULT_LANGUAGE: Language = LANGUAGES[0];
