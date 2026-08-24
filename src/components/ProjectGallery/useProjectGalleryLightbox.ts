import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { startViewTransition } from '~/utils/startViewTransition';
import type { GalleryImage, PinchAnchor } from './types';
import { useLightboxGestures } from './useLightboxGestures';
import { useLightboxZoom } from './useLightboxZoom';
import { usePinchViewportAnchor } from './usePinchViewportAnchor';
import { getLightboxLayoutStyles } from './utils';
import { clearGalleryThumbTransition, primeGalleryThumbTransition } from './viewTransition';

export const useProjectGalleryLightbox = (images: GalleryImage[]) => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const imageButtonRef = useRef<HTMLButtonElement>(null);
  const pinchAnchorRef = useRef<PinchAnchor | null>(null);

  const activeImage = images[active];

  const {
    zoomIndex,
    pinchZoomLevel,
    zoomLevels,
    maxZoomIndex,
    effectiveZoomLevel,
    zoomed,
    zoomLabel,
    canZoomIn,
    canZoomOut,
    setContinuousPinchZoom,
    snapPinchZoom,
    resetZoom,
    zoomIn,
    zoomOut,
    toggleImageZoom
  } = useLightboxZoom({ images, active, pinchAnchorRef });

  const { preserveViewportAnchor, rememberPinchAnchor, updatePinchTouchPoint } = usePinchViewportAnchor({
    open,
    zoomed,
    zoomIndex,
    pinchZoomLevel,
    viewportRef,
    imageButtonRef,
    pinchAnchorRef
  });

  const openAt = useCallback(
    (index: number) => {
      primeGalleryThumbTransition(index);

      startViewTransition(() => {
        setActive(index);
        resetZoom(index);
        setOpen(true);
        clearGalleryThumbTransition(index);
      });
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

  const {
    isPinching,
    clearGestureState,
    handleImageTouchStart,
    handleImageTouchMove,
    handleImageTouchEnd,
    handleImageClick
  } = useLightboxGestures({
    imageCount: images.length,
    open,
    zoomed,
    zoomLevels,
    maxZoomIndex,
    effectiveZoomLevel,
    viewportRef,
    imageButtonRef,
    setContinuousPinchZoom,
    snapPinchZoom,
    rememberPinchAnchor,
    updatePinchTouchPoint,
    toggleImageZoom,
    next,
    prev
  });

  const lightboxLayoutStyles = useMemo(() => {
    if (!activeImage) {
      return { image: { transform: 'scale(1)', transformOrigin: '0 0' } };
    }

    return getLightboxLayoutStyles(activeImage, effectiveZoomLevel, zoomed, !isPinching);
  }, [activeImage, effectiveZoomLevel, isPinching, zoomed]);

  const handleImageLoad = useCallback(() => {
    if (zoomed && !pinchAnchorRef.current) preserveViewportAnchor();
  }, [preserveViewportAnchor, zoomed]);

  const handleOpenChange = useCallback(
    (isOpen: boolean) => {
      if (isOpen) {
        setOpen(true);

        return;
      }

      const closingIndex = active;

      startViewTransition(
        () => {
          setOpen(false);
          resetZoom();
          primeGalleryThumbTransition(closingIndex);
        },
        () => clearGalleryThumbTransition(closingIndex)
      );
    },
    [active, resetZoom]
  );

  const handleOutsideImageClick = useCallback(() => {
    handleOpenChange(false);
  }, [handleOpenChange]);

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
    isPinching,
    lightboxLayoutStyles
  };
};
