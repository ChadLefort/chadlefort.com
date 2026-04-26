import type { FC } from 'react';
import { useInView } from '~/hooks/useInView';
import type { Job } from '~/data/jobs';

type Props = { jobs: Job[] };

type ItemProps = { job: Job; isLeft: boolean };

const TimelineItem: FC<ItemProps> = ({ job, isLeft }) => {
  const [ref, inView] = useInView<HTMLLIElement>({ threshold: 0.3, rootMargin: '0px 0px -80px 0px' });

  const card = (
    <div className={`timeline-card ${isLeft ? 'timeline-card-left' : ''} card card-hover p-6 md:p-8`}>
      <header className={`flex flex-col gap-1 ${isLeft ? 'md:items-end' : ''}`}>
        <h3 className="font-display text-fg text-xl md:text-2xl">{job.company}</h3>
        <p className="text-accent text-sm font-semibold md:text-base">{job.role}</p>
        <p className="text-fg-muted font-mono text-xs md:hidden">
          {job.start} &ndash; {job.end}
        </p>
      </header>
      <ul className={`text-fg-muted mt-4 space-y-2 text-sm leading-relaxed md:text-base ${isLeft ? 'text-left' : ''}`}>
        {job.bullets.map((bullet) => (
          <li key={bullet} className="flex gap-2">
            <span aria-hidden="true" className="bg-accent mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  const dateBlock = (
    <p className="timeline-date text-fg-muted font-mono text-sm tracking-wide">
      <span className="text-accent">{job.start}</span> &mdash; {job.end}
    </p>
  );

  return (
    <li
      ref={ref}
      className={`timeline-item print-job relative pl-12 md:grid md:grid-cols-2 md:items-center md:gap-x-16 md:pl-0 ${inView ? 'is-visible' : ''}`}
    >
      <span
        aria-hidden="true"
        className="timeline-dot bg-accent ring-surface absolute top-6 left-4 z-10 inline-flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full ring-4 md:top-1/2 md:left-1/2 md:-translate-y-1/2 print:hidden"
      />

      {isLeft ? (
        <>
          <div className="md:order-1 md:text-right">{card}</div>
          <div className="hidden md:order-2 md:block">{dateBlock}</div>
        </>
      ) : (
        <>
          <div className="hidden md:order-1 md:block md:text-right">{dateBlock}</div>
          <div className="md:order-2">{card}</div>
        </>
      )}
    </li>
  );
};

export const JobTimeline: FC<Props> = ({ jobs }) => (
  <div className="relative mx-auto w-full max-w-6xl">
    <span
      aria-hidden="true"
      className="via-accent/40 pointer-events-none absolute top-0 bottom-0 left-4 w-px bg-gradient-to-b from-transparent to-transparent md:left-1/2 md:-translate-x-1/2 print:hidden"
    />

    <ol className="print-timeline flex flex-col gap-6 md:gap-16" aria-label="Employment history">
      {jobs.map((job, index) => (
        <TimelineItem key={job.company + job.start} job={job} isLeft={index % 2 === 0} />
      ))}
    </ol>
  </div>
);
