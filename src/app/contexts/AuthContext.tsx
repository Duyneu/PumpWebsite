import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  displayName: string;
  avatar?: string;
  role?: 'admin' | 'user';
  provider: 'email' | 'facebook' | 'google' | 'linkedin';
}

export interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  login: (email: string, password: string) => void;
  register: (name: string, email: string, password: string) => void;
  logout: () => void;
  handleOAuthSuccess: (provider: 'facebook' | 'google' | 'linkedin') => void;
  completeProfile: (displayName: string) => void;
  updateProfile: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check localStorage on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('user');
      const savedIsLoggedIn = localStorage.getItem('isLoggedIn');

      if (savedUser && savedIsLoggedIn === 'true') {
        const parsedUser = JSON.parse(savedUser);
        // Ensure role is assigned if admin email
        if (!parsedUser.role) {
          parsedUser.role = parsedUser.email.toLowerCase().includes('admin') ? 'admin' : 'user';
        }
        setUser(parsedUser);
        setIsLoggedIn(true);
      }
    } catch (e) {
      console.error('Error reading auth state from localStorage:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (email: string, password: string) => {
    const isAdmin = email.toLowerCase().includes('admin');
    const newUser: User = {
      id: 'user_' + Date.now(),
      email: email,
      name: email.split('@')[0],
      displayName: email.split('@')[0],
      role: isAdmin ? 'admin' : 'user',
      provider: 'email',
    };

    setUser(newUser);
    setIsLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(newUser));
    localStorage.setItem('isLoggedIn', 'true');
  };

  const register = (name: string, email: string, password: string) => {
    const isAdmin = email.toLowerCase().includes('admin');
    const newUser: User = {
      id: 'user_' + Date.now(),
      email: email,
      name: name,
      displayName: name,
      role: isAdmin ? 'admin' : 'user',
      provider: 'email',
    };

    setUser(newUser);
    setIsLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(newUser));
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleOAuthSuccess = (provider: 'facebook' | 'google' | 'linkedin') => {
    sessionStorage.setItem('oauthProvider', provider);
  };

  const completeProfile = (displayName: string) => {
    const pendingUserJson = sessionStorage.getItem('pendingOAuthUser');
    const provider = sessionStorage.getItem('oauthProvider') as 'facebook' | 'google' | 'linkedin' | null;

    if (pendingUserJson && provider) {
      const pendingUser = JSON.parse(pendingUserJson);
      const isAdmin = (pendingUser.email || '').toLowerCase().includes('admin');

      const completeUser: User = {
        ...pendingUser,
        name: displayName,
        displayName: displayName,
        role: pendingUser.role || (isAdmin ? 'admin' : 'user'),
        provider: provider,
      };

      setUser(completeUser);
      setIsLoggedIn(true);
      localStorage.setItem('user', JSON.stringify(completeUser));
      localStorage.setItem('isLoggedIn', 'true');

      sessionStorage.removeItem('pendingOAuthUser');
      sessionStorage.removeItem('oauthProvider');
    }
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser: User = {
        ...user,
        ...updates,
      };

      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    sessionStorage.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        loading,
        login,
        register,
        logout,
        handleOAuthSuccess,
        completeProfile,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}