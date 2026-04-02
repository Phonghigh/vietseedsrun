import { useQuery } from '@tanstack/react-query';
import { getMyProfile } from '@/api/authService';

export const useMyProfile = () => {
  const token = localStorage.getItem('accessToken');
  
  // Guard against common corrupted token values or guest mode
  const isTokenValid = token && token !== 'null' && token !== 'undefined' && token.length > 10;

  return useQuery({
    queryKey: ['user', 'me'],
    queryFn: getMyProfile,
    retry: 1,
    staleTime: 5 * 60 * 1000,
    enabled: !!isTokenValid,
  });
};
