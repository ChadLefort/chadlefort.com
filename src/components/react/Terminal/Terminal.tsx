import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { yearsOfExperience } from '~/data/site';
import { useInView } from '~/hooks/useInView';
import { useReducedMotion } from '~/hooks/useReducedMotion';
import { useTypewriter } from '~/hooks/useTypewriter';
import { Cursor } from './Cursor';
import { MdRow } from './MdRow';
import { Segment } from './Segment';
import { Sep } from './Sep';
import { Tab } from './Tab';
import { TrafficLights } from './TrafficLights';
import type { MdLine } from './types';

type IdentifiedLine = MdLine & { id: string };

const lines = (years: number): IdentifiedLine[] =>
  (
    [
      { kind: 'h1', text: 'Chad Lefort' },
      { kind: 'blank' },
      { kind: 'p', text: `Senior frontend engineer from Mandeville, Louisiana with ${years}+ years of experience.` },
      { kind: 'blank' },
      { kind: 'h2', text: 'About' },
      { kind: 'blank' },
      {
        kind: 'bq',
        text: 'Shortly after I was given my first computer, I developed a strong passion for programming.'
      },
      { kind: 'blank' },
      {
        kind: 'bq',
        text: "I'm constantly furthering my skills to keep up with the ever changing demand the web has."
      },
      { kind: 'blank' },
      {
        kind: 'bq',
        text: 'I enjoy the feeling of accomplishment when programming, and I take pride in writing maintainable and efficient code.'
      },
      { kind: 'blank' },
      {
        kind: 'bq',
        text: 'Committed to team success, I prioritize delivering exceptional products that provide an outstanding user experience.'
      }
    ] as MdLine[]
  ).map((line, i) => ({ ...line, id: `${line.kind}-${i}` }));

type Props = { prefersReducedMotion?: boolean };

const formatTime = () => new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

const COMMAND = 'cat ABOUT.md';

export const Terminal: FC<Props> = ({ prefersReducedMotion }) => {
  const years = yearsOfExperience();
  const [cmdDone, setCmdDone] = useState(false);
  const [lineIndex, setLineIndex] = useState(0);
  const [time, setTime] = useState<string | null>(null);
  const motionPref = useReducedMotion();
  const reduced = useRef(prefersReducedMotion ?? motionPref);
  const body = lines(years);
  const [containerRef, inView] = useInView<HTMLDivElement>({ threshold: 0.25, respectReducedMotion: false });

  const onCommandTyped = () => {
    window.setTimeout(() => setCmdDone(true), 200);
  };

  const typedFromHook = useTypewriter(COMMAND, {
    perChar: 80,
    enabled: inView && !reduced.current,
    onComplete: onCommandTyped
  });
  const typed = reduced.current ? COMMAND : typedFromHook;

  useEffect(() => {
    if (reduced.current) {
      setCmdDone(true);
      setLineIndex(body.length);
    }
  }, [body.length]);

  useEffect(() => {
    if (!cmdDone || reduced.current) return;
    if (lineIndex >= body.length) return;

    const timer = window.setTimeout(() => setLineIndex((v) => v + 1), 35);

    return () => window.clearTimeout(timer);
  }, [cmdDone, lineIndex, body.length]);

  useEffect(() => {
    setTime(formatTime());
    const tick = () => setTime(formatTime());
    const now = new Date();
    const msToNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
    let interval: number | undefined;
    const timeout = window.setTimeout(() => {
      tick();
      interval = window.setInterval(tick, 60_000);
    }, msToNextMinute);

    return () => {
      window.clearTimeout(timeout);
      if (interval) window.clearInterval(interval);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="max-w-section ring-glass-border relative mx-auto w-full overflow-hidden rounded-2xl ring-1"
      aria-label="Terminal introduction"
      data-no-print
    >
      <div className="bg-term-menu-bg flex items-center px-3 py-3 sm:px-4 sm:py-3.5">
        <TrafficLights />
      </div>
      <div className="bg-term-menu-bg flex items-end gap-1 overflow-x-auto px-2 sm:px-3">
        <Tab icon="simple-icons:tmux" label="chadlefort.com" active />
        <Tab idx={1} icon="simple-icons:neovim" label="nvim" href="/#skills" hideOnMobile />
        <Tab idx={2} icon="lucide:folder-git-2" label="~/dotfiles" href="https://github.com/ChadLefort" hideOnMobile />
        <Tab idx={3} mobileIdx={1} icon="lucide:folder" label="~/projects" href="/projects" />
      </div>

      <div className="bg-term-bg px-3 pt-4 sm:px-4 sm:pt-6 sm:pb-1">
        <div className="bg-term-status-bg inline-flex max-w-full flex-wrap items-center gap-x-2 gap-y-2 rounded-2xl px-4 py-2.5 shadow-inner shadow-black/10 sm:gap-x-3 sm:rounded-full sm:px-4 sm:py-1.5">
          <Segment icon="simple-icons:apple" text="clefort" />
          <Sep />
          <Segment text="~/development/chadlefort.com" hideOnMobile />
          <Sep hideOnMobile />
          <Segment icon="lucide:git-branch" text="main" tone="branch" />
          <Sep />
          <Segment icon="lucide:pencil-line" text="2" hideOnMobile />
          <Segment icon="lucide:plus" text={String(years)} tone="add" />
          <Segment icon="lucide:minus" text="0" tone="del" hideOnMobile />
          <Sep hideOnMobile />
          <Segment icon="simple-icons:nodedotjs" text="v24.15.0" tone="add" hideOnMobile />
          <Sep hideOnMobile />
          <Segment icon="lucide:clock" text={time ?? '—:—'} />
        </div>
      </div>

      <div className="bg-term-bg text-term-fg h-auto min-h-[520px] px-4 pt-3 pb-5 font-mono text-[12.5px] leading-6 break-words sm:min-h-[420px] sm:px-5 sm:pt-4 sm:pb-6 sm:text-[15px] sm:leading-7">
        <p className="m-0">
          <span className="text-term-prompt">→</span> <span>{typed}</span>
          {!cmdDone && <Cursor />}
        </p>

        {cmdDone && (
          <div className="mt-3">
            {body.slice(0, lineIndex).map((line) => (
              <div key={line.id} className="term-line">
                <MdRow line={line} />
              </div>
            ))}
            {lineIndex >= body.length && (
              <p className="m-0 mt-3">
                <span className="text-term-prompt">→</span> <Cursor />
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
