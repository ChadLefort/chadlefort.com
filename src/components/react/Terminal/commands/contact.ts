import { site } from '~/data/site';
import type { Command } from './types';

export const contact: Command = (_args, ctx) => {
  ctx.append([
    { kind: 'out', text: `email     ${site.email}` },
    { kind: 'out', text: `web       ${site.siteUrl}` },
    { kind: 'out', text: `github    ${site.social.github}` },
    { kind: 'out', text: `linkedin  ${site.social.linkedin}` },
    { kind: 'out', text: `bluesky   ${site.social.bluesky}` }
  ]);
};
