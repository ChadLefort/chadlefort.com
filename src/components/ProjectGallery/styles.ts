import { tv } from 'tailwind-variants';

export const thumbImg = tv({
  base: [
    'block size-full object-cover object-top',
    'transition duration-[var(--motion-duration-state)] ease-[var(--motion-ease-settle)]'
  ],
  variants: {
    loaded: {
      true: 'opacity-100',
      false: 'opacity-0'
    }
  }
});

export const thumbFrame = tv({
  base: 'relative overflow-hidden rounded-2xl',
  variants: {
    device: {
      desktop: 'aspect-video',
      mobile: 'aspect-[9/16]'
    }
  }
});

export const lightboxOverlay = tv({
  base: ['fixed inset-0 z-50 bg-terminal-bg']
});

export const lightboxImage = tv({
  base: [
    'block h-auto origin-top-left rounded-lg object-contain',
    'transition-[width] duration-[520ms] ease-[var(--motion-ease-out)] motion-reduce:transition-none'
  ],
  variants: {
    pinching: {
      true: 'transition-none',
      false: ''
    },
    zoomed: {
      true: 'max-h-none max-w-none',
      false: 'max-h-[calc(100svh-9rem)] sm:max-h-[calc(100svh-8rem)]'
    },
    device: {
      mobile: 'w-auto max-w-[min(100%,28rem)]',
      desktop: 'max-w-full'
    }
  },
  compoundVariants: [
    {
      zoomed: true,
      device: 'mobile',
      class: 'w-auto max-w-none'
    },
    {
      zoomed: true,
      device: 'desktop',
      class: 'w-auto max-w-none'
    }
  ]
});

export const lightboxViewport = tv({
  base: 'relative size-full',
  variants: {
    scrollable: {
      true: 'overflow-auto overscroll-contain',
      false: 'flex items-center justify-center'
    }
  }
});

export const lightboxToggle = tv({
  base: 'inline-flex border-0 bg-transparent text-inherit touch-pan-x touch-pan-y',
  variants: {
    zoomed: {
      true: 'cursor-zoom-out p-3 sm:p-6',
      false: 'cursor-zoom-in p-2 sm:p-0'
    }
  }
});

export const mobileLightboxHeader = tv({
  base: 'flex items-center justify-between gap-3 px-4 py-3 text-overlay-fg sm:hidden'
});

export const desktopLightboxHeader = tv({
  base: 'hidden w-full items-center justify-between gap-3 px-4 py-3 text-overlay-fg sm:flex'
});

export const lightboxControls = tv({
  base: 'flex items-center justify-center gap-3',
  variants: {
    desktop: {
      true: 'justify-end gap-5',
      false: 'pt-1'
    }
  }
});

export const zoomValue = tv({
  base: 'text-overlay-muted text-center font-mono leading-none',
  variants: {
    desktop: {
      true: 'min-w-14 text-xs',
      false: 'min-w-14 text-xs'
    }
  }
});

export const zoomButton = tv({
  base: 'hidden min-w-0 px-3 py-1.5 sm:inline-flex'
});
