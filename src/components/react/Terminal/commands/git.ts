import type { Command } from './types';
import { nodeAt } from '../vfs';

const collectModified = (root: ReturnType<typeof nodeAt>, prefix = '~'): string[] => {
  if (!root || root.type !== 'dir') return [];

  const out: string[] = [];

  for (const child of Object.values(root.children)) {
    if (child.type === 'file' && child.git === 'M') {
      out.push(child.name);
    }

    if (child.type === 'dir') {
      out.push(...collectModified(child, `${prefix}/${child.name}`));
    }
  }

  return out;
};

export const git: Command = (args, ctx) => {
  const sub = args[0];
  const modified = collectModified(ctx.root);

  if (sub === 'status') {
    const lines = [
      'On branch feat/redesign',
      "Your branch is up to date with 'origin/feat/redesign'.",
      '',
      'Changes not staged for commit:',
      '  (use "git add <file>..." to update what will be committed)',
      ''
    ];

    for (const file of modified) {
      lines.push(`\tmodified:   ${file}`);
    }

    lines.push('');
    lines.push(`${modified.length} files changed, ${ctx.years} insertions(+), 0 deletions(-)`);

    ctx.append(lines.map((text) => ({ kind: 'out' as const, text })));

    return;
  }

  if (sub === 'diff') {
    ctx.append([{ kind: 'out', text: `${modified.length} files changed, ${ctx.years} insertions(+), 0 deletions(-)` }]);
    return;
  }

  if (sub === 'log') {
    ctx.append([{ kind: 'out', text: '(check the project pages for the real history)' }]);
    return;
  }

  ctx.append([{ kind: 'err', text: `git ${sub ?? ''}: not implemented in this shell` }]);
};
