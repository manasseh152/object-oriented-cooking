import { useTranslation } from 'react-i18next';
import * as v from 'valibot';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LANGUAGES, LanguageSchema } from '@/config/language';
import { useLanguage } from '@/hooks/use-translation';
import { logger } from '@/lib/logger';

export function LanguageSelector() {
  const { t } = useTranslation('language-selector');
  const { language, setLanguage } = useLanguage();

  function handleLanguageChange(value: string) {
    const parsedValue = v.safeParse(LanguageSchema, value);

    if (!parsedValue.success) {
      logger.error(`LanguageSelector: Failed to parse language value: ${value}.`, { parsedValue });
      return;
    }

    setLanguage(parsedValue.output);
  }

  return (
    <Select
      defaultValue={language}
      onValueChange={handleLanguageChange}
    >
      <SelectTrigger className="w-[180px]" title={t('languageSelectorTitle')} aria-label={t('languageSelectorAriaLabel')} aria-description={t('languageSelectorAriaDescription')}>
        <SelectValue placeholder={t('selectPlaceholder')} />
      </SelectTrigger>
      <SelectContent>
        {LANGUAGES.map(language => (
          <SelectItem
            key={language.code}
            value={language.code}
            className="flex items-center gap-2"
          >
            <language.icon />
            {language.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
