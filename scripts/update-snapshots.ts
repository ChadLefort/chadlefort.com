import { exit } from 'node:process';
import { $ } from 'bun';

const log = (msg: string) => console.log(`\x1b[36m[update-snapshots]\x1b[0m ${msg}`);

async function main() {
  log('Updating local (darwin) snapshots...');
  await $`FORCE_COLOR=1 bunx playwright test --update-snapshots`;

  log('Checking for darwin snapshot changes...');
  const status = await $`git status --short e2e/`.text();

  const hasDarwinChanges = status.split('\n').some((line) => line.trim().endsWith('-darwin.png'));

  if (hasDarwinChanges) {
    log('Staging darwin snapshots...');
    await $`git add e2e/**/*-darwin.png`;

    log('Committing darwin snapshots...');
    await $`git commit -m "Update darwin visual snapshots [skip ci]"`;

    log('Pushing...');
    await $`git push`;
  } else {
    log('No darwin snapshot changes to commit.');
  }

  log('Triggering GitHub workflow for linux snapshots...');
  await triggerWorkflow();

  log('Done! Check the Actions tab for linux snapshot progress.');
}

async function triggerWorkflow() {
  try {
    const branch = (await $`git branch --show-current`.text()).trim();
    await $`gh workflow run update-snapshots.yml --ref ${branch}`;
  } catch {
    log('\x1b[33mWarning: Could not trigger GitHub workflow automatically.');
    log('Make sure the GitHub CLI (`gh`) is installed and authenticated.');
    log(
      'Manually trigger it at: https://github.com/ChadLefort/chadlefort.com/actions/workflows/update-snapshots.yml\x1b[0m'
    );
  }
}

main().catch((err) => {
  console.error(err);
  exit(1);
});
