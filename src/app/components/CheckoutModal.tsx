import { useState } from 'react';
import { X, CheckCircle2, Truck, CreditCard, ShieldCheck, ShoppingBag, Phone, Mail, MapPin, User, FileText } from 'lucide-react';
import { CartItem } from '../contexts/CartContext';
import { createOrder, Order } from '../utils/orders';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  onOrderSuccess: (order: Order) => void;
}

export function CheckoutModal({
  isOpen,
  onClose,
  items,
  subtotal,
  shipping,
  total,
  onOrderSuccess,
}: CheckoutModalProps) {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'banking'>('cod');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!customerName.trim()) {
      errs.customerName = 'Vui lòng nhập họ và tên';
    }
    if (!phone.trim()) {
      errs.phone = 'Vui lòng nhập số điện thoại';
    } else {
      const cleanPhone = phone.replace(/\s+/g, '');
      if (!/^(0|\+84)[3|5|7|8|9][0-9]{8}$/.test(cleanPhone) && cleanPhone.length < 9) {
        errs.phone = 'Số điện thoại không hợp lệ (9-11 số)';
      }
    }
    if (!email.trim()) {
      errs.email = 'Vui lòng nhập email nhận thông báo';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Email không đúng định dạng';
    }
    if (!address.trim()) {
      errs.address = 'Vui lòng nhập địa chỉ nhận hàng chi tiết';
    } else if (address.trim().length < 6) {
      errs.address = 'Địa chỉ nhận hàng quá ngắn';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const order = createOrder({
        customerName,
        phone,
        email,
        address,
        notes: notes ? `[Thanh toán: ${paymentMethod === 'cod' ? 'COD - Khi nhận hàng' : 'Chuyển khoản'}] ${notes}` : `[Thanh toán: ${paymentMethod === 'cod' ? 'COD - Khi nhận hàng' : 'Chuyển khoản'}]`,
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          category: item.category,
        })),
        subtotal,
        shipping,
        total,
      });

      setIsSubmitting(false);
      setSubmittedOrder(order);
    }, 400);
  };

  const handleFinish = () => {
    if (submittedOrder) {
      onOrderSuccess(submittedOrder);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-blue-300" />
            </div>
            <div>
              <h2 className="text-lg font-bold">
                {submittedOrder ? 'Xác Nhận Đặt Hàng Thành Công' : 'Thông Tin Đặt Hàng & Giao Nhận'}
              </h2>
              <p className="text-xs text-blue-200">Hệ thống máy bơm nước chính hãng VOLTOR</p>
            </div>
          </div>
          <button
            onClick={submittedOrder ? handleFinish : onClose}
            className="text-gray-300 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {submittedOrder ? (
            /* Success View */
            <div className="text-center py-4 space-y-6">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
                  Đã ghi nhận đơn hàng
                </span>
                <h3 className="text-2xl font-bold text-gray-900">
                  Cảm Ơn Quý Khách Đã Đặt Hàng!
                </h3>
                <p className="text-gray-600 text-sm mt-1 max-w-md mx-auto">
                  Mã đơn hàng: <strong className="text-blue-600 font-mono text-base">{submittedOrder.id}</strong>.
                  Thông tin đơn hàng đã được chuyển tới ban quản trị VOLTOR.
                </p>
              </div>

              {/* Order Recap */}
              <div className="bg-gray-50 rounded-xl p-4 sm:p-5 border border-gray-200 text-left text-sm space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-gray-200 font-semibold text-gray-800">
                  <span>Thông tin nhận hàng</span>
                  <span className="text-xs text-gray-500 font-normal">{submittedOrder.createdAt}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-600">
                  <div><strong>Người nhận:</strong> {submittedOrder.customerName}</div>
                  <div><strong>Số điện thoại:</strong> {submittedOrder.phone}</div>
                  <div><strong>Email:</strong> {submittedOrder.email}</div>
                  <div><strong>Địa chỉ:</strong> {submittedOrder.address}</div>
                </div>

                <div className="pt-2 border-t border-gray-200">
                  <div className="text-xs font-medium text-gray-500 mb-2">Sản phẩm ({submittedOrder.items.length}):</div>
                  <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                    {submittedOrder.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between text-xs text-gray-700">
                        <span className="truncate pr-2">• {it.name} <span className="text-gray-400">x{it.quantity}</span></span>
                        <span className="font-semibold text-gray-900 flex-shrink-0">{formatPrice(it.price * it.quantity)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-200 flex justify-between items-center text-base font-bold text-gray-900">
                  <span>Tổng tiền thanh toán:</span>
                  <span className="text-blue-600">{formatPrice(submittedOrder.total)}</span>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-blue-900 text-left flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Bộ phận chăm sóc khách hàng VOLTOR sẽ liên hệ sớm nhất</p>
                  <p className="text-blue-700 mt-0.5">
                    Chúng tôi sẽ gọi điện qua số <strong>{submittedOrder.phone}</strong> để xác nhận thời gian giao hàng và xuất hóa đơn VAT (nếu cần).
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleFinish}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition-colors"
              >
                Tiếp tục mua sắm
              </button>
            </div>
          ) : (
            /* Checkout Form View */
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Order mini summary */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs">
                <div className="flex items-center justify-between text-slate-700 font-semibold mb-2">
                  <span>Giỏ hàng ({items.reduce((acc, it) => acc + it.quantity, 0)} sản phẩm)</span>
                  <span className="text-blue-600 text-sm font-bold">{formatPrice(total)}</span>
                </div>
                <div className="space-y-1 text-slate-500 max-h-24 overflow-y-auto">
                  {items.map((it) => (
                    <div key={it.id} className="flex justify-between items-center">
                      <span className="truncate pr-2">{it.name} (x{it.quantity})</span>
                      <span className="text-slate-800 font-medium flex-shrink-0">{formatPrice(it.price * it.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold text-gray-900 flex items-center gap-1.5 pb-1 border-b">
                  <User className="w-4 h-4 text-blue-600" /> Thông tin liên hệ & Giao nhận
                </h4>

                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Họ và tên quý khách <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => {
                        setCustomerName(e.target.value);
                        if (errors.customerName) setErrors({ ...errors, customerName: '' });
                      }}
                      placeholder="Ví dụ: Nguyễn Văn An"
                      className={`w-full pl-9 pr-3 py-2 text-sm border rounded-lg outline-none focus:ring-2 transition-all ${
                        errors.customerName
                          ? 'border-red-400 focus:ring-red-200'
                          : 'border-gray-300 focus:ring-blue-100 focus:border-blue-500'
                      }`}
                    />
                  </div>
                  {errors.customerName && <p className="text-red-500 text-xs mt-1">{errors.customerName}</p>}
                </div>

                {/* Phone & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Số điện thoại liên hệ <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (errors.phone) setErrors({ ...errors, phone: '' });
                        }}
                        placeholder="Ví dụ: 0912 345 678"
                        className={`w-full pl-9 pr-3 py-2 text-sm border rounded-lg outline-none focus:ring-2 transition-all ${
                          errors.phone
                            ? 'border-red-400 focus:ring-red-200'
                            : 'border-gray-300 focus:ring-blue-100 focus:border-blue-500'
                        }`}
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Email nhận xác nhận đơn <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors({ ...errors, email: '' });
                        }}
                        placeholder="email@example.com"
                        className={`w-full pl-9 pr-3 py-2 text-sm border rounded-lg outline-none focus:ring-2 transition-all ${
                          errors.email
                            ? 'border-red-400 focus:ring-red-200'
                            : 'border-gray-300 focus:ring-blue-100 focus:border-blue-500'
                        }`}
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Địa chỉ nhận hàng chi tiết <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <textarea
                      rows={2}
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                        if (errors.address) setErrors({ ...errors, address: '' });
                      }}
                      placeholder="Số nhà, đường phố, phường/xã, quận/huyện, tỉnh/thành phố"
                      className={`w-full pl-9 pr-3 py-2 text-sm border rounded-lg outline-none focus:ring-2 transition-all ${
                        errors.address
                          ? 'border-red-400 focus:ring-red-200'
                          : 'border-gray-300 focus:ring-blue-100 focus:border-blue-500'
                      }`}
                    />
                  </div>
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Ghi chú đơn hàng (Tùy chọn)
                  </label>
                  <div className="relative">
                    <FileText className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Ví dụ: Giao vào giờ hành chính, gọi điện trước khi giao hàng 15 phút..."
                      className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    Phương thức thanh toán
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label
                      className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        paymentMethod === 'cod'
                          ? 'border-blue-500 bg-blue-50/50 shadow-sm'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="mt-0.5 text-blue-600 focus:ring-blue-500"
                      />
                      <div>
                        <div className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                          <Truck className="w-3.5 h-3.5 text-blue-600" />
                          Thanh toán khi nhận hàng (COD)
                        </div>
                        <p className="text-[11px] text-gray-500 mt-0.5">
                          Kiểm tra máy bơm trước khi thanh toán tiền mặt cho nhân viên giao hàng.
                        </p>
                      </div>
                    </label>

                    <label
                      className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        paymentMethod === 'banking'
                          ? 'border-blue-500 bg-blue-50/50 shadow-sm'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'banking'}
                        onChange={() => setPaymentMethod('banking')}
                        className="mt-0.5 text-blue-600 focus:ring-blue-500"
                      />
                      <div>
                        <div className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                          <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
                          Chuyển khoản ngân hàng
                        </div>
                        <p className="text-[11px] text-gray-500 mt-0.5">
                          Chuyển khoản qua số tài khoản công ty. Nhân viên sẽ gửi mã QR xác nhận.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-gray-500">Tổng thanh toán:</span>
                  <div className="text-lg font-bold text-blue-600 leading-tight">
                    {formatPrice(total)}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 text-sm font-medium transition-colors"
                  >
                    Quay lại
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        Đang xử lý...
                      </>
                    ) : (
                      'Xác Nhận Đặt Hàng'
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
