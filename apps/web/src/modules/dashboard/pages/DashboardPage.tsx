import { Breadcrumbs, PageHeader } from '@ams/ui';
import { KPISection }    from '../components/KPISection';
import { QuickActions }  from '../components/QuickActions';
import { AnalyticsGrid } from '../components/AnalyticsGrid';

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Overview of your apartment management system"
        breadcrumbs={<Breadcrumbs items={[{ label: 'Dashboard' }]} />}
      />

      <KPISection />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <AnalyticsGrid />
        </div>
        <div className="space-y-4">
          <QuickActions />
        </div>
      </div>
    </div>
  );
}
