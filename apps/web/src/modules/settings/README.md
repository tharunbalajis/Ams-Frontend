# Settings Module

## Responsibilities
- Application and organization settings management
- User profile and password management
- Notification preferences

## Owned Features
- Settings overview page (tabbed layout)
- Profile settings tab
- Organization settings tab
- Notification preferences tab
- Security / password change tab

## Dependencies

### Shared Packages
- `@ams/schemas` — settings form validation
- `@ams/api-types` — settings response types

### Application Shared Layer
- `@/api/settings.api` — HTTP calls
- `@/components/forms/*` — form fields
- `@/app/providers/ThemeProvider` — theme switching

## Allowed Imports
- `@ams/*` packages
- `@/api/*`, `@/components/*`, `@/hooks/*`, `@/types/*`, `@/config/*`

## Forbidden Imports
- Any other module

## Public Exports
See `index.ts`
