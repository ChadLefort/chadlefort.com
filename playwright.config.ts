import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'list',
  expect: {
    toHaveScreenshot: {
      animations: 'disabled',
      caret: 'hide',
      scale: 'css',
      maxDiffPixels: 500
    }
  },
  use: {
    baseURL: 'http://127.0.0.1:4325',
    trace: 'on-first-retry',
    colorScheme: 'dark',
    locale: 'en-US',
    timezoneId: 'America/Chicago'
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'bun run build && bun run preview -- --port 4325 --host 127.0.0.1',
    url: 'http://127.0.0.1:4325',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000
  }
});
