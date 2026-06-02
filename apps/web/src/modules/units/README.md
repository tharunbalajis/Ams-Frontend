# Units Module

## Responsibilities
- Apartment/unit inventory management
- Unit status tracking (vacant, occupied, maintenance)
- Unit detail and history

## Owned Features
- Units list page (with floor plan / grid view toggle)
- Unit detail page
- Add / edit unit form
- Unit status management

## Dependencies

### Shared Packages
- `@ams/schemas` — unit form validation
- `@ams/api-types` — unit response types

### Application Shared Layer
- `@/api/units.api` — HTTP calls
- `@/components/data-display/*` — table and status badge
- `@/components/forms/*` — form fields

## Allowed Imports
- `@ams/*` packages
- `@/api/*`, `@/components/*`, `@/hooks/*`, `@/types/*`, `@/config/*`

## Forbidden Imports
- Any other module (`@modules/residents`, `@modules/financials`, etc.)

## Public Exports
See `index.ts`
