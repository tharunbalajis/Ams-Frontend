import { toast as sonner } from 'sonner';
import type { AxiosError } from 'axios';
import type { ApiError } from '@/types/api.types';

export const toast = {
  success: (message: string, description?: string) =>
    sonner.success(message, { description }),

  error: (message: string, description?: string) =>
    sonner.error(message, { description }),

  info: (message: string, description?: string) =>
    sonner.info(message, { description }),

  warning: (message: string, description?: string) =>
    sonner.warning(message, { description }),

  loading: (message: string) =>
    sonner.loading(message),

  dismiss: (id?: string | number) =>
    sonner.dismiss(id),

  apiError: (error: unknown, fallback = 'An unexpected error occurred') => {
    const axiosErr = error as AxiosError<ApiError>;
    const message  = axiosErr?.response?.data?.message ?? fallback;
    sonner.error(message);
  },
};
