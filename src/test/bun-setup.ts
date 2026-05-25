/// <reference types="bun-types" />

import { afterEach, expect, mock } from 'bun:test';
import { Window } from 'happy-dom';

(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

const window = new Window({ url: 'http://localhost/' }) as unknown as Window & typeof globalThis;

Object.assign(window, {
  Error,
  SyntaxError,
  TypeError,
  RangeError,
  ReferenceError
});

Object.assign(globalThis, {
  window,
  document: window.document,
  navigator: window.navigator,
  location: window.location,
  localStorage: window.localStorage,
  sessionStorage: window.sessionStorage,
  HTMLElement: window.HTMLElement,
  HTMLImageElement: window.HTMLImageElement,
  HTMLButtonElement: window.HTMLButtonElement,
  HTMLDivElement: window.HTMLDivElement,
  Node: window.Node,
  Element: window.Element,
  Event: window.Event,
  EventTarget: window.EventTarget,
  KeyboardEvent: window.KeyboardEvent,
  MouseEvent: window.MouseEvent,
  TouchEvent: window.TouchEvent,
  CustomEvent: window.CustomEvent,
  DOMRect: window.DOMRect,
  MutationObserver: window.MutationObserver,
  ResizeObserver: window.ResizeObserver,
  getComputedStyle: window.getComputedStyle.bind(window),
  requestAnimationFrame: window.requestAnimationFrame.bind(window),
  cancelAnimationFrame: window.cancelAnimationFrame.bind(window)
});

for (const key of Object.getOwnPropertyNames(window)) {
  if (key in globalThis) continue;

  Object.defineProperty(globalThis, key, {
    configurable: true,
    get: () => window[key as keyof typeof window]
  });
}

mock.module('astro:transitions/client', () => ({
  navigate: () => Promise.resolve()
}));

const { cleanup } = await import('@testing-library/react');
const jestDomMatchers = await import('@testing-library/jest-dom/matchers');
const axeMatchers = await import('vitest-axe/matchers');

expect.extend({ ...jestDomMatchers, ...axeMatchers } as Parameters<typeof expect.extend>[0]);

afterEach(() => {
  cleanup();
  document.documentElement.className = '';
  document.documentElement.removeAttribute('data-theme');
  localStorage.clear();
});
