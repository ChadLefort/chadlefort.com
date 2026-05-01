# chadlefort.com

My personal website.

## Stack

- **Astro 5** — static output (`output: 'static'`)
- **React 19** — islands via `client:idle` / `client:load` / `client:visible`
- **Tailwind CSS v4** — `@tailwindcss/vite`, `@theme inline` tokens, `@utility` blocks
- **tailwind-variants** — colocated `tv()` per component
- **React Aria Components** — accessible primitives (Button, Dialog, Modal)
- **Vitest + Playwright** — unit + E2E tests
- **@vite-pwa/astro** — PWA + service worker
- **Bun** — package manager + runtime
- **Fallow** — dead-code / duplication / complexity auditing

## Scripts

| Command                     | Purpose                                       |
| --------------------------- | --------------------------------------------- |
| `bun run dev`               | dev server (`astro dev --host`)               |
| `bun run build`             | production build → `dist/`                    |
| `bun run prebuild`          | generate build info (runs pre-build)          |
| `bun run preview`           | serve `dist/` locally                         |
| `bun run typecheck`         | app + test TS checks plus Bun script checks   |
| `bun run typecheck:tsc`     | typecheck using `tsc` instead of `tsgo`       |
| `bun run typecheck:scripts` | standalone Bun tooling scripts only           |
| `bun run lint`              | biome check                                   |
| `bun run lint:fix`          | biome check + auto-fix                        |
| `bun run format`            | biome format (write)                          |
| `bun run format:check`      | biome format (check-only)                     |
| `bun run test`              | vitest (single run)                           |
| `bun run test:watch`        | vitest (watch mode)                           |
| `bun run test:ui`           | vitest (browser UI)                           |
| `bun run test:coverage`     | vitest with coverage report                   |
| `bun run test:e2e`          | playwright                                    |
| `bun run test:e2e:update`   | playwright (update snapshots)                 |
| `bun run test:e2e:ui`       | playwright (UI mode)                          |
| `bun run hooks:install`     | install native Git 2.54 config-based hooks    |
| `bun run hooks:list`        | list installed pre-commit hooks               |
| `bun run hooks:uninstall`   | uninstall git hooks                           |
| `bun run assets:brand`      | regenerate `card.png` + resume PDF            |
| `bun run assets:favicon`    | regenerate favicon assets                     |
| `bun run audit`             | fallow dead-code + complexity + duplication   |
| `bun run dead-code`         | fallow dead-code only                         |
| `bun run health`            | fallow complexity only                        |
| `bun run dupes`             | fallow duplication only                       |
| `bun run fallow:fix`        | fallow auto-fix (removes unused exports/deps) |
| `bun run fallow:fix:preview`| preview fallow auto-fixes                     |
