import { Temporal } from '@js-temporal/polyfill';

export const parseUsDate = (value: string) => {
  const [month, day, year] = value.split('-').map(Number);
  return new Temporal.PlainDate(year, month, day);
};

export const formatMonthYear = (value: string) =>
  parseUsDate(value).toLocaleString('en-US', { month: 'long', year: 'numeric' });

export const toYearMonthDateTime = (value: string) => {
  const { year, month } = parseUsDate(value);

  return Temporal.PlainYearMonth.from({ year, month }).toString();
};

export const formatDateRange = (start: string, end: string | null) =>
  end ? `${formatMonthYear(start)} – ${formatMonthYear(end)}` : `${formatMonthYear(start)} – Present`;
