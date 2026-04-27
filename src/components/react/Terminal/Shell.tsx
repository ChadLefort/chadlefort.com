import type { FC, KeyboardEvent } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { tv } from 'tailwind-variants';
import { navigate } from 'astro:transitions/client';
import { useStore } from '@nanostores/react';
import { aboutQuotes } from '~/data/about';
import { locationLong, site, yearsOfExperience } from '~/data/site';
import { useReducedMotion } from '~/hooks/useReducedMotion';
import { useTypewriter } from '~/hooks/useTypewriter';
import { Cursor } from './Cursor';
import { MdRow } from './MdRow';
import { PromptInput } from './PromptInput';
import { StatusLine } from './StatusLine';
import { commands } from './commands';
import type { CommandCtx } from './commands';
import { COMMANDS, closestCommand, findCommonPrefix } from './complete';
import {
  $cwd,
  $history,
  $interactive,
  $lines,
  appendLines as storeAppendLines,
  pushHistory as storePushHistory,
  setCwd as storeSetCwd,
  setInteractive,
  setLines as storeSetLines,
  setMaximized,
  setMinimized,
  type Line,
  type LineBody
} from './store';
import type { MdLine } from './types';
import { formatTime, getSiteHost } from './utils';
import { buildFs, cwdForHost, formatPath, nodeAt, type FsDir } from './vfs';

const shellRoot = tv({
  base: [
    'bg-term-bg text-term-fg break-words font-mono overflow-y-auto h-full',
    'px-4 pt-4 pb-5 text-[12.5px] leading-6',
    'sm:px-5 sm:pt-5 sm:pb-6 sm:text-[15px] sm:leading-7'
  ]
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

const completeFromCwd = (root: FsDir, cwd: string[], prefix: string): { matches: string[]; common: string } => {
  const dirNode = nodeAt(root, cwd);

  if (!dirNode || dirNode.type !== 'dir') return { matches: [], common: prefix };

  const matches = Object.keys(dirNode.children).filter((n) => n.toLowerCase().startsWith(prefix.toLowerCase()));

  return { matches, common: findCommonPrefix(matches) };
};

const DEMO_COMMAND = 'cat ABOUT.md';

const aboutLines = (years: number): MdLine[] => {
  const quoteLines = aboutQuotes.flatMap<MdLine>((text, i) =>
    i === 0 ? [{ kind: 'bq', text }] : [{ kind: 'blank' }, { kind: 'bq', text }]
  );

  return [
    { kind: 'h1', text: site.name },
    { kind: 'blank' },
    { kind: 'p', text: `${site.jobTitle} from ${locationLong} with ${years}+ years of experience.` },
    { kind: 'blank' },
    { kind: 'h2', text: 'About' },
    { kind: 'blank' },
    ...quoteLines
  ];
};

const goTo = (route: string) => {
  window.setTimeout(() => {
    const url = new URL(route, window.location.origin);
    const samePath = url.pathname === window.location.pathname;

    if (samePath && url.hash) {
      const el = document.querySelector(url.hash);

      if (el) {
        setMaximized(false);
        setMinimized(false);
        window.history.replaceState(null, '', url.hash);
        document.body.style.overflow = '';
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          });
        });

        return;
      }
    }

    void navigate(route);
  }, 250);
};

export const Shell: FC = () => {
  const host = getSiteHost();
  const root = useMemo(() => buildFs(host), [host]);
  const years = yearsOfExperience();
  const lines = useStore($lines);
  const cwd = useStore($cwd);
  const history = useStore($history);

  const interactive = useStore($interactive);
  const reducedMotion = useReducedMotion();
  const reducedRef = useRef(reducedMotion);
  const [demoPhase, setDemoPhase] = useState<'cmd' | 'lines' | 'done'>(() => ($interactive.get() ? 'done' : 'cmd'));
  const aboutItems = useMemo(() => aboutLines(years), [years]);
  const [lineIndex, setLineIndex] = useState(0);

  const [input, setInput] = useState('');
  const [histIdx, setHistIdx] = useState<number | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (demoPhase === 'done') {
      inputRef.current?.focus({ preventScroll: true });
    }
  }, [demoPhase]);

  useEffect(() => {
    if ($interactive.get()) return;

    storeAppendLines([{ kind: 'status' }]);
  }, []);

  useEffect(() => {
    if (interactive && demoPhase !== 'done') setDemoPhase('done');
  }, [interactive, demoPhase]);

  const typedFromHook = useTypewriter(DEMO_COMMAND, {
    perChar: 80,
    enabled: demoPhase === 'cmd' && !reducedRef.current,
    onComplete: () => {
      window.setTimeout(() => {
        storeAppendLines([{ kind: 'cmd', text: DEMO_COMMAND }]);
        setDemoPhase('lines');
      }, 200);
    }
  });
  const typed = reducedRef.current ? DEMO_COMMAND : typedFromHook;

  useEffect(() => {
    if (demoPhase !== 'lines') return;

    if (reducedRef.current) {
      storeAppendLines(
        aboutItems.map<LineBody>((line, i) => ({
          kind: 'node',
          node: (
            <div className={i === 0 ? 'mt-3' : ''}>
              <MdRow line={line} />
            </div>
          )
        }))
      );
      setLineIndex(aboutItems.length);
      setDemoPhase('done');
      setInteractive(true);

      return;
    }

    if (lineIndex >= aboutItems.length) {
      setDemoPhase('done');
      setInteractive(true);

      return;
    }

    const id = window.setTimeout(() => {
      const next = aboutItems[lineIndex];

      storeAppendLines([
        {
          kind: 'node',
          node: (
            <div className={`term-line ${lineIndex === 0 ? 'mt-3' : ''}`}>
              <MdRow line={next} />
            </div>
          )
        }
      ]);
      setLineIndex((v) => v + 1);
    }, 35);

    return () => window.clearTimeout(id);
  }, [demoPhase, lineIndex, aboutItems]);

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
    scrollerRef.current?.scrollTo({ top: scrollerRef.current.scrollHeight });
  }, [lines]);

  useEffect(() => {
    const el = scrollerRef.current;

    if (!el) return;

    const onMouseUp = () => {
      const sel = window.getSelection?.();

      if (sel && sel.toString().length > 0) return;

      inputRef.current?.focus();
    };

    el.addEventListener('mouseup', onMouseUp);

    return () => el.removeEventListener('mouseup', onMouseUp);
  }, []);

  const append = (newLines: LineBody[]) => storeAppendLines(newLines);

  const tryComplete = () => {
    const tokens = input.split(/(\s+)/);
    const last = tokens[tokens.length - 1] ?? '';
    const isFirstToken = tokens.filter((t) => t.trim()).length <= 1;

    if (!input.trim()) {
      append([{ kind: 'out', text: COMMANDS.join('  ') }]);
      return;
    }

    if (isFirstToken && last) {
      const cmdMatches = COMMANDS.filter((c) => c.startsWith(last.toLowerCase()));

      if (cmdMatches.length === 1) {
        tokens[tokens.length - 1] = `${cmdMatches[0]} `;
        setInput(tokens.join(''));

        return;
      }

      if (cmdMatches.length > 1) {
        append([{ kind: 'out', text: cmdMatches.join('  ') }]);
        return;
      }
    }

    if (!last) return;

    const { matches, common } = completeFromCwd(root, cwd, last);

    if (matches.length === 0) return;

    if (matches.length === 1) {
      const onlyMatch = matches[0];
      const child = nodeAt(root, [...cwd, onlyMatch]);
      const suffix = child?.type === 'dir' ? '/' : ' ';

      tokens[tokens.length - 1] = onlyMatch + suffix;
      setInput(tokens.join(''));

      return;
    }

    if (common.length > last.length) {
      tokens[tokens.length - 1] = common;
      setInput(tokens.join(''));

      return;
    }

    append([{ kind: 'out', text: matches.join('  ') }]);
  };

  const run = (raw: string) => {
    const cmd = raw.trim();

    append([
      { kind: 'status', cwd: [...cwd], time },
      { kind: 'cmd', text: raw, cwd: [...cwd] }
    ]);

    if (!cmd) return;

    storePushHistory(cmd);

    const [name, ...args] = cmd.split(/\s+/);
    const handler = commands[name];

    if (handler) {
      const ctx: CommandCtx = {
        root,
        cwd,
        setCwd: storeSetCwd,
        append,
        setLines: storeSetLines,
        history,
        years,
        goTo
      };

      handler(args, ctx, name);
      return;
    }

    const guess = closestCommand(name);
    const suggestion = guess ? ` did you mean '${guess}'?` : '';

    append([{ kind: 'err', text: `${name}: command not found.${suggestion}` }]);
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab') {
      if (!input) return;

      e.preventDefault();
      tryComplete();

      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();

      if (history.length === 0) return;
      const next = histIdx === null ? history.length - 1 : Math.max(0, histIdx - 1);

      setHistIdx(next);
      setInput(history[next] ?? '');

      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();

      if (histIdx === null) return;
      const next = histIdx + 1;

      if (next >= history.length) {
        setHistIdx(null);
        setInput('');
      } else {
        setHistIdx(next);
        setInput(history[next]);
      }

      return;
    }

    if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      storeSetLines([]);
    }
  };

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
    <div ref={scrollerRef} className={shellRoot()} role="log" aria-live="polite" data-no-print>
      {lines.map(renderLine)}

      {demoPhase === 'cmd' && (
        <p className="m-0">
          <span className={promptArrow()}>→</span> <span>{typed}</span>
          <Cursor />
        </p>
      )}

      {demoPhase === 'done' && (
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              run(input);
              setInput('');
              setHistIdx(null);
            }}
            className={promptRow()}
          >
            <span className={promptArrow()}>→</span>
            <PromptInput value={input} onChange={setInput} onKey={onKey} inputRef={inputRef} />
          </form>
        </>
      )}
    </div>
  );
};
