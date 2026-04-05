# AGENTS.md

## Scope

This file applies to `apps/web`.

## Purpose

`apps/web` is the public-facing website.
It contains:

- landing page
- public navigation
- livestock-first public content area
- news pages
- article pages
- practical materials pages
- public product catalog pages
- supplier landing pages
- registration entry points and calls to action
- public forms such as contact and supplier inquiry forms

## This app is for

- guests
- search traffic
- content discovery
- SEO pages
- first conversion into registration or supplier inquiry

## This app is not for

- authenticated dashboard workflows
- supplier management operations
- backoffice moderation
- direct Prisma access
- complex business orchestration

## Product rules

- This app must communicate value quickly.
- It must feel trustworthy, useful, and simple.
- It must not look like an aggressive marketplace.
- Content should lead toward helpful next actions, not noisy sales.
- The livestock section is first-class; plant-production content should not be treated as equally complete unless it is actually implemented.

## UX rules

- Every page must have clear hierarchy.
- Primary CTA must be obvious.
- Avoid dense or technical language unless necessary.
- Use stable, familiar patterns.
- Always implement loading, empty, error, and not-found states.

## Content rules

- Public pages can render content from `packages/content`.
- Do not mix editorial content rendering with transactional business logic.
- Keep article presentation separate from comments and separate from supplier request workflows.
- If a page mixes article content and related products, the related products must be secondary to the material itself.

## Catalog rules

- Public users may browse products.
- Direct supplier contact data must not be displayed.
- Product pages should use platform CTAs such as:
  - request offer
  - ask for availability
  - request consultation
- If a product description contains contact information, the content must be treated as moderated or sanitized upstream.

## Implementation boundaries

- Prefer presentation and route composition here.
- Put reusable UI in `packages/ui` only when it is truly reused.
- Put content models and content queries in `packages/content`.
- Put domain logic in `packages/modules`.
- Do not create app-specific business logic utilities that should live in modules.

## Data and fetching rules

- Keep data fetching predictable and explicit.
- Prefer server-side patterns already used in the app.
- Avoid duplicate data-loading logic across multiple routes when a shared app-layer helper is more appropriate.
- Do not fetch the database directly from arbitrary components.

## SEO rules

- Pages should have meaningful titles and metadata.
- Article pages must support share-friendly metadata.
- Landing pages and category pages should be readable by search engines.
- Avoid thin placeholder pages.

## Design and UI rules

- `apps/web` should feel editorial and trustworthy.
- It should not visually resemble the internal portal.
- Use shared UI primitives but allow page-level composition here.
- Do not over-generalize page sections into reusable components too early.

## Testing rules

- Test route-level critical behavior.
- Test rendering logic that branches by content state.
- Prefer integration tests for key public flows over over-abstracted unit tests.
