# AGENTS.md

## Scope

This file applies to `apps/worker`.

## Purpose

`apps/worker` runs background jobs and automations.
It is responsible for:

- queue bootstrapping
- processors
- cron orchestration
- asynchronous side effects
- scheduled maintenance and notifications

## Worker philosophy

The worker is an execution runtime, not the source of truth for domain logic.
It must remain thin.
Business rules belong in `packages/modules`.
Job contracts and queue helpers belong in `packages/jobs`.

## Worker is allowed to do

- read job payloads
- validate payload contracts
- call application-layer use cases
- log processing context
- retry safe operations
- emit structured failure events or notifications

## Worker must not do

- invent new business rules
- duplicate validation already defined in modules
- duplicate request-routing logic
- directly embed product policy that belongs in domain modules
- become a dumping ground for one-off scripts

## Reliability rules

- Prefer idempotent jobs.
- Use explicit queue names and job names.
- Log enough context for debugging, but never secrets.
- If a job updates external state, think about retry safety first.
- If a job is not safe to retry, document that clearly.

## Product-specific likely jobs

Examples of valid worker responsibilities for this product:

- moderation scanning and delayed review tasks
- notification dispatch
- content indexing or recommendation refresh tasks
- periodic status recalculation
- request routing side effects
- analytics aggregation jobs

## Boundaries

- Job processor code stays thin.
- Call well-named public functions from domain/application modules.
- Put queue contracts in `packages/jobs`.
- Put domain policies in `packages/modules`.

## Testing rules

- Prefer integration-style coverage for worker processors.
- Test retry-sensitive and moderation-sensitive jobs carefully.
