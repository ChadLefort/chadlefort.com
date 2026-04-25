import { execFileSync, spawn } from 'node:child_process';
import { readFile, mkdtemp, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const tempDir = await mkdtemp(path.join(os.tmpdir(), 'chad-brand-assets-'));

const portraitPath = path.join(rootDir, 'src', 'assets', 'me.png');
const resumePdfPath = path.join(publicDir, 'chad-lefort-resume.pdf');
const displayFontPath = path.join(publicDir, 'fonts', 'jetbrains-mono-latin-wght-normal.woff2');
const sansFontPath = path.join(publicDir, 'fonts', 'roboto-latin-wght-normal.woff2');
const resumePreviewBase = path.join(tempDir, 'resume-preview');
const resumePreviewPath = `${resumePreviewBase}.png`;

const run = (command, args) => {
  execFileSync(command, args, { stdio: 'inherit' });
};

const previewHost = '127.0.0.1';
const previewPort = 4326;
const previewUrl = `http://${previewHost}:${previewPort}/`;

// fallow-ignore-next-line complexity
const waitForServer = async (url, timeoutMs = 30_000) => {
  const start = Date.now();

  while (Date.now() - start < timeoutMs) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const response = await fetch(url);

      if (response.ok || response.status === 404) return;
    } catch {
      // keep polling
    }
    // eslint-disable-next-line no-await-in-loop
    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  throw new Error(`Preview server did not respond at ${url} within ${timeoutMs}ms`);
};

const generateResumePdf = async () => {
  const astroBin = path.join(rootDir, 'node_modules', '.bin', 'astro');

  run(astroBin, ['build']);

  const preview = spawn(astroBin, ['preview', '--host', previewHost, '--port', String(previewPort)], {
    cwd: rootDir,
    stdio: ['ignore', 'inherit', 'inherit'],
    detached: false
  });

  try {
    await waitForServer(previewUrl);

    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.goto(previewUrl, { waitUntil: 'networkidle' });
    await page.emulateMedia({ media: 'print' });
    await page
      .locator('.print-avatar')
      .evaluate(
        (img) =>
          img.complete && img.naturalWidth > 0
            ? null
            : new Promise((resolve) => {
                img.addEventListener('load', resolve, { once: true });
                img.addEventListener('error', resolve, { once: true });
              }),
        { timeout: 5000 }
      )
      .catch(() => undefined);
    await page.pdf({
      path: resumePdfPath,
      format: 'Letter',
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
      printBackground: true,
      preferCSSPageSize: true
    });
    await browser.close();
  } finally {
    preview.kill('SIGTERM');
    await new Promise((resolve) => preview.once('exit', resolve));
  }
};

const toDataUrl = (mimeType, buffer) => `data:${mimeType};base64,${buffer.toString('base64')}`;

const roundedMask = (width, height, radius) =>
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="${width}" height="${height}" rx="${radius}" fill="#fff"/></svg>`
  );

const circleMask = (size) =>
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#fff"/></svg>`
  );

const roundedCrop = async (input, options) => {
  const { width, height, radius, extract } = options;

  const image = sharp(input);
  const clipped = extract ? image.extract(extract) : image;
  const resized = await clipped.resize({ width, height, fit: 'cover', position: 'top' }).png().toBuffer();

  return sharp(resized)
    .composite([{ input: roundedMask(width, height, radius), blend: 'dest-in' }])
    .png()
    .toBuffer();
};

const circleCrop = async (input, size) => {
  const resized = await sharp(input)
    .resize({ width: size, height: size, fit: 'cover', position: 'top' })
    .png()
    .toBuffer();

  return sharp(resized)
    .composite([{ input: circleMask(size), blend: 'dest-in' }])
    .png()
    .toBuffer();
};

try {
  await generateResumePdf();
  run('pdftoppm', ['-f', '1', '-singlefile', '-png', resumePdfPath, resumePreviewBase]);

  const [portrait, resumePreview, displayFont, sansFont] = await Promise.all([
    readFile(portraitPath),
    readFile(resumePreviewPath),
    readFile(displayFontPath),
    readFile(sansFontPath)
  ]);

  const resumeMeta = await sharp(resumePreview).metadata();
  const resumeWidth = resumeMeta.width ?? 0;
  const resumeHeight = resumeMeta.height ?? 0;
  const years = new Date().getFullYear() - 2013;
  const displayFontDataUrl = toDataUrl('font/woff2', displayFont);
  const sansFontDataUrl = toDataUrl('font/woff2', sansFont);

  const resumeSlotWidth = 430;
  const resumeSlotHeight = 504;
  const extractHeight = Math.min(resumeHeight, Math.round(resumeWidth / (resumeSlotWidth / resumeSlotHeight)));

  const resumeHero = await roundedCrop(resumePreview, {
    width: resumeSlotWidth,
    height: resumeSlotHeight,
    radius: 22,
    extract: {
      left: 0,
      top: 0,
      width: resumeWidth,
      height: extractHeight
    }
  });

  const portraitCircle = await circleCrop(portrait, 224);
  const backgroundSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <style>
      @font-face {
        font-family: "JetBrains Mono Variable";
        src: url("${displayFontDataUrl}") format("woff2");
        font-weight: 100 900;
      }

      @font-face {
        font-family: "Roboto Variable";
        src: url("${sansFontDataUrl}") format("woff2");
        font-weight: 100 900;
      }

      .name {
        font-family: "JetBrains Mono Variable", monospace;
        font-size: 64px;
        font-weight: 700;
        letter-spacing: -0.06em;
        fill: #eceef2;
      }

      .role {
        font-family: "Roboto Variable", sans-serif;
        font-size: 28px;
        font-weight: 560;
        fill: #afb6c5;
      }

      .summary {
        font-family: "Roboto Variable", sans-serif;
        font-size: 28px;
        line-height: 1.4;
        fill: #cfd6e3;
      }

      .panel-label {
        font-family: "JetBrains Mono Variable", monospace;
        font-size: 13px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        fill: rgba(236, 238, 242, 0.78);
      }
    </style>
    <linearGradient id="bg" x1="120" y1="80" x2="1080" y2="560" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#21252b" />
      <stop offset="0.62" stop-color="#252a31" />
      <stop offset="1" stop-color="#1d2127" />
    </linearGradient>
    <radialGradient id="blueGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(178 168) rotate(22) scale(240 184)">
      <stop offset="0" stop-color="#569cd6" stop-opacity="0.22" />
      <stop offset="1" stop-color="#569cd6" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="greenGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1030 132) rotate(-16) scale(230 160)">
      <stop offset="0" stop-color="#4ec9b0" stop-opacity="0.14" />
      <stop offset="1" stop-color="#4ec9b0" stop-opacity="0" />
    </radialGradient>
    <clipPath id="cardClip">
      <rect x="18" y="18" width="1164" height="594" rx="24" />
    </clipPath>
  </defs>
  <g clip-path="url(#cardClip)">
    <rect x="18" y="18" width="1164" height="594" rx="24" fill="url(#bg)" />
    <circle cx="176" cy="176" r="220" fill="url(#blueGlow)" />
    <circle cx="1030" cy="132" r="220" fill="url(#greenGlow)" />

    <circle cx="164" cy="176" r="120" fill="rgba(255,255,255,0.03)" />
    <circle cx="164" cy="176" r="116" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="2" />

    <rect x="712" y="18" width="470" height="594" rx="30" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" />
    <rect x="732" y="40" width="430" height="36" rx="18" fill="rgba(10,13,18,0.32)" />
    <circle cx="756" cy="58" r="5" fill="#ff5f57" />
    <circle cx="772" cy="58" r="5" fill="#ffbd2e" />
    <circle cx="788" cy="58" r="5" fill="#28c840" />
    <rect x="732" y="90" width="430" height="504" rx="22" fill="rgba(8,10,14,0.22)" />

    <text x="300" y="176" class="name">Chad Lefort</text>
    <text x="300" y="220" class="role">Senior Frontend Engineer</text>

    <text x="84" y="332" class="summary">
      <tspan x="84" dy="0">Frontend engineer from Louisiana with</tspan>
      <tspan x="84" dy="38">${years}+ years shipping maintainable,</tspan>
      <tspan x="84" dy="38">accessible, production-ready systems.</tspan>
      <tspan x="84" dy="38">Obsessive about design systems,</tspan>
      <tspan x="84" dy="38">consistency, and interfaces that feel</tspan>
      <tspan x="84" dy="38">polished for all users.</tspan>
    </text>
  </g>
  <rect x="18" y="18" width="1164" height="594" rx="24" fill="none" stroke="#fff" stroke-opacity="0.06" />
</svg>`;

  const baseCard = sharp(Buffer.from(backgroundSvg));

  await baseCard
    .composite([
      { input: portraitCircle, left: 52, top: 64 },
      { input: resumeHero, left: 732, top: 90 }
    ])
    .png()
    .toFile(path.join(publicDir, 'card.png'));
} finally {
  await rm(tempDir, { recursive: true, force: true });
}
