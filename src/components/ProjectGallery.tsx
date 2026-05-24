import { ChevronLeft, ChevronRight, Monitor, Smartphone, X, ZoomIn, ZoomOut } from 'lucide-react';
import type { CSSProperties, FC, ReactNode, TouchEvent as ReactTouchEvent, RefObject, Touch } from 'react';
import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { Dialog, Heading, Modal, ModalOverlay } from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { Button } from '~/components/Button';
import { IconButton } from '~/components/IconButton';

export const PROJECT_GALLERY_OPEN_EVENT = 'project-gallery:open';

const thumbImg = tv({
  base: 'block h-full w-full rounded-2xl object-cover object-top transition duration-[var(--motion-duration-state)] ease-[var(--motion-ease-settle)] group-hover:scale-[1.005]',
  variants: {
    loaded: {
      true: 'opacity-100',
      false: 'opacity-0'
    }
  }
});

export const thumbButton = tv({
  base: [
    'group relative block w-full cursor-pointer rounded-2xl transition duration-[var(--motion-duration-state)] ease-[var(--motion-ease-settle)] p-0',
    'focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-accent'
  ]
});

const thumbFrame = tv({
  base: 'relative overflow-hidden rounded-2xl',
  variants: {
    device: {
      desktop: 'aspect-video',
      mobile: 'aspect-[9/16]'
    }
  }
});

const lightboxOverlay = tv({
  base: [
    'fixed inset-0 z-50 bg-overlay-bg backdrop-blur-md',
    'transition-opacity duration-[var(--motion-duration-state)] ease-[var(--motion-ease-out)]',
    'data-[entering]:opacity-0 data-[exiting]:opacity-0'
  ]
});

const lightboxImage = tv({
  base: [
    'block h-auto rounded-lg object-contain',
    'transition-[width,height,max-width,max-height] duration-[520ms] ease-[var(--motion-ease-out)] motion-reduce:transition-none'
  ],
  variants: {
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

const lightboxViewport = tv({
  base: 'h-full w-full',
  variants: {
    zoomed: {
      true: 'overflow-auto overscroll-contain',
      false: 'flex items-center justify-center'
    }
  }
});

const lightboxToggle = tv({
  base: [
    'border-0 bg-transparent text-inherit touch-pan-x touch-pan-y',
    'transition-[padding] duration-[520ms] ease-[var(--motion-ease-out)] motion-reduce:transition-none'
  ],
  variants: {
    zoomed: {
      true: 'flex min-h-full w-max min-w-full cursor-zoom-out items-start justify-center p-3 sm:p-6',
      false: 'flex h-full w-full items-center justify-center p-2 cursor-zoom-in sm:p-0'
    }
  }
});

const mobileLightboxHeader = tv({
  base: 'flex items-center justify-between gap-3 px-4 py-3 text-overlay-fg sm:hidden'
});

const desktopLightboxHeader = tv({
  base: 'hidden w-full items-center justify-between gap-3 px-4 py-3 text-overlay-fg sm:flex'
});

const lightboxControls = tv({
  base: 'flex items-center justify-center gap-3',
  variants: {
    desktop: {
      true: 'justify-end gap-2',
      false: 'pt-1'
    }
  }
});

const zoomValue = tv({
  base: 'text-overlay-muted text-center font-mono leading-none',
  variants: {
    desktop: {
      true: 'min-w-14 text-xs',
      false: 'min-w-14 text-xs'
    }
  }
});

const zoomButton = tv({
  base: 'border-overlay-border bg-overlay-control-bg text-overlay-fg data-[hovered]:bg-overlay-control-bg-hover min-w-0 border px-2.5'
});

export type GalleryImage = {
  src: string;
  fullAvif: string;
  thumbSrc: string;
  thumbAvif: string;
  thumbWebp: string;
  thumbSizes: string;
  alt: string;
  device: 'desktop' | 'mobile';
  initialZoom?: ZoomLevel;
  orientation: 'portrait' | 'landscape';
  width: number;
  height: number;
};

type IndexedImage = GalleryImage & { index: number };
type Props = { images: GalleryImage[]; title: string; openRequest?: number };
type SwipeState = { x: number; y: number };
type PinchState = { distance: number; zoomLevel: number };
type PinchAnchor = { localX: number; localY: number; ratioX: number; ratioY: number };
type TouchHandler = (event: ReactTouchEvent<HTMLButtonElement>) => void;

type ProjectGalleryLightboxProps = {
  active: number;
  activeImage: GalleryImage;
  canZoomIn: boolean;
  canZoomOut: boolean;
  imagesLength: number;
  imageButtonRef: RefObject<HTMLButtonElement | null>;
  onImageClick: () => void;
  onImageLoad: () => void;
  onImageTouchCancel: () => void;
  onImageTouchEnd: TouchHandler;
  onImageTouchMove: TouchHandler;
  onImageTouchStart: TouchHandler;
  onNext: () => void;
  onOpenChange: (isOpen: boolean) => void;
  onPrev: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  open: boolean;
  title: string;
  viewportRef: RefObject<HTMLDivElement | null>;
  zoomDescriptionId: string;
  zoomLabel: string;
  zoomed: boolean;
  lightboxImageStyle?: CSSProperties;
};

const SWIPE_THRESHOLD = 48;
const SWIPE_VERTICAL_TOLERANCE = 32;
const BASE_ZOOM_LEVELS = [1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 3, 4, 5, 7.5, 10] as const;
const MOBILE_ZOOM_LEVELS = [
  1, 1.125, 1.25, 1.375, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.5, 4, 4.5, 5, 6, 7.5, 8.5, 10
] as const;

type ZoomLevel = (typeof BASE_ZOOM_LEVELS)[number];

const getTouchDistance = (touchA: Touch, touchB: Touch) =>
  Math.hypot(touchB.clientX - touchA.clientX, touchB.clientY - touchA.clientY);

const getTouchMidpoint = (touchA: Touch, touchB: Touch) => ({
  x: (touchA.clientX + touchB.clientX) / 2,
  y: (touchA.clientY + touchB.clientY) / 2
});

const clampScroll = (value: number, max: number) => Math.min(Math.max(value, 0), Math.max(max, 0));

const isHorizontalSwipeGesture = (deltaX: number, deltaY: number) =>
  Math.abs(deltaX) >= SWIPE_THRESHOLD &&
  Math.abs(deltaY) <= SWIPE_VERTICAL_TOLERANCE &&
  Math.abs(deltaX) > Math.abs(deltaY);

const endPinchTouchGesture = (
  event: ReactTouchEvent<HTMLButtonElement>,
  pinchStateRef: RefObject<PinchState | null>,
  swipeStartRef: RefObject<SwipeState | null>
) => {
  if (!pinchStateRef.current) return false;

  if (event.touches.length < 2) {
    pinchStateRef.current = null;
  }

  swipeStartRef.current = null;
  return true;
};

const handleSwipeTouchEnd = (
  event: ReactTouchEvent<HTMLButtonElement>,
  swipeStartRef: RefObject<SwipeState | null>,
  suppressImageToggleRef: RefObject<boolean>,
  isSwipeBlocked: () => boolean,
  next: () => void,
  prev: () => void
) => {
  const swipeStart = swipeStartRef.current;
  if (!swipeStart) return;

  const touch = event.changedTouches[0];
  swipeStartRef.current = null;
  if (!touch) return;

  const deltaX = touch.clientX - swipeStart.x;
  const deltaY = touch.clientY - swipeStart.y;
  if (!isHorizontalSwipeGesture(deltaX, deltaY) || isSwipeBlocked()) return;

  suppressImageToggleRef.current = true;

  if (deltaX < 0) {
    next();
    return;
  }

  prev();
};

const getClosestZoomIndex = (zoomLevels: number[], targetZoom: number) => {
  if (!zoomLevels.length) return 0;

  return zoomLevels.reduce(
    (closestIndex, zoomLevel, index) =>
      Math.abs(zoomLevel - targetZoom) < Math.abs(zoomLevels[closestIndex] - targetZoom) ? index : closestIndex,
    0
  );
};

const getLightboxImageStyle = (image: GalleryImage, zoomLevel: number, zoomed: boolean): CSSProperties | undefined => {
  if (image.device === 'mobile') {
    if (!zoomed) {
      return {
        width: `min(100%, 28rem, calc((100svh - 9rem) * ${image.width / image.height}), ${image.width}px)`,
        height: 'auto'
      };
    }

    return {
      width: `min(calc((100svw - 1.5rem) * ${zoomLevel}), ${image.width}px)`,
      height: 'auto'
    };
  }

  if (!zoomed) return undefined;

  return {
    width: `min(calc((100svw - clamp(3rem, 10vw, 10rem)) * ${zoomLevel}), ${image.width}px)`,
    height: 'auto'
  };
};

const getZoomLevelsForImage = (image: GalleryImage | undefined) => {
  if (!image) return [1];

  const baseLevels = image.device === 'mobile' ? MOBILE_ZOOM_LEVELS : BASE_ZOOM_LEVELS;

  return Array.from(
    new Set([1, ...baseLevels, image.initialZoom].filter((level): level is number => Boolean(level)))
  ).toSorted((a, b) => a - b);
};

const getDefaultZoomIndex = (image: GalleryImage | undefined, zoomLevels: number[]) => {
  const initialZoom = image?.initialZoom;
  if (!initialZoom) return 0;

  const matchedIndex = zoomLevels.findIndex((level) => level >= initialZoom);

  return matchedIndex === -1 ? zoomLevels.length - 1 : matchedIndex;
};

const Thumb: FC<{ image: GalleryImage; onOpen: () => void; eager?: boolean }> = ({ image, onOpen, eager = false }) => {
  const [loaded, setLoaded] = useState(false);
  const label = image.alt.trim() || 'Project screenshot';

  return (
    <Button variant="unstyled" onPress={onOpen} className={thumbButton()} aria-label={`Open screenshot: ${label}`}>
      <div className={thumbFrame({ device: image.device })}>
        {!loaded && <div className="absolute inset-0 animate-pulse bg-surface-alt" aria-hidden="true" />}
        <picture>
          <source type="image/avif" srcSet={image.thumbAvif} sizes={image.thumbSizes} />
          <source type="image/webp" srcSet={image.thumbWebp} sizes={image.thumbSizes} />
          <img
            src={image.thumbSrc}
            alt={label}
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
            onLoad={() => setLoaded(true)}
            className={thumbImg({ loaded })}
          />
        </picture>
      </div>
    </Button>
  );
};

const GallerySection: FC<{
  id: string;
  label: string;
  icon: ReactNode;
  gridClass: string;
  images: IndexedImage[];
  onOpen: (index: number) => void;
  wrapThumb?: boolean;
  eagerCount?: number;
}> = ({ id, label, icon, gridClass, images, onOpen, wrapThumb, eagerCount = 0 }) => (
  <section aria-labelledby={id}>
    <h2
      id={id}
      className="text-fg-muted mb-4 flex items-center gap-2 font-mono text-xs tracking-[0.25em] uppercase md:mb-8"
    >
      {icon}
      {label}
    </h2>
    <div className={gridClass}>
      {images.map((image, index) =>
        wrapThumb ? (
          <div key={image.src} className="mx-auto w-full max-w-65">
            <Thumb image={image} onOpen={() => onOpen(image.index)} eager={index < eagerCount} />
          </div>
        ) : (
          <div key={image.src}>
            <Thumb image={image} onOpen={() => onOpen(image.index)} eager={index < eagerCount} />
          </div>
        )
      )}
    </div>
  </section>
);

const ProjectGalleryLightbox: FC<ProjectGalleryLightboxProps> = ({
  active,
  activeImage,
  canZoomIn,
  canZoomOut,
  imageButtonRef,
  imagesLength,
  onImageClick,
  onImageLoad,
  onImageTouchCancel,
  onImageTouchEnd,
  onImageTouchMove,
  onImageTouchStart,
  onNext,
  onOpenChange,
  onPrev,
  onZoomIn,
  onZoomOut,
  open,
  title,
  viewportRef,
  zoomDescriptionId,
  zoomLabel,
  zoomed,
  lightboxImageStyle
}) => (
  <ModalOverlay isOpen={open} onOpenChange={onOpenChange} isDismissable className={lightboxOverlay()}>
    <Modal className="flex h-svh w-full flex-col outline-none">
      <Dialog className="flex min-h-0 flex-1 flex-col outline-none">
        <div className={mobileLightboxHeader()}>
          <Heading slot="title" className="font-display min-w-0 truncate text-lg">
            {title}
          </Heading>
          <IconButton
            slot="close"
            label="Close screenshots"
            icon={<X className="size-5" />}
            className="text-overlay-fg data-[hovered]:bg-overlay-control-bg-hover shrink-0"
          />
        </div>

        <div className={desktopLightboxHeader()}>
          <Heading slot="title" className="font-display text-xl">
            {title}
          </Heading>
          <div className={lightboxControls({ desktop: true })}>
            <Button
              variant="ghost"
              color="neutral"
              size="sm"
              onPress={onZoomOut}
              isDisabled={!canZoomOut}
              className={zoomButton()}
            >
              <ZoomOut className="size-4" />
              Zoom out
            </Button>
            <div className={zoomValue({ desktop: true })}>{zoomLabel}</div>
            <Button
              variant="ghost"
              color="neutral"
              size="sm"
              onPress={onZoomIn}
              isDisabled={!canZoomIn}
              className={zoomButton()}
            >
              <ZoomIn className="size-4" />
              Zoom in
            </Button>
            <IconButton
              slot="close"
              label="Close screenshots"
              icon={<X className="size-5" />}
              className="text-overlay-fg data-[hovered]:bg-overlay-control-bg-hover shrink-0"
            />
          </div>
        </div>

        <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-3 pb-3 sm:px-4 sm:pb-4">
          {imagesLength > 1 && (
            <IconButton
              label="Previous image"
              onPress={onPrev}
              icon={<ChevronLeft className="size-6" />}
              className="absolute top-1/2 left-4 z-10 -translate-y-1/2 hidden sm:flex"
            />
          )}

          <div ref={viewportRef} className={lightboxViewport({ zoomed })} aria-live="polite">
            <button
              ref={imageButtonRef}
              type="button"
              onClick={onImageClick}
              onTouchStart={onImageTouchStart}
              onTouchMove={onImageTouchMove}
              onTouchEnd={onImageTouchEnd}
              onTouchCancel={onImageTouchCancel}
              className={lightboxToggle({ zoomed })}
              aria-label={zoomed ? 'Reset screenshot zoom' : 'Zoom screenshot'}
              aria-pressed={zoomed}
              aria-describedby={zoomDescriptionId}
            >
              <span id={zoomDescriptionId} className="sr-only">
                Screenshot zoom is {zoomLabel}. Activate to {zoomed ? 'reset zoom' : 'zoom in'}. Use arrow keys to move
                between screenshots.
              </span>
              <picture>
                <source type="image/avif" srcSet={activeImage.fullAvif} />
                <img
                  src={activeImage.src}
                  alt={activeImage.alt.trim() || 'Project screenshot'}
                  onLoad={onImageLoad}
                  className={lightboxImage({ device: activeImage.device, zoomed })}
                  style={lightboxImageStyle}
                />
              </picture>
            </button>
          </div>

          {imagesLength > 1 && (
            <IconButton
              label="Next image"
              onPress={onNext}
              icon={<ChevronRight className="size-6" />}
              className="absolute top-1/2 right-4 z-10 -translate-y-1/2 hidden sm:flex"
            />
          )}
        </div>

        <div className="flex items-center justify-center gap-4 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:pb-6">
          {imagesLength > 1 && (
            <IconButton
              label="Previous image"
              onPress={onPrev}
              icon={<ChevronLeft className="size-5" />}
              className="sm:hidden"
            />
          )}
          <div className="flex flex-col items-center gap-1">
            <span className="text-overlay-muted font-mono text-xs">
              {active + 1} / {imagesLength}
            </span>
          </div>
          {imagesLength > 1 && (
            <IconButton
              label="Next image"
              onPress={onNext}
              icon={<ChevronRight className="size-5" />}
              className="sm:hidden"
            />
          )}
        </div>
      </Dialog>
    </Modal>
  </ModalOverlay>
);

const useProjectGalleryLightbox = (images: GalleryImage[]) => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [zoomIndex, setZoomIndex] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const imageButtonRef = useRef<HTMLButtonElement>(null);
  const swipeStartRef = useRef<SwipeState | null>(null);
  const pinchStateRef = useRef<PinchState | null>(null);
  const pinchAnchorRef = useRef<PinchAnchor | null>(null);
  const pinchAnchorFrameRef = useRef<number | null>(null);
  const suppressImageToggleRef = useRef(false);

  const activeImage = images[active];
  const zoomLevels = useMemo(() => getZoomLevelsForImage(activeImage), [activeImage]);
  const defaultZoomIndex = useMemo(() => getDefaultZoomIndex(activeImage, zoomLevels), [activeImage, zoomLevels]);
  const maxZoomIndex = zoomLevels.length - 1;
  const zoomLevel = zoomLevels[zoomIndex] ?? 1;
  const zoomed = zoomIndex > 0;
  const zoomLabel = `${Math.round(zoomLevel * 100)}%`;
  const canZoomIn = zoomIndex < maxZoomIndex;
  const canZoomOut = zoomIndex > 0;

  const lightboxImageStyle = useMemo(() => {
    if (!activeImage) return undefined;

    return getLightboxImageStyle(activeImage, zoomLevel, zoomed);
  }, [activeImage, zoomLevel, zoomed]);

  const resetZoom = useCallback(
    (imageIndex = active) => {
      const image = images[imageIndex];
      const levels = getZoomLevelsForImage(image);

      pinchAnchorRef.current = null;
      setZoomIndex(getDefaultZoomIndex(image, levels));
    },
    [active, images]
  );

  const zoomIn = useCallback(() => {
    pinchAnchorRef.current = null;
    setZoomIndex((value) => Math.min(value + 1, maxZoomIndex));
  }, [maxZoomIndex]);

  const zoomOut = useCallback(() => {
    pinchAnchorRef.current = null;
    setZoomIndex((value) => Math.max(value - 1, 0));
  }, []);

  const toggleImageZoom = useCallback(() => {
    pinchAnchorRef.current = null;
    setZoomIndex((value) => {
      if (value > 0) return 0;

      if (defaultZoomIndex > 0) return defaultZoomIndex;

      return Math.min(1, maxZoomIndex);
    });
  }, [defaultZoomIndex, maxZoomIndex]);

  const openAt = useCallback(
    (index: number) => {
      setActive(index);
      resetZoom(index);
      setOpen(true);
    },
    [resetZoom]
  );

  const next = useCallback(() => {
    const nextIndex = (active + 1) % images.length;
    setActive(nextIndex);
    resetZoom(nextIndex);
  }, [active, images.length, resetZoom]);

  const prev = useCallback(() => {
    const prevIndex = (active - 1 + images.length) % images.length;
    setActive(prevIndex);
    resetZoom(prevIndex);
  }, [active, images.length, resetZoom]);

  const centerViewport = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    viewport.scrollTop = 0;
    viewport.scrollLeft = Math.max(0, (viewport.scrollWidth - viewport.clientWidth) / 2);
  }, []);

  const applyPinchAnchor = useCallback(() => {
    const viewport = viewportRef.current;
    const anchor = pinchAnchorRef.current;
    if (!viewport || !anchor) return;

    viewport.scrollLeft = clampScroll(
      anchor.ratioX * viewport.scrollWidth - anchor.localX,
      viewport.scrollWidth - viewport.clientWidth
    );
    viewport.scrollTop = clampScroll(
      anchor.ratioY * viewport.scrollHeight - anchor.localY,
      viewport.scrollHeight - viewport.clientHeight
    );
  }, []);

  const keepPinchAnchorStable = useCallback(() => {
    if (pinchAnchorFrameRef.current !== null) {
      window.cancelAnimationFrame(pinchAnchorFrameRef.current);
    }

    const startedAt = performance.now();
    const tick = (now: number) => {
      applyPinchAnchor();

      if (now - startedAt < 560 && pinchAnchorRef.current) {
        pinchAnchorFrameRef.current = window.requestAnimationFrame(tick);
        return;
      }

      pinchAnchorFrameRef.current = null;
    };

    pinchAnchorFrameRef.current = window.requestAnimationFrame(tick);
  }, [applyPinchAnchor]);

  const rememberPinchAnchor = useCallback((touchA: Touch, touchB: Touch) => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const midpoint = getTouchMidpoint(touchA, touchB);
    const rect = viewport.getBoundingClientRect();
    const localX = midpoint.x - rect.left;
    const localY = midpoint.y - rect.top;

    pinchAnchorRef.current = {
      localX,
      localY,
      ratioX: (viewport.scrollLeft + localX) / Math.max(viewport.scrollWidth, 1),
      ratioY: (viewport.scrollTop + localY) / Math.max(viewport.scrollHeight, 1)
    };
  }, []);

  const clearGestureState = useCallback(() => {
    swipeStartRef.current = null;
    pinchStateRef.current = null;
  }, []);

  const isSwipeBlocked = useCallback(() => {
    const viewport = viewportRef.current;

    if (!viewport) return false;

    return viewport.scrollWidth > viewport.clientWidth + 4;
  }, []);

  const handleImageTouchStart = useCallback<TouchHandler>(
    (event) => {
      if (event.touches.length >= 2) {
        pinchStateRef.current = {
          distance: getTouchDistance(event.touches[0], event.touches[1]),
          zoomLevel
        };
        rememberPinchAnchor(event.touches[0], event.touches[1]);
        swipeStartRef.current = null;
        suppressImageToggleRef.current = true;
        return;
      }

      pinchStateRef.current = null;

      if (event.touches.length !== 1 || images.length <= 1) return;

      swipeStartRef.current = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY
      };
      suppressImageToggleRef.current = false;
    },
    [images.length, rememberPinchAnchor, zoomLevel]
  );

  const handleImageTouchMove = useCallback<TouchHandler>(
    (event) => {
      const pinchState = pinchStateRef.current;

      if (!pinchState || event.touches.length < 2) return;

      rememberPinchAnchor(event.touches[0], event.touches[1]);

      const nextDistance = getTouchDistance(event.touches[0], event.touches[1]);
      const scaledZoom = pinchState.zoomLevel * (nextDistance / pinchState.distance);
      const minZoomLevel = zoomLevels[0] ?? 1;
      const maxZoomLevel = zoomLevels[maxZoomIndex] ?? minZoomLevel;
      const clampedZoom = Math.min(maxZoomLevel, Math.max(minZoomLevel, scaledZoom));
      const nextZoomIndex = getClosestZoomIndex(zoomLevels, clampedZoom);

      suppressImageToggleRef.current = true;
      event.preventDefault();
      setZoomIndex((value) => (value === nextZoomIndex ? value : nextZoomIndex));
    },
    [maxZoomIndex, rememberPinchAnchor, zoomLevels]
  );

  const handleImageTouchEnd = useCallback<TouchHandler>(
    (event) => {
      if (endPinchTouchGesture(event, pinchStateRef, swipeStartRef)) return;

      handleSwipeTouchEnd(event, swipeStartRef, suppressImageToggleRef, isSwipeBlocked, next, prev);
    },
    [isSwipeBlocked, next, prev]
  );

  const handleImageClick = useCallback(() => {
    if (suppressImageToggleRef.current) {
      suppressImageToggleRef.current = false;
      return;
    }

    toggleImageZoom();
  }, [toggleImageZoom]);

  const handleImageLoad = useCallback(() => {
    if (zoomed && !pinchAnchorRef.current) centerViewport();
  }, [centerViewport, zoomed]);

  const handleOpenChange = useCallback(
    (isOpen: boolean) => {
      setOpen(isOpen);
      if (!isOpen) resetZoom();
    },
    [resetZoom]
  );

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') next();
      if (event.key === 'ArrowLeft') prev();
      if (event.key.toLowerCase() === 'z') {
        if (event.shiftKey) {
          zoomOut();
          return;
        }

        zoomIn();
      }
      if (event.key === 'Escape') resetZoom();
    };

    document.addEventListener('keydown', onKey);

    return () => document.removeEventListener('keydown', onKey);
  }, [open, next, prev, resetZoom, zoomIn, zoomOut]);

  useEffect(() => {
    const shouldKeepPinchAnchor = open && zoomIndex >= 0 && pinchAnchorRef.current;
    if (!shouldKeepPinchAnchor) return;

    keepPinchAnchorStable();
  }, [keepPinchAnchorStable, open, zoomIndex]);

  useEffect(() => {
    if (!open || !zoomed || pinchAnchorRef.current) return;

    const frame = window.requestAnimationFrame(centerViewport);

    return () => window.cancelAnimationFrame(frame);
  }, [centerViewport, open, zoomed]);

  useEffect(() => {
    return () => {
      if (pinchAnchorFrameRef.current !== null) {
        window.cancelAnimationFrame(pinchAnchorFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const imageButton = imageButtonRef.current;
    if (!open || !imageButton) return;

    const preventNativeGesture = (event: Event) => event.preventDefault();
    const listenerOptions = { passive: false };

    imageButton.addEventListener('gesturestart', preventNativeGesture, listenerOptions);
    imageButton.addEventListener('gesturechange', preventNativeGesture, listenerOptions);
    imageButton.addEventListener('gestureend', preventNativeGesture, listenerOptions);

    return () => {
      imageButton.removeEventListener('gesturestart', preventNativeGesture);
      imageButton.removeEventListener('gesturechange', preventNativeGesture);
      imageButton.removeEventListener('gestureend', preventNativeGesture);
    };
  }, [open]);

  return {
    active,
    activeImage,
    canZoomIn,
    canZoomOut,
    clearGestureState,
    handleImageClick,
    handleImageLoad,
    handleImageTouchEnd,
    handleImageTouchMove,
    handleImageTouchStart,
    handleOpenChange,
    imageButtonRef,
    next,
    open,
    openAt,
    prev,
    viewportRef,
    zoomIn,
    zoomLabel,
    zoomOut,
    zoomed,
    lightboxImageStyle
  };
};

export const ProjectGallery: FC<Props> = ({ images, title, openRequest = 0 }) => {
  const dialogId = useId();
  const zoomDescriptionId = `${dialogId}-zoom-description`;
  const handledOpenRequestRef = useRef(0);
  const {
    active,
    activeImage,
    canZoomIn,
    canZoomOut,
    clearGestureState,
    handleImageClick,
    handleImageLoad,
    handleImageTouchEnd,
    handleImageTouchMove,
    handleImageTouchStart,
    handleOpenChange,
    imageButtonRef,
    next,
    open,
    openAt,
    prev,
    viewportRef,
    zoomIn,
    zoomLabel,
    zoomOut,
    zoomed,
    lightboxImageStyle
  } = useProjectGalleryLightbox(images);

  useEffect(() => {
    if (!openRequest || !images.length || openRequest === handledOpenRequestRef.current) return;

    handledOpenRequestRef.current = openRequest;
    openAt(0);
  }, [images.length, openAt, openRequest]);

  if (!images.length || !activeImage) return null;

  const indexed: IndexedImage[] = images.map((image, index) => ({
    ...image,
    index
  }));
  const desktopShots = indexed.filter((image) => image.device === 'desktop');
  const mobileShots = indexed.filter((image) => image.device === 'mobile');
  const firstGalleryEagerCount = 2;

  return (
    <>
      <div className="space-y-10">
        {desktopShots.length > 0 && (
          <GallerySection
            id={`${dialogId}-desktop`}
            label="Desktop"
            icon={<Monitor className="size-3.5" aria-hidden="true" />}
            gridClass="grid gap-4 sm:gap-8 md:grid-cols-2"
            images={desktopShots}
            onOpen={openAt}
            eagerCount={firstGalleryEagerCount}
          />
        )}

        {mobileShots.length > 0 && (
          <GallerySection
            id={`${dialogId}-mobile`}
            label="Mobile"
            icon={<Smartphone className="size-3.5" aria-hidden="true" />}
            gridClass="grid grid-cols-2 gap-4 sm:gap-8 sm:grid-cols-3 md:grid-cols-4"
            images={mobileShots}
            onOpen={openAt}
            wrapThumb
            eagerCount={desktopShots.length === 0 ? firstGalleryEagerCount : 0}
          />
        )}
      </div>

      <ProjectGalleryLightbox
        active={active}
        activeImage={activeImage}
        canZoomIn={canZoomIn}
        canZoomOut={canZoomOut}
        imageButtonRef={imageButtonRef}
        imagesLength={images.length}
        onImageClick={handleImageClick}
        onImageLoad={handleImageLoad}
        onImageTouchCancel={clearGestureState}
        onImageTouchEnd={handleImageTouchEnd}
        onImageTouchMove={handleImageTouchMove}
        onImageTouchStart={handleImageTouchStart}
        onNext={next}
        onOpenChange={handleOpenChange}
        onPrev={prev}
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        open={open}
        title={title}
        viewportRef={viewportRef}
        zoomDescriptionId={zoomDescriptionId}
        zoomLabel={zoomLabel}
        zoomed={zoomed}
        lightboxImageStyle={lightboxImageStyle}
      />
    </>
  );
};
