# Agro Platform Monorepo

Foundation repository for the agro platform: public website, farmer and supplier portals, backoffice, worker, API integrations, recommendations, and analytics.

## What is already included

- `pnpm` workspace + `Turborepo`
- modular monolith inside a monorepo
- runtime apps: `web`, `portal`, `backoffice`, `worker`
- platform and business packages: `config`, `auth`, `content`, `database`, `jobs`, `modules`, `ui`, `testing`
- GitHub templates, CI foundation, and architecture documentation

## Repository state

This is not a finished product. It is a stable starting scaffold with:

- final directory structure;
- package boundaries;
- workspace manifests and scripts;
- minimal runtime entrypoints;
- architecture and team documentation.

Business logic is intentionally kept small at this stage so the codebase stays clear and easy to extend.

## Key documents

- blueprint: [repository-blueprint.md](D:/Agro/docs/architecture/repository-blueprint.md)
- repository tree: [repository-tree.md](D:/Agro/docs/architecture/repository-tree.md)
- ADR-001: [ADR-001.md](D:/Agro/docs/architecture/ADR-001.md)
- coding standards: [coding-standards.md](D:/Agro/docs/standards/coding-standards.md)
- import rules: [import-rules.md](D:/Agro/docs/standards/import-rules.md)
- contributing guide: [CONTRIBUTING.md](D:/Agro/CONTRIBUTING.md)
- onboarding: [docs/onboarding/README.md](D:/Agro/docs/onboarding/README.md)
- module ownership: [module-ownership.md](D:/Agro/docs/ownership/module-ownership.md)
- release process: [docs/release/README.md](D:/Agro/docs/release/README.md)
- runbooks: [docs/runbooks/README.md](D:/Agro/docs/runbooks/README.md)

## Base commands

```bash
pnpm install
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Top-level structure

```text
apps/       runtime applications
packages/   reusable packages and modular logic
docs/       architecture, ADRs, standards, onboarding
tests/      e2e and smoke workspaces
tooling/    helper scripts and templates
```
