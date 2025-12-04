import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import PageTransition from './components/PageTransition';
import ProtectedRoute from './components/ProtectedRoute';
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
          path="/game/:id"
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
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <AnimatedRoutes />
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
