import { useQuery } from '@tanstack/react-query';
import { getIndividualLeaderboard } from '@/api/leaderboardService';

export const useIndividualLeaderboard = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ['leaderboard', 'individual', page, limit],
    queryFn: () => getIndividualLeaderboard(page, limit),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};
