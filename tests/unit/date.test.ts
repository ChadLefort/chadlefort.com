import { describe, expect, it } from 'vitest';
import { toYearMonth } from '~/utils/date';

describe('toYearMonth', () => {
  it('converts month and year strings to year-month format', () => {
    expect(toYearMonth('April 2024')).toBe('2024-04');
    expect(toYearMonth('December 2013')).toBe('2013-12');
  });

  it('returns null for invalid month-year strings', () => {
    expect(toYearMonth('Present')).toBeNull();
    expect(toYearMonth('Not a date')).toBeNull();
  });
});
