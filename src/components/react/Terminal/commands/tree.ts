import type { Command } from './types';
import { buildTree } from '../markdown';
import { nodeAt, resolvePath } from '../vfs';

export const tree: Command = (args, ctx) => {
  const target = args[0];
  const path = target ? resolvePath(ctx.cwd, target) : ctx.cwd;

  if (!path) {
    ctx.append([{ kind: 'err', text: `tree: ${target}: no such file or directory` }]);
    return;
  }

  const node = nodeAt(ctx.root, path);

  if (!node || node.type !== 'dir') {
    ctx.append([{ kind: 'err', text: `tree: ${target}: not a directory` }]);
    return;
  }

  ctx.append([
    { kind: 'out', text: `.${target ? `/${target}` : ''}` },
    ...buildTree(node).map((text) => ({ kind: 'out' as const, text }))
  ]);
};
