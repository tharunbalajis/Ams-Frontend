import { useParams, useNavigate } from 'react-router-dom';
import { Breadcrumbs, Button, PageHeader, LoadingState, ErrorState } from '@ams/ui';
import { UnitProfile } from '../components/UnitProfile';
import { useUnit }     from '../hooks/useUnit';
import { UNIT_ROUTES } from '../constants/unit.constants';

export function UnitDetailPage() {
  const { id = '' } = useParams<{ id: string }>();
  const navigate     = useNavigate();

  const { data: unit, isLoading, isError } = useUnit(id);

  if (isLoading) return <LoadingState />;
  if (isError || !unit?.data) return <ErrorState />;

  const u = unit.data;

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Unit ${u.unit_number}`}
        description={`${u.block_name ? `Block ${u.block_name} · ` : ''}Floor ${u.floor_number ?? '—'} · ${u.unit_type}`}
        breadcrumbs={
          <Breadcrumbs items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Units',     href: UNIT_ROUTES.LIST },
            { label: u.unit_number },
          ]} />
        }
        actions={
          <Button
            variant="outline"
            onClick={() => void navigate(UNIT_ROUTES.EDIT.replace(':id', String(u.unit_id)))}
          >
            Edit Unit
          </Button>
        }
      />
      <UnitProfile unit={u} />
    </div>
  );
}
