# tests/smoke

Smoke tests are short checks that run after staging or production deploy.

Initial recommended checks:

- `web` responds successfully
- `portal` responds successfully
- `backoffice` responds successfully
- `worker` boot command exits cleanly or remains healthy
