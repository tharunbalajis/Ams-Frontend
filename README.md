# AMS Frontend

Apartment Management System — Frontend monorepo.

## Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Framework  | React 19 + TypeScript + Vite        |
| State      | TanStack Query                      |
| Routing    | React Router v6                     |
| Forms      | React Hook Form + Zod               |
| HTTP       | Axios                               |
| Styling    | TailwindCSS + Shadcn/UI             |
| Tables     | TanStack Table                      |
| Charts     | Recharts                            |
| Toasts     | Sonner                              |
| Monorepo   | pnpm workspaces + Turborepo         |

## Workspace Structure

```
ams-frontend/
├── apps/
│   └── web/               # Main React application
├── packages/
│   ├── ui/                # Shared UI components (@ams/ui)
│   ├── schemas/           # Shared Zod schemas (@ams/schemas)
│   ├── api-types/         # Shared API type definitions (@ams/api-types)
│   ├── constants/         # Application constants (@ams/constants)
│   ├── utils/             # Utility functions (@ams/utils)
│   └── permissions/       # Permission definitions (@ams/permissions)
```

## Getting Started

```bash
pnpm install
pnpm dev
```

## Architecture

Feature-based architecture. Each module is a bounded context that owns its pages, api, hooks, schemas, components, types, and constants.

See `apps/web/src/modules/` for module structure.

## Module Isolation Rules

- Modules MUST NOT import from other modules.
- Allowed: `@ams/*` packages, `@/api/*`, `@/components/*`, `@/hooks/*`, `@/types/*`, `@/config/*`
- Forbidden: Cross-module imports (e.g. `@modules/residents` → `@modules/complaints`)
