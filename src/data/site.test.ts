import { describe, expect, it } from 'vitest';
import { site, yearsOfExperience } from '~/data/site';

describe('site data', () => {
  it('has expected fields', () => {
    expect(site.name).toBe('Chad Lefort');
    expect(site.jobTitle).toBeTruthy();
    expect(site.siteUrl).toMatch(/^https:\/\//);
    expect(site.email).toContain('@');
  });

  it('lists all social handles', () => {
    expect(site.social.github).toMatch(/github\.com/);
    expect(site.social.linkedin).toMatch(/linkedin\.com/);
  });
});

describe('yearsOfExperience', () => {
  it('returns a positive integer', () => {
    const years = yearsOfExperience();

    expect(years).toBeGreaterThan(10);
    expect(Number.isInteger(years)).toBe(true);
  });

  it('scales with current year', () => {
    const years = yearsOfExperience();
    const expected = new Date().getFullYear() - 2013;

    expect(years).toBe(expected);
  });
});
