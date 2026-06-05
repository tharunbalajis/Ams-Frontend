import { useParams } from 'react-router-dom';
import { Breadcrumbs, Card, CardContent, CardHeader, CardTitle, ErrorState, LoadingState, PageHeader } from '@ams/ui';
import { UnitForm }       from '../components/UnitForm';
import { useUnit }        from '../hooks/useUnit';
import { useUpdateUnit }  from '../hooks/useUpdateUnit';
import { UNIT_ROUTES }    from '../constants/unit.constants';
import type { CreateUnitFormValues } from '../schemas/unit.schema';

export function EditUnitPage() {
  const { id = '' } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useUnit(id);
  const { mutate, isPending }        = useUpdateUnit(id);

  if (isLoading) return <LoadingState />;
  if (isError || !data?.data) return <ErrorState />;

  const unit = data.data;

  const handleSubmit = (values: CreateUnitFormValues) => {
    mutate(values as Parameters<typeof mutate>[0]);
  };

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
          <UnitForm unit={unit} onSubmit={handleSubmit} isPending={isPending} />
        </CardContent>
      </Card>
    </div>
  );
}
