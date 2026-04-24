import { chromium, devices } from '@playwright/test';

const run = async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext(devices['iPhone 13']);
  const page = await context.newPage();

  await page.goto('http://127.0.0.1:4325/', { waitUntil: 'networkidle' });

  for (const y of [0, 800, 1800, 3000, 4200]) {
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await page.waitForTimeout(200);
    await page.screenshot({ path: `/tmp/mobile-${y}.png` });
  }

  await browser.close();
};

void run();
