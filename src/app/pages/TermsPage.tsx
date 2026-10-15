import { motion } from 'motion/react';
import { ArrowLeft, FileText, Shield, AlertCircle, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function TermsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Quay lại</span>
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-8">
              <div className="flex items-center gap-3 mb-2">
                <FileText className="w-8 h-8 text-white" />
                <h1 className="text-3xl text-white">Điều khoản sử dụng</h1>
              </div>
              <p className="text-blue-100">
                Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}
              </p>
            </div>

            {/* Content */}
            <div className="p-8 space-y-8">
              {/* Introduction */}
              <section>
                <div className="flex items-start gap-3 mb-4">
                  <Shield className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h2 className="text-xl mb-2 text-gray-800">1. Giới thiệu</h2>
                    <p className="text-gray-600 leading-relaxed">
                      Chào mừng bạn đến với VOLTOR Việt Nam. Bằng việc truy cập và sử dụng website của chúng tôi, 
                      bạn đồng ý tuân thủ các điều khoản và điều kiện được quy định dưới đây. Vui lòng đọc kỹ 
                      trước khi sử dụng dịch vụ.
                    </p>
                  </div>
                </div>
              </section>

              {/* Account Terms */}
              <section className="border-t border-gray-200 pt-8">
                <div className="flex items-start gap-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h2 className="text-xl mb-2 text-gray-800">2. Tài khoản người dùng</h2>
                    <ul className="text-gray-600 leading-relaxed space-y-2 ml-4">
                      <li>• Bạn chịu trách nhiệm về việc bảo mật thông tin đăng nhập của mình</li>
                      <li>• Không được chia sẻ tài khoản cho người khác sử dụng</li>
                      <li>• Thông tin đăng ký phải chính xác và đầy đủ</li>
                      <li>• Bạn phải từ 18 tuổi trở lên để đăng ký tài khoản</li>
                      <li>• VOLTOR có quyền khóa tài khoản vi phạm điều khoản</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Usage Policy */}
              <section className="border-t border-gray-200 pt-8">
                <div className="flex items-start gap-3 mb-4">
                  <AlertCircle className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h2 className="text-xl mb-2 text-gray-800">3. Chính sách sử dụng</h2>
                    <div className="text-gray-600 leading-relaxed space-y-4">
                      <div>
                        <h3 className="font-medium text-gray-800 mb-2">3.1. Các hành vi được phép:</h3>
                        <ul className="ml-4 space-y-1">
                          <li>• Tìm kiếm và mua sản phẩm trên website</li>
                          <li>• Đánh giá và nhận xét sản phẩm đã mua</li>
                          <li>• Liên hệ với bộ phận hỗ trợ khách hàng</li>
                          <li>• Chia sẻ thông tin sản phẩm trên mạng xã hội</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800 mb-2">3.2. Các hành vi bị cấm:</h3>
                        <ul className="ml-4 space-y-1">
                          <li>• Sử dụng website cho mục đích bất hợp pháp</li>
                          <li>• Spam, phát tán nội dung xấu độc</li>
                          <li>• Can thiệp, phá hoại hệ thống website</li>
                          <li>• Sao chép, sửa đổi nội dung mà không có sự cho phép</li>
                          <li>• Tạo tài khoản giả mạo hoặc lừa đảo</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Product & Pricing */}
              <section className="border-t border-gray-200 pt-8">
                <h2 className="text-xl mb-2 text-gray-800">4. Sản phẩm và giá cả</h2>
                <div className="text-gray-600 leading-relaxed space-y-2">
                  <p>• Giá sản phẩm có thể thay đổi mà không cần báo trước</p>
                  <p>• Hình ảnh sản phẩm mang tính chất minh họa</p>
                  <p>• Thông số kỹ thuật được cung cấp từ nhà sản xuất</p>
                  <p>• VOLTOR cam kết cung cấp sản phẩm chính hãng</p>
                </div>
              </section>

              {/* Orders & Payment */}
              <section className="border-t border-gray-200 pt-8">
                <h2 className="text-xl mb-2 text-gray-800">5. Đơn hàng và thanh toán</h2>
                <div className="text-gray-600 leading-relaxed space-y-2">
                  <p>• Đơn hàng chỉ được xác nhận sau khi thanh toán thành công</p>
                  <p>• VOLTOR có quyền từ chối đơn hàng bất thường</p>
                  <p>• Thời gian giao hàng tùy theo khu vực và tình trạng hàng</p>
                  <p>• Khách hàng vui lòng kiểm tra kỹ sản phẩm khi nhận hàng</p>
                </div>
              </section>

              {/* Return & Warranty */}
              <section className="border-t border-gray-200 pt-8">
                <h2 className="text-xl mb-2 text-gray-800">6. Đổi trả và bảo hành</h2>
                <div className="text-gray-600 leading-relaxed space-y-2">
                  <p>• Sản phẩm lỗi được đổi trả trong vòng 7 ngày</p>
                  <p>• Bảo hành theo chính sách của nhà sản xuất</p>
                  <p>• Sản phẩm đổi trả phải còn nguyên vẹn, chưa qua sử dụng</p>
                  <p>• Vui lòng giữ hóa đơn để được hỗ trợ bảo hành</p>
                </div>
              </section>

              {/* Privacy */}
              <section className="border-t border-gray-200 pt-8">
                <h2 className="text-xl mb-2 text-gray-800">7. Bảo mật thông tin</h2>
                <div className="text-gray-600 leading-relaxed space-y-2">
                  <p>• VOLTOR cam kết bảo mật thông tin cá nhân của khách hàng</p>
                  <p>• Thông tin chỉ được sử dụng cho mục đích xử lý đơn hàng</p>
                  <p>• Không chia sẻ thông tin cho bên thứ ba không liên quan</p>
                  <p>• Dữ liệu được mã hóa và lưu trữ an toàn</p>
                </div>
              </section>

              {/* Intellectual Property */}
              <section className="border-t border-gray-200 pt-8">
                <h2 className="text-xl mb-2 text-gray-800">8. Quyền sở hữu trí tuệ</h2>
                <div className="text-gray-600 leading-relaxed space-y-2">
                  <p>• Mọi nội dung trên website thuộc bản quyền của VOLTOR</p>
                  <p>• Logo, hình ảnh, văn bản không được sao chép mà không có sự cho phép</p>
                  <p>• Vi phạm bản quyền sẽ bị xử lý theo pháp luật</p>
                </div>
              </section>

              {/* Liability */}
              <section className="border-t border-gray-200 pt-8">
                <h2 className="text-xl mb-2 text-gray-800">9. Giới hạn trách nhiệm</h2>
                <div className="text-gray-600 leading-relaxed space-y-2">
                  <p>• VOLTOR không chịu trách nhiệm cho thiệt hại gián tiếp</p>
                  <p>• Không đảm bảo website hoạt động liên tục không bị gián đoạn</p>
                  <p>• Không chịu trách nhiệm cho sai sót từ nhà cung cấp</p>
                </div>
              </section>

              {/* Changes to Terms */}
              <section className="border-t border-gray-200 pt-8">
                <h2 className="text-xl mb-2 text-gray-800">10. Thay đổi điều khoản</h2>
                <div className="text-gray-600 leading-relaxed space-y-2">
                  <p>• VOLTOR có quyền cập nhật điều khoản bất kỳ lúc nào</p>
                  <p>• Thông báo thay đổi sẽ được đăng tải trên website</p>
                  <p>• Việc tiếp tục sử dụng sau khi thay đổi đồng nghĩa với việc chấp nhận điều khoản mới</p>
                </div>
              </section>

              {/* Contact */}
              <section className="border-t border-gray-200 pt-8 bg-blue-50 -mx-8 px-8 py-6 -mb-8">
                <h2 className="text-xl mb-3 text-gray-800">11. Liên hệ</h2>
                <div className="text-gray-600 leading-relaxed space-y-2">
                  <p>Nếu bạn có câu hỏi về điều khoản sử dụng, vui lòng liên hệ:</p>
                  <div className="mt-4 space-y-1">
                    <p><strong>CÔNG TY TNHH VOLTOR VIỆT NAM</strong></p>
                    <p>📍 Số 112-118 Lý Thường Kiệt, Thị trấn Lim, Tiên Du, Bắc Ninh</p>
                    <p>📞 (+84) 898 296 336</p>
                    <p>📧 voltorvietnam@gmail.com</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
