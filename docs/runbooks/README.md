# Runbooks

Operational procedures that should exist before the team scales active delivery.

## Queue Incident

Symptoms:

- jobs pile up
- retries spike
- worker is disconnected from Redis

Response:

1. confirm worker deployment health
2. confirm Redis health and network connectivity
3. inspect the failing queue and the first repeated error
4. pause replay of bad jobs if the failure is destructive
5. document whether issue is data, infra, or code related

## Failed Migration

1. stop additional deploys
2. identify whether failure happened before or after partial data change
3. decide between forward fix and rollback
4. keep schema edits only inside `packages/database`
5. update release notes with impact and operator action

## Rollback

1. identify last known-good deployment
2. confirm whether schema rollback is safe
3. roll back app or worker runtime first when schema is unchanged
4. communicate rollback status in the incident channel
5. capture follow-up remediation before reattempting deploy

## Restore Access

1. identify impacted role or account type
2. confirm whether issue is auth config, permission mapping, or bad data
3. validate with a least-privilege test account
4. if temporary manual override is used, record owner and expiration

## Runbook Rule

If an operator would need to ask in chat how to recover, the missing answer
belongs in this directory.
