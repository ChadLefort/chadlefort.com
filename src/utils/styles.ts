import { tv } from 'tailwind-variants';

export const focusRing = tv({
  base: 'outline outline-[var(--color-accent)] outline-offset-[3px] forced-colors:outline-[Highlight]',
  variants: {
    isFocusVisible: {
      false: 'outline-0',
      true: 'outline-2'
    }
  }
});

export const buttonStyles = tv({
  extend: focusRing,
  base: [
    'inline-flex items-center justify-center gap-2 cursor-pointer',
    'font-semibold tracking-tight select-none',
    'transition-[transform,background-color,color,box-shadow] duration-150 ease-out',
    'scale-100 data-[pressed]:scale-[0.97]',
    'motion-reduce:transition-none motion-reduce:data-[pressed]:scale-100',
    'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-60'
  ],
  variants: {
    variant: {
      solid: 'text-white shadow-lg shadow-black/20',
      outline: 'border-2 bg-transparent',
      ghost: 'border-2 border-transparent',
      unstyled: ['bg-transparent border-none text-current p-0', 'data-[hovered]:opacity-85']
    },
    color: {
      brand: '',
      neutral: '',
      term: ''
    },
    size: {
      sm: 'px-3 py-1.5 text-sm rounded-lg min-h-9',
      md: 'px-5 py-2.5 text-base rounded-lg min-h-11',
      lg: 'px-7 py-3 text-lg rounded-xl min-h-14'
    },
    shape: {
      default: '',
      pill: 'rounded-full',
      icon: 'rounded-full p-0 aspect-square'
    },
    fullWidth: {
      true: 'w-full'
    }
  },
  compoundVariants: [
    {
      variant: 'solid',
      color: 'brand',
      class: [
        'bg-[var(--color-accent-strong)]',
        'data-[hovered]:bg-[var(--color-accent)]',
        'data-[pressed]:bg-[var(--color-accent-strong)]'
      ]
    },
    {
      variant: 'solid',
      color: 'neutral',
      class: ['bg-[var(--color-1)] text-[var(--color-12)]', 'data-[hovered]:bg-[var(--color-3)]']
    },
    {
      variant: 'solid',
      color: 'term',
      class: [
        'bg-[var(--color-terminal-bg)] text-[var(--color-terminal-fg)] border border-[var(--color-7)]',
        'data-[hovered]:border-[var(--color-terminal-blue)] data-[hovered]:text-white'
      ]
    },
    {
      variant: 'outline',
      color: 'brand',
      class: ['text-[var(--color-accent)] border-[var(--color-accent)]', 'data-[hovered]:bg-[var(--color-accent)]/10']
    },
    {
      variant: 'outline',
      color: 'neutral',
      class: ['text-[var(--text)] border-[var(--border)]', 'data-[hovered]:bg-[var(--surface-alt)]']
    },
    {
      variant: 'ghost',
      color: 'brand',
      class: ['text-[var(--color-accent)]', 'data-[hovered]:bg-[var(--color-accent)]/10']
    },
    {
      variant: 'ghost',
      color: 'neutral',
      class: ['text-[var(--text)]', 'data-[hovered]:bg-[var(--surface-alt)]']
    },
    { shape: 'icon', size: 'sm', class: 'h-9 w-9 min-h-0' },
    { shape: 'icon', size: 'md', class: 'h-11 w-11 min-h-0' },
    { shape: 'icon', size: 'lg', class: 'h-14 w-14 min-h-0' }
  ],
  defaultVariants: {
    variant: 'solid',
    color: 'brand',
    size: 'md',
    shape: 'default'
  }
});

export type ButtonStyleProps = Parameters<typeof buttonStyles>[0];

export const cardStyles = tv({
  base: [
    'relative overflow-hidden rounded-2xl',
    'bg-[var(--surface-alt)] ring-1 ring-[var(--border)]',
    'transition-[transform,box-shadow] duration-200 ease-out',
    'hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-black/20',
    'motion-reduce:hover:translate-y-0 motion-reduce:transition-none'
  ],
  variants: {
    interactive: {
      true: 'cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-2'
    },
    padding: {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8'
    }
  },
  defaultVariants: {
    padding: 'md'
  }
});
