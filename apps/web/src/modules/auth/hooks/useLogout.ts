import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useSession } from '@/hooks/useSession';
import { queryClient } from '@/lib/queryClient';
import { ROUTES } from '@/config/routes';
import { logoutApi } from '../api/logout.api';

export function useLogout() {
  const navigate          = useNavigate();
  const { logout }        = useAuth();
  const { clearTokens }   = useSession();

  return useMutation({
    mutationFn: () => logoutApi.logout(),
    onSettled: async () => {
      // Always clear session even if API call fails
      clearTokens();
      await logout();
      queryClient.clear();
      void navigate(ROUTES.LOGIN);
    },
  });
}
