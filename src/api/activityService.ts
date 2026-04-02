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

// Thời gian diễn ra giải chạy VietSeeds Run 2026
export const CHALLENGE_START = '2026-04-01T00:00:00Z';
export const CHALLENGE_END = '2026-04-30T23:59:59Z';

export const getMyActivities = async (page = 1, limit = 10): Promise<ActivitiesResponse> => {
  const response = await apiClient.get<ActivitiesResponse>('/activities/me', {
    params: { 
      page, 
      limit,
      startDate: CHALLENGE_START,
      endDate: CHALLENGE_END
    }
  });
  
  // Lọc thêm ở Frontend để đảm bảo tính chính xác tuyệt đối
  const filteredData = response.data.data.filter(a => {
    const activityDate = new Date(a.date).getTime();
    return activityDate >= new Date(CHALLENGE_START).getTime() && 
           activityDate <= new Date(CHALLENGE_END).getTime();
  });

  return {
    ...response.data,
    data: filteredData
  };
};

export const syncActivities = async (): Promise<void> => {
  await apiClient.post('/activities/sync');
};
