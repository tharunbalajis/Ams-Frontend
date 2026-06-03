import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Drawer, DrawerContent, DrawerHeader, DrawerTitle, FormField, Input, TextArea } from '@ams/ui';
import { assignmentSchema, type AssignmentFormValues } from '../../schemas/assignment.schema';
import { formatDate } from '@/utils/formatDate';
import type { Assignment } from '../../types/assignment.types';

export interface AssignmentDrawerProps {
  open:        boolean;
  onOpenChange: (open: boolean) => void;
  assignment?: Assignment;
  onSubmit:    (values: AssignmentFormValues) => void;
  isPending?:  boolean;
}

export function AssignmentDrawer({ open, onOpenChange, assignment, onSubmit, isPending }: AssignmentDrawerProps) {
  const form = useForm<AssignmentFormValues>({
    resolver:      zodResolver(assignmentSchema),
    defaultValues: {
      assignedToId:           assignment?.assignedToId          ?? '',
      teamId:                 assignment?.teamId                 ?? '',
      expectedResolutionDate: assignment?.expectedResolutionDate ?? '',
      notes:                  assignment?.notes                  ?? '',
    },
  });

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{assignment ? 'Update Assignment' : 'Assign Complaint'}</DrawerTitle>
        </DrawerHeader>

        <div className="p-6">
          {assignment && (
            <div className="mb-4 rounded-md bg-muted p-3 text-sm">
              <p className="font-medium">Current: {assignment.assignedToName}</p>
              <p className="text-muted-foreground">Assigned {formatDate(assignment.assignedAt)}</p>
            </div>
          )}

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <FormField control={form.control} name="assignedToId" label="Assign To" required>
              {(field) => (
                <Input
                  value={field.value as string}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  placeholder="Staff ID or name"
                  disabled={isPending}
                />
              )}
            </FormField>

            <FormField control={form.control} name="expectedResolutionDate" label="Expected Resolution Date">
              {(field) => (
                <Input
                  type="date"
                  value={field.value as string}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
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
                  placeholder="Assignment notes or instructions"
                  disabled={isPending}
                />
              )}
            </FormField>

            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
                Cancel
              </Button>
              <Button type="submit" loading={isPending}>
                {assignment ? 'Update' : 'Assign'}
              </Button>
            </div>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
