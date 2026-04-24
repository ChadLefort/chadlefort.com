import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import ico from 'sharp-ico';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');

// public/icon-512.png is the committed source of truth. Author / update it
// however you like (export from Figma, paint over in Photoshop, drop a new
// PNG). Every downstream asset (favicon.ico, apple-touch-icon, icon-192,
// src/assets/icon.png) is downsampled from it via lanczos3.
const icon512Path = path.join(publicDir, 'icon-512.png');
const icoPath = path.join(publicDir, 'favicon.ico');
const appleTouchPath = path.join(publicDir, 'apple-touch-icon.png');
const icon192Path = path.join(publicDir, 'icon-192.png');
const srcIconPath = path.join(rootDir, 'src', 'assets', 'icon.png');

const downsample = (size, outPath) =>
  sharp(icon512Path).resize(size, size, { fit: 'cover', kernel: 'lanczos3' }).png().toFile(outPath);

await Promise.all([downsample(180, appleTouchPath), downsample(192, icon192Path), downsample(512, srcIconPath)]);

await ico.sharpsToIco(
  [16, 32, 48, 64].map((size) => sharp(icon512Path).resize(size, size, { fit: 'cover', kernel: 'lanczos3' })),
  icoPath,
  { sizes: [16, 32, 48, 64], resizeOptions: {} }
);

console.log('favicon.ico + PWA icons regenerated from icon-512.png');
