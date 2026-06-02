import { Link } from 'react-router-dom';
import { AuthCard } from '../components/AuthCard';
import { LoginForm } from '../components/LoginForm';
import { AUTH_ROUTES } from '../constants/auth.routes';

export function LoginPage() {
  return (
    <AuthCard
      title="Welcome back"
      description="Sign in to your account to continue"
      footer={
        <p className="text-center text-sm text-muted-foreground">
          Forgot your password?{' '}
          <Link to={AUTH_ROUTES.FORGOT_PASSWORD} className="font-medium text-primary hover:underline">
            Reset it
          </Link>
        </p>
      }
    >
      <LoginForm />
    </AuthCard>
  );
}
