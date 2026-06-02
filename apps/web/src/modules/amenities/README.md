# Amenities Module

## Responsibilities
- Amenity catalog management (gym, pool, parking, etc.)
- Amenity booking and availability management

## Owned Features
- Amenities list page
- Amenity detail and booking calendar
- Add / edit amenity form
- Booking management

## Dependencies

### Shared Packages
- `@ams/schemas` — amenity/booking form validation
- `@ams/api-types` — amenity response types

### Application Shared Layer
- `@/api/amenities.api` — HTTP calls
- `@/components/data-display/*` — table, status badge
- `@/components/forms/*` — form fields

## Allowed Imports
- `@ams/*` packages
- `@/api/*`, `@/components/*`, `@/hooks/*`, `@/types/*`, `@/config/*`

## Forbidden Imports
- Any other module

## Public Exports
See `index.ts`
