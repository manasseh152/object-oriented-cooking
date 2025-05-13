import { picklist } from 'valibot';

export const THEMES = [
  'dark',
  'light',
  'system',
] as const;
export type Theme = typeof THEMES[number];

export const THEME_STORAGE_KEY = 'vite-ui-theme';

export const THEME_DEFAULT: Theme = 'system';

export const ThemeSchema = picklist(THEMES, 'value is not a valid theme');
