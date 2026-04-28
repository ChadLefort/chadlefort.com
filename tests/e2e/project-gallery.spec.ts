import { expect, test } from '@playwright/test';

test.describe('project gallery', () => {
  test('opens the gallery lightbox and navigates between images', async ({ page }) => {
    await page.goto('/projects/spear-dashboard');

    const imagesTab = page.getByRole('tab', { name: /images/i });

    await expect
      .poll(async () => {
        await imagesTab.click();
        return imagesTab.getAttribute('aria-selected');
      })
      .toBe('true');

    const openButtons = page.getByRole('button', { name: /open .* in lightbox/i });
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

    await page.getByRole('button', { name: /close gallery/i }).click();
    await expect(page.getByRole('dialog')).toHaveCount(0);
  });
});
