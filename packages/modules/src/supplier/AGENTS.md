# AGENTS.md

## Scope

This file applies to `packages/modules/src/supplier`.

## Purpose

This module owns supplier-side business behavior.
It should cover:

- supplier profile domain logic
- supplier eligibility and status rules
- supplier-facing product ownership rules
- supplier-facing request handling behavior where appropriate

## Product rules

- Suppliers participate through the platform.
- Supplier data exposure must follow platform policy.
- Supplier flows must not create uncontrolled direct-contact leakage.
- Supplier profile and product state may be moderated.

## This module is not for

- public page rendering
- UI concerns
- full moderation orchestration if a dedicated moderation module exists
