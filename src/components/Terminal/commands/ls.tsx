import { Icon } from '@iconify/react';
import type { FC } from 'react';
import { tv } from 'tailwind-variants';
import { type FsNode, iconForNode, nodeAt, resolvePath } from '../vfs';
import type { Command } from './types';

const lsRow = tv({ base: 'flex items-center gap-2' });
const lsName = tv({ base: 'text-term-fg flex-1' });
const lsGit = tv({
  base: 'shrink-0 text-[11px]',
  variants: {
    status: {
      N: 'text-term-add',
      M: 'text-term-branch',
      I: 'text-term-comment',
      '--': 'text-term-comment'
    }
  },
  defaultVariants: { status: '--' }
});

const LsRow: FC<{ entry: FsNode }> = ({ entry }) => {
  const { icon, color } = iconForNode(entry);
  const dirSlash = entry.type === 'dir' ? '/' : '';

  return (
    <div className={lsRow()}>
      <Icon icon={icon} className={`h-4 w-4 shrink-0 ${color}`} aria-hidden="true" />
      <span className={lsName()}>
        {entry.name}
        {dirSlash}
      </span>
      <span className={lsGit({ status: entry.git ?? '--' })}>{entry.git ?? '--'}</span>
    </div>
  );
};

export const ls: Command = (args, ctx, name) => {
  const flags = args.filter((a) => a.startsWith('-')).join('');
  const target = args.find((a) => !a.startsWith('-'));
  const path = target ? resolvePath(ctx.cwd, target) : ctx.cwd;
  const node = path ? nodeAt(ctx.root, path) : null;

  if (!node) {
    ctx.append([{ kind: 'err', text: `ls: cannot access '${target}': no such file or directory` }]);
    return;
  }

  if (node.type === 'file') {
    ctx.append([{ kind: 'node', node: <LsRow entry={node} /> }]);
    return;
  }

  const showHidden = flags.includes('a') || name === 'la' || name === 'll';
  const entries = Object.values(node.children).filter((e) => showHidden || !e.name.startsWith('.'));

  ctx.append(entries.map((entry) => ({ kind: 'node' as const, node: <LsRow entry={entry} /> })));
};
