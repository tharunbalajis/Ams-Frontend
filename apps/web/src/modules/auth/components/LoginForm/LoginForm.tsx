import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, FormField, Input } from '@ams/ui';
import { loginSchema, type LoginFormValues } from '../../schemas/login.schema';
import { useLogin } from '../../hooks/useLogin';

export function LoginForm() {
  const { mutate: login, isPending } = useLogin();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = (values: LoginFormValues) => login(values);

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

      <FormField
        control={form.control}
        name="password"
        label="Password"
        required
      >
        {(field) => (
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            value={field.value as string}
            onChange={(e) => field.onChange(e)}
            onBlur={field.onBlur}
            disabled={isPending}
          />
        )}
      </FormField>

      <Button type="submit" className="w-full" loading={isPending}>
        Sign in
      </Button>
    </form>
  );
}
