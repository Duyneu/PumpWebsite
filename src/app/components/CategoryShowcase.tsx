import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Zap, Droplets, SunMedium } from 'lucide-react';
import * as motion from 'motion/react-client';

interface CategoryCard {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  badgeColor: string;
  description: string;
  specs: string[];
  image: string;
  categoryFilter: string;
  icon: typeof Zap;
}

export function CategoryShowcase() {
  const navigate = useNavigate();

  const categories: CategoryCard[] = [
    {
      id: 'hoa-tien',
      title: 'Bơm Hỏa Tiễn Giếng Khoan',
      subtitle: 'Thương hiệu DONGYIN & VOLTOR',
      badge: 'Bán Chạy Nhất',
      badgeColor: 'bg-amber-500 text-white',
      description: 'Chuyên khai thác nước ngầm tầng sâu, tưới tiêu trang trại đồi dốc và cấp nước sinh hoạt áp lực lớn.',
      specs: ['Cột áp đẩy cao: 40m - 280m', 'Động cơ 100% dây đồng chịu nhiệt', 'Thân & cánh Inox 304 chống cát'],
      image: '/dongyin-images/sd_pump_4sdm.jpg',
      categoryFilter: 'Máy bơm hỏa tiễn',
      icon: Droplets,
    },
    {
      id: 'bom-chim',
      title: 'Bơm Chìm Nước Thải & Hố Móng',
      subtitle: 'Chuyên dụng công trình & nông nghiệp',
      badge: 'Công Trình Nặng',
      badgeColor: 'bg-blue-600 text-white',
      description: 'Xử lý nước bẩn, nước bùn cát, thoát nước tầng hầm nhà xưởng và ao nuôi thủy hải sản chuyên nghiệp.',
      specs: ['Cánh cắt rác gang đúc siêu bền', 'Cấp bảo vệ chống nước IP68', 'Phốt cơ khí kép chống rò rỉ'],
      image: '/dongyin-images/wq_pump.jpg',
      categoryFilter: 'Máy bơm điện chìm',
      icon: ShieldCheck,
    },
    {
      id: 'ly-tam',
      title: 'Bơm Ly Tâm & Tăng Áp Trục Ngang',
      subtitle: 'Áp lực mạnh mẽ & vận hành êm ái',
      badge: 'Dân Dụng & Tưới',
      badgeColor: 'bg-emerald-600 text-white',
      description: 'Lưu lượng nước lớn, cấp nước nhanh chóng cho nhà cao tầng, hệ thống tưới béc phun sương tự động.',
      specs: ['Lưu lượng nước: Lên tới 40m³/h', 'Rơ-le điện tử tự ngắt thông minh', 'Cánh đồng đúc cân bằng động'],
      image: '/dongyin-images/cpm_cp_pump.jpg',
      categoryFilter: 'Máy bơm ly tâm',
      icon: Zap,
    },
    {
      id: 'solar',
      title: 'Bơm Năng Lượng Mặt Trời (Solar)',
      subtitle: 'Công nghệ xanh tiết kiệm 100% tiền điện',
      badge: 'Giải Pháp Tiên Tiến',
      badgeColor: 'bg-orange-500 text-white',
      description: 'Hoạt động độc lập bằng năng lượng mặt trời, giải pháp hoàn hảo cho trang trại, rẫy đồi xa lưới điện.',
      specs: ['Tích hợp biến tần MPPT hiệu suất 98%', 'Động cơ DC không chổi than tuổi thọ cao', 'Không tốn chi phí kéo dây điện'],
      image: '/dongyin-images/solar_4dp.jpg',
      categoryFilter: 'Máy bơm hỏa tiễn',
      icon: SunMedium,
    },
  ];

  const handleSelectCategory = (catName: string) => {
    navigate(`/products?category=${encodeURIComponent(catName)}`);
  };

  return (
    <section className="py-16 bg-slate-50 border-t border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold tracking-wide uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            Dòng Sản Phẩm Trọng Tâm
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Danh Mục Máy Bơm Tiêu Biểu
          </h2>
          <p className="mt-3 text-slate-600 text-base leading-relaxed">
            Tuyển chọn các dòng máy bơm nước công nghiệp và dân dụng đạt chuẩn kiểm định chất lượng,
            đáp ứng trọn vẹn từ hộ gia đình đến đại công trình.
          </p>
        </div>

        {/* 4 Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                onClick={() => handleSelectCategory(cat.categoryFilter)}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden cursor-pointer group"
              >
                {/* Image Header with Badge */}
                <div className="relative aspect-[4/3] bg-gradient-to-b from-slate-100 to-slate-200/60 p-4 flex items-center justify-center overflow-hidden">
                  <span className={`absolute top-3 left-3 text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm z-10 ${cat.badgeColor}`}>
                    {cat.badge}
                  </span>
                  <div className="w-9 h-9 rounded-full bg-white/90 backdrop-blur shadow-sm absolute top-3 right-3 flex items-center justify-center text-blue-600 z-10">
                    <Icon className="w-5 h-5" />
                  </div>
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-semibold text-blue-600 tracking-wide uppercase mb-1">
                      {cat.subtitle}
                    </p>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                      {cat.description}
                    </p>

                    {/* Technical Specs List */}
                    <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                      {cat.specs.map((spec, sIdx) => (
                        <div key={sIdx} className="flex items-center text-[12px] text-slate-700 font-medium gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0"></span>
                          <span className="truncate">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Link */}
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-sm font-bold text-blue-600 group-hover:text-blue-700">
                    <span>Xem các model</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
