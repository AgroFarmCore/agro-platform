# AGENTS.md

## Scope

This file applies to `packages/modules/src/recommendation`.

## Purpose

This module owns recommendation behavior.
At the current stage, recommendations are meant to help users, not overwhelm them.

## Product rules

- Recommendations must feel relevant and useful.
- Avoid aggressive commercial behavior.
- Recommendations should be explainable where practical.
- Content recommendations and product recommendations should not be confused.

## Likely responsibilities

- recommended materials
- related products
- dashboard recommendation blocks
- future rules based on farm or behavior data

## Important caution

Do not introduce speculative ML complexity in MVP.
Simple, explicit, rule-based recommendation logic is preferred until the product justifies more.
