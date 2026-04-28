import folder from '@iconify-icons/lucide/folder';
import folderGit2 from '@iconify-icons/lucide/folder-git-2';
import gnubash from '@iconify-icons/simple-icons/gnubash';
import neovim from '@iconify-icons/simple-icons/neovim';
import tmux from '@iconify-icons/simple-icons/tmux';
import { useStore } from '@nanostores/react';
import type { FC } from 'react';
import { lazy, Suspense, useEffect, useState } from 'react';
import { tv } from 'tailwind-variants';
import { NavigationProvider } from '~/components/react/NavigationProvider';
import {
  $closed,
  $maximized,
  $minimized,
  $welcomeShown,
  appendLines,
  setClosed,
  setInteractive,
  setLines,
  setMaximized,
  setMinimized,
  setWelcomeShown,
  WELCOME_LINES
} from './store';
import { Tab } from './Tab';
import { TrafficLights } from './TrafficLights';
import { getSessionLabel, getSiteHost } from './utils';

const Shell = lazy(() => import('./Shell').then((module) => ({ default: module.Shell })));

const wrapper = tv({
  base: 'relative w-full',
  variants: {
    maximized: {
      true: 'min-h-[604px] sm:min-h-[564px]',
      false: ''
    }
  }
});

const container = tv({
  base: ['bg-term-bg ring-glass-border relative w-full overflow-hidden ring-1'],
  variants: {
    maximized: {
      true: 'fixed inset-0 z-50 max-w-none rounded-none flex flex-col',
      false: 'mx-auto max-w-section rounded-2xl'
    },
    closing: {
      true: 'term-closing pointer-events-none',
      false: ''
    }
  },
  defaultVariants: { closing: false }
});

const collapse = tv({
  base: 'grid origin-top transition-[grid-template-rows,opacity,transform,filter] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
  variants: {
    minimized: {
      true: 'grid-rows-[0fr] -translate-y-2 scale-y-95 opacity-0 blur-sm',
      false: 'grid-rows-[1fr] translate-y-0 scale-y-100 opacity-100'
    }
  }
});

const titlebar = tv({ base: 'bg-term-menu-bg flex items-center px-3 py-3 sm:px-4 sm:py-3.5' });

const tabsBar = tv({ base: 'bg-term-menu-bg flex items-end gap-1 overflow-x-auto px-2 sm:px-3' });

const slot = tv({
  base: 'relative w-full',
  variants: {
    maximized: {
      true: 'flex-1 min-h-0',
      false: 'h-[640px] sm:h-[480px]'
    }
  }
});

const SessionTabs: FC<{ sessionLabel: string }> = ({ sessionLabel }) => (
  <div className={tabsBar()}>
    <Tab tone="session" icon={tmux} label={sessionLabel} />
    <Tab idx={1} icon={gnubash} label="zsh" active />
    <Tab idx={2} icon={neovim} label="nvim" href="/#skills" hideOnMobile />
    <Tab idx={3} icon={folderGit2} label="~/dotfiles" href="https://github.com/ChadLefort" hideOnMobile />
    <Tab idx={4} mobileIdx={2} icon={folder} label="~/projects" href="/projects" />
  </div>
);

const ShellViewport: FC<{ maximized: boolean; minimized?: boolean; sessionLabel: string }> = ({
  maximized,
  minimized = false,
  sessionLabel
}) => {
  const shell = (
    <div className={slot({ maximized })}>
      <Suspense fallback={null}>
        <Shell />
      </Suspense>
    </div>
  );

  if (maximized) {
    return (
      <div className="flex min-h-0 flex-1 flex-col">
        <SessionTabs sessionLabel={sessionLabel} />
        {shell}
      </div>
    );
  }

  return (
    <div aria-hidden={minimized} className={collapse({ minimized })}>
      <div className="min-h-0 overflow-hidden">
        <SessionTabs sessionLabel={sessionLabel} />
        {shell}
      </div>
    </div>
  );
};

export const Terminal: FC = () => {
  const maximized = useStore($maximized);
  const minimized = useStore($minimized);
  const closed = useStore($closed);
  const host = getSiteHost();
  const sessionLabel = getSessionLabel(host);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (closed || !maximized || minimized) return;

    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [maximized, minimized, closed]);

  if (closed) return null;

  const startTransition = (fn: () => void) => {
    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      (document as Document & { startViewTransition: (cb: () => void) => unknown }).startViewTransition(fn);

      return;
    }

    fn();
  };

  const onClose = () => {
    if ($maximized.get()) {
      startTransition(() => setMaximized(false));
      return;
    }

    setClosing(true);
    window.setTimeout(() => {
      setClosed(true);
      setClosing(false);
    }, 280);
  };

  const resetWithWelcome = () => {
    if ($welcomeShown.get()) return;

    setLines([]);
    appendLines(WELCOME_LINES);
    setWelcomeShown(true);
  };

  const onMaximize = () => {
    const next = !$maximized.get();
    const wasMinimized = $minimized.get();

    startTransition(() => {
      setMaximized(next);

      if (!next) return;

      setInteractive(true);
      if (wasMinimized) setMinimized(false);
      resetWithWelcome();
    });
  };

  const onMinimize = () => {
    const next = !$minimized.get();
    const wasMaximized = $maximized.get();

    if (next && wasMaximized) {
      startTransition(() => {
        setMinimized(next);
        setMaximized(false);
      });

      return;
    }

    setMinimized(next);
  };

  return (
    <NavigationProvider>
      <div className={wrapper({ maximized })} data-no-print>
        <div
          className={container({ maximized, closing })}
          style={{ viewTransitionName: 'terminal' }}
          aria-label="Terminal"
        >
          <div className={titlebar()}>
            <TrafficLights onClose={onClose} onMinimize={onMinimize} onMaximize={onMaximize} maximized={maximized} />
          </div>

          {maximized ? (
            <ShellViewport maximized sessionLabel={sessionLabel} />
          ) : (
            <ShellViewport maximized={false} minimized={minimized} sessionLabel={sessionLabel} />
          )}
        </div>
      </div>
    </NavigationProvider>
  );
};
