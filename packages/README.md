# packages

Переиспользуемые пакеты monorepo.

Типы пакетов:

- platform packages: `config`, `auth`, `observability`, `testing`
- business packages: `modules`, `jobs`, `content`
- infrastructure packages: `database`
- frontend foundation: `ui`
- repo tooling configs: `eslint-config`, `typescript-config`

Правило:

- новый package создаётся только когда у него есть ясная ответственность и минимум два потенциальных потребителя.
