import type { FC } from 'react';
import { m, LazyMotion, MotionConfig, domAnimation, type Variants } from 'motion/react';
import { useMediaQuery } from '~/hooks/useMediaQuery';
import { useReducedMotion } from '~/hooks/useReducedMotion';
import type { Job } from '~/data/jobs';

type Props = { jobs: Job[] };

const cardVariants: Variants = {
  offscreen: (fromLeft: boolean) => ({
    opacity: 0,
    x: fromLeft ? -32 : 32,
    y: 16
  }),
  onscreen: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { type: 'spring', bounce: 0.15, duration: 0.45 }
  }
};

const dotVariants: Variants = {
  offscreen: { scale: 0, opacity: 0 },
  onscreen: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 600, damping: 20, delay: 0.05 }
  }
};

const dateVariants: Variants = {
  offscreen: { opacity: 0, y: 6 },
  onscreen: { opacity: 1, y: 0, transition: { duration: 0.25, delay: 0.1 } }
};

export const JobTimeline: FC<Props> = ({ jobs }) => {
  const reduced = useReducedMotion();
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const initial = reduced ? 'onscreen' : 'offscreen';

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <div className="relative mx-auto w-full max-w-6xl">
          <span
            aria-hidden="true"
            className="via-accent/40 pointer-events-none absolute top-0 bottom-0 left-4 w-px bg-gradient-to-b from-transparent to-transparent md:left-1/2 md:-translate-x-1/2 print:hidden"
          />

          <ol className="flex flex-col gap-6 md:gap-16" aria-label="Employment history">
            {jobs.map((job, index) => {
              const isLeft = index % 2 === 0;
              const fromLeft = isDesktop && isLeft;
              const viewport = { once: true, amount: 0.15, margin: '0px 0px -40px 0px' };

              const card = (
                <m.div
                  variants={cardVariants}
                  custom={fromLeft}
                  className="card card-hover p-6 md:p-8"
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <header className={`flex flex-col gap-1 ${isLeft ? 'md:items-end' : ''}`}>
                    <h3 className="font-display text-fg text-xl md:text-2xl">{job.company}</h3>
                    <p className="text-accent text-sm font-semibold md:text-base">{job.role}</p>
                    <p className="text-fg-muted font-mono text-xs md:hidden">
                      {job.start} &ndash; {job.end}
                    </p>
                  </header>
                  <ul
                    className={`text-fg-muted mt-4 space-y-2 text-sm leading-relaxed md:text-base ${isLeft ? 'text-left' : ''}`}
                  >
                    {job.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2">
                        <span
                          aria-hidden="true"
                          className="bg-accent mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </m.div>
              );

              const dateBlock = (
                <m.p variants={dateVariants} className="text-fg-muted font-mono text-sm tracking-wide">
                  <span className="text-accent">{job.start}</span> &mdash; {job.end}
                </m.p>
              );

              return (
                <m.li
                  key={`${job.company}${job.start}-${isDesktop ? 'd' : 'm'}`}
                  initial={initial}
                  whileInView="onscreen"
                  viewport={viewport}
                  className="print-job relative pl-12 md:grid md:grid-cols-2 md:items-center md:gap-x-16 md:pl-0"
                >
                  <m.span
                    aria-hidden="true"
                    variants={dotVariants}
                    className="bg-accent ring-surface absolute top-6 left-4 z-10 inline-flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full ring-4 md:top-1/2 md:left-1/2 md:-translate-y-1/2 print:hidden"
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
                </m.li>
              );
            })}
          </ol>
        </div>
      </MotionConfig>
    </LazyMotion>
  );
};
