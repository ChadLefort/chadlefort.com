import { mkdtemp, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';
import { $ } from 'bun';
import dedent from 'dedent';
import sharp from 'sharp';

type ExtractRegion = {
  left: number;
  top: number;
  width: number;
  height: number;
};

type RoundedCropOptions = {
  width: number;
  height: number;
  radius: number;
  extract?: ExtractRegion;
};

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const tempDir = await mkdtemp(path.join(os.tmpdir(), 'chad-brand-assets-'));

const portraitPath = path.join(rootDir, 'src', 'assets', 'me.png');
const resumePdfPath = path.join(publicDir, 'chad-lefort-resume.pdf');
const resumeMdPath = path.join(publicDir, 'chad-lefort-resume.md');
const displayFontPath = path.join(publicDir, 'fonts', 'jetbrains-mono-latin-wght-normal.woff2');
const sansFontPath = path.join(publicDir, 'fonts', 'roboto-latin-wght-normal.woff2');
const resumePreviewBase = path.join(tempDir, 'resume-preview');
const resumePreviewPath = `${resumePreviewBase}.png`;

const loadBinary = async (filePath: string): Promise<Buffer> => Buffer.from(await Bun.file(filePath).arrayBuffer());

const previewHost = '127.0.0.1';
const previewPort = 4326;
const previewUrl = `http://${previewHost}:${previewPort}/`;

const waitForServer = async (url: string, timeoutMs = 30_000): Promise<void> => {
  const start = Date.now();

  while (Date.now() - start < timeoutMs) {
    try {
      const response = await fetch(url);

      if (response.ok || response.status === 404) return;
    } catch {
      // keep polling
    }

    await new Promise<void>((resolve) => {
      setTimeout(resolve, 250);
    });
  }

  throw new Error(`Preview server did not respond at ${url} within ${timeoutMs}ms`);
};

const generateResumePdf = async (): Promise<void> => {
  const astroBin = path.join(rootDir, 'node_modules', '.bin', 'astro');

  await $`${astroBin} build`.cwd(rootDir);

  const preview = Bun.spawn({
    cmd: [astroBin, 'preview', '--host', previewHost, '--port', String(previewPort)],
    cwd: rootDir,
    stdin: 'ignore',
    stdout: 'inherit',
    stderr: 'inherit'
  });

  try {
    await waitForServer(previewUrl);

    const browser = await chromium.launch();

    try {
      const page = await browser.newPage({ viewport: { width: 794, height: 1123 } });

      await page.emulateMedia({ media: 'print', colorScheme: 'light', reducedMotion: 'reduce' });
      await page.goto(previewUrl, { waitUntil: 'networkidle' });
      await page.waitForFunction(() => document.fonts.status === 'loaded');
      await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => resolve())));
      await page.addStyleTag({ content: '[aria-label="Scroll to top"] { display: none !important; }' });
      await page.addStyleTag({
        content: dedent`
          /*
           * Generated PDF only: Chromium can drop section padding when #skills or
           * #education land near a page break. Use a real spacer block for these
           * headings while leaving normal Ctrl+P print styles untouched.
           */
          #skills,
          #education {
            padding-top: 0 !important;
          }

          #skills::before,
          #education::before {
            content: "" !important;
            display: block !important;
            height: 0.3in !important;
            break-after: avoid !important;
          }
        `
      });
      await page
        .locator('.print\\:sheet-avatar')
        .evaluate(
          (img: HTMLImageElement) =>
            img.complete && img.naturalWidth > 0
              ? null
              : new Promise<void>((resolve) => {
                  img.addEventListener('load', () => resolve(), { once: true });
                  img.addEventListener('error', () => resolve(), { once: true });
                }),
          { timeout: 5000 }
        )
        .catch(() => undefined);
      const [, mdResponse] = await Promise.all([
        page.pdf({
          path: resumePdfPath,
          format: 'Letter',
          margin: { top: '0', right: '0', bottom: '0', left: '0' },
          printBackground: true,
          preferCSSPageSize: true
        }),
        fetch(`${previewUrl}resume.md`)
      ]);

      if (mdResponse.ok) {
        await Bun.write(resumeMdPath, await mdResponse.text());
      }
    } finally {
      await browser.close();
    }
  } finally {
    if (preview.exitCode === null && !preview.killed) {
      preview.kill('SIGTERM');
    }

    await preview.exited;
  }
};

const toDataUrl = (mimeType: string, buffer: Buffer): string => `data:${mimeType};base64,${buffer.toString('base64')}`;

const maskFill = '#eceef2';

const roundedMask = (width: number, height: number, radius: number): Buffer =>
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="${width}" height="${height}" rx="${radius}" fill="${maskFill}"/></svg>`
  );

const circleMask = (size: number): Buffer =>
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="${maskFill}"/></svg>`
  );

const roundedCrop = async (input: Buffer, options: RoundedCropOptions): Promise<Buffer> => {
  const { width, height, radius, extract } = options;

  const image = sharp(input);
  const clipped = extract ? image.extract(extract) : image;
  const resized = await clipped.resize({ width, height, fit: 'cover', position: 'top' }).png().toBuffer();

  return sharp(resized)
    .composite([{ input: roundedMask(width, height, radius), blend: 'dest-in' }])
    .png()
    .toBuffer();
};

const circleCrop = async (input: Buffer, size: number): Promise<Buffer> => {
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
  await $`pdftoppm -f 1 -singlefile -png ${resumePdfPath} ${resumePreviewBase}`.cwd(rootDir);

  const [portrait, resumePreview, displayFont, sansFont] = await Promise.all([
    loadBinary(portraitPath),
    loadBinary(resumePreviewPath),
    loadBinary(displayFontPath),
    loadBinary(sansFontPath)
  ]);

  const resumeMeta = await sharp(resumePreview).metadata();
  const resumeWidth = resumeMeta.width ?? 0;
  const resumeHeight = resumeMeta.height ?? 0;
  const years = new Date().getFullYear() - 2013;
  const displayFontDataUrl = toDataUrl('font/woff2', displayFont);
  const sansFontDataUrl = toDataUrl('font/woff2', sansFont);

  const resumeSlotWidth = 392;
  const resumeSlotHeight = 468;
  const extractHeight = Math.min(resumeHeight, Math.round(resumeWidth / (resumeSlotWidth / resumeSlotHeight)));

  const [resumeHero, socialPortrait, searchPortrait] = await Promise.all([
    roundedCrop(resumePreview, {
      width: resumeSlotWidth,
      height: resumeSlotHeight,
      radius: 22,
      extract: {
        left: 0,
        top: 0,
        width: resumeWidth,
        height: extractHeight
      }
    }),
    circleCrop(portrait, 224),
    circleCrop(portrait, 700)
  ]);
  // sRGB equivalents of the dark-mode hero tokens: --color-12 and --terminal-blue.
  const heroHeadingColor = '#e7ebf3';
  const heroAccentColor = '#549bdb';
  const socialCardSvg = dedent`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
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
          font-weight: 600;
          letter-spacing: -0.08em;
          fill: ${heroHeadingColor};
        }

        .role {
          font-family: "Roboto Variable", sans-serif;
          font-size: 28px;
          font-weight: 500;
          fill: ${heroAccentColor};
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
      <clipPath id="cardClip">
        <rect x="18" y="18" width="1164" height="594" rx="24" />
      </clipPath>
    </defs>
    <g clip-path="url(#cardClip)">
      <rect x="18" y="18" width="1164" height="594" rx="24" fill="url(#bg)" />
      <circle cx="164" cy="194" r="120" fill="rgba(236,238,242,0.03)" />
      <circle cx="164" cy="194" r="116" fill="none" stroke="rgba(236,238,242,0.2)" stroke-width="2" />

      <rect x="720" y="42" width="428" height="546" rx="30" fill="rgba(236,238,242,0.04)" stroke="rgba(236,238,242,0.1)" />
      <rect x="738" y="58" width="392" height="36" rx="18" fill="rgba(10,13,18,0.32)" />
      <circle cx="762" cy="76" r="5" fill="#ff5f57" />
      <circle cx="778" cy="76" r="5" fill="#ffbd2e" />
      <circle cx="794" cy="76" r="5" fill="#28c840" />
      <rect x="738" y="104" width="392" height="468" rx="22" fill="rgba(8,10,14,0.22)" />

      <text x="290" y="194" class="name">Chad Lefort</text>
      <text x="300" y="238" class="role">Senior Frontend Engineer</text>

      <text x="52" y="350" class="summary">
        <tspan x="52" dy="0">Frontend engineer from Louisiana with</tspan>
        <tspan x="52" dy="38">${years}+ years shipping maintainable,</tspan>
        <tspan x="52" dy="38">accessible, production-ready systems.</tspan>
        <tspan x="52" dy="38">Obsessive about design systems,</tspan>
        <tspan x="52" dy="38">consistency, and interfaces that feel</tspan>
        <tspan x="52" dy="38">polished for all users.</tspan>
      </text>
    </g>
    <rect x="18" y="18" width="1164" height="594" rx="24" fill="none" stroke="#eceef2" stroke-opacity="0.06" />
  </svg>`;

  const searchCardSvg = dedent`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200" viewBox="0 0 1200 1200">
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
          font-size: 108px;
          font-weight: 600;
          letter-spacing: -0.08em;
          fill: ${heroHeadingColor};
        }

        .role {
          font-family: "Roboto Variable", sans-serif;
          font-size: 52px;
          font-weight: 500;
          fill: ${heroAccentColor};
        }

      </style>
      <linearGradient id="bg" x1="100" y1="60" x2="1100" y2="1140" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#252a31" />
        <stop offset="0.55" stop-color="#21252b" />
        <stop offset="1" stop-color="#1d2127" />
      </linearGradient>
      <radialGradient id="glow" cx="0" cy="0" r="1" gradientTransform="translate(600 460) rotate(90) scale(500)">
        <stop offset="0" stop-color="#eceef2" stop-opacity="0.1" />
        <stop offset="1" stop-color="#eceef2" stop-opacity="0" />
      </radialGradient>
      <clipPath id="cardClip">
        <rect x="18" y="18" width="1164" height="1164" rx="48" />
      </clipPath>
    </defs>
    <g clip-path="url(#cardClip)">
      <rect x="18" y="18" width="1164" height="1164" rx="48" fill="url(#bg)" />
      <circle cx="600" cy="460" r="500" fill="url(#glow)" />
      <circle cx="600" cy="460" r="356" fill="rgba(236,238,242,0.03)" />
      <circle cx="600" cy="460" r="354" fill="none" stroke="rgba(236,238,242,0.24)" stroke-width="3" />

      <text x="600" y="980" text-anchor="middle" class="name">Chad Lefort</text>
      <text x="600" y="1064" text-anchor="middle" class="role">Senior Frontend Engineer</text>
    </g>
    <rect x="18" y="18" width="1164" height="1164" rx="48" fill="none" stroke="#eceef2" stroke-opacity="0.08" />
  </svg>`;

  await Promise.all([
    sharp(Buffer.from(socialCardSvg))
      .composite([
        { input: socialPortrait, left: 52, top: 82 },
        { input: resumeHero, left: 738, top: 104 }
      ])
      .png()
      .toFile(path.join(publicDir, 'card.png')),
    sharp(Buffer.from(searchCardSvg))
      .composite([{ input: searchPortrait, left: 250, top: 110 }])
      .png()
      .toFile(path.join(publicDir, 'search-card.png'))
  ]);
} finally {
  await rm(tempDir, { recursive: true, force: true });
}
