# AGENTS.md

## Scope

This file applies to `packages/modules/src/farmer`.

## Purpose

This module currently represents farmer-side product logic.
Because the product may later split into `farm` and `livestock`, be careful not to overload this module.

## What belongs here now

- user-facing farmer profile logic
- saved materials and saved products behavior if modeled here
- farmer-side dashboard aggregates if modeled here
- farmer-side request history queries if modeled here

## What should not be dumped here casually

- all livestock data forever
- all procurement logic forever
- all recommendation logic forever
- every user-generated action in the product

## Future-proofing rule

If this module starts becoming a catch-all for farm operations, livestock records, inventory, and procurement, stop and split the domain rather than hiding complexity here.

## Product rule

Farmer flows should feel helpful and operational, not sales-heavy.
