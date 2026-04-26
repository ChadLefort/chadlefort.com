import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { tv } from 'tailwind-variants';
import { aboutQuotes } from '~/data/about';
import { locationLong, site, yearsOfExperience } from '~/data/site';
import { useInView } from '~/hooks/useInView';
import { useReducedMotion } from '~/hooks/useReducedMotion';
import { useTypewriter } from '~/hooks/useTypewriter';
import { Cursor } from './Cursor';
import { MdRow } from './MdRow';
import { StatusLine } from './StatusLine';
import type { MdLine } from './types';
import { formatTime, getSiteHost } from './utils';
import { cwdForHost, formatPath } from './vfs';

const demoBody = tv({
  base: [
    'bg-term-bg text-term-fg break-words font-mono h-full overflow-y-auto',
    'px-4 pt-4 pb-5 text-[12.5px] leading-6',
    'sm:px-5 sm:pt-5 sm:pb-6 sm:text-[15px] sm:leading-7'
  ]
});

type IdentifiedLine = MdLine & { id: string };

const lines = (years: number): IdentifiedLine[] => {
  const quoteLines = aboutQuotes.flatMap<MdLine>((text, i) =>
    i === 0 ? [{ kind: 'bq', text }] : [{ kind: 'blank' }, { kind: 'bq', text }]
  );

  const all: MdLine[] = [
    { kind: 'h1', text: site.name },
    { kind: 'blank' },
    { kind: 'p', text: `${site.jobTitle} from ${locationLong} with ${years}+ years of experience.` },
    { kind: 'blank' },
    { kind: 'h2', text: 'About' },
    { kind: 'blank' },
    ...quoteLines
  ];

  return all.map((line, i) => ({ ...line, id: `${line.kind}-${i}` }));
};

const COMMAND = 'cat ABOUT.md';

const DEMO_STATUS = {
  branch: 'feat/redesign',
  modified: 2,
  removed: 0
} as const;

type Props = { paused: boolean };

export const DemoBody: FC<Props> = ({ paused }) => {
  const years = yearsOfExperience();
  const items = lines(years);
  const [cmdDone, setCmdDone] = useState(false);
  const [lineIndex, setLineIndex] = useState(0);
  const [time, setTime] = useState<string | null>(null);
  const motionPref = useReducedMotion();
  const reduced = useRef(motionPref);
  const [containerRef, inView] = useInView<HTMLDivElement>({ threshold: 0.25, respectReducedMotion: false });

  const typedFromHook = useTypewriter(COMMAND, {
    perChar: 80,
    enabled: inView && !reduced.current && !paused,
    onComplete: () => {
      window.setTimeout(() => setCmdDone(true), 200);
    }
  });
  const typed = reduced.current ? COMMAND : typedFromHook;

  useEffect(() => {
    if (reduced.current) {
      setCmdDone(true);
      setLineIndex(items.length);
    }
  }, [items.length]);

  useEffect(() => {
    if (!cmdDone || reduced.current || paused) return;
    if (lineIndex >= items.length) return;

    const timer = window.setTimeout(() => setLineIndex((v) => v + 1), 35);

    return () => window.clearTimeout(timer);
  }, [cmdDone, lineIndex, items.length, paused]);

  useEffect(() => {
    setTime(formatTime());
    const tick = () => setTime(formatTime());
    const id = window.setInterval(tick, 60_000);

    return () => window.clearInterval(id);
  }, []);

  const status = (
    <StatusLine
      cwd={formatPath(cwdForHost(getSiteHost()))}
      branch={DEMO_STATUS.branch}
      modified={DEMO_STATUS.modified}
      added={years}
      removed={DEMO_STATUS.removed}
      time={time}
    />
  );

  return (
    <div ref={containerRef} className={demoBody()}>
      <div className="mb-2">{status}</div>

      <p className="m-0">
        <span className="text-term-prompt">→</span> <span>{typed}</span>
        {!cmdDone && <Cursor />}
      </p>

      {cmdDone && (
        <div className="mt-3">
          {items.slice(0, lineIndex).map((line) => (
            <div key={line.id} className="term-line">
              <MdRow line={line} />
            </div>
          ))}
          {lineIndex >= items.length && (
            <>
              <div className="mt-4 mb-2">{status}</div>
              <p className="m-0">
                <span className="text-term-prompt">→</span> <Cursor />
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};
