import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Login } from '../components/Login';
import { useAuth } from '../contexts/AuthContext';

export function LoginPage() {
  const navigate = useNavigate();
  const { isLoggedIn, login, handleOAuthSuccess } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = () => {
    // Login thành công, navigate về home
    navigate('/', { replace: true });
  };

  const handleOAuthSuccessWithRedirect = async (provider: 'facebook' | 'google' | 'linkedin') => {
    handleOAuthSuccess(provider);
    // Chuyển sang profile setup page
    navigate('/profile-setup', { replace: true });
  };

  return (
    <Login
      onLogin={handleLogin}
      onOAuthSuccess={handleOAuthSuccessWithRedirect}
    />
  );
}
