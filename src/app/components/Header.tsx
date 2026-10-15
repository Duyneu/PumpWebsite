import { ShoppingCart, Phone, Menu, X, User, LogIn, LogOut, Settings } from 'lucide-react';
export type Page = 'home' | 'products' | 'about' | 'contact' | 'cart';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import logo from 'figma:asset/f7441d1239749f768a4a91d19e063fed0d3c3bf0.png';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  cartItemCount: number;
  isLoggedIn?: boolean;
  onLogout?: () => void;
  onShowLogin?: () => void;
}

export function Header({ currentPage, onNavigate, cartItemCount, isLoggedIn, onLogout, onShowLogin }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Get display name
  const displayName = user?.displayName || user?.name || user?.email?.split('@')[0] || 'User';

  const navItems = [
    { page: 'home' as Page, label: 'Trang chủ' },
    { page: 'about' as Page, label: 'Giới thiệu' },
    { page: 'products' as Page, label: 'Sản phẩm' },
    { page: 'contact' as Page, label: 'Liên hệ' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <img src={logo} alt="Voltor Logo" className="h-12 w-auto" />
            <div>
              <div className="text-blue-900">VOLTOR Việt Nam</div>
              <div className="text-xs text-gray-500">Chuyên nghiệp - Uy tín</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className={`transition-colors ${
                  currentPage === item.page
                    ? 'text-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a href="tel:+84898296336" className="hidden sm:flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
              <Phone className="w-5 h-5" />
              <span>(+84) 898 296 336</span>
            </a>
            
            <button
              onClick={() => onNavigate('cart')}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

            {/* User menu button */}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <User className="w-6 h-6 text-gray-700" />
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 top-12 bg-white shadow-lg rounded-lg py-2 min-w-[160px] border border-gray-200 z-50">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm text-gray-500">Tài khoản</p>
                      <p className="text-sm">{displayName}</p>
                      {user?.role === 'admin' && (
                        <p className="text-xs text-blue-600 font-medium mt-1">👑 Admin</p>
                      )}
                    </div>
                    {user?.role === 'admin' && (
                      <button
                        onClick={() => {
                          navigate('/admin');
                          setShowUserMenu(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Admin Dashboard</span>
                      </button>
                    )}
                    <button
                      onClick={() => {
                        navigate('/profile');
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      <span>Thông tin tài khoản</span>
                    </button>
                    <button
                      onClick={() => {
                        if (onLogout) onLogout();
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onShowLogin}
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <LogIn className="w-4 h-4" />
                <span>Đăng nhập</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => {
                  onNavigate(item.page);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  currentPage === item.page
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <a 
              href="tel:+84836389488" 
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg sm:hidden"
            >
              <Phone className="w-5 h-5" />
              <span>(+84) 836 389 488</span>
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}