import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const theme = {
  colors: {
    primary: '#00FF66',
    background: '#0D0D0D',
    surface: '#1A1A1A',
    surfaceLight: '#2A2A2A',
    text: '#FFFFFF',
    textSecondary: '#999999',
    border: '#333333',
  },
};

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAuth?: () => void;
  cartCount?: number;
  wishlistCount?: number;
  isAuthenticated?: boolean;
}

const Icons = {
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
  Support: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  User: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, delay: 0.2 },
  },
};

const menuVariants = {
  hidden: {
    x: '100%',
  },
  visible: {
    x: 0,
    transition: {
      type: 'spring' as const,
      damping: 30,
      stiffness: 300,
    },
  },
  exit: {
    x: '100%',
    transition: {
      type: 'spring' as const,
      damping: 30,
      stiffness: 300,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.3,
    },
  }),
};

export default function MobileMenu({
  isOpen,
  onClose,
  onOpenAuth,
  cartCount = 0,
  wishlistCount = 0,
  isAuthenticated = false,
}: MobileMenuProps) {
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const menuItems = [
    { icon: <Icons.Grid />, label: 'Catalog', path: '/catalog' },
    { icon: <Icons.Media />, label: 'Media', path: '/media' },
    { icon: <Icons.Support />, label: 'Support', path: '/support' },
    { icon: <Icons.Heart />, label: 'Wishlist', path: '/wishlist', badge: wishlistCount },
    { icon: <Icons.Cart />, label: 'Cart', path: '/cart', badge: cartCount },
  ];

  if (isAuthenticated) {
    menuItems.push({ icon: <Icons.User />, label: 'Profile', path: '/profile/orders' });
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(4px)',
              zIndex: 999,
            }}
          />

          {/* Menu Panel */}
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '280px',
              maxWidth: '80vw',
              backgroundColor: theme.colors.surface,
              zIndex: 1000,
              display: 'flex',
              flexDirection: 'column',
              padding: '24px',
              overflowY: 'auto',
            }}
          >
            {/* Menu Header */}
            <div style={{ marginBottom: '32px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <h2 style={{ fontSize: '20px', fontWeight: '600', color: theme.colors.text }}>
                  Menu
                </h2>
                <button
                  onClick={onClose}
                  style={{
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: theme.colors.surfaceLight,
                    border: 'none',
                    borderRadius: '8px',
                    color: theme.colors.text,
                    cursor: 'pointer',
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Menu Items */}
            <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  custom={index}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link
                    to={item.path}
                    onClick={onClose}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '16px',
                      backgroundColor: theme.colors.surfaceLight,
                      borderRadius: '12px',
                      color: theme.colors.text,
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      {item.icon}
                      <span style={{ fontSize: '16px', fontWeight: '500' }}>{item.label}</span>
                    </div>
                    {item.badge !== undefined && item.badge > 0 && (
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
                </motion.div>
              ))}
            </nav>

            {/* Auth Button */}
            {!isAuthenticated && onOpenAuth && (
              <motion.button
                custom={menuItems.length}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                onClick={() => {
                  onClose();
                  onOpenAuth();
                }}
                style={{
                  width: '100%',
                  padding: '16px',
                  backgroundColor: theme.colors.primary,
                  color: '#000',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  marginTop: '16px',
                }}
              >
                Log in
              </motion.button>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

