import { KPIWidget } from '@ams/ui';
import type { FinancialKPI } from '../../types/analytics.types';

export interface KPISectionProps {
  kpi:      FinancialKPI;
  loading?: boolean;
}

export function KPISection({ kpi, loading }: KPISectionProps) {
  const items = [
    { title: 'Total Revenue',    value: `₹${kpi.totalRevenue.toLocaleString()}`,    description: 'All time' },
    { title: 'Total Expenses',   value: `₹${kpi.totalExpenses.toLocaleString()}`,   description: 'All time' },
    { title: 'Net Surplus',      value: `₹${kpi.netSurplus.toLocaleString()}`,      description: 'Revenue minus expenses' },
    { title: 'Outstanding Dues', value: `₹${kpi.outstandingDues.toLocaleString()}`, description: 'Unpaid invoices' },
    { title: 'Collection Rate',  value: `${kpi.collectionRate.toFixed(1)}%`,        description: 'This period' },
    { title: 'Defaulters',       value: kpi.defaulterCount,                         description: 'Overdue accounts' },
    { title: 'Monthly Revenue',  value: `₹${kpi.monthlyRevenue.toLocaleString()}`,  description: 'Current month' },
    { title: 'Monthly Expenses', value: `₹${kpi.monthlyExpenses.toLocaleString()}`, description: 'Current month' },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <KPIWidget
          key={item.title}
          title={item.title}
          value={item.value}
          description={item.description}
          loading={loading}
        />
      ))}
    </div>
  );
}
