# AGENTS.md

## Scope

This file applies to `packages/modules/src/access`.

## Purpose

This module owns access-related business policy beyond raw auth bootstrapping.
It should define:

- role-aware permissions
- access decisions tied to product rules
- internal policy checks where domain meaning matters

## Rules

- Keep access behavior explicit.
- Do not hide permission decisions behind vague helpers.
- Differentiate between guest, authenticated user, supplier, moderator, and admin capabilities.
- If access depends on moderation state or content state, make that dependency obvious.

## This module is not for

- session mechanics that belong in `packages/auth`
- unrelated domain workflows
