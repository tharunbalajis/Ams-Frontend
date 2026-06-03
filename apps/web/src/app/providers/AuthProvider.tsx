import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';
import type { AuthUser, AuthState, AuthTokens, LoginPayload, LoginResponse } from '@/types/auth.types';
import { tokenManager } from '@/lib/auth/tokenManager';
import { isTokenExpired } from '@/lib/auth/jwt';
import { authApiService } from '@/modules/auth/api/auth.api';
import { queryClient } from '@/lib/queryClient';
import { authKeys } from '@/lib';
import { toast } from '@/utils/toast';

interface AuthContextValue extends AuthState {
  login:          (payload: LoginPayload) => Promise<void>;
  logout:         () => Promise<void>;
  refreshSession: () => Promise<void>;
  setUser:        (user: AuthUser | null) => void;
  setTokens:      (tokens: AuthTokens | null) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user,      setUserState]   = useState<AuthUser | null>(null);
  const [tokens,    setTokensState] = useState<AuthTokens | null>(null);
  const [isLoading, setIsLoading]   = useState(true);

  const setUser   = useCallback((u: AuthUser | null)   => setUserState(u),   []);
  const setTokens = useCallback((t: AuthTokens | null) => setTokensState(t), []);

  useEffect(() => {
    const restore = async () => {
      const accessToken = tokenManager.getAccessToken();
      if (!accessToken || isTokenExpired(accessToken)) {
        setIsLoading(false);
        return;
      }
      try {
        const res = await authApiService.me();
        setUserState(res.data);
        setTokensState({ accessToken, tokenType: 'bearer' });
        queryClient.setQueryData(authKeys.me(), res);
      } catch {
        tokenManager.clearSession();
      } finally {
        setIsLoading(false);
      }
    };
    void restore();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = useCallback(async (payload: LoginPayload) => {
    setIsLoading(true);
    try {
      const res: LoginResponse = await authApiService.login(payload);
      tokenManager.setAccessToken(res.access_token);
      setUserState(res.user);
      setTokensState({ accessToken: res.access_token, tokenType: 'bearer' });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authApiService.logout();
    } catch {
      // Swallow — always clear locally
    } finally {
      tokenManager.clearSession();
      setUserState(null);
      setTokensState(null);
      queryClient.clear();
    }
  }, []);

  const refreshSession = useCallback(async () => {
    const refreshToken = tokenManager.getRefreshToken();
    if (!refreshToken) return;
    try {
      const { access_token } = await authApiService.refresh(refreshToken);
      tokenManager.setAccessToken(access_token);
      setTokensState({ accessToken: access_token, tokenType: 'bearer' });
      const meRes = await authApiService.me();
      setUserState(meRes.data);
    } catch {
      tokenManager.clearSession();
      setUserState(null);
      setTokensState(null);
      toast.error('Session expired. Please sign in again.');
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      tokens,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
      refreshSession,
      setUser,
      setTokens,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
