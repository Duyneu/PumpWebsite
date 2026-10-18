import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { CartProvider } from './contexts/CartContext';
import { LoadingSpinner } from './components/LoadingSpinner';

// Lazy loaded page components
const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const ProductsPage = lazy(() => import('./pages/ProductsPage').then(m => ({ default: m.ProductsPage })));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage').then(m => ({ default: m.ProductDetailPage })));
const CartPage = lazy(() => import('./pages/CartPage').then(m => ({ default: m.CartPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then(m => ({ default: m.TermsPage })));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const AdminProductsPage = lazy(() => import('./pages/AdminProductsPage').then(m => ({ default: m.AdminProductsPage })));
const AdminProductFormPage = lazy(() => import('./pages/AdminProductFormPage').then(m => ({ default: m.AdminProductFormPage })));

import { AdminGuard } from './components/AdminGuard';

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Public Store Routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="products/:productId" element={<ProductDetailPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="terms" element={<TermsPage />} />
            </Route>

            {/* Admin Management Routes - Password Protected */}
            <Route path="/admin" element={<AdminGuard><AdminDashboard /></AdminGuard>} />
            <Route path="/admin/products" element={<AdminGuard><AdminProductsPage /></AdminGuard>} />
            <Route path="/admin/products/new" element={<AdminGuard><AdminProductFormPage /></AdminGuard>} />
            <Route path="/admin/products/edit/:id" element={<AdminGuard><AdminProductFormPage /></AdminGuard>} />

            {/* 404 - Redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </CartProvider>
    </BrowserRouter>
  );
}