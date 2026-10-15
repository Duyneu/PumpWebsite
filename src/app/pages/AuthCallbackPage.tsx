import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * OAuth Callback Handler
 * 
 * Trang này xử lý redirect từ Facebook/Google/LinkedIn sau khi user đăng nhập
 * URL format: /auth/callback?code=xxx&state=yyy
 */
export function AuthCallbackPage() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Đang xử lý đăng nhập...');

  useEffect(() => {
    const processCallback = async () => {
      try {
        // Lấy parameters từ URL
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        const error = searchParams.get('error');
        const errorDescription = searchParams.get('error_description');

        // Kiểm tra lỗi từ OAuth provider
        if (error) {
          setStatus('error');
          setMessage(errorDescription || 'Đăng nhập thất bại!');
          
          // Gửi error về parent window
          if (window.opener) {
            window.opener.postMessage({
              type: 'oauth-error',
              error: errorDescription || error,
            }, window.location.origin);
          }
          
          // Tự động đóng sau 3 giây
          setTimeout(() => window.close(), 3000);
          return;
        }

        // Kiểm tra code
        if (!code) {
          throw new Error('Không nhận được authorization code');
        }

        // Verify state để tránh CSRF attack
        const savedState = sessionStorage.getItem('oauth_state');
        if (state !== savedState) {
          throw new Error('State không khớp - có thể bị tấn công CSRF');
        }

        setMessage('Đang lấy thông tin người dùng...');

        // ===== PHẦN NÀY CẦN BACKEND API =====
        // Trong production thật, bạn cần gọi backend API để:
        // 1. Exchange code → access_token
        // 2. Dùng access_token để lấy user info từ provider
        // 3. Lưu user vào database
        // 4. Tạo JWT token cho app
        
        // DEMO: Giả lập API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock user data (trong production, data này sẽ đến từ API)
        const provider = searchParams.get('provider') || 'facebook';
        const mockUser = {
          id: `${provider}_${Date.now()}`,
          email: `user_${Date.now()}@${provider}.com`,
          provider: provider as 'facebook' | 'google' | 'linkedin',
          // Không có name - sẽ điền ở ProfileSetup
        };

        // Lưu vào sessionStorage (chờ ProfileSetup)
        sessionStorage.setItem('pendingOAuthUser', JSON.stringify(mockUser));
        sessionStorage.setItem('oauthProvider', provider);
        
        setStatus('success');
        setMessage('Đăng nhập thành công!');

        // Gửi success message về parent window
        if (window.opener) {
          window.opener.postMessage({
            type: 'oauth-success',
            provider: provider,
          }, window.location.origin);
        }

        // Đóng popup sau 1 giây
        setTimeout(() => {
          window.close();
        }, 1000);

      } catch (err: any) {
        console.error('OAuth callback error:', err);
        setStatus('error');
        setMessage(err.message || 'Có lỗi xảy ra!');

        // Gửi error về parent window
        if (window.opener) {
          window.opener.postMessage({
            type: 'oauth-error',
            error: err.message,
          }, window.location.origin);
        }

        // Tự động đóng sau 3 giây
        setTimeout(() => window.close(), 3000);
      }
    };

    processCallback();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4">
        <div className="text-center">
          {/* Loading Spinner */}
          {status === 'loading' && (
            <div className="mb-4">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          )}

          {/* Success Icon */}
          {status === 'success' && (
            <div className="mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          )}

          {/* Error Icon */}
          {status === 'error' && (
            <div className="mb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
          )}

          {/* Message */}
          <h2 className={`text-xl mb-2 ${
            status === 'success' ? 'text-green-600' :
            status === 'error' ? 'text-red-600' :
            'text-gray-800'
          }`}>
            {status === 'success' && '✓ Thành công!'}
            {status === 'error' && '✕ Lỗi'}
            {status === 'loading' && 'Đang xử lý...'}
          </h2>
          
          <p className="text-gray-600 text-sm">{message}</p>

          {status === 'success' && (
            <p className="text-xs text-gray-500 mt-4">
              Cửa sổ này sẽ tự động đóng...
            </p>
          )}

          {status === 'error' && (
            <button
              onClick={() => window.close()}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
            >
              Đóng cửa sổ
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
