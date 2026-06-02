# Staff Module

## Responsibilities
- Staff member management (CRUD)
- Staff role and department assignment
- Staff schedule and task tracking

## Owned Features
- Staff list page
- Staff detail / profile page
- Add / edit staff form
- Role assignment

## Dependencies

### Shared Packages
- `@ams/schemas` — staff form validation
- `@ams/api-types` — staff response types
- `@ams/permissions` — role definitions

### Application Shared Layer
- `@/api/staff.api` — HTTP calls
- `@/components/data-display/*` — table, status badge
- `@/components/forms/*` — form fields

## Allowed Imports
- `@ams/*` packages
- `@/api/*`, `@/components/*`, `@/hooks/*`, `@/types/*`, `@/config/*`

## Forbidden Imports
- Any other module

## Public Exports
See `index.ts`
