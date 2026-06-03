import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Breadcrumbs, Button, PageHeader, ErrorState, LoadingState,
  Card, CardContent, CardHeader, CardTitle, Badge, StatusBadge,
} from '@ams/ui';
import { useResident }       from '../hooks/useResident';
import { useVehicles }       from '../hooks/useVehicles';
import { usePets }           from '../hooks/usePets';
import { useLease }          from '../hooks/useLease';
import { useDeleteResident } from '../hooks/useDeleteResident';
import { VehicleTable }      from '../components/VehicleTable';
import { PetTable }          from '../components/PetTable';
import { LeaseSection }      from '../components/LeaseSection';
import { RESIDENT_ROUTES }   from '../constants/resident.constants';
import { formatDate }        from '@/utils/formatDate';
import { formatPhone }       from '@/utils/formatPhone';
import type { ReactNode }    from 'react';

function Field({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="space-y-0.5">
      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="text-sm">{value ?? '—'}</dd>
    </div>
  );
}

export function ResidentDetailPage() {
  const { id }  = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const { data, isLoading, isError }       = useResident(id!);
  const { data: vehiclesData }             = useVehicles(id!);
  const { data: petsData }                 = usePets(id!);
  const { data: leaseData }                = useLease(id!);
  const { mutate: deleteResident, isPending: isDeleting } = useDeleteResident();

  if (isLoading) return <LoadingState variant="skeleton" rows={8} />;
  if (isError)   return <ErrorState onRetry={() => void 0} />;

  const r = data?.data;
  if (!r) return <ErrorState onRetry={() => void 0} />;

  const vehicles = vehiclesData?.data ?? [];
  const pets     = petsData?.data     ?? [];
  const lease    = leaseData?.data    ?? null;

  return (
    <div className="space-y-6">
      <PageHeader
        title={r.fullName}
        description={`Unit ${r.unitNumber} · ${r.type.toLowerCase()}`}
        breadcrumbs={
          <Breadcrumbs items={[
            { label: 'Dashboard',  href: '/dashboard' },
            { label: 'Residents', href: RESIDENT_ROUTES.LIST },
            { label: r.fullName },
          ]} />
        }
        actions={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => void navigate(RESIDENT_ROUTES.EDIT.replace(':id', id!))}>
              Edit
            </Button>
            {confirmDelete ? (
              <Button variant="destructive" loading={isDeleting} onClick={() => deleteResident(id!)}>
                Confirm Delete
              </Button>
            ) : (
              <Button variant="outline" onClick={() => setConfirmDelete(true)}>
                Delete
              </Button>
            )}
          </div>
        }
      />

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Profile</CardTitle>
            <StatusBadge status={r.status} />
          </div>
        </CardHeader>
        <CardContent>
          <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            <Field label="Full Name"     value={r.fullName} />
            <Field label="Email"         value={r.email} />
            <Field label="Phone"         value={formatPhone(r.phone)} />
            <Field label="Unit"          value={r.unitNumber} />
            <Field label="Type"          value={<span className="capitalize">{r.type.toLowerCase()}</span>} />
            <Field label="Date of Birth" value={r.dateOfBirth ? formatDate(r.dateOfBirth) : '—'} />
            <Field label="Gender"        value={r.gender ? <span className="capitalize">{r.gender.toLowerCase()}</span> : '—'} />
            <Field label="Joined"        value={formatDate(r.createdAt)} />
          </dl>
        </CardContent>
      </Card>

      {r.emergencyContact && (
        <Card>
          <CardHeader><CardTitle className="text-base">Emergency Contact</CardTitle></CardHeader>
          <CardContent>
            <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
              <Field label="Name"         value={r.emergencyContact.name} />
              <Field label="Relationship" value={r.emergencyContact.relationship} />
              <Field label="Phone"        value={formatPhone(r.emergencyContact.phone)} />
              <Field label="Email"        value={r.emergencyContact.email ?? '—'} />
            </dl>
          </CardContent>
        </Card>
      )}

      <LeaseSection lease={lease} residentId={r.id} />

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Vehicles</CardTitle>
            <Badge variant="secondary">{vehicles.length}</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <VehicleTable data={vehicles} residentId={r.id} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Pets</CardTitle>
            <Badge variant="secondary">{pets.length}</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <PetTable data={pets} residentId={r.id} />
        </CardContent>
      </Card>
    </div>
  );
}
