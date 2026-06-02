import { useMutation } from '@tanstack/react-query';
import { Breadcrumbs, PageHeader } from '@ams/ui';
import { SOSCard }       from '../components/SOSCard';
import { SOSAlertTable } from '../components/SOSAlertTable';
import { useSOSActive, useSOS } from '../hooks/useSOS';
import { sosApi }        from '../api/sos.api';
import { queryClient }   from '@/lib/queryClient';
import { VISITOR_ROUTES } from '../constants/visitor.constants';

export function SOSDashboardPage() {
  const { data: activeAlerts, isLoading: loadingActive } = useSOSActive();
  const { data: allAlerts,    isLoading: loadingAll }    = useSOS();

  const { mutate: acknowledge } = useMutation({
    mutationFn: (id: string) => sosApi.acknowledge(id),
    onSuccess:  () => queryClient.invalidateQueries({ queryKey: ['visitors', 'sos'] }),
  });

  const { mutate: resolve } = useMutation({
    mutationFn: ({ id, notes }: { id: string; notes?: string }) =>
      sosApi.resolve(id, { status: 'resolved', resolutionNotes: notes }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['visitors', 'sos'] }),
  });

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

      {active.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-destructive">
            Active Alerts ({active.length})
          </h2>
          <div className="grid gap-4 lg:grid-cols-2">
            {active.map((alert) => (
              <SOSCard
                key={alert.id}
                alert={alert}
                onAcknowledge={() => acknowledge(alert.id)}
                onResolve={() => resolve({ id: alert.id })}
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
