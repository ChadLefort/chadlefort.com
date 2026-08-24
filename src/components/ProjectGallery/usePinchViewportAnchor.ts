import type { RefObject, Touch } from 'react';
import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import type { PinchAnchor } from './types';
import { computePinchAnchor, computePinchScrollPosition, getTouchMidpoint } from './utils';

type Options = {
  open: boolean;
  zoomed: boolean;
  zoomIndex: number;
  pinchZoomLevel: number | null;
  viewportRef: RefObject<HTMLDivElement | null>;
  imageButtonRef: RefObject<HTMLButtonElement | null>;
  pinchAnchorRef: RefObject<PinchAnchor | null>;
};

// Keeps the scroll viewport anchored on the pinch midpoint (or center) while zoom layout settles
export const usePinchViewportAnchor = ({
  open,
  zoomed,
  zoomIndex,
  pinchZoomLevel,
  viewportRef,
  imageButtonRef,
  pinchAnchorRef
}: Options) => {
  const pinchAnchorFrameRef = useRef<number | null>(null);

  const preserveViewportAnchor = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const anchorX =
      viewport.scrollWidth > viewport.clientWidth
        ? (viewport.scrollLeft + viewport.clientWidth / 2) / viewport.scrollWidth
        : 0.5;
    const anchorY =
      viewport.scrollHeight > viewport.clientHeight
        ? (viewport.scrollTop + viewport.clientHeight / 2) / viewport.scrollHeight
        : 0.5;

    const apply = () => {
      const nextViewport = viewportRef.current;
      if (!nextViewport) return;

      const maxScrollLeft = nextViewport.scrollWidth - nextViewport.clientWidth;
      const maxScrollTop = nextViewport.scrollHeight - nextViewport.clientHeight;

      if (maxScrollLeft <= 0 && maxScrollTop <= 0) return;

      nextViewport.scrollLeft = Math.max(0, anchorX * nextViewport.scrollWidth - nextViewport.clientWidth / 2);
      nextViewport.scrollTop = Math.max(0, anchorY * nextViewport.scrollHeight - nextViewport.clientHeight / 2);
    };

    apply();
    window.requestAnimationFrame(apply);
  }, [viewportRef]);

  const applyPinchAnchor = useCallback(() => {
    const viewport = viewportRef.current;
    const anchor = pinchAnchorRef.current;
    if (!viewport || !anchor) return;

    const nextScroll = computePinchScrollPosition(anchor, viewport);
    viewport.scrollLeft = nextScroll.scrollLeft;
    viewport.scrollTop = nextScroll.scrollTop;
  }, [pinchAnchorRef, viewportRef]);

  const getPinchContentRect = useCallback(() => {
    const image = imageButtonRef.current?.querySelector('img');
    return image?.getBoundingClientRect() ?? imageButtonRef.current?.getBoundingClientRect();
  }, [imageButtonRef]);

  const updatePinchTouchPoint = useCallback(
    (touchA: Touch, touchB: Touch) => {
      const viewport = viewportRef.current;
      const anchor = pinchAnchorRef.current;
      if (!viewport || !anchor) return;

      const viewportRect = viewport.getBoundingClientRect();
      const midpoint = getTouchMidpoint(touchA, touchB);
      anchor.localX = midpoint.x - viewportRect.left;
      anchor.localY = midpoint.y - viewportRect.top;
    },
    [pinchAnchorRef, viewportRef]
  );

  const rememberPinchAnchor = useCallback(
    (touchA: Touch, touchB: Touch) => {
      const viewport = viewportRef.current;
      const contentRect = getPinchContentRect();
      if (!viewport || !contentRect) return;

      pinchAnchorRef.current = computePinchAnchor(viewport, contentRect, getTouchMidpoint(touchA, touchB));
    },
    [getPinchContentRect, pinchAnchorRef, viewportRef]
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
  }, [applyPinchAnchor, pinchAnchorRef]);

  useLayoutEffect(() => {
    if (!open || pinchZoomLevel === null || !pinchAnchorRef.current) return;

    applyPinchAnchor();
  }, [applyPinchAnchor, open, pinchAnchorRef, pinchZoomLevel]);

  useLayoutEffect(() => {
    const shouldSettlePinchAnchor = open && zoomIndex >= 0 && pinchAnchorRef.current && pinchZoomLevel === null;
    if (!shouldSettlePinchAnchor) return;

    keepPinchAnchorStable();
  }, [keepPinchAnchorStable, open, pinchAnchorRef, pinchZoomLevel, zoomIndex]);

  useLayoutEffect(() => {
    if (!open || !zoomed || pinchAnchorRef.current) return;

    preserveViewportAnchor();
  }, [open, pinchAnchorRef, preserveViewportAnchor, zoomed]);

  useEffect(() => {
    if (!open || !zoomed) return;

    const frame = imageButtonRef.current?.querySelector('[data-gallery-morph]');
    if (!frame) return;

    const onTransitionEnd = (event: Event) => {
      if (!(event instanceof TransitionEvent) || event.propertyName !== 'width' || pinchAnchorRef.current) return;

      preserveViewportAnchor();
    };

    frame.addEventListener('transitionend', onTransitionEnd);

    return () => frame.removeEventListener('transitionend', onTransitionEnd);
  }, [imageButtonRef, open, pinchAnchorRef, preserveViewportAnchor, zoomed]);

  useEffect(() => {
    return () => {
      if (pinchAnchorFrameRef.current !== null) {
        window.cancelAnimationFrame(pinchAnchorFrameRef.current);
      }
    };
  }, []);

  return {
    preserveViewportAnchor,
    rememberPinchAnchor,
    updatePinchTouchPoint
  };
};
