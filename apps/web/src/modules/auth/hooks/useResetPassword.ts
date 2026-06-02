import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { resetPasswordApi } from '../api/resetPassword.api';
import type { ResetPasswordPayload } from '../types/auth.types';
import { AUTH_ROUTES } from '../constants/auth.routes';

export function useResetPassword() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: ResetPasswordPayload) => resetPasswordApi.reset(payload),
    onSuccess: (_response) => {
      // Implement: toast.success('Password reset successfully.')
      void navigate(AUTH_ROUTES.LOGIN);
    },
    onError: (_error) => {
      // Implement: toast.error(AUTH_ERROR_MESSAGES.TOKEN_INVALID)
    },
  });
}
