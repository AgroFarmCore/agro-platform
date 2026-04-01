# Repository Blueprint

## 1. Краткое архитектурное решение

Рекомендуемый вариант: `pnpm` monorepo на базе `Turborepo` и modular monolith как основной архитектурный стиль.

Почему это лучший вариант:

- один репозиторий уменьшает операционную сложность для команды из 5 человек;
- общие типы, UI, Prisma schema, очереди и доменная логика живут рядом;
- проще code review, onboarding, refactoring и AI-assisted coding;
- можно расти без раннего дробления на микросервисы;
- отдельно разворачиваются только runtime-единицы, которые реально нужны: `web`, `portal`, `backoffice`, `worker`.

Почему это удобно именно для этой команды:

- мало инфраструктурного шума;
- проще держать единые coding standards и import rules;
- локальная разработка не требует координации между несколькими репозиториями;
- tech lead может контролировать архитектурные границы через package boundaries и lint rules, а не через договорённости в чатах.

## 2. Предлагаемая структура репозитория

```text
/
  apps/
    web/
    portal/
    backoffice/
    worker/
  packages/
    auth/
    config/
    content/
    database/
    eslint-config/
    jobs/
    modules/
    observability/
    testing/
    typescript-config/
    ui/
  tooling/
    scripts/
    generators/
    templates/
  tests/
    e2e/
    smoke/
  docs/
    architecture/
    adr/
    glossary/
    incidents/
    onboarding/
    ownership/
    release/
    runbooks/
    standards/
  .github/
    workflows/
    ISSUE_TEMPLATE/
  package.json
  pnpm-workspace.yaml
  turbo.json
  tsconfig.base.json
  .editorconfig
  .gitignore
  .npmrc
  .nvmrc
  .env.example
```

## 3. Разделение на приложения и пакеты

### Apps

`apps/web`

- публичный маркетинговый сайт и контентные страницы;
- хранит только web-specific UI, layout, route handlers для публичного контента;
- не хранит бизнес-операции кабинетов, админский workflow и прямой Prisma-доступ.

`apps/portal`

- единый Next.js кабинет для фермера и поставщика;
- разделение делается через route groups, permissions и модульный application layer;
- нельзя смешивать туда backoffice-функции и raw SQL/Prisma логику.

`apps/backoffice`

- админка и операционные интерфейсы;
- живут moderation, manual ops, support tools, internal dashboards;
- нельзя класть туда доменную логику, которую должен переиспользовать `portal` или `worker`.

`apps/worker`

- отдельный runtime для BullMQ workers, cron orchestration и asynchronous processing;
- процессоры должны быть тонкими и вызывать код из `packages/modules`;
- нельзя дублировать бизнес-правила, валидаторы и интеграционный код, уже лежащий в packages.

`apps/cms`

- не создавать на старте как обязательный runtime;
- основной стартовый вариант: typed content в `packages/content` и публикация в `apps/web`;
- отдельный CMS app добавлять только когда появится реальная editorial workflow потребность.

### Packages

`packages/ui`

- shared design system, primitives, form controls, app shell blocks;
- хранить только переиспользуемый UI;
- нельзя класть domain logic, data fetching и app-specific business hooks.

`packages/database`

- Prisma schema, migrations, seed, DB client factory, transaction helpers;
- это единственное место для схемы и миграций;
- нельзя класть туда use cases, permissions, UI и queue processors.

`packages/modules`

- основная backend-like бизнес-логика продукта;
- внутри лежат модульные bounded contexts: `access`, `farmer`, `supplier`, `catalog`, `order`, `recommendation`, `analytics`, `billing`, `notification`, `integration`;
- нельзя делать свалку из cross-cutting helpers без доменной принадлежности.

`packages/jobs`

- queue names, job contracts, enqueue helpers, retry defaults;
- не хранит тяжёлую предметную логику;
- processors и orchestration вызывают application layer модулей.

`packages/content`

- контентные schemas, типы, content queries, мапперы из контента в view models;
- не хранит бизнес-модели заказов, рекомендаций и учёта.

`packages/auth`

- auth config, session helpers, RBAC/permission adapters, guards;
- не хранит доменные use cases.

`packages/config`

- env validation, runtime config, feature flags bootstrap;
- не хранит бизнес-логику и не превращается в общий util dump.

`packages/observability`

- logging, tracing, metrics, Sentry/OpenTelemetry bootstrap;
- не хранит предметную аналитику продукта.

`packages/testing`

- test factories, fixtures, mocks, DB helpers, auth helpers, queue test utilities;
- не хранит production logic.

`packages/eslint-config`

- общие lint presets, import boundaries rules.

`packages/typescript-config`

- базовые TS presets для `nextjs`, `node`, `package`.

`packages/shared`

- не создавать на старте;
- если когда-нибудь понадобится, это должен быть очень маленький `shared-kernel` с несколькими безопасными примитивами;
- туда нельзя складывать всё непонятное.

## 4. Архитектурные границы

Слои внутри `packages/modules`:

- `domain`: сущности, value objects, domain services, domain events, policies;
- `application`: use cases, commands, queries, orchestration;
- `infrastructure`: Prisma repositories, Redis adapters, external providers;
- `contracts`: DTO, zod schemas, public module API;

Правила зависимостей:

- `apps/*` могут зависеть только от public API packages;
- `application` зависит от `domain` и контрактов;
- `infrastructure` зависит от `application` и `domain`, но не наоборот;
- `ui` не импортирует `database`;
- `web` не импортирует `backoffice`;
- `worker` не содержит уникальной business logic;
- глубокие импорты внутрь `src/.../infrastructure/*` запрещены.

Как избегать циклов:

- межмодульное общение только через public API модуля;
- нельзя импортировать соседний модуль через внутренний путь;
- если два модуля зависят друг от друга, выносить общее взаимодействие в контракт или application event, а не в прямой двусторонний import.

Как не превратить shared в мусорку:

- не создавать `shared` по умолчанию;
- любой новый общий код должен сначала прожить в доменном модуле;
- выносить в package только когда есть минимум два независимых потребителя и стабильный API.

## 5. Backend-архитектура внутри репозитория

Рекомендуемая структура модуля:

```text
packages/modules/src/order/
  contracts/
    order.contract.ts
    order.schemas.ts
  domain/
    entities/
    value-objects/
    events/
    policies/
  application/
    commands/
    queries/
    services/
  infrastructure/
    repositories/
    prisma/
    integrations/
  jobs/
    enqueue/
    handlers/
  notifications/
  analytics/
  index.ts
```

Практические правила:

- `services` использовать для orchestration/use case logic, а не как безразмерную папку;
- `repositories` только как адаптеры к БД или внешнему хранению;
- `schemas` и `validators` держать рядом с контрактами или use case boundaries;
- `policies` и `permissions` не размазывать по apps, а держать в `access` и доменных модулях;
- `events` использовать для реакций между модулями и для постановки job, а не как сложную event-driven платформу;
- `notifications`, `recommendations`, `analytics` держать отдельными модулями, но вызывать из use cases других модулей через публичные контракты.

## 6. Работа с базой данных

Рекомендуемый layout:

```text
packages/database/
  prisma/
    schema.prisma
    migrations/
    seed.ts
  src/
    client.ts
    transaction.ts
    testing.ts
```

Правила:

- одна Prisma schema на старте;
- группировать модели по доменным секциям внутри `schema.prisma`;
- миграции создаются только из `packages/database`;
- нельзя редактировать уже применённые migrations;
- каждый PR с изменением схемы включает migration и обновление seed/fixtures при необходимости;
- приложения не используют Prisma напрямую, кроме очень тонких server adapters или read-only app composition;
- основной доступ к данным идёт через repositories в `packages/modules`;
- тестовая БД отдельная: либо `DATABASE_URL_TEST`, либо disposable container в CI.

## 7. Фоновые задачи и автоматизация

Рекомендуемый подход:

```text
packages/jobs/
  src/
    contracts/
    enqueue/
    queues/
    retry/

apps/worker/
  src/
    bootstrap/
    processors/
```

Правила:

- queue names: по домену, например `notifications`, `recommendations`, `integrations`, `analytics`;
- job names: `module.action`, например `recommendation.generate-for-farm`;
- payload contracts: zod schemas в `packages/jobs/src/contracts`;
- web и portal ставят job через enqueue helpers;
- worker processors остаются тонкими и вызывают `packages/modules`;
- идемпотентность обязательна для задач с retry;
- retry default: `attempts=5` + exponential backoff для безопасных задач;
- для критичных интеграций закладывать DLQ/failed-job handling и manual replay runbook;
- для надёжной постановки задач после DB transaction использовать outbox pattern там, где потеря job неприемлема.

## 8. Контент и CMS

Основной стартовый вариант:

- отдельный `apps/cms` не поднимать сразу;
- контент хранить типизированно в `packages/content`;
- `apps/web` отвечает за rendering и SEO;
- контентные модели, view models и content queries не смешиваются с заказами, поставщиками и рекомендациями.

Когда нужен отдельный CMS app:

- контент публикуют не разработчики;
- появляются workflow редакции, approval, localization, scheduled publish.

Важно:

- контентный слой не использует те же модели Prisma, что транзакционный бизнес-слой;
- публичный контент не должен тащить зависимости из `packages/modules`.

## 9. Тестирование

Рекомендация по слоям тестов:

- unit: colocated рядом с кодом;
- integration: рядом с модулем или в `packages/modules/tests`;
- e2e: `tests/e2e`;
- smoke: `tests/smoke`;
- общие утилиты: `packages/testing`.

Инструменты и правила:

- `Vitest` для unit и integration;
- `Playwright` для e2e и smoke;
- `packages/testing` хранит factories, fixtures, mocks, queue helpers, auth helpers;
- integration tests поднимают реальную тестовую БД и Redis там, где это нужно;
- smoke checks покрывают login, critical dashboard, queue enqueue, basic public pages.

## 10. DX и tooling

Рекомендуемый набор:

- `pnpm workspace`
- `Turborepo`
- `ESLint` flat config
- `Prettier`
- без TS project references на старте; достаточно `tsconfig.base.json` и package-level configs
- `husky` + `lint-staged`
- `commitlint` не обязателен на старте
- `changesets` не нужен, если это private product monorepo без публикации пакетов
- env validation через `zod` или `envalid` в `packages/config`
- secrets: `.env.local` локально, staging/prod secrets через GitHub Environments и managed secret store
- code generation: Prisma client, optional typed API clients, optional content type generation

## 11. CI/CD и GitHub

Нужно заложить сразу:

- `.github/workflows/ci.yml`
- `.github/workflows/deploy-staging.yml`
- `.github/workflows/deploy-production.yml`
- `PULL_REQUEST_TEMPLATE.md`
- `CODEOWNERS`
- issue templates
- Dependabot config

PR checks:

- install
- lint
- typecheck
- unit/integration tests
- changed apps build

Branch protection:

- прямые pushes в `main` запрещены;
- минимум 1 reviewer;
- все required checks зелёные;
- CODEOWNERS review для критичных областей: database, auth, modules, deploy.

Deploy assumptions:

- `web`, `portal`, `backoffice` как отдельные Next.js deployments;
- `worker` как отдельный long-running container;
- отдельные staging/prod Postgres и Redis;
- preview environments для UI apps на PR.

## 12. Документация внутри репозитория

```text
docs/
  architecture/
  adr/
  onboarding/
  runbooks/
  release/
  incidents/
  standards/
  ownership/
  glossary/
```

Что хранить:

- `architecture`: repo structure, boundaries, module map;
- `adr`: ключевые архитектурные решения;
- `onboarding`: local setup, first task checklist;
- `runbooks`: DB restore, queue incidents, rollout, rollback;
- `release`: release checklist;
- `incidents`: incident templates и postmortems;
- `standards`: naming, testing, imports, API conventions;
- `ownership`: владельцы модулей и app areas;
- `glossary`: бизнес-термины.

## 13. Правила для команды

- package names: `@agro/<name>`;
- folder names: `kebab-case`;
- module names: по бизнес-способности, а не по технической сущности;
- новый package создаётся только если есть отдельный жизненный цикл и минимум два потребителя;
- нельзя создавать package ради одной функции или одного hook;
- public API package оформляется через `index.ts` и `exports`;
- deep imports запрещены;
- у каждого package и app есть короткий `README.md` с purpose, public API, allowed deps и owner;
- не делать `BaseService`, `BaseRepository`, `AbstractManager` без реальной повторяемой проблемы;
- повторить код два раза допустимо, абстрагировать на третьем устойчивом кейсе.

## 14. Что создать в самом первом коммите

- `package.json`
- `pnpm-workspace.yaml`
- `turbo.json`
- `tsconfig.base.json`
- `.editorconfig`
- `.gitignore`
- `.npmrc`
- `.nvmrc`
- `.env.example`
- `.github/`
- `docs/`
- `apps/`
- `packages/`
- `tests/`
- `tooling/`
- root `README.md`

## 15. Итоговое решение

Финальный выбор:

- monorepo;
- `pnpm` + `Turborepo`;
- modular monolith;
- несколько runtime apps без микросервисной сети;
- доменная логика сосредоточена в `packages/modules`;
- БД и jobs вынесены в отдельные инфраструктурные packages;
- контентный слой отделён от транзакционного продукта.

Ключевые плюсы:

- просто объяснить и поддерживать;
- удобно для ежедневной командной работы;
- хорошо масштабируется по модулям и runtime-единицам;
- удобно для Codex и AI-assisted coding благодаря явным boundaries.

Ключевые риски:

- если разрешить deep imports, границы быстро расползутся;
- если создать `shared` слишком рано, он станет свалкой;
- если дублировать бизнес-логику в worker и apps, появится рассинхрон.

Чего не делать:

- не делить всё на микросервисы на старте;
- не создавать по package на каждую маленькую сущность;
- не тянуть Prisma и SQL в UI apps без нужды;
- не смешивать контентные модели и бизнес-транзакции;
- не делать магические generic abstractions раньше времени.

## Стартовый набор scripts

```json
{
  "dev": "turbo dev --parallel",
  "build": "turbo build",
  "lint": "turbo lint",
  "typecheck": "turbo typecheck",
  "test": "turbo test",
  "format": "prettier --check .",
  "format:write": "prettier --write .",
  "db:generate": "pnpm --filter @agro/database db:generate",
  "db:migrate": "pnpm --filter @agro/database db:migrate",
  "db:seed": "pnpm --filter @agro/database db:seed",
  "db:studio": "pnpm --filter @agro/database db:studio",
  "check": "pnpm lint && pnpm typecheck && pnpm test"
}
```

## Правила импортов и ownership

- app code импортирует только public package APIs;
- `packages/modules/*/infrastructure` нельзя импортировать из app напрямую;
- `packages/ui` не зависит от `packages/database` и `packages/modules`;
- `packages/database` не знает о web, portal, backoffice;
- module owners фиксируются в `docs/ownership/module-ownership.md` и `CODEOWNERS`.

## Первый набор файлов-конфигов

- `package.json`
- `pnpm-workspace.yaml`
- `turbo.json`
- `tsconfig.base.json`
- `.editorconfig`
- `.gitignore`
- `.npmrc`
- `.nvmrc`
- `.env.example`
- `.github/CODEOWNERS`
- `.github/PULL_REQUEST_TEMPLATE.md`
- `.github/workflows/ci.yml`
