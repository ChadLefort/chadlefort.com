import { expect, type Page, test } from '@playwright/test';
import { maximizeTerminal, terminalLocator, waitForTerminalReady } from './helpers/terminal';

test.describe.configure({ mode: 'serial' });

const expectScrollLocked = async (page: Page) => {
  await expect.poll(() => page.evaluate(() => document.documentElement.style.overflow)).toBe('hidden');
};

test.describe('terminal', () => {
  test('demo body renders with prompt arrow on home', async ({ page }) => {
    await waitForTerminalReady(page);
  });

  test('maximize unlocks interactive shell + welcome banner', async ({ page }) => {
    await maximizeTerminal(page);
  });

  test('whoami prints chad with title', async ({ page }) => {
    const input = await maximizeTerminal(page);

    await input.click();
    await input.fill('whoami');
    await page.keyboard.press('Enter');

    await expect(page.getByText(/Senior Frontend Engineer from Mandeville, LA/i)).toBeVisible();
  });

  test('keyboard-only command flow keeps focus and supports clearing output', async ({ page }) => {
    const input = await maximizeTerminal(page);

    await expect(input).toBeFocused();
    await page.keyboard.type('help');
    await page.keyboard.press('Enter');

    await expect(page.getByText('commands:')).toBeVisible();
    await expect(input).toBeFocused();

    await page.keyboard.type('clear');
    await page.keyboard.press('Enter');

    await expect(page.getByText('commands:')).toHaveCount(0);
    await expect(input).toBeFocused();
  });

  test('minimize from maximized restores body scroll', async ({ page }) => {
    await maximizeTerminal(page);
    await expectScrollLocked(page);

    await page.getByRole('button', { name: 'Minimize terminal' }).click();
    await expect.poll(() => page.evaluate(() => document.documentElement.style.overflow)).toBe('');
  });

  test('close from maximized exits maximize, does not hide terminal', async ({ page }) => {
    await maximizeTerminal(page);
    await expectScrollLocked(page);

    await page.getByRole('button', { name: 'Close terminal' }).click();

    await expect.poll(() => page.evaluate(() => document.documentElement.style.overflow)).toBe('');
    await expect(terminalLocator(page)).toBeVisible();
  });
});

test.describe('terminal · mobile viewport', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('renders without horizontal overflow', async ({ page }) => {
    await waitForTerminalReady(page);

    const overflow = await page.evaluate(() => ({
      doc: document.documentElement.scrollWidth,
      win: window.innerWidth
    }));

    expect(overflow.doc).toBeLessThanOrEqual(overflow.win + 1);
  });

  test('tab labels do not wrap to multiple lines', async ({ page }) => {
    await page.goto('/');

    const tabHeights = await page.evaluate(() => {
      const heights: number[] = [];

      for (const el of document.querySelectorAll<HTMLElement>('[aria-label="Terminal" i] [class*="rounded-t-xl"]')) {
        const h = el.getBoundingClientRect().height;
        if (h > 0) heights.push(h);
      }

      return heights;
    });

    expect(tabHeights.length).toBeGreaterThan(0);
    const min = Math.min(...tabHeights);
    const max = Math.max(...tabHeights);

    // Tabs should be within 2px of each other (allow sub-pixel rounding).
    expect(max - min).toBeLessThanOrEqual(2);
  });

  test('maximize still unlocks shell on mobile', async ({ page }) => {
    await maximizeTerminal(page);
  });
});
