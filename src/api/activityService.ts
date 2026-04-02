import { apiClient } from './client';

export interface Activity {
  activityId: string;
  name: string;
  distance: number;
  movingTime: number;
  pace: string;
  date: string;
  isValid: boolean;
}

export interface ActivitiesResponse {
  data: Activity[];
  meta: {
    total: number;
    currentPage: number;
    totalPages: number;
  };
}

export const getMyActivities = async (page = 1, limit = 10): Promise<ActivitiesResponse> => {
  const response = await apiClient.get<ActivitiesResponse>('/activities/me', {
    params: { page, limit }
  });
  return response.data;
};

export const syncActivities = async (): Promise<void> => {
  await apiClient.post('/activities/sync');
};
