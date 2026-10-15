import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileSetup } from '../components/ProfileSetup';
import { useAuth } from '../contexts/AuthContext';

export function ProfileSetupPage() {
  const navigate = useNavigate();
  const { isLoggedIn, completeProfile } = useAuth();

  // Get provider from sessionStorage
  const provider = sessionStorage.getItem('oauthProvider') as 'facebook' | 'google' | 'linkedin' | null;

  // Redirect if already logged in hoặc không có provider
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/', { replace: true });
    } else if (!provider) {
      // Không có provider, redirect về login
      navigate('/login', { replace: true });
    }
  }, [isLoggedIn, provider, navigate]);

  const handleComplete = (displayName: string) => {
    completeProfile(displayName);
    // Navigate về home sau khi setup xong
    navigate('/', { replace: true });
  };

  // Don't render if no provider
  if (!provider) {
    return null;
  }

  return (
    <ProfileSetup
      provider={provider}
      onComplete={handleComplete}
    />
  );
}
