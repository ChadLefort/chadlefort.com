import type { FC } from 'react';
import { useEffect } from 'react';
import { tv } from 'tailwind-variants';
import { useStore } from '@nanostores/react';
import neovim from '@iconify-icons/simple-icons/neovim';
import gnubash from '@iconify-icons/simple-icons/gnubash';
import tmux from '@iconify-icons/simple-icons/tmux';
import folder from '@iconify-icons/lucide/folder';
import folderGit2 from '@iconify-icons/lucide/folder-git-2';
import { DemoBody } from './DemoBody';
import { Shell } from './Shell';
import { Tab } from './Tab';
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

const container = tv({
  base: 'ring-glass-border relative w-full overflow-hidden ring-1',
  variants: {
    maximized: {
      true: 'fixed inset-0 z-50 max-w-none rounded-none flex flex-col',
      false: 'mx-auto max-w-section rounded-2xl'
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

  const onMaximize = () => {
    const next = !$maximized.get();

    setMaximized(next);

    if (next) {
      setInteractive(true);
      if ($minimized.get()) setMinimized(false);
    }
  };

  const onMinimize = () => {
    const next = !$minimized.get();

    setMinimized(next);

    if (next && $maximized.get()) setMaximized(false);
  };

  return (
    <div className={container({ maximized })} aria-label="Terminal" data-no-print>
      <div className={titlebar()}>
        <TrafficLights
          onClose={() => setClosed(true)}
          onMinimize={onMinimize}
          onMaximize={onMaximize}
          maximized={maximized}
        />
      </div>

      {!minimized && (
        <>
          <div className={tabsBar()}>
            <Tab tone="session" icon={tmux} label="chadlefort_com" />
            <Tab idx={1} icon={gnubash} label="zsh" active />
            <Tab idx={2} icon={neovim} label="nvim" href="/#skills" hideOnMobile />
            <Tab idx={3} icon={folderGit2} label="~/dotfiles" href="https://github.com/ChadLefort" hideOnMobile />
            <Tab idx={4} mobileIdx={2} icon={folder} label="~/projects" href="/projects" />
          </div>

          <div className={slot({ maximized })}>{interactive ? <Shell /> : <DemoBody paused={interactive} />}</div>
        </>
      )}
    </div>
  );
};
