# Module Ownership

This file defines the default ownership map for handoff and review routing.

## Team Roles

- `@team/platform` - architecture, CI/CD, workspace tooling, release safety
- `@team/backend` - database, modules, worker, integrations
- `@team/web` - public website and content presentation
- `@team/app` - authenticated product surfaces
- `@team/ops` - operational workflows, support tooling, incident execution

## Ownership Matrix

- `apps/web`: `@team/web`
- `apps/portal`: `@team/app`
- `apps/backoffice`: `@team/app` + `@team/ops`
- `apps/worker`: `@team/backend`
- `packages/database`: `@team/backend` + `@team/platform`
- `packages/auth`: `@team/backend` + `@team/platform`
- `packages/config`: `@team/platform`
- `packages/content`: `@team/web`
- `packages/jobs`: `@team/backend`
- `packages/modules/access`: `@team/backend` + `@team/platform`
- `packages/modules/analytics`: `@team/backend`
- `packages/modules/billing`: `@team/backend`
- `packages/modules/catalog`: `@team/backend` + `@team/app`
- `packages/modules/farmer`: `@team/backend` + `@team/app`
- `packages/modules/integration`: `@team/backend`
- `packages/modules/notification`: `@team/backend`
- `packages/modules/order`: `@team/backend` + `@team/app`
- `packages/modules/recommendation`: `@team/backend`
- `packages/modules/supplier`: `@team/backend` + `@team/app`
- `packages/observability`: `@team/platform`
- `packages/testing`: `@team/platform`
- `packages/ui`: `@team/web` + `@team/app`
- `.github/workflows`: `@team/platform`
- `docs/runbooks`: `@team/platform` + `@team/ops`
- `docs/release`: `@team/platform`

## Review Rules

- any schema or migration change requires `@team/backend`
- any deploy or CI workflow change requires `@team/platform`
- any access control or auth change requires both `@team/backend` and `@team/platform`
- any backoffice workflow change requires `@team/ops`
- cross-app UI primitives require `@team/web` or `@team/app` based on consumers

## Delivery Rules

- one owner writes the implementation
- one owner reviews for correctness in the same area
- platform reviews architectural boundary changes
- incident hotfixes must still update docs after merge

`CODEOWNERS` should mirror these zones as closely as GitHub path matching allows.
