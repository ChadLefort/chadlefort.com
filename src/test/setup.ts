import '@testing-library/jest-dom/vitest';
import 'vitest-axe/extend-expect';
import { afterEach, expect } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from 'vitest-axe/matchers';

expect.extend(matchers);

if (!window.matchMedia) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false
    })
  });
}

afterEach(() => {
  cleanup();
  document.documentElement.className = '';
  document.documentElement.removeAttribute('data-theme');
  localStorage.clear();
});
