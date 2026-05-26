import { describe, expect, it } from 'vitest';
import { compareProjects, type ProjectEntry, sortProjects } from '~/utils/projects';

const aprilEnd = '04-30-2026';

const project = (id: string, data: { end: string; featured?: boolean }): ProjectEntry =>
  ({
    id,
    data: { featured: false, ...data }
  }) as ProjectEntry;

describe('compareProjects', () => {
  it('places featured projects before non-featured with the same end date', () => {
    const featured = project('component-library', { end: aprilEnd, featured: true });
    const other = project('router-migration', { end: aprilEnd });

    expect(compareProjects(featured, other)).toBeLessThan(0);
    expect(compareProjects(other, featured)).toBeGreaterThan(0);
  });

  it('sorts by end date when featured status matches', () => {
    const newer = project('spear-cart', { end: '02-29-2024' });
    const older = project('spear-dashboard', { end: '02-28-2023' });

    expect(compareProjects(newer, older)).toBeLessThan(0);
  });

  it('orders by end date within the same calendar month', () => {
    const later = project('later-april', { end: '04-30-2026' });
    const earlier = project('earlier-april', { end: '04-15-2026' });

    expect(compareProjects(later, earlier)).toBeLessThan(0);
  });

  it('uses id as a stable tiebreaker', () => {
    const a = project('aaa-project', { end: aprilEnd });
    const b = project('bbb-project', { end: aprilEnd });

    expect(compareProjects(a, b)).toBeLessThan(0);
    expect(compareProjects(b, a)).toBeGreaterThan(0);
  });
});

describe('sortProjects', () => {
  it('keeps featured projects first across repeated sorts', () => {
    const projects = [
      project('router-migration', { end: aprilEnd }),
      project('component-library', { end: aprilEnd, featured: true }),
      project('spear-cart', { end: '02-29-2024' })
    ];

    for (let i = 0; i < 5; i += 1) {
      expect(sortProjects(projects)[0]?.id).toBe('component-library');
    }
  });
});
