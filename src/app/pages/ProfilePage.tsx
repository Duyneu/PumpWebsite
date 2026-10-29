import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { User, Mail, Lock, Save, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function ProfilePage() {
  const navigate = useNavigate();
  const { user, isLoggedIn, updateProfile } = useAuth();
  
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load user data
  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || user.name || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validate password if user wants to change it
    if (newPassword) {
      if (newPassword.length < 6) {
        setError('Mật khẩu mới phải có ít nhất 6 ký tự!');
        return;
      }
      if (newPassword !== confirmPassword) {
        setError('Mật khẩu xác nhận không khớp!');
        return;
      }
    }

    // Update profile
    const updates: any = {
      displayName: displayName,
    };

    if (newPassword) {
      updates.password = newPassword;
    }

    updateProfile(updates);
    setSuccess('Cập nhật thông tin thành công!');
    
    // Clear password fields
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');

    // Auto close success message after 3s
    setTimeout(() => {
      setSuccess(null);
    }, 3000);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Quay lại trang chủ</span>
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-6">
              <h1 className="text-2xl text-white">Thông tin tài khoản</h1>
              <p className="text-blue-100 text-sm mt-1">
                Quản lý thông tin cá nhân của bạn
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {/* Success Message */}
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm"
                >
                  {success}
                </motion.div>
              )}

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm"
                >
                  {error}
                </motion.div>
              )}

              {/* Account Info */}
              <div>
                <h3 className="text-lg mb-4 text-gray-800">Thông tin cơ bản</h3>
                
                <div className="space-y-4">
                  {/* Display Name */}
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      Tên hiển thị
                    </label>
                    <div className="relative">
                      <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Nhập tên hiển thị"
                        required
                      />
                    </div>
                  </div>

                  {/* Email (read-only) */}
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={email}
                        className="w-full pl-11 pr-4 py-3 bg-gray-100 border border-gray-200 rounded-lg cursor-not-allowed text-gray-500"
                        disabled
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Email không thể thay đổi
                    </p>
                  </div>

                  {/* Provider Badge */}
                  {user.provider && (
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">
                        Phương thức đăng nhập
                      </label>
                      <div className="inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-700 text-sm rounded-full">
                        {user.provider === 'email' && '📧 Email'}
                        {user.provider === 'facebook' && '👤 Facebook'}
                        {user.provider === 'google' && '🔍 Google'}
                        {user.provider === 'linkedin' && '💼 LinkedIn'}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Change Password Section - Only for email users */}
              {user.provider === 'email' && (
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-lg mb-4 text-gray-800">Đổi mật khẩu</h3>
                  
                  <div className="space-y-4">
                    {/* Current Password */}
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">
                        Mật khẩu hiện tại
                      </label>
                      <div className="relative">
                        <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="Nhập mật khẩu hiện tại"
                        />
                      </div>
                    </div>

                    {/* New Password */}
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">
                        Mật khẩu mới
                      </label>
                      <div className="relative">
                        <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="Nhập mật khẩu mới (ít nhất 6 ký tự)"
                          minLength={6}
                        />
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">
                        Xác nhận mật khẩu mới
                      </label>
                      <div className="relative">
                        <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="Nhập lại mật khẩu mới"
                          minLength={6}
                        />
                      </div>
                    </div>

                    <p className="text-xs text-gray-500">
                      Để trống nếu không muốn đổi mật khẩu
                    </p>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg transform hover:scale-[1.02]"
                >
                  <Save className="w-5 h-5" />
                  <span>Lưu thay đổi</span>
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
