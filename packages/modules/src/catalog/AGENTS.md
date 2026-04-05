# AGENTS.md

## Scope

This file applies to `packages/modules/src/catalog`.

## Purpose

This module owns product catalog behavior.
It should cover:

- supplier product entities and contracts
- product visibility rules
- catalog listing/query use cases
- product moderation-aware publication behavior
- product metadata used by web and portal flows

## Product rules

- Products are visible to guests and authenticated users according to publication rules.
- Direct supplier contact data must not be exposed in public product content.
- Catalog behavior must support request submission through the platform.
- Product content may be moderated.

## This module is not for

- full lead routing policy if a future `lead` module is created
- recommendation ranking logic if that belongs in `recommendation`

## Important boundary

Keep product entity logic here, but route request submission and anti-bypass policy through the appropriate module boundaries.
