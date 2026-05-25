import type { Touch } from 'react';
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { startViewTransition } from '~/utils/startViewTransition';
import type { GalleryImage, PinchAnchor, PinchState, SwipeState, TouchHandler } from './types';
import {
  computePinchAnchor,
  computePinchScrollPosition,
  endPinchTouchGesture,
  getClosestZoomIndex,
  getDefaultZoomIndex,
  getLightboxLayoutStyles,
  getTouchDistance,
  getTouchMidpoint,
  getZoomLevelsForImage,
  handleSwipeTouchEnd
} from './utils';
import { clearGalleryThumbTransition, primeGalleryThumbTransition } from './viewTransition';

export const useProjectGalleryLightbox = (images: GalleryImage[]) => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [zoomIndex, setZoomIndex] = useState(0);
  const [pinchZoomLevel, setPinchZoomLevel] = useState<number | null>(null);
  const [isPinching, setIsPinching] = useState(false);
  const pinchZoomLevelRef = useRef<number | null>(null);
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
  const steppedZoomLevel = zoomLevels[zoomIndex] ?? 1;
  const effectiveZoomLevel = pinchZoomLevel ?? steppedZoomLevel;
  const zoomed = zoomIndex > 0 || (pinchZoomLevel !== null && pinchZoomLevel > 1);
  const zoomLabel = `${Math.round(effectiveZoomLevel * 100)}%`;
  const canZoomIn = zoomIndex < maxZoomIndex;
  const canZoomOut = zoomIndex > 0;

  const lightboxLayoutStyles = useMemo(() => {
    if (!activeImage) {
      return { image: { transform: 'scale(1)', transformOrigin: '0 0' } };
    }

    return getLightboxLayoutStyles(activeImage, effectiveZoomLevel, zoomed, !isPinching);
  }, [activeImage, effectiveZoomLevel, isPinching, zoomed]);

  const setContinuousPinchZoom = useCallback((level: number | null) => {
    pinchZoomLevelRef.current = level;
    setPinchZoomLevel(level);
  }, []);

  const snapPinchZoom = useCallback(() => {
    const level = pinchZoomLevelRef.current;
    if (level !== null) {
      setZoomIndex(getClosestZoomIndex(zoomLevels, level));
    }
    pinchAnchorRef.current = null;
    setContinuousPinchZoom(null);
  }, [setContinuousPinchZoom, zoomLevels]);

  const resetZoom = useCallback(
    (imageIndex = active) => {
      const image = images[imageIndex];
      const levels = getZoomLevelsForImage(image);

      pinchAnchorRef.current = null;
      setContinuousPinchZoom(null);
      setZoomIndex(getDefaultZoomIndex(image, levels));
    },
    [active, images, setContinuousPinchZoom]
  );

  const zoomIn = useCallback(() => {
    pinchAnchorRef.current = null;
    setContinuousPinchZoom(null);
    setZoomIndex((value) => Math.min(value + 1, maxZoomIndex));
  }, [maxZoomIndex, setContinuousPinchZoom]);

  const zoomOut = useCallback(() => {
    pinchAnchorRef.current = null;
    setContinuousPinchZoom(null);
    setZoomIndex((value) => Math.max(value - 1, 0));
  }, [setContinuousPinchZoom]);

  const toggleImageZoom = useCallback(() => {
    pinchAnchorRef.current = null;
    setContinuousPinchZoom(null);
    setZoomIndex((value) => {
      if (value > 0) return 0;

      if (defaultZoomIndex > 0) return defaultZoomIndex;

      return Math.min(1, maxZoomIndex);
    });
  }, [defaultZoomIndex, maxZoomIndex, setContinuousPinchZoom]);

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

    const nextScroll = computePinchScrollPosition(anchor, viewport);
    viewport.scrollLeft = nextScroll.scrollLeft;
    viewport.scrollTop = nextScroll.scrollTop;
  }, []);

  const getPinchContentRect = useCallback(() => {
    const image = imageButtonRef.current?.querySelector('img');
    return image?.getBoundingClientRect() ?? imageButtonRef.current?.getBoundingClientRect();
  }, []);

  const updatePinchTouchPoint = useCallback((touchA: Touch, touchB: Touch) => {
    const viewport = viewportRef.current;
    const anchor = pinchAnchorRef.current;
    if (!viewport || !anchor) return;

    const viewportRect = viewport.getBoundingClientRect();
    const midpoint = getTouchMidpoint(touchA, touchB);
    anchor.localX = midpoint.x - viewportRect.left;
    anchor.localY = midpoint.y - viewportRect.top;
  }, []);

  const rememberPinchAnchor = useCallback(
    (touchA: Touch, touchB: Touch) => {
      const viewport = viewportRef.current;
      const contentRect = getPinchContentRect();
      if (!viewport || !contentRect) return;

      pinchAnchorRef.current = computePinchAnchor(viewport, contentRect, getTouchMidpoint(touchA, touchB));
    },
    [getPinchContentRect]
  );

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

  const clearGestureState = useCallback(() => {
    swipeStartRef.current = null;
    pinchStateRef.current = null;
    snapPinchZoom();
    setIsPinching(false);
  }, [snapPinchZoom]);

  const isSwipeBlocked = useCallback(() => {
    const viewport = viewportRef.current;

    if (!viewport) return false;

    return viewport.scrollWidth > viewport.clientWidth + 4;
  }, []);

  const handleImageTouchStart = useCallback<TouchHandler>(
    (event) => {
      if (event.touches.length >= 2) {
        setIsPinching(true);
        pinchStateRef.current = {
          distance: getTouchDistance(event.touches[0], event.touches[1]),
          zoomLevel: effectiveZoomLevel
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
    [effectiveZoomLevel, images.length, rememberPinchAnchor]
  );

  const handleImageTouchMove = useCallback<TouchHandler>(
    (event) => {
      const pinchState = pinchStateRef.current;

      if (!pinchState || event.touches.length < 2) return;

      updatePinchTouchPoint(event.touches[0], event.touches[1]);

      const nextDistance = getTouchDistance(event.touches[0], event.touches[1]);
      const scaledZoom = pinchState.zoomLevel * (nextDistance / pinchState.distance);
      const minZoomLevel = zoomLevels[0] ?? 1;
      const maxZoomLevel = zoomLevels[maxZoomIndex] ?? minZoomLevel;
      const clampedZoom = Math.min(maxZoomLevel, Math.max(minZoomLevel, scaledZoom));

      suppressImageToggleRef.current = true;
      event.preventDefault();
      setContinuousPinchZoom(clampedZoom);
    },
    [maxZoomIndex, setContinuousPinchZoom, updatePinchTouchPoint, zoomLevels]
  );

  const handleImageTouchEnd = useCallback<TouchHandler>(
    (event) => {
      if (endPinchTouchGesture(event, pinchStateRef, swipeStartRef)) {
        if (event.touches.length < 2) {
          snapPinchZoom();
          setIsPinching(false);
        }
        return;
      }

      handleSwipeTouchEnd(event, swipeStartRef, suppressImageToggleRef, isSwipeBlocked, next, prev);
    },
    [isSwipeBlocked, next, prev, snapPinchZoom]
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

  useLayoutEffect(() => {
    if (!open || pinchZoomLevel === null || !pinchAnchorRef.current) return;

    applyPinchAnchor();
  }, [applyPinchAnchor, open, pinchZoomLevel]);

  useLayoutEffect(() => {
    const shouldSettlePinchAnchor = open && zoomIndex >= 0 && pinchAnchorRef.current && pinchZoomLevel === null;
    if (!shouldSettlePinchAnchor) return;

    keepPinchAnchorStable();
  }, [keepPinchAnchorStable, open, pinchZoomLevel, zoomIndex]);

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
