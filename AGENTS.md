# Repository Guidelines

## Project Structure & Module Organization
- Next.js + TypeScript app. Key folders: `app/` (routes/layouts), `components/`, `lib/` (helpers, `lib/types/`), `i18n/messages/` (locale JSON), and `public/` (static assets). 
- Tests live next to code: `Component.test.tsx`.

## Build, Test, and Development Commands
- Install deps: `bun install` (keep `bun.lock`; do not add npm/yarn locks).
- Local dev: `bun run dev` (or `bun run dev:turbo`).
- Build: `bun run build`; start: `bun run start`.
- Lint: `bun run lint`; type check: `bun run typecheck`.
- Format: `bun run format`; check only: `bun run format:check`.
- Tests (when added): prefer Vitest + React Testing Library. Run all: `bun x vitest`. Single file: `bun x vitest path/to/file.test.ts --run`. Watch failed: `bun x vitest -u --watch`.

## Coding Style & Naming Conventions
- TypeScript strict; avoid `any` (prefer `unknown`; if unavoidable, add `// intentional-any`).
- Imports order: node → external → `@/` aliases → relative; blank line between groups; alphabetize named imports.
- Components are server by default; add `"use client"` only for state/effects or browser APIs. 
- Naming: PascalCase components/types; camelCase vars/functions; UPPER_SNAKE constants; filename matches default export (e.g., `BudgetChart.tsx`).
- Prettier defaults; 2‑space indent; Tailwind utilities ordered logically. Never commit unformatted code.

## Testing Guidelines
- Frameworks: Vitest + React Testing Library.
- Place tests alongside source; mock i18n; use snapshots only for stable markup.
- Aim for meaningful coverage of data transforms and UI behavior.

## i18n, Data, and Utilities
- All user text via `next-intl`. Add keys to `i18n/messages/*.json` for all locales.
- Data is static JSON; do not mutate public data at runtime. Update schemas in `lib/types/budget.ts` and document changes in `README.md`.
- Use helpers in `lib/utils.ts` (`formatBudgetAmount`, `formatCurrency`, `calculatePercentage`); do not duplicate logic.

## Accessibility, Errors, and Performance
- Keyboard-accessible interactions; provide `aria-*` where text is not explicit; meet WCAG 2.1 AA contrast.
- Wrap data fetch/transform in try/catch and render safe fallbacks; never throw in render.
- Avoid expensive work in render; memoize derived chart data; lazy-load heavy visuals if needed.

## Commit & Pull Request Guidelines
- Commits: concise, imperative (e.g., "add growth calc for expenditure"); group related changes; no WIP commits.
- PRs: clear description, linked issues, screenshots for UI, note i18n keys/schema changes.
- Runtime: Bun or Node 18+. Public envs must be `NEXT_PUBLIC_*`; never introduce secrets.

