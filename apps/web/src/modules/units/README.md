# Units Module

## Responsibilities

Manages the full lifecycle of physical units within the AMS platform: unit registration, block/floor organisation, occupancy tracking, and ownership assignment.

## Features

- Paginated unit list with server-side search and filters (type, occupancy status, block, floor)
- Unit detail page with tabbed sub-sections (overview, occupancy, ownership)
- Add and edit unit forms with dynamic block/floor selectors
- Occupancy management — update status (occupied, vacant, reserved, under maintenance) with history
- Ownership management — owner/tenant assignment with history
- Unit profile view aggregating unit info, current occupancy, and current ownership

## Components

| Component | Description |
|---|---|
| `UnitTable` | Server-paginated unit list with status badges and row actions |
| `UnitForm` | Add/edit form for unit details (block, floor, type, sq ft, ownership) |
| `UnitProfile` | Read-only aggregated unit info card |
| `UnitFilters` | Search + type / occupancy / status filter bar |
| `OccupancyCard` | Current occupancy status card with update action |
| `OccupancyTable` | Occupancy history table |
| `OwnershipSection` | Current ownership display with history list |
| `BlockSelector` | Async-loaded dropdown of blocks/towers |
| `FloorSelector` | Async-loaded dropdown of floors (dependent on BlockSelector) |

## Pages

| Page | Route | Description |
|---|---|---|
| `UnitListPage` | `/units` | Paginated unit list with filters |
| `UnitDetailPage` | `/units/:id` | Unit detail with occupancy and ownership tabs |
| `AddUnitPage` | `/units/create` | Create new unit |
| `EditUnitPage` | `/units/:id/edit` | Edit existing unit |
| `OccupancyPage` | `/units/:id/occupancy` | Manage and view occupancy history |

## Hooks

| Hook | Type | Description |
|---|---|---|
| `useUnits` | Query | Paginated list of units |
| `useUnit` | Query | Single unit by ID |
| `useCreateUnit` | Mutation | Create a new unit |
| `useUpdateUnit` | Mutation | Update an existing unit |
| `useOccupancy` | Query | Current occupancy for a unit |
| `useOwnership` | Query | Current ownership record for a unit |

## API

| Object | Description |
|---|---|
| `unitsApi` | CRUD for units (delegates to shared `@/api/units.api`) |
| `occupancyApi` | Get current, history, and update occupancy |
| `ownershipApi` | Get current, history, create, and update ownership |
| `floorApi` | List blocks and floors for dynamic selectors |

## Schemas (Zod)

- `createUnitSchema` / `updateUnitSchema`
- `occupancySchema`
- `ownershipSchema`
- `floorSchema`

## Types

- `Unit`, `UnitListItem`, `UnitType`, `UnitStatus`, `OccupancyStatus`, `OwnershipType`
- `OccupancyRecord`, `OccupancyHistory`, `UpdateOccupancyPayload`
- `Ownership`, `OwnerInfo`, `OwnershipHistory`, `CreateOwnershipPayload`
- `Floor`, `Block`
- `UnitFiltersParams`, `CreateUnitPayload`, `UpdateUnitPayload`

## Constants

- `UNIT_TYPE_OPTIONS`, `UNIT_STATUS_OPTIONS`, `OWNERSHIP_TYPE_OPTIONS`
- `OCCUPANCY_STATUS_OPTIONS`, `OCCUPANCY_STATUS_COLOR`
- `OWNERSHIP_LABEL`
- `UNIT_ROUTES`, `UNIT_PAGE_SIZE`

## Dependencies

### Shared Packages
- `@ams/ui` — all UI primitives (`ServerTable`, `DataTable`, `Badge`, `StatusBadge`, `Button`, `Input`, `Textarea`, `SelectField`, `SearchInput`, `FormField`, `Card`, `Tabs`, `PageHeader`, `Breadcrumbs`, `LoadingState`, `ErrorState`)
- `zod` — form validation schemas
- `react-hook-form` + `@hookform/resolvers/zod` — form state
- `@tanstack/react-query` — server state
- `react-router-dom` — navigation

### Application Shared Layer
- `@/api/units.api` — shared HTTP client for units
- `@/api/client` — base Axios instance
- `@/hooks/usePagination` — pagination state
- `@/hooks/useDebounce` — debounced search
- `@/lib` — query client and query key factories (`unitKeys`)
- `@/types/common.types` — `ID`, `Nullable`, `Timestamp`
- `@/types/api.types` — `ApiResponse`, `ApiListResponse`
- `@/constants/query.constants` — `STALE_TIME`
- `@/utils/formatDate` — date formatting utility

## Allowed Imports

- `@ams/*` packages
- `@/api/*`, `@/components/*`, `@/hooks/*`, `@/types/*`, `@/config/*`, `@/lib/*`, `@/constants/*`, `@/utils/*`
- `react`, `react-router-dom`, `react-hook-form`, `zod`, `@tanstack/react-query`

## Forbidden Imports

- `@modules/visitors`, `@modules/complaints`, `@modules/financials`
- `@modules/staff`, `@modules/assets`, `@modules/meetings`, `@modules/settings`

## Public Exports

All public exports are re-exported from `index.ts`:

```ts
export * from './types';
export * from './constants';
export * from './schemas';
export * from './hooks';
export * from './api';
export * from './components';
export * from './pages';
```
