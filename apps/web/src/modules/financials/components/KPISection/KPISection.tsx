import { KPIWidget } from '@ams/ui';
import type { FinancialDashboard } from '../../types/analytics.types';

export interface KPISectionProps {
  dashboard: FinancialDashboard;
  loading?:  boolean;
}

export function KPISection({ dashboard: d, loading }: KPISectionProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <KPIWidget title="Total Revenue"    value={`₹${d.totalRevenue.toLocaleString()}`}    loading={loading} />
      <KPIWidget title="Total Expenses"   value={`₹${d.totalExpenses.toLocaleString()}`}   loading={loading} />
      <KPIWidget title="Net Surplus"      value={`₹${d.netSurplus.toLocaleString()}`}      loading={loading} />
      <KPIWidget title="Outstanding Dues" value={`₹${d.outstandingDues.toLocaleString()}`} loading={loading} />
      <KPIWidget title="Collection Rate"  value={`${d.collectionRate.toFixed(1)}%`}        loading={loading} />
      <KPIWidget title="Pending Invoices" value={d.pendingInvoices}                        loading={loading} />
      <KPIWidget title="Overdue Invoices" value={d.overdueInvoices}                        loading={loading} />
    </div>
  );
}
