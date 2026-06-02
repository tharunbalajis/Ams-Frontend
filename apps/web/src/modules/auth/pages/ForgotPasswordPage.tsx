import { Link } from 'react-router-dom';
import { AuthCard } from '../components/AuthCard';
import { ForgotPasswordForm } from '../components/ForgotPasswordForm';
import { AUTH_ROUTES } from '../constants/auth.routes';

export function ForgotPasswordPage() {
  return (
    <AuthCard
      title="Forgot password"
      description="Enter your email and we'll send you a reset link"
      footer={
        <p className="text-center text-sm text-muted-foreground">
          Remember your password?{' '}
          <Link to={AUTH_ROUTES.LOGIN} className="font-medium text-primary hover:underline">
            Back to sign in
          </Link>
        </p>
      }
    >
      <ForgotPasswordForm />
    </AuthCard>
  );
}
