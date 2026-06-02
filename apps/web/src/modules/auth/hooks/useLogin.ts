import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useSession } from '@/hooks/useSession';
import { ROUTES } from '@/config/routes';
import { loginApi } from '../api/login.api';
import type { LoginPayload } from '../types/login.types';

export function useLogin() {
  const navigate             = useNavigate();
  const { setUser, setTokens } = useAuth();
  const { setTokens: storeTokens } = useSession();

  return useMutation({
    mutationFn: (payload: LoginPayload) => loginApi.login(payload),
    onSuccess: (response) => {
      const { user, tokens } = response.data;
      // Hydrate auth context
      setUser(user);
      setTokens(tokens);
      // Persist tokens to localStorage
      storeTokens({ accessToken: tokens.accessToken, refreshToken: tokens.refreshToken });
      void navigate(ROUTES.DASHBOARD);
    },
    onError: (_error) => {
      // Implement: toast.error(AUTH_ERROR_MESSAGES.INVALID_CREDENTIALS)
    },
  });
}
