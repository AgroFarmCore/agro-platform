# AGENTS.md

## Scope

This file applies to `packages/ui`.

## Purpose

This package owns shared UI primitives and reusable components.

## Rules

- Only put code here if it is genuinely reused or clearly intended for multiple consumers.
- Do not place domain logic here.
- Do not place data fetching here.
- Do not place request-routing or moderation business behavior here.

## Design rules

- Components should be accessible and predictable.
- Prefer simple APIs.
- Avoid over-configurable mega-components.
- Keep visual consistency, but do not force every page into the same abstraction too early.

## Product-specific UI rules

- Public-site editorial blocks and portal app-shell blocks may both use shared primitives, but page-level behavior belongs in apps.
- UI should support calm, trustworthy product behavior.
- Avoid patterns that look like ad-tech dashboards.
