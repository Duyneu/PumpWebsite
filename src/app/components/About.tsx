import { useState, useEffect } from 'react';
import * as motion from 'motion/react-client';
import { 
  Target, 
  Award, 
  Users, 
  ShieldCheck, 
  CheckCircle2, 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  Wrench, 
  Truck,
  Flame,
  Check
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getEffectiveProducts } from '../utils/productStorage';

// Import local photos
import teamMeetingImg from 'figma:asset/eef97558f9b042891acd67c365ea4fdcf41063d1.png';
import technicalTeamImg from 'figma:asset/c26b0fabf5e432d56168fd61063df18ffd760e7b.png';
import productImg from 'figma:asset/356ae43299b08c7237e653e31b12c9b0c6d54f2c.png';

export function About() {
  const navigate = useNavigate();
  const [productCount, setProductCount] = useState(() => getEffectiveProducts().length);

  useEffect(() => {
    const handleProductsChange = () => {
      setProductCount(getEffectiveProducts().length);
    };
    window.addEventListener('voltor_products_changed', handleProductsChange);
    return () => {
      window.removeEventListener('voltor_products_changed', handleProductsChange);
    };
  }, []);

  const values = [
    {
      icon: Target,
      title: 'Tầm Nhìn Chiến Lược',
      description: 'Trở thành đơn vị phân phối máy bơm nước công nghiệp, giếng khoan sâu và nông nghiệp công nghệ cao hàng đầu Việt Nam.',
      color: 'text-blue-600 bg-blue-50 border-blue-200',
    },
    {
      icon: Award,
      title: 'Chất Lượng Vượt Trội',
      description: 'Cam kết 100% động cơ cuộn dây đồng nguyên chất, nhập khẩu chính ngạch, có đầy đủ chứng chỉ CO-CQ và kiểm định xuất xưởng.',
      color: 'text-amber-600 bg-amber-50 border-amber-200',
    },
    {
      icon: Users,
      title: 'Khách Hàng Là Trọng Tâm',
      description: 'Tư vấn trung thực, chọn đúng cột áp và lưu lượng, bảo vệ tối đa chi phí đầu tư và tuổi thọ công trình của khách hàng.',
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    },
    {
      icon: ShieldCheck,
      title: 'Bảo Hành Uy Tín 1 Đổi 1',
      description: 'Chính sách bảo hành chính hãng từ 12-24 tháng với quy trình nhanh chóng, phụ tùng thay thế sẵn có trong 24 giờ.',
      color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
    },
  ];

  const milestones = [
    {
      year: '2014',
      title: 'Khởi Đầu Nền Móng',
      desc: 'Thành lập Công ty TNHH Điện máy Lợi Hồng tại Bắc Ninh, phân phối máy bơm nước và thiết bị cơ điện dân dụng.',
    },
    {
      year: '2018',
      title: 'Hợp Tác Chiến Lược DONGYIN',
      desc: 'Trở thành đối tác phân phối chính thức của thương hiệu máy bơm DONGYIN - tập đoàn sản xuất máy bơm hỏa tiễn hàng đầu thế giới.',
    },
    {
      year: '2024',
      title: 'Thành Lập Thương Hiệu VOLTOR',
      desc: 'Mở rộng quy mô với thương hiệu VOLTOR Việt Nam, đầu tư kho bãi hiện đại và mở rộng hệ thống đại lý khắp 3 miền.',
    },
    {
      year: 'Hiện Tại',
      title: 'Phát Triển Toàn Diện',
      desc: 'Phục vụ hơn 10.000+ khách hàng, cấp nước cho hàng ngàn dự án nông nghiệp sầu riêng, cà phê, công trình xây dựng và giếng khoan sâu.',
    },
  ];

  const stats = [
    { number: '10+', label: 'Năm Kinh Nghiệm Chuyên Sâu' },
    { number: '10.000+', label: 'Khách Hàng & Đại Lý Tin Dùng' },
    { number: `${productCount}`, label: 'Model Máy Bơm Đang Bán' },
    { number: '63', label: 'Tỉnh Thành Phân Phối Toàn Quốc' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      
      {/* 1. Hero Section */}
      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white py-20 sm:py-28 relative overflow-hidden border-b border-slate-800">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/60 border border-blue-500/30 text-xs font-semibold text-cyan-300 shadow-sm backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>VỀ CHÚNG TÔI • VOLTOR VIỆT NAM</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Kiến Tạo Giải Pháp Bơm Nước{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-sky-200">
                Bền Vững & Chuyên Nghiệp
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed pt-2">
              VOLTOR là đơn vị hàng đầu tại Việt Nam chuyên cung cấp máy bơm nước giếng khoan sâu, 
              máy bơm chìm nước thải công nghiệp, bơm ly tâm trục ngang và hệ thống bơm năng lượng mặt trời. 
              Uy tín được xây dựng từ chất lượng thực và sự tận tâm đồng hành cùng quý khách hàng.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Stats Strip */}
      <section className="bg-white border-b border-slate-200/80 shadow-sm py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="text-center sm:text-left border-l-2 border-blue-600 pl-4"
              >
                <div className="text-3xl sm:text-4xl font-black text-blue-700 tracking-tight">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Company Story Section with Photo */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Photo Showcase */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white group">
                <img
                  src={teamMeetingImg}
                  alt="Đội ngũ điều hành VOLTOR Việt Nam"
                  className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 bg-blue-900/80 px-2.5 py-1 rounded-md">
                    Trụ Sở Chính
                  </span>
                  <p className="text-sm font-semibold mt-2">
                    Công ty TNHH VOLTOR Việt Nam • Tiên Du, Bắc Ninh
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Story Text */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 space-y-5"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold tracking-wide uppercase">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                Hành Trình 10 Năm Phát Triển
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Từ Điện Máy Lợi Hồng Đến Thương Hiệu VOLTOR Việt Nam
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Được thành lập từ năm 2014 với tiền thân là <strong>Công ty TNHH Điện máy Lợi Hồng</strong>, 
                chúng tôi đã trải qua một thập kỷ kiên trì cống hiến trong ngành cơ điện và thiết bị máy bơm nước. 
                Đến năm 2024, thương hiệu <strong>VOLTOR Việt Nam</strong> chính thức được kiện toàn nhằm nâng tầm dịch vụ, 
                mở rộng quy mô tổng kho và mang đến những dòng máy bơm công nghệ mới nhất.
              </p>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Là nhà phân phối chiến lược của thương hiệu <strong>DONGYIN</strong> – nhà sản xuất máy bơm hàng đầu với tiêu chuẩn 
                xuất khẩu châu Âu, VOLTOR tự hào cung ứng cho các công trình trọng điểm, các đại lý cơ điện 
                và hàng ngàn hecta nông nghiệp khắp Tây Nguyên, Miền Tây và Miền Bắc.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
                  <Flame className="w-6 h-6 text-amber-500 mb-2" />
                  <div className="font-bold text-slate-900 text-sm">Động cơ 100% Đồng</div>
                  <p className="text-xs text-slate-500 mt-0.5">Chịu tải nhiệt cao, không pha tạp chất</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
                  <Truck className="w-6 h-6 text-blue-600 mb-2" />
                  <div className="font-bold text-slate-900 text-sm">Giao Hàng 24-48h</div>
                  <p className="text-xs text-slate-500 mt-0.5">Vận chuyển nhanh tận công trình</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 4. Timeline / Cột Mốc Phát Triển */}
      <section className="py-20 bg-white border-t border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Lịch Sử Hình Thành
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
              Những Dấu Mốc Đáng Tự Hào
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Từng bước khẳng định vị thế nhà cung cấp máy bơm nước uy tín số 1 trên thị trường.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-6 relative flex flex-col justify-between hover:border-blue-500 hover:shadow-lg transition-all"
              >
                <div>
                  <div className="text-3xl font-black text-blue-600 mb-3 tracking-tight">
                    {m.year}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {m.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {m.desc}
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-slate-200/60 flex items-center text-xs font-semibold text-blue-600">
                  <span>Giai đoạn {idx + 1}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Core Values */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Nguyên Tắc Hoạt Động
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
              4 Giá Trị Cốt Lõi Của VOLTOR
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Những chuẩn mực không thể nhân nhượng trong mọi giao dịch và dịch vụ kỹ thuật.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, idx) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 border ${v.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {v.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {v.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Technical Engineering & Warehouse with Real Photos */}
      <section className="py-20 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 space-y-5"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold tracking-wide uppercase border border-indigo-200">
                <Wrench className="w-3.5 h-3.5 text-indigo-600" />
                Năng Lực Kỹ Thuật & Hỗ Trợ 24/7
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Đội Ngũ Kỹ Sư Giàu Kinh Nghiệm, Tư Vấn Chuẩn Xác Tận Nơi
              </h2>

              <p className="text-slate-600 text-sm leading-relaxed">
                Một chiếc máy bơm tốt chỉ phát huy tối đa tuổi thọ khi được lắp đặt đúng thông số: 
                đúng lưu lượng nước thực tế của giếng khoan, đúng tổn thất áp lực ma sát đường ống và dùng tủ điều khiển bảo vệ an toàn.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Tính toán cột áp & đường ống miễn phí</h4>
                    <p className="text-xs text-slate-500">Giúp tránh tình trạng bơm quá tải cháy cuộn dây hoặc nước lên yếu không đủ áp.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Kho linh kiện & phụ tùng thay thế sẵn có</h4>
                    <p className="text-xs text-slate-500">Cánh bơm Inox, rơ-le điện tử, tụ khởi động, phốt cơ khí chính hãng luôn sẵn sàng.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Đầy đủ hóa đơn GTGT (VAT) & hồ sơ CO-CQ</h4>
                    <p className="text-xs text-slate-500">Phục vụ thanh quyết toán nhanh chóng cho các dự án xây dựng, nhà máy và công trình.</p>
                  </div>
                </div>
              </div>

              <div className="pt-3">
                <button
                  onClick={() => navigate('/products')}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-md inline-flex items-center gap-2"
                >
                  <span>Khám phá tất cả {productCount} sản phẩm</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

            {/* Right Images Collage */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 grid grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <img
                  src={technicalTeamImg}
                  alt="Kỹ thuật viên VOLTOR kiểm tra máy bơm"
                  className="rounded-2xl shadow-lg w-full h-56 object-cover border border-slate-200"
                />
                <div className="bg-slate-900 text-white p-5 rounded-2xl">
                  <div className="text-2xl font-black text-cyan-400">100%</div>
                  <div className="text-xs font-semibold mt-1">Sản phẩm được test áp suất và dòng điện trước khi giao</div>
                </div>
              </div>

              <div className="space-y-4 pt-6">
                <div className="bg-blue-50 border border-blue-200/80 p-5 rounded-2xl">
                  <div className="text-2xl font-black text-blue-700">24/7</div>
                  <div className="text-xs font-semibold text-slate-700 mt-1">Hotline kỹ thuật hỗ trợ trực tiếp bà con và nhà thầu</div>
                </div>
                <img
                  src={productImg}
                  alt="Kho sản phẩm máy bơm VOLTOR"
                  className="rounded-2xl shadow-lg w-full h-56 object-cover border border-slate-200"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 7. Showroom & Headquarters Location Card */}
      <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950 border border-cyan-800 px-3 py-1 rounded-full">
                Trụ Sở & Showroom Trực Tiếp
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Chào Mừng Quý Khách Đến Showroom VOLTOR Việt Nam
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Quý khách hàng, đại lý và đối tác có thể ghé thăm trực tiếp tổng kho của chúng tôi 
                để xem máy thực tế, test thử lưu lượng, áp lực nước và nhận chính sách chiết khấu tốt nhất.
              </p>

              <div className="space-y-2.5 pt-2 text-sm text-slate-200">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <span><strong>Địa chỉ:</strong> Số 112-118 Lý Thường Kiệt, Thị trấn Lim, Tiên Du, Bắc Ninh</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <span><strong>Hotline & Zalo:</strong> (+84) 898 296 336</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <span><strong>Email:</strong> voltorvietnam@gmail.com</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <a
                  href="https://www.google.com/maps/place/C%C3%94NG+TNHH+VOLTOR+VI%E1%BB%86T+NAM/@21.1417622,106.0164867,20.75z/data=!4m6!3m5!1s0x313509feb8e5f7c5:0xd69cbd6abffc20d9!8m2!3d21.1418747!4d106.0168129!16s%2Fg%2F11x0q048l5?entry=ttu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all shadow-md"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Chỉ Đường Trên Google Maps</span>
                </a>

                <a
                  href="tel:+84898296336"
                  className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs px-5 py-3 rounded-xl border border-slate-700 transition-all"
                >
                  <Phone className="w-4 h-4 text-cyan-400" />
                  <span>Gọi Hotline 0898.296.336</span>
                </a>
              </div>
            </div>

            {/* Right Map Preview Box */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-3xl w-full max-w-md shadow-2xl space-y-4">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                  <Building2 className="w-4 h-4" />
                  <span>CÔNG TY TNHH VOLTOR VIỆT NAM</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Tọa lạc ngay mặt đường trục chính Lý Thường Kiệt tại Thị trấn Lim, Tiên Du, Bắc Ninh – giao thông thuận tiện xe tải chở hàng lớn ra vào thoải mái.
                </p>
                <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-700/80 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Thời gian làm việc:</span>
                    <strong className="text-white">7:30 - 18:00 (T2 - CN)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Hỗ trợ kỹ thuật:</span>
                    <strong className="text-emerald-400">Trực 24/7</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Bãi đỗ xe:</span>
                    <strong className="text-white">Xe máy & Ô tô miễn phí</strong>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-700 to-indigo-700 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Bạn Muốn Trở Thành Đại Lý Hoặc Nhận Báo Giá Dự Án?
          </h2>
          <p className="text-blue-100 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            VOLTOR luôn có chính sách chiết khấu tốt nhất, hỗ trợ biển hiệu và chuyển giao kỹ thuật cho các đại lý máy bơm nước trên toàn quốc.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <a
              href="tel:+84898296336"
              className="bg-white text-blue-900 hover:bg-blue-50 font-bold px-7 py-3 rounded-xl transition-all shadow-md text-sm"
            >
              Gọi hotline: (+84) 898 296 336
            </a>
            <a
              href="https://zalo.me/0898296336"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-900/60 hover:bg-blue-900/80 border border-white/20 text-white font-semibold px-7 py-3 rounded-xl transition-all text-sm"
            >
              Nhắn tin Zalo báo giá
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}