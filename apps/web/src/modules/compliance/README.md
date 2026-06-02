# Compliance Module

## Responsibilities
- Regulatory compliance tracking
- Compliance checklist and document management
- Compliance reporting

## Owned Features
- Compliance list page
- Compliance detail page
- Compliance checklist management
- Compliance report generation

## Dependencies

### Shared Packages
- `@ams/schemas` — compliance form validation
- `@ams/api-types` — compliance response types

### Application Shared Layer
- `@/api/compliance.api` — HTTP calls
- `@/components/data-display/*` — table, status badge
- `@/components/forms/*` — form fields

## Allowed Imports
- `@ams/*` packages
- `@/api/*`, `@/components/*`, `@/hooks/*`, `@/types/*`, `@/config/*`

## Forbidden Imports
- Any other module

## Public Exports
See `index.ts`
