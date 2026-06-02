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
    mutate(values);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Edit Unit ${unit.unitNumber}`}
        description={`Block ${unit.block} · Floor ${unit.floor}`}
        breadcrumbs={
          <Breadcrumbs items={[
            { label: 'Dashboard',            href: '/dashboard' },
            { label: 'Units',                href: UNIT_ROUTES.LIST },
            { label: unit.unitNumber,        href: UNIT_ROUTES.DETAIL.replace(':id', id) },
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
