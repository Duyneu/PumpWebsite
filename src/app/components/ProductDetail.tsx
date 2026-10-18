import { useState } from 'react';
import { Product } from '../types';
import { ArrowLeft, ShoppingCart, Check, Truck, Shield, Phone, Edit } from 'lucide-react';
import { ProductReviews } from './ProductReviews';
import { useNavigate } from 'react-router-dom';

interface ProductDetailProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onBack: () => void;
}

export function ProductDetail({ product, onAddToCart, onBack }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Quay lại danh sách sản phẩm
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-gray-100 rounded-2xl overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover aspect-square"
            />
          </div>

          {/* Product Info */}
          <div>
            <div className="text-sm text-blue-600 mb-2">{product.category}</div>
            <h1 className="mb-4">{product.name}</h1>
            
            <div className="flex items-baseline gap-3 mb-6">
              <div className="text-blue-600">{formatPrice(product.price)}</div>
              {product.inStock && (
                <span className="text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full flex items-center gap-1">
                  <Check className="w-4 h-4" />
                  Còn hàng
                </span>
              )}
            </div>

            <p className="text-gray-600 mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Specifications */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-100">
              <div className="font-bold text-gray-900 mb-4 text-base">Thông số kỹ thuật</div>
              <div className="space-y-3 text-sm">
                {product.specs?.power && (
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Công suất:</span>
                    <span className="font-semibold text-gray-900">{product.specs.power}</span>
                  </div>
                )}
                {product.specs?.flow && (
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Lưu lượng nước:</span>
                    <span className="font-semibold text-gray-900">{product.specs.flow}</span>
                  </div>
                )}
                {product.specs?.head && (
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Cột áp:</span>
                    <span className="font-semibold text-gray-900">{product.specs.head}</span>
                  </div>
                )}
                {product.specs?.material && (
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Ống xả / Chất liệu:</span>
                    <span className="font-semibold text-gray-900">{product.specs.material}</span>
                  </div>
                )}
                {product.customSpecs?.map((cs, idx) => (
                  <div key={idx} className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">{cs.name}:</span>
                    <span className="font-semibold text-gray-900">{cs.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-50 transition-colors"
                >
                  -
                </button>
                <span className="px-6 py-2 border-x">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-gray-50 transition-colors"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {addedToCart ? (
                  <>
                    <Check className="w-5 h-5" />
                    Đã thêm vào giỏ
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    Thêm vào giỏ hàng
                  </>
                )}
              </button>
            </div>

            {/* Contact & Zalo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href="tel:+84836389488"
                className="w-full border-2 border-blue-600 text-blue-600 py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 font-medium text-sm"
              >
                <Phone className="w-4 h-4" />
                Gọi: 0836 389 488
              </a>
              <a
                href="https://zalo.me/0836389488"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#0068FF] text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium text-sm shadow-sm"
              >
                <span className="font-bold text-xs bg-white text-[#0068FF] px-1.5 py-0.5 rounded">Zalo</span>
                Chat Zalo tư vấn
              </a>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              <div className="flex items-center gap-3 text-sm">
                <Shield className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span className="text-gray-600">Bảo hành 12-24 tháng</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Truck className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span className="text-gray-600">Giao hàng miễn phí</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span className="text-gray-600">Hàng chính hãng 100%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="border-t border-gray-200 bg-gray-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
          <ProductReviews productId={product.id} productName={product.name} />
        </div>
      </div>
    </div>
  );
}