import { describe, expect, it } from 'vitest';
import { formatDateRange, formatMonthYear, parseUsDate, toYearMonthDateTime } from '~/utils/date';

describe('parseUsDate', () => {
  it('parses MM-DD-YYYY strings', () => {
    expect(parseUsDate('04-01-2024').toString()).toBe('2024-04-01');
  });
});

describe('formatMonthYear', () => {
  it('formats dates for display', () => {
    expect(formatMonthYear('04-01-2024')).toBe('April 2024');
    expect(formatMonthYear('12-01-2013')).toBe('December 2013');
  });
});

describe('toYearMonthDateTime', () => {
  it('returns YYYY-MM for time elements', () => {
    expect(toYearMonthDateTime('04-01-2024')).toBe('2024-04');
  });
});

describe('formatDateRange', () => {
  it('formats open-ended ranges as Present', () => {
    expect(formatDateRange('04-01-2024', null)).toBe('April 2024 – Present');
  });

  it('formats closed ranges', () => {
    expect(formatDateRange('12-01-2020', '04-01-2024')).toBe('December 2020 – April 2024');
  });
});
