import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { composeRenderProps, ToggleButton } from 'react-aria-components';
import { buttonStyles } from '~/components/react/ui/Button/Button';

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
  const [isDark, setDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'));
    setMounted(true);
  }, []);

  const onChange = (selected: boolean) => {
    setDark(selected);
    apply(selected ? 'dark' : 'light');
  };

  const next = isDark ? 'light' : 'dark';

  return (
    <ToggleButton
      isSelected={isDark}
      onChange={onChange}
      aria-label={`Turn on ${next} mode`}
      className={composeRenderProps('text-nav-fg', (extra, renderProps) =>
        buttonStyles({
          ...renderProps,
          variant: 'ghost',
          color: 'neutral',
          shape: 'icon',
          press: 'bouncy',
          className: extra
        })
      )}
    >
      <span aria-hidden="true">{mounted && isDark ? <SunIcon /> : <MoonIcon />}</span>
    </ToggleButton>
  );
};
