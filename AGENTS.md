# AGENTS.md

1. Install: `bun install`. Dev: `bun run dev` (or `dev:turbo`). Build: `bun run build`; start: `bun run start`; lint: `bun run lint`; type check: `bun run typecheck`; format: `bun run format`; check format: `bun run format:check`.
2. No tests yet (no test deps). To add one: prefer Vitest + React Testing Library; run all: `bun x vitest`; single test: `bun x vitest path/to/file.test.ts --run`; watch failed: `-u --watch`.
3. Use Bun or Node 18+. Keep lock: `bun.lock` committed; do NOT add yarn/npm locks.
4. Imports order: (a) node/stdlib, (b) external libs, (c) alias `@/` modules, (d) relative (`../`, `./`); blank line between groups; named imports alphabetized.
5. Use TypeScript strict types; no `any` (except conscious escape with comment `// intentional-any`); favor `unknown` over `any`; derive types from data (`typeof obj` / interfaces in `lib/types`).
6. Components: server by default; add `"use client"` only if using state/effect or browser APIs. Keep props typed with explicit interface.
7. Naming: PascalCase for components/types; camelCase for vars/functions; UPPER_SNAKE for constants; file names match default export (e.g., `BudgetChart.tsx`).
8. Formatting: Prettier default; 2-space (TS/JS/JSON), Tailwind classes ordered logically (semantic grouping; do not wrap arbitrarily). Never commit unformatted code.
9. CSS: Prefer Tailwind utility classes; avoid custom global styles unless token-related; keep dark/light accessible contrast.
10. Data: Static JSON only; never write runtime mutating public data; add new schema changes to `lib/types/budget.ts` and document in README.
11. i18n: All user-visible strings via `next-intl`; no hard-coded Indonesian/English literals in components; add keys to `i18n/messages/*.json` both locales.
12. Currency/number formatting: Use helpers in `lib/utils.ts` (`formatBudgetAmount`, `formatCurrency`, `calculatePercentage`); do not duplicate logic.
13. Error handling: Fail gracefully—wrap data fetch/transform in try/catch; return fallback UI; never throw uncaught errors in React render.
14. Accessibility: All interactive elements keyboard navigable; provide aria-labels where text not explicit; color choices must meet WCAG 2.1 AA.
15. Performance: Avoid expensive recalculation inside render; memoize derived chart data; lazy-load heavy visualizations if growth expands.
16. Do not introduce runtime secrets; environment vars prefixed `NEXT_PUBLIC_` only for public usage; keep potential future private keys out of repo.
17. Commit style: concise imperative (e.g., "add growth calc for expenditure"); group related changes; no WIP commits.
18. Add tests alongside files (`Component.test.tsx`); mock i18n where necessary; snapshot only for stable structural output.
19. New agents: respect CLAUDE.md for architecture context; update this file if adding tooling (e.g., test scripts) so automation stays accurate.
20. If adding Copilot/Cursor rules later (.github/copilot-instructions.md or .cursor/rules/), summarize them here for agent visibility.
