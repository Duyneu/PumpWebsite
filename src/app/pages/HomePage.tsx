import { useNavigate } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { CategoryShowcase } from '../components/CategoryShowcase';
import { InteractivePumpFinder } from '../components/InteractivePumpFinder';
import { ProductGrid } from '../components/ProductGrid';
import { TechFeatures } from '../components/TechFeatures';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { ConsultationBanner } from '../components/ConsultationBanner';
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
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section: High-impact banner with search, specs showcase and key metrics */}
      <Hero onNavigate={handleNavigate} />

      {/* 2. Visual Category Showcase: 4 core product series with real images and specifications */}
      <CategoryShowcase />

      {/* 3. Smart Pump Finder: Interactive guide for choosing pumps based on specific customer needs */}
      <InteractivePumpFinder />

      {/* 4. Featured & Bestselling Products with category tabs and direct cart addition */}
      <ProductGrid onProductClick={handleProductClick} limit={6} />

      {/* 5. Engineering Quality & Why Choose VOLTOR */}
      <TechFeatures />

      {/* 6. Real Customer & Project Testimonials */}
      <TestimonialsSection />

      {/* 7. Direct Technical Consultation & Wholesale Quote CTA Banner */}
      <ConsultationBanner />
    </div>
  );
}
