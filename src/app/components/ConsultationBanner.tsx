import { Phone, MessageSquare, ShieldCheck, Truck, Headphones, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function ConsultationBanner() {
  const navigate = useNavigate();

  return (
    <section className="py-14 bg-blue-700 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-800/80 text-xs font-semibold uppercase tracking-wider text-blue-100 border border-blue-500/40">
              <Headphones className="w-3.5 h-3.5 text-blue-200" />
              <span>Đội ngũ kỹ thuật hỗ trợ trực tiếp</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
              Tư Vấn Kỹ Thuật & Báo Giá Đại Lý / Dự Án
            </h2>
            
            <p className="text-blue-100 text-sm sm:text-base max-w-2xl leading-relaxed">
              Bạn cần tính toán cột áp, lưu lượng thực tế cho giếng khoan sâu hoặc công trình xử lý nước? Liên hệ ngay để nhận hỗ trợ kỹ thuật và chính sách chiết khấu tốt nhất.
            </p>

            {/* Micro Trust Pills */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2 text-xs text-blue-100 font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                Chính hãng 100%
              </span>
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-cyan-200" />
                Giao hàng toàn quốc 24-48h
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                Bảo hành 24 tháng
              </span>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
            {/* Phone button */}
            <a
              href="tel:+84898296336"
              className="flex items-center justify-center gap-3 bg-white text-slate-900 hover:bg-slate-100 font-bold px-6 py-3.5 rounded-xl transition-colors shadow-sm text-center"
            >
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-[11px] text-slate-500 font-medium leading-none">Hotline Kỹ Thuật (Bấm Gọi)</div>
                <div className="text-base font-extrabold text-blue-700 leading-tight mt-0.5">(+84) 898 296 336</div>
              </div>
            </a>

            {/* Zalo button */}
            <a
              href="https://zalo.me/0898296336"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 bg-blue-900/80 hover:bg-blue-900 text-white font-bold px-6 py-3 rounded-xl transition-colors border border-blue-500/50 text-sm text-center"
            >
              <MessageSquare className="w-4 h-4 text-cyan-300" />
              <span>Nhắn Zalo Nhận Báo Giá</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
