// Home Page - GKEYS Gaming Store
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icons } from '../components/UIKit';
import { HeroCarousel } from '../components/home/HeroCarousel';
import { HeroContent } from '../components/home/HeroContent';
import { gamesApi } from '../services/gamesApi';
import { useAuth } from '../hooks/useAuth';


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
  spacing: { xs: '4px', sm: '8px', md: '16px', lg: '24px', xl: '32px', xxl: '48px' },
  borderRadius: { sm: '4px', md: '8px', lg: '12px', xl: '16px', full: '9999px' },
};

// Mock games fallback (will be replaced by API)
const mockGames = [];

const categories = ['All', 'Adventure', 'Action', 'Sci-fi', 'Open World', 'Horror', 'RPG', 'Sandbox'];

const responsiveCSS = `
  @media (max-width: 768px) {
    .desktop-nav { display: none !important; }
    .desktop-search { display: none !important; }
    .desktop-login { display: none !important; }
    .mobile-menu-btn { display: flex !important; }
    .hero-section { height: 100vh !important; min-height: 500px !important; padding: 0 16px !important; }
    .hero-content-wrapper { margin-top: 75px !important; }
    .hero-title h1 { font-size: 48px !important; }
    .hero-title { font-size: 28px !important; line-height: 1.2 !important; }
    .hero-title h1 { font-size: 28px !important; }
    .hero-price { font-size: 20px !important; }
    .hero-carousel-container { padding: 10px 16px !important; }
    .hero-carousel-item { width: 56px !important; height: 56px !important; }
    .game-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }
    .section-title { font-size: 20px !important; }
    .container { padding: 0 16px !important; }
  }
  @media (max-width: 480px) {
    .hero-section { height: 100vh !important; min-height: 450px !important; padding: 0 12px !important; }
    .hero-content-wrapper { margin-top: 70px !important; }
    .hero-title h1 { font-size: 36px !important; margin-bottom: 12px !important; }
    .hero-price { font-size: 18px !important; }
    .hero-buttons { flex-direction: column !important; width: 100% !important; gap: 8px !important; }
    .hero-buttons button { width: 100% !important; }
    .game-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 10px !important; }
    .category-tabs { 
      overflow-x: auto !important; 
      flex-wrap: nowrap !important; 
      padding-bottom: 8px !important;
      -webkit-overflow-scrolling: touch !important;
      scrollbar-width: thin !important;
      margin-left: -16px !important;
      margin-right: -16px !important;
      padding-left: 16px !important;
      padding-right: 16px !important;
    }
    .category-tabs::-webkit-scrollbar { height: 4px !important; }
    .category-tabs button { padding: 6px 12px !important; font-size: 13px !important; white-space: nowrap !important; }
    .section-title { font-size: 18px !important; }
    .section { margin-bottom: 32px !important; }
    .section-header { margin-bottom: 16px !important; }
    .promo-section { padding: 20px !important; margin-bottom: 32px !important; }
    .promo-title { font-size: 18px !important; }
    .promo-subtitle { font-size: 13px !important; }
    .current-price { font-size: 14px !important; }
    .original-price { font-size: 12px !important; }
  }
  @media (max-width: 374px) {
    .hero-section { height: 100vh !important; min-height: 400px !important; }
    .hero-title h1 { font-size: 28px !important; }
    .hero-price { font-size: 16px !important; }
    .game-grid { gap: 8px !important; }
    .container { padding: 0 12px !important; }
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    .game-grid { grid-template-columns: repeat(3, 1fr) !important; gap: 20px !important; }
  }
  @media (min-width: 1025px) {
    .game-grid { grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)) !important; gap: 24px !important; }
  }
`;

const styles = {
  hero: {
    position: 'relative',
    height: '500px',
    backgroundImage: 'linear-gradient(to right, rgba(13,13,13,0.9), rgba(13,13,13,0.3)), url(https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&h=500&fit=crop)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
  },
  heroContent: {
    maxWidth: '500px',
  },
  heroNew: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: theme.colors.primary,
    color: '#000',
    padding: '4px 12px',
    borderRadius: '50px',
    fontSize: '12px',
    fontWeight: '600',
    marginBottom: '16px',
  },
  heroTitle: {
    fontSize: '48px',
    fontWeight: '700',
    marginBottom: '16px',
    lineHeight: '1.1',
  },
  heroDescription: {
    color: theme.colors.textSecondary,
    fontSize: '16px',
    marginBottom: '24px',
    lineHeight: '1.6',
  },
  heroPrice: {
    fontSize: '32px',
    fontWeight: '700',
    marginBottom: '24px',
  },
  heroButtons: {
    display: 'flex',
    gap: '12px',
  },
  buyButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '14px 32px',
    backgroundColor: theme.colors.primary,
    color: '#000',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  moreInfoButton: {
    padding: '14px 32px',
    backgroundColor: theme.colors.surface,
    color: theme.colors.text,
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 24px',
  },
  section: {
    marginBottom: '48px',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: '600',
  },
  sectionLink: {
    color: theme.colors.primary,
    fontSize: '14px',
    textDecoration: 'none',
  },
  categoryTabs: {
    display: 'flex',
    gap: '8px',
    marginBottom: '24px',
    flexWrap: 'wrap',
    overflowX: 'auto',
    WebkitOverflowScrolling: 'touch',
    scrollbarWidth: 'thin',
  },
  categoryTab: (isActive) => ({
    padding: '8px 16px',
    backgroundColor: isActive ? theme.colors.surface : 'transparent',
    border: `1px solid ${isActive ? theme.colors.border : 'transparent'}`,
    borderRadius: '8px',
    color: isActive ? theme.colors.text : theme.colors.textSecondary,
    fontSize: '14px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    flexShrink: 0,
  }),
  gameGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: '24px',
  },
  gameCard: {
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
  },
  gameImage: {
    position: 'relative',
    width: '100%',
    aspectRatio: '3/4',
    borderRadius: '12px',
    overflow: 'hidden',
    marginBottom: '8px',
  },
  gameImageImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  gameBadge: {
    position: 'absolute',
    top: '8px',
    left: '8px',
    backgroundColor: theme.colors.primary,
    color: '#000',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: '600',
  },
  gamePrice: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  currentPrice: {
    fontSize: '16px',
    fontWeight: '600',
  },
  originalPrice: {
    fontSize: '14px',
    color: theme.colors.textMuted,
    textDecoration: 'line-through',
  },
  discount: {
    backgroundColor: theme.colors.primary,
    color: '#000',
    padding: '2px 6px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '600',
  },
  promoSection: {
    backgroundColor: theme.colors.surface,
    borderRadius: '16px',
    padding: '32px',
    marginBottom: '48px',
  },
  promoTitle: {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '8px',
  },
  promoSubtitle: {
    color: theme.colors.textSecondary,
    fontSize: '14px',
    marginBottom: '24px',
  },
  checkAllButton: {
    display: 'inline-flex',
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
    marginTop: '16px',
  },
  footer: {
    backgroundColor: theme.colors.background,
    borderTop: `1px solid ${theme.colors.border}`,
    padding: '48px 24px',
    marginTop: '48px',
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
  mobileMenuButton: {
    display: 'none',
    background: 'none',
    border: 'none',
    color: theme.colors.text,
    cursor: 'pointer',
  },
};

const GameCard = ({ game }) => {
  const [isHovered, setIsHovered] = useState(false);
  const badges = [];
  if (game.isBestSeller) badges.push('Best Seller');
  if (game.isNew) badges.push('New');
  if (game.isPreorder) badges.push('Preorder');
  
  return (
    <Link to={`/game/${game.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div 
        style={{ 
          ...styles.gameCard, 
          transform: isHovered ? 'translateY(-4px)' : 'none' 
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={styles.gameImage}>
          <img src={game.image} alt={game.title} style={styles.gameImageImg} />
          {badges.length > 0 && (
            <span style={styles.gameBadge}>{badges[0]}</span>
          )}
        </div>
        <div style={styles.gamePrice}>
          <span style={styles.currentPrice}>{game.price.toFixed(2)}{game.currency || '€'}</span>
          {game.originalPrice && game.discount && (
            <>
              <span style={styles.originalPrice}>{game.originalPrice.toFixed(2)}{game.currency || '€'}</span>
              <span style={styles.discount}>-{game.discount}%</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

const GameSection = ({ title, games, showLink = true, onCheckAll }) => (
  <section style={styles.section}>
    <div style={styles.sectionHeader}>
      <h2 style={styles.sectionTitle}>{title}</h2>
      {showLink && (
        <Link 
          to={onCheckAll ? '#' : '/catalog'} 
          style={styles.sectionLink}
          onClick={(e) => {
            if (onCheckAll) {
              e.preventDefault();
              onCheckAll();
            }
          }}
        >
          Check all
        </Link>
      )}
    </div>
    <div style={styles.gameGrid} className="game-grid">
      {games.length > 0 ? (
        games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))
      ) : (
        <div style={{ color: theme.colors.textSecondary, padding: '24px' }}>No games available</div>
      )}
    </div>
  </section>
);

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [heroGames, setHeroGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [bestSellers, setBestSellers] = useState([]);
  const [newInCatalog, setNewInCatalog] = useState([]);
  const [preorders, setPreorders] = useState([]);
  const [newGames, setNewGames] = useState([]);
  const [randomGames, setRandomGames] = useState([]);
  const [genres, setGenres] = useState([]);
  const [genreGames, setGenreGames] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Load hero games (random games for carousel)
  useEffect(() => {
    const loadHeroGames = async () => {
      try {
        const games = await gamesApi.getRandomGames(15);
        setHeroGames(games);
        if (games.length > 0 && !selectedGame) {
          setSelectedGame(games[0]);
        }
      } catch (error) {
        console.error('Failed to load hero games:', error);
      }
    };
    loadHeroGames();
  }, [selectedGame]);

  // Load best sellers
  useEffect(() => {
    const loadBestSellers = async () => {
      try {
        const genre = activeCategory === 'All' ? undefined : activeCategory.toLowerCase();
        const games = await gamesApi.getBestSellers(genre);
        setBestSellers(games.slice(0, 8));
      } catch (error) {
        console.error('Failed to load best sellers:', error);
      }
    };
    loadBestSellers();
  }, [activeCategory]);

  // Load other sections
  useEffect(() => {
    const loadSections = async () => {
      setLoading(true);
      try {
        const [newCatalog, preordersData, newGamesData, genresData] = await Promise.all([
          gamesApi.getNewInCatalog(),
          gamesApi.getPreorders(),
          gamesApi.getNewGames(),
          gamesApi.getAllGenres(),
        ]);
        setNewInCatalog(newCatalog.slice(0, 15));
        setPreorders(preordersData);
        setNewGames(newGamesData.slice(0, 10));
        setGenres(genresData);
      } catch (error) {
        console.error('Failed to load sections:', error);
      } finally {
        setLoading(false);
      }
    };
    loadSections();
  }, []);

  // Load random games - reloads on each page refresh
  useEffect(() => {
    const loadRandomGames = async () => {
      try {
        const games = await gamesApi.getRandomGames(10);
        setRandomGames(games);
      } catch (error) {
        console.error('Failed to load random games:', error);
      }
    };
    loadRandomGames();
  }, []); // Empty deps - reloads on mount (page refresh)

  // Load games for each genre
  useEffect(() => {
    const loadGenreGames = async () => {
      if (genres.length === 0) return;
      
      try {
        const genreGamesData = {};
        for (const genre of genres.slice(0, 5)) { // Load first 5 genres
          try {
            const games = await gamesApi.getGamesByGenre(genre.slug);
            genreGamesData[genre.slug] = games.slice(0, 20);
          } catch (error) {
            console.error(`Failed to load games for genre ${genre.slug}:`, error);
          }
        }
        setGenreGames(genreGamesData);
      } catch (error) {
        console.error('Failed to load genre games:', error);
      }
    };
    loadGenreGames();
  }, [genres]);

  const handleGameSelect = (game) => {
    setSelectedGame(game);
  };

  const handleBuyClick = () => {
    if (selectedGame) {
      // Add to cart logic here
      navigate(`/game/${selectedGame.slug}`);
    }
  };

  const handleWishlistClick = () => {
    if (selectedGame) {
      // Add to wishlist logic here
    }
  };

  return (
    <>
      <style>{responsiveCSS}</style>
      {/* Hero Section */}
      <section style={{ position: 'relative', backgroundColor: theme.colors.background }}>
          <div style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            right: 0, 
            zIndex: 10,
            padding: '12px 20px',
            backgroundColor: 'rgba(13, 13, 13, 0.85)',
            backdropFilter: 'blur(8px)',
            pointerEvents: 'auto',
          }} className="hero-carousel-container">
            <HeroCarousel
              games={heroGames}
              selectedGame={selectedGame}
              onGameSelect={handleGameSelect}
              autoPlay={true}
              autoPlayInterval={5000}
            />
          </div>
          <div style={{ marginTop: '90px', position: 'relative' }} className="hero-content-wrapper">
            <HeroContent
              game={selectedGame}
              onBuyClick={handleBuyClick}
              onWishlistClick={handleWishlistClick}
            />
          </div>
        </section>

        {/* Main Content */}
        <main style={styles.container}>
          {/* Best Sellers */}
          <section style={{ ...styles.section, marginTop: '48px' }}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>Best Sellers</h2>
              <Link to="/catalog" style={styles.sectionLink}>Check all</Link>
            </div>
            <div style={styles.categoryTabs} className="category-tabs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  style={styles.categoryTab(activeCategory === cat)}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div style={styles.gameGrid} className="game-grid">
              {loading ? (
                <div style={{ color: theme.colors.textSecondary, padding: '24px' }}>Loading...</div>
              ) : bestSellers.length > 0 ? (
                bestSellers.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))
              ) : (
                <div style={{ color: theme.colors.textSecondary, padding: '24px' }}>No games available</div>
              )}
            </div>
          </section>

          {/* New in Catalog */}
          <GameSection title="New in the Catalog" games={newInCatalog.slice(0, 15)} />

          {/* Preorders */}
          <GameSection title="Preorders" games={preorders} />

          {/* New Games Promo */}
          <div style={styles.promoSection}>
            <h3 style={styles.promoTitle}>New games</h3>
            <p style={styles.promoSubtitle}>There's nothing more exciting than trying something new</p>
            <div style={styles.gameGrid} className="game-grid">
              {newGames.length > 0 ? (
                newGames.slice(0, 10).map((game) => (
                  <GameCard key={game.id} game={game} />
                ))
              ) : (
                <div style={{ color: theme.colors.textSecondary, padding: '24px' }}>No games available</div>
              )}
            </div>
            <Link to="/catalog">
              <button type="button" style={styles.checkAllButton}>Check all</button>
            </Link>
          </div>

          {/* Games by Genre Carousels */}
          {genres.slice(0, 5).map((genre) => {
            const games = genreGames[genre.slug] || [];
            if (games.length === 0) return null;
            
            return (
              <GameSection
                key={genre.slug}
                title={genre.name}
                games={games}
                showLink={true}
                onCheckAll={() => navigate(`/catalog?genres=${genre.slug}`)}
              />
            );
          })}

          {/* Random Games */}
          <div style={styles.promoSection}>
            <h3 style={styles.promoTitle}>Random Games</h3>
            <p style={styles.promoSubtitle}>Discover something new with our random selection</p>
            <div style={styles.gameGrid} className="game-grid">
              {randomGames.length > 0 ? (
                randomGames.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))
              ) : (
                <div style={{ color: theme.colors.textSecondary, padding: '24px' }}>No games available</div>
              )}
            </div>
          </div>
        </main>
    </>
  );
}

