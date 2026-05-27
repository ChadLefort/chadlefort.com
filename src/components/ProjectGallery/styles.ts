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
    'block h-auto rounded-lg object-contain',
    'transition-[width] duration-[520ms] ease-[var(--motion-ease-out)] motion-reduce:transition-none'
  ],
  variants: {
    pinching: {
      true: 'transition-none',
      false: ''
    },
    zoomed: {
      true: 'origin-center max-h-none max-w-none',
      false: 'origin-top-left max-h-[calc(100dvh-var(--lightbox-chrome))]'
    },
    device: {
      mobile: 'w-auto max-w-full',
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
  base: 'relative size-full overflow-auto overscroll-contain'
});

export const lightboxContent = tv({
  base: 'mx-auto flex min-h-full min-w-full w-max max-w-none items-center justify-center'
});

export const lightboxToggle = tv({
  base: 'inline-flex shrink-0 border-0 bg-transparent text-inherit touch-pan-x touch-pan-y',
  variants: {
    zoomed: {
      true: 'cursor-zoom-out p-1 sm:p-6',
      false: 'cursor-zoom-in p-0 sm:p-0'
    }
  }
});

export const mobileLightboxHeader = tv({
  base: 'flex items-center justify-between gap-2 px-3 py-2 text-overlay-fg sm:hidden'
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
