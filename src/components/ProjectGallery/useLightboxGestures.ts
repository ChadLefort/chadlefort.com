import type { RefObject, Touch } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { PinchState, SwipeState, TouchHandler } from './types';
import { endPinchTouchGesture, getTouchDistance, handleSwipeTouchEnd } from './utils';

type Options = {
  imageCount: number;
  open: boolean;
  zoomed: boolean;
  zoomLevels: number[];
  maxZoomIndex: number;
  effectiveZoomLevel: number;
  viewportRef: RefObject<HTMLDivElement | null>;
  imageButtonRef: RefObject<HTMLButtonElement | null>;
  setContinuousPinchZoom: (level: number | null) => void;
  snapPinchZoom: () => void;
  rememberPinchAnchor: (touchA: Touch, touchB: Touch) => void;
  updatePinchTouchPoint: (touchA: Touch, touchB: Touch) => void;
  toggleImageZoom: () => void;
  next: () => void;
  prev: () => void;
};

// Owns pinch-to-zoom and swipe-to-navigate touch handling for the lightbox image
export const useLightboxGestures = ({
  imageCount,
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
}: Options) => {
  const [isPinching, setIsPinching] = useState(false);
  const swipeStartRef = useRef<SwipeState | null>(null);
  const pinchStateRef = useRef<PinchState | null>(null);
  const suppressImageToggleRef = useRef(false);

  const clearGestureState = useCallback(() => {
    swipeStartRef.current = null;
    pinchStateRef.current = null;
    snapPinchZoom();
    setIsPinching(false);
  }, [snapPinchZoom]);

  const isSwipeBlocked = useCallback(() => {
    if (!zoomed) return false;

    const viewport = viewportRef.current;
    if (!viewport) return false;

    return viewport.scrollWidth > viewport.clientWidth + 4;
  }, [viewportRef, zoomed]);

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

      if (event.touches.length !== 1 || imageCount <= 1) return;

      swipeStartRef.current = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY
      };
      suppressImageToggleRef.current = false;
    },
    [effectiveZoomLevel, imageCount, rememberPinchAnchor]
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
  }, [imageButtonRef, open]);

  return {
    isPinching,
    clearGestureState,
    handleImageTouchStart,
    handleImageTouchMove,
    handleImageTouchEnd,
    handleImageClick
  };
};
