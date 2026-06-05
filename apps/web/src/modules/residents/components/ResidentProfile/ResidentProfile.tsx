import { Badge, Card, CardContent, CardHeader, CardTitle } from '@ams/ui';
import { formatDate } from '@/utils/formatDate';
import type { Resident } from '../../types/resident.types';
import type { ReactNode } from 'react';

export interface ResidentProfileProps {
  resident?: Resident;
  vehicles?: unknown[];
  pets?:     unknown[];
  lease?:    unknown | null;
}

export function ResidentProfile({ resident }: ResidentProfileProps) {
  if (!resident) return null;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Profile Information</CardTitle>
            <Badge variant={resident.is_active ? 'success' : 'secondary'}>
              {resident.is_active ? 'Active' : 'Inactive'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            <ProfileField label="Full Name"    value={resident.full_name} />
            <ProfileField label="Email"        value={resident.email ?? '—'} />
            <ProfileField label="Mobile"       value={resident.mobile_primary} />
            <ProfileField label="Unit ID"      value={resident.unit_id} />
            <ProfileField label="Type"         value={<span className="capitalize">{(resident.resident_type ?? '').toLowerCase()}</span>} />
            <ProfileField label="Relationship" value={resident.relationship} />
            <ProfileField label="Move In"      value={formatDate(resident.move_in_date)} />
            <ProfileField label="Move Out"     value={resident.move_out_date ? formatDate(resident.move_out_date) : '—'} />
            <ProfileField label="Joined"       value={formatDate(resident.created_at)} />
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}

function ProfileField({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="space-y-0.5">
      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="text-sm text-foreground">{value}</dd>
    </div>
  );
}
