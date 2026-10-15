import { ArrowRight, Shield, Truck, Headphones } from 'lucide-react';
export type Page = 'home' | 'products' | 'about' | 'contact' | 'cart';

interface HeroProps {
  onNavigate: (page: Page) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="mb-6">
              Giải Pháp Máy Bơm Nước Chuyên Nghiệp
            </h1>
            <p className="text-blue-100 mb-8">
              Cung cấp đầy đủ các loại máy bơm nước cho gia đình, công nghiệp và nông nghiệp. 
              Sản phẩm chính hãng, bảo hành uy tín, giao hàng toàn quốc.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('products')}
                className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors inline-flex items-center gap-2"
              >
                Xem sản phẩm
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="border-2 border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
              >
                Tư vấn miễn phí
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <Shield className="w-12 h-12 mb-3" />
              <div className="mb-2">Bảo hành chính hãng</div>
              <p className="text-sm text-blue-100">Cam kết bảo hành 12-24 tháng</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <Truck className="w-12 h-12 mb-3" />
              <div className="mb-2">Giao hàng nhanh</div>
              <p className="text-sm text-blue-100">Giao hàng toàn quốc trong 1-3 ngày</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg col-span-2">
              <Headphones className="w-12 h-12 mb-3" />
              <div className="mb-2">Hỗ trợ 24/7</div>
              <p className="text-sm text-blue-100">Đội ngũ kỹ thuật sẵn sàng tư vấn và hỗ trợ</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
