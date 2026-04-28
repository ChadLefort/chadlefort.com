import { site } from '~/data/site';
import type { Command } from './types';

export const socials: Command = (_args, ctx) => {
  const entries = Object.entries(site.social) as [string, string][];
  const width = Math.max(...entries.map(([k]) => k.length));

  ctx.append(entries.map(([key, url]) => ({ kind: 'out' as const, text: `${key.padEnd(width)}  ${url}` })));
};
