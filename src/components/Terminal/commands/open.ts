import { homeNav } from '~/data/nav';
import { nodeAt, projects, resolvePath } from '../vfs';
import type { Command } from './types';

const slug = (s: string) => s.toLowerCase().replace(/\s+/g, '-');

const fromNav = homeNav.reduce<Record<string, string>>((acc, link) => {
  acc[slug(link.label)] = link.href;

  if (link.hash) {
    const id = link.href.split('#')[1];

    if (id) acc[id] = link.href;
  }

  return acc;
}, {});

const directRoutes: Record<string, string> = {
  ...fromNav,
  about: '/#about-me',
  experience: '/#job-experience',
  home: '/',
  '~': '/',
  '/': '/'
};

export const open: Command = (args, ctx) => {
  if (!args[0]) {
    ctx.append([{ kind: 'err', text: 'open: missing operand' }]);
    return;
  }

  const target = args[0].replace(/^#/, '');
  const directHit = directRoutes[target];

  if (directHit) {
    ctx.append([{ kind: 'success', text: `opening ${directHit} ...` }]);
    ctx.goTo(directHit);

    return;
  }

  const projectMatch = projects.find((p) => p.id === target);

  if (projectMatch) {
    const route = `/projects/${projectMatch.id}`;

    ctx.append([{ kind: 'success', text: `opening ${route} ...` }]);
    ctx.goTo(route);

    return;
  }

  const path = resolvePath(ctx.cwd, target);
  const node = path ? nodeAt(ctx.root, path) : null;

  if (node && node.type === 'file' && node.route) {
    const route = node.route;

    ctx.append([{ kind: 'success', text: `opening ${route} ...` }]);
    ctx.goTo(route);

    return;
  }

  ctx.append([{ kind: 'err', text: `open: cannot open '${target}'` }]);
};
