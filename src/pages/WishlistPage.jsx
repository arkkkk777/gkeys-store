// Wishlist Page - GKEYS Gaming Store
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icons } from '../components/UIKit';
import { useAuth } from '../context/AuthContext';
import { gamesApi } from '../services/gamesApi';

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
    error: '#FF4444',
  },
  spacing: { xs: '4px', sm: '8px', md: '16px', lg: '24px', xl: '32px', xxl: '48px' },
  borderRadius: { sm: '4px', md: '8px', lg: '12px', xl: '16px', full: '9999px' },
};

const sidebarItems = [
  { id: 'orders', label: 'Orders', path: '/profile/orders' },
  { id: 'wishlist', label: 'Wishlist', path: '/wishlist' },
  { id: 'balance', label: 'Balance', path: '/profile/balance' },
  { id: 'edit-profile', label: 'Edit Profile', path: '/profile/edit' },
];

// Mock user stats
const userStats = {
  totalGames: 24,
  totalSaved: 156.50,
  daysSinceRegistration: 127,
};

const responsiveCSS = `
  @media (max-width: 768px) {
    .desktop-nav { display: none !important; }
    .desktop-search { display: none !important; }
    .desktop-login { display: none !important; }
    .profile-layout { flex-direction: column !important; }
    .profile-sidebar { width: 100% !important; flex-direction: column !important; gap: 8px !important; padding-bottom: 16px !important; }
    .sidebar-nav { display: flex !important; flex-direction: row !important; overflow-x: auto !important; gap: 8px !important; }
    .sidebar-item { white-space: nowrap !important; padding: 10px 16px !important; }
    .user-stats { display: none !important; }
    .wishlist-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }
    .random-games-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }
  }
  @media (max-width: 480px) {
    .wishlist-grid { grid-template-columns: 1fr !important; }
    .random-games-grid { grid-template-columns: 1fr !important; }
  }
`;

export default function WishlistPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);
  const [randomGames, setRandomGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const loadWishlist = async () => {
      try {
        setLoading(true);
        // Load wishlist from API
        const games = await gamesApi.getWishlist();
        setWishlist(games);
      } catch (error) {
        console.error('Failed to load wishlist:', error);
      } finally {
        setLoading(false);
      }
    };

    const loadRandomGames = async () => {
      try {
        const games = await gamesApi.getRandomGames(6);
        setRandomGames(games);
      } catch (error) {
        console.error('Failed to load random games:', error);
      }
    };

    loadWishlist();
    loadRandomGames();
  }, []);

  const removeFromWishlist = async (gameId) => {
    try {
      await gamesApi.removeFromWishlist(gameId);
      setWishlist(items => items.filter(item => item.id !== gameId));
      showNotification('Removed from wishlist');
    } catch (error) {
      console.error('Failed to remove from wishlist:', error);
      showNotification('Failed to remove item');
    }
  };

  const addToCart = (game) => {
    showNotification(`${game.title} added to cart`);
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const totalValue = wishlist.reduce((sum, item) => sum + (item.price || 0), 0);
  const totalSavings = wishlist.reduce((sum, item) => {
    if (item.originalPrice && item.originalPrice > item.price) {
      return sum + (item.originalPrice - item.price);
    }
    return sum;
  }, 0);

  const styles = {
    app: {
      minHeight: '100vh',
      backgroundColor: theme.colors.background,
      color: theme.colors.text,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      display: 'flex',
      flexDirection: 'column',
    },
    main: {
      flex: 1,
      padding: '48px 24px',
      maxWidth: '1280px',
      margin: '0 auto',
      width: '100%',
    },
    profileLayout: {
      display: 'flex',
      gap: '48px',
    },
    sidebar: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      minWidth: '220px',
    },
    sidebarItem: (isActive) => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 24px',
      backgroundColor: isActive ? theme.colors.surface : 'transparent',
      borderRadius: '8px',
      color: isActive ? theme.colors.text : theme.colors.textSecondary,
      fontSize: '16px',
      border: 'none',
      cursor: 'pointer',
      textAlign: 'left',
      transition: 'all 0.2s ease',
      textDecoration: 'none',
    }),
    sidebarBadge: {
      backgroundColor: theme.colors.primary,
      color: '#000',
      padding: '2px 8px',
      borderRadius: '50px',
      fontSize: '12px',
      fontWeight: '600',
    },
    logoutButton: {
      padding: '16px 24px',
      backgroundColor: 'transparent',
      border: 'none',
      color: theme.colors.error,
      fontSize: '16px',
      textAlign: 'left',
      cursor: 'pointer',
      marginTop: '16px',
    },
    userStatsCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '24px',
    },
    userName: {
      fontSize: '18px',
      fontWeight: '600',
      marginBottom: '16px',
    },
    statsGrid: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    },
    statItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    statLabel: {
      fontSize: '13px',
      color: theme.colors.textSecondary,
    },
    statValue: {
      fontSize: '14px',
      fontWeight: '600',
    },
    statValuePrimary: {
      fontSize: '14px',
      fontWeight: '600',
      color: theme.colors.primary,
    },
    content: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
    },
    pageHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px',
    },
    pageTitle: {
      fontSize: '28px',
      fontWeight: '700',
    },
    addAllButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 24px',
      backgroundColor: theme.colors.primary,
      color: '#000',
      border: 'none',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
    },
    wishlistGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '20px',
    },
    gameCard: {
      backgroundColor: theme.colors.surfaceLight,
      borderRadius: '16px',
      overflow: 'hidden',
      position: 'relative',
      transition: 'transform 0.2s ease',
    },
    gameImage: {
      width: '100%',
      aspectRatio: '3/4',
      objectFit: 'cover',
    },
    removeButton: {
      position: 'absolute',
      top: '12px',
      right: '12px',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      border: 'none',
      borderRadius: '50%',
      width: '36px',
      height: '36px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      color: theme.colors.text,
      transition: 'all 0.2s',
      zIndex: 10,
    },
    discountBadge: {
      position: 'absolute',
      top: '12px',
      left: '12px',
      backgroundColor: theme.colors.error,
      color: '#fff',
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: '600',
      zIndex: 10,
    },
    bestSellerBadge: {
      position: 'absolute',
      top: '12px',
      left: '12px',
      backgroundColor: theme.colors.primary,
      color: '#000',
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: '600',
      zIndex: 10,
    },
    gameInfo: {
      padding: '16px',
    },
    gameTitle: {
      fontSize: '16px',
      fontWeight: '600',
      marginBottom: '8px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    gameMeta: {
      fontSize: '12px',
      color: theme.colors.textSecondary,
      marginBottom: '12px',
    },
    priceRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '12px',
    },
    gamePrice: {
      fontSize: '18px',
      fontWeight: '700',
      color: theme.colors.primary,
    },
    originalPrice: {
      fontSize: '14px',
      color: theme.colors.textMuted,
      textDecoration: 'line-through',
    },
    addToCartButton: {
      width: '100%',
      padding: '12px',
      backgroundColor: theme.colors.surface,
      border: 'none',
      borderRadius: '8px',
      color: theme.colors.text,
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      transition: 'background-color 0.2s ease',
    },
    emptyState: {
      textAlign: 'center',
      padding: '80px 20px',
      backgroundColor: theme.colors.surface,
      borderRadius: '16px',
      position: 'relative',
      overflow: 'hidden',
    },
    emptyBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.1,
      backgroundImage: 'url(https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1920&h=1080&fit=crop)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    emptyContent: {
      position: 'relative',
      zIndex: 1,
    },
    emptyIcon: {
      fontSize: '64px',
      marginBottom: '24px',
    },
    emptyTitle: {
      fontSize: '28px',
      fontWeight: '700',
      marginBottom: '12px',
    },
    emptyText: {
      color: theme.colors.textSecondary,
      marginBottom: '32px',
      maxWidth: '400px',
      margin: '0 auto 32px',
      fontSize: '16px',
      lineHeight: '1.6',
    },
    browseButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '14px 32px',
      backgroundColor: theme.colors.primary,
      color: '#000',
      border: 'none',
      borderRadius: '10px',
      fontSize: '15px',
      fontWeight: '600',
      cursor: 'pointer',
      textDecoration: 'none',
    },
    randomSection: {
      marginTop: '48px',
      paddingTop: '48px',
      borderTop: `1px solid ${theme.colors.border}`,
    },
    randomTitle: {
      fontSize: '24px',
      fontWeight: '700',
      marginBottom: '24px',
    },
    randomGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '20px',
    },
    randomCard: {
      backgroundColor: theme.colors.surfaceLight,
      borderRadius: '12px',
      overflow: 'hidden',
      transition: 'transform 0.2s ease',
      textDecoration: 'none',
      color: 'inherit',
    },
    randomImage: {
      width: '100%',
      aspectRatio: '3/4',
      objectFit: 'cover',
    },
    randomInfo: {
      padding: '12px',
    },
    randomGameTitle: {
      fontSize: '14px',
      fontWeight: '500',
      marginBottom: '8px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    randomPriceRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    randomPrice: {
      fontSize: '16px',
      fontWeight: '700',
      color: theme.colors.primary,
    },
    randomOriginalPrice: {
      fontSize: '12px',
      color: theme.colors.textMuted,
      textDecoration: 'line-through',
    },
    notification: {
      position: 'fixed',
      bottom: '24px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: theme.colors.surface,
      border: `1px solid ${theme.colors.border}`,
      padding: '16px 24px',
      borderRadius: '10px',
      fontSize: '14px',
      fontWeight: '500',
      zIndex: 1000,
      boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
    },
  };

  if (loading) {
    return (
      <div style={styles.app}>
        <main style={styles.main}>
          <div style={{ textAlign: 'center', padding: '48px', color: theme.colors.textSecondary }}>
            Loading wishlist...
          </div>
        </main>
      </div>
    );
  }

  return (
    <>
      <style>{responsiveCSS}</style>
      {notification && <div style={styles.notification}>{notification}</div>}
      
      <main style={styles.main}>
        <div style={styles.profileLayout} className="profile-layout">
          {/* Sidebar */}
          <aside style={styles.sidebar} className="profile-sidebar">
            {/* User Stats Card */}
            <div style={styles.userStatsCard} className="user-stats">
              <h3 style={styles.userName}>{user?.nickname || 'Newbie Guy'}</h3>
              <div style={styles.statsGrid}>
                <div style={styles.statItem}>
                  <span style={styles.statLabel}>Games Purchased</span>
                  <span style={styles.statValue}>{userStats.totalGames}</span>
                </div>
                <div style={styles.statItem}>
                  <span style={styles.statLabel}>Total Saved</span>
                  <span style={styles.statValuePrimary}>€{userStats.totalSaved.toFixed(2)}</span>
                </div>
                <div style={styles.statItem}>
                  <span style={styles.statLabel}>Member for</span>
                  <span style={styles.statValue}>{userStats.daysSinceRegistration} days</span>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="sidebar-nav">
              {sidebarItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  style={styles.sidebarItem(item.id === 'wishlist')}
                  className="sidebar-item"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <button type="button" style={styles.logoutButton} onClick={handleLogout}>Log Out</button>
          </aside>

          {/* Wishlist Content */}
          <div style={styles.content}>
            {wishlist.length > 0 ? (
              <>
                <div style={styles.pageHeader}>
                  <h1 style={styles.pageTitle}>Wishlist</h1>
                  <button 
                    type="button"
                    style={styles.addAllButton}
                    onClick={() => {
                      showNotification(`${wishlist.length} items added to cart`);
                    }}
                  >
                    <Icons.Cart /> Add All to Cart
                  </button>
                </div>

                <div style={styles.wishlistGrid} className="wishlist-grid">
                  {wishlist.map((game) => {
                    const discount = game.originalPrice && game.price < game.originalPrice
                      ? Math.round((1 - game.price / game.originalPrice) * 100)
                      : null;

                    return (
                      <div key={game.id} style={styles.gameCard}>
                        <Link to={`/game/${game.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                          <img 
                            src={game.image || game.images?.[0]} 
                            alt={game.title} 
                            style={styles.gameImage} 
                          />
                        </Link>
                        <button
                          type="button"
                          onClick={() => removeFromWishlist(game.id)}
                          style={styles.removeButton}
                          title="Remove from wishlist"
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(255, 68, 68, 0.9)';
                            e.currentTarget.style.transform = 'scale(1.1)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
                            e.currentTarget.style.transform = 'scale(1)';
                          }}
                        >
                          <Icons.Heart />
                        </button>
                        {game.isBestSeller && (
                          <span style={styles.bestSellerBadge}>Best Seller</span>
                        )}
                        {discount && !game.isBestSeller && (
                          <span style={styles.discountBadge}>-{discount}%</span>
                        )}
                        <div style={styles.gameInfo}>
                          <h3 style={styles.gameTitle}>{game.title}</h3>
                          <p style={styles.gameMeta}>
                            {game.platforms?.[0] || 'PC'} • {game.genres?.[0] || 'Game'}
                          </p>
                          <div style={styles.priceRow}>
                            <span style={styles.gamePrice}>€{game.price?.toFixed(2) || '0.00'}</span>
                            {game.originalPrice && game.originalPrice > game.price && (
                              <span style={styles.originalPrice}>€{game.originalPrice.toFixed(2)}</span>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => addToCart(game)}
                            style={styles.addToCartButton}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = theme.colors.surfaceLight;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = theme.colors.surface;
                            }}
                          >
                            <Icons.Cart /> Add to Cart
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Random Games Section */}
                {randomGames.length > 0 && (
                  <section style={styles.randomSection}>
                    <h2 style={styles.randomTitle}>You might also like</h2>
                    <div style={styles.randomGrid} className="random-games-grid">
                      {randomGames.map((game) => (
                        <Link
                          key={game.id}
                          to={`/game/${game.slug}`}
                          style={styles.randomCard}
                        >
                          <img
                            src={game.image || game.images?.[0]}
                            alt={game.title}
                            style={styles.randomImage}
                          />
                          <div style={styles.randomInfo}>
                            <h3 style={styles.randomGameTitle}>{game.title}</h3>
                            <div style={styles.randomPriceRow}>
                              <span style={styles.randomPrice}>€{game.price?.toFixed(2) || '0.00'}</span>
                              {game.originalPrice && game.originalPrice > game.price && (
                                <span style={styles.randomOriginalPrice}>
                                  €{game.originalPrice.toFixed(2)}
                                </span>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}
              </>
            ) : (
              <>
                <div style={styles.emptyState}>
                  <div style={styles.emptyBackground}></div>
                  <div style={styles.emptyContent}>
                    <div style={styles.emptyIcon}>💚</div>
                    <h2 style={styles.emptyTitle}>Your wishlist is empty</h2>
                    <p style={styles.emptyText}>
                      Add items using the <Icons.Heart /> button. We'll notify you when they go on sale!
                    </p>
                    <Link to="/catalog" style={styles.browseButton}>
                      Go to Store
                    </Link>
                  </div>
                </div>

                {/* Random Games Section - also shown when wishlist is empty */}
                {randomGames.length > 0 && (
                  <section style={{ ...styles.randomSection, marginTop: '32px', borderTop: 'none' }}>
                    <h2 style={styles.randomTitle}>You might also like</h2>
                    <div style={styles.randomGrid} className="random-games-grid">
                      {randomGames.map((game) => (
                        <Link
                          key={game.id}
                          to={`/game/${game.slug}`}
                          style={styles.randomCard}
                        >
                          <img
                            src={game.image || game.images?.[0]}
                            alt={game.title}
                            style={styles.randomImage}
                          />
                          <div style={styles.randomInfo}>
                            <h3 style={styles.randomGameTitle}>{game.title}</h3>
                            <div style={styles.randomPriceRow}>
                              <span style={styles.randomPrice}>€{game.price?.toFixed(2) || '0.00'}</span>
                              {game.originalPrice && game.originalPrice > game.price && (
                                <span style={styles.randomOriginalPrice}>
                                  €{game.originalPrice.toFixed(2)}
                                </span>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
