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
  Sliders
} from 'lucide-react';

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
        'Chọn đường kính bơm phù hợp ống vách (ống 90 chọn 3 inch, ống 114 chọn 4 inch)',
        'Đo chính xác mực nước tĩnh và mực nước động để tính cột áp',
        'Nên lắp tủ điện bảo vệ mất pha, chống quá tải',
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
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold tracking-wide uppercase mb-3 border border-slate-200">
            <Sliders className="w-3.5 h-3.5 text-blue-600" />
            <span>Trợ lý chọn máy bơm</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Tính Toán & Lựa Chọn Theo Nhu Cầu Thực Tế
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            Chọn mục đích sử dụng bên dưới để nhận thông số khuyến nghị và cấu hình máy bơm tối ưu nhất.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {options.map((opt) => {
            const Icon = opt.icon;
            const isActive = activeTab === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setActiveTab(opt.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-blue-600'}`} />
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Box */}
        <div className="bg-[#0b1222] text-white rounded-2xl p-6 sm:p-10 border border-slate-800 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-[11px] uppercase font-mono font-bold tracking-wider text-blue-400 bg-blue-950/70 border border-blue-800/80 px-3 py-1 rounded-md">
                  Nhu cầu: {current.label}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-3">
                  {current.tagline}
                </h3>
              </div>

              {/* Key Specs Telemetry */}
              <div className="grid grid-cols-2 gap-3 font-mono">
                <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-xl">
                  <span className="text-[11px] text-slate-400">Cột áp khuyến nghị:</span>
                  <p className="text-lg font-bold text-blue-400 mt-0.5">{current.headRange}</p>
                </div>
                <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-xl">
                  <span className="text-[11px] text-slate-400">Lưu lượng tiêu chuẩn:</span>
                  <p className="text-lg font-bold text-emerald-400 mt-0.5">{current.flowRange}</p>
                </div>
              </div>

              {/* Technical Advice List */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Khuyến cáo kỹ thuật lắp đặt:
                </p>
                {current.keyAdvice.map((adv, aIdx) => (
                  <div key={aIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>{adv}</span>
                  </div>
                ))}
              </div>

              {/* Recommended Models */}
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Dòng sản phẩm tiêu biểu:
                </p>
                <div className="flex flex-wrap gap-2">
                  {current.recommendedModels.map((m, mIdx) => (
                    <span
                      key={mIdx}
                      className="text-xs font-mono font-bold bg-slate-900 text-slate-200 border border-slate-700/70 px-2.5 py-1 rounded-md"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-2">
                <button
                  onClick={handleNavigate}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition-colors cursor-pointer text-sm"
                >
                  <span>Xem danh mục {current.recommendedCategory}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Image Showcase */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm aspect-square bg-[#070b14] rounded-xl p-6 border border-slate-800 flex items-center justify-center overflow-hidden group">
                <img
                  src={current.image}
                  alt={current.label}
                  className="max-h-full max-w-full object-contain relative z-10 transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/dongyin-images/sd_pump_4sdm.jpg';
                  }}
                />
                <div className="absolute bottom-3 left-3 right-3 bg-slate-900/95 border border-slate-800 px-3 py-1.5 rounded-lg text-center z-20">
                  <span className="text-[11px] text-slate-400">Dòng đề xuất: </span>
                  <span className="text-[11px] font-bold text-white">{current.recommendedCategory}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
