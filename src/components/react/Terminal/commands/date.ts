import type { Command } from './types';

export const date: Command = (_args, ctx) => {
  ctx.append([{ kind: 'out', text: new Date().toString() }]);
};
