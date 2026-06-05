import apiClient from '@/api/client';
import { getSocietyId } from '@/utils/getSocietyId';
import type { ApiResponse } from '@/types/api.types';
import type { DashboardSummary, DashboardFilters } from '../types/dashboard.types';

const sid = () => getSocietyId();

export const dashboardApi = {
  // GET /dashboard/metrics?society_id=1
  getMetrics: (filters?: DashboardFilters) =>
    apiClient.get('/dashboard/metrics', { params: { society_id: sid(), ...filters } }),

  // GET /dashboard/summary?society_id=1
  getSummary: (filters?: DashboardFilters) =>
    apiClient.get('/dashboard/summary', { params: { society_id: sid(), ...filters } }),
};