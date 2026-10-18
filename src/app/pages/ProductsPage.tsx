import { useNavigate, useSearchParams } from 'react-router-dom';
import { ProductGrid } from '../components/ProductGrid';
import { Product } from '../types';

export function ProductsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const searchParam = searchParams.get('search');

  const handleProductClick = (product: Product) => {
    navigate(`/products/${product.id}`, { state: { product } });
  };

  return (
    <ProductGrid 
      onProductClick={handleProductClick} 
      initialCategory={categoryParam} 
      initialSearch={searchParam}
    />
  );
}