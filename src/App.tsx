import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Layouts
import MainLayout from './components/layouts/MainLayout';
import AdminLayout from './components/layouts/AdminLayout';

// Pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ArtisansPage from './pages/ArtisansPage';
import ArtisanDetailPage from './pages/ArtisanDetailPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import RegisterArtisanPage from './pages/auth/RegisterArtisanPage';
import CartPage from './pages/cart/CartPage';
import CheckoutPage from './pages/cart/CheckoutPage';
import ProfilePage from './pages/profile/ProfilePage';
import ArtisanDashboardPage from './pages/dashboard/ArtisanDashboardPage';
import ProductManagementPage from './pages/dashboard/ProductManagementPage';
import OrdersManagementPage from './pages/dashboard/OrdersManagementPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminCategoriesPage from './pages/admin/AdminCategoriesPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="products/:id" element={<ProductDetailPage />} />
              <Route path="artisans" element={<ArtisansPage />} />
              <Route path="artisans/:id" element={<ArtisanDetailPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="register/artisan" element={<RegisterArtisanPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="checkout" element={<CheckoutPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="dashboard" element={<ArtisanDashboardPage />} />
              <Route path="dashboard/products" element={<ProductManagementPage />} />
              <Route path="dashboard/orders" element={<OrdersManagementPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboardPage />} />
              <Route path="users" element={<AdminUsersPage />} />
              <Route path="categories" element={<AdminCategoriesPage />} />
            </Route>
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;