import { describe, expect, it } from 'vitest';
import { buildTree, parseMd } from './markdown';
import type { FsDir, FsNode } from './vfs';

const file = (name: string): FsNode => ({ type: 'file', name, content: () => '', size: 0 });

const dir = (name: string, children: Record<string, FsNode>): FsDir => ({
  type: 'dir',
  name,
  children
});

describe('parseMd', () => {
  it('treats empty content as one blank line', () => {
    expect(parseMd('')).toEqual([{ kind: 'blank' }]);
  });

  it('parses a blank line', () => {
    const result = parseMd('\n');
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ kind: 'blank' });
    expect(result[1]).toEqual({ kind: 'blank' });
  });

  it('parses h1 heading', () => {
    const result = parseMd('# Hello');
    expect(result).toEqual([{ kind: 'h1', text: 'Hello' }]);
  });

  it('parses h2 heading', () => {
    const result = parseMd('## World');
    expect(result).toEqual([{ kind: 'h2', text: 'World' }]);
  });

  it('parses blockquote', () => {
    const result = parseMd('> quoted text');
    expect(result).toEqual([{ kind: 'bq', text: 'quoted text' }]);
  });

  it('parses list item', () => {
    const result = parseMd('- item one');
    expect(result).toEqual([{ kind: 'li', text: 'item one' }]);
  });

  it('parses paragraph as default', () => {
    const result = parseMd('just a paragraph');
    expect(result).toEqual([{ kind: 'p', text: 'just a paragraph' }]);
  });

  it('handles h1 before h2 (startsWith order)', () => {
    const result = parseMd('# Title\n## Subtitle');
    expect(result).toEqual([
      { kind: 'h1', text: 'Title' },
      { kind: 'h2', text: 'Subtitle' }
    ]);
  });

  it('parses mixed markdown lines', () => {
    const result = parseMd('# Top\n\n## Section\n> quote\n- bullet\nplain');
    expect(result).toEqual([
      { kind: 'h1', text: 'Top' },
      { kind: 'blank' },
      { kind: 'h2', text: 'Section' },
      { kind: 'bq', text: 'quote' },
      { kind: 'li', text: 'bullet' },
      { kind: 'p', text: 'plain' }
    ]);
  });
});

describe('buildTree', () => {
  it('renders single file', () => {
    const root = dir('root', { 'readme.md': file('readme.md') });

    expect(buildTree(root)).toEqual(['└── readme.md']);
  });

  it('renders multiple files sorted', () => {
    const root = dir('root', {
      'zebra.md': file('zebra.md'),
      'alpha.md': file('alpha.md')
    });

    expect(buildTree(root)).toEqual(['├── alpha.md', '└── zebra.md']);
  });

  it('renders directories with trailing slash', () => {
    const root = dir('root', { src: dir('src', {}) });

    expect(buildTree(root)).toEqual(['└── src/']);
  });

  it('renders nested tree', () => {
    const root = dir('root', {
      docs: dir('docs', {
        'index.md': file('index.md'),
        'guide.md': file('guide.md')
      }),
      'readme.md': file('readme.md')
    });

    expect(buildTree(root)).toEqual(['├── docs/', '│   ├── guide.md', '│   └── index.md', '└── readme.md']);
  });

  it('renders deeply nested tree', () => {
    const root = dir('root', {
      a: dir('a', {
        b: dir('b', {
          'deep.md': file('deep.md')
        })
      })
    });

    expect(buildTree(root)).toEqual(['└── a/', '    └── b/', '        └── deep.md']);
  });

  it('renders empty directory', () => {
    const root = dir('root', {});

    expect(buildTree(root)).toEqual([]);
  });
});
