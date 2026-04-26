import type { Command } from './types';
import { nodeAt, projects, resolvePath } from '../vfs';

const directRoutes: Record<string, string> = {
  about: '/#about-me',
  contact: '/#contact',
  education: '/#education',
  experience: '/#job-experience',
  skills: '/#skills',
  projects: '/projects',
  home: '/',
  '~': '/',
  '/': '/'
};

export const open: Command = (args, ctx) => {
  if (!args[0]) {
    ctx.append([{ kind: 'err', text: 'open: missing operand' }]);
    return;
  }

  const target = args[0];
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
