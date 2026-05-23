import type { FC } from 'react';
import { tv } from 'tailwind-variants';
import type { Job } from '~/data/jobs';
import { useInView } from '~/hooks/useInView';
import { toYearMonth } from '~/utils/date';

type Props = { jobs: Job[] };

type ItemProps = { job: Job };

const item = tv({
  base: 'timeline-item relative pl-10 print:resume-timeline-item',
  variants: {
    inView: {
      true: 'is-visible',
      false: ''
    }
  }
});

const card = tv({
  base: 'timeline-card job-card w-full max-w-full p-5 md:p-7 print:resume-timeline-card print:!bg-[var(--print-paper)] print:!shadow-none print:!border-[0.5pt] print:!border-solid print:!border-[var(--print-subtle)]'
});

const TimelineItem: FC<ItemProps> = ({ job }) => {
  const [ref, inView] = useInView<HTMLLIElement>({ threshold: 0.2, rootMargin: '0px 0px -80px 0px' });

  const startDateTime = toYearMonth(job.start);
  const endDateTime = toYearMonth(job.end);
  const dateRange = (
    <>
      {startDateTime ? <time dateTime={startDateTime}>{job.start}</time> : <span>{job.start}</span>}
      <span aria-hidden="true"> – </span>
      {endDateTime ? <time dateTime={endDateTime}>{job.end}</time> : <span>{job.end}</span>}
    </>
  );

  return (
    <li ref={ref} className={item({ inView })}>
      <span
        aria-hidden="true"
        className="timeline-dot bg-accent ring-surface absolute top-7 left-0 z-10 inline-flex size-3.5 -translate-x-1/2 items-center justify-center rounded-full ring-4 print:hidden"
      />

      <article className={card()}>
        <header className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between md:gap-6 print:resume-timeline-header">
          <div>
            <h3 className="font-display text-fg text-xl md:text-2xl">{job.company}</h3>
            <p className="text-accent mt-1 text-sm font-medium md:text-base print:resume-timeline-role">{job.role}</p>
          </div>
          <p className="text-fg-muted shrink-0 font-mono text-xs md:pt-1 md:text-sm print:resume-timeline-date">
            {dateRange}
          </p>
        </header>
        <ul className="text-fg-muted mt-4 space-y-4 text-sm leading-relaxed md:text-base print:resume-timeline-bullets">
          {job.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-4">
              <span aria-hidden="true" className="bg-accent mt-2 inline-block size-1.5 shrink-0 rounded-full" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </article>
    </li>
  );
};

export const JobTimeline: FC<Props> = ({ jobs }) => (
  <div className="relative w-full">
    <span
      aria-hidden="true"
      className="pointer-events-none absolute top-2 bottom-2 left-0 w-px bg-gradient-to-b from-transparent via-accent/25 to-transparent print:hidden"
    />

    <ol className="print:resume-timeline flex flex-col gap-5 md:gap-6" aria-label="Employment history">
      {jobs.map((job) => (
        <TimelineItem key={job.company + job.start} job={job} />
      ))}
    </ol>
  </div>
);
