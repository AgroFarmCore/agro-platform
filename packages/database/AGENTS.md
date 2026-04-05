# AGENTS.md

## Scope

This file applies to `packages/database`.

## Purpose

This package owns:

- Prisma schema
- migrations
- seed data
- database client setup
- DB test helpers where needed

## Safety level

This is a high-risk package.
Schema and migration changes affect the entire product.
Be conservative.

## Rules

- Keep one source of truth for schema here.
- Do not casually rename or delete fields without understanding migration impact.
- Do not edit already-applied migrations.
- Prefer backward-compatible changes when possible.
- Mention migration consequences in change summaries.

## Product-specific modeling guidance

The product has both content-like and transactional domains.
Keep the distinction clear.
Examples of transactional concerns:

- users
- roles
- supplier profiles
- products
- comments
- reviews
- requests
- moderation states
- recommendation outcomes

Examples of likely future domain needs that should be modeled intentionally:

- consent records
- lead/request tracking
- anti-bypass moderation artifacts
- article correction proposals
- livestock-oriented farm data

## Boundaries

- Do not place business rules here.
- Do not place UI code here.
- Do not make this package aware of app-specific route structure.
- Keep repositories and domain orchestration outside this package.

## Query discipline

- Avoid hidden performance traps.
- Prefer clear selects and relations.
- Be careful with broad eager loading.
- Keep data model naming readable and domain-aligned.

## Seed rules

- Seed only what is useful and stable.
- Do not stuff demo-only assumptions into core seeds unless explicitly needed.

## Testing rules

- If schema changes impact tests, update fixtures and test helpers.
- Prefer stable test data patterns.
