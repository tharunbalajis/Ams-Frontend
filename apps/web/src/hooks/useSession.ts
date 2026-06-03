import { useCallback } from 'react';
import { tokenManager } from '@/lib/auth/tokenManager';

export interface SessionTokens {
  accessToken:  string;
  refreshToken: string;
}

export function useSession() {
  const getAccessToken  = useCallback(() => tokenManager.getAccessToken(),  []);
  const getRefreshToken = useCallback(() => tokenManager.getRefreshToken(), []);

  const setTokens = useCallback((tokens: SessionTokens) => {
    tokenManager.setAccessToken(tokens.accessToken);
    if (tokens.refreshToken) tokenManager.setRefreshToken(tokens.refreshToken);
  }, []);

  const clearTokens    = useCallback(() => tokenManager.clearSession(),  []);
  const isTokenPresent = useCallback(() => tokenManager.hasSession(),    []);

  return { getAccessToken, getRefreshToken, setTokens, clearTokens, isTokenPresent };
}
