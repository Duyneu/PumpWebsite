import { useState } from 'react';
import { Product } from '../types';
import { ArrowLeft, ShoppingCart, Check, Truck, Shield, Phone, Edit } from 'lucide-react';
import { ProductReviews } from './ProductReviews';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface ProductDetailProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onBack: () => void;
}

export function ProductDetail({ product, onAddToCart, onBack }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const { user } = useAuth();
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

          {/* Admin Edit Button - Top Right */}
          {user && user.role === 'admin' && (
            <button
              onClick={() => navigate(`/admin/products/edit/${product.id}`)}
              className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2 shadow-lg"
            >
              <Edit className="w-4 h-4" />
              <span className="hidden sm:inline">Chỉnh sửa sản phẩm</span>
              <span className="sm:hidden">Chỉnh sửa</span>
            </button>
          )}
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
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <div className="mb-4">Thông số kỹ thuật</div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Công suất:</span>
                  <span>{product.specs.power}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lưu lượng:</span>
                  <span>{product.specs.flow}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cột áp:</span>
                  <span>{product.specs.head}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Chất liệu:</span>
                  <span>{product.specs.material}</span>
                </div>
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

            {/* Contact */}
            <a
              href="tel:0123456789"
              className="w-full border-2 border-blue-600 text-blue-600 py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Gọi tư vấn: 0836 389 488
            </a>

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
      <div className="border-t border-gray-200 bg-gray-50">
        <ProductReviews productId={product.id} />
      </div>
    </div>
  );
}