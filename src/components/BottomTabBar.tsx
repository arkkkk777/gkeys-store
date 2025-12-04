import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

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

interface BottomTabBarProps {
  cartCount?: number;
  wishlistCount?: number;
}

const Icons = {
  Home: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  Grid: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  ),
  Heart: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  Cart: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  ),
  User: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
};

export default function BottomTabBar({ cartCount = 0, wishlistCount = 0 }: BottomTabBarProps) {
  const location = useLocation();

  const tabs = [
    { id: 'home', label: 'Home', icon: <Icons.Home />, path: '/' },
    { id: 'catalog', label: 'Catalog', icon: <Icons.Grid />, path: '/catalog' },
    { id: 'wishlist', label: 'Wishlist', icon: <Icons.Heart />, path: '/wishlist', badge: wishlistCount },
    { id: 'cart', label: 'Cart', icon: <Icons.Cart />, path: '/cart', badge: cartCount },
    { id: 'profile', label: 'Profile', icon: <Icons.User />, path: '/profile/orders' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: theme.colors.surface,
          borderTop: `1px solid ${theme.colors.border}`,
          display: 'none',
          zIndex: 1000,
          boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.3)',
        }}
        className="bottom-tab-bar"
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            padding: '8px 0 env(safe-area-inset-bottom, 8px)',
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          {tabs.map((tab) => {
            const active = isActive(tab.path);
            return (
              <Link
                key={tab.id}
                to={tab.path}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  padding: '8px 12px',
                  textDecoration: 'none',
                  color: active ? theme.colors.primary : theme.colors.textSecondary,
                  position: 'relative',
                  minWidth: '60px',
                  transition: 'color 0.2s ease',
                }}
              >
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {tab.icon}
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      style={{
                        position: 'absolute',
                        top: '-4px',
                        right: '-8px',
                        backgroundColor: theme.colors.primary,
                        color: '#000',
                        fontSize: '10px',
                        fontWeight: '700',
                        minWidth: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0 4px',
                      }}
                    >
                      {tab.badge > 99 ? '99+' : tab.badge}
                    </motion.span>
                  )}
                </motion.div>
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: active ? '600' : '500',
                    textTransform: 'capitalize',
                  }}
                >
                  {tab.label}
                </span>
                {active && (
                  <motion.div
                    layoutId="tabIndicator"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '24px',
                      height: '3px',
                      backgroundColor: theme.colors.primary,
                      borderRadius: '0 0 3px 3px',
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>

      <style>
        {`
          /* Show bottom tab bar only on mobile */
          @media (max-width: 768px) {
            .bottom-tab-bar {
              display: block !important;
            }
            /* Add padding to body to prevent content from being hidden behind tab bar */
            body {
              padding-bottom: env(safe-area-inset-bottom, 72px) !important;
            }
          }

          /* Safe area support for iOS devices */
          @supports (padding-bottom: env(safe-area-inset-bottom)) {
            @media (max-width: 768px) {
              body {
                padding-bottom: calc(72px + env(safe-area-inset-bottom)) !important;
              }
            }
          }
        `}
      </style>
    </>
  );
}

