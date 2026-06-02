# AMS Frontend — Shared Infrastructure Layer

This document describes the shared application infrastructure layer at `apps/web/src/`.
Every AMS module depends on this layer. It must never depend on any module.

---

## Layer Map

```
src/
├── api/            Global HTTP layer (Axios + typed stubs)
├── lib/            Query client + query key factories
├── config/         Environment, routes, roles, permissions, navigation, feature flags
├── hooks/          Cross-cutting React hooks
├── types/          Shared TypeScript interfaces and types
├── constants/      App-wide constants
├── utils/          Pure utility functions
└── app/            Providers, guards, layouts, router
```

---

## API Layer (`@/api`)

| File | Purpose |
|------|---------|
| `client.ts` | Single Axios instance — Bearer token injection, 401 refresh queue |
| `*.api.ts`  | 13 typed stub files, one per backend module |

**Import rule:** Modules import from `@/api/*` for HTTP calls. They never create their own Axios instances.

---

## Query Layer (`@/lib`)

| Export | Purpose |
|--------|---------|
| `queryClient` | Singleton `QueryClient` (staleTime 5m, gcTime 10m) |
| `authKeys`, `residentKeys`, … | Factory functions for TanStack Query cache keys |

**Usage pattern:**
```ts
import { residentKeys, queryClient } from '@/lib';

// In a module hook:
useQuery({ queryKey: residentKeys.list(params), queryFn: ... });

// Manual invalidation:
queryClient.invalidateQueries({ queryKey: residentKeys.all });
```

---

## Config Layer (`@/config`)

| File | Exports |
|------|---------|
| `env.ts` | `env` — typed `import.meta.env` values |
| `routes.ts` | `ROUTES`, `buildRoute`, `PUBLIC_ROUTES` |
| `roles.ts` | `ROLES`, `Role`, `ROLE_LABELS`, `ROLE_HIERARCHY` |
| `permissions.ts` | `PERMISSIONS`, `Permission` |
| `navigation.ts` | `NAVIGATION_GROUPS` — sidebar menu structure |
| `featureFlags.ts` | `FEATURES`, `DEFAULT_FEATURES`, `FeatureFlag` |

---

## Hooks (`@/hooks`)

| Hook | Purpose |
|------|---------|
| `useAuth` | Auth context (user, isAuthenticated, login, logout) |
| `usePermissions` | Role checks (`hasRole`, `hasMinRole`, `hasAnyRole`, `can`) |
| `useFeatureFlags` | Feature flag evaluation |
| `useDebounce` | Debounce any value |
| `usePagination` | Page/pageSize state with reset |
| `useLocalStorage` | Typed localStorage with React state sync |
| `useSession` | Raw token read/write/clear |

---

## Types (`@/types`)

| File | Key Types |
|------|-----------|
| `common.types` | `Nullable<T>`, `Optional<T>`, `ID`, `SelectOption`, `AsyncStatus` |
| `api.types` | `ApiResponse<T>`, `ApiListResponse<T>`, `ApiError`, `PaginationMeta` |
| `auth.types` | `AuthUser`, `AuthState`, `AuthTokens`, `LoginPayload` |
| `pagination.types` | `PaginationParams`, `ListQueryParams`, `PaginatedResult<T>` |
| `permissions.types` | `Role`, `Permission`, `RolePermissions` |
| `navigation.types` | `NavigationItem`, `NavigationGroup`, `NavigationConfig` |

---

## Constants (`@/constants`)

| File | Key Constants |
|------|--------------|
| `app.constants` | `DEFAULT_PAGE_SIZE`, `DATE_FORMAT`, `CURRENCY_CODE`, `DEBOUNCE_DELAY` |
| `route.constants` | `ROUTES`, `PUBLIC_ROUTES`, `DEFAULT_REDIRECT` |
| `query.constants` | `STALE_TIME`, `GC_TIME`, `RETRY_COUNT` |
| `validation.constants` | `REGEX`, `LENGTH`, `FILE` |

---

## Utilities (`@/utils`)

| File | Functions |
|------|-----------|
| `formatDate` | `formatDate`, `formatDateTime`, `formatRelativeDate` |
| `formatCurrency` | `formatCurrency`, `formatNumber`, `formatPercent` |
| `formatPhone` | `formatPhone` — Philippine mobile format |
| `downloadFile` | `downloadBlob`, `downloadDataUrl`, `downloadFromUrl` |
| `storage` | `storage.get/set/remove/clear`, `sessionStore.get/set/remove` |
| `validators` | `isValidEmail`, `isValidPhonePH`, `isRequired`, `isValidName`, … |

---

## App Layer (`@/app`)

### Providers
| Provider | Purpose |
|----------|---------|
| `QueryProvider` | Wraps `QueryClientProvider` with singleton `queryClient` |
| `AuthProvider` | Auth state context — `useAuth()` hook exposed |
| `ThemeProvider` | Light/dark/system theme with localStorage persistence |
| `ToastProvider` | Sonner `<Toaster>` with configured defaults |

### Guards
| Guard | Purpose |
|-------|---------|
| `ProtectedRoute` | Redirects to `/login` when unauthenticated |
| `RoleGuard` | Renders children only when `user.role` is in `allowedRoles` |
| `PermissionGuard` | Renders children only when `can(permission)` is true |

---

## Dependency Rules

```
✅  Module  →  @/api, @/lib, @/config, @/hooks, @/types, @/constants, @/utils, @/app
✅  Module  →  @ams/ui, @ams/api-types, @ams/schemas
✗   Module  →  Another module (forbidden)
✗   @/api   →  Any module (forbidden)
✗   @/lib   →  Any module (forbidden)
✗   @/config →  Any module (forbidden)
```

---

## Environment Variables

```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=AMS
VITE_APP_ENV=development
VITE_UPLOAD_URL=http://localhost:3000/uploads
VITE_ENABLE_ANALYTICS=false
VITE_AUTH_TOKEN_KEY=ams_access_token
VITE_AUTH_REFRESH_TOKEN_KEY=ams_refresh_token
```
