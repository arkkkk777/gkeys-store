/**
 * Component Interfaces for Homepage Sections & Sliders
 * 
 * These TypeScript interfaces define the contracts for components
 * used in the homepage sections enhancement feature.
 */

import { Game } from '../../../src/services/gamesApi';

/**
 * Section Configuration Interface
 * Defines the structure and behavior of a game section
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
    params?: Record<string, any>;
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
 * GameSection Component Props
 * Props for the enhanced GameSection component
 */
export interface GameSectionProps {
  /** Section title */
  title: string;
  
  /** Optional subtitle */
  subtitle?: string;
  
  /** Optional description box */
  description?: {
    title: string;
    text: string;
  };
  
  /** Array of games to display */
  games: Game[];
  
  /** Optional tabs for filtering */
  tabs?: string[];
  
  /** Whether to show "Check all" link */
  showCheckAll?: boolean;
  
  /** URL for "Check all" link */
  checkAllLink?: string;
  
  /** Custom text for "Check all" button */
  checkAllText?: string;
  
  /** Number of columns in grid */
  columns?: 4 | 5 | 6;
  
  /** Whether to use carousel mode */
  carousel?: boolean;
  
  /** Custom section styling */
  sectionStyle?: React.CSSProperties;
  
  /** Loading state */
  loading?: boolean;
  
  /** Error state */
  error?: string | null;
}

/**
 * HomePage Section Data Interface
 * Structure for managing all sections in HomePage component
 */
export interface HomePageSections {
  /** Array of section configurations */
  sections: SectionConfig[];
  
  /** State for each section (keyed by section ID) */
  sectionStates: Record<string, SectionState>;
  
  /** Whether all sections are loading */
  allLoading: boolean;
  
  /** Whether any section has an error */
  hasErrors: boolean;
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

/**
 * Framer Motion Variants
 * Animation variants for consistent animations across sections
 */
export interface MotionVariants {
  container: {
    hidden: { opacity: number };
    visible: {
      opacity: number;
      transition: {
        staggerChildren: number;
      };
    };
  };
  item: {
    hidden: { opacity: number; y: number };
    visible: {
      opacity: number;
      y: number;
      transition: {
        duration: number;
      };
    };
  };
}

/**
 * Data Fetching Result
 * Result of fetching data for a section
 */
export interface SectionFetchResult {
  /** Section ID */
  sectionId: string;
  
  /** Success status */
  success: boolean;
  
  /** Games array (if successful) */
  games?: Game[];
  
  /** Error message (if failed) */
  error?: string;
  
  /** Timestamp of fetch */
  timestamp: number;
}
