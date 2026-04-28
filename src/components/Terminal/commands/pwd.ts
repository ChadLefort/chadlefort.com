import { formatPath } from '../vfs';
import type { Command } from './types';

export const pwd: Command = (_args, ctx) => {
  ctx.append([{ kind: 'out', text: formatPath(ctx.cwd) }]);
};
