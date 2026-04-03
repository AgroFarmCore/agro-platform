# Contributing

This repository is a private product monorepo. The goal of this guide is to
make day-to-day work predictable for frontend, backend, ops, and platform
contributors.

## Workflow

1. Create a short-lived branch from `main`.
2. Keep scope limited to one change request or one tightly related slice.
3. Run local checks before opening a pull request.
4. Open a PR using the repository template.
5. Merge only after required checks and required owners approve.

## Branch Strategy

- protected branch: `main`
- default branch prefix: `feature/<area>-<ticket-or-scope>`
- bugfix branch prefix: `fix/<area>-<ticket-or-scope>`
- hotfix branch prefix: `hotfix/<area>-<incident-or-scope>`
- spike branch prefix: `spike/<area>-<question>`

Examples:

- `feature/portal-order-filters`
- `fix/worker-retry-policy`
- `hotfix/database-rollback-2026-04-03`

Rules:

- do not push directly to `main`
- do not keep long-lived personal branches
- rebase or merge `main` frequently for branches older than 1 day
- split cross-cutting work into multiple PRs when ownership differs

## Ownership And Scope

- app-specific UI and routing live in `apps/*`
- reusable domain logic lives in `packages/modules`
- schema, migrations, and seed live in `packages/database`
- queue contracts and enqueue helpers live in `packages/jobs`
- shared UI primitives live in `packages/ui`

When in doubt, prefer keeping code in the domain module first and extracting
later only after a second stable consumer appears.

## Local Setup

Use the onboarding guide in [docs/onboarding/README.md](/D:/Agro/docs/onboarding/README.md).

Base commands:

```bash
pnpm install
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Definition Of Ready

A task is ready for implementation when:

- the owning app or module is known
- acceptance criteria are written
- data and integration impact are known
- affected owners are identified
- rollout risk is understood

## Definition Of Done

A change is done when:

- code is merged through a PR
- local quality checks pass
- docs are updated when behavior or workflow changes
- migrations are included when schema changes
- observability or support notes are added for risky operational changes
- reviewers can identify owner, scope, and rollback plan from the PR

## Pull Request Expectations

- keep PRs reviewable in under 400 changed lines where possible
- call out risky files explicitly
- include screenshots for UI changes
- include test notes even when no tests were added
- mention follow-up work instead of silently leaving gaps

## Review Routing

- request the owner of the touched app or package first
- request platform review for `database`, `auth`, `modules`, and deploy changes
- request ops review for backoffice and incident-related workflow changes

## Releases And Incidents

- release checklist: [docs/release/README.md](/D:/Agro/docs/release/README.md)
- runbooks: [docs/runbooks/README.md](/D:/Agro/docs/runbooks/README.md)
- incident process: [docs/incidents/README.md](/D:/Agro/docs/incidents/README.md)
