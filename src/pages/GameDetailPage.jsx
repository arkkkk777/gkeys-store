// Game Detail Page - GKEYS Gaming Store
import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { gamesApi } from '../services/gamesApi';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';

const theme = {
  colors: {
    primary: '#00C8C2',
    background: '#0D0D0D',
    surface: '#1A1A1A',
    surfaceLight: '#2A2A2A',
    text: '#FFFFFF',
    textSecondary: '#999999',
    textMuted: '#666666',
    border: '#333333',
  },
};

// Icons
const CartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <title>Cart</title>
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const HeartIcon = ({ filled }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
    <title>Heart</title>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const KeyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <title>Key</title>
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
  </svg>
);

const SteamIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <title>Steam</title>
    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3l-.5 3H13v6.95c5.05-.5 9-4.76 9-9.95 0-5.52-4.48-10-10-10z"/>
  </svg>
);

const StarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <title>Star</title>
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <title>Chevron Down</title>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <title>Chevron Left</title>
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <title>Chevron Right</title>
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

// GameCard component for similar games
const GameCard = ({ game, size = 'medium' }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const badges = [];
  if (game.isBestSeller) badges.push('Best Seller');
  if (game.isNew) badges.push('New');
  if (game.isPreorder) badges.push('Preorder');
  
  const discount = game.originalPrice && game.price < game.originalPrice
    ? Math.round((1 - game.price / game.originalPrice) * 100)
    : game.discount || 0;
  
  const cardWidth = size === 'small' ? '140px' : '180px';
  
  return (
    <Link to={`/game/${game.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div 
        style={{ 
          cursor: 'pointer',
          transition: 'transform 0.2s ease',
          transform: isHovered ? 'translateY(-4px)' : 'none',
          width: cardWidth,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '1/1',
          borderRadius: '12px',
          overflow: 'hidden',
        }}>
          <img 
            src={game.image} 
            alt={game.title} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            loading="lazy"
          />
          
          {/* Dark gradient for bottom overlay */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: '50%',
              background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 50%, transparent 100%)',
              pointerEvents: 'none',
            }}
          />
          
          {/* Badge in top left */}
          {badges.length > 0 && (
            <span style={{
              position: 'absolute',
              top: '8px',
              left: '8px',
              backgroundColor: theme.colors.primary,
              color: '#000',
              padding: '6px 8px',
              borderRadius: '8px',
              fontSize: '11px',
              fontWeight: '700',
              textTransform: 'uppercase',
              zIndex: 10,
            }}>{badges[0]}</span>
          )}
          
          {/* Price overlay at bottom */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              padding: '12px',
              zIndex: 10,
            }}
          >
            <div style={{ 
              display: 'flex', 
              alignItems: 'baseline', 
              gap: '8px', 
              flexWrap: 'wrap' 
            }}>
              <span style={{ 
                fontSize: '18px', 
                fontWeight: '700', 
                color: '#FFFFFF',
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)',
              }}>
                €{typeof game.price === 'number' ? game.price.toFixed(2) : game.price}
              </span>
              {game.originalPrice && game.originalPrice > game.price && (
                <>
                  <span style={{ 
                    fontSize: '12px', 
                    color: 'rgba(255, 255, 255, 0.7)', 
                    textDecoration: 'line-through',
                    textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)',
                  }}>
                    €{typeof game.originalPrice === 'number' ? game.originalPrice.toFixed(2) : game.originalPrice}
                  </span>
                  {discount > 0 && (
                    <span style={{ 
                      backgroundColor: theme.colors.primary, 
                      color: '#000', 
                      padding: '2px 6px', 
                      borderRadius: '4px', 
                      fontSize: '10px', 
                      fontWeight: '700',
                      whiteSpace: 'nowrap',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                    }}>
                      -{discount}%
                    </span>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default function GameDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const carouselRef = useRef(null);
  const [game, setGame] = useState(null);
  const [similarGames, setSimilarGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addingToCart, setAddingToCart] = useState(false);
  const [togglingWishlist, setTogglingWishlist] = useState(false);

  // Load game data from API
  useEffect(() => {
    const loadGame = async () => {
      if (!slug) return;
      setLoading(true);
      setError(null);
      try {
        const gameData = await gamesApi.getGameBySlug(slug);
        setGame(gameData);
        
        // Check if game is in wishlist
        try {
          const inWishlist = await isInWishlist(gameData.id);
          setIsWishlisted(inWishlist);
        } catch (err) {
          console.error('Failed to check wishlist status:', err);
        }
        
        // Load similar games (10 games with 2+ common tags)
        try {
          const similar = await gamesApi.getSimilarGames(gameData.id, 10);
          setSimilarGames(similar);
        } catch (err) {
          console.error('Failed to load similar games:', err);
          setSimilarGames([]);
        }
      } catch (err) {
        console.error('Failed to load game:', err);
        setError('Failed to load game. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    loadGame();
  }, [slug, isInWishlist]);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 250;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleBuy = async () => {
    if (!game) return;
    setAddingToCart(true);
    try {
      await addToCart(game.id, 1);
      // Optionally navigate to cart or show success message
      // navigate('/cart');
    } catch (err) {
      console.error('Failed to add to cart:', err);
      // Show error message to user
    } finally {
      setAddingToCart(false);
    }
  };

  const handleWishlistToggle = async () => {
    if (!game) return;
    setTogglingWishlist(true);
    try {
      if (isWishlisted) {
        await removeFromWishlist(game.id);
        setIsWishlisted(false);
      } else {
        await addToWishlist(game.id);
        setIsWishlisted(true);
      }
    } catch (err) {
      console.error('Failed to toggle wishlist:', err);
    } finally {
      setTogglingWishlist(false);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: theme.colors.background,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.colors.text
      }}>
        Loading...
      </div>
    );
  }

  if (error || !game) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: theme.colors.background,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.colors.text
      }}>
        {error || 'Game not found'}
      </div>
    );
  }

  // Calculate discount
  const discount = game.originalPrice && game.price < game.originalPrice
    ? Math.round((1 - game.price / game.originalPrice) * 100)
    : game.discount || 0;

  // Get platform and delivery info
  const mainPlatform = game.platforms && game.platforms.length > 0 ? game.platforms[0] : 'Steam';
  const deliveryMethod = 'Key';
  const currentlyWatching = Math.floor(Math.random() * 10) + 1; // Mock data

  // Format release date
  const releaseDate = game.releaseDate 
    ? new Date(game.releaseDate).toLocaleDateString('ru-RU', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    : 'N/A';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: theme.colors.background }}>
      {/* Hero Section */}
      <section
        style={{
          position: 'relative',
          minHeight: '500px',
          overflow: 'hidden',
        }}
        className="hero-detail"
      >
        {/* Background Image */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${game.images && game.images.length > 0 ? game.images[0] : game.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
          }}
        />

        {/* Gradient Overlays */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(13,13,13,0.95) 0%, rgba(13,13,13,0.6) 50%, rgba(13,13,13,0.3) 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(13,13,13,1) 0%, transparent 40%)',
          }}
        />

        {/* Content */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '24px',
          }}
        >
          {/* Breadcrumbs */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '14px',
              marginBottom: '40px',
            }}
          >
            <Link to="/" style={{ color: theme.colors.textSecondary, textDecoration: 'none' }}>
              Main
            </Link>
            <span style={{ color: theme.colors.textMuted }}>|</span>
            <Link to="/catalog" style={{ color: theme.colors.textSecondary, textDecoration: 'none' }}>
              Catalog
            </Link>
            <span style={{ color: theme.colors.textMuted }}>|</span>
            <span style={{ color: theme.colors.text }}>{game.title}</span>
          </nav>

          {/* Game Info */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: '32px',
            }}
            className="hero-content"
          >
            {/* Left Side */}
            <div style={{ maxWidth: '600px' }}>
              {/* Badges */}
              <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
                {game.isBestSeller && (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      backgroundColor: theme.colors.primary,
                      color: '#000',
                      padding: '6px 12px',
                      borderRadius: '50px',
                      fontSize: '12px',
                      fontWeight: '600',
                    }}
                  >
                    <StarIcon />
                    Best Seller
                  </span>
                )}
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: theme.colors.text,
                    padding: '6px 12px',
                    borderRadius: '50px',
                    fontSize: '12px',
                    fontWeight: '500',
                  }}
                >
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: theme.colors.primary,
                    }}
                  />
                  Currently Watching
                  <span
                    style={{
                      backgroundColor: theme.colors.primary,
                      color: '#000',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: '700',
                    }}
                  >
                    {currentlyWatching}
                  </span>
                </span>
              </div>

              {/* Title */}
              <h1
                style={{
                  fontSize: 'clamp(32px, 5vw, 48px)',
                  fontWeight: '700',
                  color: theme.colors.text,
                  margin: '0 0 16px 0',
                  lineHeight: 1.1,
                }}
              >
                {game.title}
              </h1>

              {/* Description */}
              <p
                style={{
                  fontSize: '14px',
                  color: theme.colors.textSecondary,
                  margin: '0 0 24px 0',
                  lineHeight: 1.6,
                }}
              >
                {game.shortDescription || (game.description ? game.description.substring(0, 150) + '...' : '')}
              </p>

              {/* Delivery & Platform */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', gap: '32px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '12px', color: theme.colors.textMuted }}>Delivery Method</span>
                  <span style={{ fontSize: '12px', color: theme.colors.textMuted }}>Platform</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      backgroundColor: theme.colors.surface,
                      color: theme.colors.text,
                      padding: '10px 16px',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '500',
                      border: `1px solid ${theme.colors.border}`,
                    }}
                  >
                    <KeyIcon />
                    {deliveryMethod}
                  </span>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      backgroundColor: theme.colors.surface,
                      color: theme.colors.text,
                      padding: '10px 16px',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '500',
                      border: `1px solid ${theme.colors.border}`,
                    }}
                  >
                    <SteamIcon />
                    {game.activationService || mainPlatform}
                  </span>
                  {game.region && game.region !== 'Global' && (
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: theme.colors.surface,
                        color: theme.colors.text,
                        padding: '10px 16px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '500',
                        border: `1px solid ${theme.colors.border}`,
                      }}
                    >
                      {game.region}
                    </span>
                  )}
                  <a
                    href="/support#activation"
                    style={{
                      color: theme.colors.primary,
                      fontSize: '14px',
                      textDecoration: 'none',
                    }}
                  >
                    How to activate?
                  </a>
                </div>
              </div>
            </div>

            {/* Right Side - Price & Actions */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: '16px',
              }}
              className="hero-actions"
            >
              {/* Price */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <span
                  style={{
                    fontSize: '32px',
                    fontWeight: '700',
                    color: theme.colors.text,
                  }}
                >
                  {game.price.toFixed(2)}€
                </span>
                {game.originalPrice && game.originalPrice > game.price && (
                  <span
                    style={{
                      fontSize: '18px',
                      color: theme.colors.textMuted,
                      textDecoration: 'line-through',
                    }}
                  >
                    {game.originalPrice.toFixed(2)}€
                  </span>
                )}
                {discount > 0 && (
                  <span
                    style={{
                      backgroundColor: theme.colors.primary,
                      color: '#000',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '14px',
                      fontWeight: '700',
                    }}
                  >
                    -{discount}%
                  </span>
                )}
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: '12px' }}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBuy}
                  disabled={addingToCart || !game.inStock}
                  type="button"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '14px 32px',
                    backgroundColor: game.inStock ? theme.colors.primary : theme.colors.surface,
                    color: game.inStock ? '#000' : theme.colors.textMuted,
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: game.inStock && !addingToCart ? 'pointer' : 'not-allowed',
                    opacity: addingToCart ? 0.7 : 1,
                  }}
                >
                  <CartIcon />
                  {addingToCart ? 'Adding...' : 'Buy'}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleWishlistToggle}
                  disabled={togglingWishlist}
                  type="button"
                  style={{
                    width: '52px',
                    height: '52px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: theme.colors.surface,
                    color: isWishlisted ? theme.colors.primary : theme.colors.text,
                    border: `1px solid ${theme.colors.border}`,
                    borderRadius: '8px',
                    cursor: togglingWishlist ? 'wait' : 'pointer',
                    opacity: togglingWishlist ? 0.7 : 1,
                  }}
                  aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <HeartIcon filled={isWishlisted} />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Information Section */}
      <section
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '40px 24px',
        }}
      >
        <h2
          style={{
            fontSize: '24px',
            fontWeight: '700',
            color: theme.colors.text,
            margin: '0 0 24px 0',
          }}
        >
          Additional Information
        </h2>

        {/* Tabs */}
        <div style={{ marginBottom: '24px' }}>
          <button
            type="button"
            onClick={() => setActiveTab('description')}
            style={{
              padding: '12px 24px',
              backgroundColor: activeTab === 'description' ? theme.colors.surface : 'transparent',
              color: theme.colors.text,
              border: `1px solid ${activeTab === 'description' ? theme.colors.border : 'transparent'}`,
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
            }}
          >
            Description
          </button>
        </div>

        {/* Content Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 360px',
            gap: '32px',
          }}
          className="info-grid"
        >
          {/* Description Text */}
          <div
            style={{
              backgroundColor: theme.colors.surface,
              borderRadius: '16px',
              padding: '24px',
              border: `1px solid ${theme.colors.border}`,
              position: 'relative',
            }}
          >
            <div
              style={{
                fontSize: '14px',
                color: theme.colors.textSecondary,
                lineHeight: 1.8,
                maxHeight: isDescriptionExpanded ? 'none' : '300px',
                overflow: 'hidden',
                whiteSpace: 'pre-line',
              }}
            >
              {game.description || 'No description available.'}
            </div>

            {/* Gradient Fade */}
            {!isDescriptionExpanded && game.description && game.description.length > 500 && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '60px',
                  left: 0,
                  right: 0,
                  height: '80px',
                  background: `linear-gradient(to top, ${theme.colors.surface} 0%, transparent 100%)`,
                  pointerEvents: 'none',
                }}
              />
            )}

            {/* Expand Button */}
            {game.description && game.description.length > 500 && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '16px',
                }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                  style={{
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: theme.colors.surfaceLight,
                    color: theme.colors.text,
                    border: 'none',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    transform: isDescriptionExpanded ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.3s ease',
                  }}
                >
                  <ChevronDownIcon />
                </motion.button>
              </div>
            )}
          </div>

          {/* Info Card */}
          <div
            style={{
              backgroundColor: theme.colors.surface,
              borderRadius: '16px',
              padding: '24px',
              border: `1px solid ${theme.colors.border}`,
              height: 'fit-content',
            }}
          >
            <h3
              style={{
                fontSize: '18px',
                fontWeight: '600',
                color: theme.colors.text,
                margin: '0 0 20px 0',
              }}
            >
              Description
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Genre */}
              {game.genres && game.genres.length > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '14px', color: theme.colors.textMuted }}>Genre:</span>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                    {game.genres.map((g) => (
                      <Link
                        key={g}
                        to={`/catalog?genres=${g.toLowerCase()}`}
                        style={{
                          color: theme.colors.primary,
                          fontSize: '14px',
                          textDecoration: 'none',
                        }}
                      >
                        {g}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Platform */}
              {game.platforms && game.platforms.length > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px', color: theme.colors.textMuted }}>Platform:</span>
                  <Link
                    to={`/catalog?platforms=${game.platforms[0].toLowerCase()}`}
                    style={{
                      color: theme.colors.primary,
                      fontSize: '14px',
                      textDecoration: 'none',
                    }}
                  >
                    {game.platforms[0]}
                  </Link>
                </div>
              )}

              {/* Publisher */}
              {game.publisher && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px', color: theme.colors.textMuted }}>Publisher:</span>
                  <Link
                    to={`/catalog?publisher=${game.publisher}`}
                    style={{
                      color: theme.colors.primary,
                      fontSize: '14px',
                      textDecoration: 'none',
                    }}
                  >
                    {game.publisher}
                  </Link>
                </div>
              )}

              {/* Developer */}
              {game.developer && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px', color: theme.colors.textMuted }}>Developer:</span>
                  <span style={{ fontSize: '14px', color: theme.colors.text }}>{game.developer}</span>
                </div>
              )}

              {/* Release Date */}
              {game.releaseDate && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px', color: theme.colors.textMuted }}>Release Date:</span>
                  <span style={{ fontSize: '14px', color: theme.colors.text }}>{releaseDate}</span>
                </div>
              )}

              {/* Activation Service */}
              {game.activationService && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px', color: theme.colors.textMuted }}>Activation:</span>
                  <span style={{ fontSize: '14px', color: theme.colors.text }}>{game.activationService}</span>
                </div>
              )}

              {/* Region */}
              {game.region && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px', color: theme.colors.textMuted }}>Region:</span>
                  <span style={{ fontSize: '14px', color: theme.colors.text }}>{game.region}</span>
                </div>
              )}

              {/* In Stock */}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '14px', color: theme.colors.textMuted }}>In Stock:</span>
                <span style={{ fontSize: '14px', color: game.inStock ? theme.colors.primary : theme.colors.textMuted }}>
                  {game.inStock ? 'Yes' : 'No'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      {game.images && game.images.length > 1 && (
        <section
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '40px 24px',
          }}
        >
          <h2
            style={{
              fontSize: '24px',
              fontWeight: '700',
              color: theme.colors.text,
              margin: '0 0 24px 0',
            }}
          >
            Screenshots
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '16px',
            }}
          >
            {game.images.map((imageUrl) => (
              <motion.div
                key={imageUrl}
                whileHover={{ scale: 1.05 }}
                style={{
                  position: 'relative',
                  aspectRatio: '16/9',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: `1px solid ${theme.colors.border}`,
                }}
                onClick={() => {
                  // Open image in new tab or lightbox (simple implementation)
                  window.open(imageUrl, '_blank');
                }}
              >
                <img
                  src={imageUrl}
                  alt={`${game.title} screenshot`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/200x112?text=Screenshot';
                  }}
                />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Similar Games Section */}
      {similarGames.length > 0 && (
        <section
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '40px 24px 60px',
          }}
        >
          <h2
            style={{
              fontSize: '24px',
              fontWeight: '700',
              color: theme.colors.text,
              margin: '0 0 24px 0',
            }}
          >
            Games similar to {game.title}
          </h2>

          {/* Carousel Container */}
          <div style={{ position: 'relative' }}>
            {/* Scroll Buttons */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scrollCarousel('left')}
              style={{
                position: 'absolute',
                left: '-20px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: theme.colors.surface,
                border: `1px solid ${theme.colors.border}`,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme.colors.text,
                zIndex: 10,
              }}
              className="carousel-btn-left"
            >
              <ChevronLeftIcon />
            </motion.button>

            <div
              ref={carouselRef}
              style={{
                display: 'flex',
                gap: '16px',
                overflowX: 'auto',
                scrollSnapType: 'x mandatory',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                paddingBottom: '8px',
              }}
              className="hide-scrollbar"
            >
              {similarGames.map((similarGame) => (
                <div
                  key={similarGame.id}
                  style={{
                    minWidth: '180px',
                    maxWidth: '180px',
                    scrollSnapAlign: 'start',
                  }}
                >
                  <GameCard game={similarGame} size="medium" />
                </div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scrollCarousel('right')}
              style={{
                position: 'absolute',
                right: '-20px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: theme.colors.surface,
                border: `1px solid ${theme.colors.border}`,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme.colors.text,
                zIndex: 10,
              }}
              className="carousel-btn-right"
            >
              <ChevronRightIcon />
            </motion.button>
          </div>
        </section>
      )}

      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          
          @media (max-width: 900px) {
            .info-grid {
              grid-template-columns: 1fr !important;
            }
          }
          
          @media (max-width: 768px) {
            .hero-detail {
              min-height: auto !important;
            }
            .hero-content {
              flex-direction: column !important;
              align-items: flex-start !important;
            }
            .hero-actions {
              align-items: flex-start !important;
              width: 100%;
            }
            .hero-actions > div:last-child {
              width: 100%;
            }
            .hero-actions button:first-child {
              flex: 1;
            }
            .carousel-btn-left, .carousel-btn-right {
              display: none !important;
            }
          }
        `}
      </style>
    </div>
  );
}
