import { nodeAt, resolvePath } from '../vfs';
import type { Command } from './types';

export const cd: Command = (args, ctx) => {
  const target = args[0] ?? '~';
  const path = resolvePath(ctx.cwd, target);
  const node = path ? nodeAt(ctx.root, path) : null;

  if (!path || !node) {
    ctx.append([{ kind: 'err', text: `cd: no such file or directory: ${target}` }]);
    return;
  }

  if (node.type !== 'dir') {
    ctx.append([{ kind: 'err', text: `cd: not a directory: ${target}` }]);
    return;
  }

  ctx.setCwd(path);
};
