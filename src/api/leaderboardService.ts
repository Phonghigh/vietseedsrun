import { apiClient } from './client';

export interface LeaderboardUser {
  userId?: string; // MongoDB User ID
  _id?: string;    // Alias for MongoDB User ID
  id?: string;     // Legacy ID field
  rank: number;
  name: string;
  avatar: string;
  distance: number;
  activities: number;
  trend: "up" | "down" | "same";
}

export interface LeaderboardTeam {
  rank: number;
  name: string;
  avatar: string;
  totalDistance: number;
  memberCount: number;
  teamId?: string;
}

export interface AthleteDetailResponse {
  athlete: {
    _id: string;
    firstName: string;
    lastName: string;
    stravaId: string;
    profile: string;
    location: string;
    teamName: string;
    gender: string;
  };
  stats: {
    activityCount: number;
    totalDistanceKm: number;
    totalDistanceMeters: number;
  };
  activities: Array<{
    id: string;
    name: string;
    distanceKm: number;
    movingTime: number;
    pace: string;
    date: string;
    location: string;
    type: string;
  }>;
}

const CHALLENGE_START = '2026-04-01T00:00:00Z';
const CHALLENGE_END = '2026-04-30T23:59:59Z';

export const getIndividualLeaderboard = async (page = 1, limit = 10): Promise<LeaderboardUser[]> => {
  const response = await apiClient.get<any>('/leaderboard/individuals', {
    params: { page, limit, startDate: CHALLENGE_START, endDate: CHALLENGE_END }
  });
  // Handle both raw array and paginated object structure { data: [], total: ... }
  const data = Array.isArray(response.data) ? response.data : (response.data?.data || []);
  return data;
};

export const getTeamLeaderboard = async (page = 1, limit = 10): Promise<LeaderboardTeam[]> => {
  const response = await apiClient.get<any>('/leaderboard/teams', {
    params: { page, limit, startDate: CHALLENGE_START, endDate: CHALLENGE_END }
  });
  return Array.isArray(response.data) ? response.data : (response.data?.data || []);
};

export const getAthleteDetail = async (userId: string): Promise<AthleteDetailResponse> => {
  const response = await apiClient.get<AthleteDetailResponse>(`/leaderboard/athlete/${userId}`);
  return response.data;
};
