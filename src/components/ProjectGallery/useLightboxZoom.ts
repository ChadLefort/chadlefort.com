import type { RefObject } from 'react';
import { useCallback, useMemo, useRef, useState } from 'react';
import type { GalleryImage, PinchAnchor } from './types';
import { getClickZoomIndex, getClosestZoomIndex, getDefaultZoomIndex, getZoomLevelsForImage } from './utils';

type Options = {
  images: GalleryImage[];
  active: number;
  pinchAnchorRef: RefObject<PinchAnchor | null>;
};

export const useLightboxZoom = ({ images, active, pinchAnchorRef }: Options) => {
  const [zoomIndex, setZoomIndex] = useState(0);
  const [pinchZoomLevel, setPinchZoomLevel] = useState<number | null>(null);
  const pinchZoomLevelRef = useRef<number | null>(null);

  const activeImage = images[active];
  const zoomLevels = useMemo(() => getZoomLevelsForImage(activeImage), [activeImage]);
  const maxZoomIndex = zoomLevels.length - 1;
  const steppedZoomLevel = zoomLevels[zoomIndex] ?? 1;
  const effectiveZoomLevel = pinchZoomLevel ?? steppedZoomLevel;
  const zoomed = zoomIndex > 0 || (pinchZoomLevel !== null && pinchZoomLevel > 1);
  const zoomLabel = `${Math.round(effectiveZoomLevel * 100)}%`;
  const canZoomIn = zoomIndex < maxZoomIndex;
  const canZoomOut = zoomIndex > 0;

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
  }, [pinchAnchorRef, setContinuousPinchZoom, zoomLevels]);

  const resetZoom = useCallback(
    (imageIndex = active) => {
      const image = images[imageIndex];
      const levels = getZoomLevelsForImage(image);

      pinchAnchorRef.current = null;
      setContinuousPinchZoom(null);
      setZoomIndex(getDefaultZoomIndex(image, levels));
    },
    [active, images, pinchAnchorRef, setContinuousPinchZoom]
  );

  const zoomIn = useCallback(() => {
    pinchAnchorRef.current = null;
    setContinuousPinchZoom(null);
    setZoomIndex((value) => Math.min(value + 1, maxZoomIndex));
  }, [maxZoomIndex, pinchAnchorRef, setContinuousPinchZoom]);

  const zoomOut = useCallback(() => {
    pinchAnchorRef.current = null;
    setContinuousPinchZoom(null);
    setZoomIndex((value) => Math.max(value - 1, 0));
  }, [pinchAnchorRef, setContinuousPinchZoom]);

  const toggleImageZoom = useCallback(() => {
    pinchAnchorRef.current = null;
    setContinuousPinchZoom(null);
    setZoomIndex((value) => {
      if (value > 0) return 0;

      if (!activeImage) return 0;

      return getClickZoomIndex(activeImage, zoomLevels);
    });
  }, [activeImage, pinchAnchorRef, setContinuousPinchZoom, zoomLevels]);

  return {
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
  };
};
