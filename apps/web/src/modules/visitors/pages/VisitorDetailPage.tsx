import { useParams }           from 'react-router-dom';
import { Breadcrumbs, ErrorState, LoadingState, PageHeader } from '@ams/ui';
import { VisitorDetailCard }   from '../components/VisitorDetailCard';
import { VisitorTimeline }     from '../components/VisitorTimeline';
import { useVisitor, useCheckInVisitor, useCheckOutVisitor } from '../hooks/useVisitor';
import { VISITOR_ROUTES }      from '../constants/visitor.constants';

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
        title={visitor.visitor_name}
        description={`${visitor.visitor_type.replace(/_/g, ' ')} · Unit ${visitor.unit_id}`}
        breadcrumbs={
          <Breadcrumbs items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Visitors',  href: VISITOR_ROUTES.LIST },
            { label: visitor.visitor_name },
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
