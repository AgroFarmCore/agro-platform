# AGENTS.md

## Repository purpose

This repository contains the Agro Platform product.

Current product scope:

- public website and landing pages
- news, articles, and practical materials
- livestock-first content area
- product catalog from suppliers
- authenticated user portal for farmers and suppliers
- backoffice for moderation and operations
- background jobs and automations
- recommendation and analytics foundation

This is a TypeScript-first monorepo.

Core stack:

- pnpm workspace
- Turborepo
- Next.js apps
- Node.js runtime
- PostgreSQL
- Prisma
- Redis
- BullMQ
- Vitest
- Playwright

Architecture style:

- modular monolith inside a monorepo
- runtime apps in `apps/*`
- reusable packages in `packages/*`
- domain logic in `packages/modules`

## Product priorities

When making changes, optimize for:

1. clarity for users
2. safety for the platform
3. maintainability for the team
4. explicit boundaries
5. small reviewable changes

The product is aimed at farmers and suppliers.
User experience must stay simple and calm.
Do not introduce clever flows that make the interface harder to understand.

## Current MVP priorities

The first stage is not a full agri super-app.
Focus on:

- landing page
- guest content access
- livestock section
- articles and news
- supplier product catalog
- registration and login
- user dashboard with useful non-empty content
- supplier profile and product management
- internal request flow through the platform
- comments and moderation
- content correction proposals
- hiding personal contact information

Do not expand scope casually into full billing, full ERP, complex marketplace logistics, or plant-production workflows unless explicitly requested.

## Critical product principles

- Farmers must receive value before commercial pressure.
- The platform must not feel like disguised advertising.
- Supplier and user contact exchange must stay controlled by the platform.
- Personal contact data must not be exposed in comments, reviews, product descriptions, or article text.
- Moderation is a core part of the product, not an optional afterthought.
- The dashboard must never be left intentionally empty.

## Architecture rules

- `apps/*` import only through public package APIs.
- Deep imports into internal package files are forbidden.
- `packages/ui` must not contain domain logic.
- `packages/database` must not know about `apps/*`.
- `apps/worker` must not become a second backend with duplicate business logic.
- Reusable business logic lives in `packages/modules`.
- Content logic lives in `packages/content` unless it is truly transactional domain logic.

## When modifying code

Before changing anything:

1. inspect the local directory structure
2. read the nearest `AGENTS.md`
3. preserve package boundaries
4. prefer the existing patterns already used in the repo
5. keep changes small and reviewable

## Allowed and forbidden behavior

Allowed:

- add missing tests for meaningful changes
- improve naming for clarity
- extract small focused functions when it makes code clearer
- add documentation when behavior or boundaries change

Forbidden unless explicitly requested:

- large refactors across multiple apps
- introducing new infrastructure services
- creating new shared packages too early
- bypassing validation or moderation layers
- exposing direct supplier contact details
- putting business logic into UI components
- using Prisma directly from random app code

## UX and product behavior guardrails

- Pages must be understandable within seconds.
- Prefer boring and reliable over clever and fragile.
- Always include loading, empty, error, and success states for UI flows.
- Do not create dead-end pages.
- Do not ship empty dashboards or placeholder-only product surfaces unless explicitly marked and approved.
- Guest users may browse content and product catalog, but richer interaction should encourage registration.
- Supplier flows must route through platform actions such as request submission, not direct contact reveal.

## Content and moderation guardrails

- User-submitted content is untrusted by default.
- Proposed article edits go into moderation, not directly live.
- Comments and reviews must be checked for phone numbers, emails, messengers, links, and direct contact attempts.
- If unsure whether content should be auto-published or moderated, prefer moderation.

## AI-assisted coding rules

This repository is expected to be edited with Codex and similar tools.
Rules:

- Do not generate architecture changes unless explicitly requested.
- Do not invent missing modules as if they already exist.
- If a dependency is missing, say so through code comments or task notes rather than silently assuming it exists.
- Do not hallucinate API contracts; follow code that actually exists.
- Prefer TODO comments only when a real boundary is known but not yet implemented.
- Keep generated code conservative and easy for humans to review.

## Testing expectations

For non-trivial changes:

- add or update tests where the codebase already has a fitting test layer
- prefer unit/integration tests for logic
- prefer Playwright only for critical user journeys
- do not remove tests without a clear reason

## Safety expectations

- Never hardcode secrets.
- Never commit `.env` values.
- Be careful with migrations, auth, permissions, moderation, and destructive jobs.
- Mention migration impact when changing schema.
- Mention anti-bypass impact when changing catalog/request flows.

## Delivery expectations

When finishing a task, provide a concise summary that includes:

- what changed
- what did not change
- risks or follow-ups
- tests added or missing
