import { twMerge } from 'tailwind-merge';

export const cn = (...classes: (string | false | null | undefined)[]): string =>
  twMerge(...classes.filter((c): c is string => typeof c === 'string'));
