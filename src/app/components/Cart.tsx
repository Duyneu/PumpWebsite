import { useState } from 'react';
import { CartItem } from '../contexts/CartContext';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { CheckoutModal } from './CheckoutModal';
import { Order } from '../utils/orders';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
  onContinueShopping: () => void;
  onClearCart?: () => void;
}

export function Cart({ items, onUpdateQuantity, onRemove, onContinueShopping, onClearCart }: CartProps) {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? (subtotal > 5000000 ? 0 : 200000) : 0;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <ShoppingBag className="w-24 h-24 mx-auto text-gray-300 mb-6" />
        <h2 className="mb-4">Giỏ hàng của bạn đang trống</h2>
        <p className="text-gray-600 mb-8">
          Hãy khám phá các sản phẩm máy bơm chất lượng của chúng tôi
        </p>
        <button
          onClick={onContinueShopping}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
        >
          Xem sản phẩm
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <h1 className="mb-8">Giỏ hàng của bạn</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-sm p-4 md:p-6 flex flex-col sm:flex-row gap-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full sm:w-32 h-32 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="mb-2">{item.name}</h3>
                <div className="text-sm text-gray-500 mb-3">{item.category}</div>
                <div className="text-blue-600 mb-4">{formatPrice(item.price)}</div>
                
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1.5 hover:bg-gray-50 transition-colors"
                    >
                      -
                    </button>
                    <span className="px-4 py-1.5 border-x">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1.5 hover:bg-gray-50 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => onRemove(item.id)}
                    className="text-red-500 hover:text-red-700 transition-colors flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Xóa
                  </button>
                </div>
              </div>
              <div className="text-right sm:text-left">
                <div className="text-gray-500 text-sm mb-1">Tổng cộng</div>
                <div className="text-blue-600">
                  {formatPrice(item.price * item.quantity)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <div className="mb-6">Tóm tắt đơn hàng</div>
            
            <div className="space-y-3 mb-6 pb-6 border-b">
              <div className="flex justify-between text-gray-600">
                <span>Tạm tính:</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Phí vận chuyển:</span>
                <span>{shipping === 0 ? 'Miễn phí' : formatPrice(shipping)}</span>
              </div>
              {subtotal < 5000000 && subtotal > 0 && (
                <div className="text-sm text-gray-500">
                  Mua thêm {formatPrice(5000000 - subtotal)} để được miễn phí vận chuyển
                </div>
              )}
            </div>

            <div className="flex justify-between mb-6">
              <span>Tổng cộng:</span>
              <span className="text-blue-600">{formatPrice(total)}</span>
            </div>

            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 shadow-md hover:shadow-lg transition-all mb-3 flex items-center justify-center gap-2"
            >
              Tiến hành đặt hàng
            </button>
            <button
              onClick={onContinueShopping}
              className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Tiếp tục mua hàng
            </button>

            <div className="mt-6 pt-6 border-t text-sm text-gray-600">
              <p className="mb-2">✓ Bảo hành chính hãng</p>
              <p className="mb-2">✓ Đổi trả trong 7 ngày</p>
              <p>✓ Hỗ trợ kỹ thuật 24/7</p>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={items}
        subtotal={subtotal}
        shipping={shipping}
        total={total}
        onOrderSuccess={(_order: Order) => {
          onClearCart?.();
        }}
      />
    </div>
  );
}
