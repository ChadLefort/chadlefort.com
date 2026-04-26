import { expect, test } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

test.describe('terminal', () => {
  test('demo body renders with prompt arrow on home', async ({ page }) => {
    await page.goto('/');

    const terminal = page.getByLabel('Terminal', { exact: true });
    await expect(terminal).toBeVisible();
    await expect(terminal.getByText('clefort').first()).toBeVisible();
  });

  test('maximize unlocks interactive shell + welcome banner', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Maximize terminal (interactive shell)' }).click();

    await expect(page.getByText(/chadlefort\.com shell ready/i)).toBeVisible();
    await expect(page.getByLabel('terminal input')).toBeVisible();
  });

  test('whoami prints chad with title', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Maximize terminal (interactive shell)' }).click();

    const input = page.getByLabel('terminal input');
    await expect(input).toBeVisible();
    await input.click();
    await input.fill('whoami');
    await page.keyboard.press('Enter');

    await expect(page.getByText(/Senior Frontend Engineer from Mandeville, LA/i)).toBeVisible();
  });

  test('minimize from maximized restores body scroll', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Maximize terminal (interactive shell)' }).click();
    await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe('hidden');

    await page.getByRole('button', { name: 'Minimize terminal' }).click();
    await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe('');
  });

  test('close from maximized exits maximize, does not hide terminal', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Maximize terminal (interactive shell)' }).click();
    await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe('hidden');

    await page.getByRole('button', { name: 'Close terminal' }).click();

    await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe('');
    await expect(page.getByLabel('Terminal', { exact: true })).toBeVisible();
  });
});

test.describe('terminal · mobile viewport', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('renders without horizontal overflow', async ({ page }) => {
    await page.goto('/');

    const terminal = page.getByLabel('Terminal', { exact: true });
    await expect(terminal).toBeVisible();

    const overflow = await page.evaluate(() => ({
      doc: document.documentElement.scrollWidth,
      win: window.innerWidth
    }));

    expect(overflow.doc).toBeLessThanOrEqual(overflow.win + 1);
  });

  test('tab labels do not wrap to multiple lines', async ({ page }) => {
    await page.goto('/');

    const tabHeights = await page.evaluate(() =>
      [...document.querySelectorAll('[aria-label="Terminal" i] [class*="rounded-t-xl"]')]
        .map((el) => (el as HTMLElement).getBoundingClientRect().height)
        .filter((h) => h > 0)
    );

    expect(tabHeights.length).toBeGreaterThan(0);
    const min = Math.min(...tabHeights);
    const max = Math.max(...tabHeights);

    // Tabs should be within 2px of each other (allow sub-pixel rounding).
    expect(max - min).toBeLessThanOrEqual(2);
  });

  test('maximize still unlocks shell on mobile', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Maximize terminal (interactive shell)' }).click();

    await expect(page.getByText(/chadlefort\.com shell ready/i)).toBeVisible();
    await expect(page.getByLabel('terminal input')).toBeVisible();
  });
});
