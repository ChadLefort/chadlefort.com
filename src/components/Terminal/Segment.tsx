import type { FC } from 'react';
import { tv } from 'tailwind-variants';
import type { TermIcon } from './icons';

const segmentStyles = tv({
  base: 'inline-flex min-w-0 items-center gap-1 whitespace-nowrap sm:gap-1.5',
  variants: {
    tone: {
      fg: 'text-term-fg',
      branch: 'text-term-branch',
      add: 'text-term-add',
      del: 'text-term-del',
      info: 'text-term-info'
    },
    hideOnMobile: {
      true: 'hidden md:inline-flex'
    }
  },
  defaultVariants: {
    tone: 'fg'
  }
});

type SegmentProps = {
  icon?: TermIcon;
  text?: string;
  tone?: 'fg' | 'branch' | 'add' | 'del' | 'info';
  hideOnMobile?: boolean;
  className?: string;
  'data-testid'?: string;
};

export const Segment: FC<SegmentProps> = ({
  icon: SegmentIcon,
  text,
  tone,
  hideOnMobile,
  className,
  'data-testid': dataTestId
}) => (
  <span className={segmentStyles({ tone, hideOnMobile, className })} data-testid={dataTestId}>
    {SegmentIcon && <SegmentIcon className="size-3 shrink-0 sm:size-3.5" aria-hidden="true" />}
    {text && <span className="font-mono text-[inherit] leading-none">{text}</span>}
  </span>
);
