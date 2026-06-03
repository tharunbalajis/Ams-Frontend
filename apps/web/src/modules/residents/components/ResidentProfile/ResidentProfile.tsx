import { Badge, Card, CardContent, CardHeader, CardTitle, StatusBadge } from '@ams/ui';
import { formatDate } from '@/utils/formatDate';
import { formatPhone } from '@/utils/formatPhone';
import { VehicleTable }  from '../VehicleTable';
import { PetTable }      from '../PetTable';
import { LeaseSection }  from '../LeaseSection';
import type { Resident } from '../../types/resident.types';
import type { Vehicle }  from '../../types/vehicle.types';
import type { Pet }      from '../../types/pet.types';
import type { Lease }    from '../../types/lease.types';

export interface ResidentProfileProps {
  resident?:  Resident;
  vehicles:   Vehicle[];
  pets:       Pet[];
  lease:      Lease | null;
}

export function ResidentProfile({ resident, vehicles, pets, lease }: ResidentProfileProps) {
  if (!resident) return null;

  return (
    <div className="space-y-6">
      {/* Profile Information */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Profile Information</CardTitle>
            <StatusBadge status={resident.status} />
          </div>
        </CardHeader>
        <CardContent>
          <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            <ProfileField label="Full Name"     value={resident.fullName} />
            <ProfileField label="Email"         value={resident.email} />
            <ProfileField label="Phone"         value={formatPhone(resident.phone)} />
            <ProfileField label="Unit"          value={resident.unitNumber} />
            <ProfileField label="Type"          value={<span className="capitalize">{resident.type}</span>} />
            <ProfileField label="Date of Birth" value={formatDate(resident.dateOfBirth)} />
            <ProfileField label="Gender"        value={<span className="capitalize">{resident.gender ?? '—'}</span>} />
            <ProfileField label="Joined"        value={formatDate(resident.createdAt)} />
          </dl>
        </CardContent>
      </Card>

      {/* Emergency Contact */}
      {resident.emergencyContact && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Emergency Contact</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
              <ProfileField label="Name"         value={resident.emergencyContact.name} />
              <ProfileField label="Relationship" value={resident.emergencyContact.relationship} />
              <ProfileField label="Phone"        value={formatPhone(resident.emergencyContact.phone)} />
              <ProfileField label="Email"        value={resident.emergencyContact.email ?? '—'} />
            </dl>
          </CardContent>
        </Card>
      )}

      {/* Lease Information */}
      <LeaseSection lease={lease} residentId={resident.id} />

      {/* Vehicles */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Vehicles</CardTitle>
            <Badge variant="secondary">{vehicles.length}</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <VehicleTable data={vehicles} residentId={resident.id} />
        </CardContent>
      </Card>

      {/* Pets */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Pets</CardTitle>
            <Badge variant="secondary">{pets.length}</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <PetTable data={pets} residentId={resident.id} />
        </CardContent>
      </Card>
    </div>
  );
}

function ProfileField({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="space-y-0.5">
      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="text-sm text-foreground">{value}</dd>
    </div>
  );
}
