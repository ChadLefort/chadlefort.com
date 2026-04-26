import type { FC } from 'react';
import { Suspense, lazy, useEffect, useState } from 'react';
import { tv } from 'tailwind-variants';
import { useStore } from '@nanostores/react';
import neovim from '@iconify-icons/simple-icons/neovim';
import gnubash from '@iconify-icons/simple-icons/gnubash';
import tmux from '@iconify-icons/simple-icons/tmux';
import folder from '@iconify-icons/lucide/folder';
import folderGit2 from '@iconify-icons/lucide/folder-git-2';
import { NavigationProvider } from '~/components/react/NavigationProvider';
import { DemoBody } from './DemoBody';
import { Tab } from './Tab';
import { getSessionLabel, getSiteHost } from './utils';

const Shell = lazy(() => import('./Shell').then((m) => ({ default: m.Shell })));
import { TrafficLights } from './TrafficLights';
import {
  $closed,
  $interactive,
  $maximized,
  $minimized,
  appendLines,
  setClosed,
  setInteractive,
  setMaximized,
  setMinimized
} from './store';

const KONAMI = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a'
] as const;

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
      false: 'h-[520px] sm:h-[480px]'
    }
  }
});

export const Terminal: FC = () => {
  const maximized = useStore($maximized);
  const minimized = useStore($minimized);
  const closed = useStore($closed);
  const interactive = useStore($interactive);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (closed || !maximized || minimized) return;

    const prev = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = prev;
    };
  }, [maximized, minimized, closed]);

  useEffect(() => {
    let idx = 0;

    const onKey = (e: KeyboardEvent) => {
      const expected = KONAMI[idx].toLowerCase();
      const got = e.key.toLowerCase();

      if (got === expected) {
        idx += 1;

        if (idx === KONAMI.length) {
          setClosed(false);
          setMinimized(false);
          setMaximized(true);
          setInteractive(true);
          appendLines([{ kind: 'success', text: '✓ konami unlocked — interactive shell + fullscreen' }]);
          idx = 0;
        }
      } else {
        idx = got === KONAMI[0].toLowerCase() ? 1 : 0;
      }
    };

    window.addEventListener('keydown', onKey);

    return () => window.removeEventListener('keydown', onKey);
  }, []);

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

  const onMaximize = () => {
    const next = !$maximized.get();
    const wasMinimized = $minimized.get();

    startTransition(() => {
      setMaximized(next);
      if (next) {
        setInteractive(true);
        if (wasMinimized) setMinimized(false);
      }
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
            <div className="flex min-h-0 flex-1 flex-col">
              <div className={tabsBar()}>
                <Tab tone="session" icon={tmux} label={getSessionLabel(getSiteHost())} />
                <Tab idx={1} icon={gnubash} label="zsh" active />
                <Tab idx={2} icon={neovim} label="nvim" href="/#skills" hideOnMobile />
                <Tab idx={3} icon={folderGit2} label="~/dotfiles" href="https://github.com/ChadLefort" hideOnMobile />
                <Tab idx={4} mobileIdx={2} icon={folder} label="~/projects" href="/projects" />
              </div>
              <div className={slot({ maximized: true })}>
                {interactive ? (
                  <Suspense fallback={null}>
                    <Shell />
                  </Suspense>
                ) : (
                  <DemoBody paused={interactive} />
                )}
              </div>
            </div>
          ) : (
            <div aria-hidden={minimized} className={collapse({ minimized })}>
              <div className="min-h-0 overflow-hidden">
                <div className={tabsBar()}>
                  <Tab tone="session" icon={tmux} label={getSessionLabel(getSiteHost())} />
                  <Tab idx={1} icon={gnubash} label="zsh" active />
                  <Tab idx={2} icon={neovim} label="nvim" href="/#skills" hideOnMobile />
                  <Tab idx={3} icon={folderGit2} label="~/dotfiles" href="https://github.com/ChadLefort" hideOnMobile />
                  <Tab idx={4} mobileIdx={2} icon={folder} label="~/projects" href="/projects" />
                </div>
                <div className={slot({ maximized: false })}>
                  {interactive ? (
                    <Suspense fallback={null}>
                      <Shell />
                    </Suspense>
                  ) : (
                    <DemoBody paused={interactive} />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </NavigationProvider>
  );
};
