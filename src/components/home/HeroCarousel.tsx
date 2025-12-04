import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ChevronRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9,18 15,12 9,6"/>
  </svg>
);

const ChevronLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: 'rotate(180deg)' }}>
    <polyline points="9,18 15,12 9,6"/>
  </svg>
);

interface Game {
  id: string;
  title: string;
  image: string;
  shortDescription?: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  slug: string;
}

interface HeroCarouselProps {
  games: Game[];
  selectedGame: Game | null;
  onGameSelect: (game: Game) => void;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  games,
  selectedGame,
  onGameSelect,
  autoPlay = true,
  autoPlayInterval = 5000,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const autoPlayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const updateScrollState = () => {
    if (!containerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scrollLeft = () => {
    if (!containerRef.current) return;
    containerRef.current.scrollBy({ left: -120, behavior: 'smooth' });
  };

  const scrollRight = () => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const { scrollLeft, scrollWidth, clientWidth } = container;

    if (scrollLeft >= scrollWidth - clientWidth - 10) {
      container.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: 120, behavior: 'smooth' });
    }
  };

  const startAutoPlay = () => {
    if (!autoPlay || autoPlayTimerRef.current) return;

    autoPlayTimerRef.current = setInterval(() => {
      scrollRight();
    }, autoPlayInterval);
  };

  const stopAutoPlay = () => {
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
      autoPlayTimerRef.current = null;
    }
  };

  useEffect(() => {
    updateScrollState();
    if (autoPlay) {
      startAutoPlay();
    }

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', updateScrollState);
    }

    return () => {
      stopAutoPlay();
      if (container) {
        container.removeEventListener('scroll', updateScrollState);
      }
    };
  }, [autoPlay, autoPlayInterval]);

  return (
    <div style={{ position: 'relative', marginBottom: '24px' }}>
      {canScrollLeft && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollLeft}
          onMouseEnter={stopAutoPlay}
          onMouseLeave={() => autoPlay && startAutoPlay()}
          style={{
            position: 'absolute',
            left: '8px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 20,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            color: '#fff',
            padding: '8px',
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="Previous"
        >
          <ChevronLeftIcon />
        </motion.button>
      )}

      <div
        ref={containerRef}
        style={{
          overflowX: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          scrollSnapType: 'x mandatory',
          display: 'flex',
          gap: '12px',
          padding: '8px 0',
        }}
        onMouseEnter={stopAutoPlay}
        onMouseLeave={() => autoPlay && startAutoPlay()}
      >
        <style>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {games.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onGameSelect(game)}
            style={{
              flexShrink: 0,
              width: '80px',
              height: '80px',
              borderRadius: '12px',
              overflow: 'hidden',
              cursor: 'pointer',
              border: selectedGame?.id === game.id ? '3px solid #00FF66' : '2px solid transparent',
              transition: 'all 0.3s ease',
              scrollSnapAlign: 'start',
            }}
            className="hero-carousel-item"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src={game.image}
              alt={game.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </motion.div>
        ))}
      </div>

      {canScrollRight && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollRight}
          onMouseEnter={stopAutoPlay}
          onMouseLeave={() => autoPlay && startAutoPlay()}
          style={{
            position: 'absolute',
            right: '8px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 20,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            color: '#fff',
            padding: '8px',
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="Next"
        >
          <ChevronRightIcon />
        </motion.button>
      )}
    </div>
  );
};

