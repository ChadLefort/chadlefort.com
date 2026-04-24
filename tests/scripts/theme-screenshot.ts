import { chromium } from '@playwright/test';

const run = async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();

  await page.goto('http://127.0.0.1:4321/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(4500); // wait for typing animation
  await page.screenshot({ path: '/tmp/term-dark.png', fullPage: false });

  await page.evaluate(() => {
    localStorage.setItem('theme', 'light');
    document.documentElement.classList.remove('dark');
  });
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(4500);
  await page.screenshot({ path: '/tmp/term-light.png', fullPage: false });

  await browser.close();
};

void run();
