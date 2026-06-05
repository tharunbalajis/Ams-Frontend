import { useParams, useNavigate } from 'react-router-dom';
import {
  Breadcrumbs, Button, PageHeader, ErrorState, LoadingState,
  Card, CardContent, CardHeader, CardTitle, Badge,
} from '@ams/ui';
import { useResident }       from '../hooks/useResident';
import { useDeleteResident } from '../hooks/useDeleteResident';
import { RESIDENT_ROUTES }   from '../constants/resident.constants';
import { formatDate }        from '@/utils/formatDate';
import type { ReactNode }    from 'react';
import { useState }          from 'react';

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

  const { data, isLoading, isError } = useResident(id!);
  const { mutate: deleteResident, isPending: isDeleting } = useDeleteResident();

  if (isLoading) return <LoadingState variant="skeleton" rows={8} />;
  if (isError)   return <ErrorState onRetry={() => void 0} />;

  const r = data?.data;
  if (!r) return <ErrorState onRetry={() => void 0} />;

  return (
    <div className="space-y-6">
      <PageHeader
        title={r.full_name}
        description={`Unit ${r.unit_id} · ${(r.resident_type ?? '').toLowerCase()}`}
        breadcrumbs={
          <Breadcrumbs items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Residents', href: RESIDENT_ROUTES.LIST },
            { label: r.full_name },
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
            <Badge variant={r.is_active ? 'success' : 'secondary'}>
              {r.is_active ? 'Active' : 'Inactive'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            <Field label="Full Name"     value={r.full_name} />
            <Field label="Email"         value={r.email} />
            <Field label="Mobile"        value={r.mobile_primary} />
            <Field label="Unit ID"       value={r.unit_id} />
            <Field label="Type"          value={<span className="capitalize">{(r.resident_type ?? '').toLowerCase()}</span>} />
            <Field label="Relationship"  value={r.relationship} />
            <Field label="Move In"       value={formatDate(r.move_in_date)} />
            <Field label="Move Out"      value={r.move_out_date ? formatDate(r.move_out_date) : '—'} />
            <Field label="Created"       value={formatDate(r.created_at)} />
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}
