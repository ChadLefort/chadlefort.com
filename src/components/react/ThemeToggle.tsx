import type { FC } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { IconButton } from './ui/IconButton';

type Theme = 'light' | 'dark';

const apply = (theme: Theme) => {
  const root = document.documentElement;

  root.classList.toggle('dark', theme === 'dark');
  root.dataset.theme = theme;
  localStorage.setItem('theme', theme);
};

const SunIcon: FC = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
);

const MoonIcon: FC = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
    <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79Z" />
  </svg>
);

export const ThemeToggle: FC = () => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const initial = (document.documentElement.classList.contains('dark') ? 'dark' : 'light') as Theme;

    setTheme(initial);
    setMounted(true);
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';

      apply(next);

      return next;
    });
  }, []);

  const next = theme === 'dark' ? 'light' : 'dark';

  return (
    <IconButton
      onPress={toggle}
      label={`Turn on ${next} mode`}
      icon={mounted && theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      variant="ghost"
      color="neutral"
      className="text-[var(--nav-fg)]"
    />
  );
};
