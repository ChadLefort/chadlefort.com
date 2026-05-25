import { tv } from 'tailwind-variants';

const focusRingBase = [
  'outline-none',
  'focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-focus-ring',
  'forced-colors:focus-visible:outline-[Highlight]'
] as const;

export const focusRing = tv({
  base: [...focusRingBase, 'focus-visible:outline-offset-[3px]']
});

export const focusRingInset = tv({
  base: [...focusRingBase, 'focus-visible:-outline-offset-2']
});
