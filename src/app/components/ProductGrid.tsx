import { Link } from 'react-router-dom';
import * as motion from 'motion/react-client';
import { Product } from '../types';
import { ShoppingCart, Eye, Check, ShieldCheck, Zap } from 'lucide-react';
import { CategorySidebar } from './CategorySidebar';
import { useState, useEffect, useMemo } from 'react';
import { mainCategories } from '../data/products';
import { LazyImage } from './LazyImage';
import { getEffectiveProducts } from '../utils/productStorage';
import { useCart } from '../contexts/CartContext';
import { toast } from 'sonner';

interface ProductGridProps {
  onProductClick: (product: Product) => void;
  limit?: number;
  initialCategory?: string | null;
  initialSearch?: string | null;
}

export function ProductGrid({ onProductClick, limit, initialCategory, initialSearch }: ProductGridProps) {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState<string>(initialSearch || '');
  const [allProducts, setAllProducts] = useState<Product[]>(() => getEffectiveProducts());
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  // Listen to product changes (adds, edits, deletes)
  useEffect(() => {
    const handleProductsChange = () => {
      setAllProducts(getEffectiveProducts());
    };
    window.addEventListener('voltor_products_changed', handleProductsChange);
    return () => {
      window.removeEventListener('voltor_products_changed', handleProductsChange);
    };
  }, []);
  
  // Set initial category from URL param
  useEffect(() => {
    if (initialCategory) {
      const category = mainCategories.find(cat => cat.id === initialCategory);
      if (category) {
        setSelectedCategory(category.name);
      } else {
        setSelectedCategory(initialCategory);
      }
    }
  }, [initialCategory]);

  useEffect(() => {
    if (initialSearch !== undefined && initialSearch !== null) {
      setSearchFilter(initialSearch);
    }
  }, [initialSearch]);
  
  // Filter products based on selected category & search with memoization
  const displayProducts = useMemo(() => {
    let filtered = allProducts;

    // Filter by category
    if (selectedCategory && selectedCategory !== 'all') {
      const lowerCategory = selectedCategory.toLowerCase();
      filtered = filtered.filter(product => {
        const lowerProductCategory = (product.category || '').toLowerCase();
        const lowerProductName = (product.name || '').toLowerCase();
        
        return lowerProductCategory.includes(lowerCategory) || 
               lowerProductName.includes(lowerCategory) ||
               product.category === selectedCategory;
      });
    }

    // Filter by search query
    if (searchFilter.trim()) {
      const q = searchFilter.trim().toLowerCase();
      filtered = filtered.filter(product => 
        (product.name || '').toLowerCase().includes(q) ||
        (product.id || '').toString().toLowerCase().includes(q) ||
        (product.description || '').toLowerCase().includes(q) ||
        (product.category || '').toLowerCase().includes(q)
      );
    }

    return limit ? filtered.slice(0, limit) : filtered;
  }, [selectedCategory, searchFilter, limit, allProducts]);

  const isLimitedView = Boolean(limit && limit < allProducts.length);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addToCart(product, 1);
    toast.success(`Đã thêm "${product.name}" vào giỏ hàng!`, {
      description: `Đơn giá: ${formatPrice(product.price)}`,
    });

    setAddedIds(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds(prev => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  const homeCategoryTabs = [
    { label: 'Tất cả sản phẩm', value: null },
    { label: '🔥 Hỏa tiễn giếng khoan', value: 'Máy bơm hỏa tiễn' },
    { label: '🌊 Bơm điện chìm', value: 'Máy bơm điện chìm' },
    { label: '⚙️ Bơm ly tâm', value: 'Máy bơm ly tâm' },
    { label: '⚡ Bơm tăng áp', value: 'Máy bơm tăng áp' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold tracking-wide uppercase mb-3 border border-blue-200">
          <Zap className="w-3.5 h-3.5 text-blue-600" />
          Sản Phẩm Chất Lượng Cao
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {isLimitedView ? 'Sản Phẩm Nổi Bật & Bán Chạy' : 'Toàn Bộ Danh Mục Sản Phẩm'}
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto mt-2 text-sm sm:text-base">
          {isLimitedView 
            ? 'Khám phá các model máy bơm nước được các đại lý và nhà thầu tin dùng hàng đầu.' 
            : `Hiện có ${allProducts.length} sản phẩm máy bơm chính hãng đang bán, sẵn hàng phục vụ quý khách.`}
        </p>
      </div>

      {/* Quick category filter tabs on homepage */}
      {isLimitedView && (
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {homeCategoryTabs.map((tab, idx) => {
            const isTabActive = selectedCategory === tab.value || (!selectedCategory && tab.value === null);
            return (
              <button
                key={idx}
                onClick={() => setSelectedCategory(tab.value)}
                className={`text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-200 ${
                  isTabActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-[1.02]'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Active Search/Filter Tag */}
      {(selectedCategory || searchFilter) && (
        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm bg-blue-50/70 border border-blue-200/70 p-3 rounded-xl">
          <span className="text-slate-700 font-medium">Bộ lọc đang áp dụng:</span>
          {selectedCategory && (
            <span className="bg-blue-600 text-white px-2.5 py-0.5 rounded-lg text-xs font-semibold flex items-center gap-1">
              Danh mục: {selectedCategory}
              <button onClick={() => setSelectedCategory(null)} className="hover:text-red-200 ml-1">×</button>
            </span>
          )}
          {searchFilter && (
            <span className="bg-cyan-700 text-white px-2.5 py-0.5 rounded-lg text-xs font-semibold flex items-center gap-1">
              Từ khóa: "{searchFilter}"
              <button onClick={() => setSearchFilter('')} className="hover:text-red-200 ml-1">×</button>
            </span>
          )}
          <button 
            onClick={() => { setSelectedCategory(null); setSearchFilter(''); }}
            className="text-xs text-blue-700 hover:underline font-bold ml-auto"
          >
            Xóa tất cả bộ lọc
          </button>
        </div>
      )}

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
          {displayProducts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200/80 p-8 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-400">
                <ShoppingCart className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Không tìm thấy sản phẩm</h3>
              <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
                Không có sản phẩm nào phù hợp với điều kiện tìm kiếm hoặc danh mục đã chọn.
              </p>
              <button
                onClick={() => { setSelectedCategory(null); setSearchFilter(''); }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-2.5 rounded-xl transition-colors shadow"
              >
                Xem tất cả sản phẩm
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayProducts.map((product, index) => {
                  const isRecentlyAdded = addedIds[product.id];
                  return (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 25 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.4, delay: (index % 6) * 0.06 }}
                      whileHover={{ y: -6 }}
                      className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer border border-slate-200/80 flex flex-col justify-between"
                      onClick={() => onProductClick(product)}
                    >
                      {/* Product Image Container */}
                      <div className="aspect-[4/3] overflow-hidden bg-slate-50 relative p-4 flex items-center justify-center">
                        <span className="absolute top-3 left-3 bg-white/95 backdrop-blur border border-slate-200/80 text-blue-700 font-bold text-[11px] px-2.5 py-0.5 rounded-lg shadow-sm z-10">
                          {product.category || 'Máy bơm'}
                        </span>
                        
                        {product.inStock && (
                          <span className="absolute top-3 right-3 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-md z-10 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            Sẵn kho
                          </span>
                        )}

                        <LazyImage
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-500 ease-out"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          {/* Quality Tag */}
                          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 mb-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                            <span>100% Động cơ dây đồng • Bảo hành 24T</span>
                          </div>

                          {/* Product Name */}
                          <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                            {product.name}
                          </h3>

                          {/* Short Description */}
                          <p className="text-slate-500 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                            {product.description}
                          </p>
                        </div>

                        {/* Specs & Pricing & Actions */}
                        <div className="mt-4 pt-3 border-t border-slate-100">
                          {/* Specs Grid */}
                          <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 mb-3 bg-slate-50 p-2 rounded-xl border border-slate-100">
                            <div>
                              <span className="text-slate-400">Công suất:</span>{' '}
                              <strong className="text-slate-800">{product.specs.power || 'Chuẩn'}</strong>
                            </div>
                            <div>
                              <span className="text-slate-400">Lưu lượng:</span>{' '}
                              <strong className="text-slate-800">{product.specs.flow || 'Tiêu chuẩn'}</strong>
                            </div>
                            {product.specs.head && (
                              <div className="col-span-2">
                                <span className="text-slate-400">Cột áp:</span>{' '}
                                <strong className="text-blue-700">{product.specs.head}</strong>
                              </div>
                            )}
                          </div>

                          {/* Price */}
                          <div className="flex items-baseline justify-between mb-3">
                            <span className="text-xs text-slate-400">Giá bán:</span>
                            <div className="text-blue-700 font-extrabold text-lg">
                              {formatPrice(product.price)}
                            </div>
                          </div>

                          {/* 2 Action Buttons */}
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={(e) => handleAddToCart(e, product)}
                              className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                                isRecentlyAdded
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow'
                              }`}
                            >
                              {isRecentlyAdded ? (
                                <>
                                  <Check className="w-4 h-4" />
                                  <span>Đã thêm!</span>
                                </>
                              ) : (
                                <>
                                  <ShoppingCart className="w-4 h-4" />
                                  <span>Thêm giỏ</span>
                                </>
                              )}
                            </button>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onProductClick(product);
                              }}
                              className="py-2 px-3 rounded-xl font-semibold text-xs border border-slate-300 hover:border-blue-600 text-slate-700 hover:text-blue-600 bg-white hover:bg-blue-50/50 transition-colors flex items-center justify-center gap-1.5"
                            >
                              <Eye className="w-4 h-4" />
                              <span>Chi tiết</span>
                            </button>
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom Counter & Link */}
              {isLimitedView && (
                <div className="text-center mt-12 space-y-4">
                  <p className="text-slate-600 text-sm">
                    Hiển thị <strong>{displayProducts.length}</strong> sản phẩm nổi bật trong tổng số <strong>{allProducts.length}</strong> sản phẩm đang bán
                  </p>
                  <div>
                    <Link
                      to="/products"
                      className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                      Xem tất cả {allProducts.length} sản phẩm →
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