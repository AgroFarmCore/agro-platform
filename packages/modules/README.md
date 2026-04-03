# packages/modules

Purpose: main business logic of the modular monolith.

Owner: `@team/backend`

Planned modules:

- `access`
- `farmer`
- `supplier`
- `catalog`
- `order`
- `recommendation`
- `analytics`
- `billing`
- `notification`
- `integration`

Rule:

Expose module contracts through public APIs and do not couple apps to internal
paths.
