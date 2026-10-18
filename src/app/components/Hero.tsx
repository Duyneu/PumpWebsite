import { ArrowRight, Shield, Truck, Headphones } from 'lucide-react';
import * as motion from 'motion/react-client';

export type Page = 'home' | 'products' | 'about' | 'contact' | 'cart';

interface HeroProps {
  onNavigate: (page: Page) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.h1
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Giải Pháp Máy Bơm Nước Chuyên Nghiệp
            </motion.h1>
            <motion.p
              className="text-blue-100 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Cung cấp đầy đủ các loại máy bơm nước cho gia đình, công nghiệp và nông nghiệp. 
              Sản phẩm chính hãng, bảo hành uy tín, giao hàng toàn quốc.
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <button
                onClick={() => onNavigate('products')}
                className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-all transform hover:-translate-y-0.5 shadow-md hover:shadow-lg inline-flex items-center gap-2"
              >
                Xem sản phẩm
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="border-2 border-white text-white font-medium px-6 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-all transform hover:-translate-y-0.5"
              >
                Tư vấn miễn phí
              </button>
            </motion.div>
          </motion.div>
          
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/15 transition-all"
              whileHover={{ y: -5 }}
            >
              <Shield className="w-12 h-12 mb-3 text-blue-200" />
              <div className="mb-2 font-semibold">Bảo hành chính hãng</div>
              <p className="text-sm text-blue-100">Cam kết bảo hành 12-24 tháng</p>
            </motion.div>
            <motion.div
              className="bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/15 transition-all"
              whileHover={{ y: -5 }}
            >
              <Truck className="w-12 h-12 mb-3 text-blue-200" />
              <div className="mb-2 font-semibold">Giao hàng nhanh</div>
              <p className="text-sm text-blue-100">Giao hàng toàn quốc trong 1-3 ngày</p>
            </motion.div>
            <motion.div
              className="bg-white/10 backdrop-blur-sm p-6 rounded-xl col-span-2 hover:bg-white/15 transition-all"
              whileHover={{ y: -5 }}
            >
              <Headphones className="w-12 h-12 mb-3 text-blue-200" />
              <div className="mb-2 font-semibold">Hỗ trợ 24/7</div>
              <p className="text-sm text-blue-100">Đội ngũ kỹ thuật sẵn sàng tư vấn và hỗ trợ</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
