import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Droplet, 
  Sprout, 
  Building2, 
  Home, 
  Sun, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle,
  Sparkles
} from 'lucide-react';
import * as motion from 'motion/react-client';

interface UseCaseOption {
  id: string;
  icon: typeof Droplet;
  label: string;
  tagline: string;
  recommendedCategory: string;
  recommendedModels: string[];
  keyAdvice: string[];
  headRange: string;
  flowRange: string;
  image: string;
}

export function InteractivePumpFinder() {
  const navigate = useNavigate();

  const options: UseCaseOption[] = [
    {
      id: 'well',
      icon: Droplet,
      label: 'Giếng Khoan Sâu',
      tagline: 'Khai thác nước ngầm tầng sâu gia đình & nông thôn',
      recommendedCategory: 'Máy bơm hỏa tiễn',
      recommendedModels: ['DONGYIN 2SDM', 'DONGYIN 3SDM', 'DONGYIN 4SDM'],
      keyAdvice: [
        'Chọn đường kính bơm phù hợp ống vách giếng (ống 90 chọn bơm 3 inch, ống 114 chọn bơm 4 inch)',
        'Đo chính xác mực nước tĩnh và mực nước động để tính cột áp',
        'Nên dùng tủ điện bảo vệ mất pha, chống quá tải',
      ],
      headRange: '35m - 280m',
      flowRange: '1.5 - 24 m³/h',
      image: '/dongyin-images/sd_pump_4sdm.jpg',
    },
    {
      id: 'farm',
      icon: Sprout,
      label: 'Tưới Tiêu Nông Nghiệp',
      tagline: 'Tưới cà phê, sầu riêng, hoa màu, đồi dốc & béc phun',
      recommendedCategory: 'Máy bơm ly tâm',
      recommendedModels: ['VOLTOR CPM-158', 'DNP Ly Tâm Lưu Lượng', 'Bơm Trục Ngang Công Suất Lớn'],
      keyAdvice: [
        'Cần lưu lượng nước lớn để nuôi đồng thời nhiều béc tưới',
        'Nếu đẩy dốc cao nên chọn dòng hỏa tiễn lưu lượng lớn',
        'Động cơ dây đồng 100% giúp chạy bền bỉ suốt mùa khô hạn',
      ],
      headRange: '18m - 65m',
      flowRange: '6.0 - 45 m³/h',
      image: '/dongyin-images/cpm_cp_pump.jpg',
    },
    {
      id: 'drainage',
      icon: Building2,
      label: 'Thoát Nước Thải & Hố Móng',
      tagline: 'Xử lý nước bẩn, nước bùn, công trình xây dựng & nhà xưởng',
      recommendedCategory: 'Máy bơm điện chìm',
      recommendedModels: ['DONGYIN WQ Cánh Cắt', 'DONGYIN WS Thân Inox', 'Bơm Chìm Hút Đáy QS'],
      keyAdvice: [
        'Nếu nước có rác thải, bao bì: chọn dòng có dao cắt rác tự động',
        'Vỏ gang đúc hoặc Inox chịu mài mòn hóa chất và bùn cát',
        'Có sẵn phao tự ngắt chống cháy khi cạn nước',
      ],
      headRange: '8m - 32m',
      flowRange: '10 - 55 m³/h',
      image: '/dongyin-images/wq_pump.jpg',
    },
    {
      id: 'household',
      icon: Home,
      label: 'Tăng Áp Dân Dụng',
      tagline: 'Khắc phục nước yếu cho vòi sen, máy giặt, nhà cao tầng',
      recommendedCategory: 'Máy bơm tăng áp',
      recommendedModels: ['VOLTOR PZB-370 Auto', 'Bơm Tăng Áp Điện Tử', 'Bơm Chân Không Gia Đình'],
      keyAdvice: [
        'Rơ-le điện tử tự động đóng ngắt cực êm, không gây tiếng tạch tạch',
        'Kích thước nhỏ gọn, dễ lắp đặt dưới gầm cầu thang hoặc ban công',
        'Tiết kiệm điện năng tối đa, chịu nhiệt nước nóng tốt',
      ],
      headRange: '15m - 45m',
      flowRange: '1.8 - 4.5 m³/h',
      image: '/dongyin-images/pzb_pump.jpg',
    },
    {
      id: 'solar',
      icon: Sun,
      label: 'Bơm Năng Lượng Mặt Trời',
      tagline: 'Trang trại xa lưới điện, vùng cao, tiết kiệm 100% điện',
      recommendedCategory: 'Máy bơm hỏa tiễn',
      recommendedModels: ['DONGYIN Solar 4DP', 'Hệ Thống Bơm DC Brushless'],
      keyAdvice: [
        'Hoạt động trực tiếp từ dàn pin quang điện không cần ắc quy',
        'Biến tần thông minh điều chỉnh tần số theo cường độ nắng',
        'Hoàn vốn nhanh chóng chỉ sau 1-2 năm sử dụng',
      ],
      headRange: '30m - 180m',
      flowRange: '2.0 - 15 m³/h',
      image: '/dongyin-images/solar_4dp.jpg',
    },
  ];

  const [activeTab, setActiveTab] = useState<string>(options[0].id);
  const current = options.find((o) => o.id === activeTab) || options[0];

  const handleNavigate = () => {
    navigate(`/products?category=${encodeURIComponent(current.recommendedCategory)}`);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold tracking-wide uppercase mb-3 border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Trợ Lý Chọn Bơm Thông Minh
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Tìm Máy Bơm Nước Chuẩn Xác Theo Nhu Cầu
          </h2>
          <p className="mt-3 text-slate-600 text-base">
            Chọn mục đích sử dụng bên dưới để xem ngay thông số kỹ thuật khuyến nghị và các model bơm tương thích nhất.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-8">
          {options.map((opt) => {
            const Icon = opt.icon;
            const isActive = activeTab === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setActiveTab(opt.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-[1.02]'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-blue-600'}`} />
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Box */}
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-800"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-cyan-400 bg-cyan-950/70 border border-cyan-800/80 px-3 py-1 rounded-full">
                  Nhu cầu: {current.label}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mt-3">
                  {current.tagline}
                </h3>
              </div>

              {/* Key Specs Pills */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-xl">
                  <span className="text-xs text-slate-400">Cột áp khuyến nghị</span>
                  <p className="text-xl font-bold text-cyan-300 mt-0.5">{current.headRange}</p>
                </div>
                <div className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-xl">
                  <span className="text-xs text-slate-400">Lưu lượng tiêu chuẩn</span>
                  <p className="text-xl font-bold text-cyan-300 mt-0.5">{current.flowRange}</p>
                </div>
              </div>

              {/* Advice List */}
              <div className="space-y-2.5">
                <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Lưu ý kỹ thuật quan trọng:
                </p>
                {current.keyAdvice.map((adv, aIdx) => (
                  <div key={aIdx} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{adv}</span>
                  </div>
                ))}
              </div>

              {/* Recommended Models */}
              <div>
                <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Dòng sản phẩm tiêu biểu:
                </p>
                <div className="flex flex-wrap gap-2">
                  {current.recommendedModels.map((m, mIdx) => (
                    <span
                      key={mIdx}
                      className="text-xs font-bold bg-blue-600/30 text-blue-300 border border-blue-500/40 px-3 py-1 rounded-lg"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* Button */}
              <div className="pt-2">
                <button
                  onClick={handleNavigate}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-blue-500/20 hover:scale-[1.02]"
                >
                  <span>Xem các mẫu {current.recommendedCategory}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Image Showcase */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm aspect-square bg-slate-800/60 rounded-2xl p-6 border border-slate-700/60 flex items-center justify-center overflow-hidden group">
                <div className="absolute inset-0 bg-radial from-blue-500/10 to-transparent"></div>
                <img
                  src={current.image}
                  alt={current.label}
                  className="max-h-full max-w-full object-contain relative z-10 drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/dongyin-images/sd_pump_4sdm.jpg';
                  }}
                />
                <div className="absolute bottom-3 left-3 right-3 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 px-3 py-2 rounded-xl text-center z-20">
                  <span className="text-xs text-slate-400">Dòng khuyến nghị: </span>
                  <span className="text-xs font-bold text-white">{current.recommendedCategory}</span>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
