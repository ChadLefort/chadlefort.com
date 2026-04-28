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

const bg = '#282C34';
const stroke = '#569cd6';
const size = 512;
const radius = 96;

// Lucide terminal icon (24x24) scaled and centered into a size×size rounded square.
// Inner glyph occupies ~75% of canvas, centered. Margin ~12.5% leaves enough safe zone
// for maskable PWA icons while keeping the glyph readable at favicon sizes.
const glyphRatio = 0.75;
const glyphSize = size * glyphRatio;
const scale = glyphSize / 24;
const offset = (size - glyphSize) / 2;

const sourceSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="${bg}"/>
  <g transform="translate(${offset} ${offset}) scale(${scale})" fill="none" stroke="${stroke}" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 19h8"/>
    <path d="m4 17 6-6-6-6"/>
  </g>
</svg>`;

await Promise.all([sharp(Buffer.from(sourceSvg)).png().toFile(icon512Path), Bun.write(faviconSvgPath, sourceSvg)]);

const downsample = (targetSize: number, outPath: string) =>
  sharp(icon512Path).resize(targetSize, targetSize, { fit: 'cover', kernel: 'lanczos3' }).png().toFile(outPath);

await Promise.all([downsample(180, appleTouchPath), downsample(192, icon192Path), downsample(512, srcIconPath)]);

await ico.sharpsToIco(
  [16, 32, 48, 64].map((targetSize) =>
    sharp(icon512Path).resize(targetSize, targetSize, { fit: 'cover', kernel: 'lanczos3' })
  ),
  icoPath,
  { sizes: [16, 32, 48, 64], resizeOptions: {} }
);

console.log('favicon.svg + icon-512.png + favicon.ico + PWA icons regenerated from lucide terminal source SVG');
