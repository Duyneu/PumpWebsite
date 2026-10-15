import { useNavigate } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { ProductGrid } from '../components/ProductGrid';
import { Product } from '../types';

export function HomePage() {
  const navigate = useNavigate();

  const handleNavigate = (page: string) => {
    const routeMap: { [key: string]: string } = {
      'products': '/products',
      'contact': '/contact',
      'about': '/about',
    };
    navigate(routeMap[page] || `/${page}`);
  };

  const handleProductClick = (product: Product) => {
    navigate(`/products/${product.id}`, { state: { product } });
  };

  return (
    <>
      <Hero onNavigate={handleNavigate} />
      <ProductGrid onProductClick={handleProductClick} limit={6} />
    </>
  );
}
