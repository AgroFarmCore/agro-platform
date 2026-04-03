# apps/worker

Purpose: background jobs, queue binding, and automation runtime.

Owner: `@team/backend`

Keep here:

- worker bootstrap
- queue-to-processor wiring
- cron orchestration

Do not keep here:

- unique business rules
- UI
- content rendering logic

Allowed dependencies:

- `@agro/jobs`
- `@agro/modules`
- `@agro/observability`
- `@agro/config`
