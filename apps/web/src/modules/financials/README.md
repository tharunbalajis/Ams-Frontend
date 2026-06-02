# Financials Module

## Responsibilities

Manages the full financial lifecycle of the AMS platform: invoice generation, payment recording, expense tracking, collection monitoring, defaulter management, budget tracking, and financial analytics.

## Features

- Paginated invoice list with inline payment action; detail page with line items and payment history
- Payment recording with method, reference, and amount; full payments ledger
- Expense submission with receipt upload, category, and approval workflow
- Collections page with summary KPIs (billed, collected, pending, collection rate)
- Defaulters page with aging bucket chart and notice status
- Financial dashboard with 8 KPI widgets, revenue/expense/collection trend charts
- Budget tracking cards with utilization progress per expense category
- Report generation (CSV/PDF) for collection, expense, revenue, defaulters, budget

## Components

| Component | Description |
|---|---|
| `InvoiceTable` | Paginated invoice list with balance-due highlight and pay action |
| `InvoiceForm` | Generate invoice with dynamic line items, tax rate, due date |
| `InvoiceSummary` | Full invoice card with line items table, totals, and action buttons |
| `PaymentTable` | Paginated payment transactions table |
| `PaymentHistory` | Compact payment list for invoice detail sidebar |
| `ExpenseTable` | Paginated expense list with approval action |
| `ExpenseForm` | Expense submission with receipt upload |
| `CollectionTable` | Collection records with on-time / overdue badges |
| `CollectionSummary` | 4-card KPI row + collection rate progress bar |
| `KPISection` | 8-widget financial KPI grid |
| `DefaultersTable` | Defaulter list with outstanding amount, days overdue, notice status |
| `FinancialFilters` | Reusable search + type/status + date-range filter bar |
| `BudgetCard` | Budget utilization card with per-category breakdown |
| `FinancialOverview` | Composites all KPI, chart, and defaulter components |
| `AgingBucketChart` | Bar chart wrapper for aging bucket data |
| `CollectionTrendChart` | Line chart wrapper for collection trend |
| `RevenueTrendChart` | Line chart wrapper for revenue trend |
| `ExpenseTrendChart` | Bar chart wrapper for expense trend |
| `TopDefaultersTable` | Top-N defaulters sorted by outstanding amount |

## Pages

| Page | Route | Description |
|---|---|---|
| `FinancialDashboardPage` | `/financials` | Full analytics overview with date filter |
| `InvoiceListPage` | `/financials/invoices` | Paginated invoice list with generate dialog |
| `InvoiceDetailPage` | `/financials/invoices/:id` | Invoice detail with payment recording |
| `PaymentsPage` | `/financials/payments` | All payment transactions |
| `ExpensesPage` | `/financials/expenses` | Expense list with add dialog |
| `CollectionsPage` | `/financials/collections` | Collection summary + records |
| `DefaultersPage` | `/financials/defaulters` | Defaulter list + aging chart |
| `FinancialReportsPage` | `/financials/reports` | Report type + date range + export |
| `BudgetTrackingPage` | `/financials/budgets` | Budget cards by period |

## Hooks

| Hook | Type | Description |
|---|---|---|
| `useInvoices` | Query | Paginated invoice list |
| `useInvoice` | Query | Single invoice by ID |
| `usePayments` | Query | Paginated payments |
| `useExpenses` | Query | Paginated expenses |
| `useCollections` | Query | Collection records |
| `useCollectionSummary` | Query | Summary KPIs for collections |
| `useDefaulters` | Query | Defaulter list |
| `useFinancialReports` | Mutation | Trigger report generation |
| `useFinancialAnalytics` | Query | Full analytics summary |
| `useMaintenanceCharges` | Query | Maintenance charge records |

## API

| Object | Description |
|---|---|
| `invoicesApi` | Invoice CRUD (delegates to shared layer) |
| `paymentsApi` | Payment CRUD (delegates to shared layer) |
| `expensesApi` | Expense CRUD (delegates to shared layer) |
| `collectionsApi` | Collection records, summary, defaulters, aging |
| `reportsApi` | Generate and download reports |
| `analyticsApi` | Financial analytics summary |
| `maintenanceApi` | Generate and query maintenance charges |

## Schemas (Zod)

- `createInvoiceSchema`, `updateInvoiceSchema`
- `createPaymentSchema`
- `createExpenseSchema`, `updateExpenseSchema`
- `collectionFiltersSchema`
- `generateMaintenanceSchema`
- `createBudgetSchema`

## Types

- `Invoice`, `InvoiceListItem`, `InvoiceStatus`, `InvoiceType`, `InvoiceLineItem`
- `Payment`, `PaymentListItem`, `PaymentMethod`, `PaymentStatus`
- `Expense`, `ExpenseListItem`, `ExpenseCategory`, `ExpenseStatus`
- `CollectionRecord`, `CollectionSummary`, `Defaulter`, `AgingBucket`
- `MaintenanceCharge`, `MaintenanceChargeType`, `GenerateMaintenancePayload`
- `Budget`, `BudgetLineItem`, `BudgetStatus`
- `FinancialAnalytics`, `FinancialKPI`, `TrendPoint`

## Constants

- `INVOICE_STATUS_OPTIONS`, `INVOICE_STATUS_COLOR`, `INVOICE_TYPE_OPTIONS`
- `FINANCIAL_ROUTES`, `FINANCIAL_PAGE_SIZE`
- `PAYMENT_METHOD_OPTIONS`, `PAYMENT_STATUS_OPTIONS`, `PAYMENT_STATUS_COLOR`
- `EXPENSE_CATEGORY_OPTIONS`, `EXPENSE_STATUS_OPTIONS`, `EXPENSE_STATUS_COLOR`
- `COLLECTION_RATE_THRESHOLDS`, `AGING_BUCKET_LABELS`, `NOTICE_STATUS_OPTIONS`
- `MAINTENANCE_CHARGE_TYPE_OPTIONS`, `LATE_FEE_PERCENTAGE`, `LATE_FEE_GRACE_DAYS`
- `BUDGET_STATUS_OPTIONS`, `BUDGET_STATUS_COLOR`, `BUDGET_UTILIZATION_THRESHOLDS`

## Dependencies

### Shared Packages
- `@ams/ui` — all UI primitives (`ServerTable`, `DataTable`, `KPIWidget`, `LineChart`, `BarChart`, `Progress`, `Badge`, `Button`, `Card`, `Dialog`, `FormField`, `Input`, `SelectField`, `Textarea`, `FileUpload`, `PageHeader`, `Breadcrumbs`, `LoadingState`, `ErrorState`)
- `zod` — form validation
- `react-hook-form` + `@hookform/resolvers/zod` — form state
- `@tanstack/react-query` — server state
- `react-router-dom` — navigation

### Application Shared Layer
- `@/api/financials.api` — shared HTTP client
- `@/api/client` — base Axios instance
- `@/hooks/usePagination`, `@/hooks/useDebounce`
- `@/lib` — query client, `financialKeys`
- `@/types/common.types`, `@/types/api.types`
- `@/constants/query.constants`
- `@/utils/formatDate`

## Allowed Imports

- `@ams/*` packages
- `@/api/*`, `@/components/*`, `@/hooks/*`, `@/types/*`, `@/config/*`, `@/lib/*`, `@/constants/*`, `@/utils/*`
- `react`, `react-router-dom`, `react-hook-form`, `zod`, `@tanstack/react-query`

## Forbidden Imports

- `@modules/residents`, `@modules/units`, `@modules/visitors`, `@modules/complaints`
- `@modules/staff`, `@modules/assets`, `@modules/meetings`, `@modules/settings`

## Public Exports

```ts
export * from './types';
export * from './constants';
export * from './schemas';
export * from './hooks';
export * from './api';
export * from './components';
export * from './pages';
```
