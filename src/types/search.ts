/**
 * Type definitions for advanced search and filters feature
 * @see data-model.md for detailed entity descriptions
 */

/**
 * Represents a single suggestion in autocomplete dropdown
 */
export interface SearchSuggestion {
  id: string;              // Game ID
  title: string;           // Game title
  image: string;          // Thumbnail URL
  slug: string;           // Game slug for navigation
  relevanceScore: number;  // Calculated relevance (0-1)
}

/**
 * Represents a saved filter set stored in localStorage
 */
export interface SavedFilterSet {
  id: string;              // Unique identifier (UUID v4)
  name: string;            // User-defined name
  filters: FilterState;    // Complete filter configuration
  createdAt: number;       // Timestamp (milliseconds since epoch)
  lastUsed?: number;       // Optional: last usage timestamp
}

/**
 * Represents the complete state of all active filters
 */
export interface FilterState {
  platforms: string[];                    // Selected platform slugs
  genres: string[];                       // Selected genre slugs
  priceRange?: {                          // Custom price range
    min: number;
    max: number;
  };
  pricePreset?: string;                   // Price preset value ('under-10', '10-25', etc.)
  rating?: {                              // Rating filter
    min: number;                          // Minimum rating (0-100)
  };
  releaseDate?: {                         // Release date range
    from: number;                         // Start year
    to: number;                           // End year
  };
  languages: string[];                    // Selected language codes (ISO 639-1)
  multiplayer?: boolean;                  // Multiplayer filter
  inStockOnly: boolean;                   // Stock filter (default: true)
  searchQuery?: string;                   // Search text
  activationServices?: string[];           // Activation service filters
  regions?: string[];                     // Region filters
  publishers?: string[];                  // Publisher filters
}

/**
 * Represents a single entry in search history
 */
export interface SearchHistoryEntry {
  query: string;          // Search text
  timestamp: number;      // When searched (milliseconds since epoch)
  resultCount?: number;   // Optional: number of results
}

/**
 * Type alias for search history array
 */
export type SearchHistory = SearchHistoryEntry[];
