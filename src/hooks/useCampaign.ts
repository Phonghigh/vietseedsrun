import { useQuery } from '@tanstack/react-query';
import { getCampaignStats, getCampaignTrend, getCampaignHeatmap } from '@/api/campaignService';
import { MOCK_CAMPAIGN_STATS, MOCK_TREND_DATA, MOCK_HEATMAP_DATA } from '@/lib/mockData';

const withFallback = <T,>(fn: () => Promise<T>, fallback: T) => async (): Promise<T> => {
  try {
    return await fn();
  } catch {
    return fallback;
  }
};

export const useCampaignStats = () => {
  return useQuery({
    queryKey: ['campaignStats'],
    queryFn: withFallback(getCampaignStats, MOCK_CAMPAIGN_STATS),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};

export const useCampaignTrend = () => {
  return useQuery({
    queryKey: ['campaignTrend'],
    queryFn: withFallback(getCampaignTrend, MOCK_TREND_DATA),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};

export const useCampaignHeatmap = () => {
  return useQuery({
    queryKey: ['campaignHeatmap'],
    queryFn: withFallback(getCampaignHeatmap, MOCK_HEATMAP_DATA),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
