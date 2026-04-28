import type { Command } from './types';

export const clear: Command = (_args, ctx) => {
  ctx.setLines([]);
};
