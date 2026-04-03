# docs

Internal documentation for repository architecture, delivery, and operations.

## Sections

- `architecture` - repository structure, package boundaries, and runtime layout
- `adr` - architecture decision records that explain why key decisions exist
- `standards` - coding rules, naming, and import boundaries
- `ownership` - owners, review routing, and team responsibilities
- `onboarding` - local setup, first day checklist, and common troubleshooting
- `release` - release checklist, staging process, and production handoff
- `runbooks` - queue, database, rollback, and access restoration procedures
- `incidents` - incident communication and postmortem template
- `glossary` - shared product and domain vocabulary
- `handoff` - consolidated project handbook for team onboarding and transfer

## Reading Order For New Developers

1. `README.md`
2. `architecture/repository-blueprint.md`
3. `standards/coding-standards.md`
4. `standards/import-rules.md`
5. `ownership/module-ownership.md`
6. `onboarding/README.md`
7. `release/README.md`

## Rule

If a process matters during review, release, or incident response, it should
exist in `docs/` and not only in chat.
