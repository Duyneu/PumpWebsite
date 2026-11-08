import { useState } from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Search, 
  Phone, 
  Gauge, 
  Activity, 
  Sliders, 
  ChevronRight,
  CheckCircle2,
  Wrench
} from 'lucide-react';
import * as motion from 'motion/react-client';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';

export type Page = 'home' | 'products' | 'about' | 'contact' | 'cart';

interface HeroProps {
  onNavigate: (page: Page) => void;
}

interface ShowcaseProduct {
  id: string;
  tabLabel: string;
  tag: string;
  title: string;
  categoryName: string;
  image: string;
  maxHead: number;
  maxFlow: number;
  powerKw: number;
  powerHp: number;
  voltage: string;
  material: string;
  protection: string;
  query: string;
}

const showcaseProducts: ShowcaseProduct[] = [
  {
    id: '4sdm',
    tabLabel: '4SDM Hỏa tiễn',
    tag: 'Giếng khoan sâu 4 inch',
    title: 'DONGYIN 4SDM Series',
    categoryName: 'Máy bơm hỏa tiễn giếng khoan',
    image: '/dongyin-images/sd_pump_4sdm.jpg',
    maxHead: 240,
    maxFlow: 24,
    powerKw: 3.7,
    powerHp: 5.0,
    voltage: '220V / 380V',
    material: 'Inox SUS304 kháng cát',
    protection: 'IP68 • Dây đồng 100%',
    query: '4SDM',
  },
  {
    id: 'wq',
    tabLabel: 'WQ Bơm chìm',
    tag: 'Nước thải & Công trình',
    title: 'DONGYIN WQ Series',
    categoryName: 'Bơm chìm nước thải cánh cắt',
    image: '/dongyin-images/wq_pump.jpg',
    maxHead: 35,
    maxFlow: 50,
    powerKw: 4.0,
    powerHp: 5.5,
    voltage: '380V / 3 Pha',
    material: 'Gang đúc + Dao cắt rác hợp kim',
    protection: 'IP68 • Phốt cơ khí kép',
    query: 'chìm',
  },
  {
    id: 'cpm',
    tabLabel: 'CPM Ly tâm',
    tag: 'Lưu lượng lớn & Tưới tiêu',
    title: 'VOLTOR CPM-158 / DNP',
    categoryName: 'Bơm ly tâm trục ngang',
    image: '/dongyin-images/cpm_cp_pump.jpg',
    maxHead: 58,
    maxFlow: 36,
    powerKw: 2.2,
    powerHp: 3.0,
    voltage: '220V • 50Hz',
    material: 'Đầu gang • Cánh đồng đúc',
    protection: 'IP55 • Tự làm mát',
    query: 'ly tâm',
  },
  {
    id: 'solar',
    tabLabel: 'Solar 4DP',
    tag: 'Năng lượng mặt trời 0 đồng điện',
    title: 'DONGYIN Solar 4DP Series',
    categoryName: 'Bơm năng lượng mặt trời',
    image: '/dongyin-images/solar_4dp.jpg',
    maxHead: 180,
    maxFlow: 15,
    powerKw: 2.2,
    powerHp: 3.0,
    voltage: 'DC 72V - 150V MPPT',
    material: 'Inox SUS304 toàn thân',
    protection: 'Động cơ DC không chổi than',
    query: 'Solar',
  },
  {
    id: 'pzb',
    tabLabel: 'PZB Tăng áp',
    tag: 'Gia đình & Nhà cao tầng',
    title: 'VOLTOR PZB-370 Auto',
    categoryName: 'Bơm tăng áp điện tử tự động',
    image: '/dongyin-images/pzb_pump.jpg',
    maxHead: 42,
    maxFlow: 4.5,
    powerKw: 0.37,
    powerHp: 0.5,
    voltage: '220V • Cực êm',
    material: 'Rơ-le điện tử thông minh',
    protection: 'Chống kẹt cánh • Chống cạn',
    query: 'tăng áp',
  },
];

const quickQueries = [
  { label: 'Hỏa tiễn 4SDM', query: '4SDM' },
  { label: 'Bơm chìm WQ', query: 'chìm' },
  { label: 'Ly tâm lưu lượng', query: 'ly tâm' },
  { label: 'Bơm tăng áp', query: 'tăng áp' },
  { label: 'Bơm Solar', query: 'Solar' },
];

export function Hero({ onNavigate }: HeroProps) {
  const navigate = useNavigate();
  const products = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [simulatedDepth, setSimulatedDepth] = useState<number>(80);

  const productCount = products.length;
  const current = showcaseProducts[activeTab];

  // Dynamic telemetry calculations based on depth slider
  const headRatio = Math.min(1, Math.max(0.1, simulatedDepth / current.maxHead));
  const estimatedFlow = Math.max(1.2, Number((current.maxFlow * (1 - headRatio * 0.75)).toFixed(1)));
  const estimatedPressureBar = Number((simulatedDepth * 0.098).toFixed(1));
  const motorLoadPercent = Math.min(100, Math.round(30 + headRatio * 65));

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/products');
    }
  };

  const handleQuickTagClick = (tagQuery: string) => {
    navigate(`/products?search=${encodeURIComponent(tagQuery)}`);
  };

  const handleInspectModel = () => {
    navigate(`/products?search=${encodeURIComponent(current.query)}`);
  };

  return (
    <section className="bg-[#0b1222] text-white relative border-b border-slate-800/80">
      {/* Precision Industrial Architectural Grid */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Authoritative Editorial Brand & Discovery */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Technical Verification Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-semibold text-slate-200">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span>VOLTOR & DONGYIN • TỔNG KHO MÁY BƠM NƯỚC VIỆT NAM</span>
            </div>

            {/* Main Headline - Bold, Unpretentious, High-Hierarchy */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
              Giải Pháp Máy Bơm Nước Công Nghiệp & Giếng Khoan Sâu
            </h1>

            {/* Subhead - Fact-Driven */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              Phân phối máy bơm hỏa tiễn giếng khoan sâu, bơm chìm nước thải công nghiệp và hệ thống tăng áp tự động. Động cơ cuộn dây đồng 100%, bảo hành chính hãng 24 tháng, hỗ trợ kỹ thuật tận nơi.
            </p>

            {/* High-Contrast Fast Search */}
            <form onSubmit={handleSearchSubmit} role="search" className="space-y-3 pt-1 max-w-xl">
              <div className="flex items-center bg-slate-900 border border-slate-700/90 focus-within:border-blue-500 rounded-xl p-1.5 transition-colors">
                <Search className="w-4 h-4 text-slate-400 ml-3 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tra cứu model: 4SDM, WQ, PZB, giếng khoan..."
                  aria-label="Tra cứu model máy bơm"
                  className="w-full bg-transparent px-3 py-2 text-sm text-white placeholder-slate-400 outline-hidden"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-lg transition-colors shrink-0 cursor-pointer"
                >
                  Tìm kiếm
                </button>
              </div>

              {/* Clean Quick Query Chips */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                <span className="text-slate-400 text-[11px]">Dòng bơm phổ biến:</span>
                {quickQueries.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleQuickTagClick(item.query)}
                    className="bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white px-2.5 py-1 rounded-md border border-slate-700/60 transition-colors cursor-pointer text-[11px]"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </form>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => onNavigate('products')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition-transform hover:-translate-y-0.5 inline-flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Xem kho {productCount} sản phẩm</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="tel:+84898296336"
                className="bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-semibold px-5 py-3 rounded-xl transition-colors inline-flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-blue-400" />
                <span>Hotline: 0898 296 336</span>
              </a>
            </div>

            {/* Trust Markers */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800/80 text-xs text-slate-300 max-w-xl">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Dây đồng</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Bảo hành 24T</span>
              </div>
              <div className="flex items-center gap-2">
                <Wrench className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Sẵn linh kiện</span>
              </div>
            </div>

          </div>

          {/* Right Column: Stageshow Interactive Technical Console */}
          <div className="lg:col-span-6">
            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-md">
              
              {/* Console Top Bar */}
              <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase">
                    Bảng Điều Khiển Kỹ Thuật • Stageshow
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2.5 py-0.5 rounded border border-slate-800">
                  {current.voltage}
                </span>
              </div>

              {/* Product Class Selector Tabs */}
              <div className="grid grid-cols-5 p-1.5 bg-slate-950/80 border-b border-slate-800 gap-1 text-[11px] font-medium">
                {showcaseProducts.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setActiveTab(idx);
                      setSimulatedDepth(Math.round(p.maxHead * 0.45));
                    }}
                    className={`py-1.5 px-2 rounded-lg transition-colors text-center truncate cursor-pointer ${
                      activeTab === idx
                        ? 'bg-blue-600 text-white font-bold'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    }`}
                  >
                    {p.tabLabel}
                  </button>
                ))}
              </div>

              {/* Stage Viewport */}
              <div className="p-5 space-y-4">
                
                {/* Product Metadata & Tag */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-mono text-blue-400 font-semibold tracking-wide uppercase">
                      {current.tag}
                    </span>
                    <h3 className="text-lg font-bold text-white tracking-tight mt-0.5">
                      {current.title}
                    </h3>
                  </div>
                  <button
                    onClick={handleInspectModel}
                    className="text-xs font-bold text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 cursor-pointer shrink-0 py-1"
                  >
                    <span>Chi tiết</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Product Visual Container with Inset Specs */}
                <div className="relative bg-[#070b14] rounded-xl border border-slate-800/80 p-4 min-h-[210px] flex items-center justify-center overflow-hidden">
                  <img
                    key={current.id}
                    src={current.image}
                    alt={current.title}
                    className="max-h-[175px] max-w-full object-contain transition-transform duration-300 hover:scale-105"
                  />

                  {/* Mechanical Overlay Chips */}
                  <div className="absolute top-2.5 left-2.5 text-[10px] font-mono bg-slate-900/90 border border-slate-800 text-slate-300 px-2 py-0.5 rounded shadow-xs">
                    {current.material}
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 text-[10px] font-mono bg-slate-900/90 border border-slate-800 text-emerald-400 px-2 py-0.5 rounded shadow-xs">
                    {current.protection}
                  </div>
                </div>

                {/* Live Duty Point Inspector (Slider) */}
                <div className="bg-slate-950/90 rounded-xl p-3.5 border border-slate-800 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 text-blue-400" />
                      <span>Mô phỏng cột áp / Độ sâu giếng:</span>
                    </span>
                    <span className="font-mono font-bold text-blue-400 text-sm tabular-nums">
                      {simulatedDepth} mét
                    </span>
                  </div>

                  <input
                    type="range"
                    min={10}
                    max={current.maxHead}
                    value={simulatedDepth}
                    onChange={(e) => setSimulatedDepth(Number(e.target.value))}
                    aria-label="Điều chỉnh độ sâu giếng mô phỏng"
                    className="w-full accent-blue-500 bg-slate-800 rounded-lg h-1.5 cursor-pointer"
                  />

                  {/* Telemetry Output Grid */}
                  <div className="grid grid-cols-3 gap-2 pt-1 text-center font-mono">
                    <div className="bg-slate-900 p-2 rounded-md border border-slate-800/80">
                      <div className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                        <Gauge className="w-3 h-3 text-cyan-400" />
                        <span>Lưu lượng ước tính</span>
                      </div>
                      <div className="text-xs font-bold text-white mt-0.5 tabular-nums">
                        {estimatedFlow} m³/h
                      </div>
                    </div>

                    <div className="bg-slate-900 p-2 rounded-md border border-slate-800/80">
                      <div className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                        <Activity className="w-3 h-3 text-amber-400" />
                        <span>Áp suất tương đương</span>
                      </div>
                      <div className="text-xs font-bold text-white mt-0.5 tabular-nums">
                        ~{estimatedPressureBar} bar
                      </div>
                    </div>

                    <div className="bg-slate-900 p-2 rounded-md border border-slate-800/80">
                      <div className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-400" />
                        <span>Tải động cơ</span>
                      </div>
                      <div className="text-xs font-bold text-emerald-400 mt-0.5 tabular-nums">
                        {motorLoadPercent}% an toàn
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick CTA inside console */}
                <div className="flex gap-2">
                  <button
                    onClick={handleInspectModel}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors cursor-pointer text-center"
                  >
                    Xem tất cả model {current.title}
                  </button>
                  <a
                    href="https://zalo.me/0898296336"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold py-2.5 px-4 rounded-xl text-xs transition-colors text-center border border-slate-700"
                  >
                    Tư vấn Zalo
                  </a>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
