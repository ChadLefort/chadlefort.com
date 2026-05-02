import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { $ } from 'bun';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const resumeSourceFiles = new Set([
  'scripts/generate-brand-assets.ts',
  'src/data/education.ts',
  'src/data/jobs.ts',
  'src/data/site.ts',
  'src/data/skills.ts',
  'src/pages/resume.md.ts',
  'src/utils/markdown-sections.ts'
]);

const stagedFilesResult = await $`git diff --cached --name-only`.cwd(rootDir).quiet().nothrow();
const stagedFiles = stagedFilesResult.stdout
  .toString()
  .split('\n')
  .map((file) => file.trim())
  .filter(Boolean);

if (!stagedFiles.some((file) => resumeSourceFiles.has(file))) {
  console.log('Skipping resume asset generation: no resume source files changed.');
  process.exit(0);
}

await $`bun run assets:brand`.cwd(rootDir);
await $`git add public/chad-lefort-resume.pdf public/chad-lefort-resume.md public/card.png`.cwd(rootDir);
