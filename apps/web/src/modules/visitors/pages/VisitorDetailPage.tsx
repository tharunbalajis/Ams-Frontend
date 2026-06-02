import { useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Breadcrumbs, ErrorState, LoadingState, PageHeader } from '@ams/ui';
import { VisitorDetailCard }        from '../components/VisitorDetailCard';
import { VisitorTimeline }          from '../components/VisitorTimeline';
import { SecurityVerificationCard } from '../components/SecurityVerificationCard';
import { useVisitor }               from '../hooks/useVisitor';
import { visitorsApi }              from '../api/visitors.api';
import { securityApi }              from '../api/security.api';
import { queryClient }              from '@/lib/queryClient';
import { VISITOR_ROUTES }           from '../constants/visitor.constants';

export function VisitorDetailPage() {
  const { id = '' } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useVisitor(id);

  const { mutate: checkIn }  = useMutation({
    mutationFn: () => visitorsApi.checkIn(id),
    onSuccess:  () => queryClient.invalidateQueries({ queryKey: ['visitors', 'detail', id] }),
  });

  const { mutate: checkOut } = useMutation({
    mutationFn: () => visitorsApi.checkOut(id),
    onSuccess:  () => queryClient.invalidateQueries({ queryKey: ['visitors', 'detail', id] }),
  });

  if (isLoading) return <LoadingState />;
  if (isError || !data?.data) return <ErrorState />;

  const visitor = data.data;

  return (
    <div className="space-y-6">
      <PageHeader
        title={visitor.name}
        description={`${visitor.type.replace('_', ' ')} · Unit ${visitor.unitNumber}`}
        breadcrumbs={
          <Breadcrumbs items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Visitors',  href: VISITOR_ROUTES.LIST },
            { label: visitor.name },
          ]} />
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <VisitorDetailCard
            visitor={visitor}
            onCheckIn={() => checkIn()}
            onCheckOut={() => checkOut()}
          />
        </div>
        <div>
          <VisitorTimeline visitor={visitor} />
        </div>
      </div>
    </div>
  );
}
