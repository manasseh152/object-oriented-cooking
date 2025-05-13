import type { ReactNode } from 'react';

import { useEffect, useMemo } from 'react';

import type { Theme } from '@/config/theme';

import { THEME_DEFAULT, THEME_STORAGE_KEY, THEMES } from '@/config/theme';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { useMediaQuery } from '@/hooks/use-media-query';
import { ThemeProviderContext } from '@/hooks/use-theme';

type ThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export function ThemeProvider({
  children,
  defaultTheme = THEME_DEFAULT,
  storageKey = THEME_STORAGE_KEY,
}: ThemeProviderProps) {
  const [theme, setTheme] = useLocalStorage<Theme>(storageKey, defaultTheme);
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(...THEMES);

    if (theme === 'system')
      root.classList.add(prefersDark ? 'dark' : 'light');
    else
      root.classList.add(theme);
  }, [prefersDark, theme]);

  const value = useMemo(() => ({
    theme,
    setTheme,
  }), [setTheme, theme]);

  return (
    <ThemeProviderContext value={value}>
      {children}
    </ThemeProviderContext>
  );
}
ThemeProvider.displayName = 'ThemeProvider';
