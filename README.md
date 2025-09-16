# Hono Starter

A starter kit for building Bun + Hono services with a [NestJS](https://nestjs.com/)-like structure, Dependency injection is baked in, and [PostgreSQL](https://www.postgresql.org/) via [Drizzle ORM](https://orm.drizzle.team/).

## Why?

Hono is really great but due to its unopinionated nature, there's a lack of guidance in terms of application structure and best practices for enterprise applications.

This aims to provide as a starting point for enterprise apps and contains ready-to-use base tooling so you can focus on features instead of wiring from scratch.

## Stack

- ⚡ **Bun + Hono** for fast server-side rendering and routing
- 💉 **Inversify DI** with Nest-like modules, controllers, and injectable services
- 🗄️ **Drizzle ORM** already configured for PostgreSQL
- 🔄 **Background runtime** that auto-discovers jobs and handles lifecycle
- 🛡️ **Zod** for schema validation and type-safe configuration
- 🧱 **Layered structure** (`core`, `modules`, `shared`) for better maintainability
- 🧪 **TypeScript-first** with ESLint, Prettier, and `tsc` ready to run

## Project Structure

```
src/
├── bootstrap.ts           # Bootstraps the DI container, server, and runtime
├── core/                  # Foundation services used across the app
│   ├── config/            # Typed config loading & validation (Zod)
│   ├── database/          # Drizzle client, config, migrations output
│   ├── di/                # Module decorator(s) + container factory
│   └── http/              # Hono server wrapper with lifecycle helpers
├── modules/               # Feature modules (controllers, services, jobs)
│   ├── background/        # Sample background job + runtime coordination
│   ├── health/            # `/health` endpoint and status checks
│   └── user/              # `/users` example using Drizzle query API
└── shared/                # Reusable interfaces and type contracts
```

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) `>=1.2`
- Docker & Docker Compose (for local PostgreSQL)

### Installation

```bash
bun install
cp .env.example .env
```

Update `.env` (see [Environment Variables](#environment-variables)).

### Run the stack locally

```bash
docker compose up -d db       # start postgres
bun run db:migrate            # apply pending migrations
bun run dev                   # start Hono with hot reload on http://localhost:3000
```

### Running with Docker

```bash
docker compose up --build -d
```

## Architecture Notes

- **Dependency Injection**: `@Module({...})` ties together providers, controllers, and background jobs. `bootstrap.ts` collects modules, builds an Inversify container, and resolves the `HttpServer` and `BackgroundRuntime` singletons.
- **HTTP Controllers**: Anything bound as a controller is auto-registered on the Hono app when the server starts. Implement `HttpController.registerRoutes(app)` to declare routes.
- **Background Jobs**: Implement `IBackgroundJob` (`id`, `start`, `stop`) and add the job class to a module's `backgroundJobs` array. The runtime starts every job on boot and stops them on shutdown.
- **Graceful Shutdown**: `src/main.ts` listens for `SIGINT/SIGTERM`, stops jobs, and closes the HTTP server in order.
- **Database Access**: Use the injected `DrizzleClient` (`drizzle.database`) for type-safe queries. Place schema files under `src/core/database/schema/` for Drizzle Kit to pick them up.

## Environment Variables

`src/core/config/config.schema.ts` validates configuration at startup. Provide these variables via `.env` or your environment:

| Variable       | Required | Default | Description                  |
| -------------- | -------- | ------- | ---------------------------- |
| `DATABASE_URL` | ✅       | –       | PostgreSQL connection string |
| `PORT`         | ❌       | `3000`  | HTTP server port             |

Example `.env`:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/hono
PORT=3000
```

## Database Workflow

Drizzle Kit is preconfigured via `src/core/database/drizzle.config.ts`.

```bash
bun run db:generate   # generate SQL migration files from schema changes
bun run db:migrate    # apply migrations
bun run db:push       # push schema directly (not recommended for prod)
bun run db:studio     # open Drizzle Studio UI
```

Place table definitions in `src/core/database/schema/` (e.g. `users.ts`). They are aggregated automatically when you run Drizzle commands.

## Adding New Features

### Create a module

1. Create a directory under `src/modules/<feature>`.
2. Add services/controllers with the `@Injectable()` decorator.
3. Register them in `<feature>.module.ts` using `@Module({ providers, controllers, backgroundJobs })`.
4. Export the module class and register it inside the `modules` array in `src/bootstrap.ts`.

### Register an HTTP controller

```ts
@Injectable()
export class ExampleController implements HttpController {
  constructor(private readonly svc: ExampleService) {}

  registerRoutes(app: Hono) {
    app.get('/example', () => this.svc.handle())
  }
}
```

Once the module is included in `bootstrap.ts`, the controller routes are attached automatically.

### Add a background job

```ts
@Injectable()
export class ReportJob implements IBackgroundJob {
  readonly id = 'report-job'
  constructor(private readonly handler: ReportHandler) {}
  async start() {
    await this.handler.run()
  }
  async stop() {
    await this.handler.stop()
  }
}
```

Add `ReportJob` to the module's `backgroundJobs` array to have it resolved and started.
