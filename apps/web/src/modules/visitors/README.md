# Visitors Module

## Responsibilities
- Visitor registration and access log management
- Check-in / check-out tracking
- Visitor pass generation

## Owned Features
- Visitors list page
- Visitor detail page
- Visitor registration form
- Check-in / check-out actions
- Active visitors dashboard widget (owned here, surfaced elsewhere via shared layer)

## Dependencies

### Shared Packages
- `@ams/schemas` — visitor form validation
- `@ams/api-types` — visitor response types

### Application Shared Layer
- `@/api/visitors.api` — HTTP calls
- `@/components/data-display/*` — table, status badge
- `@/components/forms/*` — form fields

## Allowed Imports
- `@ams/*` packages
- `@/api/*`, `@/components/*`, `@/hooks/*`, `@/types/*`, `@/config/*`

## Forbidden Imports
- Any other module (`@modules/residents`, `@modules/staff`, etc.)

## Public Exports
See `index.ts`
