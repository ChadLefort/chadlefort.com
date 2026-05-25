import { Monitor, Smartphone } from 'lucide-react';
import type { FC } from 'react';
import { useEffect, useId, useRef } from 'react';
import { FIRST_GALLERY_EAGER_COUNT } from './constants';
import { GallerySection } from './GallerySection';
import { ProjectGalleryLightbox } from './ProjectGalleryLightbox';
import type { IndexedImage, ProjectGalleryProps } from './types';
import { useProjectGalleryLightbox } from './useProjectGalleryLightbox';

export const ProjectGallery: FC<ProjectGalleryProps> = ({ images, title, openRequest = 0 }) => {
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
    handleOutsideImageClick,
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
    lightboxLayoutStyles
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
            eagerCount={FIRST_GALLERY_EAGER_COUNT}
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
            eagerCount={desktopShots.length === 0 ? FIRST_GALLERY_EAGER_COUNT : 0}
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
        onOutsideImageClick={handleOutsideImageClick}
        onPrev={prev}
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        open={open}
        title={title}
        viewportRef={viewportRef}
        zoomDescriptionId={zoomDescriptionId}
        zoomLabel={zoomLabel}
        zoomed={zoomed}
        lightboxLayoutStyles={lightboxLayoutStyles}
      />
    </>
  );
};
