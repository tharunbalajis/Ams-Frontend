# Dashboard Module

## Responsibilities

- Landing page after login
- Aggregated KPI view across all AMS modules (read-only)
- Metrics refresh every 5 minutes
- Analytics trend charts
- Permission-filtered quick actions

## Owned Features

| Component | Purpose |
|-----------|---------|
| `DashboardPage` | Root page — layout grid |
| `KPISection` | 8-card KPI metric grid |
| `QuickActions` | Permission-filtered shortcut buttons |
| `AnalyticsGrid` | 2×2 chart grid |
| `DashboardCharts` | Full 5-chart variant |
| `ResidentStats` | Resident count widget |
| `UnitStats` | Occupancy rate widget |
| `ComplaintStats` | Open complaints widget |
| `VisitorStats` | Active visitors widget |
| `FinancialStats` | Monthly collection widget |
| `StaffStats` | Active staff count widget |
| `AssetStats` | Operational assets widget |
| `MeetingStats` | Upcoming meetings widget |
| `ResidentTrendChart` | Resident growth line chart |
| `ComplaintTrendChart` | Complaint volume line chart |
| `CollectionTrendChart` | Monthly collection bar chart |
| `OccupancyChart` | Unit occupancy stacked bar |
| `VisitorTrendChart` | Visitor traffic line chart |

## Data Flow

```
DashboardPage
├── KPISection
│    └── 8 stat widgets → useDashboardMetrics() → GET /dashboard/metrics
├── AnalyticsGrid
│    └── 4 charts → useAnalytics() → GET /dashboard/analytics
└── QuickActions
     └── useQuickActions() → QUICK_ACTIONS filtered by usePermissions()
```

## Allowed Imports

```
@ams/ui
@/api/client
@/types/api.types
@/utils/formatCurrency
@/hooks/usePermissions
@/config/routes
@/constants/query.constants
react-router-dom
```

## Forbidden Imports

Any other AMS module:
```
@modules/residents  ✗
@modules/units      ✗
@modules/visitors   ✗
@modules/complaints ✗
@modules/financials ✗
@modules/staff      ✗
@modules/assets     ✗
@modules/meetings   ✗
```

## Public Exports

See `index.ts` — page, hooks, types, and widget constants.
