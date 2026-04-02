import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login, loginWithToken, isLoading } = useAuth();
  
  useEffect(() => {
    const code = searchParams.get('code');
    const token = searchParams.get('token');
    const error = searchParams.get('error');
    
    if (error) {
      console.error('Strava error:', error);
      navigate('/');
      return;
    }
    
    if (token) {
      console.log('Received JWT from backend login');
      loginWithToken(token);
    } else if (code) {
      console.log('Exchanging Strava code:', code);
      login(code);
    } else {
      navigate('/');
    }
  }, [searchParams, login, loginWithToken, navigate]);

  return (
    <div className="min-h-screen gradient-dark flex flex-col items-center justify-center text-white p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-10 rounded-2xl flex flex-col items-center max-w-md w-full text-center"
      >
        <Loader2 className="h-12 w-12 text-primary animate-spin mb-6" />
        <h1 className="text-2xl font-bold mb-2">Đang xử lý đăng nhập...</h1>
        <p className="text-muted-foreground">Vui lòng đợi trong giây lát, chúng tôi đang kết nối với tài khoản Strava của bạn.</p>
      </motion.div>
    </div>
  );
};

export default AuthCallback;
