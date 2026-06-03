import { Breadcrumbs, PageHeader } from '@ams/ui';
import { SOSCard }          from '../components/SOSCard';
import { SOSAlertTable }    from '../components/SOSAlertTable';
import { useSOSActive, useSOS, useAcknowledgeSOS, useResolveSOS } from '../hooks/useSOS';
import { VISITOR_ROUTES }   from '../constants/visitor.constants';

export function SOSDashboardPage() {
  const { data: activeAlerts } = useSOSActive();
  const { data: allAlerts,    isLoading: loadingAll }    = useSOS();

  const { mutate: acknowledge } = useAcknowledgeSOS();
  const { mutate: resolve }     = useResolveSOS();

  const active = activeAlerts?.data ?? [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="SOS Dashboard"
        description="Monitor and respond to emergency alerts"
        breadcrumbs={
          <Breadcrumbs items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Visitors',  href: VISITOR_ROUTES.LIST },
            { label: 'SOS' },
          ]} />
        }
      />

      {loadingActive && (
        <div className="h-24 animate-pulse rounded-lg bg-muted" />
      )}

      {active.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-destructive">Active Alerts ({active.length})</h2>
          <div className="grid gap-4 lg:grid-cols-2">
            {active.map((alert) => (
              <SOSCard
                key={alert.id}
                alert={alert}
                onAcknowledge={() => acknowledge(alert.id)}
                onResolve={() => resolve({ id: alert.id, payload: { status: 'RESOLVED' } })}
              />
            ))}
          </div>
        </div>
      )}

      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Alert History</h2>
        <SOSAlertTable
          data={allAlerts?.data ?? []}
          loading={loadingAll}
          onAcknowledge={(id) => acknowledge(id)}
        />
      </div>
    </div>
  );
}
