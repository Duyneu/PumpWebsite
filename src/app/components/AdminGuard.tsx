import React, { useState } from 'react';
import { Lock, Mail, KeyRound, ArrowRight, ShieldCheck, User } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { verifyAdminLogin, getCurrentAdmin, setCurrentAdmin, AdminAccount } from '../utils/adminAuth';

interface AdminGuardProps {
  children: React.ReactNode;
}

export function AdminGuard({ children }: AdminGuardProps) {
  const [currentAdmin, setCurrentAdminState] = useState<AdminAccount | null>(() => {
    return getCurrentAdmin();
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError('Vui lòng nhập đầy đủ Email và Mật khẩu!');
      return;
    }

    const verified = verifyAdminLogin(email, password);
    if (verified) {
      setCurrentAdminState(verified);
      setError('');
    } else {
      setError('Email hoặc mật khẩu quản trị không chính xác!');
    }
  };

  const handleLogout = () => {
    setCurrentAdmin(null);
    setCurrentAdminState(null);
    setEmail('');
    setPassword('');
  };

  if (!currentAdmin) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 border border-slate-800">
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Đăng Nhập Quản Trị</h2>
            <p className="text-gray-500 text-sm mt-1">
              Nhập tài khoản quản trị viên để truy cập bảng điều khiển VOLTOR.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">Email quản trị viên</label>
              <div className="relative">
                <Input
                  type="email"
                  placeholder="huuduy0811@gmail.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  className="pl-10 py-2.5 text-sm"
                  autoFocus
                  required
                />
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">Mật khẩu</label>
              <div className="relative">
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError('');
                  }}
                  className="pl-10 py-2.5 text-sm"
                  required
                />
                <KeyRound className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-medium px-3.5 py-2.5 rounded-lg">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 font-semibold text-sm shadow-md mt-2"
            >
              Đăng nhập vào Admin <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </form>

          <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> Hệ thống xác thực VOLTOR
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
      {/* Floating admin user bar */}
      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-slate-900/95 backdrop-blur-md text-white text-xs px-4 py-2 rounded-full shadow-2xl border border-slate-700">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-semibold text-gray-200">{currentAdmin.name || currentAdmin.email}</span>
        </div>
        <div className="h-3 w-px bg-slate-700 mx-1"></div>
        <button
          onClick={handleLogout}
          className="text-red-400 hover:text-red-300 font-medium hover:underline flex items-center gap-1"
          title="Đăng xuất khỏi phiên quản trị"
        >
          <Lock className="w-3.5 h-3.5" /> Đăng xuất
        </button>
      </div>
      {children}
    </div>
  );
}
