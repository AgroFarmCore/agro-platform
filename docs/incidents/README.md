# Incidents

Use this template for production and staging incidents that interrupt delivery or
customer workflows.

## Incident Template

- `Summary`: what broke
- `Impact`: who was affected and how
- `Start time`
- `Detection`: how it was noticed
- `Owner`: current incident commander
- `Mitigation`: what was done immediately
- `Rollback status`
- `Follow-up actions`

## Severity Guide

- `SEV-1`: broad outage, data risk, or blocked production operations
- `SEV-2`: major user flow degraded with workaround
- `SEV-3`: localized issue without major business interruption

## Communication Rules

- one person owns updates
- post timestamped updates every 15 minutes for active SEV-1 and SEV-2 incidents
- state facts, impact, and next action separately
- open a postmortem for repeatable failures and all SEV-1 incidents
