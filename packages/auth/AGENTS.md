# AGENTS.md

## Scope

This file applies to `packages/auth`.

## Purpose

This package owns authentication and authorization support.
It may include:

- auth configuration
- session helpers
- role and permission adapters
- guards and access helpers
- shared auth-facing contracts if needed

## Product rules

- Access must be explicit.
- Role handling must be easy to review.
- Do not hide important permission behavior in generic helpers.
- If user role or supplier role affects what can be seen or done, the rule should be obvious.

## Boundaries

- This package is not the place for domain-specific business workflows.
- It should not contain catalog rules, moderation queues, article publishing flows, or request-routing logic.
- It may support access checks used by those flows.

## Safety rules

- Auth and access changes are high risk.
- Prefer clarity over abstraction.
- Changing role behavior requires extra caution.
- Never weaken permission checks for convenience.

## Testing rules

- Add tests for non-trivial access logic.
- Focus on role boundaries and denial cases.
