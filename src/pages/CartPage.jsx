// Cart/Checkout Page - GKEYS Gaming Store
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gamesApi } from '../services/gamesApi';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Container } from '../components/ui/container';
import { useCart } from '../hooks/useCart';
import { CartItem } from '../components/cart/CartItem';
import { CheckoutSummary } from '../components/cart/CheckoutSummary';

const theme = {
  colors: {
    primary: '#00C8C2',
    primaryDark: '#00CC52',
    background: '#0D0D0D',
    surface: '#1A1A1A',
    surfaceLight: '#2A2A2A',
    surfaceHover: '#333333',
    text: '#FFFFFF',
    textSecondary: '#999999',
    textMuted: '#666666',
    border: '#333333',
    discount: '#FF4444',
    success: '#00C8C2',
    error: '#FF4444',
  },
};

const Icons = {
  Search: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>,
  Heart: ({ filled }) => <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? theme.colors.primary : "none"} stroke={filled ? theme.colors.primary : "currentColor"} strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  Cart: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>,
  Grid: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  Media: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  Trash: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
  Plus: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Minus: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Check: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>,
  Tag: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>,
  CreditCard: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
  Wallet: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4z"/></svg>,
  Telegram: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>,
  Instagram: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
};

export default function CartPage() {
  const navigate = useNavigate();
  const { cart, loading: cartLoading } = useCart();
  const [recommendedGames, setRecommendedGames] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  
  // Load recommended games based on cart items
  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        if (cart && cart.items.length > 0) {
          // Get similar games based on first cart item
          const firstGameId = cart.items[0].gameId;
          const similar = await gamesApi.getSimilarGames(firstGameId, 8);
          setRecommendedGames(similar);
        } else {
          // Get random games if cart is empty
          const games = await gamesApi.getRandomGames(8);
          setRecommendedGames(games);
        }
      } catch (error) {
        console.error('Failed to load recommendations:', error);
        setRecommendedGames([]);
      }
    };
    loadRecommendations();
  }, [cart]);

  const handlePromoApply = async (code) => {
    // TODO: Implement promo code validation via API
    if (code.toUpperCase() === 'GKEYS10') {
      setPromoDiscount(10);
      return { success: true, discount: 10 };
    }
    return { success: false, discount: 0 };
  };

  const handleCreateOrder = async (promoCode) => {
    // Navigate to checkout page
    navigate('/checkout');
  };

  const responsiveCSS = `
    .checkout-layout { display: grid; grid-template-columns: 1fr 380px; gap: 32px; }
    .cart-items { display: flex; flex-direction: column; gap: 16px; }
    .cart-item { display: grid; grid-template-columns: 100px 1fr auto; gap: 16px; align-items: center; }
    .recommended-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; width: 100%; }
    .recommended-grid > * { min-width: 0; }
    @media (max-width: 1024px) {
      .checkout-layout { grid-template-columns: 1fr; padding: 0 12px; }
      .order-summary { position: static; }
      .recommended-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    }
    @media (max-width: 768px) {
      .checkout-layout { padding: 0 12px; }
      .cart-item { grid-template-columns: 80px 1fr; }
      .cart-item-actions { grid-column: 1 / -1; display: flex; justify-content: space-between; margin-top: 8px; }
      .recommended-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .desktop-nav, .desktop-search, .desktop-login { display: none; }
    }
    @media (max-width: 480px) {
      .recommended-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
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
    main: { maxWidth: '1200px', margin: '0 auto' },
    pageTitle: { fontSize: '28px', fontWeight: '700', marginBottom: '8px' },
    itemCount: { color: theme.colors.textMuted, fontSize: '14px', marginBottom: '32px' },
    cartCard: { background: theme.colors.surface, borderRadius: '12px', padding: '20px' },
    cartImage: { width: '100px', height: '130px', objectFit: 'cover', borderRadius: '8px' },
    cartInfo: { flex: 1 },
    cartTitle: { fontSize: '16px', fontWeight: '600', marginBottom: '4px' },
    cartPlatform: { fontSize: '13px', color: theme.colors.textMuted, marginBottom: '8px' },
    cartPrice: { fontSize: '18px', fontWeight: '700', color: theme.colors.primary },
    cartOriginalPrice: { fontSize: '14px', color: theme.colors.textMuted, textDecoration: 'line-through', marginLeft: '8px' },
    quantityControl: { display: 'flex', alignItems: 'center', gap: '12px', background: theme.colors.surfaceLight, borderRadius: '8px', padding: '4px' },
    quantityBtn: { background: 'none', border: 'none', color: theme.colors.text, cursor: 'pointer', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    quantityValue: { fontSize: '14px', fontWeight: '600', minWidth: '24px', textAlign: 'center' },
    removeBtn: { background: 'none', border: 'none', color: theme.colors.error, cursor: 'pointer', padding: '8px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' },
    summaryCard: { background: theme.colors.surface, borderRadius: '12px', padding: '24px', position: 'sticky', top: '100px' },
    summaryTitle: { fontSize: '18px', fontWeight: '700', marginBottom: '20px' },
    promoInput: { display: 'flex', gap: '8px', marginBottom: '20px' },
    input: { flex: 1, background: theme.colors.surfaceLight, border: `1px solid ${theme.colors.border}`, borderRadius: '8px', padding: '12px 16px', color: theme.colors.text, fontSize: '14px', outline: 'none' },
    applyBtn: { background: theme.colors.surfaceLight, border: 'none', borderRadius: '8px', padding: '12px 16px', color: theme.colors.text, cursor: 'pointer', fontWeight: '500' },
    promoSuccess: { display: 'flex', alignItems: 'center', gap: '8px', color: theme.colors.success, fontSize: '13px', marginBottom: '16px' },
    summaryRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px' },
    summaryLabel: { color: theme.colors.textSecondary },
    summaryValue: { fontWeight: '500' },
    totalRow: { display: 'flex', justifyContent: 'space-between', paddingTop: '16px', borderTop: `1px solid ${theme.colors.border}`, marginTop: '16px', marginBottom: '24px' },
    totalLabel: { fontSize: '16px', fontWeight: '600' },
    totalValue: { fontSize: '24px', fontWeight: '700', color: theme.colors.primary },
    paymentSection: { marginBottom: '24px' },
    paymentTitle: { fontSize: '14px', fontWeight: '600', marginBottom: '12px' },
    paymentOption: (isSelected) => ({ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', background: isSelected ? theme.colors.surfaceLight : 'transparent', border: `1px solid ${isSelected ? theme.colors.primary : theme.colors.border}`, borderRadius: '10px', cursor: 'pointer', marginBottom: '8px', transition: 'all 0.2s' }),
    paymentRadio: (isSelected) => ({ width: '20px', height: '20px', borderRadius: '50%', border: `2px solid ${isSelected ? theme.colors.primary : theme.colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }),
    paymentRadioInner: { width: '10px', height: '10px', borderRadius: '50%', background: theme.colors.primary },
    paymentInfo: { flex: 1 },
    paymentName: { fontSize: '14px', fontWeight: '500' },
    paymentBalance: { fontSize: '12px', color: theme.colors.textMuted },
    checkoutBtn: { width: '100%', background: theme.colors.primary, color: '#000', border: 'none', padding: '16px', borderRadius: '10px', fontSize: '16px', fontWeight: '700', cursor: 'pointer' },
    disabledBtn: { opacity: 0.5, cursor: 'not-allowed' },
    insufficientBalance: { color: theme.colors.error, fontSize: '13px', textAlign: 'center', marginTop: '12px' },
    sectionTitle: { fontSize: '20px', fontWeight: '700', marginBottom: '20px', marginTop: '48px' },
    recommendedCard: { background: theme.colors.surface, borderRadius: '10px', overflow: 'hidden', cursor: 'pointer' },
    recommendedImage: { width: '100%', aspectRatio: '3/4', objectFit: 'cover' },
    recommendedInfo: { padding: '12px' },
    recommendedTitle: { fontSize: '13px', fontWeight: '500', marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
    recommendedPrice: { fontSize: '15px', fontWeight: '700', color: theme.colors.primary },
    addToCartBtn: { width: '100%', background: theme.colors.surfaceLight, border: 'none', padding: '10px', color: theme.colors.text, fontSize: '13px', fontWeight: '500', cursor: 'pointer', marginTop: '8px', borderRadius: '6px' },
    emptyCart: { textAlign: 'center', padding: '60px 20px' },
    emptyIcon: { fontSize: '64px', marginBottom: '16px', opacity: 0.3 },
    emptyTitle: { fontSize: '20px', fontWeight: '600', marginBottom: '8px' },
    emptyText: { color: theme.colors.textMuted, marginBottom: '24px' },
    browseBtn: { background: theme.colors.primary, color: '#000', border: 'none', padding: '14px 32px', borderRadius: '10px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' },
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
      {/* Main Content */}
        <main className="max-w-[1200px] mx-auto">
          <Container padding="md">
          <h1 style={styles.pageTitle}>Shopping Cart</h1>
          {cartLoading ? (
            <p style={styles.itemCount}>Loading...</p>
          ) : cart ? (
            <p style={styles.itemCount}>
              {cart.items.length} {cart.items.length === 1 ? 'item' : 'items'}
            </p>
          ) : null}

          {cartLoading ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: theme.colors.text }}>
              Loading cart...
            </div>
          ) : cart && cart.items.length > 0 ? (
            <div className="checkout-layout">
              {/* Cart Items */}
              <div>
                <div className="cart-items">
                  {cart.items.map((item) => (
                    <CartItem key={item.gameId} item={item} />
                  ))}
                </div>

                {/* Recommended Games */}
                {recommendedGames.length > 0 && (
                  <>
                    <h2 style={styles.sectionTitle}>You might also like</h2>
                    <div className="recommended-grid">
                      {recommendedGames.map(game => (
                        <div key={game.id} style={styles.recommendedCard}>
                          <Link to={`/game/${game.slug}`} style={{ textDecoration: 'none' }}>
                            <img src={game.image} alt={game.title} style={styles.recommendedImage} />
                          </Link>
                          <div style={styles.recommendedInfo}>
                            <Link to={`/game/${game.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                              <p style={styles.recommendedTitle}>{game.title}</p>
                            </Link>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                              <p style={styles.recommendedPrice}>€{game.price?.toFixed(2)}</p>
                              {game.originalPrice && game.originalPrice > game.price && (
                                <span style={{ fontSize: '12px', color: theme.colors.textMuted, textDecoration: 'line-through' }}>
                                  €{game.originalPrice.toFixed(2)}
                                </span>
                              )}
                            </div>
                            <button style={styles.addToCartBtn}>Add to Cart</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Order Summary */}
              <CheckoutSummary
                cart={cart}
                promoCode={promoCode}
                onPromoCodeChange={setPromoCode}
                onPromoApply={handlePromoApply}
                onCreateOrder={handleCreateOrder}
              />
            </div>
          ) : (
            <div style={styles.emptyCart}>
              <div style={styles.emptyIcon}>🛒</div>
              <h2 style={styles.emptyTitle}>Your cart is empty</h2>
              <p style={styles.emptyText}>Browse our catalog and find your next adventure!</p>
              <Link to="/catalog">
                <button type="button" style={styles.browseBtn}>Browse Catalog</button>
              </Link>
            </div>
          )}
          </Container>
        </main>
    </>
  );
}

