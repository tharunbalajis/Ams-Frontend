# Meetings Module

## Responsibilities
- Meeting scheduling and management
- Attendee management
- Meeting minutes recording

## Owned Features
- Meetings list page (with calendar and list views)
- Meeting detail page
- Schedule meeting form
- Add attendees
- Meeting minutes editor

## Dependencies

### Shared Packages
- `@ams/schemas` — meeting form validation
- `@ams/api-types` — meeting response types

### Application Shared Layer
- `@/api/meetings.api` — HTTP calls
- `@/components/data-display/*` — table, timeline
- `@/components/forms/*` — form fields

## Allowed Imports
- `@ams/*` packages
- `@/api/*`, `@/components/*`, `@/hooks/*`, `@/types/*`, `@/config/*`

## Forbidden Imports
- Any other module

## Public Exports
See `index.ts`
