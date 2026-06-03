export const amenityKeys = {
  all:     ['amenities'] as const,
  lists:   () => [...amenityKeys.all, 'list']             as const,
  list:    (params?: unknown) => [...amenityKeys.lists(), params]   as const,
  details: () => [...amenityKeys.all, 'detail']           as const,
  detail:  (id: string) => [...amenityKeys.details(), id] as const,
  bookings: (amenityId: string) => [...amenityKeys.all, 'bookings', amenityId] as const,
};
