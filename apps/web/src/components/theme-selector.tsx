import { useTranslation } from 'react-i18next';
import * as v from 'valibot';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { THEMES, ThemeSchema } from '@/config/theme';
import { useTheme } from '@/hooks/use-theme';
import { logger } from '@/lib/logger';

export function ThemeSelector() {
  const { t } = useTranslation('theme-selector');
  const { theme, setTheme } = useTheme();

  function handleThemeChange(value: string) {
    const parsedValue = v.safeParse(ThemeSchema, value);

    if (!parsedValue.success) {
      logger.error(`ThemeSelector: Failed to parse theme value: ${value}.`, { parsedValue });
      return;
    }

    setTheme(parsedValue.output);
  }

  return (
    <Select
      defaultValue={theme}
      onValueChange={handleThemeChange}
    >
      <SelectTrigger className="w-[180px]" title={t('themeSelectorTitle')} aria-label={t('themeSelectorAriaLabel')} aria-description={t('themeSelectorAriaDescription')}>
        <SelectValue placeholder={t('selectPlaceholder')} />
      </SelectTrigger>
      <SelectContent>
        {THEMES.map(theme => (
          <SelectItem key={theme} value={theme}>
            {t(`themes.${theme}`)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
