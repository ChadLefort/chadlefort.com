import { locationShort, site, yearsOfExperience } from '~/data/site';
import type { Command } from './types';

export const whoami: Command = (_args, ctx) => {
  ctx.append([
    { kind: 'out', text: `${site.name.toLowerCase().split(' ')[0]} — ${site.jobTitle} from ${locationShort}` },
    { kind: 'out', text: `${yearsOfExperience()}+ years shipping accessible, maintainable web apps` }
  ]);
};
