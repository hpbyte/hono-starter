# Repository Guidelines

## Project Structure & Module Organization
- `src/main.ts` starts the app; `src/bootstrap.ts` wires DI, HTTP server, and background runtime.
- `src/core/` holds shared infrastructure (`config/`, `database/`, `di/`, `http/`).
- `src/modules/` contains feature modules (e.g., `health/`, `user/`, `background/`) with controllers, services, and jobs.
- `src/shared/` contains shared types and interfaces.
- Database schema lives in `src/core/database/schema/`; generated migrations are in `src/core/database/drizzle/`.

## Build, Test, and Development Commands
- `bun install` — install dependencies.
- `bun run dev` — run the Hono server with hot reload.
- `bun run start` — run the server without hot reload.
- `bun run check` — TypeScript type-check (no emit).
- `bun run lint` / `bun run lint:fix` — ESLint checks and autofix.
- `bun run format` / `bun run format:check` — Prettier formatting.
- `docker compose up -d db` — start PostgreSQL for local dev.
- `bun run db:generate` / `bun run db:migrate` — generate and apply migrations.
- `bun run db:studio` — open Drizzle Studio.

## Coding Style & Naming Conventions
- TypeScript, ESM. Follow Prettier rules: 100-char lines, single quotes, no semicolons, no trailing commas.
- ESLint is configured via `eslint.config.mjs` (extends `@hono/eslint-config`).
- Feature file names follow a `feature.role.ts` pattern (e.g., `user.module.ts`, `user.controller.ts`, `user.service.ts`).
- Background jobs use clear suffixes (e.g., `sample-job.ts`, `sample-job.handler.ts`).

## Testing Guidelines
- No dedicated test runner is configured yet. Use `bun run check` and `bun run lint` as minimum validation.
- If you add tests, document the command in `package.json` and note where the tests live.

## Commit & Pull Request Guidelines
- Commit history uses a Conventional Commits-style format: `type: summary` (e.g., `chore: update deps`).
- PRs should include: a short summary, how you validated changes, and any new env vars or migrations.
- Schema changes should include generated migration files and updates to `.env.example` when needed.

## Configuration & Secrets
- Copy `.env.example` to `.env` and keep secrets local; `.env` is gitignored.
- Set `DATABASE_URL` and optionally `PORT` before running the server.
