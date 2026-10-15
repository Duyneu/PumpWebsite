import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Register } from '../components/Register';
import { useAuth } from '../contexts/AuthContext';

export function RegisterPage() {
  const navigate = useNavigate();
  const { isLoggedIn, handleOAuthSuccess } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  const handleRegisterSuccess = () => {
    // Đăng ký thành công, navigate về home
    navigate('/', { replace: true });
  };

  const handleOAuthSuccessWithRedirect = async (provider: 'facebook' | 'google' | 'linkedin') => {
    handleOAuthSuccess(provider);
    // Chuyển sang profile setup page
    navigate('/profile-setup', { replace: true });
  };

  const handleGoToLogin = () => {
    navigate('/login');
  };

  return (
    <Register
      onRegisterSuccess={handleRegisterSuccess}
      onOAuthSuccess={handleOAuthSuccessWithRedirect}
      onGoToLogin={handleGoToLogin}
    />
  );
}
