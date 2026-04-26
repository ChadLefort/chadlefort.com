import { expect, test } from '@playwright/test';

test.describe('home page', () => {
  test('loads with correct title and hero', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Chad Lefort/);
    await expect(page.getByRole('heading', { name: 'Chad Lefort', level: 1 })).toBeVisible();
  });

  test('download resume link points to pdf', async ({ page }) => {
    await page.goto('/');

    const link = page.getByRole('link', { name: /download resume/i });
    await expect(link).toHaveAttribute('href', '/chad-lefort-resume.pdf');
  });

  test('theme toggle persists across navigation', async ({ page }) => {
    await page.goto('/');

    const toggle = page
      .getByRole('button', { name: /turn on (light|dark) mode/i })
      .filter({ visible: true })
      .first();

    await toggle.click();
    await expect(page.locator('html')).not.toHaveClass(/\bdark\b/);

    await page
      .getByRole('link', { name: /projects/i })
      .filter({ visible: true })
      .first()
      .click();
    await expect(page).toHaveURL(/\/projects/);
    await expect(page.locator('html')).not.toHaveClass(/\bdark\b/);
  });

  test('copy email button replaces label', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/#contact');

    const btn = page.locator('[data-copy-email]');
    await btn.scrollIntoViewIfNeeded();
    await btn.click();
    await expect(page.locator('[data-copy-email-label]')).toHaveText('Copied!');
  });
});

test.describe('projects', () => {
  test('index lists projects', async ({ page }) => {
    await page.goto('/projects');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    const cards = page.getByRole('link', { name: /view/i });
    await expect(cards.first()).toBeVisible();
  });

  test('detail page switches between tabs with keyboard', async ({ page }) => {
    await page.goto('/projects/spear-dashboard');

    const descTab = page.getByRole('tab', { name: /description/i });
    const imagesTab = page.getByRole('tab', { name: /images/i });

    await expect(descTab).toHaveAttribute('aria-selected', 'true');

    await descTab.click();
    await descTab.press('ArrowRight');
    await expect(imagesTab).toHaveAttribute('aria-selected', 'true');
    await expect(imagesTab).toBeFocused();

    await imagesTab.press('Home');
    await expect(descTab).toHaveAttribute('aria-selected', 'true');
  });

  test('breadcrumb schema emitted', async ({ page }) => {
    await page.goto('/projects/spear-dashboard');

    const ld = await page.locator('script[type="application/ld+json"]').first().textContent();

    expect(ld).toBeTruthy();
    const graph = JSON.parse(ld!);
    const breadcrumb = graph.find((n: { '@type': string }) => n['@type'] === 'BreadcrumbList');
    expect(breadcrumb).toBeDefined();
  });
});

test.describe('agent-friendly endpoints', () => {
  test('llms.txt serves plain text', async ({ request }) => {
    const res = await request.get('/llms.txt');
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toContain('text/plain');
    const body = await res.text();
    expect(body).toContain('Chad Lefort');
    expect(body).toContain('## Experience');
  });

  test('resume.md serves markdown', async ({ request }) => {
    const res = await request.get('/resume.md');
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toContain('text/markdown');
    const body = await res.text();
    expect(body).toContain('# Chad Lefort');
  });

  test('llms-full.txt includes project content', async ({ request }) => {
    const res = await request.get('/llms-full.txt');
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toContain('Spear Dashboard');
  });

  test('manifest.webmanifest valid', async ({ request }) => {
    const res = await request.get('/manifest.webmanifest');
    expect(res.status()).toBe(200);
    const manifest = await res.json();
    expect(manifest.name).toBe('Chad Lefort - Senior Frontend Engineer');
    expect(manifest.icons).toHaveLength(3);
  });
});
