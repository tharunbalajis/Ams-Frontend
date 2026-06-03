const ACCESS_KEY  = import.meta.env.VITE_AUTH_TOKEN_KEY         ?? 'ams_access_token';
const REFRESH_KEY = import.meta.env.VITE_AUTH_REFRESH_TOKEN_KEY ?? 'ams_refresh_token';

export const tokenManager = {
  getAccessToken():    string | null { return localStorage.getItem(ACCESS_KEY); },
  setAccessToken(t:  string):  void  { localStorage.setItem(ACCESS_KEY, t); },
  removeAccessToken():         void  { localStorage.removeItem(ACCESS_KEY); },

  getRefreshToken():   string | null { return localStorage.getItem(REFRESH_KEY); },
  setRefreshToken(t: string):  void  { localStorage.setItem(REFRESH_KEY, t); },
  removeRefreshToken():        void  { localStorage.removeItem(REFRESH_KEY); },

  clearSession(): void {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
  },

  hasSession(): boolean {
    return !!localStorage.getItem(ACCESS_KEY);
  },
};
