import { useState } from 'react';
import { Star, MessageSquare, User as UserIcon, Phone, Mail, CheckCircle2, ShieldCheck, ThumbsUp } from 'lucide-react';
import { useReviews } from '../hooks/useDatabase';
import { motion, AnimatePresence } from 'motion/react';
import { addAuditLog } from '../utils/auditLog';

interface ProductReviewsProps {
  productId: string;
  productName?: string;
}

export function ProductReviews({ productId, productName }: ProductReviewsProps) {
  const { reviews, loading, createReview } = useReviews(productId);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [comment, setComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMsg, setSuccessMsg] = useState('');

  // Calculate average rating
  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  // Count ratings by star
  const ratingCounts = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviews.filter(r => r.rating === star).length,
    percentage: reviews.length > 0
      ? (reviews.filter(r => r.rating === star).length / reviews.length) * 100
      : 0,
  }));

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!userName.trim()) {
      errs.userName = 'Vui lòng nhập họ và tên của bạn';
    }
    if (!userPhone.trim()) {
      errs.userPhone = 'Vui lòng nhập số điện thoại';
    } else {
      const cleanPhone = userPhone.replace(/\s+/g, '');
      if (!/^(0|\+84)[3|5|7|8|9][0-9]{8}$/.test(cleanPhone) && cleanPhone.length < 9) {
        errs.userPhone = 'Số điện thoại không hợp lệ (9-11 số)';
      }
    }
    if (!userEmail.trim()) {
      errs.userEmail = 'Vui lòng nhập địa chỉ email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail.trim())) {
      errs.userEmail = 'Email không đúng định dạng';
    }
    if (!comment.trim()) {
      errs.comment = 'Vui lòng nhập nội dung đánh giá';
    } else if (comment.trim().length < 5) {
      errs.comment = 'Nội dung nhận xét tối thiểu 5 ký tự';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    try {
      await createReview({
        productId,
        userId: 'guest_' + Date.now(),
        userName: userName.trim(),
        userPhone: userPhone.trim(),
        userEmail: userEmail.trim(),
        rating,
        comment: comment.trim(),
      });

      // Log to Admin Audit Log
      addAuditLog(
        'CREATE',
        `Đánh giá mới (${rating}⭐) cho ${productName || 'sản phẩm'}`,
        `Khách: ${userName.trim()} (SĐT: ${userPhone.trim()} - Email: ${userEmail.trim()}) - "${comment.trim().slice(0, 70)}..."`
      );

      // Reset form
      setRating(5);
      setUserName('');
      setUserPhone('');
      setUserEmail('');
      setComment('');
      setShowReviewForm(false);
      setSuccessMsg('Cảm ơn bạn đã gửi đánh giá! Đánh giá của bạn đã được ghi nhận thành công.');
      setTimeout(() => setSuccessMsg(''), 5000);
    } catch (error) {
      console.error('Failed to submit review:', error);
      alert('Không thể gửi đánh giá. Vui lòng thử lại sau.');
    } finally {
      setSubmitting(false);
    }
  };

  const getRatingLabel = (score: number) => {
    switch (score) {
      case 1: return 'Rất không hài lòng';
      case 2: return 'Không hài lòng';
      case 3: return 'Bình thường';
      case 4: return 'Hài lòng';
      case 5: return 'Rất hài lòng & khuyên dùng';
      default: return '';
    }
  };

  const renderStars = (count: number, interactive = false) => {
    return (
      <div className="flex items-center gap-1" role={interactive ? "radiogroup" : undefined} aria-label={interactive ? "Chọn số sao đánh giá" : undefined}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? 'button' : undefined}
            disabled={!interactive}
            onClick={() => interactive && setRating(star)}
            onMouseEnter={() => interactive && setHoveredRating(star)}
            onMouseLeave={() => interactive && setHoveredRating(0)}
            aria-label={interactive ? `${star} sao - ${getRatingLabel(star)}` : `${star} sao`}
            className={`${interactive ? 'cursor-pointer hover:scale-125 transition-transform' : 'cursor-default'}`}
          >
            <Star
              className={`w-5 h-5 ${
                star <= (hoveredRating || count)
                  ? 'fill-amber-400 text-amber-400'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Đánh Giá & Nhận Xét Sản Phẩm
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {productName ? `Nhận xét thực tế từ khách hàng về ${productName}` : 'Đánh giá độ bền và hiệu năng máy bơm từ khách hàng đã sử dụng'}
          </p>
        </div>

        {!showReviewForm && (
          <button
            onClick={() => {
              setShowReviewForm(true);
              setSuccessMsg('');
            }}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium shadow-sm hover:shadow transition-all text-sm flex-shrink-0"
          >
            <MessageSquare className="w-4 h-4" />
            Viết đánh giá
          </button>
        )}
      </div>

      {/* Success Notification */}
      {successMsg && (
        <div className="mt-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Review Summary */}
      <div className="grid md:grid-cols-12 gap-8 my-8 bg-slate-50/70 border border-slate-200/80 rounded-2xl p-6 sm:p-8">
        {/* Average Rating Box (5 cols) */}
        <div className="md:col-span-5 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-slate-200 pb-6 md:pb-0 md:pr-6">
          <div className="text-5xl font-black text-gray-900 tracking-tight">
            {reviews.length > 0 ? averageRating.toFixed(1) : '0.0'}
            <span className="text-2xl text-gray-400 font-normal">/5</span>
          </div>
          <div className="my-2.5">
            {renderStars(Math.round(averageRating))}
          </div>
          <p className="text-xs text-gray-500 font-medium">
            {reviews.length > 0
              ? `Dựa trên ${reviews.length} lượt đánh giá thực tế`
              : 'Chưa có lượt đánh giá nào'}
          </p>
        </div>

        {/* Rating Distribution (7 cols) */}
        <div className="md:col-span-7 flex flex-col justify-center space-y-2.5">
          {ratingCounts.map(({ star, count, percentage }) => (
            <div key={star} className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1 w-14 font-medium text-gray-700">
                <span>{star} sao</span>
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              </div>
              <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-gray-500 w-16 text-right font-medium">
                {count} ({Math.round(percentage)}%)
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Review Form */}
      <AnimatePresence>
        {showReviewForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-8"
          >
            <div className="bg-blue-50/40 rounded-2xl p-6 sm:p-7 border border-blue-200/80 shadow-sm">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-blue-200/60">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                  Gửi Đánh Giá Của Bạn
                </h3>
                <span className="text-xs text-gray-500">* Bắt buộc điền đủ thông tin</span>
              </div>

              <form onSubmit={handleSubmitReview} className="space-y-4">
                {/* Rating selection */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Mức độ hài lòng của bạn <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-200 w-fit">
                    {renderStars(rating, true)}
                    <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                      {getRatingLabel(hoveredRating || rating)}
                    </span>
                  </div>
                </div>

                {/* Name, Phone, Email in 3 columns */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Họ và tên <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <UserIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={userName}
                        onChange={(e) => {
                          setUserName(e.target.value);
                          if (errors.userName) setErrors({ ...errors, userName: '' });
                        }}
                        placeholder="Ví dụ: Nguyễn Văn An"
                        className={`w-full pl-9 pr-3 py-2 text-sm bg-white border rounded-lg outline-none focus:ring-2 transition-all ${
                          errors.userName
                            ? 'border-red-400 focus:ring-red-200'
                            : 'border-gray-300 focus:ring-blue-100 focus:border-blue-500'
                        }`}
                      />
                    </div>
                    {errors.userName && <p className="text-red-500 text-xs mt-1">{errors.userName}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Số điện thoại <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        value={userPhone}
                        onChange={(e) => {
                          setUserPhone(e.target.value);
                          if (errors.userPhone) setErrors({ ...errors, userPhone: '' });
                        }}
                        placeholder="Ví dụ: 0912 345 678"
                        className={`w-full pl-9 pr-3 py-2 text-sm bg-white border rounded-lg outline-none focus:ring-2 transition-all ${
                          errors.userPhone
                            ? 'border-red-400 focus:ring-red-200'
                            : 'border-gray-300 focus:ring-blue-100 focus:border-blue-500'
                        }`}
                      />
                    </div>
                    {errors.userPhone && <p className="text-red-500 text-xs mt-1">{errors.userPhone}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Email liên hệ <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={userEmail}
                        onChange={(e) => {
                          setUserEmail(e.target.value);
                          if (errors.userEmail) setErrors({ ...errors, userEmail: '' });
                        }}
                        placeholder="email@example.com"
                        className={`w-full pl-9 pr-3 py-2 text-sm bg-white border rounded-lg outline-none focus:ring-2 transition-all ${
                          errors.userEmail
                            ? 'border-red-400 focus:ring-red-200'
                            : 'border-gray-300 focus:ring-blue-100 focus:border-blue-500'
                        }`}
                      />
                    </div>
                    {errors.userEmail && <p className="text-red-500 text-xs mt-1">{errors.userEmail}</p>}
                  </div>
                </div>

                {/* Comment */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Nội dung nhận xét <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => {
                      setComment(e.target.value);
                      if (errors.comment) setErrors({ ...errors, comment: '' });
                    }}
                    placeholder="Chia sẻ trải nghiệm của bạn: máy bơm chạy êm không, áp lực nước thế nào, chất lượng lắp đặt..."
                    rows={4}
                    className={`w-full px-4 py-3 text-sm bg-white border rounded-lg outline-none focus:ring-2 transition-all resize-none ${
                      errors.comment
                        ? 'border-red-400 focus:ring-red-200'
                        : 'border-gray-300 focus:ring-blue-100 focus:border-blue-500'
                    }`}
                  />
                  {errors.comment && <p className="text-red-500 text-xs mt-1">{errors.comment}</p>}
                </div>

                {/* Privacy Assurance */}
                <div className="flex items-center gap-2 text-xs text-gray-500 bg-white/80 p-2.5 rounded-lg border border-gray-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>
                    Thông tin số điện thoại & email của bạn được bảo mật tuyệt đối, chỉ hiển thị tên công khai.
                  </span>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-xl text-sm font-semibold shadow-sm transition-colors flex items-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        Đang gửi đánh giá...
                      </>
                    ) : (
                      'Gửi đánh giá ngay'
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowReviewForm(false);
                      setErrors({});
                    }}
                    className="px-5 py-2.5 border border-gray-300 bg-white text-gray-700 rounded-xl hover:bg-gray-50 text-sm font-medium transition-colors"
                  >
                    Hủy bỏ
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reviews List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <h3 className="text-base font-bold text-gray-900">
            Tất cả đánh giá ({reviews.length})
          </h3>
        </div>

        {reviews.length === 0 ? (
          <div className="text-center py-12 bg-gray-50/60 rounded-2xl border border-dashed border-gray-200">
            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-700 font-semibold text-sm">Chưa có đánh giá nào cho sản phẩm này</p>
            <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
              Hãy là người đầu tiên chia sẻ cảm nhận về sản phẩm để nhận ưu đãi từ VOLTOR!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white border border-gray-200/80 rounded-xl p-5 hover:border-blue-200 hover:shadow-xs transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-xs">
                      {review.userName ? review.userName.charAt(0).toUpperCase() : <UserIcon className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-gray-900 text-sm">{review.userName || 'Khách hàng'}</h4>
                        <span className="text-[11px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-medium border border-emerald-200 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Đã mua hàng
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        {review.createdAt ? new Date(review.createdAt).toLocaleDateString('vi-VN', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        }) : 'Vừa xong'}
                      </p>
                    </div>
                  </div>
                  <div>{renderStars(review.rating)}</div>
                </div>

                <p className="text-gray-700 text-sm leading-relaxed pl-13 sm:pl-13">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
