import { Cpu, ShieldCheck, Flame, Wrench, RefreshCw, Award } from 'lucide-react';

export function TechFeatures() {
  const features = [
    {
      icon: Flame,
      title: 'Động Cơ 100% Cuộn Dây Đồng',
      description: 'Dây đồng nguyên chất chịu nhiệt lên tới 200°C, cho phép máy vận hành liên tục nhiều giờ mà không lo quá nhiệt, cháy động cơ.',
    },
    {
      icon: ShieldCheck,
      title: 'Thân & Trục Inox 304 Chống Gỉ',
      description: 'Trục động cơ và vỏ thân bơm chế tạo từ thép không gỉ SUS304 nguyên khối, kháng phèn, kháng mặn và chống ăn mòn hóa chất cực tốt.',
    },
    {
      icon: Cpu,
      title: 'Phốt Cơ Khí Kép Chuyên Dụng',
      description: 'Sử dụng phốt cơ khí carbon-silicon kép nhập khẩu Italy, ngăn chặn tuyệt đối nước xâm nhập vào khoang dầu và cuộn dây.',
    },
    {
      icon: Award,
      title: 'Tiêu Chuẩn Kháng Nước IP68',
      description: 'Chứng nhận chống nước và chống bụi xâm nhập cấp cao nhất thế giới, an toàn vận hành ở độ sâu hàng trăm mét dưới lòng đất.',
    },
    {
      icon: RefreshCw,
      title: 'Chính Sách Bảo Hành 1 Đổi 1',
      description: 'Cam kết bảo hành chính hãng từ 12 đến 24 tháng. Hỗ trợ đổi mới linh hoạt nếu phát sinh lỗi kỹ thuật từ nhà sản xuất.',
    },
    {
      icon: Wrench,
      title: 'Linh Kiện & Phụ Tùng Sẵn Kho',
      description: 'VOLTOR sở hữu kho phụ tùng chính hãng đầy đủ (cánh bơm, rơ-le, tụ điện, phốt cơ khí) sẵn sàng thay thế trong 24h.',
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-[#090e1a] text-white border-t border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-slate-200 border border-slate-700 text-xs font-bold tracking-wide uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span>Tiêu Chuẩn Cơ Khí Chính Xác</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Chất Lượng Kỹ Thuật VOLTOR & DONGYIN
          </h2>
          <p className="mt-2 text-slate-400 text-sm sm:text-base leading-relaxed">
            Mỗi thiết bị đều trải qua quy trình kiểm thử áp suất thủy lực, đo dòng tải động cơ và kiểm định an toàn điện nghiêm ngặt.
          </p>
        </div>

        {/* 6 Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div
                key={index}
                className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors shadow-xs"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-4 text-blue-400">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
