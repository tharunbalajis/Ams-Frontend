import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { authKeys } from '@/lib';
import { STALE_TIME } from '@/constants/query.constants';
import { tokenManager } from '@/lib/auth/tokenManager';
import { authApiService } from '../api/auth.api';

export function useCurrentUser() {
  const { setUser } = useAuth();

  const query = useQuery({
    queryKey:  authKeys.me(),
    queryFn:   () => authApiService.me(),
    staleTime: STALE_TIME.LONG,
    enabled:   tokenManager.hasSession(),
  });

  useEffect(() => {
    if (query.data?.data) setUser(query.data.data);
  }, [query.data, setUser]);

  return query;
}
