import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/config/routes';
import { authApiService } from '../api/auth.api';
import { tokenManager } from '@/lib/auth/tokenManager';
import { toast } from '@/utils/toast';
import { AUTH_ERROR_MESSAGES } from '../constants/auth.constants';
import type { LoginPayload } from '@/types/auth.types';

export function useLogin() {
  const navigate   = useNavigate();
  const { setUser, setTokens } = useAuth();

  return useMutation({
    mutationFn: (payload: LoginPayload) => authApiService.login(payload),
    onSuccess: (data) => {
      // Bug 1 fix: persist both tokens so the refresh flow works after the
      // 15-minute access-token window expires.
      tokenManager.setAccessToken(data.access_token);
      tokenManager.setRefreshToken(data.refresh_token);
      setUser(data.user);
      setTokens({ accessToken: data.access_token, tokenType: 'bearer' });
      void navigate(ROUTES.DASHBOARD);
    },
    onError: () => {
      toast.error(AUTH_ERROR_MESSAGES.INVALID_CREDENTIALS);
    },
  });
}