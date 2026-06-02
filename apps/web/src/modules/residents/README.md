# Residents Module

## Responsibilities
- Resident profile management (CRUD)
- Resident search and filtering
- Resident document management

## Owned Features
- Residents list page with server-side pagination
- Resident detail / profile page
- Add / edit resident form
- Resident status management (active, inactive, moved-out)

## Dependencies

### Shared Packages
- `@ams/schemas` — resident form validation
- `@ams/api-types` — resident response types

### Application Shared Layer
- `@/api/residents.api` — HTTP calls
- `@/components/data-display/ServerTable` — paginated table
- `@/components/forms/*` — form fields
- `@/components/overlays/*` — add/edit dialogs

## Allowed Imports
- `@ams/*` packages
- `@/api/*`, `@/components/*`, `@/hooks/*`, `@/types/*`, `@/config/*`

## Forbidden Imports
- Any other module (`@modules/units`, `@modules/complaints`, etc.)

## Public Exports
See `index.ts`
