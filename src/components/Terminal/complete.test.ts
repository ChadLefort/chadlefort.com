import { describe, expect, it } from 'vitest';
import { closestCommand, findCommonPrefix } from './complete';

describe('closestCommand', () => {
  it('returns null when no command is close enough', () => {
    expect(closestCommand('xyzzz')).toBeNull();
  });

  it('returns closest (shortest edit) even for empty input', () => {
    expect(closestCommand('')).toBe('ls');
  });

  it('returns exact match', () => {
    expect(closestCommand('ls')).toBe('ls');
    expect(closestCommand('whoami')).toBe('whoami');
  });

  it('returns closest command within edit distance 1', () => {
    expect(closestCommand('lls')).toBe('ls');
    expect(closestCommand('lz')).toBe('ls');
    expect(closestCommand('whoamii')).toBe('whoami');
  });

  it('returns closest at edit distance 2', () => {
    expect(closestCommand('clr')).toBe('ls');
    expect(closestCommand('helo')).toBe('help');
    expect(closestCommand('ehcoo')).toBe('echo');
  });

  it('picks first in list when multiple at equal edit distance', () => {
    expect(closestCommand('cl')).toBe('ll');
  });
});

describe('findCommonPrefix', () => {
  it('returns empty string for empty array', () => {
    expect(findCommonPrefix([])).toBe('');
  });

  it('returns full string for single match', () => {
    expect(findCommonPrefix(['hello'])).toBe('hello');
  });

  it('finds common prefix preserving original case', () => {
    expect(findCommonPrefix(['Hello', 'HELP'])).toBe('Hel');
  });

  it('returns full match when all identical', () => {
    expect(findCommonPrefix(['ls', 'ls', 'ls'])).toBe('ls');
  });

  it('returns empty when no common prefix', () => {
    expect(findCommonPrefix(['abc', 'xyz'])).toBe('');
  });

  it('finds prefix for command completions', () => {
    expect(findCommonPrefix(['cat', 'cd', 'clear'])).toBe('c');
  });

  it('preserves case of first entry for full match', () => {
    expect(findCommonPrefix(['History', 'history', 'HISTORY'])).toBe('History');
  });
});
