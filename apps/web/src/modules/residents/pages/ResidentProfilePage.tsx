import { useParams } from 'react-router-dom';
import { Breadcrumbs, ErrorState, LoadingState, PageHeader } from '@ams/ui';
import { ResidentProfile } from '../components/ResidentProfile';
import { useResident }     from '../hooks/useResident';
import { useVehicles }     from '../hooks/useVehicles';
import { usePets }         from '../hooks/usePets';
import { useLease }        from '../hooks/useLease';
import { RESIDENT_ROUTES } from '../constants/resident.constants';

export function ResidentProfilePage() {
  const { id } = useParams<{ id: string }>();

  const { data: residentData, isLoading, isError } = useResident(id!);
  const { data: vehiclesData } = useVehicles(id!);
  const { data: petsData }     = usePets(id!);
  const { data: leaseData }    = useLease(id!);

  if (isLoading) return <LoadingState variant="skeleton" rows={8} />;
  if (isError)   return <ErrorState onRetry={() => void 0} />;

  const resident = residentData?.data;

  return (
    <div className="space-y-6">
      <PageHeader
        title={resident?.fullName ?? 'Profile'}
        description="Complete resident profile and history"
        breadcrumbs={
          <Breadcrumbs items={[
            { label: 'Dashboard',  href: '/dashboard' },
            { label: 'Residents', href: RESIDENT_ROUTES.LIST },
            { label: resident?.fullName ?? 'Profile', href: RESIDENT_ROUTES.DETAIL.replace(':id', id!) },
            { label: 'Profile' },
          ]} />
        }
      />
      <ResidentProfile
        resident={resident}
        vehicles={vehiclesData?.data ?? []}
        pets={petsData?.data ?? []}
        lease={leaseData?.data ?? null}
      />
    </div>
  );
}
