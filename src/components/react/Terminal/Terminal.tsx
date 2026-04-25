import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { animate, m, LazyMotion, MotionConfig, domAnimation, useMotionValue, useTransform } from 'motion/react';
import {
  Apple,
  Briefcase,
  Clock,
  Code2,
  Folder,
  FolderGit2,
  GitBranch,
  Hexagon,
  Minus,
  PencilLine,
  Plus
} from 'lucide-react';
import { yearsOfExperience } from '~/data/site';
import { useReducedMotion } from '~/hooks/useReducedMotion';
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

  const charCount = useMotionValue(0);
  const typed = useTransform(charCount, (v) => COMMAND.slice(0, Math.round(v)));

  useEffect(() => {
    if (reduced.current) {
      charCount.set(COMMAND.length);
      setCmdDone(true);
      setLineIndex(body.length);

      return;
    }

    const controls = animate(charCount, COMMAND.length, {
      type: 'tween',
      duration: 1.1,
      ease: 'easeInOut',
      onComplete: () => window.setTimeout(() => setCmdDone(true), 200)
    });

    return () => controls.stop();
  }, [body.length, charCount]);

  useEffect(() => {
    if (!cmdDone || reduced.current) return;
    if (lineIndex >= body.length) return;

    const timer = window.setTimeout(() => setLineIndex((v) => v + 1), 90);

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
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <div
          className="max-w-section ring-glass-border relative mx-auto w-full overflow-hidden rounded-2xl ring-1"
          aria-label="Terminal introduction"
          data-no-print
        >
          <div className="bg-term-menu-bg flex items-center px-3 py-3 sm:px-4 sm:py-3.5">
            <TrafficLights />
          </div>
          <div className="bg-term-menu-bg flex items-end gap-1 overflow-x-auto px-2 sm:px-3">
            <Tab icon={Folder} label="chadlefort.com" active />
            <Tab idx={1} icon={Code2} label="nvim" href="/#skills" hideOnMobile />
            <Tab idx={2} icon={FolderGit2} label="~/dotfiles" href="https://github.com/ChadLefort" hideOnMobile />
            <Tab idx={3} mobileIdx={1} icon={Folder} label="~/projects" href="/projects" />
          </div>

          <div className="bg-term-bg px-3 pt-4 sm:px-4 sm:pt-6 sm:pb-1">
            <div className="bg-term-status-bg inline-flex max-w-full flex-wrap items-center gap-x-2 gap-y-2 rounded-2xl px-4 py-2.5 shadow-inner shadow-black/10 sm:gap-x-3 sm:rounded-full sm:px-4 sm:py-1.5">
              <Segment icon={Apple} text="clefort" />
              <Sep />
              <Segment text="~/development/chadlefort.com" hideOnMobile />
              <Sep hideOnMobile />
              <Segment icon={GitBranch} text="v2" tone="branch" />
              <Sep />
              <Segment icon={Briefcase} hideOnMobile />
              <Sep hideOnMobile />
              <Segment icon={PencilLine} text="2" hideOnMobile />
              <Sep hideOnMobile />
              <Segment icon={Plus} text={String(years)} tone="add" />
              <Sep />
              <Segment icon={Minus} text="0" tone="del" hideOnMobile />
              <Sep hideOnMobile />
              <Segment icon={Hexagon} text="v24.14.1" tone="info" hideOnMobile />
              <Sep hideOnMobile />
              <Segment icon={Clock} text={time ?? '—:—'} />
            </div>
          </div>

          <div className="bg-term-bg text-term-fg h-auto min-h-[520px] px-4 pt-3 pb-5 font-mono text-[12.5px] leading-6 break-words sm:min-h-[420px] sm:px-5 sm:pt-4 sm:pb-6 sm:text-[15px] sm:leading-7">
            <p className="m-0">
              <span className="text-term-prompt">→</span> <m.span>{typed}</m.span>
              {!cmdDone && <Cursor />}
            </p>

            {cmdDone && (
              <div className="mt-3">
                {body.slice(0, lineIndex).map((line) => (
                  <m.div
                    key={line.id}
                    initial={reduced.current ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                  >
                    <MdRow line={line} />
                  </m.div>
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
      </MotionConfig>
    </LazyMotion>
  );
};
