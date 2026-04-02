import { useQuery } from '@tanstack/react-query';
import { getCampaignStats } from '@/api/campaignService';

export const useCampaignStats = () => {
  return useQuery({
    queryKey: ['campaignStats'],
    queryFn: getCampaignStats,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
