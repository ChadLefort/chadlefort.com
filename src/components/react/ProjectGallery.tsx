import type { FC, ReactNode } from 'react';
import { useEffect, useId, useState } from 'react';
import { ChevronLeft, ChevronRight, Smartphone, Monitor, X } from 'lucide-react';
import { Dialog, Heading, Modal, ModalOverlay } from 'react-aria-components';
import { IconButton } from '~/components/react/ui/IconButton';

type GalleryImage = {
  src: string;
  fullAvif: string;
  thumbSrc: string;
  thumbAvif: string;
  thumbWebp: string;
  thumbSizes: string;
  alt: string;
  orientation: 'portrait' | 'landscape';
  width: number;
  height: number;
};
type IndexedImage = GalleryImage & { index: number };
type Props = { images: GalleryImage[]; title: string };

const Thumb: FC<{ image: GalleryImage; onOpen: () => void }> = ({ image, onOpen }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <button
      type="button"
      onClick={onOpen}
      style={{ aspectRatio: `${image.width} / ${image.height}` }}
      className="group border-glass-border bg-surface-raised hover:border-accent/60 focus-visible:ring-accent relative block w-full cursor-pointer overflow-hidden rounded-xl border transition focus-visible:ring-2 focus-visible:outline-none"
      aria-label={`Open ${image.alt} in lightbox`}
    >
      {!loaded && <div className="bg-surface-alt absolute inset-0 animate-pulse" aria-hidden="true" />}
      <picture>
        <source type="image/avif" srcSet={image.thumbAvif} sizes={image.thumbSizes} />
        <source type="image/webp" srcSet={image.thumbWebp} sizes={image.thumbSizes} />
        <img
          src={image.thumbSrc}
          alt={image.alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={`block h-full w-full object-cover transition duration-300 group-hover:scale-[1.01] ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
      </picture>
    </button>
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
}> = ({ id, label, icon, gridClass, images, onOpen, wrapThumb }) => (
  <section aria-labelledby={id}>
    <h3
      id={id}
      className="text-fg-muted mb-4 flex items-center gap-2 font-mono text-xs tracking-[0.25em] uppercase md:mb-8"
    >
      {icon}
      {label}
    </h3>
    <div className={gridClass}>
      {images.map((image) => {
        const thumb = <Thumb image={image} onOpen={() => onOpen(image.index)} />;

        return wrapThumb ? (
          <div key={image.src} className="mx-auto w-full max-w-65">
            {thumb}
          </div>
        ) : (
          <div key={image.src}>{thumb}</div>
        );
      })}
    </div>
  </section>
);

export const ProjectGallery: FC<Props> = ({ images, title }) => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const dialogId = useId();

  const openAt = (index: number) => {
    setActive(index);
    setOpen(true);
  };

  const next = () => setActive((i) => (i + 1) % images.length);
  const prev = () => setActive((i) => (i - 1 + images.length) % images.length);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') setActive((i) => (i + 1) % images.length);
      if (event.key === 'ArrowLeft') setActive((i) => (i - 1 + images.length) % images.length);
    };

    document.addEventListener('keydown', onKey);

    return () => document.removeEventListener('keydown', onKey);
  }, [open, images.length]);

  if (!images.length) return null;

  const indexed: IndexedImage[] = images.map((img, index) => ({ ...img, index }));
  const desktopShots = indexed.filter((img) => img.orientation === 'landscape');
  const mobileShots = indexed.filter((img) => img.orientation === 'portrait');

  return (
    <>
      <div className="space-y-10">
        {desktopShots.length > 0 && (
          <GallerySection
            id={`${dialogId}-desktop`}
            label="Desktop"
            icon={<Monitor className="h-3.5 w-3.5" aria-hidden="true" />}
            gridClass="grid gap-4 md:grid-cols-2"
            images={desktopShots}
            onOpen={openAt}
          />
        )}

        {mobileShots.length > 0 && (
          <GallerySection
            id={`${dialogId}-mobile`}
            label="Mobile"
            icon={<Smartphone className="h-3.5 w-3.5" aria-hidden="true" />}
            gridClass="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4"
            images={mobileShots}
            onOpen={openAt}
            wrapThumb
          />
        )}
      </div>

      <ModalOverlay
        isOpen={open}
        onOpenChange={setOpen}
        isDismissable
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm transition-opacity duration-200 ease-out data-[entering]:opacity-0 data-[exiting]:opacity-0"
      >
        <Modal className="flex h-full w-full flex-col outline-none">
          <Dialog className="flex h-full flex-col outline-none">
            <div className="flex items-center justify-between px-4 py-3 text-white">
              <Heading slot="title" className="font-display text-lg">
                {title}
              </Heading>
              <IconButton slot="close" label="Close gallery" icon={<X className="h-5 w-5" />} />
            </div>

            <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 pb-8">
              {images.length > 1 && (
                <IconButton
                  label="Previous image"
                  onPress={prev}
                  icon={<ChevronLeft className="h-6 w-6" />}
                  className="absolute top-1/2 left-4 z-10 -translate-y-1/2"
                />
              )}

              <picture>
                <source type="image/avif" srcSet={images[active].fullAvif} />
                <img
                  src={images[active].src}
                  alt={images[active].alt}
                  className="max-h-full max-w-full rounded-lg object-contain"
                />
              </picture>

              {images.length > 1 && (
                <IconButton
                  label="Next image"
                  onPress={next}
                  icon={<ChevronRight className="h-6 w-6" />}
                  className="absolute top-1/2 right-4 z-10 -translate-y-1/2"
                />
              )}
            </div>

            <div className="flex justify-center pb-6 font-mono text-xs text-white/70">
              {active + 1} / {images.length}
            </div>
          </Dialog>
        </Modal>
      </ModalOverlay>
    </>
  );
};
