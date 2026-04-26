import type { IconifyIcon } from '@iconify/react';
import folderIcon from '@iconify-icons/lucide/folder';
import fileTextIcon from '@iconify-icons/lucide/file-text';
import fileCodeIcon from '@iconify-icons/lucide/file-code';
import bracesIcon from '@iconify-icons/lucide/braces';
import scrollTextIcon from '@iconify-icons/lucide/scroll-text';
import terminalIcon from '@iconify-icons/lucide/terminal';
import fileIcon from '@iconify-icons/lucide/file';
import { aboutQuotes } from '~/data/about';
import { education } from '~/data/education';
import { jobs } from '~/data/jobs';
import { skills } from '~/data/skills';
import { locationLong, site, yearsOfExperience } from '~/data/site';

export type GitStatus = '--' | 'N' | 'M' | 'I';

export type FsFile = {
  type: 'file';
  name: string;
  route?: string;
  content: () => string;
  size: number;
  git?: GitStatus;
};

export type FsDir = {
  type: 'dir';
  name: string;
  children: Record<string, FsNode>;
  git?: GitStatus;
};

export type FsNode = FsFile | FsDir;

export const projects = [
  { id: 'spear-cart', summary: 'Mobile-first multi-cart for education SaaS, +25% memberships.' },
  { id: 'spear-dashboard', summary: 'Live instructor-guided learning dashboard, +9000% engagement.' },
  { id: 'lerna-monorepo', summary: 'Lerna monorepo for 17 React projects, saved deployment hours.' },
  { id: 'webpack-5-module-federation', summary: 'Webpack 5 module federation rollout, reduced PR count 5→1.' }
];

const file = (name: string, content: () => string, opts: { route?: string; git?: GitStatus } = {}): FsFile => ({
  type: 'file',
  name,
  route: opts.route,
  content,
  size: content().length,
  git: opts.git
});

const dir = (name: string, children: Record<string, FsNode>, git?: GitStatus): FsDir => ({
  type: 'dir',
  name,
  children,
  git
});

export const isMdFile = (name: string): boolean => {
  const lower = name.toLowerCase();

  return lower.endsWith('.md') || lower.endsWith('.mdx');
};

export const aboutBody = (years: number) =>
  [
    `# ${site.name}`,
    '',
    `${site.jobTitle} from ${locationLong} with ${years}+ years of experience.`,
    '',
    '## About',
    '',
    ...aboutQuotes.flatMap((q, i) => (i === 0 ? [`> ${q}`] : ['', `> ${q}`]))
  ].join('\n');

export const buildFs = (): FsDir => {
  const years = yearsOfExperience();
  const projectsDir = dir(
    'projects',
    Object.fromEntries(
      projects.map((p) => [
        `${p.id}.mdx`,
        file(`${p.id}.mdx`, () => `# ${p.id}\n\n${p.summary}\n\nopen ${p.id} to view full project.`, {
          route: `/projects/${p.id}`,
          git: '--'
        })
      ])
    ),
    '--'
  );

  const repoDir = dir(
    'chadlefort.com',
    {
      'README.md': file(
        'README.md',
        () =>
          [
            '# chadlefort.com',
            '',
            'Welcome. Type `help` for commands or `ls` to look around.',
            '',
            'Try: cat ABOUT.md, cd projects, ls -la, open spear-cart, tree'
          ].join('\n'),
        { git: '--' }
      ),
      'ABOUT.md': file('ABOUT.md', () => aboutBody(years), { route: '/#about-me', git: 'M' }),
      whoami: file('whoami', () => `chad — ${site.jobTitle} (${years}+ years)`, { git: '--' }),
      'EXPERIENCE.LOG': file(
        'EXPERIENCE.LOG',
        () =>
          [
            `# Experience Log`,
            `# ${years}+ years · ${jobs.length} positions`,
            '',
            ...jobs.map(
              (j, i) =>
                `[${String(i + 1).padStart(2, '0')}] ${j.start.padEnd(15)} ─ ${j.end.padEnd(15)}  ${j.company} · ${j.role}`
            )
          ].join('\n'),
        { route: '/#job-experience', git: '--' }
      ),
      'skills.json': file('skills.json', () => JSON.stringify(skills, null, 2), {
        route: '/#skills',
        git: 'M'
      }),
      'EDUCATION.md': file(
        'EDUCATION.md',
        () =>
          [
            '# Education',
            '',
            education.institution,
            `${education.degree} · ${education.major}`,
            `${education.start} – ${education.end} · GPA ${education.gpa}`
          ].join('\n'),
        { route: '/#education', git: '--' }
      ),
      'CONTACT.md': file(
        'CONTACT.md',
        () => {
          const socialEntries = Object.entries(site.social) as [string, string][];
          const width = Math.max('email'.length, ...socialEntries.map(([k]) => k.length));

          return [
            '# Contact',
            '',
            `${'email'.padEnd(width)}  ${site.email}`,
            ...socialEntries.map(([k, url]) => `${k.padEnd(width)}  ${url}`)
          ].join('\n');
        },
        { route: '/#contact', git: '--' }
      ),
      projects: projectsDir
    },
    '--'
  );

  return dir('~', {
    development: dir('development', { 'chadlefort.com': repoDir }, '--')
  });
};

export const INITIAL_CWD = ['development', 'chadlefort.com'];

export type IconSpec = { icon: IconifyIcon; color: string };

export const iconForNode = (node: FsNode): IconSpec => {
  if (node.type === 'dir') return { icon: folderIcon, color: 'text-term-info' };

  const lower = node.name.toLowerCase();

  if (isMdFile(node.name)) return { icon: fileTextIcon, color: 'text-term-info' };
  if (lower.endsWith('.json')) return { icon: bracesIcon, color: 'text-term-branch' };
  if (lower.endsWith('.log')) return { icon: scrollTextIcon, color: 'text-term-comment' };
  if (lower.endsWith('.tsx') || lower.endsWith('.ts') || lower.endsWith('.js'))
    return { icon: fileCodeIcon, color: 'text-term-info' };
  if (!lower.includes('.')) return { icon: terminalIcon, color: 'text-term-add' };

  return { icon: fileIcon, color: 'text-term-fg' };
};

export const resolvePath = (cwd: string[], target: string): string[] | null => {
  if (!target || target === '.') return cwd;
  if (target === '~' || target === '/') return [];
  if (target === '..') return cwd.slice(0, -1);

  const segments = target.replace(/^~\/?/, '').replace(/^\//, '').split('/').filter(Boolean);
  const start = target.startsWith('~') || target.startsWith('/') ? [] : [...cwd];

  for (const seg of segments) {
    if (seg === '..') start.pop();
    else if (seg !== '.') start.push(seg);
  }

  return start;
};

export const lookupChild = (d: FsDir, name: string): FsNode | null => {
  const direct = d.children[name];

  if (direct) return direct;

  const ci = Object.keys(d.children).find((k) => k.toLowerCase() === name.toLowerCase());

  return ci ? d.children[ci] : null;
};

export const nodeAt = (root: FsDir, path: string[]): FsNode | null => {
  let cur: FsNode = root;

  for (const seg of path) {
    if (cur.type !== 'dir') return null;
    const next = lookupChild(cur, seg);

    if (!next) return null;
    cur = next;
  }

  return cur;
};

export const formatPath = (path: string[]) => `~${path.length ? `/${path.join('/')}` : ''}`;
