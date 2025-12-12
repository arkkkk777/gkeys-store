import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import UserDropdown from '../UserDropdown';
import LoginSideMenu from '../auth/LoginSideMenu';
import RegisterSideMenu from '../auth/RegisterSideMenu';
import catalogIcon from '../../assets/catalog.svg';
import mediaIcon from '../../assets/media.svg';
import wishlistIcon from '../../assets/wishlist.svg';
import cartIcon from '../../assets/cart.svg';

const theme = {
  colors: {
    primary: '#00C8C2',
    background: '#0D0D0D',
    surface: '#1A1A1A',
    surfaceLight: '#2A2A2A',
    text: '#FFFFFF',
    textSecondary: '#999999',
    textMuted: '#666666',
    border: '#333333',
  },
};

const Icons = {
  Search: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  ),
  Heart: () => (
    <img src={wishlistIcon} alt="Wishlist" width="20" height="20" style={{ display: 'block' }} />
  ),
  Cart: () => (
    <img src={cartIcon} alt="Cart" width="20" height="20" style={{ display: 'block' }} />
  ),
  Grid: () => (
    <img src={catalogIcon} alt="Catalog" width="20" height="20" style={{ display: 'block' }} />
  ),
  Media: () => (
    <img src={mediaIcon} alt="Media" width="20" height="20" style={{ display: 'block' }} />
  ),
  Menu: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  ),
};

interface HeaderProps {
  onMenuClick?: () => void;
  onAuthClick?: () => void;
}

export default function Header({ onMenuClick, onAuthClick }: HeaderProps) {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const { itemCount: cartCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();
  const [isLoginMenuOpen, setIsLoginMenuOpen] = useState(false);
  const [isRegisterMenuOpen, setIsRegisterMenuOpen] = useState(false);

  const handleLoginClick = () => {
    setIsLoginMenuOpen(true);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSwitchToRegister = () => {
    setIsLoginMenuOpen(false);
    setIsRegisterMenuOpen(true);
  };

  const handleSwitchToLogin = () => {
    setIsRegisterMenuOpen(false);
    setIsLoginMenuOpen(true);
  };

  return (
    <>
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 24px',
          backgroundColor: theme.colors.background,
          borderBottom: `1px solid ${theme.colors.border}`,
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', fontSize: '24px', fontWeight: '700', textDecoration: 'none', color: theme.colors.text }}>
            <span style={{ color: theme.colors.primary }}>G</span>KEYS
          </Link>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="desktop-nav">
            <Link to="/catalog" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: theme.colors.text, textDecoration: 'none', fontSize: '16px' }}>
              <Icons.Grid />
              Catalog
            </Link>
            <Link to="/media" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: theme.colors.text, textDecoration: 'none', fontSize: '16px' }}>
              <Icons.Media />
              Media
            </Link>
          </nav>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/wishlist')}
            style={{
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              backgroundColor: theme.colors.surface,
              color: theme.colors.text,
              border: 'none',
              cursor: 'pointer',
              position: 'relative',
            }}
            type="button"
            aria-label="Wishlist"
          >
            <Icons.Heart />
            {wishlistCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  backgroundColor: theme.colors.primary,
                  color: '#000',
                  fontSize: '10px',
                  fontWeight: '600',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {wishlistCount}
              </span>
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/cart')}
            style={{
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              backgroundColor: theme.colors.surface,
              color: theme.colors.text,
              border: 'none',
              cursor: 'pointer',
              position: 'relative',
            }}
            type="button"
            aria-label="Cart"
          >
            <Icons.Cart />
            {cartCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  backgroundColor: theme.colors.primary,
                  color: '#000',
                  fontSize: '10px',
                  fontWeight: '600',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {cartCount}
              </span>
            )}
          </motion.button>

          {isAuthenticated && user ? (
            <UserDropdown 
              userName={user.name || user.email || 'User'} 
              userAvatar={user.avatar} 
              onLogout={handleLogout} 
            />
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLoginClick}
              style={{
                padding: '10px 20px',
                backgroundColor: theme.colors.primary,
                color: '#000',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
              type="button"
            >
              Log in
            </motion.button>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onMenuClick}
            style={{
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              backgroundColor: theme.colors.surface,
              color: theme.colors.text,
              border: 'none',
              cursor: 'pointer',
            }}
            className="mobile-menu-trigger"
            type="button"
            aria-label="Menu"
          >
            <Icons.Menu />
          </motion.button>
        </div>
      </header>

      {/* Login Side Menu */}
      <LoginSideMenu
        isOpen={isLoginMenuOpen}
        onClose={() => setIsLoginMenuOpen(false)}
        onSwitchToRegister={handleSwitchToRegister}
      />

      {/* Register Side Menu */}
      <RegisterSideMenu
        isOpen={isRegisterMenuOpen}
        onClose={() => setIsRegisterMenuOpen(false)}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </>
  );
}
