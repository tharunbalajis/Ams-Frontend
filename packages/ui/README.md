# @ams/ui

Enterprise shared UI component library for the Apartment Management System.

## Overview

Single source of truth for all AMS UI. Every module consumes components from this package — no module should create its own Button, Table, Modal, Badge, Input, or Drawer.

## Installation

Already linked as `workspace:*` in `apps/web/package.json`.

## Usage

```tsx
import { Button, DataTable, StatusBadge, Modal, MetricCard } from '@ams/ui';
import { cn } from '@ams/ui';
```

## Component Catalogue

### Buttons
| Component | Description |
|-----------|-------------|
| `Button` | Primary interactive element with 6 variants and 4 sizes, loading state, icon slots |

### Inputs
| Component | Description |
|-----------|-------------|
| `Input` | Text input with optional start/end adornments and error state |
| `TextArea` | Multi-line input with configurable resize |
| `SearchInput` | Input with search icon and optional clear button |

### Forms
| Component | Description |
|-----------|-------------|
| `FormField` | React Hook Form + Radix Label wrapper with validation message |
| `SelectField` | Radix Select dropdown, RHF-compatible |
| `DatePicker` | Native date input wrapper |
| `FileUpload` | Drag-and-drop file upload area |

### Badges
| Component | Description |
|-----------|-------------|
| `Badge` | Inline label with 8 variants |
| `StatusBadge` | Pre-mapped status → Badge (active, pending, paid, overdue, …) |

### Cards
| Component | Description |
|-----------|-------------|
| `Card` / `CardHeader` / `CardContent` / `CardFooter` | Composable card primitives |
| `MetricCard` | KPI card with value, trend arrow, and icon slot |

### Dialogs
| Component | Description |
|-----------|-------------|
| `Modal` + sub-parts | Full Radix Dialog implementation with size variants (sm → full) |
| `ConfirmDialog` | Pre-built confirm/cancel dialog with destructive variant |

### Drawers
| Component | Description |
|-----------|-------------|
| `Drawer` + sub-parts | Side panel (left/right) with sm/md/lg widths |

### Navigation
| Component | Description |
|-----------|-------------|
| `Sidebar` | Collapsible nav sidebar with groups, badges, active state |
| `Topbar` | App header with menu toggle, search, action, and user slots |
| `Breadcrumbs` | Breadcrumb trail from `BreadcrumbItem[]` |
| `PageHeader` | Page title + description + breadcrumbs + action bar |

### Tables
| Component | Description |
|-----------|-------------|
| `DataTable` | Client-side table: sorting, pagination, filtering, empty/loading state |
| `ServerTable` | Server-side table: external pagination + sort state |

### Feedback
| Component | Description |
|-----------|-------------|
| `EmptyState` | Empty content placeholder with icon, title, CTA |
| `LoadingState` | Spinner / skeleton / pulse variants |
| `ErrorState` | Error display with retry action |
| `NotFound` | 404 display with back action |

### Charts
| Component | Description |
|-----------|-------------|
| `LineChart` | Recharts line chart wrapper |
| `BarChart` | Recharts bar chart wrapper (stacked support) |
| `PieChart` | Recharts pie/donut chart wrapper |
| `KPIWidget` | Metric card with optional sparkline |

## Design Tokens

```ts
import { theme, cn } from '@ams/ui';
// theme.colors, theme.spacing, theme.layout, theme.typography
```

All components consume CSS custom properties from `apps/web/src/styles/globals.css`. Theming is controlled by toggling the `.dark` class on `<html>`.

## Rules

- **Never** import this package from another package (only from `apps/`)
- **Never** add business logic to this package
- **Never** import AMS module types here
