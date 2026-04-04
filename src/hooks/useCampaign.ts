import { useQuery } from '@tanstack/react-query';
import { getCampaignStats, getCampaignTrend, getCampaignHeatmap } from '@/api/campaignService';

export const useCampaignStats = () => {
  return useQuery({
    queryKey: ['campaignStats'],
    queryFn: getCampaignStats,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCampaignTrend = () => {
  return useQuery({
    queryKey: ['campaignTrend'],
    queryFn: getCampaignTrend,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCampaignHeatmap = () => {
  return useQuery({
    queryKey: ['campaignHeatmap'],
    queryFn: getCampaignHeatmap,
    staleTime: 5 * 60 * 1000,
  });
};
