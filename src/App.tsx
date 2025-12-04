import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import PageTransition from './components/PageTransition';
import ProtectedRoute from './components/ProtectedRoute';
import AdminApp from './admin/AdminApp';
// @ts-ignore
import HomePage from './pages/HomePage';
// @ts-ignore
import ProfileOrdersPage from './pages/ProfileOrdersPage';
// @ts-ignore
import ProfileBalancePage from './pages/ProfileBalancePage';
// @ts-ignore
import GameDetailPage from './pages/GameDetailPage';
// @ts-ignore
import CatalogPage from './pages/CatalogPage';
// @ts-ignore
import CartPage from './pages/CartPage';
// @ts-ignore
import WishlistPage from './pages/WishlistPage';
// @ts-ignore
import SupportPage from './pages/SupportPage';
// @ts-ignore
import ProfileEditPage from './pages/ProfileEditPage';
// @ts-ignore
import BlogPage from './pages/BlogPage';
// @ts-ignore
import ArticlePage from './pages/ArticlePage';
// @ts-ignore
import PrivacyPage from './pages/PrivacyPage';
// @ts-ignore
import TermsPage from './pages/TermsPage';
// @ts-ignore
import LoginPage from './pages/LoginPage';
// @ts-ignore
import RegisterPage from './pages/RegisterPage';
// @ts-ignore
import ForgotPasswordPage from './pages/ForgotPasswordPage';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <HomePage />
            </PageTransition>
          }
        />
        <Route
          path="/catalog"
          element={
            <PageTransition>
              <CatalogPage />
            </PageTransition>
          }
        />
        <Route
          path="/game/:slug"
          element={
            <PageTransition>
              <GameDetailPage />
            </PageTransition>
          }
        />
        <Route
          path="/cart"
          element={
            <PageTransition>
              <CartPage />
            </PageTransition>
          }
        />
        <Route
          path="/wishlist"
          element={
            <PageTransition>
              <WishlistPage />
            </PageTransition>
          }
        />
        <Route
          path="/support"
          element={
            <PageTransition>
              <SupportPage />
            </PageTransition>
          }
        />
        <Route
          path="/profile/orders"
          element={
            <ProtectedRoute>
              <PageTransition>
                <ProfileOrdersPage />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/balance"
          element={
            <ProtectedRoute>
              <PageTransition>
                <ProfileBalancePage />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/edit"
          element={
            <ProtectedRoute>
              <PageTransition>
                <ProfileEditPage />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/blog"
          element={
            <PageTransition>
              <BlogPage />
            </PageTransition>
          }
        />
        <Route
          path="/blog/:slug"
          element={
            <PageTransition>
              <ArticlePage />
            </PageTransition>
          }
        />
        <Route
          path="/privacy"
          element={
            <PageTransition>
              <PrivacyPage />
            </PageTransition>
          }
        />
        <Route
          path="/terms"
          element={
            <PageTransition>
              <TermsPage />
            </PageTransition>
          }
        />
        <Route
          path="/login"
          element={
            <PageTransition>
              <LoginPage />
            </PageTransition>
          }
        />
        <Route
          path="/register"
          element={
            <PageTransition>
              <RegisterPage />
            </PageTransition>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PageTransition>
              <ForgotPasswordPage />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function AppRoutes() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isAuthRoute = ['/login', '/register', '/forgot-password'].includes(location.pathname);

  if (isAdminRoute) {
    return (
      <Routes>
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>
    );
  }

  // Auth pages don't need the main layout
  if (isAuthRoute) {
    return (
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />
          <Route path="/register" element={<PageTransition><RegisterPage /></PageTransition>} />
          <Route path="/forgot-password" element={<PageTransition><ForgotPasswordPage /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    );
  }

  return (
    <Layout>
      <AnimatedRoutes />
    </Layout>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
