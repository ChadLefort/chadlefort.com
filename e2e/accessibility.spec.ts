import { createRequire } from 'node:module';
import { expect, test } from '@playwright/test';

const require = createRequire(import.meta.url);
const axePath = require.resolve('axe-core/axe.min.js');

const routes = [
  '/',
  '/projects',
  '/projects/component-library',
  '/projects/cdocs%20go',
  '/projects/spear-dashboard',
  '/projects/spear-cart',
  '/projects/router-migration',
  '/projects/webpack-5-module-federation',
  '/projects/lerna-monorepo',
  '/404'
];

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
        // OKLCH/color-mix support is noisy in axe under Chromium. Contrast is covered by the computed-color test below.
        'color-contrast': { enabled: false }
      }
    });
  });
};

const contrastSamples = [
  'body',
  'main h1',
  'main h2',
  'main p',
  'header a',
  'header button',
  '.card',
  '.project-card',
  '.skill-badge',
  '.project-prose p',
  '.project-prose a'
];

const runContrastCheck = async (page: import('@playwright/test').Page) =>
  page.evaluate((selectors) => {
    type Rgba = { r: number; g: number; b: number; a: number };

    const parseRgb = (value: string): Rgba | null => {
      const match = value.match(/rgba?\(([^)]+)\)/);
      if (!match) return null;

      const [r, g, b, a = '1'] = match[1].split(',').map((part) => part.trim());

      return { r: Number(r), g: Number(g), b: Number(b), a: Number(a) };
    };

    const composite = (fg: Rgba, bg: Rgba): Rgba => {
      const a = fg.a + bg.a * (1 - fg.a);

      return {
        r: (fg.r * fg.a + bg.r * bg.a * (1 - fg.a)) / a,
        g: (fg.g * fg.a + bg.g * bg.a * (1 - fg.a)) / a,
        b: (fg.b * fg.a + bg.b * bg.a * (1 - fg.a)) / a,
        a
      };
    };

    const channel = (value: number) => {
      const srgb = value / 255;

      return srgb <= 0.03928 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4;
    };

    const luminance = (color: Rgba) =>
      0.2126 * channel(color.r) + 0.7152 * channel(color.g) + 0.0722 * channel(color.b);

    const ratio = (a: Rgba, b: Rgba) => {
      const lighter = Math.max(luminance(a), luminance(b));
      const darker = Math.min(luminance(a), luminance(b));

      return (lighter + 0.05) / (darker + 0.05);
    };

    const parseColor = (() => {
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 1;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });

      return (value: string): Rgba | null => {
        if (!value || value === 'transparent') return null;
        if (!ctx) return parseRgb(value);

        try {
          ctx.clearRect(0, 0, 1, 1);
          ctx.fillStyle = '#000000';
          ctx.fillStyle = value;
          ctx.fillRect(0, 0, 1, 1);
          const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;

          if (a === 0) return null;

          return { r, g, b, a: a / 255 };
        } catch {
          return parseRgb(value);
        }
      };
    })();

    const effectiveBackground = (element: Element) => {
      let node: Element | null = element;
      let background: Rgba = { r: 255, g: 255, b: 255, a: 1 };
      const layers: Rgba[] = [];

      while (node) {
        const color = parseColor(getComputedStyle(node).backgroundColor);

        if (color && color.a > 0) layers.push(color);
        node = node.parentElement;
      }

      for (const layer of layers.reverse()) background = composite(layer, background);

      return background;
    };

    return selectors.flatMap((selector) =>
      [...document.querySelectorAll(selector)].slice(0, 6).flatMap((element) => {
        const style = getComputedStyle(element);
        const color = parseColor(style.color);
        const text = element.textContent?.trim();

        if (!color || !text || style.visibility === 'hidden' || style.display === 'none') return [];

        const contrast = ratio(color, effectiveBackground(element));
        const fontSize = Number.parseFloat(style.fontSize);
        const fontWeight = Number.parseInt(style.fontWeight, 10);
        const threshold = fontSize >= 24 || (fontSize >= 18.66 && fontWeight >= 700) ? 3 : 4.5;

        return contrast + 0.01 >= threshold
          ? []
          : [{ selector, text: text.slice(0, 80), contrast: Number(contrast.toFixed(2)), threshold }];
      })
    );
  }, contrastSamples);

test.describe('page accessibility', () => {
  for (const route of routes) {
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

    test(`${route} meets sampled text contrast`, async ({ page }) => {
      await page.goto(route);
      await page.waitForLoadState('networkidle');

      const failures = await runContrastCheck(page);

      expect(failures).toEqual([]);
    });
  }
});
