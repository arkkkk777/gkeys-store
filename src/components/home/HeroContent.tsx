import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
// @ts-ignore - UIKit is a JSX file
import { Icons } from '../UIKit';
interface Game {
  id: string;
  title: string;
  image: string;
  shortDescription?: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  slug: string;
  platforms?: string[];
}

interface HeroContentProps {
  game: Game | null;
  onBuyClick?: () => void;
  onWishlistClick?: () => void;
}

export const HeroContent: React.FC<HeroContentProps> = ({
  game,
  onBuyClick,
  onWishlistClick,
}) => {

  if (!game) {
    return null;
  }

  const heroVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
      },
    },
  } as const;

  return (
    <motion.div
      key={game.id}
      variants={heroVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{
        position: 'relative',
        height: '500px',
        backgroundImage: `linear-gradient(to right, rgba(13,13,13,0.9), rgba(13,13,13,0.3)), url(${game.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        padding: '0 48px',
      }}
      className="hero-section"
    >
      <div style={{ maxWidth: '500px', zIndex: 10 }}>
        {game.discount && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#00FF66',
              color: '#000',
              padding: '4px 12px',
              borderRadius: '50px',
              fontSize: '12px',
              fontWeight: '600',
              marginBottom: '16px',
            }}
          >
            ● New
          </motion.span>
        )}

        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            fontSize: '48px',
            fontWeight: '700',
            marginBottom: '16px',
            lineHeight: '1.1',
          }}
          className="hero-title"
        >
          {game.title}
        </motion.h1>

        {game.shortDescription && (
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              color: '#999999',
              fontSize: '16px',
              marginBottom: '24px',
              lineHeight: '1.6',
            }}
          >
            {game.shortDescription}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            fontSize: '32px',
            fontWeight: '700',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
          className="hero-price"
        >
          {game.originalPrice && game.discount ? (
            <>
              <span style={{ textDecoration: 'line-through', color: '#666666', fontSize: '24px' }}>
                {game.originalPrice}€
              </span>
              <span>{game.price}€</span>
              <span
                style={{
                  backgroundColor: '#00FF66',
                  color: '#000',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: '14px',
                }}
              >
                {game.discount}%
              </span>
            </>
          ) : (
            <span>{game.price}€</span>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
          }}
          className="hero-buttons"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBuyClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 32px',
              backgroundColor: '#00FF66',
              color: '#000',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            <Icons.Cart /> Buy
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onWishlistClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 32px',
              backgroundColor: 'rgba(26, 26, 26, 0.8)',
              color: '#fff',
              border: '1px solid #333333',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            <Icons.Heart /> Wishlist
          </motion.button>

          <Link to={`/game/${game.slug}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '14px 32px',
                backgroundColor: 'rgba(26, 26, 26, 0.8)',
                color: '#fff',
                border: '1px solid #333333',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                textDecoration: 'none',
              }}
            >
              More Info
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

