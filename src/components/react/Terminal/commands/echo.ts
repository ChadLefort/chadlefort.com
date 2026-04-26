import type { Command } from './types';

export const echo: Command = (args, ctx) => {
  ctx.append([{ kind: 'out', text: args.join(' ') }]);
};
