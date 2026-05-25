import { describe, expect, it } from 'vitest';
import { computePinchAnchor, computePinchScrollPosition } from './utils';

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
