// Wishlist Page - GKEYS Gaming Store
import React, { useState } from 'react';

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
    discount: '#FF4444',
    error: '#FF4444',
  },
};

const Icons = {
  Search: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>,
  Heart: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  Cart: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>,
  Grid: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  Media: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  Trash: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
  X: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Telegram: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>,
  Instagram: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
};

const initialWishlist = [
  { id: 1, title: 'Cyberpunk 2077', price: 59.99, originalPrice: 69.99, discount: 14, image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=400&fit=crop', platform: 'PC', genre: 'RPG', addedAt: '2025-01-15' },
  { id: 2, title: 'Elden Ring', price: 49.99, originalPrice: null, discount: 0, image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=300&h=400&fit=crop', platform: 'PC', genre: 'Action', addedAt: '2025-01-14' },
  { id: 3, title: 'Red Dead Redemption 2', price: 39.99, originalPrice: 59.99, discount: 33, image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&h=400&fit=crop', platform: 'PC', genre: 'Action', addedAt: '2025-01-10' },
  { id: 4, title: 'GTA V', price: 29.99, originalPrice: 39.99, discount: 25, image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b2b0d?w=300&h=400&fit=crop', platform: 'PC', genre: 'Action', addedAt: '2025-01-08' },
  { id: 5, title: 'The Witcher 3', price: 19.99, originalPrice: 39.99, discount: 50, image: 'https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=300&h=400&fit=crop', platform: 'PC', genre: 'RPG', addedAt: '2025-01-05' },
  { id: 6, title: 'Hogwarts Legacy', price: 54.99, originalPrice: null, discount: 0, image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&h=400&fit=crop', platform: 'PC', genre: 'RPG', addedAt: '2025-01-02' },
];

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState(initialWishlist);
  const [notification, setNotification] = useState(null);

  const removeFromWishlist = (id) => {
    setWishlist(items => items.filter(item => item.id !== id));
    showNotification('Removed from wishlist');
  };

  const addToCart = (game) => {
    showNotification(`${game.title} added to cart`);
  };

  const addAllToCart = () => {
    showNotification(`${wishlist.length} items added to cart`);
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const totalValue = wishlist.reduce((sum, item) => sum + item.price, 0);
  const totalSavings = wishlist.reduce((sum, item) => sum + (item.originalPrice ? item.originalPrice - item.price : 0), 0);

  const responsiveCSS = `
    .wishlist-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
    .wishlist-stats { display: flex; gap: 32px; margin-bottom: 32px; }
    @media (max-width: 1024px) {
      .wishlist-grid { grid-template-columns: repeat(3, 1fr); }
    }
    @media (max-width: 768px) {
      .wishlist-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
      .wishlist-stats { flex-direction: column; gap: 16px; }
      .desktop-nav, .desktop-search, .desktop-login { display: none; }
    }
    @media (max-width: 480px) {
      .wishlist-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
    }
  `;

  const styles = {
    app: { minHeight: '100vh', background: theme.colors.background, color: theme.colors.text },
    header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: `1px solid ${theme.colors.border}`, position: 'sticky', top: 0, background: theme.colors.background, zIndex: 100 },
    logo: { fontSize: '24px', fontWeight: '800', textDecoration: 'none', color: theme.colors.text },
    nav: { display: 'flex', gap: '24px' },
    navLink: { display: 'flex', alignItems: 'center', gap: '6px', color: theme.colors.textSecondary, textDecoration: 'none', fontSize: '14px', fontWeight: '500' },
    rightSection: { display: 'flex', alignItems: 'center', gap: '16px' },
    iconButton: { background: 'none', border: 'none', color: theme.colors.text, cursor: 'pointer', padding: '8px' },
    searchButton: { display: 'flex', alignItems: 'center', gap: '8px', background: theme.colors.surface, border: 'none', color: theme.colors.textSecondary, padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' },
    loginButton: { background: theme.colors.primary, color: '#000', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '14px' },
    main: { maxWidth: '1400px', margin: '0 auto', padding: '32px 24px' },
    pageHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' },
    pageTitle: { fontSize: '28px', fontWeight: '700' },
    addAllBtn: { background: theme.colors.primary, color: '#000', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '14px' },
    itemCount: { color: theme.colors.textMuted, fontSize: '14px', marginBottom: '24px' },
    statsCard: { background: theme.colors.surface, borderRadius: '12px', padding: '20px', flex: 1, minWidth: '200px' },
    statsLabel: { color: theme.colors.textMuted, fontSize: '13px', marginBottom: '4px' },
    statsValue: { fontSize: '24px', fontWeight: '700' },
    statsSavings: { color: theme.colors.primary },
    gameCard: { background: theme.colors.surface, borderRadius: '12px', overflow: 'hidden', position: 'relative' },
    gameImage: { width: '100%', aspectRatio: '3/4', objectFit: 'cover' },
    removeBtn: { position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.7)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: theme.colors.text, transition: 'all 0.2s' },
    discountBadge: { position: 'absolute', top: '8px', left: '8px', background: theme.colors.discount, color: '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '600' },
    gameInfo: { padding: '12px' },
    gameMeta: { fontSize: '11px', color: theme.colors.textMuted, marginBottom: '4px' },
    gameTitle: { fontSize: '14px', fontWeight: '500', marginBottom: '8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
    priceRow: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' },
    gamePrice: { fontSize: '16px', fontWeight: '700', color: theme.colors.primary },
    originalPrice: { fontSize: '13px', color: theme.colors.textMuted, textDecoration: 'line-through' },
    addToCartBtn: { width: '100%', background: theme.colors.surfaceLight, border: 'none', padding: '10px', borderRadius: '6px', color: theme.colors.text, fontSize: '13px', fontWeight: '500', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' },
    emptyWishlist: { textAlign: 'center', padding: '80px 20px' },
    emptyIcon: { fontSize: '80px', marginBottom: '24px', opacity: 0.3 },
    emptyTitle: { fontSize: '24px', fontWeight: '600', marginBottom: '8px' },
    emptyText: { color: theme.colors.textMuted, marginBottom: '32px', maxWidth: '400px', margin: '0 auto 32px' },
    browseBtn: { background: theme.colors.primary, color: '#000', border: 'none', padding: '14px 32px', borderRadius: '10px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' },
    notification: { position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)', background: theme.colors.surface, border: `1px solid ${theme.colors.border}`, padding: '16px 24px', borderRadius: '10px', fontSize: '14px', fontWeight: '500', zIndex: 1000, boxShadow: '0 4px 20px rgba(0,0,0,0.3)' },
    footer: { borderTop: `1px solid ${theme.colors.border}`, padding: '48px 24px', marginTop: '64px' },
    footerTop: { display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '24px', marginBottom: '32px', maxWidth: '1280px', margin: '0 auto 32px' },
    footerNav: { display: 'flex', flexWrap: 'wrap', gap: '24px' },
    footerLink: { color: theme.colors.textSecondary, textDecoration: 'none', fontSize: '14px' },
    footerSocial: { display: 'flex', gap: '16px' },
    footerBottom: { textAlign: 'center', paddingTop: '32px', borderTop: `1px solid ${theme.colors.border}`, maxWidth: '1280px', margin: '0 auto' },
    copyright: { color: theme.colors.textMuted, fontSize: '12px', lineHeight: '1.8' },
  };

  return (
    <>
      <style>{responsiveCSS}</style>
      <div style={styles.app}>
        {/* Notification */}
        {notification && <div style={styles.notification}>{notification}</div>}

        {/* Header */}
        <header style={styles.header}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
            <a href="/" style={styles.logo}>
              <span style={{ color: theme.colors.primary }}>G</span>KEYS
            </a>
            <nav style={styles.nav} className="desktop-nav">
              <a href="/catalog" style={styles.navLink}><Icons.Grid /> Catalog</a>
              <a href="/media" style={styles.navLink}><Icons.Media /> Media</a>
            </nav>
          </div>
          <div style={styles.rightSection}>
            <button style={{ ...styles.iconButton, color: theme.colors.primary }}><Icons.Heart filled={true} /></button>
            <button style={styles.iconButton}><Icons.Cart /></button>
            <button style={styles.searchButton} className="desktop-search"><Icons.Search /> Search</button>
            <button style={styles.loginButton} className="desktop-login">Log in</button>
          </div>
        </header>

        {/* Main Content */}
        <main style={styles.main}>
          {wishlist.length > 0 ? (
            <>
              <div style={styles.pageHeader}>
                <h1 style={styles.pageTitle}>Wishlist</h1>
                <button onClick={addAllToCart} style={styles.addAllBtn}>
                  <Icons.Cart /> Add All to Cart
                </button>
              </div>
              <p style={styles.itemCount}>{wishlist.length} {wishlist.length === 1 ? 'game' : 'games'} saved</p>

              {/* Stats */}
              <div className="wishlist-stats">
                <div style={styles.statsCard}>
                  <p style={styles.statsLabel}>Total Value</p>
                  <p style={styles.statsValue}>${totalValue.toFixed(2)}</p>
                </div>
                <div style={styles.statsCard}>
                  <p style={styles.statsLabel}>Potential Savings</p>
                  <p style={{ ...styles.statsValue, ...styles.statsSavings }}>${totalSavings.toFixed(2)}</p>
                </div>
                <div style={styles.statsCard}>
                  <p style={styles.statsLabel}>Games on Sale</p>
                  <p style={styles.statsValue}>{wishlist.filter(g => g.discount > 0).length}</p>
                </div>
              </div>

              {/* Wishlist Grid */}
              <div className="wishlist-grid">
                {wishlist.map(game => (
                  <div key={game.id} style={styles.gameCard}>
                    <img src={game.image} alt={game.title} style={styles.gameImage} />
                    <button 
                      onClick={() => removeFromWishlist(game.id)} 
                      style={styles.removeBtn}
                      title="Remove from wishlist"
                    >
                      <Icons.X />
                    </button>
                    {game.discount > 0 && (
                      <span style={styles.discountBadge}>-{game.discount}%</span>
                    )}
                    <div style={styles.gameInfo}>
                      <p style={styles.gameMeta}>{game.platform} • {game.genre}</p>
                      <h3 style={styles.gameTitle}>{game.title}</h3>
                      <div style={styles.priceRow}>
                        <span style={styles.gamePrice}>${game.price}</span>
                        {game.originalPrice && (
                          <span style={styles.originalPrice}>${game.originalPrice}</span>
                        )}
                      </div>
                      <button onClick={() => addToCart(game)} style={styles.addToCartBtn}>
                        <Icons.Cart /> Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div style={styles.emptyWishlist}>
              <div style={styles.emptyIcon}>💚</div>
              <h2 style={styles.emptyTitle}>Your wishlist is empty</h2>
              <p style={styles.emptyText}>
                Save games you're interested in by clicking the heart icon. 
                We'll notify you when they go on sale!
              </p>
              <button style={styles.browseBtn}>Browse Catalog</button>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer style={styles.footer}>
          <div style={styles.footerTop}>
            <a href="/" style={styles.logo}>
              <span style={{ color: theme.colors.primary }}>G</span>KEYS
            </a>
            <nav style={styles.footerNav}>
              <a href="/catalog" style={styles.footerLink}>Catalog</a>
              <a href="/new" style={styles.footerLink}>New</a>
              <a href="/media" style={styles.footerLink}>Media</a>
              <a href="/support" style={styles.footerLink}>Support</a>
            </nav>
            <div style={styles.footerSocial}>
              <a href="#" style={{ color: theme.colors.text }}><Icons.Telegram /></a>
              <a href="#" style={{ color: theme.colors.text }}><Icons.Instagram /></a>
            </div>
          </div>
          <div style={styles.footerBottom}>
            <p style={styles.copyright}>© 2025 GKEYS. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

