import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { $ } from 'bun';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const hooksConfigPath = path.join(rootDir, '.git-hooks.config');

const gitRepoResult = await $`git rev-parse --is-inside-work-tree`.cwd(rootDir).quiet().nothrow();

if (gitRepoResult.exitCode !== 0 || gitRepoResult.stdout.toString().trim() !== 'true') {
  console.log('Skipping Git hook install: not inside a Git work tree.');
  process.exit(0);
}

const includePathsResult = await $`git config --local --get-all include.path`.cwd(rootDir).quiet().nothrow();
const includePaths =
  includePathsResult.exitCode === 0
    ? includePathsResult.stdout
        .toString()
        .split('\n')
        .map((value) => value.trim())
        .filter(Boolean)
    : [];

if (!includePaths.includes(hooksConfigPath)) {
  await $`git config --local --add include.path ${hooksConfigPath}`.cwd(rootDir);
  console.log(`Installed Git hook include: ${hooksConfigPath}`);
} else {
  console.log(`Git hook include already installed: ${hooksConfigPath}`);
}
