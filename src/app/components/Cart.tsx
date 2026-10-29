import { useState, useMemo } from 'react';
import { CartItem, useCart } from '../contexts/CartContext';
import { 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Plus, 
  Minus, 
  ShieldCheck, 
  Truck, 
  Phone, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles,
  Eye,
  Check,
  ChevronRight
} from 'lucide-react';
import { CheckoutModal } from './CheckoutModal';
import { Order } from '../utils/orders';
import { useNavigate, Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { toast } from 'sonner';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CartProps {
  onContinueShopping?: () => void;
  items?: CartItem[];
  onUpdateQuantity?: (productId: string, quantity: number) => void;
  onRemove?: (productId: string) => void;
  onClearCart?: () => void;
}

const FREE_SHIPPING_THRESHOLD = 5000000; // 5,000,000 VND

export function Cart({
  items: propItems,
  onUpdateQuantity: propUpdateQuantity,
  onRemove: propRemove,
  onContinueShopping,
  onClearCart: propClearCart,
}: CartProps = {}) {
  const navigate = useNavigate();
  const cart = useCart();
  const allProducts = useProducts();

  const items = propItems ?? cart.cartItems;
  const onUpdateQuantity = propUpdateQuantity ?? cart.updateQuantity;
  const onRemove = propRemove ?? cart.removeFromCart;
  const onClearCart = propClearCart ?? cart.clearCart;
  const { addToCart } = cart;
  const handleContinueShopping = onContinueShopping ?? (() => navigate('/products'));

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shipping = subtotal > 0 ? (isFreeShipping ? 0 : 200000) : 0;
  const total = subtotal + shipping;

  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  // Get recommended products for the empty cart view
  const recommendedProducts = useMemo(() => {
    const all = allProducts;
    // Prioritize popular models (4SDM, WQ, CPM, Solar)
    const featured = all.filter(p => 
      p.name.includes('4SDM') || 
      p.name.includes('WQ') || 
      p.name.includes('CPM') || 
      p.name.includes('Solar') ||
      p.name.includes('PZB')
    );
    return (featured.length >= 4 ? featured : all).slice(0, 4);
  }, [allProducts]);

  const totalAvailableProducts = allProducts.length;

  const handleAddRecommended = (product: typeof recommendedProducts[0]) => {
    addToCart(product, 1);
    toast.success(`Đã thêm "${product.name}" vào giỏ hàng!`);
    setRecentlyAddedId(product.id);
    setTimeout(() => setRecentlyAddedId(null), 1500);
  };

  const handleClearAllWithConfirm = () => {
    if (confirm('Bạn có chắc chắn muốn xóa toàn bộ sản phẩm trong giỏ hàng không?')) {
      onClearCart?.();
      toast.success('Đã xóa sạch giỏ hàng');
    }
  };

  // ----------------------------------------------------------------------
  // VIEW: EMPTY CART
  // ----------------------------------------------------------------------
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Link to="/" className="hover:text-blue-600 transition-colors">Trang chủ</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-800 font-semibold">Giỏ hàng của bạn</span>
          </div>

          {/* Empty State Banner Card */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-14 shadow-sm text-center relative overflow-hidden">
            <div className="absolute top-0 right-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              {/* Icon */}
              <div className="w-20 h-20 rounded-3xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mx-auto shadow-sm">
                <ShoppingBag className="w-10 h-10" />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                Giỏ hàng chưa có sản phẩm
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                Giỏ Hàng Của Bạn Đang Trống
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Bạn chưa thêm chiếc máy bơm nào vào giỏ. Hãy tham khảo các dòng máy bơm nước chuyên nghiệp 
                chính hãng VOLTOR & DONGYIN với động cơ 100% cuộn dây đồng dưới đây!
              </p>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-wrap justify-center gap-3">
                <button
                  onClick={handleContinueShopping}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2 text-sm transform hover:-translate-y-0.5"
                >
                  <span>Khám phá tất cả {totalAvailableProducts} sản phẩm</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="tel:+84898296336"
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-6 py-3.5 rounded-xl transition-colors inline-flex items-center gap-2 text-sm"
                >
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span>Tư Vấn: 0898 296 336</span>
                </a>
              </div>

              {/* Category Quick Chips */}
              <div className="pt-6 border-t border-slate-100 mt-6">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Hoặc chọn theo danh mục quan tâm:
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {[
                    { label: '💧 Bơm Hỏa Tiễn Giếng Khoan', cat: 'Máy bơm hỏa tiễn' },
                    { label: '🌊 Bơm Chìm Nước Thải', cat: 'Máy bơm điện chìm' },
                    { label: '⚙️ Bơm Ly Tâm & Đẩy Cao', cat: 'Máy bơm ly tâm' },
                    { label: '⚡ Bơm Tăng Áp Tự Động', cat: 'Máy bơm tăng áp' },
                  ].map((chip, idx) => (
                    <button
                      key={idx}
                      onClick={() => navigate(`/products?category=${encodeURIComponent(chip.cat)}`)}
                      className="bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200/80 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors"
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Bestseller Pumps */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Gợi Ý Sản Phẩm Bán Chạy Nhất
                </h2>
                <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
                  Được các nhà thầu giếng khoan và đại lý nông nghiệp tin dùng hàng đầu
                </p>
              </div>

              <button
                onClick={handleContinueShopping}
                className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <span>Xem tất cả</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendedProducts.map((product) => {
                const isAdded = recentlyAddedId === product.id;
                return (
                  <div
                    key={product.id}
                    onClick={() => navigate(`/products/${product.id}`)}
                    className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-lg transition-all p-4 flex flex-col justify-between group cursor-pointer"
                  >
                    <div>
                      {/* Image */}
                      <div className="aspect-[4/3] bg-slate-50 rounded-xl p-3 flex items-center justify-center overflow-hidden mb-3 relative">
                        <span className="absolute top-2 left-2 bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold px-2 py-0.5 rounded-md">
                          {product.category}
                        </span>
                        <ImageWithFallback
                          src={product.image}
                          alt={product.name}
                          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>

                      {/* Title & Price */}
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                        {product.name}
                      </h3>

                      <div className="text-blue-700 font-extrabold text-base mt-2">
                        {formatPrice(product.price)}
                      </div>
                    </div>

                    {/* Quick Add Button */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddRecommended(product);
                        }}
                        className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                          isAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Đã thêm!</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Thêm vào giỏ</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/products/${product.id}`);
                        }}
                        className="p-2 border border-slate-200 hover:border-blue-600 text-slate-500 hover:text-blue-600 rounded-xl bg-white transition-colors"
                        title="Xem chi tiết"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3 Trust Commitments */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">100% Động Cơ Dây Đồng</h4>
                <p className="text-xs text-slate-500 mt-1">Chịu nhiệt 200°C, cam kết bảo hành chính hãng từ 12-24 tháng.</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Giao Hàng Toàn Quốc 24-48h</h4>
                <p className="text-xs text-slate-500 mt-1">Miễn phí vận chuyển cho đơn hàng từ 5.000.000₫.</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Tư Vấn Kỹ Thuật 24/7</h4>
                <p className="text-xs text-slate-500 mt-1">Kỹ sư trưởng tính toán cột áp & lưu lượng giếng miễn phí: 0898.296.336.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // ----------------------------------------------------------------------
  // VIEW: FILLED CART
  // ----------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-50 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
            <Link to="/" className="hover:text-blue-600 transition-colors">Trang chủ</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-800 font-semibold">Giỏ hàng của bạn</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Giỏ Hàng Của Bạn
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Đang có <strong className="text-blue-700">{items.length} mặt hàng</strong> ({totalQuantity} sản phẩm)
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleClearAllWithConfirm}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-rose-50 transition-colors border border-transparent hover:border-rose-200"
              >
                <Trash2 className="w-4 h-4" />
                <span>Xóa sạch giỏ hàng</span>
              </button>

              <button
                onClick={handleContinueShopping}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors border border-blue-200/80"
              >
                + Tiếp tục mua hàng
              </button>
            </div>
          </div>
        </div>

        {/* 2-Column Cart Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Product Items List */}
          <div className="lg:col-span-8 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 sm:p-5 flex flex-col sm:flex-row gap-5 hover:border-blue-300 transition-all"
              >
                {/* Thumbnail */}
                <div 
                  onClick={() => navigate(`/products/${item.id}`)}
                  className="w-full sm:w-28 sm:h-28 aspect-video sm:aspect-square bg-slate-50 rounded-xl p-2 flex items-center justify-center flex-shrink-0 border border-slate-100 cursor-pointer overflow-hidden group"
                >
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                        {item.category || 'Máy bơm nước'}
                      </span>
                      
                      <button
                        onClick={() => onRemove(item.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 rounded-lg hover:bg-rose-50 transition-colors"
                        title="Xóa sản phẩm này"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <h3 
                      onClick={() => navigate(`/products/${item.id}`)}
                      className="text-base font-bold text-slate-900 mt-1 hover:text-blue-600 cursor-pointer transition-colors line-clamp-2"
                    >
                      {item.name}
                    </h3>

                    <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                      <span className="text-slate-400">Đơn giá:</span>
                      <strong className="text-slate-700 font-semibold">{formatPrice(item.price)}</strong>
                    </div>
                  </div>

                  {/* Quantity Stepper & Line Subtotal */}
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
                    <div className="flex items-center border border-slate-300 rounded-xl bg-white shadow-sm overflow-hidden">
                      <button
                        onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        disabled={item.quantity <= 1}
                        className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-slate-600"
                        title="Giảm 1"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-10 text-center font-bold text-sm text-slate-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 transition-colors text-slate-600"
                        title="Tăng 1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="text-[11px] text-slate-400">Thành tiền:</div>
                      <div className="text-base font-extrabold text-blue-700">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Bottom Actions */}
            <div className="pt-2 flex justify-between items-center text-xs text-slate-500">
              <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                100% Sản phẩm chính hãng có hóa đơn & bảo hành
              </span>
              <button
                onClick={handleContinueShopping}
                className="font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <span>Xem thêm các sản phẩm khác</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Order Summary & Checkout Card */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md p-6 sticky top-24 space-y-6">
              
              <div>
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                  Tóm Tắt Đơn Hàng
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Đã bao gồm thuế và các hỗ trợ kỹ thuật
                </p>
              </div>

              {/* Free Shipping Progress Indicator */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-blue-600" />
                    Miễn phí vận chuyển (từ 5 triệu)
                  </span>
                  <strong className={isFreeShipping ? 'text-emerald-600' : 'text-blue-600'}>
                    {freeShippingProgress}%
                  </strong>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
                      isFreeShipping ? 'bg-emerald-500' : 'bg-gradient-to-r from-blue-600 to-cyan-500'
                    }`}
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>

                <p className="text-[11px] text-slate-500 leading-snug">
                  {isFreeShipping ? (
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Chúc mừng! Bạn được MIỄN PHÍ VẬN CHUYỂN toàn quốc!
                    </span>
                  ) : (
                    <>
                      Mua thêm <strong className="text-blue-700">{formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)}</strong> để được Miễn phí giao hàng.
                    </>
                  )}
                </p>
              </div>

              {/* Breakdown */}
              <div className="space-y-3 pt-2 text-sm border-t border-slate-100">
                <div className="flex justify-between text-slate-600">
                  <span>Tạm tính ({totalQuantity} sản phẩm):</span>
                  <span className="font-semibold text-slate-900">{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span className="flex items-center gap-1">
                    Phí vận chuyển:
                  </span>
                  {shipping === 0 ? (
                    <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded text-xs">
                      Miễn phí
                    </span>
                  ) : (
                    <span className="font-semibold text-slate-900">{formatPrice(shipping)}</span>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-baseline justify-between">
                  <div>
                    <div className="text-base font-bold text-slate-900">Tổng thanh toán:</div>
                    <div className="text-[11px] text-slate-400">Thanh toán khi nhận hàng (COD) hoặc chuyển khoản</div>
                  </div>
                  <div className="text-2xl font-black text-blue-700 tracking-tight">
                    {formatPrice(total)}
                  </div>
                </div>
              </div>

              {/* Primary Order Button */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-extrabold py-3.5 px-4 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 text-base"
                >
                  <span>Tiến Hành Đặt Hàng</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={handleContinueShopping}
                  className="w-full bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-bold py-2.5 rounded-xl transition-colors text-xs text-center"
                >
                  Tiếp tục mua hàng
                </button>
              </div>

              {/* Reassurance Checklist */}
              <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Được đồng kiểm tra hàng trước khi nhận</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Bảo hành chính hãng 12-24 tháng 1 đổi 1</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Đổi trả linh hoạt trong 7 ngày nếu có lỗi</span>
                </div>
              </div>

              {/* Direct Callout */}
              <div className="pt-2 text-center bg-blue-50/70 p-3 rounded-xl border border-blue-100">
                <p className="text-[11px] text-slate-600">
                  Cần hỗ trợ đặt hàng nhanh hoặc chiết khấu đại lý?
                </p>
                <a
                  href="tel:+84898296336"
                  className="inline-flex items-center gap-1.5 text-blue-700 font-extrabold text-xs mt-1 hover:underline"
                >
                  <Phone className="w-3.5 h-3.5 text-blue-600" />
                  <span>Hotline: (+84) 898 296 336</span>
                </a>
              </div>

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
          toast.success('Đặt hàng thành công! Đơn hàng của bạn đã được ghi nhận.');
        }}
      />
    </div>
  );
}
