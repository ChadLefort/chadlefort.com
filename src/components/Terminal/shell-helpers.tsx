import { navigate } from 'astro:transitions/client';
import { aboutQuotes } from '~/data/about';
import { locationLong, site } from '~/data/site';
import { closestCommand, findCommonPrefix } from './complete';
import { MdRow } from './MdRow';
import { type LineBody, setMaximized, setMinimized } from './store';
import type { MdLine } from './types';
import { type FsDir, nodeAt } from './vfs';

export const DEMO_COMMAND = 'cat ABOUT.md';

export const completeFromCwd = (root: FsDir, cwd: string[], prefix: string): { matches: string[]; common: string } => {
  const dirNode = nodeAt(root, cwd);

  if (!dirNode || dirNode.type !== 'dir') return { matches: [], common: prefix };

  const matches = Object.keys(dirNode.children).filter((name) => name.toLowerCase().startsWith(prefix.toLowerCase()));

  return { matches, common: findCommonPrefix(matches) };
};

export const buildAboutLines = (years: number): MdLine[] => {
  const quoteLines = aboutQuotes.flatMap<MdLine>((text, index) =>
    index === 0 ? [{ kind: 'bq', text }] : [{ kind: 'blank' }, { kind: 'bq', text }]
  );

  return [
    { kind: 'h1', text: site.name },
    { kind: 'blank' },
    { kind: 'p', text: `${site.jobTitle} from ${locationLong} with ${years}+ years of experience.` },
    { kind: 'blank' },
    { kind: 'h2', text: 'About' },
    { kind: 'blank' },
    ...quoteLines
  ];
};

export const createDemoLine = (line: MdLine, index: number, animated: boolean): LineBody => ({
  kind: 'node',
  node: (
    <div className={[animated ? 'term-line' : '', index === 0 ? 'mt-3' : ''].filter(Boolean).join(' ')}>
      <MdRow line={line} />
    </div>
  )
});

export const buildUnknownCommandText = (name: string) => {
  const guess = closestCommand(name);
  const suggestion = guess ? ` did you mean '${guess}'?` : '';

  return `${name}: command not found.${suggestion}`;
};

export const goTo = (route: string) => {
  window.setTimeout(() => {
    const url = new URL(route, window.location.origin);
    const samePath = url.pathname === window.location.pathname;

    if (samePath && url.hash) {
      const element = document.querySelector(url.hash);

      if (element) {
        setMaximized(false);
        setMinimized(false);
        window.history.replaceState(null, '', url.hash);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          });
        });

        return;
      }
    }

    void navigate(route);
  }, 250);
};
