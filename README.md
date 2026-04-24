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

| Command                | Purpose                                       |
| ---------------------- | --------------------------------------------- |
| `bun run dev`          | dev server                                    |
| `bun run build`        | production build → `dist/`                    |
| `bun run preview`      | serve `dist/` locally                         |
| `bun run typecheck`    | `astro check` + `tsgo --noEmit`               |
| `bun run lint`         | oxlint                                        |
| `bun run format`       | prettier                                      |
| `bun run test`         | vitest                                        |
| `bun run test:e2e`     | playwright                                    |
| `bun run assets:brand` | regenerate `card.png` + resume PDF            |
| `bun run audit`        | fallow dead-code + complexity + duplication   |
| `bun run health`       | fallow complexity only                        |
| `bun run dupes`        | fallow duplication only                       |
| `bun run fallow:fix`   | fallow auto-fix (removes unused exports/deps) |
