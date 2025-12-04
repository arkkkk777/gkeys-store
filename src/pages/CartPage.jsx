// Cart/Checkout Page - GKEYS Gaming Store
import React, { useState } from 'react';

const theme = {
  colors: {
    primary: '#00FF66',
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
    success: '#00FF66',
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

const initialCartItems = [
  { id: 1, title: 'Cyberpunk 2077', price: 59.99, originalPrice: 69.99, image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=120&h=160&fit=crop', platform: 'Steam', quantity: 1 },
  { id: 2, title: 'Elden Ring', price: 49.99, originalPrice: null, image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=120&h=160&fit=crop', platform: 'Steam', quantity: 1 },
  { id: 3, title: 'Red Dead Redemption 2', price: 39.99, originalPrice: 59.99, image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=120&h=160&fit=crop', platform: 'Rockstar', quantity: 2 },
];

const recommendedGames = [
  { id: 10, title: 'GTA V', price: 29.99, image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b2b0d?w=150&h=200&fit=crop' },
  { id: 11, title: 'The Witcher 3', price: 19.99, image: 'https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=150&h=200&fit=crop' },
  { id: 12, title: 'Hogwarts Legacy', price: 54.99, image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=150&h=200&fit=crop' },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('balance');
  const userBalance = 250.00;

  const updateQuantity = (id, delta) => {
    setCartItems(items => items.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const applyPromo = () => {
    if (promoCode.toUpperCase() === 'GKEYS10') {
      setPromoApplied(true);
      setPromoDiscount(10);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = promoApplied ? (subtotal * promoDiscount / 100) : 0;
  const total = subtotal - discount;
  const canPayWithBalance = userBalance >= total;

  const responsiveCSS = `
    .checkout-layout { display: grid; grid-template-columns: 1fr 380px; gap: 32px; }
    .cart-items { display: flex; flex-direction: column; gap: 16px; }
    .cart-item { display: grid; grid-template-columns: 100px 1fr auto; gap: 16px; align-items: center; }
    .recommended-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
    @media (max-width: 1024px) {
      .checkout-layout { grid-template-columns: 1fr; }
      .order-summary { position: static; }
    }
    @media (max-width: 768px) {
      .cart-item { grid-template-columns: 80px 1fr; }
      .cart-item-actions { grid-column: 1 / -1; display: flex; justify-content: space-between; margin-top: 8px; }
      .recommended-grid { grid-template-columns: repeat(2, 1fr); }
      .desktop-nav, .desktop-search, .desktop-login { display: none; }
    }
    @media (max-width: 480px) {
      .recommended-grid { grid-template-columns: 1fr 1fr; gap: 12px; }
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
    main: { maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' },
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
      <div style={styles.app}>
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
            <button style={styles.iconButton}><Icons.Heart filled={false} /></button>
            <button style={{ ...styles.iconButton, color: theme.colors.primary }}><Icons.Cart /></button>
            <button style={styles.searchButton} className="desktop-search"><Icons.Search /> Search</button>
            <button style={styles.loginButton} className="desktop-login">Log in</button>
          </div>
        </header>

        {/* Main Content */}
        <main style={styles.main}>
          <h1 style={styles.pageTitle}>Shopping Cart</h1>
          <p style={styles.itemCount}>{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}</p>

          {cartItems.length > 0 ? (
            <div className="checkout-layout">
              {/* Cart Items */}
              <div>
                <div className="cart-items">
                  {cartItems.map(item => (
                    <div key={item.id} style={styles.cartCard}>
                      <div className="cart-item">
                        <img src={item.image} alt={item.title} style={styles.cartImage} />
                        <div style={styles.cartInfo}>
                          <h3 style={styles.cartTitle}>{item.title}</h3>
                          <p style={styles.cartPlatform}>{item.platform}</p>
                          <div>
                            <span style={styles.cartPrice}>${(item.price * item.quantity).toFixed(2)}</span>
                            {item.originalPrice && (
                              <span style={styles.cartOriginalPrice}>${(item.originalPrice * item.quantity).toFixed(2)}</span>
                            )}
                          </div>
                        </div>
                        <div className="cart-item-actions" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
                          <div style={styles.quantityControl}>
                            <button style={styles.quantityBtn} onClick={() => updateQuantity(item.id, -1)}><Icons.Minus /></button>
                            <span style={styles.quantityValue}>{item.quantity}</span>
                            <button style={styles.quantityBtn} onClick={() => updateQuantity(item.id, 1)}><Icons.Plus /></button>
                          </div>
                          <button style={styles.removeBtn} onClick={() => removeItem(item.id)}>
                            <Icons.Trash /> Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recommended Games */}
                <h2 style={styles.sectionTitle}>You might also like</h2>
                <div className="recommended-grid">
                  {recommendedGames.map(game => (
                    <div key={game.id} style={styles.recommendedCard}>
                      <img src={game.image} alt={game.title} style={styles.recommendedImage} />
                      <div style={styles.recommendedInfo}>
                        <p style={styles.recommendedTitle}>{game.title}</p>
                        <p style={styles.recommendedPrice}>${game.price}</p>
                        <button style={styles.addToCartBtn}>Add to Cart</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div style={styles.summaryCard} className="order-summary">
                <h2 style={styles.summaryTitle}>Order Summary</h2>

                {/* Promo Code */}
                <div style={styles.promoInput}>
                  <input
                    type="text"
                    placeholder="Promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    style={styles.input}
                  />
                  <button onClick={applyPromo} style={styles.applyBtn}>Apply</button>
                </div>

                {promoApplied && (
                  <div style={styles.promoSuccess}>
                    <Icons.Check /> GKEYS10 applied (-{promoDiscount}%)
                  </div>
                )}

                {/* Summary */}
                <div style={styles.summaryRow}>
                  <span style={styles.summaryLabel}>Subtotal</span>
                  <span style={styles.summaryValue}>${subtotal.toFixed(2)}</span>
                </div>
                {promoApplied && (
                  <div style={styles.summaryRow}>
                    <span style={styles.summaryLabel}>Promo discount</span>
                    <span style={{ ...styles.summaryValue, color: theme.colors.success }}>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div style={styles.totalRow}>
                  <span style={styles.totalLabel}>Total</span>
                  <span style={styles.totalValue}>${total.toFixed(2)}</span>
                </div>

                {/* Payment Method */}
                <div style={styles.paymentSection}>
                  <p style={styles.paymentTitle}>Payment Method</p>
                  
                  <div 
                    style={styles.paymentOption(paymentMethod === 'balance')}
                    onClick={() => setPaymentMethod('balance')}
                  >
                    <div style={styles.paymentRadio(paymentMethod === 'balance')}>
                      {paymentMethod === 'balance' && <div style={styles.paymentRadioInner} />}
                    </div>
                    <Icons.Wallet />
                    <div style={styles.paymentInfo}>
                      <p style={styles.paymentName}>Account Balance</p>
                      <p style={styles.paymentBalance}>${userBalance.toFixed(2)} available</p>
                    </div>
                  </div>

                  <div 
                    style={styles.paymentOption(paymentMethod === 'card')}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <div style={styles.paymentRadio(paymentMethod === 'card')}>
                      {paymentMethod === 'card' && <div style={styles.paymentRadioInner} />}
                    </div>
                    <Icons.CreditCard />
                    <div style={styles.paymentInfo}>
                      <p style={styles.paymentName}>Credit/Debit Card</p>
                      <p style={styles.paymentBalance}>Visa, Mastercard, etc.</p>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <button 
                  style={{
                    ...styles.checkoutBtn,
                    ...(paymentMethod === 'balance' && !canPayWithBalance ? styles.disabledBtn : {})
                  }}
                  disabled={paymentMethod === 'balance' && !canPayWithBalance}
                >
                  {paymentMethod === 'balance' ? 'Pay with Balance' : 'Proceed to Payment'}
                </button>
                
                {paymentMethod === 'balance' && !canPayWithBalance && (
                  <p style={styles.insufficientBalance}>
                    Insufficient balance. Please top up or use another payment method.
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div style={styles.emptyCart}>
              <div style={styles.emptyIcon}>🛒</div>
              <h2 style={styles.emptyTitle}>Your cart is empty</h2>
              <p style={styles.emptyText}>Browse our catalog and find your next adventure!</p>
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

