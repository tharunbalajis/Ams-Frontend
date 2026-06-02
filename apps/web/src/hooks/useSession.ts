import { useCallback } from 'react';
import { TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/api/client';

export interface SessionTokens {
  accessToken:  string;
  refreshToken: string;
}

export function useSession() {
  const getAccessToken  = useCallback(() => localStorage.getItem(TOKEN_KEY),         []);
  const getRefreshToken = useCallback(() => localStorage.getItem(REFRESH_TOKEN_KEY), []);

  const setTokens = useCallback((tokens: SessionTokens) => {
    localStorage.setItem(TOKEN_KEY,         tokens.accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
  }, []);

  const clearTokens = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }, []);

  const isTokenPresent = useCallback(() => !!localStorage.getItem(TOKEN_KEY), []);

  return { getAccessToken, getRefreshToken, setTokens, clearTokens, isTokenPresent };
}
