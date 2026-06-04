import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Breadcrumbs, Button, PageHeader,
  Card, CardContent, CardHeader, CardTitle,
  Badge, LoadingState, EmptyState,
} from '@ams/ui';
import { useUsers, useRegisterUser, useDeactivateUser } from '../hooks/useUsers';
import { usePermissions } from '@/hooks/usePermissions';
import { ROLES, ROLE_LABELS } from '@/config/roles';
import type { Role } from '@/config/roles';

const registerSchema = z.object({
  name:     z.string().min(2),
  email:    z.string().email(),
  password: z.string().min(8),
  role:     z.enum([ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ACCOUNTANT, ROLES.SECURITY, ROLES.RESIDENT]),
  phone:    z.string().optional(),
});
type RegisterFormValues = z.infer<typeof registerSchema>;

const ROLE_OPTIONS = Object.entries(ROLE_LABELS).map(([value, label]) => ({ value: value as Role, label }));

const ROLE_BADGE_VARIANT: Record<Role, 'default' | 'secondary' | 'outline' | 'destructive'> = {
  SUPER_ADMIN: 'destructive',
  ADMIN:       'default',
  ACCOUNTANT:  'secondary',
  SECURITY:    'secondary',
  RESIDENT:    'outline',
};

export function UserManagementPage() {
  const [showForm, setShowForm] = useState(false);
  const [roleFilter, setRoleFilter] = useState<string>('');

  const { data, isLoading } = useUsers(roleFilter ? { role: roleFilter } : undefined);
  const { mutate: registerUser, isPending: registering } = useRegisterUser();
  const { mutate: deactivate }                           = useDeactivateUser();
  const { hasAnyRole }                                   = usePermissions();

  const canManage = hasAnyRole([ROLES.SUPER_ADMIN, ROLES.ADMIN]);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', role: ROLES.RESIDENT, phone: '' },
  });

  const onSubmit = (values: RegisterFormValues) => {
    registerUser(values, {
      onSuccess: () => {
        form.reset();
        setShowForm(false);
      },
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="User Management"
        description="Manage system users, roles, and access"
        breadcrumbs={
          <Breadcrumbs items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'User Management' },
          ]} />
        }
        actions={
          canManage ? (
            <Button onClick={() => setShowForm((v) => !v)}>
              {showForm ? 'Cancel' : 'Register User'}
            </Button>
          ) : undefined
        }
      />

      {showForm && canManage && (
        <Card>
          <CardHeader><CardTitle>Register New User</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-sm font-medium">Full Name *</label>
                <input
                  {...form.register('name')}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="John Smith"
                />
                {form.formState.errors.name && (
                  <p className="text-xs text-destructive">{form.formState.errors.name.message}</p>
                )}
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Email *</label>
                <input
                  {...form.register('email')}
                  type="email"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="user@example.com"
                />
                {form.formState.errors.email && (
                  <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>
                )}
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Password *</label>
                <input
                  {...form.register('password')}
                  type="password"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Min 8 characters"
                />
                {form.formState.errors.password && (
                  <p className="text-xs text-destructive">{form.formState.errors.password.message}</p>
                )}
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Role *</label>
                <select
                  {...form.register('role')}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  {ROLE_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Phone</label>
                <input
                  {...form.register('phone')}
                  type="tel"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="+91 98765 43210"
                />
              </div>
              <div className="flex items-end">
                <Button type="submit" loading={registering}>
                  Register User
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Users</CardTitle>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="h-9 rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="">All Roles</option>
              {ROLE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading && <LoadingState variant="skeleton" rows={5} />}
          {!isLoading && !data?.data?.length && (
            <EmptyState title="No users found" description="No users match your filter." />
          )}
          {!isLoading && !!data?.data?.length && (
            <div className="divide-y">
              {data.data.map((user) => (
                <div key={user.id} className="flex items-center justify-between py-3">
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{user.full_name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={ROLE_BADGE_VARIANT[user.role] ?? 'outline'}>
                      {ROLE_LABELS[user.role] ?? user.role}
                    </Badge>
                    {user.is_active ? (
                      <Badge variant="secondary">Active</Badge>
                    ) : (
                      <Badge variant="outline">Inactive</Badge>
                    )}
                    {canManage && user.is_active && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deactivate(user.id)}
                      >
                        Deactivate
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
