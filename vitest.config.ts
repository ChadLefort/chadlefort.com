import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    root: './',
    include: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./setup-test-env.ts'],
    exclude: ['node_modules', '.cache', './public']
  }
});
