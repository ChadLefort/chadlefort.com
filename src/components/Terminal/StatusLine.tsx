import clock from '@iconify-icons/lucide/clock';
import gitBranch from '@iconify-icons/lucide/git-branch';
import minus from '@iconify-icons/lucide/minus';
import pencilLine from '@iconify-icons/lucide/pencil-line';
import plus from '@iconify-icons/lucide/plus';
import apple from '@iconify-icons/simple-icons/apple';
import nodedotjs from '@iconify-icons/simple-icons/nodedotjs';
import type { FC } from 'react';
import { tv } from 'tailwind-variants';
import { Segment } from './Segment';
import { Sep } from './Sep';

const statusStyles = tv({
  base: 'max-w-full flex-nowrap items-center whitespace-nowrap font-mono',
  variants: {
    compact: {
      true: ['text-term-fg bg-term-status-bg/60 flex gap-x-1.5 px-3 py-1 text-[11px] sm:gap-x-2'],
      false: [
        'bg-term-status-bg inline-flex gap-x-1.5 rounded-2xl px-2.5 py-2 text-[10.5px]',
        'sm:gap-x-3 sm:rounded-full sm:px-4 sm:py-1.5 sm:text-[12px]'
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
}) => {
  const mobileBranch = branch.includes('/') ? branch.split('/').at(-1) : branch;

  return (
    <div className={statusStyles({ compact })}>
      <Segment icon={apple} text="clefort" />
      <Sep />
      <Segment text={cwd} hideOnMobile />
      <Sep hideOnMobile />
      <Segment icon={gitBranch} text={branch} mobileText={mobileBranch} tone="branch" />
      {(modified != null || added != null || removed != null) && (
        <>
          <Sep hideOnMobile />
          {modified != null && <Segment icon={pencilLine} text={String(modified)} hideOnMobile />}
          {added != null && <Segment icon={plus} text={String(added)} tone="add" hideOnMobile />}
          {removed != null && <Segment icon={minus} text={String(removed)} tone="del" hideOnMobile />}
        </>
      )}
      <Sep hideOnMobile />
      <Segment icon={nodedotjs} text={nodeVersion} tone="add" hideOnMobile />
      <Sep />
      <Segment icon={clock} text={time ?? '··:··'} data-testid="status-time" />
    </div>
  );
};
