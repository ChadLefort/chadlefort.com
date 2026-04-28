const monthFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  timeZone: 'UTC'
});

export const toYearMonth = (value: string) => {
  const [monthName, yearText] = value.trim().split(/\s+/);

  if (!monthName || !yearText || !/^\d{4}$/.test(yearText)) return null;

  const parsed = new Date(`${monthName} 1, ${yearText} UTC`);

  if (Number.isNaN(parsed.getTime())) return null;

  if (monthFormatter.format(parsed) !== monthName) return null;

  const month = String(parsed.getUTCMonth() + 1).padStart(2, '0');

  return `${yearText}-${month}`;
};
