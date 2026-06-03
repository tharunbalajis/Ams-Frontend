import { useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Breadcrumbs, Button, Card, CardContent, CardHeader, CardTitle, ErrorState, FormField, LoadingState, PageHeader, SelectField, TextArea } from '@ams/ui';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { OccupancyTable }   from '../components/OccupancyTable';
import { OccupancyCard }    from '../components/OccupancyCard';
import { useOccupancy }     from '../hooks/useOccupancy';
import { useUnit }          from '../hooks/useUnit';
import { occupancyApi }     from '../api/occupancy.api';
import { queryClient }      from '@/lib/queryClient';
import { UNIT_ROUTES }      from '../constants/unit.constants';
import { OCCUPANCY_STATUS_OPTIONS } from '../constants/occupancy.constants';
import { occupancySchema, type OccupancyFormValues } from '../schemas/occupancy.schema';

export function OccupancyPage() {
  const { id = '' } = useParams<{ id: string }>();

  const { data: unitData,      isLoading: loadingUnit,      isError: errorUnit }      = useUnit(id);
  const { data: occupancyData, isLoading: loadingOccupancy } = useOccupancy(id);

  const { mutate, isPending } = useMutation({
    mutationFn: (values: OccupancyFormValues) => occupancyApi.update(id, values),
    onSuccess:  () => {
      queryClient.invalidateQueries({ queryKey: ['units', id, 'occupancy'] });
    },
  });

  const form = useForm<OccupancyFormValues>({
    resolver:      zodResolver(occupancySchema),
    defaultValues: { status: 'vacant', startDate: '' },
  });

  if (loadingUnit || loadingOccupancy) return <LoadingState />;
  if (errorUnit || !unitData?.data) return <ErrorState />;

  const unit = unitData.data;

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Occupancy — Unit ${unit.unitNumber}`}
        description={`Block ${unit.block} · Floor ${unit.floor}`}
        breadcrumbs={
          <Breadcrumbs items={[
            { label: 'Dashboard',     href: '/dashboard' },
            { label: 'Units',         href: UNIT_ROUTES.LIST },
            { label: unit.unitNumber, href: UNIT_ROUTES.DETAIL.replace(':id', id) },
            { label: 'Occupancy' },
          ]} />
        }
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {occupancyData?.data && (
          <OccupancyCard occupancy={occupancyData.data} />
        )}

        <Card>
          <CardHeader>
            <CardTitle>Update Occupancy</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit((v) => mutate(v))} className="space-y-4" noValidate>
              <FormField control={form.control} name="status" label="Status" required>
                {(field) => (
                  <SelectField
                    value={field.value as string}
                    onValueChange={field.onChange}
                    options={OCCUPANCY_STATUS_OPTIONS}
                    placeholder="Select status"
                    disabled={isPending}
                  />
                )}
              </FormField>

              <FormField control={form.control} name="startDate" label="Effective From" required>
                {(field) => (
                  <input
                    type="date"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={field.value as string}
                    onChange={field.onChange}
                    disabled={isPending}
                  />
                )}
              </FormField>

              <FormField control={form.control} name="notes" label="Notes">
                {(field) => (
                  <TextArea
                    value={field.value as string}
                    onChange={field.onChange}
                    rows={3}
                    placeholder="Optional notes"
                    disabled={isPending}
                  />
                )}
              </FormField>

              <div className="flex justify-end">
                <Button type="submit" loading={isPending}>
                  Save Occupancy
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Occupancy History</CardTitle>
        </CardHeader>
        <CardContent>
          <OccupancyTable data={[]} loading={loadingOccupancy} />
        </CardContent>
      </Card>
    </div>
  );
}
