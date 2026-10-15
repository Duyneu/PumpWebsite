import { useState } from 'react';
import { Star, MessageSquare, User as UserIcon } from 'lucide-react';
import { useReviews } from '../hooks/useDatabase';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'motion/react';

interface ProductReviewsProps {
  productId: string;
}

export function ProductReviews({ productId }: ProductReviewsProps) {
  const { reviews, loading, createReview } = useReviews(productId);
  const { user, isLoggedIn } = useAuth();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);

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

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoggedIn || !user) {
      alert('Vui lòng đăng nhập để đánh giá sản phẩm');
      return;
    }

    if (!comment.trim()) {
      alert('Vui lòng nhập nội dung đánh giá');
      return;
    }

    setSubmitting(true);

    try {
      await createReview({
        productId,
        userId: user.id,
        userName: user.displayName || user.name,
        rating,
        comment: comment.trim(),
      });

      // Reset form
      setRating(5);
      setComment('');
      setShowReviewForm(false);
      alert('Cảm ơn bạn đã đánh giá sản phẩm!');
    } catch (error) {
      console.error('Failed to submit review:', error);
      alert('Không thể gửi đánh giá. Vui lòng thử lại sau.');
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (count: number, interactive: boolean = false) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= (interactive ? (hoveredRating || rating) : count)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer transition-all' : ''}`}
            onClick={interactive ? () => setRating(star) : undefined}
            onMouseEnter={interactive ? () => setHoveredRating(star) : undefined}
            onMouseLeave={interactive ? () => setHoveredRating(0) : undefined}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="py-12 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-64 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Section Header */}
      <div className="mb-8">
        <h2 className="mb-2">Đánh giá sản phẩm</h2>
        <p className="text-gray-600">Chia sẻ trải nghiệm của bạn với sản phẩm này</p>
      </div>

      {/* Rating Summary */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Average Rating */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
          <div className="text-center">
            <div className="text-5xl mb-2">
              {averageRating > 0 ? averageRating.toFixed(1) : '0.0'}
            </div>
            <div className="flex justify-center mb-2">
              {renderStars(Math.round(averageRating))}
            </div>
            <p className="text-gray-600">
              Dựa trên {reviews.length} đánh giá
            </p>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="space-y-3">
          {ratingCounts.map(({ star, count, percentage }) => (
            <div key={star} className="flex items-center gap-3">
              <div className="flex items-center gap-1 w-20">
                <span className="text-sm">{star}</span>
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              </div>
              <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400 transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-sm text-gray-600 w-12 text-right">
                {count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Write Review Button */}
      {isLoggedIn ? (
        <div className="mb-8">
          {!showReviewForm ? (
            <button
              onClick={() => setShowReviewForm(true)}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <MessageSquare className="w-5 h-5" />
              Viết đánh giá
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-gray-50 rounded-2xl p-6"
            >
              <h3 className="mb-4">Viết đánh giá của bạn</h3>
              <form onSubmit={handleSubmitReview} className="space-y-4">
                {/* Rating */}
                <div>
                  <label className="block text-sm mb-2">
                    Đánh giá của bạn
                  </label>
                  {renderStars(rating, true)}
                </div>

                {/* Comment */}
                <div>
                  <label className="block text-sm mb-2">
                    Nhận xét của bạn
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    required
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Đang gửi...' : 'Gửi đánh giá'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowReviewForm(false);
                      setRating(5);
                      setComment('');
                    }}
                    className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Hủy
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </div>
      ) : (
        <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
          <p className="text-blue-800">
            Vui lòng <button className="underline hover:text-blue-900">đăng nhập</button> để viết đánh giá
          </p>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        <h3 className="mb-4">
          Tất cả đánh giá ({reviews.length})
        </h3>

        {reviews.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-2xl">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">Chưa có đánh giá nào</p>
            <p className="text-sm text-gray-500">Hãy là người đầu tiên đánh giá sản phẩm này!</p>
          </div>
        ) : (
          <AnimatePresence>
            {reviews
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              .map((review) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white flex-shrink-0">
                      <UserIcon className="w-6 h-6" />
                    </div>

                    {/* Review Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span>{review.userName}</span>
                        {renderStars(review.rating)}
                      </div>
                      <p className="text-gray-600 leading-relaxed mb-2">
                        {review.comment}
                      </p>
                      <p className="text-sm text-gray-400">
                        {new Date(review.createdAt).toLocaleDateString('vi-VN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
