import { apiClient } from './client';
import { leaderboardIndividual, leaderboardTeams } from '@/lib/mockData';

export interface LeaderboardUser {
  rank: number;
  name: string;
  avatar: string;
  distance: number;
  activities: number;
  trend: "up" | "down" | "same";
}

export const getIndividualLeaderboard = async (page = 1, limit = 10): Promise<LeaderboardUser[]> => {
  try {
    const response = await apiClient.get<LeaderboardUser[]>('/leaderboard/individuals', {
      params: { page, limit }
    });
    return response.data;
  } catch (error) {
    console.warn('API Error, falling back to Mock Leaderboard Data');
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(leaderboardIndividual.slice((page - 1) * limit, page * limit));
      }, 800);
    });
  }
};
