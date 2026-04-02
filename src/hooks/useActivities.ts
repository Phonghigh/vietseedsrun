import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMyActivities, syncActivities } from '@/api/activityService';
import { toast } from 'sonner';

export const useMyActivities = (page = 1, limit = 10) => {
  const token = localStorage.getItem('accessToken');
  return useQuery({
    queryKey: ['activities', 'me', page, limit],
    queryFn: () => getMyActivities(page, limit),
    staleTime: 60 * 1000,
    enabled: !!token,
  });
};

export const useSyncActivities = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: syncActivities,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['campaignStats'] });
      queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
      toast.success('Dữ liệu đã được đồng bộ với Strava!');
    },
    onError: (error) => {
      console.error('Lỗi đồng bộ:', error);
      toast.error('Không thể đồng bộ dữ liệu. Thử lại sau.');
    }
  });
};
