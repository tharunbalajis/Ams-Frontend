import axios, { type AxiosInstance, type AxiosRequestConfig, type InternalAxiosRequestConfig } from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL ?? import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api';
const TIMEOUT  = Number(import.meta.env.VITE_API_TIMEOUT ?? 30_000);

export const TOKEN_KEY         = import.meta.env.VITE_AUTH_TOKEN_KEY ?? 'ams_access_token';
export const REFRESH_TOKEN_KEY = import.meta.env.VITE_AUTH_REFRESH_TOKEN_KEY ?? 'ams_refresh_token';

// Prevent concurrent token refresh calls
let isRefreshing = false;
let refreshQueue: Array<{ resolve: (token: string) => void; reject: (err: unknown) => void }> = [];

function drainQueue(error: unknown, token: string | null = null) {
  refreshQueue.forEach(({ resolve, reject }) => (error ? reject(error) : resolve(token!)));
  refreshQueue = [];
}

export const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
});

// Attach Bearer token on every request
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 401 → queue requests while refreshing, then redirect if no refresh token
apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status !== 401 || original._retry) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        refreshQueue.push({ resolve, reject });
      }).then((token) => {
        if (original.headers) original.headers.Authorization = `Bearer ${token}`;
        return apiClient(original);
      });
    }

    original._retry = true;
    isRefreshing = true;

    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    if (!refreshToken) {
      localStorage.removeItem(TOKEN_KEY);
      window.location.href = '/login';
      isRefreshing = false;
      return Promise.reject(error);
    }

    try {
      // Token refresh — implement in auth module
      // const { data } = await axios.post(`${BASE_URL}/auth/refresh`, { refreshToken });
      // localStorage.setItem(TOKEN_KEY, data.accessToken);
      // drainQueue(null, data.accessToken);
      // return apiClient(original);
      throw new Error('refresh_not_implemented');
    } catch (refreshError) {
      drainQueue(refreshError, null);
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      window.location.href = '/login';
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default apiClient;
