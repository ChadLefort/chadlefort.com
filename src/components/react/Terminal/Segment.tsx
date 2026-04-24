import type { FC } from 'react';
import { tv } from 'tailwind-variants';

import type { SegmentProps } from './types';

const segmentStyles = tv({
  base: 'inline-flex items-center gap-1.5',
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

export const Segment: FC<SegmentProps> = ({ icon: Icon, text, tone, hideOnMobile }) => (
  <span className={segmentStyles({ tone, hideOnMobile })}>
    {Icon && <Icon className="h-3.5 w-3.5" aria-hidden="true" />}
    {text && <span className="font-mono text-[11px] sm:text-[12px]">{text}</span>}
  </span>
);
