import { useParams } from 'react-router-dom';
import { Breadcrumbs, LoadingState, PageHeader } from '@ams/ui';
import { ResidentForm }    from '../components/ResidentForm';
import { useResident }     from '../hooks/useResident';
import { RESIDENT_ROUTES } from '../constants/resident.constants';

export function EditResidentPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useResident(id!);
  const resident = data?.data;

  if (isLoading) return <LoadingState variant="skeleton" rows={8} />;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Resident"
        description={`Editing ${resident?.full_name ?? 'resident'}`}
        breadcrumbs={
          <Breadcrumbs items={[
            { label: 'Dashboard',  href: '/dashboard' },
            { label: 'Residents', href: RESIDENT_ROUTES.LIST },
            { label: resident?.full_name ?? 'Edit', href: RESIDENT_ROUTES.DETAIL.replace(':id', id!) },
            { label: 'Edit' },
          ]} />
        }
      />
      <ResidentForm mode="edit" resident={resident} residentId={id} />
    </div>
  );
}
