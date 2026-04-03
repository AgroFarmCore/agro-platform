# Release

This document defines the default release flow for the foundation repository.

## Release Principle

- every change merges into `main` through a reviewed PR
- `main` is always expected to stay deployable
- staging validates the latest integrated state
- production is promoted only from a known-good `main`

## Pre-Merge Checklist

- CI is green
- affected owner reviewed the change
- migrations are included when schema changed
- docs are updated when workflow, architecture, or operations changed
- rollback notes are present for risky changes

## Staging Flow

1. Merge approved PR into `main`.
2. Let staging deploy from `main`.
3. Validate critical paths:
   public page load, portal login shell, backoffice shell, worker boot, database connectivity.
4. Record failures in the incident log if rollback or hotfix is needed.

## Production Flow

1. Confirm staging is healthy.
2. Confirm open incidents are not blocking release.
3. Confirm no pending migration concern remains unresolved.
4. Trigger production deployment with approval gate.
5. Run smoke checks after deploy.
6. Announce completion in the release channel with version scope and rollback owner.

## Smoke Checklist

- `web` home page responds
- `portal` authenticated shell renders
- `backoffice` shell renders for admin
- `worker` starts and connects to Redis
- migrations completed successfully
- critical queues are not stuck

## Rollback Rule

If user-facing risk is high and recovery is unclear within 15 minutes, prefer
rollback first and root-cause analysis second.
