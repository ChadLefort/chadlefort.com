import type { FocusEvent, KeyboardEvent, PointerEvent as ReactPointerEvent } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

const ABOUT_ME_AUTOPLAY_MS = 3200;
const ABOUT_ME_MOTION_STATE_MS = 240;
const ABOUT_ME_SWIPE_THRESHOLD = 0.25;

type DragState = {
  startX: number;
  startIndex: number;
  width: number;
  active: boolean;
};

export const useAboutMeCarousel = (slideCount: number, canAutoplay: boolean) => {
  const [index, setIndex] = useState(0);
  const [dragDelta, setDragDelta] = useState(0);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [focusStopped, setFocusStopped] = useState(false);
  const [animating, setAnimating] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragState | null>(null);

  const dragging = dragRef.current?.active ?? false;
  const dragToNext = dragDelta > 0;

  const position = slideCount <= 1 ? 0 : Math.min(Math.max(index + (dragging ? dragDelta : 0), 0), slideCount - 1);

  const floorIndex = Math.floor(position);
  const shouldAnimate = animating && !dragging;

  const advance = useCallback(() => {
    setAnimating(true);
    setIndex((current) => (current + 1) % slideCount);
  }, [slideCount]);

  useEffect(() => {
    if (!canAutoplay || hoverPaused || focusStopped) return;

    const timerId = window.setInterval(advance, ABOUT_ME_AUTOPLAY_MS);

    return () => window.clearInterval(timerId);
  }, [advance, canAutoplay, focusStopped, hoverPaused]);

  useEffect(() => {
    if (!animating) return;

    const timer = window.setTimeout(() => setAnimating(false), ABOUT_ME_MOTION_STATE_MS);
    return () => window.clearTimeout(timer);
  }, [animating]);

  const onPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (slideCount <= 1) return;

      const width = trackRef.current?.offsetWidth ?? 1;
      dragRef.current = { startX: event.clientX, startIndex: index, width, active: true };
      setDragDelta(0);
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [index, slideCount]
  );

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!dragRef.current?.active) return;

      const delta = (dragRef.current.startX - event.clientX) / dragRef.current.width;
      const maxForward = slideCount - 1 - dragRef.current.startIndex;
      const maxBack = dragRef.current.startIndex;
      setDragDelta(Math.min(Math.max(delta, -maxBack), maxForward));
    },
    [slideCount]
  );

  const finishDrag = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!dragRef.current?.active) return;

      const { startIndex, width, startX } = dragRef.current;
      const delta = (startX - event.clientX) / width;
      dragRef.current.active = false;

      let next = startIndex;
      if (delta >= ABOUT_ME_SWIPE_THRESHOLD && startIndex < slideCount - 1) next = startIndex + 1;
      else if (delta <= -ABOUT_ME_SWIPE_THRESHOLD && startIndex > 0) next = startIndex - 1;

      setDragDelta(0);
      if (next !== index) setAnimating(true);
      setIndex(next);

      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
    },
    [index, slideCount]
  );

  const cancelDrag = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragRef.current?.active) return;

    dragRef.current.active = false;
    setDragDelta(0);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }, []);

  const onBlurCapture = useCallback((event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
      setFocusStopped(false);
    }
  }, []);

  const goToIndex = useCallback(
    (nextIndex: number) => {
      if (slideCount <= 1) return;

      const clamped = Math.min(Math.max(nextIndex, 0), slideCount - 1);
      if (clamped !== index) setAnimating(true);
      setIndex(clamped);
    },
    [index, slideCount]
  );

  const goNext = useCallback(() => {
    goToIndex(index + 1);
  }, [goToIndex, index]);

  const goPrev = useCallback(() => {
    goToIndex(index - 1);
  }, [goToIndex, index]);

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (slideCount <= 1) return;

      switch (event.key) {
        case 'ArrowRight':
          event.preventDefault();
          goNext();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          goPrev();
          break;
        case 'Home':
          event.preventDefault();
          goToIndex(0);
          break;
        case 'End':
          event.preventDefault();
          goToIndex(slideCount - 1);
          break;
      }
    },
    [goNext, goPrev, goToIndex, slideCount]
  );

  return {
    trackRef,
    index,
    position,
    floorIndex,
    dragging,
    dragToNext,
    shouldAnimate,
    onPointerDown,
    onPointerMove,
    finishDrag,
    cancelDrag,
    setHoverPaused,
    setFocusStopped,
    onBlurCapture,
    goPrev,
    goNext,
    goToIndex,
    onKeyDown
  };
};
