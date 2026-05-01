// Tell React we're in an act-friendly test environment (required for React 19 + Vitest)
// https://react.dev/reference/react/act#troubleshooting
(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

import '@testing-library/jest-dom/vitest';
import 'vitest-axe/extend-expect';
import { cleanup } from '@testing-library/react';
import { afterEach, expect } from 'vitest';
import * as matchers from 'vitest-axe/matchers';

const mockCanvasContext = {
  canvas: document.createElement('canvas'),
  fillRect: () => {},
  clearRect: () => {},
  getImageData: () => ({ data: new Uint8ClampedArray(), width: 0, height: 0 }),
  putImageData: () => {},
  createImageData: () => ({ data: new Uint8ClampedArray(), width: 0, height: 0 }),
  setTransform: () => {},
  resetTransform: () => {},
  drawImage: () => {},
  save: () => {},
  restore: () => {},
  beginPath: () => {},
  moveTo: () => {},
  lineTo: () => {},
  closePath: () => {},
  stroke: () => {},
  translate: () => {},
  scale: () => {},
  rotate: () => {},
  arc: () => {},
  fill: () => {},
  measureText: () => ({ width: 0 }),
  transform: () => {},
  rect: () => {},
  clip: () => {},
  fillText: () => {}
};

expect.extend(matchers);

Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
  writable: true,
  value: () => mockCanvasContext
});

afterEach(() => {
  cleanup();
  document.documentElement.className = '';
  document.documentElement.removeAttribute('data-theme');
  localStorage.clear();
});
