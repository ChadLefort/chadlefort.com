import type { Page } from '@playwright/test';

const waitForSettledVisualPage = async (page: Page, path: string) => {
  await page.goto(path);
  await page.waitForLoadState('networkidle');
  await page.waitForFunction(() => document.fonts.status === 'loaded');
  await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => resolve())));
  await page.addStyleTag({ content: '[aria-label="Scroll to top"] { display: none !important; }' });
};

export const waitForStableScreenPage = async (page: Page, path: string) => {
  await page.emulateMedia({ media: 'screen', reducedMotion: 'reduce' });
  await waitForSettledVisualPage(page, path);
};

export const waitForStablePrintPage = async (page: Page, path: string) => {
  await page.emulateMedia({ media: 'print', colorScheme: 'light', reducedMotion: 'reduce' });
  await waitForSettledVisualPage(page, path);
};
