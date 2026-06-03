import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from 'axios';
import { tokenManager } from '@/lib/auth/tokenManager';

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';
const TIMEOUT  = Number(import.meta.env.VITE_API_TIMEOUT ?? 30_000);

export const TOKEN_KEY         = import.meta.env.VITE_AUTH_TOKEN_KEY         ?? 'ams_access_token';
export const REFRESH_TOKEN_KEY = import.meta.env.VITE_AUTH_REFRESH_TOKEN_KEY ?? 'ams_refresh_token';

let isRefreshing = false;
let refreshQueue: Array<{ resolve: (token: string) => void; reject: (err: unknown) => void }> = [];

function drainQueue(error: unknown, token: string | null = null): void {
  refreshQueue.forEach(({ resolve, reject }) => (error ? reject(error) : resolve(token!)));
  refreshQueue = [];
}

export const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = tokenManager.getAccessToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

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
    isRefreshing    = true;

    const refreshToken = tokenManager.getRefreshToken();

    if (!refreshToken) {
      tokenManager.clearSession();
      isRefreshing = false;
      window.location.href = '/login';
      return Promise.reject(error);
    }

    try {
      const { data } = await axios.post<{ access_token: string }>(
        `${BASE_URL}/auth/refresh`,
        { refresh_token: refreshToken },
        { headers: { 'Content-Type': 'application/json' } },
      );
      const newToken = data.access_token;
      tokenManager.setAccessToken(newToken);
      drainQueue(null, newToken);
      if (original.headers) original.headers.Authorization = `Bearer ${newToken}`;
      return apiClient(original);
    } catch (refreshError) {
      drainQueue(refreshError, null);
      tokenManager.clearSession();
      window.location.href = '/login';
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default apiClient;
