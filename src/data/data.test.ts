import { describe, expect, it } from 'vitest';
import { jobs } from '~/data/jobs';
import { skills } from '~/data/skills';

describe('jobs data', () => {
  it('has at least one current job', () => {
    expect(jobs.length).toBeGreaterThan(0);
    expect(jobs[0].end.toLowerCase()).toBe('present');
  });

  it('every job has required fields', () => {
    for (const job of jobs) {
      expect(job.company).toBeTruthy();
      expect(job.role).toBeTruthy();
      expect(job.start).toBeTruthy();
      expect(job.end).toBeTruthy();
      expect(job.bullets.length).toBeGreaterThan(0);
    }
  });
});

describe('skills data', () => {
  it('has more than 20 skills', () => {
    expect(skills.length).toBeGreaterThan(20);
  });

  it('every skill has an icon reference', () => {
    for (const skill of skills) {
      expect(skill.name).toBeTruthy();
      expect(skill.icon).toBeTruthy();
    }
  });

  it('has no duplicate skill names', () => {
    const names = skills.map((s) => s.name);
    expect(new Set(names).size).toBe(names.length);
  });
});
