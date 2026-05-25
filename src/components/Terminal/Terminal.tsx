import folder from '@iconify-icons/lucide/folder';
import folderGit2 from '@iconify-icons/lucide/folder-git-2';
import gnubash from '@iconify-icons/simple-icons/gnubash';
import neovim from '@iconify-icons/simple-icons/neovim';
import tmux from '@iconify-icons/simple-icons/tmux';
import { useStore } from '@nanostores/react';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { tv } from 'tailwind-variants';
import { NavigationProvider } from '~/components/NavigationProvider';
import { useSiteHost } from '~/hooks/useSiteHost';
import { Shell } from './Shell';
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
import { getSessionLabel } from './utils';

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
  base: ['bg-term-bg ring-panel-border relative w-full overflow-hidden ring-1'],
  variants: {
    maximized: {
      true: [
        'fixed z-50 flex max-w-none flex-col rounded-none',
        'h-[var(--terminal-viewport-height,100dvh)] w-[var(--terminal-viewport-width,100vw)]',
        '[left:var(--terminal-viewport-left,0px)] [top:var(--terminal-viewport-top,0px)]'
      ],
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
  base: [
    'grid overflow-hidden',
    'transition-[grid-template-rows] duration-[420ms] ease-[var(--motion-ease-settle)]',
    'motion-reduce:transition-none'
  ],
  variants: {
    minimized: {
      true: 'grid-rows-[0fr]',
      false: 'grid-rows-[1fr]'
    }
  }
});

const collapseInner = tv({
  base: [
    'min-h-0 overflow-hidden origin-top',
    'transition-[opacity,transform] duration-[420ms] ease-[var(--motion-ease-settle)]',
    'motion-reduce:transition-none'
  ],
  variants: {
    minimized: {
      true: '-translate-y-1 scale-y-[0.98] opacity-0',
      false: 'translate-y-0 scale-y-100 opacity-100'
    }
  }
});

const titlebar = tv({ base: 'bg-term-menu-bg flex items-center px-3 py-3 sm:px-4 sm:py-3.5' });

const tabsBar = tv({
  base: [
    'bg-term-menu-bg flex items-end gap-1 overflow-x-auto overflow-y-hidden px-2 pt-2 sm:px-3',
    'leading-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden'
  ]
});

const slot = tv({
  base: 'relative w-full',
  variants: {
    maximized: {
      true: 'min-h-0 flex-1',
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
      <Shell />
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
      <div className={collapseInner({ minimized })}>
        <SessionTabs sessionLabel={sessionLabel} />
        {shell}
      </div>
    </div>
  );
};

export const Terminal: FC = () => {
  const maximized = useStore($maximized, { ssr: 'initial' });
  const minimized = useStore($minimized, { ssr: 'initial' });
  const closed = useStore($closed, { ssr: 'initial' });
  const host = useSiteHost();
  const [closing, setClosing] = useState(false);
  const sessionLabel = getSessionLabel(host);

  useEffect(() => {
    if (closed || !maximized || minimized) return;

    const setViewportFrame = () => {
      const viewport = window.visualViewport;

      document.documentElement.style.setProperty(
        '--terminal-viewport-height',
        `${viewport?.height ?? window.innerHeight}px`
      );
      document.documentElement.style.setProperty(
        '--terminal-viewport-width',
        `${viewport?.width ?? window.innerWidth}px`
      );
      document.documentElement.style.setProperty('--terminal-viewport-top', `${viewport?.offsetTop ?? 0}px`);
      document.documentElement.style.setProperty('--terminal-viewport-left', `${viewport?.offsetLeft ?? 0}px`);
    };

    setViewportFrame();
    document.documentElement.style.overflow = 'hidden';
    window.visualViewport?.addEventListener('resize', setViewportFrame);
    window.visualViewport?.addEventListener('scroll', setViewportFrame, { passive: true });
    window.addEventListener('resize', setViewportFrame);

    return () => {
      document.documentElement.style.overflow = '';
      document.documentElement.style.removeProperty('--terminal-viewport-height');
      document.documentElement.style.removeProperty('--terminal-viewport-width');
      document.documentElement.style.removeProperty('--terminal-viewport-top');
      document.documentElement.style.removeProperty('--terminal-viewport-left');
      window.visualViewport?.removeEventListener('resize', setViewportFrame);
      window.visualViewport?.removeEventListener('scroll', setViewportFrame);
      window.removeEventListener('resize', setViewportFrame);
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
    }, 240);
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
