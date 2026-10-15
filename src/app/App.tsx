import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { LoadingSpinner } from './components/LoadingSpinner';

// Lazy loaded page components
const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const ProductsPage = lazy(() => import('./pages/ProductsPage').then(m => ({ default: m.ProductsPage })));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage').then(m => ({ default: m.ProductDetailPage })));
const CartPage = lazy(() => import('./pages/CartPage').then(m => ({ default: m.CartPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const LoginPage = lazy(() => import('./pages/LoginPage').then(m => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import('./pages/RegisterPage').then(m => ({ default: m.RegisterPage })));
const ProfileSetupPage = lazy(() => import('./pages/ProfileSetupPage').then(m => ({ default: m.ProfileSetupPage })));
const ProfilePage = lazy(() => import('./pages/ProfilePage').then(m => ({ default: m.ProfilePage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then(m => ({ default: m.TermsPage })));
const MockOAuthPage = lazy(() => import('./pages/MockOAuthPage').then(m => ({ default: m.MockOAuthPage })));
const AuthCallbackPage = lazy(() => import('./pages/AuthCallbackPage').then(m => ({ default: m.AuthCallbackPage })));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const AdminProductsPage = lazy(() => import('./pages/AdminProductsPage').then(m => ({ default: m.AdminProductsPage })));
const AdminProductFormPage = lazy(() => import('./pages/AdminProductFormPage').then(m => ({ default: m.AdminProductFormPage })));

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="products" element={<ProductsPage />} />
                <Route path="products/:productId" element={<ProductDetailPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="cart" element={<CartPage />} />
              </Route>

              {/* Auth Routes (no layout) */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/profile-setup" element={<ProfileSetupPage />} />
              <Route path="/mock-oauth" element={<MockOAuthPage />} />
              <Route path="/auth/callback" element={<AuthCallbackPage />} />
              
              {/* Profile & Terms (with layout) */}
              <Route path="/" element={<Layout />}>
                <Route path="profile" element={<ProfilePage />} />
                <Route path="terms" element={<TermsPage />} />
              </Route>

              {/* Admin Routes (no layout - full screen) */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/products" element={<AdminProductsPage />} />
              <Route path="/admin/products/new" element={<AdminProductFormPage />} />
              <Route path="/admin/products/edit/:id" element={<AdminProductFormPage />} />

              {/* 404 - Redirect to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}