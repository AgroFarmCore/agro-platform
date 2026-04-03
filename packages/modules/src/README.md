# modules src

Each module should use the same internal shape:

```text
<module>/
  contracts/
  domain/
  application/
  infrastructure/
  jobs/
  index.ts
```

Rules:

- `domain` does not depend on `infrastructure`
- cross-module access goes through public contracts
- app code must not import module internals directly
