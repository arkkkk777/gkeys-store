// Profile Balance Page - GKEYS Gaming Store
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icons } from '../components/UIKit';

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
  { id: 'profile', label: 'Profile' },
  { id: 'orders', label: 'Orders' },
  { id: 'wishlist', label: 'Wishlist' },
  { id: 'balance', label: 'Balance' },
  { id: 'edit-profile', label: 'Edit Profile', badge: '+5' },
];

const paymentMethods = [
  { id: 'trustly', label: 'Trustly' },
  { id: 'card', label: 'Visa, Mastercard' },
  { id: 'klarna', label: 'Klarna' },
  { id: 'apple', label: 'Apple Pay' },
];

const responsiveCSS = `
  @media (max-width: 768px) {
    .desktop-nav { display: none !important; }
    .desktop-search { display: none !important; }
    .desktop-login { display: none !important; }
    .profile-layout { flex-direction: column !important; }
    .profile-sidebar { width: 100% !important; flex-direction: row !important; overflow-x: auto !important; gap: 8px !important; padding-bottom: 16px !important; }
    .sidebar-item { white-space: nowrap !important; }
    .balance-content { flex-direction: column !important; }
    .user-info { margin-bottom: 24px !important; }
  }
`;

export default function ProfileBalancePage() {
  const [activeTab, setActiveTab] = useState('balance');
  const [selectedPayment, setSelectedPayment] = useState('trustly');
  const [promoCode, setPromoCode] = useState('');
  const [amount, setAmount] = useState('');

  const styles = {
    app: {
      minHeight: '100vh',
      backgroundColor: theme.colors.background,
      color: theme.colors.text,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      display: 'flex',
      flexDirection: 'column',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 24px',
      backgroundColor: theme.colors.background,
      borderBottom: `1px solid ${theme.colors.border}`,
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '24px',
      fontWeight: '700',
      textDecoration: 'none',
      color: theme.colors.text,
    },
    nav: {
      display: 'flex',
      alignItems: 'center',
      gap: '32px',
    },
    navLink: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: theme.colors.text,
      textDecoration: 'none',
      fontSize: '16px',
    },
    rightSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
    },
    iconButton: {
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
    },
    searchButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '10px 20px',
      backgroundColor: theme.colors.surface,
      borderRadius: '50px',
      color: theme.colors.textSecondary,
      border: 'none',
      cursor: 'pointer',
      minWidth: '150px',
    },
    loginButton: {
      padding: '10px 24px',
      backgroundColor: 'transparent',
      border: `1px solid ${theme.colors.border}`,
      borderRadius: '8px',
      color: theme.colors.text,
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
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
    content: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
    },
    userInfo: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '16px',
    },
    avatar: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      backgroundColor: '#1a1a2e',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '40px',
      border: `3px solid ${theme.colors.primary}`,
      boxShadow: `0 0 20px rgba(0, 255, 102, 0.3)`,
    },
    userName: {
      fontSize: '24px',
      fontWeight: '600',
    },
    balanceCard: {
      backgroundColor: theme.colors.surfaceLight,
      borderRadius: '16px',
      padding: '24px',
      maxWidth: '400px',
    },
    balanceTitle: {
      fontSize: '20px',
      fontWeight: '600',
      marginBottom: '16px',
    },
    balanceRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px',
    },
    balanceLabel: {
      color: theme.colors.textSecondary,
      fontSize: '14px',
    },
    balanceAmount: {
      fontSize: '18px',
      fontWeight: '600',
    },
    sectionTitle: {
      fontSize: '16px',
      fontWeight: '600',
      marginBottom: '12px',
    },
    inputGroup: {
      display: 'flex',
      gap: '8px',
      marginBottom: '24px',
    },
    input: {
      flex: 1,
      padding: '12px 16px',
      backgroundColor: theme.colors.surface,
      border: `1px solid ${theme.colors.border}`,
      borderRadius: '8px',
      color: theme.colors.text,
      fontSize: '14px',
      outline: 'none',
    },
    useButton: {
      padding: '12px 24px',
      backgroundColor: theme.colors.surfaceLight,
      border: 'none',
      borderRadius: '8px',
      color: theme.colors.textSecondary,
      fontSize: '14px',
      cursor: 'pointer',
    },
    paymentMethods: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      marginBottom: '24px',
    },
    paymentOption: (isSelected) => ({
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      color: theme.colors.text,
      fontSize: '14px',
    }),
    radio: (isSelected) => ({
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      border: `2px solid ${isSelected ? theme.colors.primary : theme.colors.border}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }),
    radioDot: {
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      backgroundColor: theme.colors.primary,
    },
    proceedButton: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      padding: '14px 24px',
      backgroundColor: theme.colors.primary,
      color: '#000',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
    },
    footer: {
      backgroundColor: theme.colors.background,
      borderTop: `1px solid ${theme.colors.border}`,
      padding: '48px 24px',
      marginTop: 'auto',
    },
    footerTop: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '24px',
      marginBottom: '32px',
      maxWidth: '1280px',
      margin: '0 auto 32px',
    },
    footerNav: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '24px',
    },
    footerLink: {
      color: theme.colors.textSecondary,
      textDecoration: 'none',
      fontSize: '14px',
    },
    footerSocial: {
      display: 'flex',
      gap: '16px',
    },
    footerBottom: {
      textAlign: 'center',
      paddingTop: '32px',
      borderTop: `1px solid ${theme.colors.border}`,
      maxWidth: '1280px',
      margin: '0 auto',
    },
    copyright: {
      color: theme.colors.textMuted,
      fontSize: '12px',
      lineHeight: '1.8',
    },
  };

  return (
    <>
      <style>{responsiveCSS}</style>
      <div style={styles.app}>
        {/* Header */}
        <header style={styles.header}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
            <Link to="/" style={styles.logo}>
              <span style={{ color: theme.colors.primary }}>G</span>KEYS
            </Link>
            <nav style={styles.nav} className="desktop-nav">
              <a href="/catalog" style={styles.navLink}>
                <Icons.Grid /> Catalog
              </a>
              <a href="/media" style={styles.navLink}>
                <Icons.Media /> Media
              </a>
            </nav>
          </div>
          <div style={styles.rightSection}>
            <button style={styles.iconButton}><Icons.Heart /></button>
            <button style={styles.iconButton}><Icons.Cart /></button>
            <button style={styles.searchButton} className="desktop-search">
              <Icons.Search /> Search
            </button>
            <button style={styles.loginButton} className="desktop-login">Log in</button>
          </div>
        </header>

        {/* Main Content */}
        <main style={styles.main}>
          <div style={styles.profileLayout} className="profile-layout">
            {/* Sidebar */}
            <aside style={styles.sidebar} className="profile-sidebar">
              {sidebarItems.map((item) => (
                item.id === 'orders' ? (
                  <Link
                    key={item.id}
                    to="/profile/orders"
                    style={styles.sidebarItem(activeTab === item.id)}
                    className="sidebar-item"
                  >
                    {item.label}
                    {item.badge && <span style={styles.sidebarBadge}>{item.badge}</span>}
                  </Link>
                ) : (
                  <button
                    key={item.id}
                    style={styles.sidebarItem(activeTab === item.id)}
                    onClick={() => setActiveTab(item.id)}
                    className="sidebar-item"
                  >
                    {item.label}
                    {item.badge && <span style={styles.sidebarBadge}>{item.badge}</span>}
                  </button>
                )
              ))}
              <button style={styles.logoutButton}>Log Out</button>
            </aside>

            {/* Balance Content */}
            <div style={styles.content} className="balance-content">
              {/* User Info */}
              <div style={styles.userInfo} className="user-info">
                <div style={styles.avatar}>🎮</div>
                <span style={styles.userName}>Newbie Guy</span>
              </div>

              {/* Balance Card */}
              <div style={styles.balanceCard}>
                <h3 style={styles.balanceTitle}>Your Balance Info</h3>
                <div style={styles.balanceRow}>
                  <span style={styles.balanceLabel}>Current balance</span>
                  <span style={styles.balanceAmount}>56€</span>
                </div>

                <h4 style={styles.sectionTitle}>Do you have a promo code?</h4>
                <div style={styles.inputGroup}>
                  <input
                    type="text"
                    placeholder="Your promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    style={styles.input}
                  />
                  <button style={styles.useButton}>Use</button>
                </div>

                <h4 style={styles.sectionTitle}>Top up your balance</h4>
                <input
                  type="text"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  style={{ ...styles.input, width: '100%', marginBottom: '16px' }}
                />

                <div style={styles.paymentMethods}>
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      style={styles.paymentOption(selectedPayment === method.id)}
                      onClick={() => setSelectedPayment(method.id)}
                    >
                      <div style={styles.radio(selectedPayment === method.id)}>
                        {selectedPayment === method.id && <div style={styles.radioDot} />}
                      </div>
                      {method.label}
                    </button>
                  ))}
                </div>

                <button style={styles.proceedButton}>
                  <Icons.CreditCard />
                  Proceed to pay
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer style={styles.footer}>
          <div style={styles.footerTop}>
            <Link to="/" style={styles.logo}>
              <span style={{ color: theme.colors.primary }}>G</span>KEYS
            </Link>
            <nav style={styles.footerNav}>
              <a href="/catalog" style={styles.footerLink}>Catalog</a>
              <a href="/new" style={styles.footerLink}>New</a>
              <a href="/media" style={styles.footerLink}>Media</a>
              <a href="/contacts" style={styles.footerLink}>Contacts</a>
              <a href="/support" style={styles.footerLink}>Support</a>
            </nav>
            <div style={styles.footerSocial}>
              <a href="#" style={{ color: theme.colors.text }}><Icons.Telegram /></a>
              <a href="#" style={{ color: theme.colors.text }}><Icons.Instagram /></a>
            </div>
          </div>
          <div style={{ ...styles.footerNav, justifyContent: 'center', marginBottom: '24px' }}>
            <a href="/terms" style={styles.footerLink}>User Agreement</a>
            <a href="/privacy" style={styles.footerLink}>Privacy Policy</a>
          </div>
          <div style={styles.footerBottom}>
            <p style={styles.copyright}>
              © 2025 GKEYS. All rights reserved. Copying any materials from the site is prohibited!<br />
              All product and game names, company names and brands, logos, trademarks, and other materials are the property of their respective owners.<br />
              Only licensed keys for all gaming platforms: Steam, Uplay, Battle.net, Origin, and others.<br />
              All keys sold are purchased from official distributors and directly from publishers.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

