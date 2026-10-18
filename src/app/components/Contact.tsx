import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { sendEmail } from '../utils/emailService';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Gửi email notification
      const result = await sendEmail(formData);
      
      if (result.success) {
        setSubmitted(true);
        
        // Reset form sau 4 giây
        setTimeout(() => {
          setSubmitted(false);
          setFormData({ name: '', phone: '', email: '', message: '' });
        }, 4000);
      } else {
        setError(result.message || 'Có lỗi xảy ra. Vui lòng thử lại!');
      }
    } catch (err) {
      console.error('Submit error:', err);
      setError('Có lỗi xảy ra. Vui lòng thử lại sau!');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="mb-4">Liên hệ với chúng tôi</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Đội ngũ chuyên gia của chúng tôi sẵn sàng tư vấn và hỗ trợ bạn 
          tìm giải pháp máy bơm phù hợp nhất
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div>
          <div className="mb-8">Thông tin liên hệ</div>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="mb-1">Hotline & Zalo tư vấn</div>
                <div className="flex flex-wrap items-center gap-2">
                  <a href="tel:+84836389488" className="text-blue-600 font-semibold hover:underline">
                    (+84) 836 389 488
                  </a>
                  <a
                    href="https://zalo.me/0836389488"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full border border-blue-200 hover:bg-blue-600 hover:text-white transition-colors inline-flex items-center gap-1 font-medium"
                  >
                    Chat Zalo
                  </a>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Hỗ trợ 24/7 - Tư vấn miễn phí kỹ thuật & báo giá
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="mb-1">Email</div>
                <a href="mailto:voltorvietnam@gmail.com" className="text-blue-600 hover:underline">
                  voltorvietnam@gmail.com
                </a>
                <p className="text-sm text-gray-500 mt-1">
                  Phản hồi trong vòng 24h
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="mb-1">Địa chỉ</div>
                <a 
                  href="https://www.google.com/maps/place/C%C3%94NG+TNHH+VOLTOR+VI%E1%BB%86T+NAM/@21.1417622,106.0164867,20.75z/data=!4m6!3m5!1s0x313509feb8e5f7c5:0xd69cbd6abffc20d9!8m2!3d21.1418747!4d106.0168129!16s%2Fg%2F11x0q048l5?entry=ttu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors inline-flex items-center gap-1 group"
                  title="Xem trên Google Maps"
                >
                  <span>
                    Số 112-118 Lý Thường Kiệt<br />
                    Thị trấn Lim, Tiên Du, Bắc Ninh
                  </span>
                  <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="mb-1">Giờ làm việc</div>
                <p className="text-gray-600">
                  Thứ 2 - Thứ 7: 7:00 - 18:00<br />
                  Chủ nhật: 7:15 - 16:00
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-blue-50 rounded-lg">
            <div className="mb-2">Cam kết của chúng tôi</div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>✓ Sản phẩm chính hãng 100%</li>
              <li>✓ Giá cả cạnh tranh nhất thị trường</li>
              <li>✓ Bảo hành đầy đủ theo nhà sản xuất</li>
              <li>✓ Hỗ trợ lắp đặt và bảo trì định kỳ</li>
              <li>✓ Tư vấn kỹ thuật chuyên sâu</li>
            </ul>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
          <div className="mb-6">Gửi yêu cầu tư vấn</div>
          
          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-green-800 mb-2">Gửi thành công!</div>
              <p className="text-green-600 text-sm">
                Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm mb-2">
                  Họ và tên <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập họ tên của bạn"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm mb-2">
                  Số điện thoại <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập số điện thoại"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập email của bạn"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm mb-2">
                  Nội dung <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Mô tả nhu cầu của bạn..."
                />
              </div>

              {loading ? (
                <button
                  type="button"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Đang gửi...
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Gửi yêu cầu
                </button>
              )}

              {error && (
                <div className="mt-4 text-red-500 text-sm flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  {error}
                </div>
              )}
            </form>
          )}
        </div>
      </div>

      {/* Google Maps */}
      <div className="mt-12">
        <div className="mb-6 text-center">Bản đồ chỉ đường</div>
        <div className="rounded-xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d464.6448464379043!2d106.01648673270485!3d21.14176223652873!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313509feb8e5f7c5%3A0xd69cbd6abffc20d9!2zQ8OUTkcgVE5ISCBWT0xUT1IgVknhu4ZUIE5BTQ!5e0!3m2!1svi!2s!4v1735296000000!5m2!1svi!2s"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Bản đồ CÔNG TNHH VOLTOR VIỆT NAM - Số 112-118 Lý Thường Kiệt, Thị trấn Lim, Tiên Du, Bắc Ninh"
          ></iframe>
        </div>
        <div className="mt-4 text-center">
          <a 
            href="https://www.google.com/maps/place/C%C3%94NG+TNHH+VOLTOR+VI%E1%BB%86T+NAM/@21.1417622,106.0164867,20.75z/data=!4m6!3m5!1s0x313509feb8e5f7c5:0xd69cbd6abffc20d9!8m2!3d21.1418747!4d106.0168129!16s%2Fg%2F11x0q048l5?entry=ttu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <MapPin className="w-4 h-4" />
            Xem trên Google Maps
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}