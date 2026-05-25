import { describe, expect, it } from 'vitest';
import { getCardsTransformStyle } from '~/utils/aboutMeCardsEffect';

describe('getCardsTransformStyle', () => {
  it('keeps the active slide centered with no rotation', () => {
    const style = getCardsTransformStyle(0, 5, {
      dragging: false,
      dragToNext: false,
      slideIndex: 0,
      floorIndex: 0
    });

    expect(style.transform).toContain('rotateZ(0deg)');
    expect(style.transform).toContain('scale(1)');
    expect(style.zIndex).toBe(5);
    expect(style.shadowOpacity).toBe(0);
  });

  it('offsets stacked slides behind the active card', () => {
    const style = getCardsTransformStyle(1, 5, {
      dragging: false,
      dragToNext: false,
      slideIndex: 1,
      floorIndex: 0
    });

    expect(style.transform).toContain('rotateZ(-2deg)');
    expect(style.zIndex).toBe(4);
    expect(style.shadowOpacity).toBeGreaterThan(0);
  });

  it('applies swipe fan rotation while dragging forward', () => {
    const style = getCardsTransformStyle(0.5, 5, {
      dragging: true,
      dragToNext: true,
      slideIndex: 0,
      floorIndex: 0
    });

    expect(style.transform).toMatch(/rotateZ\(-\d+\.?\d*deg\)/);
    expect(style.transform).not.toContain('rotateZ(-1deg)');
  });

  it('applies swipe fan rotation while dragging backward', () => {
    const style = getCardsTransformStyle(-0.5, 5, {
      dragging: true,
      dragToNext: false,
      slideIndex: 1,
      floorIndex: 1
    });

    expect(style.transform).toMatch(/rotateZ\(\d+\.?\d*deg\)/);
  });

  it('skips swipe fan when drag is cancelled mid-gesture', () => {
    const style = getCardsTransformStyle(0.5, 5, {
      dragging: false,
      dragToNext: true,
      slideIndex: 0,
      floorIndex: 0
    });

    expect(style.transform).toContain('rotateZ(-1deg)');
  });
});
