import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, CardContent, CardHeader, CardTitle, DatePicker, FileUpload, FormField, Input, SelectField } from '@ams/ui';
import { createResidentSchema, updateResidentSchema, type CreateResidentFormValues } from '../../schemas/resident.schema';
import { useCreateResident } from '../../hooks/useCreateResident';
import { useUpdateResident } from '../../hooks/useUpdateResident';
import { RESIDENT_TYPE_OPTIONS, RESIDENT_GENDER_OPTIONS } from '../../constants/resident.constants';
import type { Resident } from '../../types/resident.types';

export interface ResidentFormProps {
  mode:        'create' | 'edit';
  resident?:   Resident;
  residentId?: string;
}

export function ResidentForm({ mode, resident, residentId }: ResidentFormProps) {
  const { mutate: createResident, isPending: isCreating } = useCreateResident();
  const { mutate: updateResident, isPending: isUpdating } = useUpdateResident(residentId ?? '');
  const isPending = isCreating || isUpdating;

  const schema = mode === 'create' ? createResidentSchema : updateResidentSchema;

  const form = useForm<CreateResidentFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      type:      resident?.type      ?? 'tenant',
      firstName: resident?.firstName ?? '',
      lastName:  resident?.lastName  ?? '',
      email:     resident?.email     ?? '',
      phone:     resident?.phone     ?? '',
      unitId:    resident?.unitId    ?? '',
      emergencyContact: {
        name:         resident?.emergencyContact?.name         ?? '',
        relationship: resident?.emergencyContact?.relationship ?? '',
        phone:        resident?.emergencyContact?.phone        ?? '',
        email:        resident?.emergencyContact?.email        ?? '',
      },
    },
  });

  const onSubmit = (values: CreateResidentFormValues) => {
    if (mode === 'create') createResident(values);
    else updateResident(values);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <FormField control={form.control} name="type" label="Resident Type" required>
            {(field) => (
              <SelectField
                value={field.value as string}
                onValueChange={(v) => field.onChange(v)}
                options={RESIDENT_TYPE_OPTIONS}
                placeholder="Select type"
              />
            )}
          </FormField>

          <FormField control={form.control} name="firstName" label="First Name" required>
            {(field) => (
              <Input value={field.value as string} onChange={(e) => field.onChange(e)} onBlur={field.onBlur} placeholder="First name" disabled={isPending} />
            )}
          </FormField>

          <FormField control={form.control} name="lastName" label="Last Name" required>
            {(field) => (
              <Input value={field.value as string} onChange={(e) => field.onChange(e)} onBlur={field.onBlur} placeholder="Last name" disabled={isPending} />
            )}
          </FormField>

          <FormField control={form.control} name="email" label="Email" required>
            {(field) => (
              <Input type="email" value={field.value as string} onChange={(e) => field.onChange(e)} onBlur={field.onBlur} placeholder="email@example.com" disabled={isPending} />
            )}
          </FormField>

          <FormField control={form.control} name="phone" label="Mobile Number" required>
            {(field) => (
              <Input type="tel" value={field.value as string} onChange={(e) => field.onChange(e)} onBlur={field.onBlur} placeholder="09XX XXX XXXX" disabled={isPending} />
            )}
          </FormField>

          <FormField control={form.control} name="dateOfBirth" label="Date of Birth">
            {(field) => (
              <DatePicker value={field.value as string | undefined} onChange={(v) => field.onChange(v)} disabled={isPending} />
            )}
          </FormField>

          <FormField control={form.control} name="gender" label="Gender">
            {(field) => (
              <SelectField
                value={field.value as string | undefined}
                onValueChange={(v) => field.onChange(v)}
                options={RESIDENT_GENDER_OPTIONS}
                placeholder="Select gender"
              />
            )}
          </FormField>

          {mode === 'create' && (
            <FormField control={form.control} name="unitId" label="Unit" required>
              {(field) => (
                <Input value={field.value as string} onChange={(e) => field.onChange(e)} onBlur={field.onBlur} placeholder="Unit ID or number" disabled={isPending} />
              )}
            </FormField>
          )}
        </CardContent>
      </Card>

      {/* Emergency Contact */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Emergency Contact</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <FormField control={form.control} name="emergencyContact.name" label="Name" required>
            {(field) => (
              <Input value={field.value as string} onChange={(e) => field.onChange(e)} onBlur={field.onBlur} placeholder="Full name" disabled={isPending} />
            )}
          </FormField>

          <FormField control={form.control} name="emergencyContact.relationship" label="Relationship" required>
            {(field) => (
              <Input value={field.value as string} onChange={(e) => field.onChange(e)} onBlur={field.onBlur} placeholder="e.g. Spouse, Parent" disabled={isPending} />
            )}
          </FormField>

          <FormField control={form.control} name="emergencyContact.phone" label="Phone" required>
            {(field) => (
              <Input type="tel" value={field.value as string} onChange={(e) => field.onChange(e)} onBlur={field.onBlur} placeholder="09XX XXX XXXX" disabled={isPending} />
            )}
          </FormField>

          <FormField control={form.control} name="emergencyContact.email" label="Email">
            {(field) => (
              <Input type="email" value={field.value as string} onChange={(e) => field.onChange(e)} onBlur={field.onBlur} placeholder="email@example.com" disabled={isPending} />
            )}
          </FormField>
        </CardContent>
      </Card>

      {/* ID Proof upload (scaffolding only) */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Documents</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="mb-1.5 text-sm font-medium">ID Proof</p>
            <FileUpload accept="image/*,.pdf" maxSize={10 * 1024 * 1024} />
          </div>
          <div>
            <p className="mb-1.5 text-sm font-medium">Profile Photo</p>
            <FileUpload accept="image/*" maxSize={5 * 1024 * 1024} />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={() => window.history.back()}>
          Cancel
        </Button>
        <Button type="submit" loading={isPending}>
          {mode === 'create' ? 'Register Resident' : 'Save Changes'}
        </Button>
      </div>
    </form>
  );
}
