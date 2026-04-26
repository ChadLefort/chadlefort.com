import type { Command } from './types';
import { formatPath } from '../vfs';

export const pwd: Command = (_args, ctx) => {
  ctx.append([{ kind: 'out', text: formatPath(ctx.cwd) }]);
};
