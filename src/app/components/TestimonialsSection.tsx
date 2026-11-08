import { MapPin, CheckCircle2, Wrench, Building } from 'lucide-react';

export function TestimonialsSection() {
  const deployments = [
    {
      title: 'Hệ Thống Tưới Đồi Dốc 5 Hecta',
      location: 'Krông Pắc, Đắk Lắk',
      client: 'Trang trại Nông nghiệp Tây Nguyên',
      model: 'DONGYIN 4SDM 3HP (Giếng sâu 110m)',
      metrics: 'Đẩy cao 110m • Nuôi 150 béc phun',
      detail:
        'Vận hành liên tục trong mùa khô hạn. Áp suất ổn định tại đỉnh đồi, máy không nóng và bảo vệ chống cạn nước hiệu quả.',
    },
    {
      title: 'Khoan Giếng Khai Thác Nước Nhiễm Phèn',
      location: 'Tiền Giang & Khu Vực Miền Tây',
      client: 'Đội Thi Công Giếng Khoan Bảy Thắng',
      model: 'Series DONGYIN 2SDM, 3SDM, 4SDM',
      metrics: 'Thân & Trục Inox 304 nguyên khối',
      detail:
        'Kháng ăn mòn phèn chua và cát hạt mịn. Cuộn dây 100% đồng giúp máy duy trì công suất sau nhiều năm vận hành.',
    },
    {
      title: 'Hạ Mực Nước Ngầm Hố Móng & Cắt Rác',
      location: 'KCN Quế Võ, Bắc Ninh',
      client: 'Công ty Cổ phần Xây Dựng An Phát',
      model: 'DONGYIN WQ 5.5kW Cánh Cắt Gang Đúc',
      metrics: 'Thoát bùn cát • Hoạt động 72h liên tục',
      detail:
        'Xử lý triệt để nước hố móng lẫn bao bì, bùn cát xây dựng. Chuẩn kháng nước IP68 với phốt cơ khí kép nhập khẩu Italy.',
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold tracking-wide uppercase mb-3">
            <Building className="w-3.5 h-3.5 text-blue-600" />
            <span>Hiện trường thực tế</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Ứng Dụng Thực Tế & Phản Hồi Hiện Trường
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            Dữ liệu triển khai thực tế của các dòng máy bơm VOLTOR & DONGYIN qua các điều kiện địa hình khắc nghiệt.
          </p>
        </div>

        {/* Deployments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {deployments.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{item.location}</span>
                  </span>
                  <span className="text-[11px] font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                    Dự án #{idx + 1}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 tracking-tight mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 mb-4">{item.client}</p>

                {/* Technical spec chip */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 mb-4 space-y-1 font-mono text-xs">
                  <div className="text-blue-700 font-bold">{item.model}</div>
                  <div className="text-slate-600 text-[11px]">{item.metrics}</div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  "{item.detail}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-emerald-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Đã nghiệm thu & vận hành ổn định</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
