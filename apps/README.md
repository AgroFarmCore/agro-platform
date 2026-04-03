# apps

Runtime applications of the platform.

## Apps

- `web` - public website and content surface
- `portal` - authenticated farmer and supplier experience
- `backoffice` - internal operations and support interface
- `worker` - background jobs and automation runtime

## Rule

The app layer owns routing, UI composition, and runtime wiring. Reusable
business logic should live in `packages/*`, not only inside an app.
