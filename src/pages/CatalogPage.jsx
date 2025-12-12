// Catalog Page - GKEYS Gaming Store
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { gamesApi } from '../services/gamesApi';
import { Badge } from '../components/ui/badge';
import { Container } from '../components/ui/container';
import { GameFilters } from '../components/games/GameFilters';

// Using design tokens from design-tokens.ts
// Colors: background #121212, surface #242424, surfaceLight #2A2A2A, border #333333
const theme = {
  colors: {
    primary: '#00C8C2',
    primaryDark: '#00CC52',
    background: '#121212',
    surface: '#242424',
    surfaceLight: '#2A2A2A',
    surfaceHover: '#2F2F2F',
    text: '#FFFFFF',
    textSecondary: '#E5E7EB',
    textMuted: '#9CA3AF',
    border: '#333333',
    discount: '#FF4444',
  },
};

const Icons = {
  Search: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>,
  Heart: ({ filled }) => <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? theme.colors.primary : "none"} stroke={filled ? theme.colors.primary : "currentColor"} strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  Cart: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>,
  Grid: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  Media: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  ChevronDown: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>,
  ChevronUp: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="18 15 12 9 6 15"/></svg>,
  X: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Filter: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
  Telegram: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>,
  Instagram: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
};

const games = [
  { id: 1, title: 'Cyberpunk 2077', price: 59.99, originalPrice: 69.99, discount: 14, image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=400&fit=crop', platform: 'PC', genre: 'RPG', isNew: false, isPreorder: false },
  { id: 2, title: 'Elden Ring', price: 49.99, originalPrice: null, discount: 0, image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=300&h=400&fit=crop', platform: 'PC', genre: 'Action', isNew: true, isPreorder: false },
  { id: 3, title: 'Red Dead Redemption 2', price: 39.99, originalPrice: 59.99, discount: 33, image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&h=400&fit=crop', platform: 'PC', genre: 'Action', isNew: false, isPreorder: false },
  { id: 4, title: 'GTA V', price: 29.99, originalPrice: 39.99, discount: 25, image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b2b0d?w=300&h=400&fit=crop', platform: 'PC', genre: 'Action', isNew: false, isPreorder: false },
  { id: 5, title: 'The Witcher 3', price: 19.99, originalPrice: 39.99, discount: 50, image: 'https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=300&h=400&fit=crop', platform: 'PC', genre: 'RPG', isNew: false, isPreorder: false },
  { id: 6, title: 'Hogwarts Legacy', price: 54.99, originalPrice: null, discount: 0, image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&h=400&fit=crop', platform: 'PC', genre: 'RPG', isNew: true, isPreorder: false },
  { id: 7, title: 'Starfield', price: 69.99, originalPrice: null, discount: 0, image: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=300&h=400&fit=crop', platform: 'PC', genre: 'RPG', isNew: false, isPreorder: true },
  { id: 8, title: 'Spider-Man Remastered', price: 44.99, originalPrice: 59.99, discount: 25, image: 'https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?w=300&h=400&fit=crop', platform: 'PC', genre: 'Action', isNew: false, isPreorder: false },
  { id: 9, title: 'FIFA 24', price: 59.99, originalPrice: null, discount: 0, image: 'https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=300&h=400&fit=crop', platform: 'PC', genre: 'Sports', isNew: true, isPreorder: false },
  { id: 10, title: 'Call of Duty: MW3', price: 69.99, originalPrice: null, discount: 0, image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=400&fit=crop', platform: 'PC', genre: 'Shooter', isNew: true, isPreorder: false },
  { id: 11, title: 'Assassin\'s Creed Mirage', price: 49.99, originalPrice: 59.99, discount: 17, image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=300&h=400&fit=crop', platform: 'PC', genre: 'Action', isNew: false, isPreorder: false },
  { id: 12, title: 'Baldur\'s Gate 3', price: 59.99, originalPrice: null, discount: 0, image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&h=400&fit=crop', platform: 'PC', genre: 'RPG', isNew: true, isPreorder: false },
];


const GameCard = ({ game, onWishlist, isWishlisted }) => {
  const discount = game.originalPrice && game.price < game.originalPrice
    ? Math.round((1 - game.price / game.originalPrice) * 100)
    : game.discount || 0;
  
  return (
      <div 
      className="relative rounded-design-lg overflow-hidden border border-design-border bg-design-surface shadow-card cursor-pointer transition-transform hover:-translate-y-1 min-w-0"
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; }}
    >
      <div className="relative w-full aspect-[3/4] overflow-hidden">
        <img src={game.image} alt={game.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        
        {/* Dark gradient for bottom overlay */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/60 to-transparent pointer-events-none" />
        
          {/* Badge in top right */}
          {(game.isBestSeller || game.isNew) && (
            <Badge 
              variant={game.isBestSeller ? "default" : "secondary"}
              className="absolute top-2 right-2 design-mobile:top-1.5 design-mobile:right-1.5 px-2.5 design-mobile:px-2 py-0.5 design-mobile:py-0.5 text-xs design-mobile:text-[10px] font-bold uppercase rounded-full shadow-sm z-10"
            >
              {game.isBestSeller ? 'Best Seller' : 'New'}
            </Badge>
          )}
          
          {/* Wishlist button */}
          <button 
            type="button"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onWishlist(game.id); }}
            className="absolute bottom-2 right-2 design-mobile:bottom-1.5 design-mobile:right-1.5 w-8 h-8 design-mobile:w-7 design-mobile:h-7 rounded-full bg-black/60 border-none flex items-center justify-center cursor-pointer z-10 hover:bg-black/80 transition-colors"
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Icons.Heart filled={isWishlisted} />
          </button>
          
          {/* Price overlay at bottom */}
          <div className="absolute inset-x-0 bottom-0 p-2 design-mobile:p-1.5 flex flex-col gap-1 design-mobile:gap-0.5 z-10">
            <div className="flex items-baseline gap-1.5 design-mobile:gap-1 flex-wrap">
              <span className="text-lg design-mobile:text-base design-tablet:text-sm font-extrabold text-white drop-shadow-lg">€{typeof game.price === 'number' ? game.price.toFixed(2) : game.price}</span>
              {game.originalPrice && game.originalPrice > game.price && (
                <>
                  <span className="text-xs design-mobile:text-[10px] line-through text-white/70 align-baseline">€{typeof game.originalPrice === 'number' ? game.originalPrice.toFixed(2) : game.originalPrice}</span>
                  {discount > 0 && (
                    <span className="px-1.5 design-mobile:px-1 py-0.5 design-mobile:py-0 text-[10px] design-mobile:text-[9px] font-bold rounded-full bg-design-primary text-black shadow-sm whitespace-nowrap">
                      -{discount}%
                    </span>
                  )}
                </>
              )}
            </div>
          </div>
      </div>
    </div>
  );
};


export default function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [wishlist, setWishlist] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedActivationServices, setSelectedActivationServices] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedPublishers, setSelectedPublishers] = useState([]);
  const [multiplayer, setMultiplayer] = useState(undefined);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [pricePreset, setPricePreset] = useState(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [games, setGames] = useState([]);
  const [totalGames, setTotalGames] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [inStockOnly, setInStockOnly] = useState(true);
  const [filterOptions, setFilterOptions] = useState({
    genres: [],
    platforms: [],
    activationServices: [],
    regions: [],
    publishers: [],
  });
  const [collections, setCollections] = useState([]);

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const togglePlatform = (platform) => {
    setSelectedPlatforms(prev => prev.includes(platform) ? prev.filter(x => x !== platform) : [...prev, platform]);
  };

  const toggleGenre = (genre) => {
    setSelectedGenres(prev => prev.includes(genre) ? prev.filter(x => x !== genre) : [...prev, genre]);
  };

  const clearFilters = () => {
    setSelectedPlatforms([]);
    setSelectedGenres([]);
    setSelectedActivationServices([]);
    setSelectedRegions([]);
    setSelectedPublishers([]);
    setMultiplayer(undefined);
    setPriceRange([0, 100]);
    setPricePreset(undefined);
    setSearchQuery('');
    setCurrentPage(1);
  };

  const activeFiltersCount = selectedPlatforms.length + selectedGenres.length + 
    selectedActivationServices.length + selectedRegions.length + 
    selectedPublishers.length + (multiplayer !== undefined ? 1 : 0) + 
    (pricePreset ? 1 : 0) + (searchQuery ? 1 : 0);

  // Load filter options and collections
  useEffect(() => {
    const loadData = async () => {
      try {
        const [options, collectionsData] = await Promise.all([
          gamesApi.getFilterOptions(),
          gamesApi.getCollections(),
        ]);
        setFilterOptions(options);
        setCollections(collectionsData);
      } catch (error) {
        console.error('Failed to load data:', error);
      }
    };
    loadData();
  }, []);

  // Load games from API
  useEffect(() => {
    const loadGames = async () => {
      setLoading(true);
      try {
        const filters = {
          page: currentPage,
          pageSize: 36,
          inStockOnly,
          search: searchQuery || undefined,
          platforms: selectedPlatforms.length > 0 ? selectedPlatforms : undefined,
          genres: selectedGenres.length > 0 ? selectedGenres : undefined,
          activationServices: selectedActivationServices.length > 0 ? selectedActivationServices : undefined,
          regions: selectedRegions.length > 0 ? selectedRegions : undefined,
          publishers: selectedPublishers.length > 0 ? selectedPublishers : undefined,
          multiplayer: multiplayer !== undefined ? multiplayer : undefined,
          pricePreset: pricePreset || undefined,
          ...(!pricePreset && priceRange[0] > 0 && priceRange[1] < 100 ? {
            priceRange: {
              min: priceRange[0],
              max: priceRange[1],
            }
          } : {}),
          sort: sortBy,
        };
        
        const result = await gamesApi.getGames(filters);
        setGames(result.data);
        setTotalGames(result.total);
        setTotalPages(result.totalPages);
      } catch (error) {
        console.error('Failed to load games:', error);
        setGames([]);
        setTotalGames(0);
      } finally {
        setLoading(false);
      }
    };
    loadGames();
  }, [currentPage, selectedPlatforms, selectedGenres, selectedActivationServices, selectedRegions, selectedPublishers, multiplayer, priceRange, pricePreset, searchQuery, sortBy, inStockOnly]);

  // Initialize filters from URL params
  useEffect(() => {
    const genreParam = searchParams.get('genres');
    if (genreParam) {
      setSelectedGenres([genreParam]);
    }
  }, [searchParams]);

  const responsiveCSS = `
    .catalog-layout { display: grid; grid-template-columns: 260px 1fr; gap: 32px; }
    .filter-sidebar-desktop { position: sticky; top: 100px; height: fit-content; }
    .filter-sidebar-mobile { display: none; }
    .games-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; width: 100%; }
    .games-grid > * { min-width: 0; }
    .mobile-filter-btn { display: none; }
    @media (max-width: 1024px) {
      .games-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    }
    @media (max-width: 768px) {
      .catalog-layout { grid-template-columns: 1fr; padding: 0 12px; }
      .filter-sidebar-desktop { display: none; }
      .filter-sidebar-mobile.mobile-open { display: block; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: ${theme.colors.background}; z-index: 1000; padding: 20px; overflow-y: auto; }
      .games-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
      .mobile-filter-btn { display: flex; }
      .desktop-nav { display: none; }
      .desktop-search, .desktop-login { display: none; }
    }
    @media (max-width: 480px) {
      .catalog-layout { padding: 0 12px; }
      .games-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
    }
  `;

  const styles = {
    app: { minHeight: '100vh', background: theme.colors.background, color: theme.colors.text },
    header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: `1px solid ${theme.colors.border}`, position: 'sticky', top: 0, background: theme.colors.background, zIndex: 100 },
    logo: { fontSize: '24px', fontWeight: '800', textDecoration: 'none', color: theme.colors.text },
    nav: { display: 'flex', gap: '24px' },
    navLink: { display: 'flex', alignItems: 'center', gap: '6px', color: theme.colors.textSecondary, textDecoration: 'none', fontSize: '14px', fontWeight: '500' },
    rightSection: { display: 'flex', alignItems: 'center', gap: '16px' },
    iconButton: { background: 'none', border: 'none', color: theme.colors.text, cursor: 'pointer', padding: '8px' },
    searchButton: { display: 'flex', alignItems: 'center', gap: '8px', background: theme.colors.surface, border: 'none', color: theme.colors.textSecondary, padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' },
    loginButton: { background: theme.colors.primary, color: '#000', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '14px' },
    main: { maxWidth: '1400px', margin: '0 auto' },
    pageTitle: { fontSize: '28px', fontWeight: '700', marginBottom: '8px' },
    resultCount: { color: theme.colors.textMuted, fontSize: '14px', marginBottom: '24px' },
    filterSidebar: { background: theme.colors.surface, borderRadius: '12px', padding: '20px' },
    filterHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
    clearButton: { background: 'none', border: 'none', color: theme.colors.primary, cursor: 'pointer', fontSize: '13px' },
    sortRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
    sortSelect: { background: theme.colors.surface, border: `1px solid ${theme.colors.border}`, color: theme.colors.text, padding: '10px 16px', borderRadius: '8px', fontSize: '14px', cursor: 'pointer' },
    activeFilters: { display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' },
    filterTag: { display: 'flex', alignItems: 'center', gap: '6px', background: theme.colors.surfaceLight, padding: '6px 12px', borderRadius: '20px', fontSize: '13px', color: theme.colors.text },
    removeTag: { background: 'none', border: 'none', color: theme.colors.textMuted, cursor: 'pointer', padding: '0', display: 'flex' },
    mobileFilterBtn: { alignItems: 'center', gap: '8px', background: theme.colors.surface, border: 'none', color: theme.colors.text, padding: '12px 20px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' },
    footer: { borderTop: `1px solid ${theme.colors.border}`, padding: '48px 24px', marginTop: '64px' },
    footerTop: { display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '24px', marginBottom: '32px', maxWidth: '1280px', margin: '0 auto 32px' },
    footerNav: { display: 'flex', flexWrap: 'wrap', gap: '24px' },
    footerLink: { color: theme.colors.textSecondary, textDecoration: 'none', fontSize: '14px' },
    footerSocial: { display: 'flex', gap: '16px' },
    footerBottom: { textAlign: 'center', paddingTop: '32px', borderTop: `1px solid ${theme.colors.border}`, maxWidth: '1280px', margin: '0 auto' },
    copyright: { color: theme.colors.textMuted, fontSize: '12px', lineHeight: '1.8' },
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleSearchSelect = (suggestion) => {
    setSearchQuery(suggestion.title);
    setCurrentPage(1);
  };

  const handlePricePresetChange = (preset) => {
    setPricePreset(preset);
    setCurrentPage(1);
  };

  const handlePriceRangeChange = (range) => {
    setPriceRange(range);
    setPricePreset(undefined);
    setCurrentPage(1);
  };

  const handlePlatformToggle = (platform) => {
    togglePlatform(platform);
    setCurrentPage(1);
  };

  const handleActivationServiceToggle = (service) => {
    setSelectedActivationServices(prev => 
      prev.includes(service) ? prev.filter(x => x !== service) : [...prev, service]
    );
    setCurrentPage(1);
  };

  const handleRegionToggle = (region) => {
    setSelectedRegions(prev => 
      prev.includes(region) ? prev.filter(x => x !== region) : [...prev, region]
    );
    setCurrentPage(1);
  };

  const handleMultiplayerChange = (value) => {
    setMultiplayer(value);
    setCurrentPage(1);
  };

  const handlePublisherToggle = (publisher) => {
    setSelectedPublishers(prev => 
      prev.includes(publisher) ? prev.filter(x => x !== publisher) : [...prev, publisher]
    );
    setCurrentPage(1);
  };

  const handleGenreToggle = (genre) => {
    toggleGenre(genre);
    setCurrentPage(1);
  };

  return (
    <>
      <style>{responsiveCSS}</style>
      {/* Main Content */}
        <main className="max-w-[1400px] mx-auto">
          <Container padding="md">
          <h1 style={styles.pageTitle}>Catalog</h1>
          <p style={styles.resultCount}>{totalGames} games available</p>

          {/* Active Filters */}
          {activeFiltersCount > 0 && (
            <div style={styles.activeFilters}>
              {searchQuery && (
                <span style={styles.filterTag}>
                  Search: {searchQuery}
                  <button onClick={() => setSearchQuery('')} style={styles.removeTag}><Icons.X /></button>
                </span>
              )}
              {pricePreset && (
                <span style={styles.filterTag}>
                  {pricePresets.find(p => p.value === pricePreset)?.label}
                  <button onClick={() => setPricePreset(undefined)} style={styles.removeTag}><Icons.X /></button>
                </span>
              )}
              {selectedPlatforms.map(p => {
                const platform = filterOptions.platforms.find(pl => pl.slug === p);
                return (
                  <span key={p} style={styles.filterTag}>
                    {platform?.name || p}
                    <button onClick={() => togglePlatform(p)} style={styles.removeTag}><Icons.X /></button>
                  </span>
                );
              })}
              {selectedGenres.map(g => {
                const genre = filterOptions.genres.find(gen => gen.slug === g);
                return (
                  <span key={g} style={styles.filterTag}>
                    {genre?.name || g}
                    <button onClick={() => toggleGenre(g)} style={styles.removeTag}><Icons.X /></button>
                  </span>
                );
              })}
              {selectedActivationServices.map(s => (
                <span key={s} style={styles.filterTag}>
                  {s}
                  <button onClick={() => setSelectedActivationServices(prev => prev.filter(x => x !== s))} style={styles.removeTag}><Icons.X /></button>
                </span>
              ))}
              {selectedRegions.map(r => (
                <span key={r} style={styles.filterTag}>
                  {r}
                  <button onClick={() => setSelectedRegions(prev => prev.filter(x => x !== r))} style={styles.removeTag}><Icons.X /></button>
                </span>
              ))}
              {selectedPublishers.map(p => (
                <span key={p} style={styles.filterTag}>
                  {p}
                  <button onClick={() => setSelectedPublishers(prev => prev.filter(x => x !== p))} style={styles.removeTag}><Icons.X /></button>
                </span>
              ))}
              {multiplayer !== undefined && (
                <span style={styles.filterTag}>
                  {multiplayer ? 'Multiplayer' : 'Single Player'}
                  <button onClick={() => setMultiplayer(undefined)} style={styles.removeTag}><Icons.X /></button>
                </span>
              )}
            </div>
          )}

          {/* Collections Carousel */}
          {collections.length > 0 && (
            <div style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px' }}>Collections</h2>
              <div style={{ display: 'flex', gap: '20px', overflowX: 'auto', paddingBottom: '10px' }}>
                {collections.map((collection) => (
                  <div key={collection.id} style={{ minWidth: '280px', background: theme.colors.surface, borderRadius: '12px', padding: '16px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>{collection.title}</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '12px' }}>
                      {collection.games.slice(0, 4).map((game) => (
                        <Link key={game.id} to={`/game/${game.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                          <div style={{ position: 'relative', aspectRatio: '3/4', borderRadius: '8px', overflow: 'hidden' }}>
                            <img 
                              src={game.image} 
                              alt={game.title} 
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              loading="lazy"
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/200x267?text=Game';
                              }}
                            />
                          </div>
                        </Link>
                      ))}
                    </div>
                    <Link 
                      to={`/catalog?${collection.type === 'genre' ? `genres=${collection.value}` : `publishers=${collection.value}`}`}
                      style={{ 
                        display: 'inline-block', 
                        color: theme.colors.primary, 
                        fontSize: '14px', 
                        fontWeight: '600',
                        textDecoration: 'none',
                      }}
                    >
                      Check all →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sort & Mobile Filter Button */}
          <div style={styles.sortRow}>
            <button 
              onClick={() => setShowMobileFilters(true)} 
              style={styles.mobileFilterBtn} 
              className="mobile-filter-btn"
            >
              <Icons.Filter /> Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
            </button>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={styles.sortSelect}>
              <option value="popular">Popular</option>
              <option value="newest">Newest</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="price-asc">Price: Low to High</option>
            </select>
          </div>

          {/* Mobile Filter Sidebar (overlay) */}
          <aside 
            style={styles.filterSidebar} 
            className={`filter-sidebar-mobile ${showMobileFilters ? 'mobile-open' : ''}`}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '700' }}>Filters</h2>
              <button onClick={() => setShowMobileFilters(false)} style={styles.iconButton}>
                <Icons.X />
              </button>
            </div>
            <GameFilters
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              onSearch={handleSearch}
              onSearchSelect={handleSearchSelect}
              inStockOnly={inStockOnly}
              onInStockOnlyChange={setInStockOnly}
              pricePreset={pricePreset}
              onPricePresetChange={handlePricePresetChange}
              priceRange={priceRange}
              onPriceRangeChange={handlePriceRangeChange}
              selectedPlatforms={selectedPlatforms}
              onPlatformToggle={handlePlatformToggle}
              selectedActivationServices={selectedActivationServices}
              onActivationServiceToggle={handleActivationServiceToggle}
              selectedRegions={selectedRegions}
              onRegionToggle={handleRegionToggle}
              multiplayer={multiplayer}
              onMultiplayerChange={handleMultiplayerChange}
              selectedPublishers={selectedPublishers}
              onPublisherToggle={handlePublisherToggle}
              selectedGenres={selectedGenres}
              onGenreToggle={handleGenreToggle}
              filterOptions={filterOptions}
              activeFiltersCount={activeFiltersCount}
              onClearFilters={clearFilters}
            />
            <button 
              onClick={() => setShowMobileFilters(false)}
              style={{ ...styles.loginButton, width: '100%', marginTop: '20px' }}
            >
              Apply Filters
            </button>
          </aside>

          {/* Catalog Layout */}
          <div className="catalog-layout">
            {/* Desktop Filter Sidebar */}
            <aside style={styles.filterSidebar} className="filter-sidebar-desktop">
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Filters</h3>
              <GameFilters
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              onSearch={handleSearch}
              onSearchSelect={handleSearchSelect}
              inStockOnly={inStockOnly}
              onInStockOnlyChange={setInStockOnly}
              pricePreset={pricePreset}
              onPricePresetChange={handlePricePresetChange}
              priceRange={priceRange}
              onPriceRangeChange={handlePriceRangeChange}
              selectedPlatforms={selectedPlatforms}
              onPlatformToggle={handlePlatformToggle}
              selectedActivationServices={selectedActivationServices}
              onActivationServiceToggle={handleActivationServiceToggle}
              selectedRegions={selectedRegions}
              onRegionToggle={handleRegionToggle}
              multiplayer={multiplayer}
              onMultiplayerChange={handleMultiplayerChange}
              selectedPublishers={selectedPublishers}
              onPublisherToggle={handlePublisherToggle}
              selectedGenres={selectedGenres}
              onGenreToggle={handleGenreToggle}
              filterOptions={filterOptions}
              activeFiltersCount={activeFiltersCount}
              onClearFilters={clearFilters}
            />
            </aside>

            {/* Games Grid */}
            <div className="games-grid" style={{ width: '100%' }}>
              {loading ? (
                <div style={{ gridColumn: '1 / -1', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                    <div
                      key={i}
                      style={{
                        aspectRatio: '3/4',
                        backgroundColor: theme.colors.surface,
                        borderRadius: '12px',
                        border: `1px solid ${theme.colors.border}`,
                        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                      }}
                    />
                  ))}
                </div>
              ) : games.length > 0 ? (
                games.map(game => (
                  <Link key={game.id} to={`/game/${game.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <GameCard
                      game={game}
                      onWishlist={toggleWishlist}
                      isWishlisted={wishlist.includes(game.id)}
                    />
                  </Link>
                ))
              ) : (
                <div 
                  style={{ 
                    gridColumn: '1 / -1', 
                    textAlign: 'center', 
                    padding: '60px 24px',
                    backgroundColor: theme.colors.surface,
                    borderRadius: '16px',
                    border: `1px solid ${theme.colors.border}`,
                  }}
                >
                  <p style={{ fontSize: '18px', color: theme.colors.text, marginBottom: '8px' }}>
                    No games found
                  </p>
                  <p style={{ fontSize: '14px', color: theme.colors.textSecondary }}>
                    Try adjusting your filters or search query.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '40px' }}>
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  border: 'none',
                  background: theme.colors.surface,
                  color: theme.colors.text,
                  fontWeight: '600',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  opacity: currentPage === 1 ? 0.5 : 1,
                }}
              >
                ‹
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let page;
                if (totalPages <= 5) {
                  page = i + 1;
                } else if (currentPage <= 3) {
                  page = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  page = totalPages - 4 + i;
                } else {
                  page = currentPage - 2 + i;
                }
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      border: 'none',
                      background: page === currentPage ? theme.colors.primary : theme.colors.surface,
                      color: page === currentPage ? '#000' : theme.colors.text,
                      fontWeight: '600',
                      cursor: 'pointer',
                    }}
                  >
                    {page}
                  </button>
                );
              })}
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  border: 'none',
                  background: theme.colors.surface,
                  color: theme.colors.text,
                  fontWeight: '600',
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                  opacity: currentPage === totalPages ? 0.5 : 1,
                }}
              >
                ›
              </button>
            </div>
          )}
          </Container>
        </main>
    </>
  );
}

