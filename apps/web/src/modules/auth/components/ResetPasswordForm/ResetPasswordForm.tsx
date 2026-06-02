import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'react-router-dom';
import { Button, FormField, Input } from '@ams/ui';
import { resetPasswordSchema, type ResetPasswordFormValues } from '../../schemas/resetPassword.schema';
import { useResetPassword } from '../../hooks/useResetPassword';

export function ResetPasswordForm() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') ?? '';

  const { mutate: resetPassword, isPending } = useResetPassword();

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { token, password: '', confirmPassword: '' },
  });

  const onSubmit = (values: ResetPasswordFormValues) => resetPassword(values);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <FormField
        control={form.control}
        name="password"
        label="New password"
        required
      >
        {(field) => (
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            value={field.value as string}
            onChange={(e) => field.onChange(e)}
            onBlur={field.onBlur}
            disabled={isPending}
          />
        )}
      </FormField>

      <FormField
        control={form.control}
        name="confirmPassword"
        label="Confirm new password"
        required
      >
        {(field) => (
          <Input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            value={field.value as string}
            onChange={(e) => field.onChange(e)}
            onBlur={field.onBlur}
            disabled={isPending}
          />
        )}
      </FormField>

      <Button type="submit" className="w-full" loading={isPending}>
        Reset password
      </Button>
    </form>
  );
}
