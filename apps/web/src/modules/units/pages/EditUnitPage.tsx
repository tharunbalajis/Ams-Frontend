import { useParams, useNavigate } from 'react-router-dom';
import { Breadcrumbs, Card, CardContent, CardHeader, CardTitle, ErrorState, LoadingState, PageHeader } from '@ams/ui';
import { UnitForm }    from '../components/UnitForm';
import { useUnit }     from '../hooks/useUnits';
import { UNIT_ROUTES } from '../constants/unit.constants';

export function EditUnitPage() {
  const { id = '' }  = useParams<{ id: string }>();
  const navigate     = useNavigate();
  const unitId       = Number(id);

  const { data, isLoading, isError } = useUnit(unitId);

  if (isLoading) return <LoadingState />;
  if (isError || !data?.data) return <ErrorState />;

  const unit = data.data;

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Edit Unit ${unit.unit_number}`}
        description={`${unit.block_name ? `Block ${unit.block_name} · ` : ''}Floor ${unit.floor_number ?? '—'}`}
        breadcrumbs={
          <Breadcrumbs items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Units',     href: UNIT_ROUTES.LIST },
            { label: unit.unit_number, href: UNIT_ROUTES.DETAIL.replace(':id', String(unit.unit_id)) },
            { label: 'Edit' },
          ]} />
        }
      />

      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle>Unit Details</CardTitle>
        </CardHeader>
        <CardContent>
          <UnitForm
            mode="edit"
            unit={unit}
            onSuccess={() => void navigate(UNIT_ROUTES.DETAIL.replace(':id', String(unit.unit_id)))}
          />
        </CardContent>
      </Card>
    </div>
  );
}
