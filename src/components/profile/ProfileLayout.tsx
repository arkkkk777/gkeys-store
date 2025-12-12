import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { ChevronDown } from 'lucide-react';

const theme = {
  colors: {
    primary: '#00C8C2',
    background: '#0D0D0D',
    surface: '#1A1A1A',
    surfaceLight: '#2A2A2A',
    surfaceHover: '#333333',
    text: '#FFFFFF',
    textSecondary: '#999999',
    textMuted: '#666666',
    border: '#333333',
    error: '#FF4444',
  },
};

// Default avatar - gaming controller icon
const DefaultAvatar = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="22" fill="#FFD93D" />
    <circle cx="24" cy="24" r="22" stroke="#7B68EE" strokeWidth="4" />
    <rect x="12" y="18" width="24" height="14" rx="4" fill="#333" />
    <circle cx="17" cy="24" r="2" fill="#00C8C2" />
    <circle cx="31" cy="24" r="2" fill="#FF4444" />
    <rect x="22" y="22" width="4" height="4" rx="1" fill="#666" />
  </svg>
);

const menuItems = [
  { label: 'Profile', path: '/profile', exact: true },
  { label: 'Orders', path: '/profile/orders' },
  { label: 'Wishlist', path: '/profile/wishlist' },
  { label: 'Balance', path: '/profile/balance' },
  { label: 'Edit Profile', path: '/profile/edit', badge: '+5' },
];

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [backgroundImage] = useState('/images/profile-bg.jpg');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const isActive = (path: string, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const userName = user?.name || (user as any)?.nickname || (user as any)?.username || 'Newbie Guy';

  // Check if mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.mobile-profile-menu')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Get current active menu item label
  const getActiveMenuItemLabel = () => {
    const activeItem = menuItems.find(item => isActive(item.path, item.exact));
    return activeItem ? activeItem.label : 'Menu';
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: theme.colors.background,
        position: 'relative',
      }}
    >
      {/* Background Image */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '500px',
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          zIndex: 0,
        }}
      >
        {/* Dark overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(13,13,13,0.6) 0%, rgba(13,13,13,0.85) 60%, rgba(13,13,13,1) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '32px 24px',
          display: 'flex',
          gap: '48px',
        }}
        className="profile-layout"
      >
        {/* Sidebar - Desktop */}
        <aside
          style={{
            width: '240px',
            flexShrink: 0,
            display: isMobile ? 'none' : 'block',
          }}
          className="profile-sidebar"
        >
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {menuItems.map((item) => {
              const active = isActive(item.path, item.exact);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 20px',
                    backgroundColor: active ? theme.colors.surface : 'transparent',
                    borderRadius: '12px',
                    color: theme.colors.text,
                    textDecoration: 'none',
                    fontSize: '16px',
                    fontWeight: active ? '600' : '400',
                    transition: 'all 0.2s ease',
                    border: active ? `1px solid ${theme.colors.border}` : '1px solid transparent',
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.backgroundColor = theme.colors.surfaceLight;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      style={{
                        backgroundColor: theme.colors.primary,
                        color: '#000',
                        padding: '2px 8px',
                        borderRadius: '50px',
                        fontSize: '12px',
                        fontWeight: '600',
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
            {/* Logout button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '16px 20px',
                backgroundColor: 'transparent',
                border: 'none',
                borderRadius: '12px',
                color: theme.colors.error,
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                marginTop: '8px',
                textAlign: 'left',
              }}
            >
              Log Out
            </motion.button>
          </nav>
        </aside>

        {/* Mobile Dropdown Menu */}
        {isMobile && (
          <div
            style={{
              width: '100%',
              marginBottom: '24px',
              position: 'relative',
            }}
            className="mobile-profile-menu"
          >
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                backgroundColor: theme.colors.surface,
                border: `1px solid ${theme.colors.border}`,
                borderRadius: '12px',
                color: theme.colors.text,
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
              }}
            >
              <span>{getActiveMenuItemLabel()}</span>
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={20} />
              </motion.div>
            </motion.button>

            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    left: 0,
                    right: 0,
                    backgroundColor: theme.colors.surface,
                    border: `1px solid ${theme.colors.border}`,
                    borderRadius: '12px',
                    padding: '8px',
                    zIndex: 1000,
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  {menuItems.map((item) => {
                    const active = isActive(item.path, item.exact);
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '12px 16px',
                          backgroundColor: active ? theme.colors.surfaceLight : 'transparent',
                          borderRadius: '8px',
                          color: theme.colors.text,
                          textDecoration: 'none',
                          fontSize: '16px',
                          fontWeight: active ? '600' : '400',
                          transition: 'background-color 0.2s ease',
                          marginBottom: '4px',
                        }}
                      >
                        <span>{item.label}</span>
                        {item.badge && (
                          <span
                            style={{
                              backgroundColor: theme.colors.primary,
                              color: '#000',
                              padding: '2px 8px',
                              borderRadius: '50px',
                              fontSize: '12px',
                              fontWeight: '600',
                            }}
                          >
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                  <div
                    style={{
                      height: '1px',
                      backgroundColor: theme.colors.border,
                      margin: '8px 0',
                    }}
                  />
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleLogout();
                    }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '12px 16px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderRadius: '8px',
                      color: theme.colors.error,
                      fontSize: '16px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    Log Out
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Main Content */}
        <main style={{ flex: 1, minWidth: 0 }}>
          {/* User Header */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: '32px',
              textAlign: 'center',
            }}
            className="profile-header"
          >
            {/* Avatar */}
            <div
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                overflow: 'hidden',
                marginBottom: '16px',
                border: '4px solid #7B68EE',
                boxShadow: '0 0 20px rgba(123, 104, 238, 0.3)',
              }}
            >
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={userName}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#FFD93D',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <DefaultAvatar />
                </div>
              )}
            </div>
            {/* Username */}
            <h1
              style={{
                fontSize: '32px',
                fontWeight: '700',
                color: theme.colors.text,
                margin: 0,
              }}
            >
              {userName}
            </h1>
          </div>

          {/* Page Content */}
          {children}
        </main>
      </div>

      <style>
        {`
          @media (max-width: 768px) {
            .profile-layout {
              flex-direction: column !important;
              gap: 24px !important;
              padding: 16px !important;
            }
            .profile-sidebar {
              display: none !important;
            }
            .mobile-profile-menu {
              display: block !important;
            }
            .profile-header {
              margin-bottom: 24px !important;
            }
          }
          @media (min-width: 769px) {
            .mobile-profile-menu {
              display: none !important;
            }
          }
        `}
      </style>
    </div>
  );
}
