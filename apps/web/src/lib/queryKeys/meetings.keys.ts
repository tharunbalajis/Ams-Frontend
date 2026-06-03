export const meetingKeys = {
  all:       ['meetings'] as const,
  lists:     () => [...meetingKeys.all, 'list']             as const,
  list:      (params?: unknown) => [...meetingKeys.lists(), params]   as const,
  details:   () => [...meetingKeys.all, 'detail']           as const,
  detail:    (id: string) => [...meetingKeys.details(), id] as const,
  upcoming:  () => [...meetingKeys.all, 'upcoming']         as const,
  minutes:   (id: string) => [...meetingKeys.all, 'minutes', id] as const,
};
