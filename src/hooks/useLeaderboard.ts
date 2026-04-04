import { useQuery } from '@tanstack/react-query';
import { getIndividualLeaderboard, getTeamLeaderboard } from '@/api/leaderboardService';

export const useIndividualLeaderboard = (page = 1, limit = 10, timeframe = 'all') => {
  return useQuery({
    queryKey: ['leaderboard', 'individual', page, limit, timeframe],
    queryFn: () => getIndividualLeaderboard(page, limit, timeframe),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useTeamLeaderboard = (page = 1, limit = 10, timeframe = 'all') => {
  return useQuery({
    queryKey: ['leaderboard', 'team', page, limit, timeframe],
    queryFn: () => getTeamLeaderboard(page, limit, timeframe),
    staleTime: 2 * 60 * 1000,
  });
};
