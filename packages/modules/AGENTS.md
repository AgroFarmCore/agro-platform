# AGENTS.md

## Scope

This file applies to `packages/modules` and all current domain modules unless a deeper `AGENTS.md` overrides it.

## Purpose

`packages/modules` contains the core business logic of the product.
This is the main home for product rules.

Current or planned bounded contexts include:

- access
- analytics
- billing
- catalog
- farmer
- integration
- notification
- order
- recommendation
- supplier

Recommended future additions for this product:

- consent
- lead
- moderation
- content-management
- later: farm / livestock split if `farmer` becomes too broad

## Domain philosophy

Each module should have a clear business capability.
Modules should not be technical junk drawers.
If a piece of logic answers a product-policy question, it likely belongs here.

## Expected internal structure

A typical module may contain:

- `contracts/`
- `domain/`
- `application/`
- `infrastructure/`
- optional `jobs/`
- optional `notifications/`
- optional `analytics/`
- `index.ts`

## Layer rules

- `domain` must not depend on `infrastructure`
- `application` may orchestrate domain logic
- `infrastructure` adapts storage or external systems
- `contracts` expose public types and validation boundaries

## Product-specific rules

This project depends heavily on domain clarity.
Important cross-cutting concerns include:

- hiding direct contact information
- routing supplier requests through platform-controlled flows
- moderation and approval behavior
- role-aware permissions
- content correction proposals
- request and status tracking
- recommendation relevance without aggressive sales behavior

These concerns must live in clear modules and use cases.
Do not scatter them across apps.

## Anti-bypass rule

Any logic related to preventing users and suppliers from bypassing the platform belongs in modules, not in UI-only code.
This includes:

- request flow design
- visibility of contact data
- moderation flags for leaked contact details
- policies for what suppliers may publish

## Boundaries

- Do not create `shared`-style dumping grounds inside modules.
- Do not call sibling module internals through deep imports.
- Inter-module communication should go through public APIs.

## Naming rules

- Name modules by business capability, not by technical implementation.
- Name use cases with clear verb + noun style.
- Prefer explicit policies and states.

## Testing rules

- Domain and application logic should be tested here.
- High-risk policy logic should have direct coverage.
