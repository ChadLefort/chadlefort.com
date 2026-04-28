export default {
  // Work around Biome rewriting Astro frontmatter non-idempotently during
  // write/fix operations. Tracking upstream here:
  // - https://github.com/biomejs/biome/issues/7912
  // - https://github.com/biomejs/biome/issues/7991
  // - https://github.com/biomejs/biome/issues/8890
  // - https://github.com/biomejs/biome/issues/9097
  '*.{js,jsx,ts,tsx,json,jsonc,css}':
    'biome check --write --no-errors-on-unmatched --files-ignore-unknown=true --config-path biome.write.jsonc',
  '*.astro': 'biome check --no-errors-on-unmatched --files-ignore-unknown=true'
};
