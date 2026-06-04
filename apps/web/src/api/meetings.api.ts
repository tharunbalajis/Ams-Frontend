import apiClient from './client';

export type MeetingType   = 'AGM' | 'EGM' | 'COMMITTEE';
export type MeetingStatus = 'scheduled' | 'in_progress' | 'completed' | 'cancelled';

export interface Meeting {
  id:           string;
  society_id:   number;
  title:        string;
  meeting_type: MeetingType;
  scheduled_at: string;
  status:       MeetingStatus;
  created_at:   string;
  updated_at:   string;
}

export interface CreateMeetingDto {
  society_id:    number;
  title:         string;
  meeting_type?: MeetingType;
  scheduled_at:  string;
  status?:       MeetingStatus;
}

export type UpdateMeetingDto = Partial<CreateMeetingDto>;

export interface MeetingFilters {
  society_id?:   number;
  meeting_type?: MeetingType;
  status?:       MeetingStatus;
  page?:         number;
  limit?:        number;
}

const BASE = '/meetings';

export const meetingsApi = {
  getAll:  (params?: MeetingFilters) =>
    apiClient.get<Meeting[]>(BASE, { params }).then((r) => r.data),
  getById: (id: string) =>
    apiClient.get<Meeting>(`${BASE}/${id}`).then((r) => r.data),
  create:  (data: CreateMeetingDto) =>
    apiClient.post<Meeting>(BASE, data).then((r) => r.data),
  update:  (id: string, data: UpdateMeetingDto) =>
    apiClient.put<Meeting>(`${BASE}/${id}`, data).then((r) => r.data),
  remove:  (id: string) =>
    apiClient.delete(`${BASE}/${id}`).then((r) => r.data),
};
