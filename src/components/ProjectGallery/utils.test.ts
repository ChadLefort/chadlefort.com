import { describe, expect, it } from 'vitest';
import type { GalleryImage } from './types';
import {
  computePinchAnchor,
  computePinchScrollPosition,
  getClickZoomIndex,
  getLightboxLayoutStyles,
  getZoomLevelsForImage
} from './utils';

const desktopImage: GalleryImage = {
  src: '/desktop.webp',
  fullAvif: '/desktop.avif',
  thumbSrc: '/desktop-thumb.webp',
  thumbAvif: '/desktop-thumb.avif',
  thumbWebp: '/desktop-thumb.webp',
  thumbSizes: '50vw',
  alt: 'Desktop',
  device: 'desktop',
  orientation: 'landscape',
  width: 1600,
  height: 900
};

describe('getLightboxLayoutStyles', () => {
  it('sizes desktop screenshots to fit the viewport at 100%', () => {
    const styles = getLightboxLayoutStyles(desktopImage, 1, false);

    expect(styles.frame?.width).toContain('100svw');
    expect(styles.frame?.width).toContain('100dvh');
    expect(styles.frame?.width).toContain('var(--lightbox-chrome)');
    expect(styles.image.width).toBe(styles.frame?.width);
  });

  it('scales zoomed width from the fitted base size so each step can grow', () => {
    const fit = getLightboxLayoutStyles(desktopImage, 1, false);
    const zoomed = getLightboxLayoutStyles(desktopImage, 2, true);

    expect(zoomed.frame?.width).toBe(`calc(${fit.frame?.width} * 2)`);
  });

  it('caps zoom levels at the device max', () => {
    expect(getZoomLevelsForImage(desktopImage).at(-1)).toBe(4);
    expect(getZoomLevelsForImage({ ...desktopImage, device: 'mobile' }).at(-1)).toBe(8);
  });

  it('resolves click-zoom targets for each device', () => {
    const desktopLevels = getZoomLevelsForImage(desktopImage);
    const mobileLevels = getZoomLevelsForImage({ ...desktopImage, device: 'mobile' });

    expect(desktopLevels[getClickZoomIndex(desktopImage, desktopLevels)]).toBe(2);
    expect(mobileLevels[getClickZoomIndex({ ...desktopImage, device: 'mobile' }, mobileLevels)]).toBe(8);
  });

  it('uses a distinct mobile zoom ramp with wider high-end steps', () => {
    const mobileLevels = getZoomLevelsForImage({ ...desktopImage, device: 'mobile' });

    expect(mobileLevels).toEqual([1, 1.2, 1.4, 1.6, 1.8, 2, 2.5, 3, 3.5, 4, 5, 6.5, 8]);
    expect(mobileLevels).not.toEqual(getZoomLevelsForImage(desktopImage));
  });

  it('keeps zooming narrow mobile screenshots past native asset width', () => {
    const mobileImage: GalleryImage = {
      ...desktopImage,
      device: 'mobile',
      orientation: 'portrait',
      width: 497,
      height: 8379
    };
    const zoomed = getLightboxLayoutStyles(mobileImage, 3, true);

    expect(zoomed.frame?.width).toMatch(/^calc\(min\(.+ \* 3\)$/);
  });
});

describe('pinch scroll helpers', () => {
  it('keeps the pinch point stable when scroll dimensions scale uniformly', () => {
    const viewport = {
      scrollLeft: 205,
      scrollTop: 120,
      scrollWidth: 800,
      scrollHeight: 1200,
      clientWidth: 390,
      clientHeight: 700,
      getBoundingClientRect: () => ({
        x: 0,
        y: 0,
        left: 0,
        top: 0,
        right: 390,
        bottom: 700,
        width: 390,
        height: 700,
        toJSON: () => ({})
      })
    };

    const anchor = computePinchAnchor(viewport, { left: 12, top: 24 }, { x: 150, y: 200 });

    const nextScroll = computePinchScrollPosition(anchor, {
      scrollWidth: 640,
      scrollHeight: 960,
      clientWidth: 390,
      clientHeight: 700
    });

    expect(nextScroll.scrollLeft).toBeCloseTo(124.4, 1);
    expect(nextScroll.scrollTop).toBeCloseTo(36.8, 1);
  });

  it('centers pinch zoom when starting from an unzoomed viewport', () => {
    const viewport = {
      scrollLeft: 0,
      scrollTop: 0,
      scrollWidth: 390,
      scrollHeight: 700,
      clientWidth: 390,
      clientHeight: 700,
      getBoundingClientRect: () => ({
        x: 0,
        y: 0,
        left: 0,
        top: 0,
        right: 390,
        bottom: 700,
        width: 390,
        height: 700,
        toJSON: () => ({})
      })
    };

    const anchor = computePinchAnchor(viewport, { left: 45, top: 100 }, { x: 195, y: 350 });

    const nextScroll = computePinchScrollPosition(anchor, {
      scrollWidth: 780,
      scrollHeight: 1400,
      clientWidth: 390,
      clientHeight: 700
    });

    expect(nextScroll.scrollLeft).toBe(105);
    expect(nextScroll.scrollTop).toBe(150);
  });
});
