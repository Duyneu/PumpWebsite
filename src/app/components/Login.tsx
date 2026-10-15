import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, Facebook, Linkedin, Loader2 } from 'lucide-react';
import { loginWithProvider } from '../utils/oauth';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  onLogin: () => void;
  onOAuthSuccess: (provider: 'facebook' | 'google' | 'linkedin') => void;
}

export function Login({ onLogin, onOAuthSuccess }: LoginProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreeToTerms) {
      setError('Vui lòng đồng ý với điều khoản sử dụng!');
      return;
    }
    
    setError(null);
    // Đăng nhập với email/password
    login(email, password);
    onLogin();
  };

  const handleSocialLogin = async (provider: 'facebook' | 'google' | 'linkedin') => {
    setLoading(provider);
    setError(null);
    
    try {
      await loginWithProvider(provider);
      // OAuth thành công, gọi callback để chuyển sang ProfileSetup
      onOAuthSuccess(provider);
    } catch (err) {
      console.error('OAuth error:', err);
      setError(err instanceof Error ? err.message : 'Đăng nhập thất bại');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Left Side - Sign In Form */}
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="p-12 flex flex-col justify-center"
            >
              <h2 className="text-3xl mb-2 text-gray-800">Đăng Nhập</h2>
              
              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm mb-4"
                >
                  {error}
                </motion.div>
              )}
              
              {/* Social Login Buttons */}
              <div className="flex gap-3 mb-6">
                <button 
                  type="button"
                  onClick={() => handleSocialLogin('facebook')}
                  disabled={loading !== null}
                  className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-blue-50 hover:border-blue-400 transition-all group disabled:opacity-50 disabled:cursor-not-allowed relative"
                  title="Đăng nhập với Facebook"
                >
                  {loading === 'facebook' ? (
                    <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                  ) : (
                    <Facebook className="w-4 h-4 text-gray-600 group-hover:text-blue-600" />
                  )}
                </button>
                <button 
                  type="button"
                  onClick={() => handleSocialLogin('google')}
                  disabled={loading !== null}
                  className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-blue-50 hover:border-blue-400 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Đăng nhập với Google"
                >
                  {loading === 'google' ? (
                    <Loader2 className="w-4 h-4 text-red-500 animate-spin" />
                  ) : (
                    <svg className="w-4 h-4 text-gray-600 group-hover:text-red-500" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  )}
                </button>
                <button 
                  type="button"
                  onClick={() => handleSocialLogin('linkedin')}
                  disabled={loading !== null}
                  className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-blue-50 hover:border-blue-400 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Đăng nhập với LinkedIn"
                >
                  {loading === 'linkedin' ? (
                    <Loader2 className="w-4 h-4 text-blue-700 animate-spin" />
                  ) : (
                    <Linkedin className="w-4 h-4 text-gray-600 group-hover:text-blue-700" />
                  )}
                </button>
              </div>

              <p className="text-gray-500 text-sm mb-6">hoặc sử dụng email của quý khách</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-gray-100 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    required
                  />
                </div>
                
                <div className="relative">
                  <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-gray-100 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    required
                  />
                </div>

                <div className="text-right">
                  <button type="button" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
                    Quên mật khẩu của bạn?
                  </button>
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="agreeToTerms"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <label htmlFor="agreeToTerms" className="text-sm text-gray-600">
                    Tôi đồng ý với{' '}
                    <button
                      type="button"
                      onClick={() => navigate('/terms')}
                      className="text-blue-600 hover:underline"
                    >
                      Điều khoản sử dụng
                    </button>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-full transition-all shadow-md hover:shadow-lg transform hover:scale-[1.02]"
                >
                  ĐĂNG NHẬP
                </button>
              </form>
            </motion.div>

            {/* Right Side - Welcome Section */}
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-gradient-to-br from-blue-500 to-blue-600 p-12 flex flex-col justify-center items-center text-white relative overflow-hidden"
            >
              {/* Decorative circles */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 blur-2xl" />
              <div className="absolute top-20 right-10 w-24 h-24 bg-white/10 rounded-full blur-xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16 blur-2xl" />
              <div className="absolute bottom-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl" />
              
              <div className="relative z-10 text-center">
                <motion.h2 
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="text-4xl mb-4"
                >
                  Chào mừng Quý khách!
                </motion.h2>
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="text-sm mb-8 opacity-90 max-w-xs mx-auto leading-relaxed"
                >
                  Đăng nhập để có thể sử dụng hết chức năng của trang web chúng tôi!
                </motion.p>
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7, duration: 0.3, type: "spring" }}
                  onClick={() => navigate('/register')}
                  className="border-2 border-white px-12 py-3 rounded-full hover:bg-white hover:text-blue-600 transition-all transform hover:scale-105"
                >
                  ĐĂNG KÝ
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Skip Login Button */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-6"
        >
          <button
            onClick={onLogin}
            className="text-white/70 hover:text-white text-sm transition-colors hover:underline"
          >
            Bỏ qua đăng nhập và vào trang chủ →
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}