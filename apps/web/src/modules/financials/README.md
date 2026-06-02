# Financials Module

## Responsibilities
- Invoice generation and management
- Payment recording and tracking
- Expense management
- Financial summary and reporting

## Owned Features
- Financials overview page (summary + charts)
- Invoices list and detail
- Payments list and detail
- Expenses list and detail
- Revenue vs expense chart

## Dependencies

### Shared Packages
- `@ams/schemas` — invoice/payment/expense form validation
- `@ams/api-types` — financial response types

### Application Shared Layer
- `@/api/financials.api` — HTTP calls
- `@/components/data-display/ServerTable` — paginated tables
- `@/components/charts/*` — financial charts
- `@/components/forms/*` — form fields

## Allowed Imports
- `@ams/*` packages
- `@/api/*`, `@/components/*`, `@/hooks/*`, `@/types/*`, `@/config/*`

## Forbidden Imports
- Any other module

## Public Exports
See `index.ts`
