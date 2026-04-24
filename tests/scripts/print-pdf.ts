import { chromium } from '@playwright/test';

const run = async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('http://127.0.0.1:4325/', { waitUntil: 'networkidle' });
  await page.emulateMedia({ media: 'print' });
  await page.pdf({
    path: '/tmp/resume-print.pdf',
    format: 'Letter',
    margin: { top: '0.4in', right: '0.45in', bottom: '0.4in', left: '0.45in' },
    printBackground: true,
    preferCSSPageSize: true
  });

  await browser.close();
};

void run();
