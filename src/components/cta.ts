import { tv } from 'tailwind-variants';

export const cta = tv({
  base: [
    'group inline-flex items-center font-semibold transition-all duration-200',
    'hover:scale-[1.02] active:scale-[0.98] motion-reduce:hover:scale-100',
    'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent'
  ],
  variants: {
    intent: {
      primary: 'bg-accent-strong hover:bg-accent text-white',
      secondary: 'border-glass-border-strong bg-glass text-fg hover:border-accent border'
    },
    size: {
      md: 'gap-2 rounded-xl px-6 py-3',
      lg: 'gap-3 rounded-xl px-8 py-4 text-lg font-bold'
    }
  },
  defaultVariants: { intent: 'primary', size: 'md' }
});

export const pillLink = tv({
  base: [
    'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold transition',
    'border-glass-border bg-glass text-fg hover:bg-glass-strong border',
    'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent'
  ]
});
