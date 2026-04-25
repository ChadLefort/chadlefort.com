import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import ico from 'sharp-ico';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');

const icon512Path = path.join(publicDir, 'icon-512.png');
const icoPath = path.join(publicDir, 'favicon.ico');
const faviconSvgPath = path.join(publicDir, 'favicon.svg');
const appleTouchPath = path.join(publicDir, 'apple-touch-icon.png');
const icon192Path = path.join(publicDir, 'icon-192.png');
const srcIconPath = path.join(rootDir, 'src', 'assets', 'icon.png');

const BG = '#282C34';
const STROKE = '#569cd6';
const SIZE = 512;
const RADIUS = 96;

// Lucide terminal icon (24x24) scaled and centered into a SIZE×SIZE rounded square.
// Inner glyph occupies ~75% of canvas, centered. Margin ~12.5% leaves enough safe zone
// for maskable PWA icons while keeping the glyph readable at favicon sizes.
const GLYPH_RATIO = 0.75;
const GLYPH_SIZE = SIZE * GLYPH_RATIO;
const SCALE = GLYPH_SIZE / 24;
const OFFSET = (SIZE - GLYPH_SIZE) / 2;

const sourceSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <rect width="${SIZE}" height="${SIZE}" rx="${RADIUS}" ry="${RADIUS}" fill="${BG}"/>
  <g transform="translate(${OFFSET} ${OFFSET}) scale(${SCALE})" fill="none" stroke="${STROKE}" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 19h8"/>
    <path d="m4 17 6-6-6-6"/>
  </g>
</svg>`;

await Promise.all([sharp(Buffer.from(sourceSvg)).png().toFile(icon512Path), writeFile(faviconSvgPath, sourceSvg)]);

const downsample = (size, outPath) =>
  sharp(icon512Path).resize(size, size, { fit: 'cover', kernel: 'lanczos3' }).png().toFile(outPath);

await Promise.all([downsample(180, appleTouchPath), downsample(192, icon192Path), downsample(512, srcIconPath)]);

await ico.sharpsToIco(
  [16, 32, 48, 64].map((size) => sharp(icon512Path).resize(size, size, { fit: 'cover', kernel: 'lanczos3' })),
  icoPath,
  { sizes: [16, 32, 48, 64], resizeOptions: {} }
);

console.log('favicon.svg + icon-512.png + favicon.ico + PWA icons regenerated from lucide terminal source SVG');
