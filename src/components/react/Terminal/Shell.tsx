import { useStore } from '@nanostores/react';
import type { FC, FocusEvent } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { tv } from 'tailwind-variants';
import { yearsOfExperience } from '~/data/site';
import { useInView } from '~/hooks/useInView';
import { useMediaQuery } from '~/hooks/useMediaQuery';
import { useReducedMotion } from '~/hooks/useReducedMotion';
import { Cursor } from './Cursor';
import { PromptInput } from './PromptInput';
import { StatusLine } from './StatusLine';
import { goTo } from './shell-helpers';
import {
  $cwd,
  $history,
  $interactive,
  $lines,
  $maximized,
  type Line,
  type LineBody,
  appendLines as storeAppendLines,
  setCwd as storeSetCwd
} from './store';
import { useShellDemo } from './useShellDemo';
import { useShellPrompt } from './useShellPrompt';
import { formatTime, getSiteHost } from './utils';
import { buildFs, cwdForHost, formatPath } from './vfs';

const shellRoot = tv({
  base: [
    'bg-term-bg text-term-fg break-words font-mono h-full',
    'px-4 pt-4 pb-5 text-[12.5px] leading-6',
    'sm:px-5 sm:pt-5 sm:pb-6 sm:text-[15px] sm:leading-7'
  ],
  variants: {
    maximized: {
      true: 'overscroll-contain',
      false: ''
    },
    engaged: {
      true: 'overflow-y-auto',
      false: 'overflow-hidden'
    }
  },
  defaultVariants: {
    maximized: false,
    engaged: false
  }
});

const outputRow = tv({
  base: 'whitespace-pre-wrap',
  variants: {
    kind: {
      err: 'text-term-del',
      success: 'text-term-add',
      out: 'text-term-fg'
    }
  },
  defaultVariants: { kind: 'out' }
});

const promptRow = tv({ base: 'flex items-center gap-1.5' });
const promptArrow = tv({ base: 'text-term-prompt shrink-0' });

export const Shell: FC = () => {
  const host = getSiteHost();
  const root = useMemo(() => buildFs(host), [host]);
  const lines = useStore($lines);
  const cwd = useStore($cwd);
  const history = useStore($history);
  const interactive = useStore($interactive);
  const maximized = useStore($maximized);
  const years = yearsOfExperience();
  const reducedMotion = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 640px)');
  const [viewRef, inView] = useInView<HTMLDivElement>({
    threshold: isMobile ? 0.4 : 0,
    rootMargin: isMobile ? '0px 0px -20% 0px' : '0px',
    once: true
  });
  const [time, setTime] = useState<string | null>(null);
  const [engaged, setEngaged] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const append = useCallback((newLines: LineBody[]) => storeAppendLines(newLines), []);
  const lastLineId = lines.at(-1)?.id;
  const setShellRef = useCallback(
    (node: HTMLDivElement | null) => {
      scrollerRef.current = node;
      viewRef.current = node;
    },
    [viewRef]
  );

  const { phase, typed } = useShellDemo({
    years,
    interactive,
    reducedMotion,
    inView,
    append
  });
  const { input, setInput, onKey, onSubmit } = useShellPrompt({
    root,
    cwd,
    history,
    years,
    time,
    append,
    goTo
  });

  useEffect(() => {
    if (phase === 'done' && maximized) {
      inputRef.current?.focus({ preventScroll: true });
    }
  }, [maximized, phase]);

  useEffect(() => {
    if (interactive) return;

    append([{ kind: 'status' }]);
  }, [append, interactive]);

  useEffect(() => {
    const target = cwdForHost(host);
    const current = $cwd.get();

    if (current[0] === target[0] && current[1] !== target[1]) {
      storeSetCwd(target);
    }
  }, [host]);

  useEffect(() => {
    setTime(formatTime());
    const tick = () => setTime(formatTime());
    const id = window.setInterval(tick, 30_000);

    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;

    if (!scroller) return;

    if (lastLineId === undefined) {
      scroller.scrollTo({ top: 0 });
      return;
    }

    scroller.scrollTo({ top: scroller.scrollHeight });
  }, [lastLineId]);

  useEffect(() => {
    const element = scrollerRef.current;

    if (!element) return;

    const onMouseUp = () => {
      const selection = window.getSelection?.();

      if (selection && selection.toString().length > 0) return;

      inputRef.current?.focus();
    };

    element.addEventListener('mouseup', onMouseUp);

    return () => element.removeEventListener('mouseup', onMouseUp);
  }, []);

  const shellIsEngaged = maximized || engaged;

  const onFocusCapture = useCallback(() => {
    if (maximized) return;

    setEngaged(true);
  }, [maximized]);

  const onBlurCapture = useCallback(
    (event: FocusEvent<HTMLDivElement>) => {
      if (maximized) return;

      const nextFocused = event.relatedTarget;

      if (nextFocused instanceof Node && event.currentTarget.contains(nextFocused)) return;

      setEngaged(false);
      scrollerRef.current?.scrollTo({ top: scrollerRef.current.scrollHeight });
    },
    [maximized]
  );

  const renderLine = (line: Line) => {
    if (line.kind === 'status') {
      return (
        <div key={line.id} className="mt-4 mb-2 first:mt-0">
          <StatusLine
            cwd={formatPath(line.cwd ?? cwd)}
            branch="feat/redesign"
            modified={2}
            added={years}
            removed={0}
            time={line.time ?? time}
          />
        </div>
      );
    }

    if (line.kind === 'cmd') {
      return (
        <p key={line.id} className="m-0">
          <span className={promptArrow()}>→</span> <span>{line.text}</span>
        </p>
      );
    }

    if (line.kind === 'node') {
      return (
        <div key={line.id} className="text-term-fg">
          {line.node}
        </div>
      );
    }

    return (
      <div key={line.id} className={outputRow({ kind: line.kind })}>
        {line.text || ' '}
      </div>
    );
  };

  return (
    <div
      ref={setShellRef}
      className={shellRoot({ maximized, engaged: shellIsEngaged })}
      role="log"
      aria-live="polite"
      data-no-print
      onFocusCapture={onFocusCapture}
      onBlurCapture={onBlurCapture}
    >
      {lines.map(renderLine)}

      {phase === 'cmd' && (
        <p className="m-0">
          <span className={promptArrow()}>→</span> <span>{typed}</span>
          <Cursor />
        </p>
      )}

      {phase === 'done' && (
        <>
          <div className="mt-4 mb-2">
            <StatusLine
              cwd={formatPath(cwd)}
              branch="feat/redesign"
              modified={2}
              added={years}
              removed={0}
              time={time}
            />
          </div>
          <form onSubmit={onSubmit} className={promptRow()}>
            <span className={promptArrow()}>→</span>
            <PromptInput value={input} onChange={setInput} onKey={onKey} inputRef={inputRef} />
          </form>
        </>
      )}
    </div>
  );
};
