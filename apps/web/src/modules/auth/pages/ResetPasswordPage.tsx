import { Link } from 'react-router-dom';
import { AuthCard } from '../components/AuthCard';
import { ResetPasswordForm } from '../components/ResetPasswordForm';
import { AUTH_ROUTES } from '../constants/auth.routes';

export function ResetPasswordPage() {
  return (
    <AuthCard
      title="Reset password"
      description="Enter your new password below"
      footer={
        <p className="text-center text-sm text-muted-foreground">
          <Link to={AUTH_ROUTES.LOGIN} className="font-medium text-primary hover:underline">
            Back to sign in
          </Link>
        </p>
      }
    >
      <ResetPasswordForm />
    </AuthCard>
  );
}
