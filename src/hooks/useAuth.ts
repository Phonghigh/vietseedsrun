import { useMutation } from '@tanstack/react-query';
import { exchangeStravaCode } from '@/api/authService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const useAuth = () => {
  const navigate = useNavigate();

  const exchangeMutation = useMutation({
    mutationFn: (code: string) => exchangeStravaCode(code),
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      toast.success(`Chào mừng ${data.user.name} đã gia nhập giải chạy!`);
      navigate('/dashboard');
    },
    onError: (error) => {
      console.error('Login error:', error);
      toast.error('Lỗi đăng nhập qua Strava. Vui lòng thử lại.');
      navigate('/');
    }
  });

  const loginWithToken = (token: string) => {
      localStorage.setItem('accessToken', token);
      toast.success(`Chào mừng đã trở lại!`);
      navigate('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    toast.info('Đã đăng xuất');
    window.location.href = '/';
  };

  return {
    login: exchangeMutation.mutate,
    loginWithToken,
    isLoading: exchangeMutation.isPending,
    logout
  };
};

export const getStravaAuthUrl = () => {
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';
  // Use the new backend endpoint as recommended by the user
  const baseUrl = apiUrl.replace('/api/v1', '/api'); // Based on user snippet /api/strava/login
  const redirectUrl = `${window.location.origin}/auth/callback`;
  
  return `${baseUrl}/strava/login?redirectUrl=${encodeURIComponent(redirectUrl)}`;
};
