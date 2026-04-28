import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { $ } from 'bun';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

await $`bun run assets:brand`.cwd(rootDir);
await $`git add public/chad-lefort-resume.pdf public/chad-lefort-resume.md public/card.png`.cwd(rootDir);
