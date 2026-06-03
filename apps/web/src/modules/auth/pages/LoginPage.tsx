import { AuthCard }  from '../components/AuthCard';
import { LoginForm } from '../components/LoginForm';

export function LoginPage() {
  return (
    <AuthCard
      title="Welcome back"
      description="Sign in to your AMS account to continue"
    >
      <LoginForm />
    </AuthCard>
  );
}
