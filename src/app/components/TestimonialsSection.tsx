import { Star, Quote, MapPin, CheckCircle } from 'lucide-react';
import * as motion from 'motion/react-client';

export function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Anh Hoàng Long',
      role: 'Chủ trang trại sầu riêng (Krông Pắc, Đắk Lắk)',
      location: 'Tây Nguyên',
      avatarText: 'HL',
      avatarBg: 'bg-emerald-600',
      rating: 5,
      productUsed: 'Bơm hỏa tiễn DONGYIN 4SDM 3HP',
      quote:
        'Vườn sầu riêng 5 hecta của tôi trên đồi dốc, giếng sâu 110m. Lắp con hỏa tiễn DONGYIN 4SDM ép lên đỉnh đồi đẩy một lúc 150 béc tưới phun sương khỏe re. Máy chạy suốt mùa khô hạn 24/24 mà không hề sụt áp hay nóng máy.',
    },
    {
      name: 'Chú Bảy Thắng',
      role: 'Đội trưởng thi công khoan giếng công nghiệp',
      location: 'Tiền Giang & Miền Tây',
      avatarText: 'BT',
      avatarBg: 'bg-blue-600',
      rating: 5,
      productUsed: 'Dòng bơm hỏa tiễn 2SDM, 3SDM, 4SDM',
      quote:
        'Hơn 15 năm làm nghề khoan giếng, tôi chỉ tin tưởng tư vấn bà con mua bơm của VOLTOR phân phối. Động cơ 100% cuộn dây đồng thật, cánh bơm chống cát rất tốt. Giếng nào nhiễm phèn nhẹ bơm inox của hãng vẫn bền nguyên xi.',
    },
    {
      name: 'Kỹ sư Trần Đức',
      role: 'Chỉ huy trưởng công trình xây dựng An Phát',
      location: 'KCN Quế Võ, Bắc Ninh',
      avatarText: 'TĐ',
      avatarBg: 'bg-indigo-600',
      rating: 5,
      productUsed: 'Bơm chìm nước thải WQ & WS 5.5kW',
      quote:
        'Mùa mưa bão hố móng tầng hầm ngập bùn cát và rác xây dựng, nhờ dàn bơm chìm cánh cắt WQ của VOLTOR hút nước liên tục 3 ngày đêm mới kịp tiến độ đổ bê tông. Hàng chính hãng, có CO-CQ và hóa đơn VAT đầy đủ.',
    },
  ];

  return (
    <section className="py-16 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold tracking-wide uppercase mb-3">
            <Star className="w-3.5 h-3.5 fill-amber-600 text-amber-600" />
            Đánh Giá & Phản Hồi Thực Tế
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Khách Hàng Nói Gì Về VOLTOR?
          </h2>
          <p className="mt-3 text-slate-600 text-base">
            Sự tin cậy của hàng ngàn bà con nông dân, nhà thầu xây dựng và đội ngũ thợ giếng khoan trên cả nước.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative"
            >
              <div>
                {/* Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400 gap-0.5">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-slate-200" />
                </div>

                {/* Quote Content */}
                <p className="text-slate-700 text-sm leading-relaxed italic mb-6">
                  "{item.quote}"
                </p>
              </div>

              {/* Author info */}
              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-full ${item.avatarBg} text-white font-bold flex items-center justify-center flex-shrink-0 text-sm shadow-sm`}>
                    {item.avatarText}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-slate-900 text-sm truncate">{item.name}</h4>
                      <CheckCircle className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                    </div>
                    <p className="text-xs text-slate-500 truncate">{item.role}</p>
                    <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>

                {/* Product used pill */}
                <div className="mt-3 bg-slate-50 border border-slate-200/70 rounded-lg px-2.5 py-1 text-[11px] text-slate-600 flex items-center justify-between">
                  <span className="text-slate-400">Sản phẩm dùng:</span>
                  <span className="font-semibold text-blue-700 truncate">{item.productUsed}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
