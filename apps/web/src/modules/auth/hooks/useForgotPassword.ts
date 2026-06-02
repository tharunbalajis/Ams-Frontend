import { useMutation } from '@tanstack/react-query';
import { forgotPasswordApi } from '../api/forgotPassword.api';
import type { ForgotPasswordPayload } from '../types/auth.types';

export function useForgotPassword() {
  return useMutation({
    mutationFn: (payload: ForgotPasswordPayload) => forgotPasswordApi.send(payload),
    onSuccess: (_response) => {
      // Implement: toast.success('Password reset email sent.')
    },
    onError: (_error) => {
      // Implement: toast.error(AUTH_ERROR_MESSAGES.EMAIL_NOT_FOUND)
    },
  });
}
