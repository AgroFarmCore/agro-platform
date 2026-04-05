# AGENTS.md

## Scope

This file applies to `apps/portal`.

## Purpose

`apps/portal` is the authenticated product surface.
It contains the user-facing portal for:

- farmers
- suppliers
- future role-aware authenticated experiences

## Current MVP scope

Portal must cover:

- login and authenticated entry
- user dashboard
- supplier dashboard
- saved materials
- saved products
- request history
- comment and contribution surfaces
- article correction proposals
- supplier profile and product management
- notifications and status surfaces where available

## Product rules

- The dashboard must provide immediate value.
- Do not ship an intentionally empty dashboard.
- If real analytics is not ready, show useful blocks such as saved items, recent requests, status summaries, moderation outcomes, or recommended materials.
- Role-aware behavior must be explicit and easy to review.

## Roles

This app serves at least these role families:

- standard authenticated user / farmer
- supplier
- moderator or admin only when a flow truly belongs in the portal and not backoffice

## This app is not for

- internal support workflows that belong in `apps/backoffice`
- queue processing
- direct database access from arbitrary UI code
- duplicated domain rules

## UX rules

- The portal should feel functional and calm.
- Prioritize readability and task completion.
- Avoid dashboard clutter.
- Users must always understand what they can do next.
- Forms must have explicit validation and clear success/error states.

## Supplier-specific rules

- Suppliers can manage profile and products only through approved portal flows.
- Supplier contact information must be handled by platform policy.
- Do not add UI that leaks direct contact paths outside approved rules.
- Product publishing should assume moderation or approval if the domain layer requires it.

## User contribution rules

- Users may comment where enabled.
- Users may suggest changes to materials.
- Users should not directly publish unmoderated long-form articles unless explicitly designed and approved.
- If article authoring is added, default to moderation-first workflow.

## Boundaries

- Keep UI and page composition in the app.
- Keep domain logic in `packages/modules`.
- Keep auth/session adapters in `packages/auth`.
- Keep reusable form controls and primitives in `packages/ui`.
- Do not place request-routing logic only in client components.

## State and data rules

- Be explicit about role-based rendering.
- Avoid hidden permission branching scattered across many components.
- Prefer a small number of composition points that call clearly named actions or queries.
- If a flow mutates data, ensure the mutation boundary is obvious and validated.

## Testing rules

- Cover critical authenticated flows.
- Cover role-based access at the app level when possible.
- Cover request submission, saved-item behavior, and supplier product management flows where implemented.
