// Tell React we're in an act-friendly test environment (required for React 19 + Vitest)
// https://react.dev/reference/react/act#troubleshooting
(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

import '@testing-library/jest-dom/vitest';
import 'vitest-axe/extend-expect';
import { cleanup } from '@testing-library/react';
import { afterEach, expect } from 'vitest';
import * as matchers from 'vitest-axe/matchers';

expect.extend(matchers);

afterEach(() => {
  cleanup();
  document.documentElement.className = '';
  document.documentElement.removeAttribute('data-theme');
  localStorage.clear();
});
