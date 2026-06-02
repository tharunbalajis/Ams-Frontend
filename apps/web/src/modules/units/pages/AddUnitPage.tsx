import { Breadcrumbs, Card, CardContent, CardHeader, CardTitle, PageHeader } from '@ams/ui';
import { UnitForm }        from '../components/UnitForm';
import { useCreateUnit }   from '../hooks/useCreateUnit';
import { UNIT_ROUTES }     from '../constants/unit.constants';
import type { CreateUnitFormValues } from '../schemas/unit.schema';

export function AddUnitPage() {
  const { mutate, isPending } = useCreateUnit();

  const handleSubmit = (values: CreateUnitFormValues) => {
    mutate(values);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Add Unit"
        description="Register a new unit in the property"
        breadcrumbs={
          <Breadcrumbs items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Units',     href: UNIT_ROUTES.LIST },
            { label: 'Add Unit' },
          ]} />
        }
      />

      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle>Unit Details</CardTitle>
        </CardHeader>
        <CardContent>
          <UnitForm onSubmit={handleSubmit} isPending={isPending} />
        </CardContent>
      </Card>
    </div>
  );
}
