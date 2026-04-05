# AGENTS.md

## Scope

This file applies to `packages/modules/src/order`.

## Purpose

This module should only own order-like transactional flows if they truly exist in MVP.
At the current stage, be careful not to over-build marketplace ordering features.

## Product rule

Current MVP is closer to controlled request flow than full checkout-commerce.
Do not assume a full e-commerce order pipeline unless explicitly specified.

## Guidance

If the current feature is really about:

- request submission
- offer inquiry
- consultation request
- availability request

then avoid forcing it into a full order model too early.
Prefer simpler request-oriented modeling unless the business flow truly requires order semantics.
