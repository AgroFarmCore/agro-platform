# tests

Top-level test workspaces for cross-app validation.

- `e2e` - user journeys across `web`, `portal`, and `backoffice`
- `smoke` - short post-deploy checks for critical routes and boot paths

Shared fixtures and helpers belong in `packages/testing`.

## Minimum Expected Coverage

- public home page renders
- authenticated portal shell loads
- backoffice shell loads for admin
- worker starts and can bind processors
- at least one critical queue enqueue path is validated
