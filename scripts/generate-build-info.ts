import { mkdirSync, writeFileSync } from 'node:fs';
import { exit } from 'node:process';
import { $ } from 'bun';

async function main() {
  const SHA = process.env.CF_PAGES_COMMIT_SHA ?? (await tryGit());
  const BRANCH = process.env.CF_PAGES_BRANCH ?? (await tryGitBranch());
  const BUILT = new Date().toISOString();

  const payload = { sha: SHA, branch: BRANCH, built: BUILT };

  mkdirSync('public', { recursive: true });
  writeFileSync('public/build-info.json', JSON.stringify(payload, null, 2));

  console.log(`[build-info] ${SHA.slice(0, 7)} ${BRANCH} → public/build-info.json`);
}

async function tryGit(): Promise<string> {
  try {
    return (await $`git rev-parse HEAD`.text()).trim();
  } catch {
    return 'unknown';
  }
}

async function tryGitBranch(): Promise<string> {
  try {
    return (await $`git rev-parse --abbrev-ref HEAD`.text()).trim();
  } catch {
    return 'unknown';
  }
}

main().catch((err) => {
  console.error(err);
  exit(1);
});
