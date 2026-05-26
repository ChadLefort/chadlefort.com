import type { FC } from 'react';
import { tv } from 'tailwind-variants';
import type { Job } from '~/data/jobs';
import { useInView } from '~/hooks/useInView';
import { formatMonthYear, toYearMonthDateTime } from '~/utils/date';

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
  base: [
    'timeline-card w-full max-w-full rounded-2xl border border-[var(--border)] bg-surface-raised p-5 md:p-7',
    'print:resume-timeline-card print:!border-[0.5pt] print:!border-solid print:!border-[var(--print-subtle)]',
    'print:!bg-[var(--print-paper)] print:!shadow-none'
  ]
});

const TimelineItem: FC<ItemProps> = ({ job }) => {
  const [ref, inView] = useInView<HTMLLIElement>({ threshold: 0.2, rootMargin: '0px 0px -80px 0px' });

  const dateRange = job.end ? (
    <>
      <time dateTime={toYearMonthDateTime(job.start)}>{formatMonthYear(job.start)}</time>
      <span aria-hidden="true"> – </span>
      <time dateTime={toYearMonthDateTime(job.end)}>{formatMonthYear(job.end)}</time>
    </>
  ) : (
    <>
      <time dateTime={toYearMonthDateTime(job.start)}>{formatMonthYear(job.start)}</time>
      <span aria-hidden="true"> – </span>
      <span>Present</span>
    </>
  );

  return (
    <li ref={ref} className={item({ inView })}>
      <span
        aria-hidden="true"
        className="timeline-dot bg-accent ring-surface absolute top-7 left-0 z-10 inline-flex size-3.5 -translate-x-1/2 items-center justify-center rounded-full ring-4 shadow-[0_0_0_1px_color-mix(in_oklab,var(--accent)_35%,transparent)] print:hidden"
      />

      <article className={card()}>
        <header className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between md:gap-6 print:resume-timeline-header">
          <div>
            <h3 className="font-display text-fg text-xl md:text-2xl">{job.company}</h3>
            <p className="text-accent mt-1 font-medium print:resume-timeline-role">{job.role}</p>
          </div>
          <p className="text-fg-muted shrink-0 font-mono text-xs md:pt-1 md:text-sm print:resume-timeline-date">
            {dateRange}
          </p>
        </header>
        <ul className="text-fg-muted mt-4 space-y-4 leading-relaxed print:resume-timeline-bullets">
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
      className="pointer-events-none absolute top-2 bottom-2 left-0 w-px bg-gradient-to-b from-transparent via-accent/55 to-transparent print:hidden"
    />

    <ol className="print:resume-timeline flex flex-col gap-5 md:gap-6" aria-label="Employment history">
      {jobs.map((job) => (
        <TimelineItem key={job.company + job.start} job={job} />
      ))}
    </ol>
  </div>
);
