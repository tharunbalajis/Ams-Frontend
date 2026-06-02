import { useState } from 'react';
import { Breadcrumbs, Button, Card, CardContent, CardHeader, CardTitle, PageHeader, SelectField } from '@ams/ui';
import { useFinancialReports }  from '../hooks/useFinancialReports';
import { FINANCIAL_ROUTES }     from '../constants/invoice.constants';
import type { ReportType } from '../api/reports.api';

const REPORT_TYPE_OPTIONS: { label: string; value: ReportType }[] = [
  { label: 'Collection Report',  value: 'collection' },
  { label: 'Expense Report',     value: 'expense' },
  { label: 'Revenue Report',     value: 'revenue' },
  { label: 'Defaulters Report',  value: 'defaulters' },
  { label: 'Budget Report',      value: 'budget' },
];

export function FinancialReportsPage() {
  const [reportType, setReportType] = useState<ReportType>('collection');
  const [dateRange, setDateRange]   = useState({ dateFrom: '', dateTo: '' });

  const { mutate: generateReport, isPending } = useFinancialReports();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Financial Reports"
        description="Generate and download financial reports"
        breadcrumbs={<Breadcrumbs items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Financials', href: FINANCIAL_ROUTES.DASHBOARD }, { label: 'Reports' }]} />}
      />

      <Card className="max-w-xl">
        <CardHeader><CardTitle>Generate Report</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="mb-1.5 text-sm font-medium">Report Type</p>
            <SelectField
              value={reportType}
              onValueChange={(v) => setReportType(v as ReportType)}
              options={REPORT_TYPE_OPTIONS}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="mb-1.5 text-sm font-medium">From</p>
              <input type="date" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={dateRange.dateFrom} onChange={(e) => setDateRange((r) => ({ ...r, dateFrom: e.target.value }))} />
            </div>
            <div>
              <p className="mb-1.5 text-sm font-medium">To</p>
              <input type="date" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={dateRange.dateTo} onChange={(e) => setDateRange((r) => ({ ...r, dateTo: e.target.value }))} />
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              loading={isPending}
              onClick={() => generateReport({ type: reportType, ...dateRange, format: 'csv' })}
            >
              Export CSV
            </Button>
            <Button
              loading={isPending}
              onClick={() => generateReport({ type: reportType, ...dateRange, format: 'pdf' })}
            >
              Export PDF
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
