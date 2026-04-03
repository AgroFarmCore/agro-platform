# Фундамент проекта Agro Platform

Версия документа: 2026-04-03  
Репозиторий: `agro-platform`  
Актуальная ветка с усилением фундамента: `codex/foundation-hardening`

## 1. Назначение этого документа

Этот документ нужен для быстрого входа в проект без устных пояснений. После
прочтения разработчик или тимлид должен понимать:

- из чего состоит репозиторий;
- где находится код для каждой зоны продукта;
- как создавать ветки и вести задачу до merge;
- какие правила по ownership, review и архитектурным границам уже закреплены;
- как запускать проект локально;
- какие процессы уже готовы, а какие пока остаются инфраструктурными заготовками.

## 2. Что представляет собой проект

Проект построен как `pnpm` monorepo на базе `Turborepo` с архитектурным
подходом `modular monolith`.

Это означает:

- код хранится в одном репозитории;
- продукт разбит на несколько runtime-приложений;
- общая бизнес-логика вынесена в переиспользуемые пакеты;
- архитектурные границы закреплены пакетами, документацией и review-правилами.

Такой подход выбран как стартовый фундамент для команды, чтобы:

- упростить onboarding новых разработчиков;
- избежать раннего дробления на микросервисы;
- централизовать типы, схемы, UI и доменную логику;
- уменьшить стоимость refactoring и code review.

## 3. Верхнеуровневая структура репозитория

Основные каталоги:

- `apps/` - runtime-приложения платформы;
- `packages/` - переиспользуемые пакеты и доменные модули;
- `docs/` - архитектурная, процессная и операционная документация;
- `tests/` - верхнеуровневые workspaces для `e2e` и `smoke`;
- `tooling/` - служебные скрипты и шаблоны;
- `.github/` - CI, templates, CODEOWNERS и служебные настройки GitHub.

## 4. Runtime-приложения

### `apps/web`

Публичный сайт и контентный слой.

Здесь находятся:

- маркетинговые страницы;
- SEO-маршруты;
- публичный рендеринг контента;
- публичные формы захвата лидов.

Здесь не должны находиться:

- бизнес-правила портала;
- прямой доступ к Prisma;
- админские сценарии.

### `apps/portal`

Аутентифицированный кабинет для фермера и поставщика.

Здесь находятся:

- защищенные маршруты;
- role-aware страницы;
- app shell;
- UI-композиция поверх публичных API пакетов.

Здесь не должны находиться:

- backoffice-операции;
- дублирующаяся доменная логика;
- обработчики очередей.

### `apps/backoffice`

Внутренний интерфейс операций и поддержки.

Здесь находятся:

- moderation tools;
- support workflows;
- internal dashboards.

Здесь не должны находиться:

- переиспользуемая доменная логика;
- публичный контент;
- код worker runtime.

### `apps/worker`

Фоновый runtime для очередей, автоматизаций и оркестрации задач.

Здесь находятся:

- bootstrap worker-процессов;
- привязка очередей к процессорам;
- cron orchestration.

Здесь не должны находиться:

- уникальные бизнес-правила;
- UI;
- логика рендеринга контента.

## 5. Пакеты и зоны ответственности

### Инфраструктурные и платформенные пакеты

- `packages/config` - валидация env и runtime-конфиг;
- `packages/auth` - auth и permission bootstrap;
- `packages/database` - Prisma schema, migrations, seed и DB helpers;
- `packages/observability` - логирование, tracing, telemetry bootstrap;
- `packages/testing` - test helpers и общие утилиты;
- `packages/eslint-config` - общие lint-настройки;
- `packages/typescript-config` - общие TS-конфиги.

### Бизнес- и продуктовые пакеты

- `packages/modules` - основная бизнес-логика modular monolith;
- `packages/jobs` - queue contracts, enqueue helpers и имена задач;
- `packages/content` - контентные модели и content helpers;
- `packages/ui` - shared UI kit и primitives.

## 6. Доменные модули

В `packages/modules` зарезервированы домены:

- `access`
- `analytics`
- `billing`
- `catalog`
- `farmer`
- `integration`
- `notification`
- `order`
- `recommendation`
- `supplier`

Ожидаемая структура каждого модуля:

```text
<module>/
  contracts/
  domain/
  application/
  infrastructure/
  jobs/
  index.ts
```

Правила:

- `domain` не зависит от `infrastructure`;
- взаимодействие между модулями идет через public API и контракты;
- app-код не делает deep import во внутренние пути модулей.

## 7. Архитектурные правила

В репозитории уже закреплены следующие правила:

- приложения зависят только от public API пакетов;
- deep imports запрещены;
- `packages/ui` не зависит от `packages/database` и `packages/modules`;
- `packages/database` не знает про `apps/*`;
- worker не должен хранить уникальную бизнес-логику;
- общий код не выносится в отдельный пакет без реальной повторяемости и
  стабильного API.

Практический смысл этих правил:

- проще review;
- меньше скрытых связей;
- проще менять реализацию без каскадных регрессий;
- понятнее ownership.

## 8. Ownership и review

В проекте закреплены команды-владельцы:

- `@team/platform` - архитектура, CI/CD, tooling, release safety;
- `@team/backend` - database, modules, worker, integrations;
- `@team/web` - публичный сайт и content presentation;
- `@team/app` - аутентифицированные продуктовые интерфейсы;
- `@team/ops` - операционные workflows и support tooling.

Ключевые правила review:

- изменения в schema и migrations требуют review от backend;
- изменения в deploy и CI требуют review от platform;
- auth и access control требуют review от backend и platform;
- backoffice workflow changes требуют review от ops;
- UI primitives для нескольких приложений требуют review продуктовой frontend-зоны.

Путь согласования закреплен и в `docs/ownership/module-ownership.md`, и в
`.github/CODEOWNERS`.

## 9. Стратегия ветвления

Основная защищенная ветка: `main`.

Принятые префиксы:

- `feature/<area>-<scope>`
- `fix/<area>-<scope>`
- `hotfix/<area>-<scope>`
- `spike/<area>-<scope>`

Примеры:

- `feature/portal-order-filters`
- `fix/worker-retry-policy`
- `hotfix/database-rollback-2026-04-03`

Правила:

- прямые push в `main` запрещены;
- каждая задача идет через короткоживущую ветку;
- PR должен быть reviewable и ограничен по объему;
- cross-cutting изменения лучше разбивать на несколько PR, если ownership разный.

## 10. Как вести задачу

Рекомендуемый путь:

1. Определить, к какой app/package зоне относится задача.
2. Создать ветку от `main`.
3. Реализовать изменение в своей зоне ответственности.
4. Запустить локальные проверки.
5. Обновить документацию, если меняется процесс, архитектура или поведение.
6. Создать PR по шаблону.
7. Получить review от владельцев зоны.
8. Мержить только после зеленых required checks.

## 11. Onboarding и локальный запуск

Минимальные prereqs:

- Node.js `22.x`
- `pnpm` `10.x`
- локальный Postgres
- локальный Redis

Базовая последовательность:

```bash
pnpm install
pnpm db:generate
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Запуск по зонам:

```bash
pnpm dev:web
pnpm dev:portal
pnpm dev:backoffice
pnpm dev:worker
```

Рекомендуемые локальные порты:

- `web`: `3000`
- `portal`: `3001`
- `backoffice`: `3002`
- Postgres: `5432`
- Redis: `6379`

## 12. Что проверяет CI

Текущий CI запускает:

- install
- format
- lint
- typecheck
- test
- build

Это означает, что ветка handoff-ready должна проходить полный базовый pipeline
еще до создания PR.

## 13. Git hooks и локальная дисциплина

В репозитории добавлены:

- `pre-commit` с `lint-staged`
- `pre-push` с `pnpm typecheck`

Задача этих hooks:

- не пускать в историю случайно неотформатированные файлы;
- ловить базовые type errors до push.

## 14. Документы, которые нужно читать в первую очередь

Если разработчик заходит в проект впервые, порядок чтения такой:

1. `README.md`
2. `CONTRIBUTING.md`
3. `docs/architecture/repository-blueprint.md`
4. `docs/standards/coding-standards.md`
5. `docs/standards/import-rules.md`
6. `docs/ownership/module-ownership.md`
7. `docs/onboarding/README.md`
8. `docs/release/README.md`

## 15. Release-процесс

Текущая модель релиза:

- все изменения попадают в `main` через PR;
- `main` должен оставаться deployable;
- staging валидирует интегрированное состояние;
- production промотируется только из известного рабочего состояния.

До production релиза должны быть подтверждены:

- зеленый CI;
- owner review;
- наличие миграций, если схема менялась;
- обновление docs, если менялся процесс;
- rollback notes для рискованных изменений.

## 16. Runbooks и incidents

В проекте зафиксированы базовые операционные сценарии:

- queue incident;
- failed migration;
- rollback;
- restore access.

Отдельно описана структура incident handling:

- summary;
- impact;
- start time;
- detection;
- owner;
- mitigation;
- rollback status;
- follow-up actions.

Это нужно, чтобы команда не зависела от устных инструкций в момент инцидента.

## 17. Текущее состояние тестового слоя

Важно понимать: foundation уже подготовлен под тестирование, но часть тестового
слоя пока намеренно остается scaffold-уровнем.

На сегодня:

- `tests/e2e` и `tests/smoke` уже существуют как workspace-пакеты;
- базовые test-команды проходят;
- структура под будущие Playwright-сценарии готова.

Но:

- e2e и smoke пока placeholders;
- настоящие критические сценарии нужно будет добавить в следующих задачах.

## 18. Текущее состояние deploy-слоя

Deploy workflows для staging и production уже оформлены как каркас, но не
привязаны к конкретной инфраструктуре.

Это значит:

- структура процессов уже описана;
- точки интеграции с инфраструктурой определены;
- реальный deploy target еще должен быть подключен отдельно.

Это не блокирует работу разработчиков над кодом, но является отдельной задачей
для platform/devops этапа.

## 19. Что уже можно считать готовым на 10/10 для старта команды

Готово:

- структура монорепозитория;
- package boundaries;
- app boundaries;
- ownership и review routing;
- branch strategy;
- onboarding;
- release и runbook foundation;
- PR/issue templates;
- CODEOWNERS;
- базовый CI;
- локальные hooks;
- стабильный формат/lint/typecheck/test/build pipeline.

## 20. Что остается делать уже как развитие продукта, а не фундамента

Следующие шаги относятся уже не к foundation, а к развитию проекта:

- наполнение доменных модулей реальной бизнес-логикой;
- реализация настоящих e2e/smoke сценариев;
- подключение staging/prod deploy к реальной инфраструктуре;
- развитие Prisma schema и миграций;
- реализация app-specific user flows.

## 21. Итог

Текущий фундамент репозитория подготовлен так, чтобы команда могла:

- заходить в проект без постоянных устных пояснений;
- понимать, где писать код;
- работать через понятные ветки и PR;
- соблюдать архитектурные границы;
- запускать локальные проверки;
- поддерживать стабильную базу для дальнейшей разработки.

Иными словами, это уже не просто стартовый scaffold, а рабочий foundation для
командной разработки с понятной структурой, ownership и базовыми процессами.
