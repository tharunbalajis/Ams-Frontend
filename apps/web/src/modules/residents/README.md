# Residents Module

## Responsibilities

Manages the full lifecycle of residents within the AMS platform: owners and tenants, their vehicles, pets, leases, and profile aggregation.

## Features

- Paginated resident list with server-side search and filtering by type/status
- Resident detail view with tabbed sub-sections (vehicles, pets, lease)
- Add and edit resident forms with emergency contact capture
- Vehicle registration and management per resident
- Pet registration with vaccination tracking
- Lease management (create, update, upload agreement)
- Aggregated resident profile page

## Components

| Component | Description |
|---|---|
| `ResidentTable` | Server-paginated table of residents with inline navigation |
| `ResidentForm` | Add/edit form for resident personal details and emergency contact |
| `ResidentProfile` | Read-only aggregated resident profile display |
| `ResidentFilters` | Search input + type/status filter bar |
| `VehicleTable` | Table of vehicles registered to a resident |
| `VehicleForm` | Add/edit form for resident vehicles |
| `PetTable` | Table of pets registered to a resident |
| `PetForm` | Add/edit form for resident pets |
| `LeaseSection` | Display section for active lease details |
| `LeaseForm` | Add/edit form for resident leases |

## Pages

| Page | Route | Description |
|---|---|---|
| `ResidentListPage` | `/residents` | Paginated resident list with filters |
| `ResidentDetailPage` | `/residents/:id` | Resident detail with sub-sections |
| `AddResidentPage` | `/residents/create` | Add new resident |
| `EditResidentPage` | `/residents/:id/edit` | Edit existing resident |
| `ResidentProfilePage` | `/residents/:id/profile` | Aggregated resident profile |

## Hooks

| Hook | Type | Description |
|---|---|---|
| `useResidents` | Query | Paginated list of residents |
| `useResident` | Query | Single resident by ID |
| `useCreateResident` | Mutation | Create a new resident |
| `useUpdateResident` | Mutation | Update an existing resident |
| `useDeleteResident` | Mutation | Delete a resident |
| `useVehicles` | Query | Vehicles for a resident |
| `usePets` | Query | Pets for a resident |
| `useLease` | Query | Active lease for a resident |

## API

| Object | Description |
|---|---|
| `residentsApi` | CRUD for residents (delegates to shared `@/api/residents.api`) |
| `vehiclesApi` | CRUD for resident vehicles |
| `petsApi` | CRUD for resident pets |
| `leaseApi` | CRUD + agreement upload for leases |
| `residentProfileApi` | Aggregated profile fetch |

## Schemas (Zod)

- `createResidentSchema` / `updateResidentSchema`
- `vehicleSchema`
- `petSchema`
- `leaseSchema`

## Dependencies

### Shared Packages
- `@ams/ui` — all UI primitives (`ServerTable`, `Badge`, `StatusBadge`, `Button`, `Input`, `FormField`, `DatePicker`, `FileUpload`, `SelectField`, `SearchInput`, `PageHeader`, `Breadcrumbs`)
- `zod` — form validation schemas
- `react-hook-form` + `@hookform/resolvers/zod` — form state management
- `@tanstack/react-query` — server state
- `react-router-dom` — navigation

### Application Shared Layer
- `@/api/residents.api` — shared HTTP client for residents
- `@/api/client` — base Axios instance
- `@/hooks/usePagination` — pagination state
- `@/hooks/useDebounce` — debounced search
- `@/lib` — query client and query key factories
- `@/types/common.types` — `ID`, `Nullable`, `Timestamp`
- `@/types/api.types` — `ApiResponse`, `ApiListResponse`
- `@/constants/query.constants` — `STALE_TIME`

## Allowed Imports

- `@ams/*` packages
- `@/api/*`, `@/components/*`, `@/hooks/*`, `@/types/*`, `@/config/*`, `@/lib/*`, `@/constants/*`, `@/utils/*`
- `react`, `react-router-dom`, `react-hook-form`, `zod`, `@tanstack/react-query`

## Forbidden Imports

- Any other feature module (`@modules/units`, `@modules/complaints`, etc.)
- Direct infrastructure modification

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
