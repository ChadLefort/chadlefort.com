import type { TouchEvent as ReactTouchEvent, RefObject, Touch } from 'react';
import {
  BASE_ZOOM_LEVELS,
  DESKTOP_CLICK_ZOOM,
  MAX_DESKTOP_ZOOM,
  MAX_MOBILE_ZOOM,
  MOBILE_CLICK_ZOOM,
  MOBILE_ZOOM_LEVELS,
  SWIPE_THRESHOLD,
  SWIPE_VERTICAL_TOLERANCE
} from './constants';
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
  const viewportWidth = image.device === 'mobile' ? 'calc(100svw - 1rem)' : 'calc(100svw - clamp(3rem, 10vw, 10rem))';
  const viewportHeight = 'calc(100dvh - var(--lightbox-chrome))';

  return `min(${viewportWidth}, calc(${viewportHeight} * ${aspect}), ${image.width}px)`;
};

const getLightboxFrameWidth = (image: GalleryImage, zoomLevel: number) => {
  const fitWidth = getLightboxBaseFitWidth(image);

  if (zoomLevel === 1) return fitWidth;

  return `calc(${fitWidth} * ${zoomLevel})`;
};

export const getLightboxLayoutStyles = (
  image: GalleryImage,
  zoomLevel: number,
  zoomed: boolean,
  smoothLayout = false
): LightboxLayoutStyles => {
  const transformOrigin = zoomed ? 'center center' : 'top left';
  const layoutTransition = smoothLayout ? 'width 520ms var(--motion-ease-out)' : undefined;

  if (!zoomed) {
    const fitWidth = getLightboxBaseFitWidth(image);

    return {
      frame: { width: fitWidth, transition: layoutTransition },
      image: {
        width: fitWidth,
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

const getMaxZoomLevel = (image: GalleryImage) => (image.device === 'mobile' ? MAX_MOBILE_ZOOM : MAX_DESKTOP_ZOOM);

export const getZoomLevelsForImage = (image: GalleryImage | undefined) => {
  if (!image) return [1];

  const maxZoom = getMaxZoomLevel(image);
  const baseLevels = image.device === 'mobile' ? MOBILE_ZOOM_LEVELS : BASE_ZOOM_LEVELS;

  return Array.from(
    new Set(
      [1, ...baseLevels, image.initialZoom].filter(
        (level): level is number => typeof level === 'number' && level > 0 && level <= maxZoom
      )
    )
  ).toSorted((a, b) => a - b);
};

const getClickZoomLevel = (image: GalleryImage) => (image.device === 'mobile' ? MOBILE_CLICK_ZOOM : DESKTOP_CLICK_ZOOM);

export const getClickZoomIndex = (image: GalleryImage, zoomLevels: number[]) => {
  const target = getClickZoomLevel(image);
  const matchedIndex = zoomLevels.indexOf(target);

  return matchedIndex === -1 ? getClosestZoomIndex(zoomLevels, target) : matchedIndex;
};

export const getDefaultZoomIndex = (image: GalleryImage | undefined, zoomLevels: number[]) => {
  const initialZoom = image?.initialZoom;
  if (!initialZoom) return 0;

  const matchedIndex = zoomLevels.findIndex((level) => level >= initialZoom);

  return matchedIndex === -1 ? zoomLevels.length - 1 : matchedIndex;
};
