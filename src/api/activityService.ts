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

// Giới hạn Pace hợp lệ (4:00 - 15:00 min/km)
export const PACE_MIN_SECONDS = 4 * 60; // 240s
export const PACE_MAX_SECONDS = 15 * 60; // 900s

/**
 * Kiểm tra Pace có nằm trong khoảng hợp lệ không
 * @param paceStr Chuỗi pace dạng "MM:SS"
 */
export const isPaceValid = (paceStr: string): boolean => {
  if (!paceStr || !paceStr.includes(':')) return false;
  
  const [mins, secs] = paceStr.split(':').map(Number);
  const totalSeconds = (mins * 60) + secs;
  
  return totalSeconds >= PACE_MIN_SECONDS && totalSeconds <= PACE_MAX_SECONDS;
};

/**
 * Kiểm tra ngày có nằm trong thời gian giải chạy không
 */
export const isDateValid = (dateStr: string): boolean => {
  const activityDate = new Date(dateStr).getTime();
  const start = new Date(CHALLENGE_START).getTime();
  const end = new Date(CHALLENGE_END).getTime();
  
  return activityDate >= start && activityDate <= end;
};

export const getMyActivities = async (page = 1, limit = 10): Promise<ActivitiesResponse> => {
  const response = await apiClient.get<ActivitiesResponse>('/activities/me', {
    params: { 
      page, 
      limit,
      startDate: CHALLENGE_START,
      endDate: CHALLENGE_END
    }
  });
  
  return response.data;
};

export const getAthleteActivities = async (athleteId: string, page = 1, limit = 10): Promise<ActivitiesResponse> => {
  const response = await apiClient.get<ActivitiesResponse>(`/activities/athlete/${athleteId}`, {
    params: { 
      page, 
      limit,
      startDate: CHALLENGE_START,
      endDate: CHALLENGE_END
    }
  });
  
  return response.data;
};

export const syncActivities = async (): Promise<void> => {
  await apiClient.post('/activities/sync');
};
