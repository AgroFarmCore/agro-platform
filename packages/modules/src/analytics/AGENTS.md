# AGENTS.md

## Scope

This file applies to `packages/modules/src/analytics`.

## Purpose

This module owns product-facing analytics logic.
It is not the same as low-level observability.

## Likely responsibilities

- product event aggregation
- request funnel summaries
- content and catalog usage summaries
- supplier-facing basic stats if modeled here

## Rules

- Keep product analytics separate from observability and logging.
- Do not overbuild reporting in MVP.
- Prefer summaries that are directly useful to dashboard or backoffice needs.
