import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export function MockOAuthPage() {
  const [searchParams] = useSearchParams();
  const provider = searchParams.get('provider') as 'facebook' | 'google' | 'linkedin';
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);

  // Mock accounts for each provider
  const mockAccounts = {
    google: [
      {
        id: '1',
        name: 'Nguyễn Văn A',
        email: 'nguyenvana@gmail.com',
        avatar: 'https://ui-avatars.com/api/?name=Nguyen+Van+A&background=4285F4&color=fff&size=48',
      },
      {
        id: '2',
        name: 'Trần Thị B',
        email: 'tranthib@gmail.com',
        avatar: 'https://ui-avatars.com/api/?name=Tran+Thi+B&background=EA4335&color=fff&size=48',
      },
    ],
    facebook: [
      {
        id: '1',
        name: 'Lê Văn C',
        email: 'levanc@outlook.com',
        avatar: 'https://ui-avatars.com/api/?name=Le+Van+C&background=1877F2&color=fff&size=64',
      },
      {
        id: '2',
        name: 'Phạm Thị D',
        email: 'phamthid@yahoo.com',
        avatar: 'https://ui-avatars.com/api/?name=Pham+Thi+D&background=42b72a&color=fff&size=64',
      },
    ],
    linkedin: [
      {
        id: '1',
        name: 'Hoàng Văn E',
        email: 'hoangvane@company.com',
        avatar: 'https://ui-avatars.com/api/?name=Hoang+Van+E&background=0077B5&color=fff&size=56',
      },
      {
        id: '2',
        name: 'Vũ Thị F',
        email: 'vuthif@enterprise.com',
        avatar: 'https://ui-avatars.com/api/?name=Vu+Thi+F&background=00A0DC&color=fff&size=56',
      },
    ],
  };

  const accounts = mockAccounts[provider] || [];

  const handleAccountSelect = (accountId: string) => {
    setSelectedAccount(accountId);
    
    // Simulate OAuth success after 1 second
    setTimeout(() => {
      const account = accounts.find(a => a.id === accountId);
      if (account) {
        // Send success message to parent window
        if (window.opener) {
          window.opener.postMessage({
            type: 'oauth-success',
            provider: provider,
            user: {
              id: `${provider}_${account.id}`,
              email: account.email,
              name: account.name,
              avatar: account.avatar,
              provider: provider,
            }
          }, window.location.origin);
        }
        
        // Close popup
        window.close();
      }
    }, 1000);
  };

  // Google OAuth UI
  if (provider === 'google') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Google Logo */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <svg className="w-8 h-8" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
            </div>
            <h1 className="text-2xl text-gray-700 mb-1">Đăng nhập</h1>
            <p className="text-sm text-gray-600">để tiếp tục tới VOLTOR Vietnam</p>
          </div>

          {/* Accounts List */}
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            {accounts.map((account) => (
              <button
                key={account.id}
                onClick={() => handleAccountSelect(account.id)}
                disabled={selectedAccount !== null}
                className={`w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors border-b border-gray-200 last:border-b-0 ${
                  selectedAccount === account.id ? 'bg-blue-50' : ''
                }`}
              >
                <img
                  src={account.avatar}
                  alt={account.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium text-gray-900">{account.name}</div>
                  <div className="text-sm text-gray-600">{account.email}</div>
                </div>
                {selectedAccount === account.id && (
                  <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                )}
              </button>
            ))}

            {/* Use another account */}
            <button
              onClick={() => handleAccountSelect('1')}
              disabled={selectedAccount !== null}
              className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="flex-1 text-left">
                <div className="text-sm font-medium text-blue-600">Sử dụng tài khoản khác</div>
              </div>
            </button>
          </div>

          {/* Footer */}
          <div className="mt-6 flex items-center justify-center gap-4 text-xs text-gray-600">
            <a href="#" className="hover:text-blue-600">Tiếng Việt</a>
            <a href="#" className="hover:text-blue-600">Trợ giúp</a>
            <a href="#" className="hover:text-blue-600">Bảo mật</a>
            <a href="#" className="hover:text-blue-600">Điều khoản</a>
          </div>
        </div>
      </div>
    );
  }

  // Facebook OAuth UI
  if (provider === 'facebook') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Facebook Header */}
          <div className="text-center mb-8">
            <svg className="w-16 h-16 mx-auto mb-4" viewBox="0 0 48 48">
              <circle cx="24" cy="24" r="24" fill="#1877F2"/>
              <path fill="white" d="M29.5 16h-3c-1.93 0-3.5 1.57-3.5 3.5V22h-3v4h3v10h4V26h3.5l.5-4h-4v-2.5c0-.55.45-1 1-1h3v-4z"/>
            </svg>
            <h1 className="text-xl text-gray-800 mb-2">Đăng nhập vào Facebook</h1>
            <p className="text-sm text-gray-600">để tiếp tục tới VOLTOR Vietnam</p>
          </div>

          {/* Accounts List */}
          <div className="space-y-3">
            {accounts.map((account) => (
              <button
                key={account.id}
                onClick={() => handleAccountSelect(account.id)}
                disabled={selectedAccount !== null}
                className={`w-full flex items-center gap-4 p-4 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-all ${
                  selectedAccount === account.id ? 'border-blue-500 bg-blue-50' : ''
                }`}
              >
                <img
                  src={account.avatar}
                  alt={account.name}
                  className="w-16 h-16 rounded-full"
                />
                <div className="flex-1 text-left">
                  <div className="font-medium text-gray-900">{account.name}</div>
                  <div className="text-sm text-gray-600">{account.email}</div>
                </div>
                {selectedAccount === account.id && (
                  <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                )}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">hoặc</span>
            </div>
          </div>

          {/* Use different account */}
          <button
            onClick={() => handleAccountSelect('1')}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
          >
            Đăng nhập bằng tài khoản khác
          </button>

          {/* Footer */}
          <div className="mt-6 text-center">
            <a href="#" className="text-xs text-blue-600 hover:underline">
              Không phải bạn?
            </a>
          </div>
        </div>
      </div>
    );
  }

  // LinkedIn OAuth UI
  if (provider === 'linkedin') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* LinkedIn Header */}
          <div className="text-center mb-8">
            <svg className="w-12 h-12 mx-auto mb-4" viewBox="0 0 48 48">
              <rect width="48" height="48" rx="4" fill="#0077B5"/>
              <path fill="white" d="M13 18h6v18h-6V18zm3-8c1.93 0 3.5 1.57 3.5 3.5S17.93 17 16 17s-3.5-1.57-3.5-3.5S14.07 10 16 10zm8 8h5.74v2.47h.08c.8-1.51 2.75-3.1 5.66-3.1 6.05 0 7.17 3.98 7.17 9.16V36h-6v-9.37c0-2.24-.04-5.12-3.12-5.12-3.13 0-3.61 2.44-3.61 4.95V36h-6V18z"/>
            </svg>
            <h1 className="text-2xl text-gray-800 mb-2">Đăng nhập</h1>
            <p className="text-sm text-gray-600">Tiếp tục tới VOLTOR Vietnam</p>
          </div>

          {/* Accounts List */}
          <div className="space-y-2">
            {accounts.map((account) => (
              <button
                key={account.id}
                onClick={() => handleAccountSelect(account.id)}
                disabled={selectedAccount !== null}
                className={`w-full flex items-center gap-3 p-3 border border-gray-300 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all ${
                  selectedAccount === account.id ? 'border-blue-600 bg-blue-50' : ''
                }`}
              >
                <img
                  src={account.avatar}
                  alt={account.name}
                  className="w-14 h-14 rounded-full"
                />
                <div className="flex-1 text-left">
                  <div className="font-medium text-gray-900">{account.name}</div>
                  <div className="text-sm text-gray-600">{account.email}</div>
                </div>
                {selectedAccount === account.id && (
                  <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                )}
              </button>
            ))}
          </div>

          {/* Sign in with email */}
          <div className="mt-6">
            <button
              onClick={() => handleAccountSelect('1')}
              className="w-full py-3 px-4 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-full transition-colors font-medium"
            >
              Đăng nhập bằng email
            </button>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-xs text-gray-600">
            <p>
              Bằng cách nhấp vào Tiếp tục, bạn đồng ý với{' '}
              <a href="#" className="text-blue-600 hover:underline">Thỏa thuận người dùng</a>,{' '}
              <a href="#" className="text-blue-600 hover:underline">Chính sách quyền riêng tư</a> và{' '}
              <a href="#" className="text-blue-600 hover:underline">Chính sách cookie</a> của LinkedIn.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
