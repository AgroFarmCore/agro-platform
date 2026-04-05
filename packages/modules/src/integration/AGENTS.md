# AGENTS.md

## Scope

This file applies to `packages/modules/src/integration`.

## Purpose

This module owns external-system integration logic where it has domain meaning.
Examples:

- external supplier data ingestion
- future CMS sync if needed
- moderation services
- communication providers

## Rules

- Keep provider details isolated behind adapters.
- Do not leak external API assumptions into app code.
- If a provider affects domain state, make the boundary explicit.
