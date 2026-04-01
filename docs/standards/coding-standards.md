# Coding Standards

## Naming

- folders: `kebab-case`
- files: `kebab-case`
- React components: `PascalCase`
- server functions/use cases: verb + noun, например `create-order.ts`
- job names: `module.action`

## Boundaries

- импорт только через public API package
- deep imports запрещены
- `shared` не создаётся без отдельного ADR

## Abstractions

- не делать base-классы на всякий случай
- дублирование в двух местах допустимо
- общая абстракция появляется только после устойчивого третьего кейса
