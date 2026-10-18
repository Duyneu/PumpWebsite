import { ShoppingCart, Phone, Menu, X, Search, ShieldCheck, Truck, MessageSquare } from 'lucide-react';
export type Page = 'home' | 'products' | 'about' | 'contact' | 'cart';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from 'figma:asset/f7441d1239749f768a4a91d19e063fed0d3c3bf0.png';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  cartItemCount: number;
}

export function Header({ currentPage, onNavigate, cartItemCount }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const navItems = [
    { page: 'home' as Page, label: 'Trang chủ' },
    { page: 'about' as Page, label: 'Giới thiệu' },
    { page: 'products' as Page, label: 'Sản phẩm' },
    { page: 'contact' as Page, label: 'Liên hệ' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-slate-100">
      
      {/* Top Utility Announcement Bar */}
      <div className="bg-slate-950 text-slate-300 text-[12px] py-1.5 px-4 border-b border-slate-800 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              VOLTOR
            </span>
            <span className="text-slate-400">|</span>
            <span className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-slate-400" />
              Giao hàng toàn quốc 24-48h
            </span>
            <span className="text-slate-400">|</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
              100% Động cơ cuộn dây đồng
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://zalo.me/0898296336"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors flex items-center gap-1"
            >
              <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
              <span>Zalo Tư Vấn</span>
            </a>
            <span className="text-slate-600">|</span>
            <a href="tel:+84898296336" className="font-bold text-white hover:text-cyan-300 transition-colors flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>Hotline: (+84) 898 296 336</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3.5 gap-4">
          
          {/* Logo & Brand */}
          <div 
            className="flex items-center gap-3 cursor-pointer flex-shrink-0 group"
            onClick={() => onNavigate('home')}
          >
            <img src={logo} alt="Voltor Logo" className="h-11 w-auto transition-transform group-hover:scale-105" />
            <div>
              <div className="text-blue-900 font-black text-lg tracking-tight leading-none">
                VOLTOR <span className="text-cyan-600 font-bold">Việt Nam</span>
              </div>
              <div className="text-[11px] text-slate-500 font-medium tracking-wide mt-0.5">
                Chuyên Nghiệp • Uy Tín • Bền Bỉ
              </div>
            </div>
          </div>

          {/* Desktop Search Bar */}
          <form 
            onSubmit={handleSearchSubmit}
            className="hidden lg:flex items-center flex-1 max-w-xs xl:max-w-sm mx-4 relative"
          >
            <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm máy bơm, model, mã SKU..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-100 hover:bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl outline-none transition-all"
            />
          </form>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className={`transition-all font-semibold text-sm relative py-1 ${
                  currentPage === item.page
                    ? 'text-blue-600'
                    : 'text-slate-700 hover:text-blue-600'
                }`}
              >
                {item.label}
                {currentPage === item.page && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"></span>
                )}
              </button>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Call button */}
            <a 
              href="tel:+84898296336" 
              className="hidden sm:inline-flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs px-3.5 py-2 rounded-xl transition-colors border border-blue-200/80"
            >
              <Phone className="w-4 h-4 text-blue-600" />
              <span>0898.296.336</span>
            </a>
            
            {/* Cart Icon with Counter */}
            <button
              onClick={() => onNavigate('cart')}
              className="relative p-2.5 hover:bg-slate-100 rounded-xl transition-colors"
              title="Giỏ hàng"
            >
              <ShoppingCart className="w-5 h-5 text-slate-700" />
              {cartItemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-600 text-white text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md animate-bounce">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-slate-100 rounded-xl transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-slate-700" />
              ) : (
                <Menu className="w-6 h-6 text-slate-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-slate-100 py-4 space-y-3">
            {/* Mobile search */}
            <form onSubmit={handleSearchSubmit} className="relative px-2">
              <Search className="w-4 h-4 text-slate-400 absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm mã bơm: 4SDM, WQ, CPM..."
                className="w-full pl-9 pr-3 py-2 text-sm bg-slate-100 border border-slate-200 rounded-xl outline-none"
              />
            </form>

            {/* Mobile nav items */}
            <div className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => {
                    onNavigate(item.page);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2.5 rounded-xl transition-colors font-semibold text-sm ${
                    currentPage === item.page
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile hotline call */}
            <div className="pt-2 px-2">
              <a 
                href="tel:+84898296336" 
                className="flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-2.5 rounded-xl text-sm shadow-sm"
              >
                <Phone className="w-4 h-4" />
                <span>Gọi Hotline Kỹ Thuật: 0898.296.336</span>
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}