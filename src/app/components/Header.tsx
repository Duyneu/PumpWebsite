import { ShoppingCart, Phone, Menu, X } from 'lucide-react';
export type Page = 'home' | 'products' | 'about' | 'contact' | 'cart';
import { useState } from 'react';
import logo from 'figma:asset/f7441d1239749f768a4a91d19e063fed0d3c3bf0.png';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  cartItemCount: number;
}

export function Header({ currentPage, onNavigate, cartItemCount }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
              <div className="text-blue-900 font-bold">VOLTOR Việt Nam</div>
              <div className="text-xs text-gray-500">Chuyên nghiệp - Uy tín</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className={`transition-colors font-medium ${
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
            <a href="tel:+84836389488" className="hidden sm:flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
              <Phone className="w-5 h-5 text-blue-600" />
              <span className="font-medium">(+84) 836 389 488</span>
            </a>
            
            <button
              onClick={() => onNavigate('cart')}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Giỏ hàng"
            >
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
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
                className={`block w-full text-left px-4 py-2 rounded-lg transition-colors font-medium ${
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
              <Phone className="w-5 h-5 text-blue-600" />
              <span>(+84) 836 389 488</span>
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}