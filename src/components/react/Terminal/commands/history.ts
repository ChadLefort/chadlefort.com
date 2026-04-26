import type { Command } from './types';

export const history: Command = (_args, ctx) => {
  ctx.append(ctx.history.map((h, i) => ({ kind: 'out' as const, text: `${String(i + 1).padStart(4)}  ${h}` })));
};
