// Catalog Page - GKEYS Gaming Store
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { gamesApi } from '../services/gamesApi';

const theme = {
  colors: {
    primary: '#00FF66',
    primaryDark: '#00CC52',
    background: '#0D0D0D',
    surface: '#1A1A1A',
    surfaceLight: '#2A2A2A',
    surfaceHover: '#333333',
    text: '#FFFFFF',
    textSecondary: '#999999',
    textMuted: '#666666',
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

const pricePresets = [
  { label: 'Under €10', value: 'under-10' },
  { label: '€10 - €25', value: '10-25' },
  { label: '€25 - €50', value: '25-50' },
  { label: '€50 - €100', value: '50-100' },
  { label: 'Over €100', value: 'over-100' },
];

const GameCard = ({ game, onWishlist, isWishlisted }) => {
  const badges = [];
  if (game.isBestSeller) badges.push({ text: 'Best Seller', color: theme.colors.primary });
  if (game.isNew) badges.push({ text: 'New', color: theme.colors.primary });
  if (game.isPreorder) badges.push({ text: 'Preorder', color: '#FFB800' });
  
  return (
    <div style={{
      background: theme.colors.surface,
      borderRadius: '12px',
      overflow: 'hidden',
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'pointer',
    }}
    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; }}
    onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; }}
    >
      <div style={{ position: 'relative' }}>
        <img src={game.image} alt={game.title} style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover' }} />
        {badges.length > 0 && (
          <div style={{ position: 'absolute', top: '8px', left: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {badges.map((badge, idx) => (
              <span key={idx} style={{
                background: badge.color, color: badge.color === theme.colors.primary ? '#000' : '#000',
                padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '600',
              }}>{badge.text}</span>
            ))}
          </div>
        )}
        {game.discount && game.discount > 0 && (
          <span style={{
            position: 'absolute', top: '8px', right: '8px',
            background: theme.colors.discount, color: '#fff',
            padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '600',
          }}>-{game.discount}%</span>
        )}
        <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); onWishlist(game.id); }} style={{
          position: 'absolute', bottom: '8px', right: '8px',
          background: 'rgba(0,0,0,0.6)', border: 'none', borderRadius: '50%',
          width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: isWishlisted ? theme.colors.primary : '#fff',
        }}>
          <Icons.Heart filled={isWishlisted} />
        </button>
      </div>
      <div style={{ padding: '12px' }}>
        <div style={{ fontSize: '11px', color: theme.colors.textMuted, marginBottom: '4px' }}>
          {game.platforms && game.platforms.length > 0 ? game.platforms[0] : 'PC'} • {game.genres && game.genres.length > 0 ? game.genres[0] : 'Game'}
        </div>
        <h3 style={{ fontSize: '14px', fontWeight: '500', color: theme.colors.text, marginBottom: '8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{game.title}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '16px', fontWeight: '700', color: theme.colors.primary }}>€{typeof game.price === 'number' ? game.price.toFixed(2) : game.price}</span>
          {game.originalPrice && (
            <span style={{ fontSize: '13px', color: theme.colors.textMuted, textDecoration: 'line-through' }}>€{typeof game.originalPrice === 'number' ? game.originalPrice.toFixed(2) : game.originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
};

const FilterSection = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom: `1px solid ${theme.colors.border}`, paddingBottom: '16px', marginBottom: '16px' }}>
      <button onClick={() => setIsOpen(!isOpen)} style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%',
        background: 'none', border: 'none', color: theme.colors.text, fontSize: '14px', fontWeight: '600',
        cursor: 'pointer', padding: '8px 0',
      }}>
        {title}
        {isOpen ? <Icons.ChevronUp /> : <Icons.ChevronDown />}
      </button>
      {isOpen && <div style={{ marginTop: '12px' }}>{children}</div>}
    </div>
  );
};

const Checkbox = ({ label, checked, onChange }) => (
  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '8px' }}>
    <input type="checkbox" checked={checked} onChange={onChange} style={{
      width: '18px', height: '18px', accentColor: theme.colors.primary, cursor: 'pointer',
    }} />
    <span style={{ color: theme.colors.textSecondary, fontSize: '14px' }}>{label}</span>
  </label>
);

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
    .games-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
    .mobile-filter-btn { display: none; }
    @media (max-width: 1024px) {
      .games-grid { grid-template-columns: repeat(3, 1fr); }
    }
    @media (max-width: 768px) {
      .catalog-layout { grid-template-columns: 1fr; }
      .filter-sidebar-desktop { display: none; }
      .filter-sidebar-mobile.mobile-open { display: block; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: ${theme.colors.background}; z-index: 1000; padding: 20px; overflow-y: auto; }
      .games-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
      .mobile-filter-btn { display: flex; }
      .desktop-nav { display: none; }
      .desktop-search, .desktop-login { display: none; }
    }
    @media (max-width: 480px) {
      .games-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
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
    main: { maxWidth: '1400px', margin: '0 auto', padding: '32px 24px' },
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

  const FilterContent = () => (
    <>
      {activeFiltersCount > 0 && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
          <button onClick={clearFilters} style={styles.clearButton}>Clear all</button>
        </div>
      )}

      <FilterSection title="Search">
        <input
          type="text"
          placeholder="Search games..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          style={{
            width: '100%',
            padding: '10px 12px',
            background: theme.colors.background,
            border: `1px solid ${theme.colors.border}`,
            borderRadius: '8px',
            color: theme.colors.text,
            fontSize: '14px',
          }}
        />
      </FilterSection>

      <FilterSection title="In Stock Only">
        <Checkbox 
          label="Show only available games" 
          checked={inStockOnly} 
          onChange={(e) => setInStockOnly(e.target.checked)} 
        />
      </FilterSection>

      <FilterSection title="Price Presets">
        {pricePresets.map(preset => (
          <Checkbox
            key={preset.value}
            label={preset.label}
            checked={pricePreset === preset.value}
            onChange={() => {
              setPricePreset(pricePreset === preset.value ? undefined : preset.value);
              setCurrentPage(1);
            }}
          />
        ))}
      </FilterSection>

      <FilterSection title="Price Range">
        <div style={{ padding: '0 8px' }}>
          <input
            type="range"
            min="0"
            max="100"
            value={priceRange[1]}
            onChange={(e) => {
              setPriceRange([priceRange[0], parseInt(e.target.value)]);
              setPricePreset(undefined);
              setCurrentPage(1);
            }}
            style={{ width: '100%', accentColor: theme.colors.primary }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
            <span style={{ color: theme.colors.textMuted, fontSize: '13px' }}>€{priceRange[0]}</span>
            <span style={{ color: theme.colors.textMuted, fontSize: '13px' }}>€{priceRange[1]}</span>
          </div>
        </div>
      </FilterSection>
      
      <FilterSection title="Platform">
        {filterOptions.platforms.map(platform => (
          <Checkbox
            key={platform.slug}
            label={platform.name}
            checked={selectedPlatforms.includes(platform.slug)}
            onChange={() => {
              togglePlatform(platform.slug);
              setCurrentPage(1);
            }}
          />
        ))}
      </FilterSection>

      <FilterSection title="Activation Service">
        {filterOptions.activationServices.map(service => (
          <Checkbox
            key={service}
            label={service}
            checked={selectedActivationServices.includes(service)}
            onChange={() => {
              setSelectedActivationServices(prev => 
                prev.includes(service) ? prev.filter(x => x !== service) : [...prev, service]
              );
              setCurrentPage(1);
            }}
          />
        ))}
      </FilterSection>

      <FilterSection title="Activation Region">
        {filterOptions.regions.map(region => (
          <Checkbox
            key={region}
            label={region}
            checked={selectedRegions.includes(region)}
            onChange={() => {
              setSelectedRegions(prev => 
                prev.includes(region) ? prev.filter(x => x !== region) : [...prev, region]
              );
              setCurrentPage(1);
            }}
          />
        ))}
      </FilterSection>

      <FilterSection title="Multiplayer">
        <Checkbox
          label="Multiplayer"
          checked={multiplayer === true}
          onChange={() => {
            setMultiplayer(multiplayer === true ? undefined : true);
            setCurrentPage(1);
          }}
        />
        <Checkbox
          label="Single Player"
          checked={multiplayer === false}
          onChange={() => {
            setMultiplayer(multiplayer === false ? undefined : false);
            setCurrentPage(1);
          }}
        />
      </FilterSection>

      <FilterSection title="Publisher">
        {filterOptions.publishers.map(publisher => (
          <Checkbox
            key={publisher}
            label={publisher}
            checked={selectedPublishers.includes(publisher)}
            onChange={() => {
              setSelectedPublishers(prev => 
                prev.includes(publisher) ? prev.filter(x => x !== publisher) : [...prev, publisher]
              );
              setCurrentPage(1);
            }}
          />
        ))}
      </FilterSection>

      <FilterSection title="Genre">
        {filterOptions.genres.map(genre => (
          <Checkbox
            key={genre.slug}
            label={genre.name}
            checked={selectedGenres.includes(genre.slug)}
            onChange={() => {
              toggleGenre(genre.slug);
              setCurrentPage(1);
            }}
          />
        ))}
      </FilterSection>
    </>
  );

  return (
    <>
      <style>{responsiveCSS}</style>
      {/* Main Content */}
        <main style={styles.main}>
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
                            <img src={game.image} alt={game.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
            <FilterContent />
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
              <FilterContent />
            </aside>

            {/* Games Grid */}
            <div className="games-grid">
              {loading ? (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: theme.colors.textSecondary }}>
                  Loading games...
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
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: theme.colors.textSecondary }}>
                  No games found
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
        </main>
    </>
  );
}

