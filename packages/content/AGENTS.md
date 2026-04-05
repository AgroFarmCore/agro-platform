# AGENTS.md

## Scope

This file applies to `packages/content`.

## Purpose

This package owns editorial and informational content structures.
It may include:

- content schemas
- content types
- content mappers and view models
- content queries
- helpers for rendering articles, news, materials, and content sections

## Product rules

The content layer exists to inform and help farmers.
It is not merely a marketing wrapper.
Current priority content areas:

- livestock news
- livestock articles
- practical materials and guides
- future plant-production section only when explicitly implemented

## This package is not for

- supplier request workflows
- moderation business state machines
- transactional orders
- direct lead handling
- pricing logic

## Important distinction

Content is not the same as business transactions.
If a feature is about article rendering, article metadata, article categorization, or content view models, it likely belongs here.
If a feature is about user submission moderation, supplier interactions, or transactional requests, it likely belongs in domain modules.

## Content quality rules

- Prefer typed and explicit content models.
- Keep content querying predictable.
- Keep presentation-friendly mapping here when it helps apps stay thin.
- Do not let this package become a shadow business layer.

## Product-specific rules

- Livestock content should be easy to discover and prioritized in navigation.
- Plant content should not be implied as complete until it exists.
- Related products can be linked in the UI, but supplier logic should stay outside this package.
