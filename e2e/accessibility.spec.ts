import { createRequire } from 'node:module';
import { expect, test } from '@playwright/test';

const require = createRequire(import.meta.url);
const axePath = require.resolve('axe-core/axe.min.js');

const runAxe = async (page: import('@playwright/test').Page) => {
  await page.addScriptTag({ path: axePath });

  return page.evaluate(async () => {
    const axe = (
      window as typeof window & {
        axe: {
          run: (
            context?: Document,
            options?: unknown
          ) => Promise<{ violations: Array<{ id: string; impact?: string; nodes: unknown[] }> }>;
        };
      }
    ).axe;

    return axe.run(document, {
      resultTypes: ['violations'],
      rules: {
        // Color contrast is covered by design-token review. Axe in Chromium can be noisy with OKLCH/color-mix tokens.
        'color-contrast': { enabled: false }
      }
    });
  });
};

test.describe('page accessibility', () => {
  for (const route of ['/', '/projects', '/projects/spear-dashboard']) {
    test(`${route} has no automated axe violations`, async ({ page }) => {
      await page.goto(route);
      await page.waitForLoadState('networkidle');

      if (route.includes('/projects/')) {
        const screenshotsTab = page.getByRole('tab', { name: /screenshots/i });
        if (await screenshotsTab.isVisible()) {
          await screenshotsTab.click();
        }
      }

      const results = await runAxe(page);

      expect(results.violations).toEqual([]);
    });
  }
});
