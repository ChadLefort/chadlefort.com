import type { TouchEvent as ReactTouchEvent, RefObject, Touch } from 'react';
import { BASE_ZOOM_LEVELS, MOBILE_ZOOM_LEVELS, SWIPE_THRESHOLD, SWIPE_VERTICAL_TOLERANCE } from './constants';
import type { GalleryImage, LightboxLayoutStyles, PinchAnchor, PinchState, SwipeState } from './types';

export const getTouchDistance = (touchA: Touch, touchB: Touch) =>
  Math.hypot(touchB.clientX - touchA.clientX, touchB.clientY - touchA.clientY);

export const getTouchMidpoint = (touchA: Touch, touchB: Touch) => ({
  x: (touchA.clientX + touchB.clientX) / 2,
  y: (touchA.clientY + touchB.clientY) / 2
});

const clampScroll = (value: number, max: number) => Math.min(Math.max(value, 0), Math.max(max, 0));

export const computePinchAnchor = (
  viewport: Pick<HTMLElement, 'scrollLeft' | 'scrollTop' | 'scrollWidth' | 'scrollHeight' | 'getBoundingClientRect'>,
  contentRect: Pick<DOMRect, 'left' | 'top'>,
  midpoint: { x: number; y: number }
): PinchAnchor => {
  const viewportRect = viewport.getBoundingClientRect();
  const localX = midpoint.x - viewportRect.left;
  const localY = midpoint.y - viewportRect.top;

  return {
    localX,
    localY,
    contentX: viewport.scrollLeft + midpoint.x - contentRect.left,
    contentY: viewport.scrollTop + midpoint.y - contentRect.top,
    scrollWidth: Math.max(viewport.scrollWidth, 1),
    scrollHeight: Math.max(viewport.scrollHeight, 1)
  };
};

export const computePinchScrollPosition = (
  anchor: PinchAnchor,
  viewport: Pick<HTMLElement, 'scrollWidth' | 'scrollHeight' | 'clientWidth' | 'clientHeight'>
) => ({
  scrollLeft: clampScroll(
    anchor.contentX * (viewport.scrollWidth / anchor.scrollWidth) - anchor.localX,
    viewport.scrollWidth - viewport.clientWidth
  ),
  scrollTop: clampScroll(
    anchor.contentY * (viewport.scrollHeight / anchor.scrollHeight) - anchor.localY,
    viewport.scrollHeight - viewport.clientHeight
  )
});

const isHorizontalSwipeGesture = (deltaX: number, deltaY: number) =>
  Math.abs(deltaX) >= SWIPE_THRESHOLD &&
  Math.abs(deltaY) <= SWIPE_VERTICAL_TOLERANCE &&
  Math.abs(deltaX) > Math.abs(deltaY);

export const endPinchTouchGesture = (
  event: ReactTouchEvent<HTMLButtonElement>,
  pinchStateRef: RefObject<PinchState | null>,
  swipeStartRef: RefObject<SwipeState | null>
) => {
  if (!pinchStateRef.current) return false;

  if (event.touches.length < 2) {
    pinchStateRef.current = null;
  }

  swipeStartRef.current = null;
  return true;
};

export const handleSwipeTouchEnd = (
  event: ReactTouchEvent<HTMLButtonElement>,
  swipeStartRef: RefObject<SwipeState | null>,
  suppressImageToggleRef: RefObject<boolean>,
  isSwipeBlocked: () => boolean,
  next: () => void,
  prev: () => void
) => {
  const swipeStart = swipeStartRef.current;
  if (!swipeStart) return;

  const touch = event.changedTouches[0];
  swipeStartRef.current = null;
  if (!touch) return;

  const deltaX = touch.clientX - swipeStart.x;
  const deltaY = touch.clientY - swipeStart.y;
  if (!isHorizontalSwipeGesture(deltaX, deltaY) || isSwipeBlocked()) return;

  suppressImageToggleRef.current = true;

  if (deltaX < 0) {
    next();
    return;
  }

  prev();
};

export const getClosestZoomIndex = (zoomLevels: number[], targetZoom: number) => {
  if (!zoomLevels.length) return 0;

  return zoomLevels.reduce(
    (closestIndex, zoomLevel, index) =>
      Math.abs(zoomLevel - targetZoom) < Math.abs(zoomLevels[closestIndex] - targetZoom) ? index : closestIndex,
    0
  );
};

const getLightboxBaseFitWidth = (image: GalleryImage) => {
  const aspect = image.width / image.height;

  if (image.device === 'mobile') {
    return `min(100%, 28rem, calc((100svh - 9rem) * ${aspect}), ${image.width}px)`;
  }

  return `min(calc(100svw - clamp(3rem, 10vw, 10rem)), calc((100svh - 8rem) * ${aspect}), ${image.width}px)`;
};

const getLightboxFrameWidth = (image: GalleryImage, zoomLevel: number) => {
  if (image.device === 'mobile') {
    return `min(calc((100svw - 1.5rem) * ${zoomLevel}), ${image.width}px)`;
  }

  return `min(calc((100svw - clamp(3rem, 10vw, 10rem)) * ${zoomLevel}), ${image.width}px)`;
};

export const getLightboxLayoutStyles = (
  image: GalleryImage,
  zoomLevel: number,
  zoomed: boolean,
  smoothLayout = false
): LightboxLayoutStyles => {
  const transformOrigin = '0 0';
  const layoutTransition = smoothLayout ? 'width 520ms var(--motion-ease-out)' : undefined;

  if (!zoomed) {
    const fitWidth = getLightboxBaseFitWidth(image);

    return {
      frame: image.device === 'mobile' ? { width: fitWidth, transition: layoutTransition } : undefined,
      image: {
        width: image.device === 'mobile' ? fitWidth : undefined,
        height: 'auto',
        transform: 'scale(1)',
        transformOrigin,
        transition: layoutTransition
      }
    };
  }

  const zoomWidth = getLightboxFrameWidth(image, zoomLevel);

  return {
    frame: { width: zoomWidth, transition: layoutTransition },
    image: {
      width: zoomWidth,
      height: 'auto',
      transform: 'scale(1)',
      transformOrigin,
      transition: layoutTransition
    }
  };
};

export const getZoomLevelsForImage = (image: GalleryImage | undefined) => {
  if (!image) return [1];

  const baseLevels = image.device === 'mobile' ? MOBILE_ZOOM_LEVELS : BASE_ZOOM_LEVELS;

  return Array.from(
    new Set([1, ...baseLevels, image.initialZoom].filter((level): level is number => Boolean(level)))
  ).toSorted((a, b) => a - b);
};

export const getDefaultZoomIndex = (image: GalleryImage | undefined, zoomLevels: number[]) => {
  const initialZoom = image?.initialZoom;
  if (!initialZoom) return 0;

  const matchedIndex = zoomLevels.findIndex((level) => level >= initialZoom);

  return matchedIndex === -1 ? zoomLevels.length - 1 : matchedIndex;
};
