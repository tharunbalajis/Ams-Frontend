import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { useSession } from '@/hooks/useSession';
import { authKeys } from '@/lib';
import { STALE_TIME } from '@/constants/query.constants';
import { currentUserApi } from '../api/currentUser.api';

export function useCurrentUser() {
  const { setUser }       = useAuth();
  const { isTokenPresent } = useSession();

  const query = useQuery({
    queryKey: authKeys.me(),
    queryFn:  () => currentUserApi.getMe(),
    enabled:  isTokenPresent(),
    staleTime: STALE_TIME.LONG,
  });

  useEffect(() => {
    if (query.data?.data) {
      setUser(query.data.data);
    }
  }, [query.data, setUser]);

  return query;
}
