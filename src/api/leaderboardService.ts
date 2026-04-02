import { apiClient } from './client';

export interface LeaderboardUser {
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
  distance: number;
  members: number;
}

const CHALLENGE_START = '2026-04-01T00:00:00Z';
const CHALLENGE_END = '2026-04-30T23:59:59Z';

export const getIndividualLeaderboard = async (page = 1, limit = 10): Promise<LeaderboardUser[]> => {
  const response = await apiClient.get<LeaderboardUser[]>('/leaderboard/individuals', {
    params: { page, limit, startDate: CHALLENGE_START, endDate: CHALLENGE_END }
  });
  return response.data;
};

export const getTeamLeaderboard = async (page = 1, limit = 10): Promise<LeaderboardTeam[]> => {
  const response = await apiClient.get<LeaderboardTeam[]>('/leaderboard/teams', {
    params: { page, limit, startDate: CHALLENGE_START, endDate: CHALLENGE_END }
  });
  return response.data;
};
