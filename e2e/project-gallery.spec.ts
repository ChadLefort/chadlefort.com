import { expect, test } from '@playwright/test';

test.describe('project gallery', () => {
  test('opens the gallery lightbox and navigates between images', async ({ page }) => {
    await page.goto('/projects/spear-dashboard');

    const imagesTab = page.getByRole('tab', { name: /screenshots/i });

    await expect
      .poll(async () => {
        await imagesTab.click();
        return imagesTab.getAttribute('aria-selected');
      })
      .toBe('true');

    const openButtons = page.getByRole('button', { name: /open screenshot:/i });
    await expect(openButtons.first()).toBeVisible();
    const imageCount = await openButtons.count();

    expect(imageCount).toBeGreaterThan(1);

    await openButtons.first().click();

    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByText(`1 / ${imageCount}`)).toBeVisible();

    await page.getByRole('button', { name: /next image/i }).click();
    await expect(page.getByText(`2 / ${imageCount}`)).toBeVisible();

    await page.keyboard.press('ArrowLeft');
    await expect(page.getByText(`1 / ${imageCount}`)).toBeVisible();

    await page.locator('button[slot="close"]:visible').click();
    await expect(page.getByRole('dialog')).toHaveCount(0);
  });

  test('keeps mobile screenshot controls compact on a short viewport', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await page.goto('/projects/spear-dashboard');

    const imagesTab = page.getByRole('tab', { name: /screenshots/i });

    await expect
      .poll(async () => {
        await imagesTab.click();
        return imagesTab.getAttribute('aria-selected');
      })
      .toBe('true');

    const openButtons = page.getByRole('button', { name: /open screenshot:/i });
    await expect(openButtons.first()).toBeVisible();
    const imageCount = await openButtons.count();

    await openButtons.first().click();

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('button', { name: /^zoom in$/i })).toBeHidden();
    await expect(dialog.getByRole('button', { name: /^zoom out$/i })).toBeHidden();

    const imageToggle = dialog.getByRole('button', { name: /zoom screenshot|reset screenshot zoom/i });
    await expect(imageToggle).toBeVisible();
    await expect(imageToggle).toHaveAttribute('aria-describedby', /zoom-description/);

    await imageToggle.click();
    await expect(imageToggle).toHaveAttribute('aria-pressed', 'true');

    if (imageCount > 1) {
      await dialog.getByRole('button', { name: /next image/i }).click();
      await expect(dialog.getByText(`2 / ${imageCount}`)).toBeVisible();
    }

    await dialog.locator('button[slot="close"]:visible').click();
    await expect(page.getByRole('dialog')).toHaveCount(0);
  });
});
