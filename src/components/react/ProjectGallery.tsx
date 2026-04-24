import type { FC } from 'react';
import { useEffect, useId, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Smartphone, Monitor, X } from 'lucide-react';

type GalleryImage = { src: string; alt: string; orientation: 'portrait' | 'landscape' };
type Props = { images: GalleryImage[]; title: string };

export const ProjectGallery: FC<Props> = ({ images, title }) => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);
  const dialogId = useId();

  const close = () => {
    setOpen(false);
    window.setTimeout(() => lastTrigger.current?.focus(), 10);
  };

  const openAt = (index: number, trigger: HTMLElement) => {
    lastTrigger.current = trigger;
    setActive(index);
    setOpen(true);
  };

  const next = () => setActive((i) => (i + 1) % images.length);
  const prev = () => setActive((i) => (i - 1 + images.length) % images.length);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = 'hidden';
    const closeBtn = dialogRef.current?.querySelector<HTMLElement>('[data-dialog-close]');

    closeBtn?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowRight') next();
      if (event.key === 'ArrowLeft') prev();
    };

    document.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
    // close/next/prev are stable closures; only re-run when open toggles
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!images.length) return null;

  const desktopShots = images.map((img, i) => ({ ...img, index: i })).filter((img) => img.orientation === 'landscape');
  const mobileShots = images.map((img, i) => ({ ...img, index: i })).filter((img) => img.orientation === 'portrait');

  const Thumb = ({ image, index }: { image: GalleryImage; index: number }) => (
    <button
      type="button"
      onClick={(event) => openAt(index, event.currentTarget)}
      className="group border-glass-border bg-surface-raised hover:border-accent/60 focus-visible:ring-accent relative block w-full overflow-hidden rounded-xl border transition focus-visible:ring-2 focus-visible:outline-none"
      aria-label={`Open ${image.alt} in lightbox`}
    >
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        decoding="async"
        className="block h-full w-full object-cover transition group-hover:scale-[1.01]"
      />
    </button>
  );

  return (
    <>
      <div className="space-y-10">
        {desktopShots.length > 0 && (
          <section aria-labelledby={`${dialogId}-desktop`}>
            <h3
              id={`${dialogId}-desktop`}
              className="text-fg-muted mb-4 flex items-center gap-2 font-mono text-xs tracking-[0.25em] uppercase md:mb-8"
            >
              <Monitor className="h-3.5 w-3.5" aria-hidden="true" />
              Desktop
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {desktopShots.map((image) => (
                <Thumb key={image.src} image={image} index={image.index} />
              ))}
            </div>
          </section>
        )}

        {mobileShots.length > 0 && (
          <section aria-labelledby={`${dialogId}-mobile`}>
            <h3
              id={`${dialogId}-mobile`}
              className="text-fg-muted mb-4 flex items-center gap-2 font-mono text-xs tracking-[0.25em] uppercase md:mb-8"
            >
              <Smartphone className="h-3.5 w-3.5" aria-hidden="true" />
              Mobile
            </h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {mobileShots.map((image) => (
                <div key={image.src} className="mx-auto w-full max-w-65">
                  <Thumb image={image} index={image.index} />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={dialogId}
          ref={dialogRef}
          className="fixed inset-0 z-50 flex flex-col bg-black/90 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between px-4 py-3 text-white">
            <h2 id={dialogId} className="font-display text-lg">
              {title}
            </h2>
            <button
              type="button"
              data-dialog-close
              onClick={close}
              aria-label="Close gallery"
              className="focus-visible:ring-accent inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20 focus-visible:ring-2 focus-visible:outline-none"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 pb-8">
            {images.length > 1 && (
              <button
                type="button"
                onClick={prev}
                aria-label="Previous image"
                className="focus-visible:ring-accent absolute top-1/2 left-4 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:ring-2 focus-visible:outline-none"
              >
                <ChevronLeft className="h-6 w-6" aria-hidden="true" />
              </button>
            )}

            <img
              src={images[active].src}
              alt={images[active].alt}
              className="max-h-full max-w-full rounded-lg object-contain"
            />

            {images.length > 1 && (
              <button
                type="button"
                onClick={next}
                aria-label="Next image"
                className="focus-visible:ring-accent absolute top-1/2 right-4 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:ring-2 focus-visible:outline-none"
              >
                <ChevronRight className="h-6 w-6" aria-hidden="true" />
              </button>
            )}
          </div>

          <div className="flex justify-center pb-6 font-mono text-xs text-white/70">
            {active + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
};
