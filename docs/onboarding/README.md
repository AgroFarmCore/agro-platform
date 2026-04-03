# Onboarding

Use this guide when a new engineer joins the repository.

## Prerequisites

- Node.js `22.x`
- `pnpm` `10.x`
- Docker Desktop or another way to run local Postgres and Redis
- GitHub access to the repository and required teams
- access to staging logs, deploy UI, and secrets manager when role requires it

## First Day Checklist

1. Clone the repository and run `pnpm install`.
2. Copy `.env.example` into `.env.local` for local overrides when needed.
3. Start local Postgres and Redis.
4. Run `pnpm db:generate`.
5. Run `pnpm lint`, `pnpm typecheck`, and `pnpm test`.
6. Start one app relevant to your role:
   `pnpm dev:web`, `pnpm dev:portal`, `pnpm dev:backoffice`, or `pnpm dev:worker`.
7. Read [CONTRIBUTING.md](/D:/Agro/CONTRIBUTING.md) and
   [module-ownership.md](/D:/Agro/docs/ownership/module-ownership.md).

## Local Services

- Postgres: required for `packages/database` and integration-oriented work
- Redis: required for `apps/worker` and queue flows
- browser session: required for UI validation in `web`, `portal`, and `backoffice`

Recommended local ports:

- `web`: `3000`
- `portal`: `3001`
- `backoffice`: `3002`
- Postgres: `5432`
- Redis: `6379`

## How To Pick Your First Task

- `apps/web`: public pages, SEO routes, content rendering
- `apps/portal`: authenticated role-based screens for farmer and supplier flows
- `apps/backoffice`: moderation, support, operations dashboards
- `apps/worker`: queue orchestration, retries, background processors
- `packages/modules`: business use cases and module contracts
- `packages/database`: schema, migrations, seed, transaction helpers

## Common Troubleshooting

- install fails:
  verify Node `22.x` and `pnpm` version from `packageManager`
- lint fails on generated files:
  remove local build output and rerun `pnpm lint`
- app boot fails on env:
  compare your local env with `.env.example`
- worker boot fails:
  make sure Redis is reachable
- Prisma client is stale:
  run `pnpm db:generate`

## Team Expectations

- ask for owner review early when touching `database`, `auth`, or deploy workflows
- do not introduce deep imports across package boundaries
- keep new branch scope narrow and finish with a documented PR
