import { useQuery } from '@tanstack/react-query';
import { getCampaignStats, getCampaignTrend, getCampaignHeatmap } from '@/api/campaignService';
import { MOCK_CAMPAIGN_STATS, MOCK_TREND_DATA, MOCK_HEATMAP_DATA } from '@/lib/mockData';

export const useCampaignStats = () => {
  return useQuery({
    queryKey: ['campaignStats'],
    queryFn: getCampaignStats,
    staleTime: 5 * 60 * 1000,
    retry: 1,
    placeholderData: MOCK_CAMPAIGN_STATS,
  });
};

export const useCampaignTrend = () => {
  return useQuery({
    queryKey: ['campaignTrend'],
    queryFn: getCampaignTrend,
    staleTime: 5 * 60 * 1000,
    retry: 1,
    placeholderData: MOCK_TREND_DATA,
  });
};

export const useCampaignHeatmap = () => {
  return useQuery({
    queryKey: ['campaignHeatmap'],
    queryFn: getCampaignHeatmap,
    staleTime: 5 * 60 * 1000,
    retry: 1,
    placeholderData: MOCK_HEATMAP_DATA,
  });
};
