import { useQuery } from '@tanstack/react-query';
import { getIndividualLeaderboard, getTeamLeaderboard } from '@/api/leaderboardService';
import { MOCK_LEADERBOARD } from '@/lib/mockData';

export const useIndividualLeaderboard = (page = 1, limit = 10, timeframe = 'all') => {
  return useQuery({
    queryKey: ['leaderboard', 'individual', page, limit, timeframe],
    queryFn: () => getIndividualLeaderboard(page, limit, timeframe),
    staleTime: 2 * 60 * 1000,
    retry: 1,
    placeholderData: MOCK_LEADERBOARD.slice(0, limit),
  });
};

export const useTeamLeaderboard = (page = 1, limit = 10, timeframe = 'all') => {
  return useQuery({
    queryKey: ['leaderboard', 'team', page, limit, timeframe],
    queryFn: () => getTeamLeaderboard(page, limit, timeframe),
    staleTime: 2 * 60 * 1000,
    retry: 1,
  });
};
