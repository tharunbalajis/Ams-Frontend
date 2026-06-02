import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { AuthUser, AuthState, AuthTokens, LoginPayload } from '@/types/auth.types';

interface AuthContextValue extends AuthState {
  login:          (payload: LoginPayload) => Promise<void>;
  logout:         () => Promise<void>;
  refreshSession: () => Promise<void>;
  setUser:        (user: AuthUser | null) => void;
  setTokens:      (tokens: AuthTokens | null) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user,      setUser]      = useState<AuthUser   | null>(null);
  const [tokens,    setTokens]    = useState<AuthTokens | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (_payload: LoginPayload) => {
    setIsLoading(true);
    try {
      // Implement in auth module — Phase 4
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    // Implement in auth module — Phase 4
    setUser(null);
    setTokens(null);
  }, []);

  const refreshSession = useCallback(async () => {
    // Implement in auth module — Phase 4
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
