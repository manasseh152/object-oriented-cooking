import type { ReactNode } from 'react';

import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import type { SupportedLanguages } from '@/config/language';

import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from '@/config/language';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { LanguageProviderContext } from '@/hooks/use-translation';

type LanguageProviderProps = {
  children: ReactNode;
  defaultLanguage?: SupportedLanguages;
  storageKey?: string;
};

export function LanguageProvider({
  children,
  defaultLanguage = DEFAULT_LANGUAGE.code,
  storageKey = 'language',
}: LanguageProviderProps) {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useLocalStorage<SupportedLanguages>(storageKey, defaultLanguage);

  useEffect(() => {
    if (SUPPORTED_LANGUAGES.includes(language))
      i18n.changeLanguage(language);
  }, [i18n, language]);

  useEffect(() => {
    const root = window.document.documentElement;

    root.setAttribute('lang', language);
  }, [language]);

  const value = useMemo(() => ({
    language,
    setLanguage,
  }), [setLanguage, language]);

  return (
    <LanguageProviderContext value={value}>
      {children}
    </LanguageProviderContext>
  );
}
LanguageProvider.displayName = 'LanguageProvider';
