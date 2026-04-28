import type { MdLine } from './types';
import type { FsDir } from './vfs';

export const parseMd = (content: string): MdLine[] =>
  content.split('\n').map((line): MdLine => {
    if (line === '') return { kind: 'blank' };
    if (line.startsWith('## ')) return { kind: 'h2', text: line.slice(3) };
    if (line.startsWith('# ')) return { kind: 'h1', text: line.slice(2) };
    if (line.startsWith('> ')) return { kind: 'bq', text: line.slice(2) };
    if (line.startsWith('- ')) return { kind: 'li', text: line.slice(2) };

    return { kind: 'p', text: line };
  });

export const buildTree = (node: FsDir, prefix = ''): string[] => {
  const entries = Object.values(node.children);
  const out: string[] = [];

  entries.forEach((child, idx) => {
    const last = idx === entries.length - 1;
    const branch = last ? '└── ' : '├── ';
    const cont = last ? '    ' : '│   ';

    out.push(`${prefix}${branch}${child.name}${child.type === 'dir' ? '/' : ''}`);

    if (child.type === 'dir') {
      out.push(...buildTree(child, prefix + cont));
    }
  });

  return out;
};
