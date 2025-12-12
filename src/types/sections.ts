import type { Game } from './game';

/**
 * Section Configuration Interface
 * Defines the structure and behavior of a game section on the homepage
 */
export interface SectionConfig {
  /** Unique identifier for the section */
  id: string;
  
  /** Section title displayed to users */
  title: string;
  
  /** Optional subtitle text */
  subtitle?: string;
  
  /** Optional description box with title and text */
  description?: {
    title: string;
    text: string;
  };
  
  /** Data source configuration */
  dataSource: {
    /** Type of data source: 'api', 'mock', or 'collection' */
    type: 'api' | 'mock' | 'collection';
    
    /** 
     * API method name (if type === 'api')
     * Must be a method from gamesApi (e.g., 'getBestSellers', 'getGamesByGenre')
     */
    method?: string;
    
    /** 
     * Collection identifier (if type === 'collection' or 'mock')
     * For mock: key from gamesData.js
     * For collection: collection ID from getCollections()
     */
    collectionId?: string;
    
    /** Parameters to pass to API method */
    params?: Record<string, string | number | boolean>;
  };
  
  /** Display configuration */
  display: {
    /** Number of columns in grid (4, 5, or 6) */
    columns: 4 | 5 | 6;
    
    /** Whether to use carousel mode instead of grid */
    carousel: boolean;
    
    /** Whether to show "Check all" link */
    showCheckAll: boolean;
    
    /** URL for "Check all" link */
    checkAllLink: string;
    
    /** Custom text for "Check all" button (default: "Check all") */
    checkAllText?: string;
  };
  
  /** Optional tabs for filtering (e.g., Best Sellers tabs) */
  tabs?: string[];
  
  /** Animation configuration */
  animation?: {
    /** Whether animations are enabled */
    enabled: boolean;
    
    /** Delay between items in staggered animation (seconds) */
    staggerDelay?: number;
    
    /** Animation duration (seconds) */
    duration?: number;
  };
}

/**
 * Section State Interface
 * Tracks the loading and data state for a section
 */
export interface SectionState {
  /** Section ID matching SectionConfig.id */
  id: string;
  
  /** Array of games to display */
  games: Game[];
  
  /** Whether data is currently loading */
  loading: boolean;
  
  /** Error message if fetch failed, null if successful */
  error: string | null;
  
  /** Timestamp of last successful fetch (milliseconds) */
  lastFetched: number | null;
}

/**
 * Animation Configuration Interface
 * Configuration for Framer Motion animations
 */
export interface AnimationConfig {
  /** Whether user prefers reduced motion */
  reducedMotion: boolean;
  
  /** Whether animations are enabled (false if reducedMotion is true) */
  enabled: boolean;
  
  /** Default stagger delay between items (seconds) */
  staggerDelay: number;
  
  /** Default animation duration (seconds) */
  duration: number;
}
