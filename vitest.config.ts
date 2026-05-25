import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import type { ViteUserConfig } from 'vitest/config';
import { defineConfig } from 'vitest/config';

type VitestPlugins = NonNullable<ViteUserConfig['plugins']>;

const rootDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()] as unknown as VitestPlugins,
  resolve: {
    alias: {
      '~': resolve(rootDir, 'src'),
      'astro:transitions/client': resolve(rootDir, 'src/test/astro-transitions-client.ts')
    }
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['**/node_modules/**', '**/dist/**', 'e2e/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/components/**/*.{ts,tsx}'],
      exclude: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}']
    }
  }
});
