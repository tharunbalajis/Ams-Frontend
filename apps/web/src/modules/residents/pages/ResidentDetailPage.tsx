import { useParams, useNavigate } from 'react-router-dom';
import { Breadcrumbs, Button, ErrorState, LoadingState, PageHeader } from '@ams/ui';
import { useResident }      from '../hooks/useResident';
import { useDeleteResident } from '../hooks/useDeleteResident';
import { RESIDENT_ROUTES }  from '../constants/resident.constants';

export function ResidentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useResident(id!);
  const { mutate: deleteResident, isPending: isDeleting } = useDeleteResident();

  if (isLoading) return <LoadingState variant="skeleton" rows={6} />;
  if (isError)   return <ErrorState onRetry={() => void 0} />;

  const resident = data?.data;

  return (
    <div className="space-y-6">
      <PageHeader
        title={resident?.fullName ?? 'Resident'}
        description={`Unit ${resident?.unitNumber} · ${resident?.type}`}
        breadcrumbs={
          <Breadcrumbs items={[
            { label: 'Dashboard',  href: '/dashboard' },
            { label: 'Residents', href: RESIDENT_ROUTES.LIST },
            { label: resident?.fullName ?? 'Detail' },
          ]} />
        }
        actions={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => void navigate(RESIDENT_ROUTES.PROFILE.replace(':id', id!))}>
              View Profile
            </Button>
            <Button variant="outline" onClick={() => void navigate(RESIDENT_ROUTES.EDIT.replace(':id', id!))}>
              Edit
            </Button>
            <Button
              variant="destructive"
              loading={isDeleting}
              onClick={() => deleteResident(id!)}
            >
              Delete
            </Button>
          </div>
        }
      />
      {/* Resident detail sections — implement in next phase */}
    </div>
  );
}
