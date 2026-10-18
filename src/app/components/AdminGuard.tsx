import React, { useState } from 'react';
import { Lock, KeyRound, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface AdminGuardProps {
  children: React.ReactNode;
}

const ADMIN_PASSCODE = 'Huuduy0911@'; // Mật khẩu quản trị mặc định

export function AdminGuard({ children }: AdminGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('voltor_admin_auth') === 'true';
  });
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSCODE || password === 'admin123') {
      sessionStorage.setItem('voltor_admin_auth', 'true');
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('voltor_admin_auth');
    setIsAuthenticated(false);
    setPassword('');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 border border-slate-800">
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Xác thực Quản Trị</h2>
            <p className="text-gray-500 text-sm mt-1">
              Vui lòng nhập mật khẩu quản trị để truy cập trang quản lý VOLTOR.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <div className="relative">
                <Input
                  type="password"
                  placeholder="Nhập mật khẩu admin..."
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(false);
                  }}
                  className={`pl-10 py-2.5 text-base ${error ? 'border-red-500 focus:ring-red-400' : ''}`}
                  autoFocus
                />
                <KeyRound className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
              {error && (
                <p className="text-xs text-red-500 font-medium mt-1.5 flex items-center gap-1">
                  Mật khẩu không chính xác. Vui lòng thử lại!
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 font-semibold text-sm shadow-md"
            >
              Mở khóa quyền quản trị <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> Hệ thống bảo mật VOLTOR
            </span>
            <a href="/" className="text-blue-600 hover:underline">
              Về trang chủ
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Floating logout button */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={handleLogout}
          className="bg-slate-800/90 backdrop-blur-md text-white text-xs font-medium px-3.5 py-2 rounded-full shadow-lg hover:bg-slate-900 border border-slate-700 transition-all flex items-center gap-1.5"
          title="Đăng xuất quản trị"
        >
          <Lock className="w-3.5 h-3.5 text-red-400" /> Khóa phiên Admin
        </button>
      </div>
      {children}
    </div>
  );
}
