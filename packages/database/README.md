# packages/database

Purpose: single home for Prisma schema, migrations, seed, and DB helpers.

Owner: `@team/backend` and `@team/platform`

Public API:

- Prisma client factory
- transaction helpers
- schema and migration commands

Allowed dependencies:

- Prisma tooling
- low-level runtime configuration

Do not put here:

- use cases
- permissions
- UI concerns
