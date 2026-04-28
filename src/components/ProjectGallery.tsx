import { ChevronLeft, ChevronRight, Monitor, Smartphone, X, ZoomIn, ZoomOut } from 'lucide-react';
import type { CSSProperties, FC, ReactNode } from 'react';
import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { Dialog, Heading, Modal, ModalOverlay } from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { Button } from '~/components/Button';
import { IconButton } from '~/components/IconButton';

const thumbImg = tv({
  base: 'block h-full w-full rounded-2xl object-cover object-top transition duration-300 group-hover:scale-[1.01]',
  variants: {
    loaded: {
      true: 'opacity-100',
      false: 'opacity-0'
    }
  }
});

const thumbButton = tv({
  base: [
    'group relative block w-full cursor-pointer rounded-2xl transition px-2',
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
    'fixed inset-0 z-50 bg-black/90 backdrop-blur-sm',
    'transition-opacity duration-200 ease-out',
    'data-[entering]:opacity-0 data-[exiting]:opacity-0'
  ]
});

const lightboxImage = tv({
  base: 'block h-auto rounded-lg object-contain',
  variants: {
    zoomed: {
      true: 'max-h-none max-w-none',
      false: 'max-h-[calc(100vh-10rem)]'
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
      true: 'overflow-auto',
      false: 'flex items-center justify-center'
    }
  }
});

const lightboxToggle = tv({
  base: 'w-full border-0 bg-transparent text-inherit',
  variants: {
    zoomed: {
      true: 'flex min-h-full min-w-full cursor-zoom-out items-start justify-center p-6',
      false: 'flex h-full items-center justify-center cursor-zoom-in'
    }
  }
});

const mobileLightboxHeader = tv({
  base: 'flex flex-col gap-4 px-4 py-3 text-white sm:hidden'
});

const mobileLightboxTitleRow = tv({
  base: 'flex items-center justify-between gap-3'
});

const desktopLightboxHeader = tv({
  base: 'hidden w-full items-center justify-between gap-3 px-4 py-3 text-white sm:flex'
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
  base: 'text-center font-mono leading-none text-white/70',
  variants: {
    desktop: {
      true: 'min-w-14 text-xs',
      false: 'min-w-14 text-xs'
    }
  }
});

const zoomButton = tv({
  base: 'min-w-0 border border-white/15 bg-white/5 px-2.5 text-white data-[hovered]:bg-white/10'
});

const mobileZoomIconButton = tv({
  base: 'text-white data-[hovered]:bg-white/10'
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
  initialZoom?: number;
  orientation: 'portrait' | 'landscape';
  width: number;
  height: number;
};

type IndexedImage = GalleryImage & { index: number };
type Props = { images: GalleryImage[]; title: string };

const getZoomedImageStyle = (image: GalleryImage, zoomLevel: number): CSSProperties => {
  if (image.device === 'mobile') {
    return {
      height: `min(calc((100vh - 10rem) * ${zoomLevel}), ${image.height}px)`,
      width: 'auto'
    };
  }

  return {
    width: `min(calc((100vw - 10rem) * ${zoomLevel}), ${image.width}px)`,
    height: 'auto'
  };
};

const getZoomLevelsForImage = (image: GalleryImage | undefined) => {
  if (!image) return [1];

  const baseLevels = image.device === 'mobile' ? [1, 1.15, 1.35, 1.75, 2.25, 3] : [1, 1.25, 1.5, 2, 2.5, 3];

  return [...new Set([1, ...baseLevels, image.initialZoom].filter((level): level is number => Boolean(level)))].sort(
    (a, b) => a - b
  );
};

const getDefaultZoomIndex = (image: GalleryImage | undefined, zoomLevels: number[]) => {
  const initialZoom = image?.initialZoom;
  if (!initialZoom) return 0;

  const matchedIndex = zoomLevels.findIndex((level) => level >= initialZoom);

  return matchedIndex === -1 ? zoomLevels.length - 1 : matchedIndex;
};

const Thumb: FC<{ image: GalleryImage; onOpen: () => void; eager?: boolean }> = ({ image, onOpen, eager = false }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <Button variant="unstyled" onPress={onOpen} className={thumbButton()} aria-label={`Open ${image.alt} in lightbox`}>
      <div className={thumbFrame({ device: image.device })}>
        {!loaded && <div className="absolute inset-0 animate-pulse bg-surface-alt" aria-hidden="true" />}
        <picture>
          <source type="image/avif" srcSet={image.thumbAvif} sizes={image.thumbSizes} />
          <source type="image/webp" srcSet={image.thumbWebp} sizes={image.thumbSizes} />
          <img
            src={image.thumbSrc}
            alt={image.alt}
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
    <h3
      id={id}
      className="text-fg-muted mb-4 flex items-center gap-2 font-mono text-xs tracking-[0.25em] uppercase md:mb-8"
    >
      {icon}
      {label}
    </h3>
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

export const ProjectGallery: FC<Props> = ({ images, title }) => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [zoomIndex, setZoomIndex] = useState(0);
  const dialogId = useId();
  const viewportRef = useRef<HTMLDivElement>(null);

  const activeImage = images[active];
  const zoomLevels = useMemo(() => getZoomLevelsForImage(activeImage), [activeImage]);
  const defaultZoomIndex = useMemo(() => getDefaultZoomIndex(activeImage, zoomLevels), [activeImage, zoomLevels]);
  const maxZoomIndex = zoomLevels.length - 1;
  const zoomLevel = zoomLevels[zoomIndex] ?? 1;
  const zoomed = zoomIndex > 0;
  const zoomLabel = `${Math.round(zoomLevel * 100)}%`;

  const zoomedImageStyle = useMemo(() => {
    if (!activeImage || !zoomed) return undefined;

    return getZoomedImageStyle(activeImage, zoomLevel);
  }, [activeImage, zoomLevel, zoomed]);

  const resetZoom = useCallback(
    (imageIndex = active) => {
      const image = images[imageIndex];
      const levels = getZoomLevelsForImage(image);

      setZoomIndex(getDefaultZoomIndex(image, levels));
    },
    [active, images]
  );

  const zoomIn = useCallback(() => {
    setZoomIndex((value) => Math.min(value + 1, maxZoomIndex));
  }, [maxZoomIndex]);

  const zoomOut = useCallback(() => {
    setZoomIndex((value) => Math.max(value - 1, 0));
  }, []);

  const toggleImageZoom = useCallback(() => {
    setZoomIndex((value) =>
      value === defaultZoomIndex ? Math.min(defaultZoomIndex + 1, maxZoomIndex) : defaultZoomIndex
    );
  }, [defaultZoomIndex, maxZoomIndex]);

  const openAt = (index: number) => {
    setActive(index);
    resetZoom(index);
    setOpen(true);
  };

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
    if (!open || !zoomed) return;

    const frame = window.requestAnimationFrame(centerViewport);

    return () => window.cancelAnimationFrame(frame);
  }, [centerViewport, open, zoomed]);

  if (!images.length) return null;

  const indexed: IndexedImage[] = images.map((img, index) => ({
    ...img,
    index
  }));
  const desktopShots = indexed.filter((img) => img.device === 'desktop');
  const mobileShots = indexed.filter((img) => img.device === 'mobile');
  const firstGalleryEagerCount = 2;

  return (
    <>
      <div className="space-y-10">
        {desktopShots.length > 0 && (
          <GallerySection
            id={`${dialogId}-desktop`}
            label="Desktop"
            icon={<Monitor className="h-3.5 w-3.5" aria-hidden="true" />}
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
            icon={<Smartphone className="h-3.5 w-3.5" aria-hidden="true" />}
            gridClass="grid grid-cols-2 gap-4 sm:gap-8 sm:grid-cols-3 md:grid-cols-4"
            images={mobileShots}
            onOpen={openAt}
            wrapThumb
            eagerCount={desktopShots.length === 0 ? firstGalleryEagerCount : 0}
          />
        )}
      </div>

      <ModalOverlay
        isOpen={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen) resetZoom();
        }}
        isDismissable
        className={lightboxOverlay()}
      >
        <Modal className="flex h-full w-full flex-col outline-none">
          <Dialog className="flex h-full flex-col outline-none">
            <div className={mobileLightboxHeader()}>
              <div className={mobileLightboxTitleRow()}>
                <Heading slot="title" className="font-display text-lg">
                  {title}
                </Heading>
                <IconButton
                  slot="close"
                  label="Close gallery"
                  icon={<X className="h-5 w-5" />}
                  className="shrink-0 text-white data-[hovered]:bg-white/10"
                />
              </div>
              <div className={lightboxControls()}>
                <IconButton
                  label="Zoom out"
                  onPress={zoomOut}
                  isDisabled={zoomIndex <= defaultZoomIndex}
                  icon={<ZoomOut className="h-5 w-5" />}
                  className={mobileZoomIconButton()}
                />
                <div className={zoomValue()}>{zoomLabel}</div>
                <IconButton
                  label="Zoom in"
                  onPress={zoomIn}
                  isDisabled={zoomIndex >= maxZoomIndex}
                  icon={<ZoomIn className="h-5 w-5" />}
                  className={mobileZoomIconButton()}
                />
              </div>
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
                  onPress={zoomOut}
                  isDisabled={zoomIndex <= defaultZoomIndex}
                  className={zoomButton()}
                >
                  <ZoomOut className="h-4 w-4" />
                  Zoom out
                </Button>
                <div className={zoomValue({ desktop: true })}>{zoomLabel}</div>
                <Button
                  variant="ghost"
                  color="neutral"
                  size="sm"
                  onPress={zoomIn}
                  isDisabled={zoomIndex >= maxZoomIndex}
                  className={zoomButton()}
                >
                  <ZoomIn className="h-4 w-4" />
                  Zoom in
                </Button>
                <IconButton
                  slot="close"
                  label="Close gallery"
                  icon={<X className="h-5 w-5" />}
                  className="shrink-0 text-white data-[hovered]:bg-white/10"
                />
              </div>
            </div>

            <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 pb-4">
              {images.length > 1 && (
                <IconButton
                  label="Previous image"
                  onPress={prev}
                  icon={<ChevronLeft className="h-6 w-6" />}
                  className="absolute top-1/2 left-4 z-10 -translate-y-1/2 hidden sm:flex"
                />
              )}

              <div ref={viewportRef} className={lightboxViewport({ zoomed })} aria-live="polite">
                <button
                  type="button"
                  onClick={toggleImageZoom}
                  className={lightboxToggle({ zoomed })}
                  aria-label={zoomed ? 'Reset image zoom' : 'Zoom image to next level'}
                >
                  <picture>
                    <source type="image/avif" srcSet={activeImage.fullAvif} />
                    <img
                      src={activeImage.src}
                      alt={activeImage.alt}
                      onLoad={() => {
                        if (zoomed) centerViewport();
                      }}
                      className={lightboxImage({ device: activeImage.device, zoomed })}
                      style={zoomedImageStyle}
                    />
                  </picture>
                </button>
              </div>

              {images.length > 1 && (
                <IconButton
                  label="Next image"
                  onPress={next}
                  icon={<ChevronRight className="h-6 w-6" />}
                  className="absolute top-1/2 right-4 z-10 -translate-y-1/2 hidden sm:flex"
                />
              )}
            </div>

            <div className="flex items-center justify-center gap-4 px-4 pb-6">
              {images.length > 1 && (
                <IconButton
                  label="Previous image"
                  onPress={prev}
                  icon={<ChevronLeft className="h-5 w-5" />}
                  className="sm:hidden"
                />
              )}
              <div className="flex flex-col items-center gap-1">
                <span className="font-mono text-xs text-white/70">
                  {active + 1} / {images.length}
                </span>
              </div>
              {images.length > 1 && (
                <IconButton
                  label="Next image"
                  onPress={next}
                  icon={<ChevronRight className="h-5 w-5" />}
                  className="sm:hidden"
                />
              )}
            </div>
          </Dialog>
        </Modal>
      </ModalOverlay>
    </>
  );
};
