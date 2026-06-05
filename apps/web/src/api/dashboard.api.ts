import apiClient from './client';

export const dashboardApi = {
  // NO /dashboard/metrics — call 4 separate endpoints in parallel
  getAll: (society_id = 1) =>
    Promise.allSettled([
      apiClient.get('/residents/dashboard', { params: { society_id } }).then(r => r.data),
      apiClient.get('/complaints/dashboard').then(r => r.data),
      apiClient.get('/visitors/dashboard').then(r => r.data),
      apiClient.get('/finance/dashboard').then(r => r.data),
    ]),
};
