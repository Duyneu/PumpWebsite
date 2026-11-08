import { useNavigate } from 'react-router-dom';
import { ArrowRight, Droplets, ShieldCheck, Zap, SunMedium, CheckCircle2 } from 'lucide-react';

export function CategoryShowcase() {
  const navigate = useNavigate();

  const handleSelectCategory = (catName: string) => {
    navigate(`/products?category=${encodeURIComponent(catName)}`);
  };

  return (
    <section className="py-16 md:py-20 bg-slate-50 border-t border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-slate-200 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold tracking-wide uppercase mb-3">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <span>Tiêu chuẩn công nghiệp & dân dụng</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Danh Mục Sản Phẩm Trọng Tâm
            </h2>
          </div>
          <button
            onClick={() => navigate('/products')}
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
          >
            <span>Xem tất cả danh mục máy bơm</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* High-Craft Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Bento Flagship: Bơm Hỏa Tiễn 4SDM (Spans 7 cols on desktop) */}
          <div
            onClick={() => handleSelectCategory('Máy bơm hỏa tiễn')}
            className="md:col-span-7 bg-white rounded-2xl border border-slate-200 hover:border-blue-400 p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-lg transition-transform duration-200 hover:-translate-y-1 cursor-pointer group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="bg-blue-600 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Dòng Flagship Bán Chạy #1
                </span>
                <span className="text-xs font-mono text-slate-500">Giếng khoan 3" - 4"</span>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 items-center">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight">
                    Bơm Hỏa Tiễn Giếng Khoan
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1 mb-3">
                    DONGYIN & VOLTOR Series
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    Chuyên dụng khai thác nước ngầm tầng sâu, tưới tiêu trang trại đồi dốc và hệ thống cấp nước sinh hoạt áp lực lớn.
                  </p>

                  <div className="space-y-2 text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Cột áp đẩy cao: <strong>40m - 280 mét</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Thân & cánh Inox 304 kháng cát tối ưu</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Động cơ 100% dây đồng chịu nhiệt 200°C</span>
                    </div>
                  </div>
                </div>

                <div className="relative aspect-square sm:aspect-auto sm:h-64 bg-slate-50 rounded-xl p-4 flex items-center justify-center border border-slate-100">
                  <img
                    src="/dongyin-images/sd_pump_4sdm.jpg"
                    alt="Máy bơm hỏa tiễn DONGYIN 4SDM"
                    className="max-h-56 max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
              <span>Khám phá toàn bộ model 4SDM / 2SDM</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>

          {/* Bento Card 2: Bơm Chìm Nước Thải WQ (Spans 5 cols) */}
          <div
            onClick={() => handleSelectCategory('Máy bơm điện chìm')}
            className="md:col-span-5 bg-white rounded-2xl border border-slate-200 hover:border-blue-400 p-6 flex flex-col justify-between shadow-xs hover:shadow-lg transition-transform duration-200 hover:-translate-y-1 cursor-pointer group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="bg-slate-900 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Công Trình Nặng
                </span>
                <ShieldCheck className="w-4 h-4 text-blue-600" />
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="w-24 h-24 bg-slate-50 rounded-xl p-2 shrink-0 border border-slate-100 flex items-center justify-center">
                  <img
                    src="/dongyin-images/wq_pump.jpg"
                    alt="Bơm chìm nước thải WQ"
                    className="max-h-20 max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight">
                    Bơm Chìm Nước Thải & Hố Móng
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">Dòng WQ & QDX chuyên dụng</p>
                </div>
              </div>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                Xử lý nước bẩn, nước bùn cát, thoát nước tầng hầm nhà xưởng và ao nuôi thủy sản. Cánh cắt rác gang đúc siêu bền, chuẩn kháng nước IP68.
              </p>

              <div className="space-y-1.5 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Lưu lượng thoát: Đến <strong>50 m³/h</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Phốt cơ khí kép Italy chống rò rỉ dầu</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
              <span>Xem các model bơm chìm WQ</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>

          {/* Bento Card 3: Bơm Ly Tâm & Tăng Áp Trục Ngang (Spans 6 cols) */}
          <div
            onClick={() => handleSelectCategory('Máy bơm ly tâm')}
            className="md:col-span-6 bg-white rounded-2xl border border-slate-200 hover:border-blue-400 p-6 flex flex-col justify-between shadow-xs hover:shadow-lg transition-transform duration-200 hover:-translate-y-1 cursor-pointer group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="bg-emerald-700 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Nông Nghiệp & Áp Lực Lớn
                </span>
                <Zap className="w-4 h-4 text-emerald-600" />
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="w-28 h-28 bg-slate-50 rounded-xl p-2 shrink-0 border border-slate-100 flex items-center justify-center">
                  <img
                    src="/dongyin-images/cpm_cp_pump.jpg"
                    alt="Bơm ly tâm trục ngang CPM"
                    className="max-h-24 max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight">
                    Bơm Ly Tâm & Tưới Tiêu
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">VOLTOR CPM-158 & DNP</p>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                    Lưu lượng nước lớn, cấp nước nhanh chóng cho nhà cao tầng, hệ thống tưới béc sầu riêng, cà phê.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100 font-mono">
                <div>Lưu lượng: <strong>35 m³/h</strong></div>
                <div>Cánh bơm: <strong>Đồng đúc</strong></div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
              <span>Xem danh mục bơm ly tâm</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>

          {/* Bento Card 4: Bơm Năng Lượng Mặt Trời (Spans 6 cols) */}
          <div
            onClick={() => handleSelectCategory('Máy bơm hỏa tiễn')}
            className="md:col-span-6 bg-white rounded-2xl border border-slate-200 hover:border-blue-400 p-6 flex flex-col justify-between shadow-xs hover:shadow-lg transition-transform duration-200 hover:-translate-y-1 cursor-pointer group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="bg-amber-600 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Công Nghệ Xanh • 0 Đồng Điện
                </span>
                <SunMedium className="w-4 h-4 text-amber-500" />
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="w-28 h-28 bg-slate-50 rounded-xl p-2 shrink-0 border border-slate-100 flex items-center justify-center">
                  <img
                    src="/dongyin-images/solar_4dp.jpg"
                    alt="Bơm năng lượng mặt trời Solar 4DP"
                    className="max-h-24 max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight">
                    Bơm Năng Lượng Mặt Trời (Solar)
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">Dòng DONGYIN Solar 4DP</p>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                    Vận hành độc lập bằng quang năng, tích hợp bộ biến tần MPPT hiệu suất cao 98%, động cơ DC không chổi than.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100 font-mono">
                <div>Cột áp: <strong>Đến 180m</strong></div>
                <div>Chi phí điện: <strong>0 VNĐ</strong></div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
              <span>Xem giải pháp bơm Solar DONGYIN</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
