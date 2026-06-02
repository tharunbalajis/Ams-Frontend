import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, FormField, Input } from '@ams/ui';
import { forgotPasswordSchema, type ForgotPasswordFormValues } from '../../schemas/forgotPassword.schema';
import { useForgotPassword } from '../../hooks/useForgotPassword';

export function ForgotPasswordForm() {
  const { mutate: sendLink, isPending, isSuccess } = useForgotPassword();

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = (values: ForgotPasswordFormValues) => sendLink(values);

  if (isSuccess) {
    return (
      <div className="rounded-md bg-green-50 p-4 text-center text-sm text-green-800 dark:bg-green-900/20 dark:text-green-300">
        Check your inbox — a reset link has been sent.
      </div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <FormField
        control={form.control}
        name="email"
        label="Email address"
        required
      >
        {(field) => (
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={field.value as string}
            onChange={(e) => field.onChange(e)}
            onBlur={field.onBlur}
            disabled={isPending}
          />
        )}
      </FormField>

      <Button type="submit" className="w-full" loading={isPending}>
        Send reset link
      </Button>
    </form>
  );
}
