import React, { useState } from 'react';
import { SearchAutocomplete } from '../ui/search-autocomplete';

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

const ChevronDown: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <title>Chevron Down</title>
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

const ChevronUp: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <title>Chevron Up</title>
    <polyline points="18 15 12 9 6 15"/>
  </svg>
);

const pricePresets = [
  { label: 'Under €10', value: 'under-10' },
  { label: '€10 - €25', value: '10-25' },
  { label: '€25 - €50', value: '25-50' },
  { label: '€50 - €100', value: '50-100' },
  { label: 'Over €100', value: 'over-100' },
];

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const FilterSection: React.FC<FilterSectionProps> = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom: `1px solid ${theme.colors.border}`, paddingBottom: '16px', marginBottom: '16px' }}>
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)} 
        style={{
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          width: '100%',
          background: 'none', 
          border: 'none', 
          color: theme.colors.text, 
          fontSize: '14px', 
          fontWeight: '600',
          cursor: 'pointer', 
          padding: '8px 0',
        }}
      >
        {title}
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </button>
      {isOpen && <div style={{ marginTop: '12px' }}>{children}</div>}
    </div>
  );
};

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange }) => (
  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '8px' }}>
    <input 
      type="checkbox" 
      checked={checked} 
      onChange={onChange} 
      style={{
        width: '18px', 
        height: '18px', 
        accentColor: theme.colors.primary, 
        cursor: 'pointer',
      }} 
    />
    <span style={{ color: theme.colors.textSecondary, fontSize: '14px' }}>{label}</span>
  </label>
);

export interface GameFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearch: (query: string) => void;
  onSearchSelect: (suggestion: { title: string }) => void;
  inStockOnly: boolean;
  onInStockOnlyChange: (checked: boolean) => void;
  pricePreset: string | undefined;
  onPricePresetChange: (preset: string | undefined) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  selectedPlatforms: string[];
  onPlatformToggle: (platform: string) => void;
  selectedActivationServices: string[];
  onActivationServiceToggle: (service: string) => void;
  selectedRegions: string[];
  onRegionToggle: (region: string) => void;
  multiplayer: boolean | undefined;
  onMultiplayerChange: (value: boolean | undefined) => void;
  selectedPublishers: string[];
  onPublisherToggle: (publisher: string) => void;
  selectedGenres: string[];
  onGenreToggle: (genre: string) => void;
  filterOptions: {
    genres: Array<{ name: string; slug: string }>;
    platforms: Array<{ name: string; slug: string }>;
    activationServices: string[];
    regions: string[];
    publishers: string[];
  };
  activeFiltersCount: number;
  onClearFilters: () => void;
}

export const GameFilters: React.FC<GameFiltersProps> = ({
  searchQuery,
  onSearchChange,
  onSearch,
  onSearchSelect,
  inStockOnly,
  onInStockOnlyChange,
  pricePreset,
  onPricePresetChange,
  priceRange,
  onPriceRangeChange,
  selectedPlatforms,
  onPlatformToggle,
  selectedActivationServices,
  onActivationServiceToggle,
  selectedRegions,
  onRegionToggle,
  multiplayer,
  onMultiplayerChange,
  selectedPublishers,
  onPublisherToggle,
  selectedGenres,
  onGenreToggle,
  filterOptions,
  activeFiltersCount,
  onClearFilters,
}) => {
  return (
    <>
      {activeFiltersCount > 0 && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
          <button 
            type="button"
            onClick={onClearFilters} 
            style={{
              background: 'none', 
              border: 'none', 
              color: theme.colors.primary, 
              cursor: 'pointer', 
              fontSize: '13px'
            }}
          >
            Clear all
          </button>
        </div>
      )}

      <FilterSection title="Search">
        <SearchAutocomplete
          value={searchQuery}
          placeholder="Search games..."
          onChange={onSearchChange}
          onSearch={onSearch}
          onSelect={onSearchSelect}
          className="w-full"
        />
      </FilterSection>

      <FilterSection title="In Stock Only">
        <Checkbox 
          label="Show only available games" 
          checked={inStockOnly} 
          onChange={(e) => onInStockOnlyChange(e.target.checked)} 
        />
      </FilterSection>

      <FilterSection title="Price Presets">
        {pricePresets.map(preset => (
          <Checkbox
            key={preset.value}
            label={preset.label}
            checked={pricePreset === preset.value}
            onChange={() => {
              onPricePresetChange(pricePreset === preset.value ? undefined : preset.value);
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
              onPriceRangeChange([priceRange[0], parseInt(e.target.value)]);
              onPricePresetChange(undefined);
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
              onPlatformToggle(platform.slug);
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
              onActivationServiceToggle(service);
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
              onRegionToggle(region);
            }}
          />
        ))}
      </FilterSection>

      <FilterSection title="Multiplayer">
        <Checkbox
          label="Multiplayer"
          checked={multiplayer === true}
          onChange={() => {
            onMultiplayerChange(multiplayer === true ? undefined : true);
          }}
        />
        <Checkbox
          label="Single Player"
          checked={multiplayer === false}
          onChange={() => {
            onMultiplayerChange(multiplayer === false ? undefined : false);
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
              onPublisherToggle(publisher);
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
              onGenreToggle(genre.slug);
            }}
          />
        ))}
      </FilterSection>
    </>
  );
};
