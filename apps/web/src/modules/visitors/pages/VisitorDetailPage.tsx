import { useParams }           from 'react-router-dom';
import { Breadcrumbs, ErrorState, LoadingState, PageHeader } from '@ams/ui';
<<<<<<< HEAD
import { VisitorDetailCard }   from '../components/VisitorDetailCard';
import { VisitorTimeline }     from '../components/VisitorTimeline';
import { useVisitor, useCheckInVisitor, useCheckOutVisitor } from '../hooks/useVisitor';
import { VISITOR_ROUTES }      from '../constants/visitor.constants';
=======
import { VisitorDetailCard } from '../components/VisitorDetailCard';
import { VisitorTimeline }   from '../components/VisitorTimeline';
import { useVisitor }        from '../hooks/useVisitor';
import { visitorsApi }       from '../api/visitors.api';
import { queryClient }       from '@/lib/queryClient';
import { VISITOR_ROUTES }           from '../constants/visitor.constants';
>>>>>>> d852c2e (final)

export function VisitorDetailPage() {
  const { id = '' } = useParams<{ id: string }>();

  const { data, isLoading, isError }  = useVisitor(id);
  const { mutate: checkIn }  = useCheckInVisitor();
  const { mutate: checkOut } = useCheckOutVisitor();

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
            onCheckIn={() => checkIn({ id })}
            onCheckOut={() => checkOut(id)}
          />
        </div>
        <div>
          <VisitorTimeline visitor={visitor} />
        </div>
      </div>
    </div>
  );
}
