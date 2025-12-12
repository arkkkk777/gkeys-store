import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProfileLayout from '../components/profile/ProfileLayout';
import bestSellerBadge from '../assets/best-seller-badge.svg';

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

// Mock wishlist data
const mockWishlistItems = [
  {
    id: '1',
    title: 'Metro Exodus - Gold Edition',
    image: 'https://images.g2a.com/300x400/1x1x0/metro-exodus-gold-edition-pc-steam-key-global/5c4e6e885bafe3f8501e6f87',
    price: 13,
    originalPrice: 90,
    discount: 86,
  },
];

// Mock suggested games
const suggestedGames = [
  {
    id: '1',
    title: 'Ghost of Tsushima',
    slug: 'ghost-of-tsushima',
    image: 'https://images.g2a.com/300x400/1x1x0/ghost-of-tsushima-directors-cut-pc-steam-key-global/6193ec445bafe3f8501e6f87',
    price: 13,
    originalPrice: 90,
    discount: 86,
    isBestSeller: false,
  },
  {
    id: '2',
    title: 'Resident Evil Village',
    slug: 'resident-evil-village',
    image: 'https://images.g2a.com/300x400/1x1x0/resident-evil-village-pc-steam-key-global/5fa0e0345bafe3f8501e6f87',
    price: 13,
    originalPrice: 90,
    discount: 86,
    isBestSeller: true,
  },
  {
    id: '3',
    title: 'Back 4 Blood',
    slug: 'back-4-blood',
    image: 'https://images.g2a.com/300x400/1x1x0/back-4-blood-pc-steam-key-global/5fa0e0345bafe3f8501e6f87',
    price: 13,
    originalPrice: 90,
    discount: 86,
    isBestSeller: false,
  },
  {
    id: '4',
    title: 'Ghost of Tsushima',
    slug: 'ghost-of-tsushima-2',
    image: 'https://images.g2a.com/300x400/1x1x0/ghost-of-tsushima-directors-cut-pc-steam-key-global/6193ec445bafe3f8501e6f87',
    price: 13,
    originalPrice: 90,
    discount: 86,
    isBestSeller: false,
  },
  {
    id: '5',
    title: 'Resident Evil Village',
    slug: 'resident-evil-village-2',
    image: 'https://images.g2a.com/300x400/1x1x0/resident-evil-village-pc-steam-key-global/5fa0e0345bafe3f8501e6f87',
    price: 13,
    originalPrice: 90,
    discount: 86,
    isBestSeller: true,
  },
  {
    id: '6',
    title: 'Back 4 Blood',
    slug: 'back-4-blood-2',
    image: 'https://images.g2a.com/300x400/1x1x0/back-4-blood-pc-steam-key-global/5fa0e0345bafe3f8501e6f87',
    price: 13,
    originalPrice: 90,
    discount: 86,
    isBestSeller: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Heart icon
const HeartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

// Sparkle icon for empty state
const SparkleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 2L14 8L20 10L14 12L12 18L10 12L4 10L10 8L12 2Z" fill="#FFD93D" />
  </svg>
);

// Game Card Component
const GameCard = ({ game }) => (
  <Link
    to={`/game/${game.slug}`}
    style={{ textDecoration: 'none' }}
  >
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.03, y: -4 }}
      style={{
        position: 'relative',
        borderRadius: '16px',
        overflow: 'hidden',
        backgroundColor: theme.colors.surface,
        cursor: 'pointer',
      }}
    >
      {/* Best Seller Badge */}
      {game.isBestSeller && (
        <img
          src={bestSellerBadge}
          alt="Best Seller"
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            zIndex: 10,
            width: 'auto',
            height: '24px',
          }}
        />
      )}

      {/* Game Image */}
      <div
        style={{
          width: '100%',
          aspectRatio: '3/4',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <img
          src={game.image}
          alt={game.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
          }}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x400?text=Game';
          }}
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

        {/* Price Section - Overlay at bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
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
            <span
              style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#FFFFFF',
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)',
              }}
            >
              {typeof game.price === 'number' ? game.price.toFixed(2) : game.price}€
            </span>
            {game.originalPrice && game.originalPrice > game.price && (
              <>
                <span
                  style={{
                    fontSize: '12px',
                    color: 'rgba(255, 255, 255, 0.7)',
                    textDecoration: 'line-through',
                    textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)',
                  }}
                >
                  {typeof game.originalPrice === 'number' ? game.originalPrice.toFixed(2) : game.originalPrice}€
                </span>
                {game.discount && (
                  <span
                    style={{
                      backgroundColor: theme.colors.primary,
                      color: '#000',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '10px',
                      fontWeight: '700',
                      whiteSpace: 'nowrap',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                    }}
                  >
                    -{game.discount}%
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  </Link>
);

export default function ProfileWishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const loadWishlist = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      // Toggle between empty and filled wishlist for testing
      setWishlist(mockWishlistItems); // Change to [] to test empty state
      setIsLoading(false);
    };

    loadWishlist();
  }, []);

  if (isLoading) {
    return (
      <ProfileLayout>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '200px',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              border: '3px solid ' + theme.colors.border,
              borderTopColor: theme.colors.primary,
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
            }}
          />
          <style>
            {`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}
          </style>
        </div>
      </ProfileLayout>
    );
  }

  return (
    <ProfileLayout>
      <div>
        {/* Wishlist Content */}
        {wishlist.length === 0 ? (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              marginBottom: '48px',
            }}
          >
            <h2
              style={{
                fontSize: '24px',
                fontWeight: '600',
                color: theme.colors.text,
                margin: '0 0 8px 0',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              Your wishlist is empty
              <SparkleIcon />
            </h2>
            <p
              style={{
                fontSize: '14px',
                color: theme.colors.textSecondary,
                margin: '0 0 20px 0',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              Add items using the{' '}
              <span style={{ color: theme.colors.text }}>
                <HeartIcon />
              </span>{' '}
              button.
            </p>
            <Link
              to="/catalog"
              style={{
                display: 'inline-block',
                padding: '12px 32px',
                backgroundColor: theme.colors.primary,
                color: '#000',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '14px',
              }}
            >
              Go to Store
            </Link>
          </motion.div>
        ) : (
          /* Wishlist Items */
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              marginBottom: '48px',
            }}
          >
            {wishlist.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '12px',
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                }}
              >
                {/* Item Title */}
                <span
                  style={{
                    fontSize: '16px',
                    color: theme.colors.text,
                    flex: 1,
                  }}
                >
                  {item.title}
                </span>
                {/* Item Image */}
                <div
                  style={{
                    width: '60px',
                    height: '75px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/60x75?text=Game';
                    }}
                  />
                </div>
                {/* Price */}
                <span
                  style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: theme.colors.text,
                    minWidth: '60px',
                    textAlign: 'right',
                  }}
                >
                  {item.price}€
                </span>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* You might also like */}
        <div>
          <h2
            style={{
              fontSize: '24px',
              fontWeight: '600',
              color: theme.colors.text,
              margin: '0 0 24px 0',
            }}
          >
            You might also like
          </h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '20px',
            }}
            className="suggested-games-grid"
          >
            {suggestedGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </motion.div>
        </div>
      </div>

      <style>
        {`
          @media (max-width: 900px) {
            .suggested-games-grid {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }
          @media (max-width: 600px) {
            .suggested-games-grid {
              grid-template-columns: repeat(2, 1fr) !important;
              gap: 12px !important;
            }
          }
        `}
      </style>
    </ProfileLayout>
  );
}
