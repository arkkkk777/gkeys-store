import { useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import MobileMenu from './MobileMenu';
import UserDropdown from './UserDropdown';
import BottomTabBar from './BottomTabBar';
// @ts-ignore
import AuthModal from './AuthModal';

const theme = {
  colors: {
    primary: '#00FF66',
    background: '#0D0D0D',
    surface: '#1A1A1A',
    surfaceLight: '#2A2A2A',
    text: '#FFFFFF',
    textSecondary: '#999999',
    textMuted: '#666666',
    border: '#333333',
  },
};

interface LayoutProps {
  children: ReactNode;
}

const Icons = {
  Search: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  ),
  Heart: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  Cart: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  ),
  Grid: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  ),
  Media: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  Menu: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  ),
  Telegram: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  ),
  Instagram: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
};

export default function Layout({ children }: LayoutProps) {
  const { isAuthenticated, user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Mock cart and wishlist counts (in production, get from context or API)
  const cartCount = 0;
  const wishlistCount = 0;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: theme.colors.background, display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
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
            onClick={() => window.location.href = '/wishlist'}
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
            onClick={() => window.location.href = '/cart'}
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

          <div className="desktop-search" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', backgroundColor: theme.colors.surface, borderRadius: '50px', color: theme.colors.textSecondary, minWidth: '150px' }}>
            <Icons.Search />
            <span>Search</span>
          </div>

          {isAuthenticated && user ? (
            <div className="desktop-login">
              <UserDropdown userName={user.name} userAvatar={user.avatar} onLogout={logout} />
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAuthModalOpen(true)}
              className="desktop-login"
              style={{
                padding: '10px 24px',
                backgroundColor: 'transparent',
                border: `1px solid ${theme.colors.border}`,
                borderRadius: '8px',
                color: theme.colors.text,
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              Log in
            </motion.button>
          )}

          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="mobile-menu-btn"
            style={{
              display: 'none',
              width: '44px',
              height: '44px',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              backgroundColor: theme.colors.surface,
              color: theme.colors.text,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <Icons.Menu />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1 }}>{children}</main>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: theme.colors.background,
          borderTop: `1px solid ${theme.colors.border}`,
          padding: '48px 24px',
          marginTop: 'auto',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '24px',
              marginBottom: '32px',
            }}
          >
            <Link to="/" style={{ display: 'flex', alignItems: 'center', fontSize: '24px', fontWeight: '700', textDecoration: 'none', color: theme.colors.text }}>
              <span style={{ color: theme.colors.primary }}>G</span>KEYS
            </Link>
            <nav style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
              <Link to="/catalog" style={{ color: theme.colors.textSecondary, textDecoration: 'none', fontSize: '14px' }}>
                Catalog
              </Link>
              <Link to="/new" style={{ color: theme.colors.textSecondary, textDecoration: 'none', fontSize: '14px' }}>
                New
              </Link>
              <Link to="/media" style={{ color: theme.colors.textSecondary, textDecoration: 'none', fontSize: '14px' }}>
                Media
              </Link>
              <Link to="/contacts" style={{ color: theme.colors.textSecondary, textDecoration: 'none', fontSize: '14px' }}>
                Contacts
              </Link>
              <Link to="/support" style={{ color: theme.colors.textSecondary, textDecoration: 'none', fontSize: '14px' }}>
                Support
              </Link>
            </nav>
            <div style={{ display: 'flex', gap: '16px' }}>
              <a href="#" style={{ color: theme.colors.text }}>
                <Icons.Telegram />
              </a>
              <a href="#" style={{ color: theme.colors.text }}>
                <Icons.Instagram />
              </a>
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'center', marginBottom: '24px' }}>
            <Link to="/terms" style={{ color: theme.colors.textSecondary, textDecoration: 'none', fontSize: '14px' }}>
              User Agreement
            </Link>
            <Link to="/privacy" style={{ color: theme.colors.textSecondary, textDecoration: 'none', fontSize: '14px' }}>
              Privacy Policy
            </Link>
          </div>
          <div style={{ textAlign: 'center', paddingTop: '32px', borderTop: `1px solid ${theme.colors.border}` }}>
            <p style={{ color: theme.colors.textMuted, fontSize: '12px', lineHeight: '1.8' }}>
              © 2025 GKEYS. All rights reserved. Copying any materials from the site is prohibited!
              <br />
              All product and game names, company names and brands, logos, trademarks, and other materials are the property of their respective owners.
              <br />
              Only licensed keys for all gaming platforms: Steam, Uplay, Battle.net, Origin, and others.
              <br />
              All keys sold are purchased from official distributors and directly from publishers.
            </p>
          </div>
        </div>
      </footer>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        isAuthenticated={isAuthenticated}
      />

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

      {/* Bottom Tab Bar - Mobile Only */}
      <BottomTabBar cartCount={cartCount} wishlistCount={wishlistCount} />

      <style>
        {`
          @media (max-width: 768px) {
            .desktop-nav {
              display: none !important;
            }
            .desktop-search {
              display: none !important;
            }
            .desktop-login {
              display: none !important;
            }
            .mobile-menu-btn {
              display: flex !important;
            }
          }
        `}
      </style>
    </div>
  );
}

