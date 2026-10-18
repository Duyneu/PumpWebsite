import { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  Search, 
  Sparkles, 
  Phone, 
  Droplets,
  ChevronLeft,
  ChevronRight,
  Flame
} from 'lucide-react';
import * as motion from 'motion/react-client';
import { useNavigate } from 'react-router-dom';
import { getEffectiveProducts } from '../utils/productStorage';

export type Page = 'home' | 'products' | 'about' | 'contact' | 'cart';

interface HeroProps {
  onNavigate: (page: Page) => void;
}

const showcaseProducts = [
  {
    id: '4sdm',
    badge: 'TOP BÁN CHẠY NHẤT 2026',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    title: 'DONGYIN 4SDM Series',
    categoryName: 'Máy bơm hỏa tiễn giếng khoan',
    image: '/dongyin-images/sd_pump_4sdm.jpg',
    head: 'Đến 280 mét',
    flow: '24 m³/h (400 lít/phút)',
    feature: '100% Đồng • Kháng cát Inox 304',
    actionText: 'Khám phá dòng hỏa tiễn 4SDM',
    query: '4SDM',
  },
  {
    id: 'wq',
    badge: 'CÔNG TRÌNH & XÂY DỰNG #1',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    title: 'DONGYIN WQ Series',
    categoryName: 'Bơm chìm nước thải cánh cắt',
    image: '/dongyin-images/wq_pump.jpg',
    head: 'Đến 35 mét',
    flow: '50 m³/h (830 lít/phút)',
    feature: 'Cánh cắt rác gang đúc • Chuẩn IP68',
    actionText: 'Khám phá dòng bơm chìm WQ',
    query: 'chìm',
  },
  {
    id: 'cpm',
    badge: 'TƯỚI TIÊU & ÁP LỰC LỚN',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    title: 'VOLTOR CPM-158 / DNP',
    categoryName: 'Bơm ly tâm trục ngang',
    image: '/dongyin-images/cpm_cp_pump.jpg',
    head: 'Đến 60 mét',
    flow: '35 m³/h (580 lít/phút)',
    feature: 'Cánh đồng đúc • Vận hành siêu êm',
    actionText: 'Khám phá dòng bơm ly tâm',
    query: 'ly tâm',
  },
  {
    id: 'solar',
    badge: 'CÔNG NGHỆ XANH 0 ĐỒNG ĐIỆN',
    badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    title: 'DONGYIN Solar 4DP Series',
    categoryName: 'Bơm năng lượng mặt trời',
    image: '/dongyin-images/solar_4dp.jpg',
    head: 'Đến 180 mét',
    flow: '15 m³/h (250 lít/phút)',
    feature: 'Biến tần MPPT • Động cơ DC Brushless',
    actionText: 'Khám phá dòng bơm Solar',
    query: 'Solar',
  },
  {
    id: 'pzb',
    badge: 'TĂNG ÁP DÂN DỤNG THÔNG MINH',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    title: 'VOLTOR PZB-370 Auto',
    categoryName: 'Bơm tăng áp điện tử tự động',
    image: '/dongyin-images/pzb_pump.jpg',
    head: 'Đến 45 mét',
    flow: '4.5 m³/h (75 lít/phút)',
    feature: 'Rơ-le điện tử tự ngắt • Chống kẹt cánh',
    actionText: 'Khám phá dòng bơm tăng áp',
    query: 'tăng áp',
  },
];

export function Hero({ onNavigate }: HeroProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [productCount, setProductCount] = useState(() => getEffectiveProducts().length);

  useEffect(() => {
    const handleProductsChange = () => {
      setProductCount(getEffectiveProducts().length);
    };
    window.addEventListener('voltor_products_changed', handleProductsChange);
    return () => {
      window.removeEventListener('voltor_products_changed', handleProductsChange);
    };
  }, []);

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setFeaturedIndex((prev) => (prev - 1 + showcaseProducts.length) % showcaseProducts.length);
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setFeaturedIndex((prev) => (prev + 1) % showcaseProducts.length);
  };

  const currentShowcase = showcaseProducts[featuredIndex];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/products');
    }
  };

  const handleQuickTagClick = (tag: string) => {
    navigate(`/products?search=${encodeURIComponent(tag)}`);
  };

  const handleShowcaseAction = () => {
    navigate(`/products?search=${encodeURIComponent(currentShowcase.query)}`);
  };

  const quickTags = [
    { label: '🔥 Hỏa tiễn 4SDM', query: '4SDM' },
    { label: '💧 Bơm giếng sâu', query: 'Hỏa tiễn' },
    { label: '🌊 Bơm chìm nước thải', query: 'chìm' },
    { label: '⚙️ Bơm ly tâm', query: 'ly tâm' },
    { label: '☀️ Bơm Solar', query: 'Solar' },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white relative overflow-hidden border-b border-slate-800">
      {/* Background High-Tech Ambient Lights */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - Headline & Actions */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/60 border border-blue-500/30 text-xs font-semibold text-cyan-300 shadow-sm backdrop-blur-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>NHÀ PHÂN PHỐI MÁY BƠM NƯỚC VOLTOR & DONGYIN CHÍNH HÃNG</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]"
            >
              Giải Pháp Máy Bơm Nước Chuyên Nghiệp Cho{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-sky-200">
                Mọi Công Trình & Nông Nghiệp
              </span>
            </motion.h1>

            {/* Subhead */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl"
            >
              Chuyên cung cấp máy bơm hỏa tiễn giếng khoan sâu, bơm chìm nước thải công nghiệp,
              bơm ly tâm và hệ thống bơm năng lượng mặt trời. 
              <strong className="text-white font-semibold"> 100% động cơ cuộn dây đồng</strong>, 
              vận hành bền bỉ 24/7, bảo hành uy tín tận tâm.
            </motion.p>

            {/* Interactive Search Bar in Hero */}
            <motion.form
              onSubmit={handleSearchSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="relative max-w-xl"
            >
              <div className="relative flex items-center bg-slate-900/90 border border-slate-700 focus-within:border-blue-500 rounded-2xl p-1.5 shadow-xl backdrop-blur-md transition-all">
                <Search className="w-5 h-5 text-slate-400 ml-3 flex-shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm model: 4SDM, 2SDM, WQ, bơm giếng khoan..."
                  className="w-full bg-transparent px-3 py-2.5 text-sm text-white placeholder-slate-400 outline-none"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-colors shadow flex-shrink-0"
                >
                  Tìm kiếm
                </button>
              </div>

              {/* Quick Tags */}
              <div className="flex flex-wrap items-center gap-1.5 mt-3 text-xs">
                <span className="text-slate-400 font-medium mr-1">Gợi ý tìm nhanh:</span>
                {quickTags.map((tag, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleQuickTagClick(tag.query)}
                    className="bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white px-2.5 py-1 rounded-lg border border-slate-700 transition-colors"
                  >
                    {tag.label}
                  </button>
                ))}
              </div>
            </motion.form>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <button
                onClick={() => onNavigate('products')}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold px-7 py-3.5 rounded-xl transition-all transform hover:-translate-y-0.5 shadow-lg shadow-blue-500/25 inline-flex items-center gap-2"
              >
                <span>Xem tất cả {productCount} sản phẩm</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <a
                href="tel:+84898296336"
                className="bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-white font-medium px-6 py-3.5 rounded-xl transition-all transform hover:-translate-y-0.5 inline-flex items-center gap-2.5"
              >
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>Tư Vấn: 0898 296 336</span>
              </a>
            </motion.div>

          </div>

          {/* Right Column - Interactive Hero Product Carousel Showcase */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-md"
            >
              {/* Product Card Container */}
              <div className="relative bg-gradient-to-b from-slate-800/90 to-slate-900/90 rounded-3xl p-6 sm:p-7 border border-slate-700/80 shadow-2xl backdrop-blur-xl overflow-hidden group">
                
                {/* Background radial highlight */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-cyan-500/10 pointer-events-none"></div>

                {/* Top Badge & Carousel Navigation Header */}
                <div className="flex items-center justify-between mb-4 relative z-10 gap-2">
                  <span className={`${currentShowcase.badgeColor} border text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5`}>
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                    {currentShowcase.badge}
                  </span>

                  {/* Header Arrows & Counter */}
                  <div className="flex items-center gap-1.5 bg-slate-900/80 border border-slate-700 px-2 py-1 rounded-xl">
                    <button
                      onClick={handlePrev}
                      className="p-1 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                      title="Sản phẩm trước"
                      aria-label="Sản phẩm trước"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-[11px] font-bold text-cyan-400 px-1">
                      {featuredIndex + 1}/{showcaseProducts.length}
                    </span>
                    <button
                      onClick={handleNext}
                      className="p-1 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                      title="Sản phẩm kế tiếp"
                      aria-label="Sản phẩm kế tiếp"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Subtitle & Title */}
                <div className="mb-3 relative z-10">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    {currentShowcase.categoryName}
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {currentShowcase.title}
                  </h3>
                </div>

                {/* Main Pump Image with Interactive Side Arrows */}
                <div className="relative aspect-[4/3] flex items-center justify-center p-2 mb-4 bg-slate-900/40 rounded-2xl border border-slate-800/80">
                  {/* Floating Left Arrow */}
                  <button
                    onClick={handlePrev}
                    className="absolute left-2 w-9 h-9 rounded-full bg-slate-950/70 hover:bg-blue-600 text-white flex items-center justify-center border border-slate-700/80 hover:border-blue-500 shadow-lg backdrop-blur-md transition-all z-20 hover:scale-110"
                    title="Bấm để xem sản phẩm trước"
                    aria-label="Sản phẩm trước"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {/* Pump Image */}
                  <motion.img
                    key={currentShowcase.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    src={currentShowcase.image}
                    alt={currentShowcase.title}
                    className="max-h-full max-w-full object-contain drop-shadow-[0_15px_30px_rgba(0,102,255,0.35)] group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Floating Right Arrow */}
                  <button
                    onClick={handleNext}
                    className="absolute right-2 w-9 h-9 rounded-full bg-slate-950/70 hover:bg-blue-600 text-white flex items-center justify-center border border-slate-700/80 hover:border-blue-500 shadow-lg backdrop-blur-md transition-all z-20 hover:scale-110"
                    title="Bấm để xem sản phẩm tiếp theo"
                    aria-label="Sản phẩm tiếp theo"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Indicator Dots */}
                <div className="flex justify-center items-center gap-1.5 mb-4 relative z-10">
                  {showcaseProducts.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setFeaturedIndex(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === featuredIndex ? 'w-6 bg-cyan-400' : 'w-2 bg-slate-700 hover:bg-slate-600'
                      }`}
                      title={`Xem sản phẩm ${i + 1}`}
                      aria-label={`Chuyển đến sản phẩm ${i + 1}`}
                    />
                  ))}
                </div>

                {/* Technical Metric Pills */}
                <div className="space-y-2 relative z-10">
                  <div className="flex items-center justify-between bg-slate-800/80 border border-slate-700/70 px-3.5 py-2 rounded-xl text-xs">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Droplets className="w-3.5 h-3.5 text-cyan-400" /> Cột áp đẩy cao
                    </span>
                    <strong className="text-white font-bold">{currentShowcase.head}</strong>
                  </div>

                  <div className="flex items-center justify-between bg-slate-800/80 border border-slate-700/70 px-3.5 py-2 rounded-xl text-xs">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-cyan-400" /> Lưu lượng nước
                    </span>
                    <strong className="text-white font-bold">{currentShowcase.flow}</strong>
                  </div>

                  <div className="flex items-center justify-between bg-slate-800/80 border border-slate-700/70 px-3.5 py-2 rounded-xl text-xs">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Tiêu chuẩn & Động cơ
                    </span>
                    <strong className="text-emerald-400 font-bold">{currentShowcase.feature}</strong>
                  </div>
                </div>

                {/* Card Action */}
                <button
                  onClick={handleShowcaseAction}
                  className="w-full mt-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20"
                >
                  <span>{currentShowcase.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

              </div>
            </motion.div>
          </div>

        </div>

        {/* 4 Stats Ticker Bar */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center sm:text-left">
            <div className="text-2xl sm:text-3xl font-black text-cyan-400">{productCount}</div>
            <p className="text-xs sm:text-sm text-slate-300 font-medium mt-0.5">Sản phẩm đang bán</p>
          </div>
          <div className="text-center sm:text-left">
            <div className="text-2xl sm:text-3xl font-black text-cyan-400">100%</div>
            <p className="text-xs sm:text-sm text-slate-300 font-medium mt-0.5">Động cơ dây đồng nguyên chất</p>
          </div>
          <div className="text-center sm:text-left">
            <div className="text-2xl sm:text-3xl font-black text-cyan-400">24 Tháng</div>
            <p className="text-xs sm:text-sm text-slate-300 font-medium mt-0.5">Bảo hành chính hãng uy tín</p>
          </div>
          <div className="text-center sm:text-left">
            <div className="text-2xl sm:text-3xl font-black text-cyan-400">63</div>
            <p className="text-xs sm:text-sm text-slate-300 font-medium mt-0.5">Tỉnh thành giao hàng siêu tốc</p>
          </div>
        </div>

      </div>
    </div>
  );
}
