import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
// @ts-ignore - UIKit is a JSX file
import { Icons } from '../UIKit';
import { Aurora } from '../ui/aurora';
import { ClickSpark } from '../ui/click-spark';
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
        height: '100vh',
        minHeight: '600px',
        backgroundImage: `url(${game.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        padding: '32px 48px',
        overflow: 'hidden',
      }}
      className="hero-section"
    >
      {/* Dark overlay from top */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to bottom, rgba(13,13,13,0.85) 0%, rgba(13,13,13,0.6) 50%, rgba(13,13,13,0.4) 100%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />
      
      {/* Aurora Effect Overlay */}
      <div style={{ pointerEvents: 'none', zIndex: 1 }}>
        <Aurora color="#b4ff00" intensity={0.15} />
      </div>
      
      <div style={{ maxWidth: '520px', zIndex: 2, width: '100%', position: 'relative' }}>
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
          className="hero-title"
          style={{
            fontSize: '72px',
            fontWeight: '700',
            marginBottom: '16px',
            lineHeight: '1.1',
            wordWrap: 'break-word',
            color: '#FFFFFF',
            textShadow: '0 2px 20px rgba(0, 0, 0, 0.5)',
          }}
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
              fontSize: '15px',
              marginBottom: '20px',
              lineHeight: '1.5',
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
            fontSize: '28px',
            fontWeight: '700',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
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
            gap: '10px',
            flexWrap: 'wrap',
            width: '100%',
          }}
          className="hero-buttons"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ display: 'inline-block' }}
          >
            <ClickSpark
              onClick={onBuyClick}
              color="#b4ff00"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 20px',
                backgroundColor: '#00FF66',
                color: '#000',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              <Icons.Cart /> Buy
            </ClickSpark>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ display: 'inline-block' }}
          >
            <ClickSpark
              onClick={onWishlistClick}
              color="#b4ff00"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 20px',
                backgroundColor: 'rgba(26, 26, 26, 0.8)',
                color: '#fff',
                border: '1px solid #333333',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              <Icons.Heart /> Wishlist
            </ClickSpark>
          </motion.div>

          <Link to={`/game/${game.slug}`} style={{ textDecoration: 'none' }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '10px 20px',
                backgroundColor: 'rgba(26, 26, 26, 0.8)',
                color: '#fff',
                border: '1px solid #333333',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
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

