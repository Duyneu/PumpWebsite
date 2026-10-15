import { useState } from 'react';
import { motion } from 'motion/react';
import { User, ArrowRight, Sparkles } from 'lucide-react';

interface ProfileSetupProps {
  provider: 'facebook' | 'google' | 'linkedin';
  onComplete: (displayName: string) => void;
}

export function ProfileSetup({ provider, onComplete }: ProfileSetupProps) {
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');

  const providerInfo = {
    facebook: {
      name: 'Facebook',
      color: 'from-blue-600 to-blue-700',
      icon: '👤',
    },
    google: {
      name: 'Google',
      color: 'from-red-500 to-red-600',
      icon: '🔍',
    },
    linkedin: {
      name: 'LinkedIn',
      color: 'from-blue-700 to-blue-800',
      icon: '💼',
    },
  };

  const info = providerInfo[provider];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!displayName.trim()) {
      setError('Vui lòng nhập tên của bạn');
      return;
    }

    if (displayName.trim().length < 2) {
      setError('Tên phải có ít nhất 2 ký tự');
      return;
    }

    if (displayName.trim().length > 50) {
      setError('Tên không được quá 50 ký tự');
      return;
    }

    onComplete(displayName.trim());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header with Provider Color */}
          <div className={`bg-gradient-to-r ${info.color} p-8 text-white text-center relative overflow-hidden`}>
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />
            
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative z-10"
            >
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
                {info.icon}
              </div>
              <h1 className="text-3xl mb-2">Đăng nhập thành công!</h1>
              <p className="text-sm text-white/90">Qua {info.name}</p>
            </motion.div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="p-8"
          >
            <div className="flex items-center gap-2 mb-6 text-gray-700">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              <h2 className="text-xl">Chúng tôi nên gọi bạn là?</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="displayName" className="block text-sm text-gray-600 mb-2">
                  Tên hiển thị <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    id="displayName"
                    value={displayName}
                    onChange={(e) => {
                      setDisplayName(e.target.value);
                      setError('');
                    }}
                    className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:outline-none transition-all ${
                      error
                        ? 'border-red-300 focus:border-red-500'
                        : 'border-gray-200 focus:border-blue-500'
                    }`}
                    placeholder="Ví dụ: Nguyễn Văn A"
                    autoFocus
                    maxLength={50}
                  />
                </div>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-2"
                  >
                    {error}
                  </motion.p>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  Đây là tên sẽ hiển thị trên trang web
                </p>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full bg-gradient-to-r ${info.color} text-white py-4 rounded-xl font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all`}
              >
                Tiếp tục
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </form>

            {/* Tips */}
            <div className="mt-6 p-4 bg-blue-50 rounded-xl">
              <p className="text-sm text-gray-600">
                💡 <strong>Lưu ý:</strong> Bạn có thể thay đổi tên này bất cứ lúc nào trong trang cá nhân.
              </p>
            </div>

            {/* Provider Info */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-400">
                Đã đăng nhập qua {info.name}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-center text-sm text-gray-600"
        >
          <p>
            Bằng cách tiếp tục, bạn đồng ý với{' '}
            <a href="#" className="text-blue-600 hover:underline">
              Điều khoản sử dụng
            </a>{' '}
            của chúng tôi
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
