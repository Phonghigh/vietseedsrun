import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMyProfile } from '@/api/authService';

export const useMyProfile = () => {
  return useQuery({
    queryKey: ['user', 'me'],
    queryFn: getMyProfile,
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });
};
