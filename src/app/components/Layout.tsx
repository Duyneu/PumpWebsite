import { useState, lazy, Suspense } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { ChatbotButton } from './ChatbotButton';
import { PageTransition } from './PageTransition';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { Product } from '../types';

// Lazy load heavy Chatbot component on demand
const Chatbot = lazy(() => import('./Chatbot').then(m => ({ default: m.Chatbot })));

export function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, logout } = useAuth();
  const { totalItems } = useCart();
  const [chatbotOpen, setChatbotOpen] = useState(false);

  const handleNavigate = (page: string) => {
    // Map old page names to routes
    const routeMap: { [key: string]: string } = {
      'home': '/',
      'about': '/about',
      'products': '/products',
      'contact': '/contact',
      'cart': '/cart',
    };

    navigate(routeMap[page] || `/${page}`);
  };

  const handleShowLogin = () => {
    navigate('/login');
  };

  const handleProductClick = (product: Product) => {
    navigate(`/products/${product.id}`, { state: { product } });
    setChatbotOpen(false);
  };

  // Get current page from location
  const getCurrentPage = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path.startsWith('/products')) return 'products';
    if (path === '/cart') return 'cart';
    if (path === '/contact') return 'contact';
    if (path === '/about') return 'about';
    return 'home';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        currentPage={getCurrentPage()}
        onNavigate={handleNavigate}
        cartItemCount={totalItems}
        isLoggedIn={isLoggedIn}
        onLogout={logout}
        onShowLogin={handleShowLogin}
      />

      <main className="flex-1">
        <PageTransition pageKey={location.pathname}>
          <Outlet />
        </PageTransition>
      </main>

      <Footer />

      {/* Chatbot Button */}
      <ChatbotButton
        isOpen={chatbotOpen}
        onClick={() => setChatbotOpen(!chatbotOpen)}
      />

      {/* Single Responsive Chatbot Instance */}
      {chatbotOpen && (
        <Suspense fallback={null}>
          <div className="fixed inset-0 bg-black/50 z-50 md:bg-transparent md:inset-auto md:bottom-24 md:right-6 md:w-[500px] md:h-[700px]">
            <div className="absolute inset-x-0 bottom-0 h-[85vh] md:relative md:inset-auto md:h-full">
              <Chatbot
                onClose={() => setChatbotOpen(false)}
                onProductClick={handleProductClick}
              />
            </div>
          </div>
        </Suspense>
      )}
    </div>
  );
}