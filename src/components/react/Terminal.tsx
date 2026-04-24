import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import {
  Apple,
  ChevronRight,
  Clock,
  Code2,
  Folder,
  FolderGit2,
  GitBranch,
  Hexagon,
  Minus,
  PencilLine,
  Plus,
  Briefcase
} from 'lucide-react';
import { yearsOfExperience } from '~/data/site';

const lines = (years: number) => [
  {
    text: `# Hello, I'm Chad - a senior frontend engineer from Mandeville, Louisiana with ${years}+ years of development experience.`
  },
  { text: '# Shortly after I was given my first computer, I developed a strong passion for programming.' },
  { text: "# I'm constantly furthering my skills to keep up with the ever changing demand of the web." },
  { text: '# I take pride in writing maintainable, accessible, and efficient code.' },
  { text: '# Committed to team success, I prioritize delivering exceptional user experiences.' }
];

const Cursor: FC = () => (
  <span
    aria-hidden="true"
    className="blink ml-[1px] inline-block h-[1.05em] w-[0.6em] translate-y-[2px] bg-[var(--text)]"
  />
);

type Props = { prefersReducedMotion?: boolean };

const prefsReduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

type TabProps = {
  idx?: number;
  icon: typeof Folder;
  label: string;
  active?: boolean;
  href?: string;
  hideOnMobile?: boolean;
};

const Tab: FC<TabProps> = ({ idx, icon: Icon, label, active, href, hideOnMobile }) => {
  const className = `inline-flex items-center gap-2 rounded-t-xl px-3 py-2 text-[12px] font-medium transition sm:px-4 ${hideOnMobile ? 'hidden sm:inline-flex' : ''} ${href ? 'cursor-pointer hover:brightness-110' : ''}`;
  const style = active
    ? { background: 'var(--term-tab-active)', color: 'var(--term-tab-text)' }
    : { background: 'var(--term-tab-inactive)', color: 'color-mix(in oklab, var(--term-fg) 80%, transparent)' };
  const inner = (
    <>
      {idx != null && <span className="font-mono opacity-80">{idx}</span>}
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      <span className="font-mono">{label}</span>
    </>
  );

  if (href) {
    const external = href.startsWith('http');

    return (
      <a href={href} className={className} style={style} {...(external ? { target: '_blank', rel: 'noopener' } : {})}>
        {inner}
      </a>
    );
  }

  return (
    <span className={className} style={style}>
      {inner}
    </span>
  );
};

type SegProps = {
  icon?: typeof Folder;
  text?: string;
  color?: string;
  hideOnMobile?: boolean;
};

const Segment: FC<SegProps> = ({ icon: Icon, text, color = 'var(--term-fg)', hideOnMobile }) => (
  <span className={`inline-flex items-center gap-1.5 ${hideOnMobile ? 'hidden md:inline-flex' : ''}`} style={{ color }}>
    {Icon && <Icon className="h-3.5 w-3.5" aria-hidden="true" />}
    {text && <span className="font-mono text-[11px] sm:text-[12px]">{text}</span>}
  </span>
);

type SepProps = { hideOnMobile?: boolean };

const Sep: FC<SepProps> = ({ hideOnMobile }) => (
  <ChevronRight
    className={`h-3.5 w-3.5 shrink-0 ${hideOnMobile ? 'hidden md:inline-block' : ''}`}
    style={{ color: 'var(--term-sep)' }}
    aria-hidden="true"
  />
);

const formatTime = () => new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

export const Terminal: FC<Props> = ({ prefersReducedMotion }) => {
  const years = yearsOfExperience();
  const [typed, setTyped] = useState('');
  const [cmdDone, setCmdDone] = useState(false);
  const [lineIndex, setLineIndex] = useState(0);
  const [time, setTime] = useState<string | null>(null);
  const reduced = useRef(prefersReducedMotion ?? prefsReduced());
  const body = lines(years);

  useEffect(() => {
    if (reduced.current) {
      setTyped('./chad-lefort.sh');
      setCmdDone(true);
      setLineIndex(body.length);

      return;
    }

    const command = './chad-lefort.sh';
    let i = 0;
    const timer = window.setInterval(() => {
      i += 1;
      setTyped(command.slice(0, i));
      if (i >= command.length) {
        window.clearInterval(timer);
        window.setTimeout(() => setCmdDone(true), 250);
      }
    }, 90);

    return () => window.clearInterval(timer);
  }, [body.length]);

  useEffect(() => {
    if (!cmdDone || reduced.current) return;
    if (lineIndex >= body.length) return;

    const timer = window.setTimeout(() => setLineIndex((v) => v + 1), 380);

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
      className="max-w-section relative mx-auto w-full overflow-hidden rounded-2xl ring-1 ring-[var(--glass-border)]"
      aria-label="Terminal introduction"
      data-no-print
    >
      <div
        className="flex items-end gap-1 overflow-x-auto px-2 pt-2 sm:px-3 sm:pt-3"
        style={{ background: 'var(--term-menu-bg)' }}
      >
        <Tab icon={Folder} label="chadlefort.com" active />
        <Tab idx={1} icon={Code2} label="nvim" href="/#skills" hideOnMobile />
        <Tab idx={2} icon={FolderGit2} label="~/dotfiles" href="https://github.com/ChadLefort" hideOnMobile />
        <Tab idx={3} icon={Folder} label="~/projects" href="/projects" />
      </div>

      <div className="px-3 py-2 sm:px-4 sm:py-3" style={{ background: 'var(--term-bg)' }}>
        <div
          className="inline-flex max-w-full flex-wrap items-center gap-x-2 gap-y-1 rounded-full px-3 py-1.5 shadow-inner shadow-black/10 sm:gap-x-3 sm:px-4"
          style={{ background: 'var(--term-status-bg)' }}
        >
          <Segment icon={Apple} text="clefort" />
          <Sep />
          <Segment text="~/development/chadlefort.com" hideOnMobile />
          <Sep hideOnMobile />
          <Segment icon={GitBranch} text="v2" color="var(--term-branch)" />
          <Sep />
          <Segment icon={Briefcase} hideOnMobile />
          <Sep hideOnMobile />
          <Segment icon={PencilLine} text="2" hideOnMobile />
          <Sep hideOnMobile />
          <Segment icon={Plus} text={String(years)} color="var(--term-add)" />
          <Sep />
          <Segment icon={Minus} text="0" color="var(--term-del)" hideOnMobile />
          <Sep hideOnMobile />
          <Segment icon={Hexagon} text="v24.14.1" color="var(--term-info)" hideOnMobile />
          <Sep hideOnMobile />
          <Segment icon={Clock} text={time ?? '—:—'} />
        </div>
      </div>

      <div
        className="min-h-[280px] px-4 pt-3 pb-5 font-mono text-[12.5px] leading-6 break-words sm:min-h-[420px] sm:px-5 sm:pt-4 sm:pb-6 sm:text-[15px] sm:leading-7"
        style={{ background: 'var(--term-bg)', color: 'var(--term-fg)' }}
      >
        <p className="m-0">
          <span style={{ color: 'var(--term-prompt)' }}>→</span> <span>{typed}</span>
          {!cmdDone && <Cursor />}
        </p>

        {cmdDone && (
          <div className="mt-3 space-y-1">
            {body.slice(0, lineIndex).map((line) => (
              <p key={line.text} className="m-0" style={{ color: 'var(--term-comment)' }}>
                {line.text}
              </p>
            ))}
            {lineIndex >= body.length && (
              <p className="m-0 mt-3">
                <span style={{ color: 'var(--term-prompt)' }}>→</span> <Cursor />
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
