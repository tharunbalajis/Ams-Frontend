import { authApiService } from './auth.api';

export const logoutApi = {
  logout: (): Promise<void> => authApiService.logout(),
};
