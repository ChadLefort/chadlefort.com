import { chromium } from '@playwright/test';

const run = async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('http://127.0.0.1:4325/', { waitUntil: 'networkidle' });
  await page.emulateMedia({ media: 'print' });

  const data = await page.evaluate(() => {
    const ol = document.querySelector('ol[aria-label="Employment history"]');
    if (!ol) return { error: 'no ol' };

    const rect = ol.getBoundingClientRect();
    const cs = getComputedStyle(ol);
    const beforeCs = getComputedStyle(ol, '::before');
    const firstLi = ol.firstElementChild;
    const liCs = firstLi ? getComputedStyle(firstLi) : null;
    const liBeforeCs = firstLi ? getComputedStyle(firstLi, '::before') : null;

    return {
      olRect: rect,
      olPosition: cs.position,
      olPadding: cs.padding,
      olOverflow: cs.overflow,
      beforeContent: beforeCs.content,
      beforeBackground: beforeCs.background,
      beforeBackgroundColor: beforeCs.backgroundColor,
      beforePosition: beforeCs.position,
      beforeTop: beforeCs.top,
      beforeBottom: beforeCs.bottom,
      beforeLeft: beforeCs.left,
      beforeWidth: beforeCs.width,
      beforeDisplay: beforeCs.display,
      beforeOpacity: beforeCs.opacity,
      beforeZindex: beforeCs.zIndex,
      liBeforeContent: liBeforeCs?.content,
      liBeforeBackground: liBeforeCs?.background
    };
  });

  console.log(JSON.stringify(data, null, 2));
  await browser.close();
};

void run();
