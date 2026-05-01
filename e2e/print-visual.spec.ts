import { expect, type Page, test } from '@playwright/test';
import { execSync } from 'child_process';
import dedent from 'dedent';
import { mkdtempSync, readdirSync, readFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

const hasBinary = (name: string): boolean => {
  try {
    execSync(`which ${name}`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
};

const waitForPrintPage = async (page: Page, path: string) => {
  await page.emulateMedia({ media: 'print', colorScheme: 'light', reducedMotion: 'reduce' });
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

const pdfToPng = (pdfPath: string): string => {
  if (!hasBinary('pdftoppm')) {
    throw new Error(dedent`
      pdftoppm is required for print visual regression tests.
      Install it locally:
        macOS:  brew install poppler
        Ubuntu: sudo apt-get install -y poppler-utils
      CI already installs it automatically.
    `);
  }

  const outDir = mkdtempSync(join(tmpdir(), 'print-snap-'));
  const prefix = join(outDir, 'page');
  execSync(`pdftoppm -png -r 150 "${pdfPath}" "${prefix}"`);

  const files = readdirSync(outDir)
    .filter((f) => f.endsWith('.png'))
    .sort();

  if (files.length === 1) {
    return join(outDir, files[0]);
  }

  const combined = join(outDir, 'combined.png');
  const inputs = files.map((f) => `"${join(outDir, f)}"`).join(' ');

  if (hasBinary('magick')) {
    execSync(`magick ${inputs} -append "${combined}"`);
  } else if (hasBinary('convert')) {
    execSync(`convert ${inputs} -append "${combined}"`);
  } else {
    throw new Error(dedent`
      ImageMagick is required for multi-page print snapshots.
      Install it locally:
        macOS:  brew install imagemagick
        Ubuntu: sudo apt-get install -y imagemagick
      CI already installs it automatically.
    `);
  }

  return combined;
};

test.describe('print visual regressions', () => {
  test.use({ viewport: { width: 794, height: 1123 } });

  test('print header matches snapshot', async ({ page }) => {
    await waitForPrintPage(page, '/');

    const header = page.locator('[data-print-only]');
    await expect(header).toBeVisible();

    await expect(header).toHaveScreenshot('print-header.png');
  });

  test('print job experience matches snapshot', async ({ page }) => {
    await waitForPrintPage(page, '/');

    const section = page.locator('#job-experience');
    await expect(section.getByText('Riverside Insights')).toBeVisible();

    await expect(section).toHaveScreenshot('print-job-experience.png');
  });

  test('print skills matches snapshot', async ({ page }) => {
    await waitForPrintPage(page, '/');

    const section = page.locator('#skills');
    await expect(section.getByText('TypeScript')).toBeVisible();

    await expect(section).toHaveScreenshot('print-skills.png');
  });

  test('print education matches snapshot', async ({ page }) => {
    await waitForPrintPage(page, '/');

    const section = page.locator('#education');
    await expect(section.getByText('Nicholls State University')).toBeVisible();

    await expect(section).toHaveScreenshot('print-education.png');
  });

  test('print full page matches snapshot', async ({ page }) => {
    await waitForPrintPage(page, '/');

    const tmpDir = mkdtempSync(join(tmpdir(), 'print-pdf-'));
    const pdfPath = join(tmpDir, 'print.pdf');

    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true
    });

    const pngPath = pdfToPng(pdfPath);
    const pngBuffer = readFileSync(pngPath);

    expect(pngBuffer).toMatchSnapshot('print-full-page.png', {
      threshold: 0.2,
      maxDiffPixels: 100
    });
  });
});
