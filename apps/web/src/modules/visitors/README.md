# Visitors Module

## Responsibilities

Manages the complete visitor lifecycle: registration, entry/exit tracking, QR/OTP verification, pre-approved visitor management, staff attendance, and SOS alert handling.

## Features

- Paginated visitor log with inline check-in/check-out actions and filters (type, status, entry status)
- Visitor detail page with event timeline and security verification info
- Pre-approved visitor management — create, revoke, and track standing approvals
- QR and OTP verification flows for gate security
- Staff attendance tracking with date/status filters
- SOS dashboard with real-time active alert cards and full history table

## Components

| Component | Description |
|---|---|
| `VisitorTable` | Server-paginated visitor log with inline check-in/check-out |
| `VisitorForm` | Registration form for new visitors |
| `VisitorFilters` | Search + type / entry / status filter bar |
| `VisitorStatusBadge` | Renders either `EntryStatus` or `VisitorStatus` as a badge |
| `VisitorDetailCard` | Full visitor info card with check-in/check-out actions |
| `VisitorTimeline` | Chronological event timeline for a visitor visit |
| `QRScanner` | QR code input and verification result display |
| `OTPVerification` | 6-digit OTP input and verification result display |
| `PreApprovedVisitorTable` | List of pre-approved visitors with revoke action |
| `AttendanceTable` | Staff attendance records table |
| `AttendanceFilters` | Status + date range filter bar for attendance |
| `SOSCard` | Alert card with acknowledge/resolve actions |
| `SOSAlertTable` | Historical SOS alerts table |
| `SecurityVerificationCard` | Shows method, gate, and status of a security verification |

## Pages

| Page | Route | Description |
|---|---|---|
| `VisitorLogsPage` | `/visitors` | Visitor log with registration dialog |
| `VisitorDetailPage` | `/visitors/:id` | Detail, timeline, and verification info |
| `PreApprovedVisitorsPage` | `/visitors/pre-approved` | Manage pre-approvals |
| `StaffAttendancePage` | `/visitors/attendance` | Staff attendance records |
| `SOSDashboardPage` | `/visitors/sos` | Active SOS cards + full history |

## Hooks

| Hook | Type | Description |
|---|---|---|
| `useVisitors` | Query | Paginated visitor list |
| `useVisitor` | Query | Single visitor by ID |
| `useVisitorLogs` | Query | Alias for visitor list used on logs page |
| `usePreApprovedVisitors` | Query | List of pre-approved visitors |
| `useAttendance` | Query | Paginated staff attendance records |
| `useSOS` | Query | All SOS alerts with optional status filter |
| `useSOSActive` | Query | Active SOS alerts — auto-refetches every 30s |

## API

| Object | Description |
|---|---|
| `visitorsApi` | CRUD + check-in/check-out (delegates to shared layer) |
| `preApprovedVisitorsApi` | Create, revoke, delete pre-approvals |
| `attendanceApi` | Mark attendance, check out, get records |
| `securityApi` | QR/OTP verification, generate codes |
| `sosApi` | Raise, acknowledge, resolve SOS alerts |

## Schemas (Zod)

- `createVisitorSchema`, `preApproveVisitorSchema`
- `attendanceSchema`
- `otpVerificationSchema`, `qrVerificationSchema`
- `createSOSSchema`, `resolveSOSSchema`

## Types

- `Visitor`, `VisitorListItem`, `VisitorType`, `VisitorStatus`, `EntryStatus`, `PreApprovedVisitor`
- `AttendanceRecord`, `AttendanceStatus`, `AttendanceFiltersParams`, `MarkAttendancePayload`
- `SecurityVerification`, `GuestVerification`, `VerificationMethod`, `VerificationStatus`
- `SOSAlert`, `SOSAlertType`, `SOSAlertStatus`, `CreateSOSAlertPayload`, `ResolveSOSAlertPayload`
- `QRVerificationPayload`, `OTPVerificationPayload`, `VerificationResult`

## Constants

- `VISITOR_TYPE_OPTIONS`, `VISITOR_STATUS_OPTIONS`, `ENTRY_STATUS_OPTIONS`, `ENTRY_STATUS_COLOR`
- `VISITOR_ROUTES`, `VISITOR_PAGE_SIZE`
- `ATTENDANCE_STATUS_OPTIONS`, `ATTENDANCE_STATUS_COLOR`
- `VERIFICATION_METHOD_OPTIONS`, `VERIFICATION_STATUS_COLOR`, `OTP_EXPIRY_MINUTES`, `QR_EXPIRY_HOURS`
- `SOS_ALERT_TYPE_OPTIONS`, `SOS_ALERT_STATUS_OPTIONS`, `SOS_STATUS_COLOR`, `SOS_TYPE_ICON`

## Dependencies

### Shared Packages
- `@ams/ui` — all UI primitives (`ServerTable`, `DataTable`, `Badge`, `Button`, `Card`, `Timeline`, `Dialog`, `PageHeader`, `Breadcrumbs`, `LoadingState`, `ErrorState`, `FormField`, `Input`, `SelectField`, `SearchInput`)
- `zod` — form schemas
- `react-hook-form` + `@hookform/resolvers/zod` — form state
- `@tanstack/react-query` — server state
- `react-router-dom` — navigation

### Application Shared Layer
- `@/api/visitors.api` — shared HTTP client for visitors
- `@/api/client` — base Axios instance
- `@/hooks/usePagination` — pagination state
- `@/hooks/useDebounce` — debounced search
- `@/lib` — query client, `visitorKeys` factory
- `@/types/common.types`, `@/types/api.types`
- `@/constants/query.constants` — `STALE_TIME`
- `@/utils/formatDate`

## Allowed Imports

- `@ams/*` packages
- `@/api/*`, `@/components/*`, `@/hooks/*`, `@/types/*`, `@/config/*`, `@/lib/*`, `@/constants/*`, `@/utils/*`
- `react`, `react-router-dom`, `react-hook-form`, `zod`, `@tanstack/react-query`

## Forbidden Imports

- `@modules/residents`, `@modules/units`, `@modules/complaints`
- `@modules/financials`, `@modules/staff`, `@modules/assets`
- `@modules/meetings`, `@modules/settings`

## Public Exports

All public exports are re-exported from `index.ts`:

```ts
export * from './types';
export * from './constants';
export * from './schemas';
export * from './hooks';
export * from './api';
export * from './components';
export * from './pages';
```
