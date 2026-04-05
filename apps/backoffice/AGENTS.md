# AGENTS.md

## Scope

This file applies to `apps/backoffice`.

## Purpose

`apps/backoffice` is the internal operational interface.
It is for platform staff, not end users.

It should contain:

- moderation queues
- support workflows
- internal review screens
- operational dashboards
- manual intervention tools
- future anti-abuse and incident support interfaces

## This app is not for

- public content delivery
- normal farmer workflows
- normal supplier workflows
- reusable domain logic
- worker processing

## Product rules

- Backoffice is a tool for internal clarity and safety.
- Optimize for traceability, moderation speed, and operational correctness.
- Internal tools may be visually simpler than the public app, but must remain clear and stable.

## Current priority workflows

Backoffice should eventually support:

- article/comment/review moderation
- supplier product moderation
- user correction proposal review
- anti-contact-leak moderation
- request and complaint review
- role and access support workflows

## Boundaries

- Domain rules still belong in `packages/modules`.
- This app should orchestrate internal operations through public APIs, not own business rules itself.
- Do not hide critical moderation logic only in the UI layer.

## Moderation rules

- Internal actions should preserve auditability where possible.
- Distinguish between approve, reject, hide, escalate, and send-back-for-edit actions.
- If an action changes visible public state, the action must be explicit.
- Prefer explicit internal statuses over magic booleans.

## Safety rules

- Backoffice actions may be high impact.
- Treat deletion, hiding, or publishing actions as privileged operations.
- Add confirmation patterns where the action is irreversible or user-visible.

## Testing rules

- Cover high-risk internal actions with integration tests where possible.
- Prioritize moderation state transitions and access controls.
