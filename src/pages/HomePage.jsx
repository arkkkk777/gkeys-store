import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import GameSection from '../components/GameSection';
import GameCard from '../components/GameCard';
import { gamesApi } from '../services/gamesApi';
import { homepageSections } from '../config/homepageSections';

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

// Sparkle icon
const SparkleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-label="Sparkle">
    <title>Sparkle</title>
    <path d="M12 2L14 8L20 10L14 12L12 18L10 12L4 10L10 8L12 2Z" fill="#FFD93D" />
  </svg>
);

// Chevron icons for carousel
const ChevronLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

// Random Picks Section Component
const RandomPicksSection = ({ games, loading }) => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  // Background image - gamepad controller pattern
  const backgroundImageStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='300' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='gamepad' x='0' y='0' width='300' height='300' patternUnits='userSpaceOnUse'%3E%3Cg opacity='0.2'%3E%3Ccircle cx='75' cy='75' r='20' fill='%23333'/%3E%3Ccircle cx='225' cy='75' r='20' fill='%23333'/%3E%3Crect x='90' y='150' width='120' height='60' rx='12' fill='%23333'/%3E%3Ccircle cx='120' cy='180' r='12' fill='%23333'/%3E%3Ccircle cx='180' cy='180' r='12' fill='%23333'/%3E%3Crect x='105' y='165' width='30' height='30' rx='4' fill='%23333'/%3E%3Crect x='165' y='165' width='30' height='30' rx='4' fill='%23333'/%3E%3Cpath d='M 90 150 L 90 120 L 120 120 L 120 150 Z' fill='%23333'/%3E%3Cpath d='M 180 120 L 210 120 L 210 150 L 180 150 Z' fill='%23333'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23gamepad)'/%3E%3C/svg%3E")`,
    backgroundSize: '300px 300px',
    opacity: 0.2,
    zIndex: 0,
  };

  return (
    <section
      style={{
        padding: '40px 0 60px',
        position: 'relative',
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        <div
          style={{
            position: 'relative',
            backgroundColor: theme.colors.surface,
            borderRadius: '16px',
            padding: '40px 32px',
            border: `1px solid ${theme.colors.border}`,
            overflow: 'hidden',
          }}
        >
          {/* Background Pattern */}
          <div style={backgroundImageStyle} />

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2
              style={{
                fontSize: '32px',
                fontWeight: '700',
                color: theme.colors.text,
                margin: '0 0 8px 0',
              }}
            >
              Hit me with something good
            </h2>
            <p
              style={{
                fontSize: '14px',
                color: theme.colors.primary,
                margin: '0 0 32px 0',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <SparkleIcon />
              Surprisingly awesome random picks
            </p>

            {loading ? (
              <div style={{ color: theme.colors.textSecondary, textAlign: 'center', padding: '40px' }}>
                Loading...
              </div>
            ) : games.length > 0 ? (
              <div style={{ position: 'relative' }}>
                {/* Scroll Buttons */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={scrollLeft}
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
                  ref={scrollRef}
                  style={{
                    display: 'flex',
                    gap: '16px',
                    overflowX: 'auto',
                    scrollSnapType: 'x mandatory',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    paddingBottom: '8px',
                  }}
                  className="carousel-scroll"
                >
                  {games.map((game) => (
                    <div
                      key={game.id}
                      style={{
                        minWidth: '200px',
                        maxWidth: '200px',
                        flexShrink: 0,
                        scrollSnapAlign: 'start',
                      }}
                    >
                      <GameCard game={game} size="medium" />
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={scrollRight}
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
            ) : (
              <p style={{ color: theme.colors.textSecondary, textAlign: 'center', padding: '40px' }}>
                No games available at the moment.
              </p>
            )}

            <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'center' }}>
              <Link to="/catalog?sort=random" style={{ textDecoration: 'none' }}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: theme.colors.primary,
                    color: '#000',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Check all
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          .carousel-scroll::-webkit-scrollbar {
            display: none;
          }
          @media (max-width: 600px) {
            .carousel-btn-left, .carousel-btn-right {
              display: none !important;
            }
          }
        `}
      </style>
    </section>
  );
};

/**
 * Fetch data for a single section based on its configuration
 */
const fetchSectionData = async (section) => {
  try {
    const { dataSource } = section;
    let games = [];

    if (dataSource.type === 'api' && dataSource.method) {
      // Type-safe method access
      const method = gamesApi[dataSource.method];
      if (!method || typeof method !== 'function') {
        throw new Error(`Method ${dataSource.method} not found in gamesApi`);
      }

      if (dataSource.params) {
        // Call method with params (e.g., getGamesByGenre('Action'))
        const paramValues = Object.values(dataSource.params);
        games = await method(...paramValues);
      } else {
        // Call method without params (e.g., getBestSellers())
        games = await method();
      }
    } else if (dataSource.type === 'collection') {
      // Fetch collections and filter by collectionId
      const collections = await gamesApi.getCollections();
      const collection = collections.find(
        (c) =>
          c.id === dataSource.collectionId ||
          c.title.toLowerCase().includes(dataSource.collectionId?.toLowerCase() || '') ||
          c.value.toLowerCase().includes(dataSource.collectionId?.toLowerCase() || '')
      );
      games = collection?.games || [];
    }

    return {
      success: true,
      games: Array.isArray(games) ? games : [],
      error: null,
    };
  } catch (error) {
    console.warn(`Failed to fetch data for section ${section.id}:`, error);
    return {
      success: false,
      games: [],
      error: error?.message || 'Failed to load games',
    };
  }
};

export default function HomePage() {
  // Initialize state for all sections
  const [sectionStates, setSectionStates] = useState(() => {
    const initialState = {};
    homepageSections.forEach((section) => {
      initialState[section.id] = {
        id: section.id,
        games: [],
        loading: true,
        error: null,
        lastFetched: null,
      };
    });
    // Add random picks section state
    initialState['random-picks'] = {
      id: 'random-picks',
      games: [],
      loading: true,
      error: null,
      lastFetched: null,
    };
    return initialState;
  });

  const [randomPicks, setRandomPicks] = useState([]);
  const [randomPicksLoading, setRandomPicksLoading] = useState(true);

  // Fetch data for all sections in parallel
  useEffect(() => {
    const fetchAllSections = async () => {
      // Fetch regular sections
      const sectionPromises = homepageSections.map((section) =>
        fetchSectionData(section).then((result) => ({
          sectionId: section.id,
          ...result,
        }))
      );

      // Fetch random picks separately (10 games as per spec)
      const randomPicksPromise = gamesApi
        .getRandomGames(10)
        .then((games) => ({ success: true, games, error: null }))
        .catch((error) => ({
          success: false,
          games: [],
          error: error.message || 'Failed to load random picks',
        }));

      // Wait for all promises to settle
      const results = await Promise.allSettled([...sectionPromises, randomPicksPromise]);

      // Update section states
      results.forEach((result, index) => {
        if (index < sectionPromises.length) {
          // Regular section
          const { sectionId, success, games, error } =
            result.status === 'fulfilled' ? result.value : { sectionId: homepageSections[index].id, success: false, games: [], error: 'Failed to fetch' };

          setSectionStates((prev) => ({
            ...prev,
            [sectionId]: {
              id: sectionId,
              games,
              loading: false,
              error: success ? null : error,
              lastFetched: success ? Date.now() : null,
            },
          }));
        } else {
          // Random picks
          const { success, games, error } =
            result.status === 'fulfilled' ? result.value : { success: false, games: [], error: 'Failed to fetch' };

          setRandomPicks(games);
          setRandomPicksLoading(false);
          // Also mark the random-picks section as finished to unblock the homepage skeleton
          setSectionStates((prev) => ({
            ...prev,
            'random-picks': {
              ...prev['random-picks'],
              games,
              loading: false,
              error: success ? null : error,
              lastFetched: success ? Date.now() : null,
            },
          }));
        }
      });
    };

    fetchAllSections();
  }, []);

  // Calculate overall loading state
  const allLoading = useMemo(() => {
    return Object.values(sectionStates).some((state) => state.loading) || randomPicksLoading;
  }, [sectionStates, randomPicksLoading]);

  // Calculate if any section has error
  const hasErrors = useMemo(() => {
    return Object.values(sectionStates).some((state) => state.error !== null);
  }, [sectionStates]);

  // Loading skeleton
  if (allLoading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: theme.colors.background,
          color: theme.colors.text,
          padding: '40px 24px',
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* Hero Section Skeleton */}
          <div
            style={{
              height: '600px',
              backgroundColor: theme.colors.surface,
              borderRadius: '16px',
              marginBottom: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme.colors.textSecondary,
            }}
          >
            Loading featured games...
          </div>

          {/* Game Sections Skeleton */}
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} style={{ marginBottom: '40px' }}>
              <div
                style={{
                  height: '28px',
                  width: '200px',
                  backgroundColor: theme.colors.surface,
                  borderRadius: '8px',
                  marginBottom: '24px',
                }}
              />
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(6, 1fr)',
                  gap: '16px',
                }}
              >
                {[1, 2, 3, 4, 5, 6].map((j) => (
                  <div
                    key={j}
                    style={{
                      aspectRatio: '3/4',
                      backgroundColor: theme.colors.surface,
                      borderRadius: '12px',
                      border: `1px solid ${theme.colors.border}`,
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
      }}
    >
      {/* Hero Section */}
      <HeroSection />

      {/* Render all sections from configuration */}
      {homepageSections.map((section) => {
        const sectionState = sectionStates[section.id];
        const games = sectionState?.games || [];

        return (
          <GameSection
            key={section.id}
            title={section.title}
            subtitle={section.subtitle}
            description={section.description}
            games={games}
            tabs={section.tabs}
            showCheckAll={section.display.showCheckAll}
            checkAllLink={section.display.checkAllLink}
            checkAllText={section.display.checkAllText || 'Check all'}
            columns={section.display.columns}
            carousel={section.display.carousel}
            loading={sectionState?.loading}
            error={sectionState?.error}
          />
        );
      })}

      {/* Hit me with something good - Random Picks */}
      <RandomPicksSection games={randomPicks} loading={randomPicksLoading} />
    </div>
  );
}
