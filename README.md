# Agro Platform Monorepo

Стартовый blueprint репозитория для агро-платформы: публичный сайт, личные кабинеты, backoffice, фоновые задачи, интеграции и аналитика.

Основное решение:

- `pnpm` workspace + `Turborepo`
- modular monolith в monorepo
- отдельные apps для `web`, `portal`, `backoffice`, `worker`
- отдельные packages для `database`, `modules`, `ui`, `jobs`, `config`, `testing`
- без микросервисов на старте

Детали:

- архитектура: [docs/architecture/repository-blueprint.md](D:\Agro\docs\architecture\repository-blueprint.md)
- ADR-001: [docs/adr/ADR-001-monorepo-modular-monolith.md](D:\Agro\docs\adr\ADR-001-monorepo-modular-monolith.md)

## Почему так

- 5 разработчикам проще работать в одном репозитории с едиными правилами и tooling.
- Общие типы, UI, DB и job contracts лежат рядом, а не размазаны по разным сервисам.
- Архитектура остаётся достаточно простой для ежедневной разработки и code review.
- Есть запас на рост без раннего перехода к микросервисам.

## Следующий шаг

После согласования blueprint можно переходить к реальному scaffold:

1. создать Next.js apps
2. поднять `packages/database` и Prisma
3. создать `packages/modules` с первыми доменными модулями
4. подключить worker и BullMQ
5. включить CI и branch protection
