import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { $ } from 'bun';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const hooksConfigPath = path.join(rootDir, '.git-hooks.config');

const includePathsResult = await $`git config --local --get-all include.path`.cwd(rootDir).quiet().nothrow();

if (includePathsResult.exitCode !== 0) {
  console.log('No local Git hook include configured.');
  process.exit(0);
}

const includePaths = includePathsResult.stdout
  .toString()
  .split('\n')
  .map((value) => value.trim())
  .filter(Boolean);

if (!includePaths.includes(hooksConfigPath)) {
  console.log(`Git hook include not installed: ${hooksConfigPath}`);
  process.exit(0);
}

await $`git config --local --unset-all include.path ${hooksConfigPath}`.cwd(rootDir);
console.log(`Removed Git hook include: ${hooksConfigPath}`);
