# Complaints Module

## Responsibilities

Manages the full complaint lifecycle: registration, assignment, SLA tracking, escalation, resolution, and analytics reporting.

## Features

- Paginated complaint list with multi-axis filters (category, priority, status, SLA breach)
- Complaint detail page with tabbed timeline, escalations, and inline assign/resolve actions
- SLA indicator with real-time remaining time display
- Status workflow stepper showing progress from Open → Closed
- Assignment drawer for staff/team assignment with expected resolution date
- Escalation panel with level tracking and acknowledge/resolve actions
- Resolution form capturing root cause and preventive measure
- Kanban board grouping complaints by status across 6 columns
- Analytics dashboard with KPI widgets, category pie chart, priority bar chart, and resolution trend

## Components

| Component | Description |
|---|---|
| `ComplaintForm` | Multi-field complaint registration form with attachment upload |
| `ComplaintTable` | Server-paginated list with status, priority, SLA badge, and actions |
| `ComplaintCard` | Compact kanban card with priority, status, and SLA breach indicator |
| `ComplaintTimeline` | Chronological event log for a complaint |
| `ComplaintFilters` | Search + category / priority / status / SLA filter bar |
| `ComplaintStatusBadge` | Renders `ComplaintStatus` or `Priority` as a colored badge |
| `AssignmentDrawer` | Slide-out form for assigning staff/team with date and notes |
| `EscalationPanel` | Lists escalation history with level, status, and timestamps |
| `ResolutionForm` | Resolution notes, root cause, preventive measure, close toggle |
| `SLAIndicator` | Progress bar with remaining time and SLA badge |
| `SLABadge` | Compact badge for on_track / at_risk / breached / met |
| `StatusStepper` | Visual workflow step indicator across the 6 status stages |
| `ComplaintAnalytics` | KPI grid + category pie + priority bar + resolution trend |
| `ComplaintKanban` | Column-grouped card board for all status buckets |

## Pages

| Page | Route | Description |
|---|---|---|
| `ComplaintListPage` | `/complaints` | Paginated list with filters and kanban link |
| `ComplaintDetailPage` | `/complaints/:id` | Full detail with tabs, SLA, assign/resolve |
| `CreateComplaintPage` | `/complaints/create` | New complaint form |
| `ComplaintDashboardPage` | `/complaints/dashboard` | Analytics with date range filter |
| `ComplaintKanbanPage` | `/complaints/kanban` | Kanban board — columns per status |

## Hooks

| Hook | Type | Description |
|---|---|---|
| `useComplaints` | Query | Paginated complaint list |
| `useComplaint` | Query | Single complaint by ID |
| `useCreateComplaint` | Mutation | Submit new complaint + navigate to list |
| `useUpdateComplaint` | Mutation | Update complaint fields / status |
| `useComplaintTimeline` | Query | Timeline events for a complaint |
| `useComplaintAssignments` | Query | Assignment history for a complaint |
| `useSLA` | Query | SLA record for a complaint (short stale time) |
| `useEscalations` | Query | Escalation history for a complaint |
| `useComplaintAnalytics` | Query | Summary analytics with optional date range |

## API

| Object | Description |
|---|---|
| `complaintsApi` | CRUD + status update + timeline (delegates to shared layer) |
| `assignmentsApi` | Create, update, accept, complete assignments per complaint |
| `slaApi` | Get SLA, pause/resume, get policies |
| `escalationApi` | Create, acknowledge, resolve escalations |
| `analyticsApi` | Summary analytics endpoint |

## Schemas (Zod)

- `createComplaintSchema`, `updateComplaintSchema`
- `assignmentSchema`
- `escalationSchema`
- `slaPolicySchema`
- `resolutionSchema`

## Types

- `Complaint`, `ComplaintListItem`, `ComplaintCategory`, `ComplaintType`, `Priority`, `ComplaintStatus`
- `ComplaintTimelineEvent`, `ComplaintFiltersParams`
- `Assignment`, `AssignmentStatus`, `CreateAssignmentPayload`
- `Escalation`, `EscalationLevel`, `EscalationStatus`, `CreateEscalationPayload`
- `SLA`, `SLAStatus`, `SLAPolicy`
- `ComplaintAnalytics`, `CategoryStat`, `PriorityStat`

## Constants

- `COMPLAINT_CATEGORY_OPTIONS`, `COMPLAINT_TYPE_OPTIONS`, `COMPLAINT_ROUTES`, `COMPLAINT_PAGE_SIZE`
- `PRIORITY_OPTIONS`, `PRIORITY_COLOR`, `PRIORITY_WEIGHT`
- `STATUS_OPTIONS`, `STATUS_COLOR`, `STATUS_FLOW`, `KANBAN_COLUMNS`
- `SLA_STATUS_OPTIONS`, `SLA_STATUS_COLOR`, `DEFAULT_SLA_POLICIES`
- `ESCALATION_LEVEL_OPTIONS`, `ESCALATION_STATUS_COLOR`, `ESCALATION_TRIGGER_HOURS`

## Dependencies

### Shared Packages
- `@ams/ui` — all UI primitives (`ServerTable`, `BarChart`, `PieChart`, `KPIWidget`, `Timeline`, `Badge`, `Progress`, `Button`, `Card`, `Tabs`, `Drawer`, `Dialog`, `FormField`, `Input`, `Textarea`, `SelectField`, `Checkbox`, `SearchInput`, `FileUpload`, `PageHeader`, `Breadcrumbs`, `LoadingState`, `ErrorState`)
- `zod` — form validation
- `react-hook-form` + `@hookform/resolvers/zod` — form state
- `@tanstack/react-query` — server state
- `react-router-dom` — navigation

### Application Shared Layer
- `@/api/complaints.api` — shared HTTP client
- `@/api/client` — base Axios instance
- `@/hooks/usePagination`, `@/hooks/useDebounce`
- `@/lib` — query client, `complaintKeys`
- `@/types/common.types`, `@/types/api.types`
- `@/constants/query.constants` — `STALE_TIME`
- `@/utils/formatDate`

## Allowed Imports

- `@ams/*` packages
- `@/api/*`, `@/components/*`, `@/hooks/*`, `@/types/*`, `@/config/*`, `@/lib/*`, `@/constants/*`, `@/utils/*`
- `react`, `react-router-dom`, `react-hook-form`, `zod`, `@tanstack/react-query`

## Forbidden Imports

- `@modules/residents`, `@modules/units`, `@modules/visitors`
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
