import apiClient from '@/api/client';

export interface DashboardData {
  residents?:  Record<string, unknown>;
  complaints?: Record<string, unknown>;
  visitors?:   Record<string, unknown>;
  finance?:    Record<string, unknown>;
}

export const metricsApi = {
  // GET /dashboard/metrics does NOT exist — call 4 real endpoints in parallel.
  getMetrics: async (_params?: { period?: string }): Promise<DashboardData> => {
    const [residents, complaints, visitors, finance] = await Promise.allSettled([
      apiClient.get('/residents/dashboard', { params: { society_id: 1 } }).then(r => r.data),
      apiClient.get('/complaints/dashboard').then(r => r.data),
      apiClient.get('/visitors/dashboard').then(r => r.data),
      apiClient.get('/finance/dashboard').then(r => r.data),
    ]);

    return {
      residents:  residents.status  === 'fulfilled' ? residents.value  as Record<string, unknown> : undefined,
      complaints: complaints.status === 'fulfilled' ? complaints.value as Record<string, unknown> : undefined,
      visitors:   visitors.status   === 'fulfilled' ? visitors.value   as Record<string, unknown> : undefined,
      finance:    finance.status    === 'fulfilled' ? finance.value    as Record<string, unknown> : undefined,
    };
  },
};
