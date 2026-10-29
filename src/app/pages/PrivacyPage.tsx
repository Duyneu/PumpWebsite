import { motion } from 'motion/react';
import { ArrowLeft, Shield, Lock, Eye, Database, PhoneCall, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function PrivacyPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-6 font-medium text-sm"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Quay lại</span>
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-8 text-white">
              <div className="flex items-center gap-3 mb-2">
                <Shield className="w-8 h-8 text-blue-200" />
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Chính Sách Bảo Mật Thông Tin</h1>
              </div>
              <p className="text-blue-100 text-sm">
                Cam kết bảo vệ quyền riêng tư & dữ liệu cá nhân của khách hàng tại VOLTOR Việt Nam
              </p>
            </div>

            {/* Content */}
            <div className="p-8 space-y-8 text-slate-700 text-sm leading-relaxed">
              {/* 1. Mục đích thu thập */}
              <section>
                <div className="flex items-start gap-3 mb-3">
                  <Database className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 mb-2">1. Mục đích thu thập thông tin</h2>
                    <p className="mb-2">
                      VOLTOR Việt Nam thu thập thông tin của Quý khách khi đặt hàng, yêu cầu báo giá kỹ thuật hoặc liên hệ tư vấn, bao gồm:
                    </p>
                    <ul className="list-disc list-inside space-y-1.5 ml-2 text-slate-600">
                      <li><strong>Họ và tên:</strong> Để xưng hô và lập phiếu giao nhận máy bơm, bảo hành.</li>
                      <li><strong>Số điện thoại & Email:</strong> Để xác nhận đơn hàng, gửi thông số kỹ thuật và hỗ trợ bảo hành 24/7.</li>
                      <li><strong>Địa chỉ giao hàng:</strong> Để điều phối xe vận chuyển máy bơm đến công trình hoặc nhà riêng.</li>
                      <li><strong>Nội dung yêu cầu kỹ thuật:</strong> Giúp kỹ sư chọn đúng model cột áp, lưu lượng, công suất.</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 2. Phạm vi sử dụng */}
              <section className="border-t border-gray-100 pt-6">
                <div className="flex items-start gap-3 mb-3">
                  <Eye className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 mb-2">2. Phạm vi sử dụng thông tin</h2>
                    <p className="mb-2">Thông tin thu thập chỉ được sử dụng nội bộ trong các hoạt động:</p>
                    <ul className="list-disc list-inside space-y-1.5 ml-2 text-slate-600">
                      <li>Xử lý và vận chuyển đơn đặt hàng máy bơm và linh kiện.</li>
                      <li>Kích hoạt bảo hành điện tử chính hãng 24 tháng cho động cơ và đầu bơm.</li>
                      <li>Gửi thông báo tiến độ giao hàng hoặc thông tin kỹ thuật liên quan.</li>
                      <li>Tuyệt đối <strong>KHÔNG</strong> bán, chia sẻ hoặc cho thuê dữ liệu cá nhân cho bên thứ ba vì mục đích tiếp thị không mong muốn.</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 3. Lưu trữ và Cookie */}
              <section className="border-t border-gray-100 pt-6">
                <div className="flex items-start gap-3 mb-3">
                  <Lock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 mb-2">3. Bảo mật lưu trữ & Cookie</h2>
                    <p className="mb-2">
                      Chúng tôi áp dụng các biện pháp kỹ thuật và mã hóa để ngăn chặn truy cập trái phép:
                    </p>
                    <ul className="list-disc list-inside space-y-1.5 ml-2 text-slate-600">
                      <li><strong>Cookie & LocalStorage:</strong> Sử dụng để ghi nhớ giỏ hàng mua sắm và trạng thái duyệt sản phẩm trên thiết bị của bạn.</li>
                      <li><strong>Bảo mật mật khẩu:</strong> Mật khẩu tài khoản (nếu có) được mã hóa bằng thuật toán an toàn một chiều, không thể đọc ngược.</li>
                      <li>Dữ liệu truyền tải qua mạng được mã hóa theo giao thức HTTPS chuẩn bảo mật.</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 4. Quyền của khách hàng */}
              <section className="border-t border-gray-100 pt-6">
                <div className="flex items-start gap-3 mb-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 mb-2">4. Quyền của Quý khách đối với dữ liệu cá nhân</h2>
                    <p className="mb-2">Quý khách có toàn quyền:</p>
                    <ul className="list-disc list-inside space-y-1.5 ml-2 text-slate-600">
                      <li>Yêu cầu kiểm tra, cập nhật hoặc điều chỉnh thông tin đơn hàng đã cung cấp.</li>
                      <li>Yêu cầu xóa dữ liệu cá nhân khỏi hệ thống sau khi hợp đồng cung ứng và thời hạn bảo hành hoàn tất.</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 5. Thông tin liên hệ giải quyết khiếu nại */}
              <section className="border-t border-gray-100 pt-6 bg-slate-50 -mx-8 px-8 py-6 -mb-8 rounded-b-2xl">
                <div className="flex items-start gap-3">
                  <PhoneCall className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h2 className="text-base font-bold text-slate-900 mb-1">5. Đơn vị quản lý & Tiếp nhận yêu cầu</h2>
                    <p className="text-slate-600 mb-2">Mọi thắc mắc hoặc yêu cầu về bảo mật thông tin, xin vui lòng liên hệ:</p>
                    <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1 font-medium text-xs sm:text-sm">
                      <p className="font-bold text-slate-900">CÔNG TY TNHH VOLTOR VIỆT NAM</p>
                      <p>📍 Địa chỉ: Số 112-118 Lý Thường Kiệt, Thị trấn Lim, Tiên Du, Bắc Ninh</p>
                      <p>📞 Hotline/Zalo: (+84) 898 296 336</p>
                      <p>📧 Email: voltorvietnam@gmail.com</p>
                    </div>
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
