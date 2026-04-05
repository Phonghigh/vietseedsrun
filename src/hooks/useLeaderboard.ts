import { useQuery } from '@tanstack/react-query';
import { getIndividualLeaderboard, getTeamLeaderboard } from '@/api/leaderboardService';
import { MOCK_LEADERBOARD } from '@/lib/mockData';

const withFallback = <T,>(fn: () => Promise<T>, fallback: T) => async (): Promise<T> => {
  try {
    return await fn();
  } catch {
    return fallback;
  }
};

export const useIndividualLeaderboard = (page = 1, limit = 10, timeframe = 'all') => {
  return useQuery({
    queryKey: ['leaderboard', 'individual', page, limit, timeframe],
    queryFn: withFallback(
      () => getIndividualLeaderboard(page, limit, timeframe),
      MOCK_LEADERBOARD.slice(0, limit)
    ),
    staleTime: 2 * 60 * 1000,
    retry: 1,
  });
};

export const useTeamLeaderboard = (page = 1, limit = 10, timeframe = 'all') => {
  return useQuery({
    queryKey: ['leaderboard', 'team', page, limit, timeframe],
    queryFn: withFallback(
      () => getTeamLeaderboard(page, limit, timeframe),
      []
    ),
    staleTime: 2 * 60 * 1000,
    retry: 1,
  });
};
