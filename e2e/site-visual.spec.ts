import { expect, type Page, test } from '@playwright/test';

const waitForStablePage = async (page: Page, path: string) => {
  await page.emulateMedia({ media: 'screen', reducedMotion: 'reduce' });
  await page.goto(path);
  await page.waitForLoadState('networkidle');
  await page.waitForFunction(() => document.fonts.status === 'loaded');
  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        requestAnimationFrame(() => resolve());
      })
  );
  await page.addStyleTag({ content: '[aria-label="Scroll to top"] { display: none !important; }' });
};

const maximizeTerminal = async (page: Page) => {
  await page.getByRole('button', { name: 'Maximize terminal (interactive shell)' }).click();
  await expect(page.getByText(/chadlefort\.com shell ready/i)).toBeVisible();
  const input = page.getByLabel('terminal input');
  await expect(input).toBeVisible();

  return input;
};

test.describe('screen visual regressions', () => {
  test.use({ viewport: { width: 1440, height: 1600 } });

  test('home hero intro matches snapshot', async ({ page }) => {
    await waitForStablePage(page, '/');

    await expect(page.getByTestId('hero-intro')).toHaveScreenshot('home-hero-intro.png');
  });

  test('home job experience matches snapshot', async ({ page }) => {
    await waitForStablePage(page, '/');

    const section = page.locator('#job-experience');
    await section.scrollIntoViewIfNeeded();
    await expect(section.getByText('Riverside Insights')).toBeVisible();

    await expect(section).toHaveScreenshot('home-job-experience-screen.png');
  });

  test('home skills matches snapshot', async ({ page }) => {
    await waitForStablePage(page, '/');

    const section = page.locator('#skills');
    await section.scrollIntoViewIfNeeded();
    await expect(section.getByText('TypeScript')).toBeVisible();

    await expect(section).toHaveScreenshot('home-skills-screen.png');
  });

  test('home education matches snapshot', async ({ page }) => {
    await waitForStablePage(page, '/');

    const section = page.locator('#education');
    await section.scrollIntoViewIfNeeded();
    await expect(section.getByText('Nicholls State University')).toBeVisible();

    await expect(section).toHaveScreenshot('home-education-screen.png');
  });

  test('home about matches snapshot', async ({ page }) => {
    await waitForStablePage(page, '/');

    const section = page.locator('#about-me');
    await section.scrollIntoViewIfNeeded();
    await expect(section.getByText(/technology enthusiast/i)).toBeVisible();

    await expect(section).toHaveScreenshot('home-about-screen.png');
  });

  test('home contact matches snapshot', async ({ page }) => {
    await waitForStablePage(page, '/');

    const section = page.locator('#contact');
    await section.scrollIntoViewIfNeeded();
    await expect(section.getByText(/have questions or a job opportunity/i)).toBeVisible();

    await expect(section).toHaveScreenshot('home-contact-screen.png');
  });

  test('home terminal frame matches snapshot', async ({ page }) => {
    await waitForStablePage(page, '/');

    const terminal = page.getByLabel('Terminal', { exact: true });
    await expect(terminal).toBeVisible();
    await expect(terminal.getByText('clefort').first()).toBeVisible();

    await expect(terminal).toHaveScreenshot('home-terminal-frame-screen.png', {
      mask: [terminal.getByTestId('status-time')]
    });
  });

  test('home full page matches snapshot', async ({ page }) => {
    await waitForStablePage(page, '/');

    await expect(page).toHaveScreenshot('home-full-page.png', {
      fullPage: true,
      mask: [page.getByTestId('status-time')]
    });
  });

  test('terminal neofetch matches snapshot', async ({ page }) => {
    await waitForStablePage(page, '/');

    const input = await maximizeTerminal(page);
    await input.fill('neofetch');
    await page.keyboard.press('Enter');

    const terminal = page.getByLabel('Terminal', { exact: true });
    const neofetchPre = terminal.locator('pre').filter({ hasText: 'chad@chadlefort.com' });
    await expect(neofetchPre).toBeVisible();

    await expect(neofetchPre.locator('..').locator('..')).toHaveScreenshot('terminal-neofetch-screen.png', {
      mask: [terminal.getByTestId('status-time')]
    });
  });

  test('projects index hero matches snapshot', async ({ page }) => {
    await waitForStablePage(page, '/projects');

    const hero = page.locator('section').first();
    await expect(hero.getByRole('heading', { name: 'Projects' })).toBeVisible();

    await expect(hero).toHaveScreenshot('projects-index-hero-screen.png');
  });

  test('projects index matches snapshot', async ({ page }) => {
    await waitForStablePage(page, '/projects');

    const section = page.locator('#all-projects');
    await section.scrollIntoViewIfNeeded();
    await expect(section.getByText('Spear Dashboard')).toBeVisible();

    await expect(section).toHaveScreenshot('projects-index-screen.png');
  });

  test('project detail hero matches snapshot', async ({ page }) => {
    await waitForStablePage(page, '/projects/spear-dashboard');

    await expect(page.getByTestId('project-hero')).toHaveScreenshot('project-detail-hero-screen.png');
  });

  test('project detail description matches snapshot', async ({ page }) => {
    await waitForStablePage(page, '/projects/spear-dashboard');

    const body = page.locator('article > section').nth(1);
    await expect(body.getByRole('tab', { name: /description/i })).toBeVisible();

    await expect(body).toHaveScreenshot('project-detail-description-screen.png');
  });

  test('project detail images tab matches snapshot', async ({ page }) => {
    await waitForStablePage(page, '/projects/spear-dashboard');

    const body = page.locator('article > section').nth(1);
    const imagesTab = body.getByRole('tab', { name: /images/i });

    await imagesTab.click();
    await expect(imagesTab).toHaveAttribute('aria-selected', 'true');

    const firstImage = body.locator('img').first();
    await expect(firstImage).toBeVisible();

    await expect(body).toHaveScreenshot('project-detail-images-screen.png');
  });

  test('project detail full page matches snapshot', async ({ page }) => {
    await waitForStablePage(page, '/projects/spear-dashboard');

    await expect(page).toHaveScreenshot('project-detail-full-page-screen.png', {
      fullPage: true,
      mask: [page.getByTestId('status-time')]
    });
  });

  test('404 page matches snapshot', async ({ page }) => {
    await waitForStablePage(page, '/nonexistent');

    await expect(page.locator('section')).toHaveScreenshot('404-screen.png');
  });
});
