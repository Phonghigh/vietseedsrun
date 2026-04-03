import { useQuery } from '@tanstack/react-query';
import { getAthleteDetail } from '@/api/leaderboardService';

export const useAthleteDetail = (userId: string) => {
  return useQuery({
    queryKey: ['athlete-detail', userId],
    queryFn: () => getAthleteDetail(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
};
