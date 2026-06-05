import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { Button, FormField, Input, Checkbox } from '@ams/ui';
import { loginSchema, type LoginFormValues } from '../../schemas/login.schema';
import { useLogin } from '../../hooks/useLogin';
import { ROUTES } from '@/config/routes';

export function LoginForm() {
  const navigate = useNavigate();
  const { mutate: login, isPending } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setError(null);
    try {
      await login(values);
      navigate(ROUTES.DASHBOARD);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Invalid email or password';
      setError(message);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" noValidate>
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

      <div className="relative">
        <FormField
          control={form.control}
          name="password"
          label="Password"
          required
        >
          {(field) => (
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                autoComplete="current-password"
                value={field.value as string}
                onChange={(e) => field.onChange(e)}
                onBlur={field.onBlur}
                disabled={isPending}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          )}
        </FormField>
      </div>

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <Checkbox
          checked={rememberMe}
          onCheckedChange={(checked) => setRememberMe(checked as boolean)}
          label="Remember me"
        />
        <a
          href="/forgot-password"
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          Forgot password?
        </a>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-200">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <Button type="submit" className="w-full h-11" loading={isPending}>
        Sign in
      </Button>
    </form>
  );
}