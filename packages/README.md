# packages

Reusable packages inside the monorepo.

## Package Types

- platform: `config`, `auth`, `observability`, `testing`
- business: `modules`, `jobs`, `content`
- infrastructure: `database`
- frontend foundation: `ui`
- repo tooling: `eslint-config`, `typescript-config`

## Rule

Create a package only when it has a clear responsibility, a stable public API,
and at least two realistic consumers.
