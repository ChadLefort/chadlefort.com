import { describe, expect, it } from 'vitest';
import { buildFs, formatPath, isMdFile, nodeAt, resolvePath } from '~/components/react/Terminal/vfs';

describe('formatPath', () => {
  it('formats empty cwd as ~', () => {
    expect(formatPath([])).toBe('~');
  });

  it('joins segments with slashes', () => {
    expect(formatPath(['development', 'chadlefort.com'])).toBe('~/development/chadlefort.com');
  });
});

describe('isMdFile', () => {
  it('matches .md and .mdx case-insensitive', () => {
    expect(isMdFile('README.md')).toBe(true);
    expect(isMdFile('foo.MDX')).toBe(true);
    expect(isMdFile('foo.txt')).toBe(false);
    expect(isMdFile('foo')).toBe(false);
  });
});

describe('resolvePath', () => {
  it('resolves home shortcuts', () => {
    expect(resolvePath(['a', 'b'], '~')).toEqual([]);
    expect(resolvePath(['a', 'b'], '/')).toEqual([]);
  });

  it('resolves dot-dot to parent', () => {
    expect(resolvePath(['a', 'b'], '..')).toEqual(['a']);
  });

  it('appends relative segment', () => {
    expect(resolvePath(['a'], 'b')).toEqual(['a', 'b']);
  });

  it('normalizes ./b/../c', () => {
    expect(resolvePath(['a'], 'b/../c')).toEqual(['a', 'c']);
  });

  it('starts from root for absolute path', () => {
    expect(resolvePath(['x'], '/a/b')).toEqual(['a', 'b']);
  });
});

describe('nodeAt + buildFs', () => {
  const root = buildFs();

  it('roots at ~', () => {
    expect(root.name).toBe('~');
    expect(root.type).toBe('dir');
  });

  it('finds nested chadlefort.com dir', () => {
    const node = nodeAt(root, ['development', 'chadlefort.com']);

    expect(node?.type).toBe('dir');
  });

  it('returns null for missing path', () => {
    expect(nodeAt(root, ['nope'])).toBeNull();
  });

  it('finds README.md inside chadlefort.com', () => {
    const node = nodeAt(root, ['development', 'chadlefort.com', 'README.md']);

    expect(node?.type).toBe('file');
  });
});
