import type { FC } from 'react';
import { tv } from 'tailwind-variants';
import apple from '@iconify-icons/simple-icons/apple';
import nodedotjs from '@iconify-icons/simple-icons/nodedotjs';
import clock from '@iconify-icons/lucide/clock';
import gitBranch from '@iconify-icons/lucide/git-branch';
import minus from '@iconify-icons/lucide/minus';
import pencilLine from '@iconify-icons/lucide/pencil-line';
import plus from '@iconify-icons/lucide/plus';
import { Segment } from './Segment';
import { Sep } from './Sep';

const statusStyles = tv({
  base: 'max-w-full flex-wrap items-center font-mono',
  variants: {
    compact: {
      true: ['text-term-fg bg-term-status-bg/60 flex gap-x-2 gap-y-1 px-3 py-1 text-[11px]'],
      false: [
        'bg-term-status-bg inline-flex gap-x-2 gap-y-2 rounded-2xl px-4 py-2.5 shadow-inner shadow-black/10',
        'sm:gap-x-3 sm:rounded-full sm:px-4 sm:py-1.5'
      ]
    }
  },
  defaultVariants: {
    compact: false
  }
});

type Props = {
  cwd?: string;
  branch?: string;
  modified?: number;
  added?: number;
  removed?: number;
  nodeVersion?: string;
  time?: string | null;
  compact?: boolean;
};

export const StatusLine: FC<Props> = ({
  cwd = '~/development/chadlefort.com',
  branch = 'master',
  modified,
  added,
  removed,
  nodeVersion = 'v24.15.0',
  time,
  compact = false
}) => (
  <div className={statusStyles({ compact })}>
    <Segment icon={apple} text="clefort" />
    <Sep />
    <Segment text={cwd} hideOnMobile />
    <Sep hideOnMobile />
    <Segment icon={gitBranch} text={branch} tone="branch" />
    {(modified != null || added != null || removed != null) && (
      <>
        <Sep />
        {modified != null && <Segment icon={pencilLine} text={String(modified)} hideOnMobile />}
        {added != null && <Segment icon={plus} text={String(added)} tone="add" hideOnMobile />}
        {removed != null && <Segment icon={minus} text={String(removed)} tone="del" hideOnMobile />}
      </>
    )}
    <Sep hideOnMobile />
    <Segment icon={nodedotjs} text={nodeVersion} tone="add" hideOnMobile />
    <Sep hideOnMobile />
    <Segment icon={clock} text={time ?? '—:—'} />
  </div>
);
