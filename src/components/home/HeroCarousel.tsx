import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const ChevronRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-label="Next">
    <title>Next</title>
    <polyline points="9,18 15,12 9,6"/>
  </svg>
);

const ChevronLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: 'rotate(180deg)' }} aria-label="Previous">
    <title>Previous</title>
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

  const updateScrollState = useCallback(() => {
    if (!containerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);

  const scrollLeft = useCallback(() => {
    if (!containerRef.current) return;
    containerRef.current.scrollBy({ left: -120, behavior: 'smooth' });
  }, []);

  const scrollRight = useCallback(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const { scrollLeft, scrollWidth, clientWidth } = container;

    if (scrollLeft >= scrollWidth - clientWidth - 10) {
      container.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: 120, behavior: 'smooth' });
    }
  }, []);

  const startAutoPlay = useCallback(() => {
    if (!autoPlay || autoPlayTimerRef.current) return;

    autoPlayTimerRef.current = setInterval(() => {
      scrollRight();
    }, autoPlayInterval);
  }, [autoPlay, autoPlayInterval, scrollRight]);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
      autoPlayTimerRef.current = null;
    }
  }, []);

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
  }, [autoPlay, updateScrollState, startAutoPlay, stopAutoPlay]);

  return (
    <div style={{ position: 'relative', marginBottom: '16px', pointerEvents: 'auto', zIndex: 10 }}>
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
          gap: '10px',
          padding: '6px 0',
        }}
        onMouseEnter={stopAutoPlay}
        onMouseLeave={() => autoPlay && startAutoPlay()}
      >
        <style>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {games.map((game, index) => {
          const isSelected = selectedGame?.id === game.id;
          return (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                boxShadow: isSelected 
                  ? '0 0 20px rgba(180, 255, 0, 0.6), 0 0 40px rgba(180, 255, 0, 0.3)' 
                  : '0 0 0 transparent',
              }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onGameSelect(game)}
              style={{
                flexShrink: 0,
                width: '72px',
                height: '72px',
                borderRadius: '10px',
                overflow: 'hidden',
                cursor: 'pointer',
                border: isSelected ? '2.5px solid #b4ff00' : '2px solid transparent',
                transition: 'all 0.3s ease',
                scrollSnapAlign: 'start',
                position: 'relative',
                pointerEvents: 'auto',
                zIndex: 11,
              }}
              className="hero-carousel-item"
              whileHover={{ 
                scale: 1.15,
                boxShadow: '0 0 25px rgba(180, 255, 0, 0.4)',
              }}
              whileTap={{ scale: 0.95 }}
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
              />
              {isSelected && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, rgba(180, 255, 0, 0.2) 0%, transparent 100%)',
                    pointerEvents: 'none',
                  }}
                />
              )}
            </motion.div>
          );
        })}
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

