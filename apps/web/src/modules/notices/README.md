# Notices Module

## Responsibilities
- Notice/announcement authoring and publishing
- Notice board management
- Notice targeting (all residents, specific units/floors)

## Owned Features
- Notices list page
- Notice detail / view page
- Create / edit notice form
- Publish / unpublish actions

## Dependencies

### Shared Packages
- `@ams/schemas` — notice form validation
- `@ams/api-types` — notice response types

### Application Shared Layer
- `@/api/notices.api` — HTTP calls
- `@/components/data-display/*` — table, status badge
- `@/components/forms/*` — form fields

## Allowed Imports
- `@ams/*` packages
- `@/api/*`, `@/components/*`, `@/hooks/*`, `@/types/*`, `@/config/*`

## Forbidden Imports
- Any other module

## Public Exports
See `index.ts`
