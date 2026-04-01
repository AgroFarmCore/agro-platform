# Import Rules

## Allowed

- `apps/*` -> `packages/*` through public API only
- `packages/modules/*/application` -> same module `domain`
- `packages/modules/*/infrastructure` -> same module `application` and `domain`
- `packages/jobs` -> `packages/modules` public APIs

## Forbidden

- `apps/*` -> deep import into `packages/*/src/**`
- `packages/ui` -> `packages/database`
- `packages/ui` -> `packages/modules`
- one module internal path -> another module internal path
- `domain` -> `infrastructure`
- `database` -> `apps/*`

## Review Heuristics

- если import выглядит слишком длинным или "внутренним", скорее всего он неправильный;
- если код нужен двум приложениям, сначала ищем место в модуле, а не в `shared`;
- если app хочет использовать Prisma напрямую, нужен отдельный review.
