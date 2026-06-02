# Assets Module

## Responsibilities
- Property and equipment asset tracking
- Asset assignment and maintenance history
- Asset lifecycle management

## Owned Features
- Assets list page
- Asset detail page
- Add / edit asset form
- Maintenance log

## Dependencies

### Shared Packages
- `@ams/schemas` — asset form validation
- `@ams/api-types` — asset response types

### Application Shared Layer
- `@/api/assets.api` — HTTP calls
- `@/components/data-display/*` — table, timeline
- `@/components/forms/*` — form fields

## Allowed Imports
- `@ams/*` packages
- `@/api/*`, `@/components/*`, `@/hooks/*`, `@/types/*`, `@/config/*`

## Forbidden Imports
- Any other module

## Public Exports
See `index.ts`
