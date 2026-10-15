import { motion } from 'motion/react';
import { Target, Award, Users, Wrench, TrendingUp, Shield } from 'lucide-react';

// Import images - Updated với ảnh rõ nét hơn
import teamMeetingImg from 'figma:asset/eef97558f9b042891acd67c365ea4fdcf41063d1.png';
import technicalTeamImg from 'figma:asset/c26b0fabf5e432d56168fd61063df18ffd760e7b.png';
import productImg from 'figma:asset/356ae43299b08c7237e653e31b12c9b0c6d54f2c.png';

export function About() {
  const values = [
    {
      icon: Target,
      title: 'Tầm nhìn',
      description: 'Trở thành nhà cung cấp thiết bị máy bơm và công cụ hàng đầu Việt Nam'
    },
    {
      icon: Award,
      title: 'Chất lượng',
      description: 'Cam kết 100% sản phẩm chính hãng, bảo hành đầy đủ'
    },
    {
      icon: Users,
      title: 'Khách hàng',
      description: 'Đặt sự hài lòng của khách hàng lên hàng đầu'
    },
    {
      icon: Shield,
      title: 'Uy tín',
      description: 'Xây dựng niềm tin qua từng sản phẩm và dịch vụ'
    }
  ];

  const stats = [
    { number: '10+', label: 'Năm kinh nghiệm' },
    { number: '5000+', label: 'Khách hàng tin dùng' },
    { number: '50+', label: 'Đối tác chiến lược' },
    { number: '99%', label: 'Khách hàng hài lòng' }
  ];

  const services = [
    {
      icon: Wrench,
      title: 'Tư vấn chuyên nghiệp',
      description: 'Đội ngũ kỹ thuật giàu kinh nghiệm, tư vấn giải pháp tối ưu cho mọi nhu cầu'
    },
    {
      icon: TrendingUp,
      title: 'Giá cả cạnh tranh',
      description: 'Cam kết giá tốt nhất thị trường với chất lượng sản phẩm hàng đầu'
    },
    {
      icon: Shield,
      title: 'Bảo hành chính hãng',
      description: 'Bảo hành đầy đủ theo tiêu chuẩn nhà sản xuất, hỗ trợ 24/7'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl mb-6">
              Về Chúng Tôi
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              VOLTOR - Đơn vị hàng đầu chuyên cung cấp máy bơm nước, động cơ điện, 
              dụng cụ vệ sinh và thiết bị công nghiệp chất lượng cao tại Việt Nam.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={teamMeetingImg}
                alt="Đội ngũ VOLTOR - Chuyên nghiệp và tận tâm"
                className="rounded-2xl shadow-xl w-full h-auto object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl mb-6 text-gray-900">
                Câu Chuyện Của Chúng Tôi
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Được thành lập từ năm 2024, VOLTOR - tiền thân là Công ty TNHH Điện máy Lợi Hồng - thành lập từ năm 2014, đã không ngừng phát triển và khẳng định 
                vị thế là một trong những nhà cung cấp thiết bị máy bơm và công cụ công nghiệp 
                uy tín nhất tại Việt Nam.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Với hơn 10 năm kinh nghiệm, chúng tôi tự hào phục vụ hàng nghìn khách hàng từ 
                hộ gia đình đến các doanh nghiệp lớn, cung cấp giải pháp tối ưu cho mọi nhu cầu 
                về máy bơm, động cơ điện, thiết bị vệ sinh và công cụ công nghiệp.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Chúng tôi cam kết mang đến sản phẩm chính hãng, chất lượng cao với giá cả cạnh tranh, 
                cùng dịch vụ tư vấn chuyên nghiệp và hỗ trợ tận tâm.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl mb-4 text-gray-900">Giá Trị Cốt Lõi</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Những giá trị định hướng hoạt động và phát triển của chúng tôi
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl mb-2 text-gray-900">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section with Technical Image */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 md:order-1"
            >
              <h2 className="text-3xl mb-6 text-gray-900">
                Đội Ngũ Chuyên Nghiệp
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Đội ngũ kỹ thuật viên của VOLTOR được đào tạo bài bản, có 
                nhiều năm kinh nghiệm trong lĩnh vực máy bơm, động cơ điện và thiết bị công nghiệp.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Chúng tôi không chỉ bán sản phẩm mà còn cung cấp dịch vụ tư vấn chuyên sâu, 
                giúp khách hàng lựa chọn giải pháp phù hợp nhất với nhu cầu và ngân sách.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl text-blue-600 mb-2">100+</div>
                  <div className="text-sm text-gray-600">Dự án hoàn thành</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl text-blue-600 mb-2">24/7</div>
                  <div className="text-sm text-gray-600">Hỗ trợ kỹ thuật</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 md:order-2"
            >
              <img
                src={technicalTeamImg}
                alt="Đội ngũ kỹ thuật VOLTOR - Chuyên môn cao"
                className="rounded-2xl shadow-xl w-full h-auto object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Quality Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={productImg}
                alt="Sản phẩm chính hãng VOLTOR"
                className="rounded-2xl shadow-xl w-full h-auto object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl mb-6 text-gray-900">
                Sản Phẩm Chính Hãng 100%
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                VOLTOR cam kết chỉ cung cấp sản phẩm chính hãng từ các thương hiệu uy tín 
                như Grundfos, Ebara, Pentax, và nhiều hãng nổi tiếng khác.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Mỗi sản phẩm đều được kiểm tra kỹ lưỡng, đi kèm tem chống hàng giả, 
                giấy bảo hành chính hãng và hóa đơn VAT đầy đủ.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Tem chống hàng giả</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Bảo hành chính hãng toàn quốc</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Hóa đơn VAT đầy đủ</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Đổi trả trong 7 ngày nếu có lỗi</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl mb-4 text-gray-900">Dịch Vụ Của Chúng Tôi</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Cam kết mang đến trải nghiệm tốt nhất cho khách hàng
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-8 rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <service.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl mb-3 text-gray-900">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl mb-6">
              Sẵn Sàng Hợp Tác Cùng Chúng Tôi?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Liên hệ ngay để được tư vấn và báo giá tốt nhất
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+84836389488"
                className="bg-white text-blue-600 px-8 py-3 rounded-full hover:bg-gray-100 transition-colors inline-block"
              >
                Gọi ngay: (+84) 898 296 336
              </a>
              <a
                href="https://zalo.me/84898296336"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white px-8 py-3 rounded-full hover:bg-white hover:text-blue-600 transition-colors inline-block"
              >
                Chat Zalo
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}