import { Link } from 'react-router-dom';
import * as motion from 'motion/react-client';
import { products } from '../data/products';
import { Product } from '../types';
import { ShoppingCart } from 'lucide-react';
import { CategorySidebar } from './CategorySidebar';
import { useState, useEffect, useMemo } from 'react';
import { mainCategories } from '../data/products';
import { LazyImage } from './LazyImage';

interface ProductGridProps {
  onProductClick: (product: Product) => void;
  limit?: number;
  initialCategory?: string | null;
}

export function ProductGrid({ onProductClick, limit, initialCategory }: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Set initial category from URL param
  useEffect(() => {
    if (initialCategory) {
      // Find the category name from the category ID
      const category = mainCategories.find(cat => cat.id === initialCategory);
      if (category) {
        setSelectedCategory(category.name);
      }
    }
  }, [initialCategory]);
  
  // Filter products based on selected category with memoization
  const displayProducts = useMemo(() => {
    if (!selectedCategory) {
      return limit ? products.slice(0, limit) : products;
    }

    const lowerCategory = selectedCategory.toLowerCase();
    const filtered = products.filter(product => {
      const lowerProductCategory = product.category.toLowerCase();
      const lowerProductName = product.name.toLowerCase();
      
      // Check if product matches the selected category
      return lowerProductCategory.includes(lowerCategory) || 
             lowerProductName.includes(lowerCategory) ||
             product.category === selectedCategory;
    });

    return limit ? filtered.slice(0, limit) : filtered;
  }, [selectedCategory, limit]);
  const isLimitedView = limit && limit < products.length;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="text-center mb-12">
        <h2 className="mb-4">
          {isLimitedView ? 'Sản phẩm nổi bật' : 'Tất cả sản phẩm'}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Khám phá bộ sưu tập máy bơm nước đa dạng của chúng tôi, 
          từ máy bơm gia đình đến công nghiệp
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Category Sidebar - Only show on full product page */}
        {!limit && (
          <aside className="lg:w-80 flex-shrink-0">
            <CategorySidebar
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
            />
          </aside>
        )}

        {/* Products Grid */}
        <div className="flex-1">
          {selectedCategory && (
            <div className="mb-6 flex items-center gap-2 text-sm">
              <span className="text-gray-600">Đang lọc theo:</span>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                {selectedCategory}
              </span>
            </div>
          )}

          {displayProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <ShoppingCart className="w-16 h-16 mx-auto mb-4" />
              </div>
              <h3 className="mb-2">Không tìm thấy sản phẩm</h3>
              <p className="text-gray-600 mb-6">
                Không có sản phẩm nào phù hợp với danh mục đã chọn
              </p>
              <button
                onClick={() => setSelectedCategory(null)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Xem tất cả sản phẩm
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {displayProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5, delay: (index % 6) * 0.08, ease: 'easeOut' }}
                    whileHover={{ y: -6 }}
                    className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100 flex flex-col"
                    onClick={() => onProductClick(product)}
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative">
                      <LazyImage
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                      />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-2">{product.category}</div>
                      <h3 className="mb-2 text-base font-semibold group-hover:text-blue-600 transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="mt-auto">
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-blue-600 font-bold text-lg">{formatPrice(product.price)}</div>
                          {product.inStock && (
                            <span className="text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                              Còn hàng
                            </span>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 mb-4 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                          <div><span className="text-gray-400">Công suất:</span> <span className="font-medium text-gray-700">{product.specs.power}</span></div>
                          <div><span className="text-gray-400">Lưu lượng:</span> <span className="font-medium text-gray-700">{product.specs.flow}</span></div>
                        </div>
                        <button
                          className="w-full bg-blue-600 text-white font-medium py-2.5 rounded-lg hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow"
                          onClick={(e) => {
                            e.stopPropagation();
                            onProductClick(product);
                          }}
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Xem chi tiết
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {isLimitedView && (
                <div className="text-center mt-12 space-y-4">
                  <p className="text-gray-600">
                    Hiển thị <strong>{displayProducts.length}</strong> sản phẩm nổi bật trong tổng số <strong>{products.length}</strong> sản phẩm
                  </p>
                  <div>
                    <Link
                      to="/products"
                      className="inline-flex items-center justify-center bg-blue-600 text-white font-medium px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-sm hover:shadow"
                    >
                      Xem tất cả {products.length} sản phẩm →
                    </Link>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}