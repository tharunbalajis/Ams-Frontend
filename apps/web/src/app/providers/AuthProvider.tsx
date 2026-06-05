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
import { authApiService } from '@/modules/auth/api/auth.api';
import { queryClient } from '@/lib/queryClient';
import { toast } from '@/utils/toast';

const USER_KEY = 'ams_user';

interface AuthContextValue extends AuthState {
  login:          (payload: LoginPayload) => Promise<void>;
  logout:         () => Promise<void>;
  refreshSession: () => Promise<void>;
  setUser:        (user: AuthUser | null) => void;
  setTokens:      (tokens: AuthTokens | null) => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user,      setUserState]   = useState<AuthUser | null>(() => {
    try {
      const stored = localStorage.getItem(USER_KEY);
      return stored ? (JSON.parse(stored) as AuthUser) : null;
    } catch {
      return null;
    }
  });
  const [tokens,    setTokensState] = useState<AuthTokens | null>(() => {
    const at = tokenManager.getAccessToken();
    return at ? { accessToken: at, tokenType: 'bearer' } : null;
  });
  const [isLoading, setIsLoading]   = useState(false);

  const setUser = useCallback((u: AuthUser | null) => {
    setUserState(u);
    if (u) {
      localStorage.setItem(USER_KEY, JSON.stringify(u));
    } else {
      localStorage.removeItem(USER_KEY);
    }
  }, []);

  const setTokens = useCallback((t: AuthTokens | null) => setTokensState(t), []);

  // On first mount: verify token and restore user session via GET /auth/me
  useEffect(() => {
    async function restoreSession() {
      if (!tokenManager.hasSession()) {
        setUserState(null);
        setTokensState(null);
        localStorage.removeItem(USER_KEY);
        return;
      }
      
      // Token exists, try to restore user from /auth/me
      setIsLoading(true);
      try {
        const res = await authApiService.me();
        if (res.data) {
          setUser(res.data);
        } else {
          // Token invalid, clear session
          tokenManager.clearSession();
          localStorage.removeItem(USER_KEY);
          setUserState(null);
          setTokensState(null);
        }
      } catch {
        // Token invalid or API error, clear session
        tokenManager.clearSession();
        localStorage.removeItem(USER_KEY);
        setUserState(null);
        setTokensState(null);
      } finally {
        setIsLoading(false);
      }
    }
    
    restoreSession();
  }, [setUser]);

  const login = useCallback(async (payload: LoginPayload) => {
    setIsLoading(true);
    try {
      const res: LoginResponse = await authApiService.login(payload);

      tokenManager.setAccessToken(res.access_token);
      tokenManager.setRefreshToken(res.refresh_token);

      setUser(res.user);
      setTokensState({ accessToken: res.access_token, tokenType: 'bearer' });
    } finally {
      setIsLoading(false);
    }
  }, [setUser]);

  const logout = useCallback(async () => {
    try {
      await authApiService.logout();
    } catch {
      // Swallow — always clear locally
    } finally {
      tokenManager.clearSession();
      localStorage.removeItem(USER_KEY);
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
    } catch {
      tokenManager.clearSession();
      localStorage.removeItem(USER_KEY);
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