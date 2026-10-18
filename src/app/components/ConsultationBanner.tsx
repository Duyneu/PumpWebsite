import { Phone, MessageSquare, ArrowRight, ShieldCheck, Truck, Headphones } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function ConsultationBanner() {
  const navigate = useNavigate();

  return (
    <section className="py-14 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur text-xs font-semibold uppercase tracking-wider text-blue-100">
              <Headphones className="w-3.5 h-3.5 text-cyan-300" />
              Đội Ngũ Kỹ Sư Sẵn Sàng Hỗ Trợ 24/7
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
              Cần Tư Vấn Kỹ Thuật Hoặc Báo Giá Đại Lý / Dự Án?
            </h2>
            
            <p className="text-blue-100 text-sm sm:text-base max-w-2xl leading-relaxed">
              Bạn chưa rõ nên chọn cột áp bao nhiêu mét, lưu lượng thế nào cho phù hợp giếng khoan? 
              Liên hệ ngay để được kỹ sư trưởng VOLTOR tính toán chi tiết và gửi bảng giá chiết khấu đại lý tốt nhất.
            </p>

            {/* Micro Trust Pills */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2 text-xs text-blue-100 font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-cyan-300" />
                Hàng chính hãng 100%
              </span>
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-cyan-300" />
                Giao hàng toàn quốc 24-48h
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-cyan-300" />
                Bảo hành 1 đổi 1
              </span>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
            {/* Phone button */}
            <a
              href="tel:+84898296336"
              className="flex items-center justify-center gap-3 bg-white text-blue-900 hover:bg-blue-50 font-bold px-6 py-3.5 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-center"
            >
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-[11px] text-slate-500 font-medium leading-none">Hotline Kỹ Thuật (Bấm Gọi)</div>
                <div className="text-base font-extrabold text-blue-700 leading-tight mt-0.5">(+84) 898 296 336</div>
              </div>
            </a>

            {/* Zalo Button */}
            <a
              href="https://zalo.me/0898296336"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 bg-blue-900/60 hover:bg-blue-900/80 border border-white/20 text-white font-semibold px-6 py-3.5 rounded-xl transition-all text-center"
            >
              <MessageSquare className="w-5 h-5 text-cyan-300" />
              <span>Chat Zalo Báo Giá Ngay</span>
            </a>

            {/* Contact Page */}
            <button
              onClick={() => navigate('/contact')}
              className="flex items-center justify-center gap-2 text-xs font-semibold text-blue-200 hover:text-white transition-colors py-1"
            >
              <span>Xem địa chỉ showroom & gửi form liên hệ</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
