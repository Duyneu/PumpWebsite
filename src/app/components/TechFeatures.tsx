import { Cpu, ShieldCheck, Flame, Wrench, RefreshCw, Award } from 'lucide-react';
import * as motion from 'motion/react-client';

export function TechFeatures() {
  const features = [
    {
      icon: Flame,
      title: 'Động Cơ 100% Cuộn Dây Đồng',
      description: 'Dây đồng nguyên chất chịu nhiệt lên tới 200°C, cho phép máy vận hành liên tục nhiều giờ mà không lo quá nhiệt, cháy động cơ.',
      color: 'text-amber-500 bg-amber-50 border-amber-200',
    },
    {
      icon: ShieldCheck,
      title: 'Thân & Trục Inox 304 Chống Gỉ',
      description: 'Trục động cơ và vỏ thân bơm chế tạo từ thép không gỉ SUS304 nguyên khối, kháng phèn, kháng mặn và chống ăn mòn hóa chất cực tốt.',
      color: 'text-blue-600 bg-blue-50 border-blue-200',
    },
    {
      icon: Cpu,
      title: 'Phốt Cơ Khí Kép Chuyên Dụng',
      description: 'Sử dụng phốt cơ khí carbon-silicon kép nhập khẩu Italy, ngăn chặn tuyệt đối nước xâm nhập vào khoang dầu và cuộn dây.',
      color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
    },
    {
      icon: Award,
      title: 'Tiêu Chuẩn Kháng Nước IP68',
      description: 'Chứng nhận chống nước và chống bụi xâm nhập cấp cao nhất thế giới, an toàn vận hành ở độ sâu hàng trăm mét dưới lòng đất.',
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    },
    {
      icon: RefreshCw,
      title: 'Chính Sách Bảo Hành 1 Đổi 1',
      description: 'Cam kết bảo hành chính hãng từ 12 đến 24 tháng. Hỗ trợ đổi mới linh hoạt nếu phát sinh lỗi kỹ thuật từ nhà sản xuất.',
      color: 'text-rose-600 bg-rose-50 border-rose-200',
    },
    {
      icon: Wrench,
      title: 'Linh Kiện & Phụ Tùng Sẵn Kho',
      description: 'VOLTOR sở hữu kho phụ tùng chính hãng đầy đủ (cánh bơm, rơ-le, tụ điện, phốt cơ khí) sẵn sàng thay thế trong 24h.',
      color: 'text-cyan-600 bg-cyan-50 border-cyan-200',
    },
  ];

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-cyan-400 border border-blue-500/20 text-xs font-bold tracking-wide uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            Tiêu Chuẩn Cơ Khí Chính Xác
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Chất Lượng Vượt Trội Của VOLTOR & DONGYIN
          </h2>
          <p className="mt-3 text-slate-300 text-base leading-relaxed">
            Mỗi chiếc máy bơm xuất xưởng đều trải qua quy trình kiểm tra áp suất khí nén, đo dòng tải điện
            và lưu lượng nghiêm ngặt trước khi đến tay người tiêu dùng.
          </p>
        </div>

        {/* 6 Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ y: -5 }}
                className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/80 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 shadow-lg"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 border ${feat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2.5">
                  {feat.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {feat.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
