# Complaints Module

## Responsibilities
- Complaint submission, tracking, and resolution workflow
- Status lifecycle management (open → in-progress → resolved → closed)
- Complaint categorization and priority

## Owned Features
- Complaints list page
- Complaint detail page with activity log
- Submit complaint form
- Status update actions
- Complaint analytics (by category, resolution time)

## Dependencies

### Shared Packages
- `@ams/schemas` — complaint form validation
- `@ams/api-types` — complaint response types

### Application Shared Layer
- `@/api/complaints.api` — HTTP calls
- `@/components/data-display/*` — table, timeline, status badge
- `@/components/forms/*` — form fields

## Allowed Imports
- `@ams/*` packages
- `@/api/*`, `@/components/*`, `@/hooks/*`, `@/types/*`, `@/config/*`

## Forbidden Imports
- Any other module (`@modules/residents`, `@modules/staff`, etc.)

## Public Exports
See `index.ts`
