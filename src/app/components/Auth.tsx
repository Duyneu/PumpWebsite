import { useState } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

interface AuthProps {
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
}

export function Auth({ onClose, onLogin }: AuthProps) {
  const [isSignIn, setIsSignIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignIn) {
      onLogin(formData.email, formData.password);
    } else {
      // Handle sign up
      onLogin(formData.email, formData.password);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden flex">
        {/* Left Side - Form */}
        <div className="flex-1 p-8 md:p-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl">{isSignIn ? 'Sign in' : 'Sign up'}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Social Login */}
          <div className="mb-6">
            <div className="text-sm text-gray-600 mb-4">
              Or use your email {isSignIn ? 'password' : 'account'}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isSignIn && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required={!isSignIn}
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {isSignIn && (
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Forgot Your Password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors"
            >
              {isSignIn ? 'SIGN IN' : 'SIGN UP'}
            </button>
          </form>

          {/* Toggle Sign In/Up */}
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsSignIn(!isSignIn)}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              {isSignIn ? (
                <>
                  Don't have an account?{' '}
                  <span className="text-blue-600 hover:text-blue-700">Sign up</span>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <span className="text-blue-600 hover:text-blue-700">Sign in</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Side - Welcome Panel */}
        <div className="hidden md:flex flex-1 bg-gradient-to-br from-blue-500 to-blue-700 text-white p-12 flex-col justify-center items-center text-center relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/20 rounded-full -translate-y-32 translate-x-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-600/20 rounded-full translate-y-24 -translate-x-24" />
          
          <div className="relative z-10">
            <h2 className="text-3xl mb-4">
              {isSignIn ? 'Hello, Friend!' : 'Welcome Back!'}
            </h2>
            <p className="text-blue-100 mb-8 max-w-xs">
              {isSignIn
                ? 'Register with your personal details to use all of site features'
                : 'Enter your personal details and start your journey with us'}
            </p>
            <button
              onClick={() => setIsSignIn(!isSignIn)}
              className="px-8 py-3 border-2 border-white rounded-full hover:bg-white hover:text-blue-600 transition-colors"
            >
              {isSignIn ? 'SIGN UP' : 'SIGN IN'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
