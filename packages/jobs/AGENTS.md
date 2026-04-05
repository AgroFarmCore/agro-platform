# AGENTS.md

## Scope

This file applies to `packages/jobs`.

## Purpose

This package owns queue-level contracts and helpers.
It may include:

- queue names
- job names
- payload schemas
- enqueue helpers
- retry defaults
- queue-related shared types

## This package is not for

- domain business logic
- heavy orchestration use cases
- UI logic
- direct processor implementations for everything

## Rules

- Queue and job names must be explicit and domain-oriented.
- Payloads must be typed and validated.
- Enqueue helpers should be thin and predictable.
- Keep retry policy obvious.

## Product-specific likely queues

Examples:

- moderation
- notifications
- recommendation
- analytics
- integrations

## Product-specific likely job naming

Use names like:

- `moderation.scan-comment`
- `notification.send-request-update`
- `recommendation.refresh-user-feed`
- `analytics.aggregate-catalog-views`

## Boundaries

- If a job needs a business rule, call into `packages/modules`.
- Do not reimplement moderation or request-routing policy here.
