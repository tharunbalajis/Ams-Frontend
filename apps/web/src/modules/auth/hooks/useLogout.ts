import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { queryClient } from '@/lib/queryClient';
import { tokenManager } from '@/lib/auth/tokenManager';
import { ROUTES } from '@/config/routes';
import { authApiService } from '../api/auth.api';

export function useLogout() {
  const navigate               = useNavigate();
  const { setUser, setTokens } = useAuth();

  return useMutation({
    mutationFn: () => authApiService.logout(),
    onSettled: () => {
      tokenManager.clearSession();
      setUser(null);
      setTokens(null);
      queryClient.clear();
      void navigate(ROUTES.LOGIN);
    },
  });
}
