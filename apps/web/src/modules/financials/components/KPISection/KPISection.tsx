import { KPIWidget } from '@ams/ui';
import type { FinancialDashboard } from '../../types/analytics.types';

export interface KPISectionProps {
  dashboard: FinancialDashboard;
  loading?:  boolean;
}

<<<<<<< HEAD
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
=======
export function KPISection({ kpi, loading }: KPISectionProps) {
  const items = [
    { title: 'Total Revenue',    value: `₹${kpi.totalRevenue.toLocaleString()}` },
    { title: 'Total Expenses',   value: `₹${kpi.totalExpenses.toLocaleString()}` },
    { title: 'Net Surplus',      value: `₹${kpi.netSurplus.toLocaleString()}` },
    { title: 'Outstanding Dues', value: `₹${kpi.outstandingDues.toLocaleString()}` },
    { title: 'Collection Rate',  value: `${kpi.collectionRate.toFixed(1)}%` },
    { title: 'Defaulters',       value: kpi.defaulterCount },
    { title: 'Monthly Revenue',  value: `₹${kpi.monthlyRevenue.toLocaleString()}` },
    { title: 'Monthly Expenses', value: `₹${kpi.monthlyExpenses.toLocaleString()}` },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <KPIWidget
          key={item.title}
          title={item.title}
          value={item.value}
          loading={loading}
        />
      ))}
>>>>>>> d852c2e (final)
    </div>
  );
}
