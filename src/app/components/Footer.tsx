import { Facebook, Mail, Phone, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from 'figma:asset/f7441d1239749f768a4a91d19e063fed0d3c3bf0.png';
import { getEmailComposeUrl, handleEmailClickWithCopy } from '../utils/emailLink';

export function Footer() {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/products?category=${categoryId}`);
  };

  return (
    <>
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={logo} alt="Voltor Logo" className="h-10 w-auto" />
                <div className="text-white">VOLTOR Việt Nam</div>
              </div>
              <p className="text-sm mb-4">
                Đơn vị cung cấp máy bơm nước, động cơ điện và thiết bị công nghiệp 
                chuyên nghiệp, uy tín hàng đầu tại Việt Nam.
              </p>
              <div className="flex gap-3">
                <a
                  href="https://www.facebook.com/profile.php?id=61576883068377"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Trang Facebook VOLTOR Việt Nam"
                  className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href={getEmailComposeUrl('Liên hệ hợp tác VOLTOR')}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleEmailClickWithCopy}
                  aria-label="Gửi email qua Gmail tới voltorvietnam@gmail.com"
                  className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors"
                  title="Gửi email qua Gmail (voltorvietnam@gmail.com)"
                >
                  <Mail className="w-5 h-5" />
                </a>
                
                {/* Zalo with Animation */}
                <a
                  href="https://zalo.me/0898296336"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Liên hệ qua Zalo VOLTOR (0898 296 336)"
                  className="footer-zalo-btn"
                  title="Liên hệ qua Zalo (0898 296 336)"
                >
                  <div className="footer-zalo-circle"></div>
                  <div className="footer-zalo-circle-fill"></div>
                  <div className="footer-zalo-icon">
                    <img 
                      src="https://vutruso.com/wp-content/uploads/2024/05/zalo-2.png" 
                      alt="Zalo" 
                      className="w-5 h-5 object-contain"
                      style={{ filter: 'brightness(0) invert(1)' }}
                    />
                  </div>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <div className="text-white mb-4">Liên kết nhanh</div>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => navigate('/')}
                    className="hover:text-blue-400 transition-colors"
                  >
                    Trang chủ
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/about')}
                    className="hover:text-blue-400 transition-colors"
                  >
                    Giới thiệu
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/products')}
                    className="hover:text-blue-400 transition-colors"
                  >
                    Sản phẩm
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/contact')}
                    className="hover:text-blue-400 transition-colors"
                  >
                    Liên hệ
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/terms')}
                    className="hover:text-blue-400 transition-colors"
                  >
                    Điều khoản dịch vụ
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/privacy')}
                    className="hover:text-blue-400 transition-colors"
                  >
                    Chính sách bảo mật
                  </button>
                </li>
              </ul>
            </div>

            {/* Product Categories */}
            <div>
              <div className="text-white mb-4">Danh mục sản phẩm</div>
              <ul className="space-y-2 text-sm">
                <li>
                  <button 
                    onClick={() => handleCategoryClick('may-bom-nuoc')}
                    className="hover:text-blue-400 transition-colors text-left"
                  >
                    Máy bơm nước
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleCategoryClick('dong-co-dien')}
                    className="hover:text-blue-400 transition-colors text-left"
                  >
                    Động cơ điện
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleCategoryClick('ac-quy-oto')}
                    className="hover:text-blue-400 transition-colors text-left"
                  >
                    Ắc quy ô tô
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleCategoryClick('dung-cu-ve-sinh')}
                    className="hover:text-blue-400 transition-colors text-left"
                  >
                    Dụng cụ vệ sinh
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleCategoryClick('cong-cu-dung-cu')}
                    className="hover:text-blue-400 transition-colors text-left"
                  >
                    Công cụ & dụng cụ
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleCategoryClick('dien-cong-nghiep')}
                    className="hover:text-blue-400 transition-colors text-left"
                  >
                    Điện công nghiệp
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <div className="text-white mb-4">Liên hệ</div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <a href="tel:+84898296336" className="hover:text-blue-400 transition-colors">
                      (+84) 898 296 336
                    </a>
                    <div className="text-xs text-gray-400">Hotline 24/7</div>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <a
                    href={getEmailComposeUrl('Tư vấn sản phẩm VOLTOR')}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleEmailClickWithCopy}
                    className="hover:text-blue-400 transition-colors"
                    title="Mở Gmail gửi tới voltorvietnam@gmail.com"
                  >
                    voltorvietnam@gmail.com
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <a 
                    href="https://www.google.com/maps/place/C%C3%94NG+TNHH+VOLTOR+VI%E1%BB%86T+NAM/@21.1417622,106.0164867,20.75z/data=!4m6!3m5!1s0x313509feb8e5f7c5:0xd69cbd6abffc20d9!8m2!3d21.1418747!4d106.0168129!16s%2Fg%2F11x0q048l5?entry=ttu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400 transition-colors"
                    title="Xem bản đồ trên Google Maps"
                  >
                    Số 112-118 Lý Thường Kiệt, Thị trấn Lim, Tiên Du, Bắc Ninh
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-500">
            <p>© {new Date().getFullYear()} VOLTOR Việt Nam. Tất cả quyền được bảo lưu.</p>
            <div className="flex items-center gap-6 text-xs text-gray-400">
              <button
                onClick={() => navigate('/terms')}
                className="hover:text-blue-400 transition-colors"
              >
                Điều khoản dịch vụ
              </button>
              <span>•</span>
              <button
                onClick={() => navigate('/privacy')}
                className="hover:text-blue-400 transition-colors"
              >
                Chính sách bảo mật
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Zalo Animation Styles */}
      <style>{`
        /* Zalo Container - Match other social icons (36x36px) */
        .footer-zalo-btn {
          position: relative;
          display: block;
          width: 36px;
          height: 36px;
          text-decoration: none;
        }

        /* Circles - Animation */
        .footer-zalo-circle {
          position: absolute;
          top: 0;
          left: 0;
          width: 36px;
          height: 36px;
          border-radius: 8px; /* Match rounded-lg */
          border: 2px solid rgba(59, 130, 246, 0.5); /* Blue-500 with opacity */
          opacity: 0.3;
          animation: zoomIn 2s ease-in-out infinite;
        }

        .footer-zalo-circle-fill {
          position: absolute;
          top: 0;
          left: 0;
          width: 36px;
          height: 36px;
          border-radius: 8px; /* Match rounded-lg */
          background-color: rgba(59, 130, 246, 0.2); /* Blue-500 with opacity */
          opacity: 0.5;
          animation: pulse 2s ease-in-out infinite;
        }

        /* Zalo Icon - Match other icons (gray-800 background) */
        .footer-zalo-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 36px;
          height: 36px;
          background-color: rgb(31, 41, 55); /* gray-800 */
          border-radius: 8px; /* Match rounded-lg */
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .footer-zalo-btn:hover .footer-zalo-icon {
          background-color: rgb(37, 99, 235); /* blue-600 - same as other icons */
        }

        .footer-zalo-icon img {
          width: 20px;
          height: 20px;
          object-fit: contain;
          filter: brightness(0) invert(1); /* Make icon white */
        }

        /* Animations */
        @keyframes zoomIn {
          0% {
            transform: scale(0.95);
            opacity: 0;
          }
          50% {
            opacity: 0.3;
          }
          100% {
            transform: scale(1.15);
            opacity: 0;
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(0.95);
            opacity: 0.5;
          }
          50% {
            transform: scale(1);
            opacity: 0.3;
          }
        }

        /* Hover effect - pause animation */
        .footer-zalo-btn:hover .footer-zalo-circle {
          animation-play-state: paused;
        }

        .footer-zalo-btn:hover .footer-zalo-circle-fill {
          animation-play-state: paused;
        }

        /* Mobile adjustments */
        @media (max-width: 768px) {
          .footer-zalo-btn,
          .footer-zalo-circle,
          .footer-zalo-circle-fill {
            width: 36px;
            height: 36px;
          }

          .footer-zalo-icon {
            width: 36px;
            height: 36px;
          }

          .footer-zalo-icon img {
            width: 20px;
            height: 20px;
          }
        }
      `}</style>
    </>
  );
}