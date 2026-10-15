import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { ProductDetail } from '../components/ProductDetail';
import { useCart } from '../contexts/CartContext';
import { products } from '../data/products';

export function ProductDetailPage() {
  const { productId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Try to get product from location state first, then from products data
  const product = location.state?.product || products.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="mb-4">Không tìm thấy sản phẩm</h1>
        <button
          onClick={() => navigate('/products')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Quay lại danh sách sản phẩm
        </button>
      </div>
    );
  }

  return (
    <ProductDetail
      product={product}
      onAddToCart={addToCart}
      onBack={() => navigate('/products')}
    />
  );
}
