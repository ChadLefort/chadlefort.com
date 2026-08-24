import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from 'lucide-react';
import type { FC } from 'react';
import { Dialog, Heading, Modal, ModalOverlay } from 'react-aria-components';
import { Button } from '~/components/Button';
import { IconButton } from '~/components/IconButton';
import {
  desktopLightboxHeader,
  lightboxContent,
  lightboxControls,
  lightboxImage,
  lightboxOverlay,
  lightboxToggle,
  lightboxViewport,
  mobileLightboxHeader,
  zoomButton,
  zoomValue
} from './styles';
import type { ProjectGalleryLightboxProps } from './types';
import { GALLERY_VIEW_TRANSITION } from './viewTransition';

const CloseButton: FC = () => (
  <IconButton
    slot="close"
    label="Close screenshots"
    icon={<X className="size-5" />}
    color="overlay"
    className="shrink-0"
  />
);

type ZoomControlsProps = Pick<
  ProjectGalleryLightboxProps,
  'canZoomIn' | 'canZoomOut' | 'onZoomIn' | 'onZoomOut' | 'zoomLabel'
>;

const ZoomControls: FC<ZoomControlsProps> = ({ canZoomIn, canZoomOut, onZoomIn, onZoomOut, zoomLabel }) => (
  <>
    <Button
      variant="ghost"
      color="overlay"
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
      color="overlay"
      size="sm"
      onPress={onZoomIn}
      isDisabled={!canZoomIn}
      className={zoomButton()}
    >
      <ZoomIn className="size-4" />
      Zoom in
    </Button>
  </>
);

type FooterNavProps = Pick<ProjectGalleryLightboxProps, 'active' | 'imagesLength' | 'onNext' | 'onPrev'>;

const FooterNav: FC<FooterNavProps> = ({ active, imagesLength, onNext, onPrev }) => (
  <div className="flex items-center justify-center gap-3 px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] sm:gap-4 sm:px-4 sm:pb-6">
    {imagesLength > 1 && (
      <IconButton label="Previous image" onPress={onPrev} icon={<ChevronLeft className="size-5" />} />
    )}
    <div className="flex flex-col items-center gap-1">
      <span className="text-overlay-muted font-mono text-xs">
        {active + 1} / {imagesLength}
      </span>
    </div>
    {imagesLength > 1 && <IconButton label="Next image" onPress={onNext} icon={<ChevronRight className="size-5" />} />}
  </div>
);

export const ProjectGalleryLightbox: FC<ProjectGalleryLightboxProps> = ({
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
  onOutsideImageClick,
  onPrev,
  onZoomIn,
  onZoomOut,
  open,
  title,
  viewportRef,
  zoomDescriptionId,
  zoomLabel,
  zoomed,
  isPinching,
  lightboxLayoutStyles
}) => (
  <ModalOverlay isOpen={open} onOpenChange={onOpenChange} isDismissable className={lightboxOverlay()}>
    <Modal className="flex h-dvh w-full flex-col outline-none [--lightbox-chrome:5.5rem] sm:h-svh sm:[--lightbox-chrome:8rem]">
      <Dialog className="flex min-h-0 flex-1 flex-col outline-none">
        <div className={mobileLightboxHeader()}>
          <Heading slot="title" className="font-display min-w-0 truncate text-lg">
            {title}
          </Heading>
          <CloseButton />
        </div>

        <div className={desktopLightboxHeader()}>
          <Heading slot="title" className="font-display text-xl">
            {title}
          </Heading>
          <div className={lightboxControls({ desktop: true })}>
            <ZoomControls
              canZoomIn={canZoomIn}
              canZoomOut={canZoomOut}
              onZoomIn={onZoomIn}
              onZoomOut={onZoomOut}
              zoomLabel={zoomLabel}
            />
            <CloseButton />
          </div>
        </div>

        <div className="relative flex min-h-0 min-w-0 flex-1 px-2 pb-1 sm:px-4 sm:pb-4">
          <div ref={viewportRef} className={lightboxViewport()} aria-live="polite">
            <div className={lightboxContent()}>
              <button
                type="button"
                onClick={onOutsideImageClick}
                className="absolute inset-0 z-0 cursor-default border-0 bg-transparent p-0"
                aria-label="Close screenshots"
              />
              <button
                ref={imageButtonRef}
                type="button"
                onClick={onImageClick}
                onTouchStart={onImageTouchStart}
                onTouchMove={onImageTouchMove}
                onTouchEnd={onImageTouchEnd}
                onTouchCancel={onImageTouchCancel}
                className={lightboxToggle({ zoomed, class: 'relative z-10 shrink-0' })}
                aria-label={zoomed ? 'Reset screenshot zoom' : 'Zoom screenshot'}
                aria-pressed={zoomed}
                aria-describedby={zoomDescriptionId}
              >
                <span id={zoomDescriptionId} className="sr-only">
                  Screenshot zoom is {zoomLabel}. Activate to {zoomed ? 'reset zoom' : 'zoom in'}. Use arrow keys to
                  move between screenshots.
                </span>
                <span
                  className="inline-block"
                  data-gallery-morph
                  style={{ ...lightboxLayoutStyles.frame, viewTransitionName: GALLERY_VIEW_TRANSITION }}
                >
                  <picture>
                    <source type="image/avif" srcSet={activeImage.fullAvif} />
                    <img
                      data-gallery-shot
                      src={activeImage.src}
                      alt={activeImage.alt.trim() || 'Project screenshot'}
                      onLoad={onImageLoad}
                      className={lightboxImage({ device: activeImage.device, zoomed, pinching: isPinching })}
                      style={{ ...lightboxLayoutStyles.image }}
                    />
                  </picture>
                </span>
              </button>
            </div>
          </div>
        </div>

        <FooterNav active={active} imagesLength={imagesLength} onNext={onNext} onPrev={onPrev} />
      </Dialog>
    </Modal>
  </ModalOverlay>
);
