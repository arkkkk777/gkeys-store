// Game Detail Page - GKEYS Gaming Store
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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
  },
};

const gameData = {
  title: 'Detroit: Become Human',
  description: 'An engaging and emotionally rich story set in a world where androids coexist side by side with humans.',
  fullDescription: `Detroit: Become Human is an award-winning interactive drama that puts you at the center of a gripping sci-fi story about choice, freedom, and what it truly means to be alive. In a near-future Detroit, androids built to serve humans have begun to awaken – questioning their purpose and fighting for independence.

Take control of three unique characters – Kara, a housekeeper seeking freedom for herself and a child; Connor, a prototype investigator tasked with hunting deviant androids; and Markus, a revolutionary who may lead his people to liberation or destruction. Every choice you make shapes their destinies and the future of an entire civilization.

Featuring breathtaking visuals, realistic performances, and one of the most advanced branching story systems ever created, Detroit: Become Human offers an emotional, cinematic experience where your decisions truly matter. No two playthroughs are the same – every action, every word, and every sacrifice changes the course of the story.`,
  price: 13,
  originalPrice: 50,
  discount: '-10%',
  badges: ['Best Seller', 'Currently Watching'],
  deliveryMethod: 'Key',
  platform: 'Steam',
  genre: ['Adventure', 'Sci-Fi', 'Action'],
  platformType: 'PC',
  publisher: 'Quantic Dream',
  developer: 'Quantic Dream',
  releaseDate: '18 июня 2020 г.',
  ageRating: '18+',
  image: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=1920&h=600&fit=crop',
};

const similarGames = [
  { id: 1, title: 'Far Cry 3', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=400&fit=crop', price: 13, originalPrice: 50, discount: '-86%', badges: ['Best Seller'] },
  { id: 2, title: 'Metro Redux', image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=300&h=400&fit=crop', price: 13, originalPrice: 50, discount: '-86%', badges: [] },
  { id: 3, title: 'Hitman', image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b2b0e?w=300&h=400&fit=crop', price: 13, originalPrice: 50, discount: '-86%', badges: [] },
  { id: 4, title: 'Detroit: Become Human', image: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=300&h=400&fit=crop', price: 13, originalPrice: 50, discount: '-86%', badges: [] },
  { id: 5, title: 'The Last of Us Part II', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&h=400&fit=crop', price: 13, originalPrice: 50, discount: '-86%', badges: [] },
];

const responsiveCSS = `
  @media (max-width: 768px) {
    .desktop-nav { display: none !important; }
    .desktop-search { display: none !important; }
    .desktop-login { display: none !important; }
    .hero-section { height: auto !important; min-height: 400px !important; padding: 24px !important; }
    .hero-content { max-width: 100% !important; }
    .hero-title { font-size: 28px !important; }
    .hero-right { position: relative !important; margin-top: 24px !important; }
    .info-grid { grid-template-columns: 1fr !important; }
    .similar-grid { grid-template-columns: repeat(2, 1fr) !important; }
  }
  @media (max-width: 480px) {
    .hero-title { font-size: 24px !important; }
    .similar-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }
  }
`;

const GameCard = ({ game }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Link to={`/game/${game.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div 
        style={{ 
          cursor: 'pointer',
          transition: 'transform 0.2s ease',
          transform: isHovered ? 'translateY(-4px)' : 'none',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '3/4',
          borderRadius: '12px',
          overflow: 'hidden',
          marginBottom: '8px',
        }}>
          <img src={game.image} alt={game.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          {game.badges.length > 0 && (
            <span style={{
              position: 'absolute',
              top: '8px',
              left: '8px',
              backgroundColor: theme.colors.primary,
              color: '#000',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '11px',
              fontWeight: '600',
            }}>{game.badges[0]}</span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '16px', fontWeight: '600' }}>{game.price}€</span>
          <span style={{ fontSize: '14px', color: theme.colors.textMuted, textDecoration: 'line-through' }}>{game.originalPrice}€</span>
          <span style={{ backgroundColor: theme.colors.primary, color: '#000', padding: '2px 6px', borderRadius: '4px', fontSize: '12px', fontWeight: '600' }}>{game.discount}</span>
        </div>
      </div>
    </Link>
  );
};

export default function GameDetailPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('description');
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const styles = {
    app: {
      minHeight: '100vh',
      backgroundColor: theme.colors.background,
      color: theme.colors.text,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
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
    breadcrumb: {
      padding: '16px 24px',
      fontSize: '14px',
      color: theme.colors.textSecondary,
    },
    breadcrumbLink: {
      color: theme.colors.textSecondary,
      textDecoration: 'none',
    },
    breadcrumbSeparator: {
      margin: '0 8px',
    },
    breadcrumbCurrent: {
      color: theme.colors.text,
    },
    hero: {
      position: 'relative',
      minHeight: '400px',
      backgroundImage: `linear-gradient(to right, rgba(13,13,13,0.95), rgba(13,13,13,0.6)), url(${gameData.image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '48px',
      gap: '48px',
    },
    heroContent: {
      maxWidth: '500px',
    },
    badgeContainer: {
      display: 'flex',
      gap: '8px',
      marginBottom: '16px',
      flexWrap: 'wrap',
    },
    badge: (variant) => ({
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      padding: '6px 12px',
      backgroundColor: variant === 'primary' ? theme.colors.primary : theme.colors.surface,
      color: variant === 'primary' ? '#000' : theme.colors.text,
      borderRadius: '50px',
      fontSize: '12px',
      fontWeight: '600',
    }),
    heroTitle: {
      fontSize: '36px',
      fontWeight: '700',
      marginBottom: '12px',
    },
    heroDescription: {
      color: theme.colors.textSecondary,
      fontSize: '16px',
      lineHeight: '1.6',
      marginBottom: '24px',
    },
    deliveryInfo: {
      display: 'flex',
      gap: '24px',
      marginBottom: '24px',
    },
    deliveryItem: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
    deliveryLabel: {
      color: theme.colors.textSecondary,
      fontSize: '12px',
    },
    deliveryBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '8px 16px',
      backgroundColor: theme.colors.surface,
      borderRadius: '50px',
      fontSize: '14px',
    },
    activateLink: {
      color: theme.colors.primary,
      fontSize: '14px',
      textDecoration: 'none',
    },
    heroRight: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '16px',
    },
    priceContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    currentPrice: {
      fontSize: '32px',
      fontWeight: '700',
    },
    originalPrice: {
      fontSize: '20px',
      color: theme.colors.textMuted,
      textDecoration: 'line-through',
    },
    discount: {
      backgroundColor: theme.colors.primary,
      color: '#000',
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '14px',
      fontWeight: '600',
    },
    actionButtons: {
      display: 'flex',
      gap: '12px',
    },
    buyButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '14px 48px',
      backgroundColor: theme.colors.primary,
      color: '#000',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
    },
    wishlistButton: {
      width: '48px',
      height: '48px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.surface,
      border: 'none',
      borderRadius: '8px',
      color: theme.colors.text,
      cursor: 'pointer',
    },
    container: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 24px',
    },
    section: {
      padding: '48px 0',
    },
    sectionTitle: {
      fontSize: '24px',
      fontWeight: '600',
      marginBottom: '24px',
    },
    tabsContainer: {
      marginBottom: '24px',
    },
    tab: (isActive) => ({
      padding: '12px 24px',
      backgroundColor: isActive ? theme.colors.surface : 'transparent',
      border: `1px solid ${isActive ? theme.colors.border : 'transparent'}`,
      borderRadius: '8px',
      color: isActive ? theme.colors.text : theme.colors.textSecondary,
      fontSize: '14px',
      cursor: 'pointer',
    }),
    infoGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 300px',
      gap: '48px',
    },
    descriptionText: {
      color: theme.colors.textSecondary,
      fontSize: '15px',
      lineHeight: '1.8',
      whiteSpace: 'pre-line',
    },
    expandButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '40px',
      height: '40px',
      margin: '24px auto 0',
      backgroundColor: theme.colors.surface,
      border: 'none',
      borderRadius: '50%',
      color: theme.colors.text,
      cursor: 'pointer',
    },
    infoCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: '16px',
      padding: '24px',
    },
    infoCardTitle: {
      fontSize: '18px',
      fontWeight: '600',
      marginBottom: '16px',
    },
    infoRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      padding: '12px 0',
      borderBottom: `1px solid ${theme.colors.border}`,
    },
    infoLabel: {
      color: theme.colors.textSecondary,
      fontSize: '14px',
    },
    infoValue: {
      textAlign: 'right',
      fontSize: '14px',
    },
    infoLink: {
      color: theme.colors.primary,
      textDecoration: 'none',
    },
    similarGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      gap: '24px',
    },
    footer: {
      backgroundColor: theme.colors.background,
      borderTop: `1px solid ${theme.colors.border}`,
      padding: '48px 24px',
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
              <a href="/catalog" style={styles.navLink}><Icons.Grid /> Catalog</a>
              <a href="/media" style={styles.navLink}><Icons.Media /> Media</a>
            </nav>
          </div>
          <div style={styles.rightSection}>
            <button style={styles.iconButton}><Icons.Heart /></button>
            <button style={styles.iconButton}><Icons.Cart /></button>
            <button style={styles.searchButton} className="desktop-search"><Icons.Search /> Search</button>
            <button style={styles.loginButton} className="desktop-login">Log in</button>
          </div>
        </header>

        {/* Breadcrumb */}
        <nav style={styles.breadcrumb}>
          <Link to="/" style={styles.breadcrumbLink}>Main</Link>
          <span style={styles.breadcrumbSeparator}>|</span>
          <a href="/catalog" style={styles.breadcrumbLink}>Catalog</a>
          <span style={styles.breadcrumbSeparator}>|</span>
          <span style={styles.breadcrumbCurrent}>{gameData.title}</span>
        </nav>

        {/* Hero Section */}
        <section style={styles.hero} className="hero-section">
          <div style={styles.heroContent} className="hero-content">
            <div style={styles.badgeContainer}>
              <span style={styles.badge('primary')}>● Best Seller</span>
              <span style={styles.badge('secondary')}>● Currently Watching 7</span>
            </div>
            <h1 style={styles.heroTitle} className="hero-title">{gameData.title}</h1>
            <p style={styles.heroDescription}>{gameData.description}</p>
            <div style={styles.deliveryInfo}>
              <div style={styles.deliveryItem}>
                <span style={styles.deliveryLabel}>Delivery Method</span>
                <span style={styles.deliveryBadge}><Icons.Key /> Key</span>
              </div>
              <div style={styles.deliveryItem}>
                <span style={styles.deliveryLabel}>Platform</span>
                <span style={styles.deliveryBadge}><Icons.Steam /> Steam</span>
              </div>
              <a href="#" style={styles.activateLink}>How to activate?</a>
            </div>
          </div>
          <div style={styles.heroRight} className="hero-right">
            <div style={styles.priceContainer}>
              <span style={styles.currentPrice}>{gameData.price}€</span>
              <span style={styles.originalPrice}>{gameData.originalPrice}€</span>
              <span style={styles.discount}>{gameData.discount}</span>
            </div>
            <div style={styles.actionButtons}>
              <button style={styles.buyButton}><Icons.Cart /> Buy</button>
              <button style={styles.wishlistButton}><Icons.Heart /></button>
            </div>
          </div>
        </section>

        {/* Additional Information */}
        <section style={styles.section}>
          <div style={styles.container}>
            <h2 style={styles.sectionTitle}>Additional Information</h2>
            <div style={styles.tabsContainer}>
              <button style={styles.tab(activeTab === 'description')} onClick={() => setActiveTab('description')}>
                Description
              </button>
            </div>
            <div style={styles.infoGrid} className="info-grid">
              <div>
                <p style={styles.descriptionText}>
                  {isDescriptionExpanded ? gameData.fullDescription : gameData.fullDescription.substring(0, 400) + '...'}
                </p>
                <button style={styles.expandButton} onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}>
                  <Icons.ChevronDown />
                </button>
              </div>
              <div style={styles.infoCard}>
                <h3 style={styles.infoCardTitle}>Description</h3>
                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>Genre:</span>
                  <span style={styles.infoValue}>
                    {gameData.genre.map((g, i) => (
                      <span key={g}>
                        <a href="#" style={styles.infoLink}>{g}</a>
                        {i < gameData.genre.length - 1 && '  '}
                      </span>
                    ))}
                  </span>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>Platform:</span>
                  <span style={styles.infoValue}><a href="#" style={styles.infoLink}>{gameData.platformType}</a></span>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>Publisher:</span>
                  <span style={styles.infoValue}><a href="#" style={styles.infoLink}>{gameData.publisher}</a></span>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>Developer:</span>
                  <span style={styles.infoValue}>{gameData.developer}</span>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>Release Date:</span>
                  <span style={styles.infoValue}>{gameData.releaseDate}</span>
                </div>
                <div style={{ ...styles.infoRow, borderBottom: 'none' }}>
                  <span style={styles.infoLabel}>Age Rating:</span>
                  <span style={styles.infoValue}>{gameData.ageRating}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Similar Games */}
        <section style={styles.section}>
          <div style={styles.container}>
            <h2 style={styles.sectionTitle}>Games similar to {gameData.title}</h2>
            <div style={styles.similarGrid} className="similar-grid">
              {similarGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </div>
        </section>

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

