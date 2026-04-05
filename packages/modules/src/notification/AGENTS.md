# AGENTS.md

## Scope

This file applies to `packages/modules/src/notification`.

## Purpose

This module owns user-visible notification business behavior.
Examples:

- request status updates
- moderation outcomes
- saved-item or content updates if needed

## Rules

- Notification triggers should come from business events or clear use cases.
- Do not bury business policy in channel-specific send code.
- Keep notification content safe and role-appropriate.
