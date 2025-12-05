# Data Model: Расширенный поиск и фильтры

**Feature**: 001-advanced-search-filters  
**Date**: 2024-12-05

## Overview

Данная модель описывает структуры данных для расширенной системы поиска и фильтров. Включает как frontend (TypeScript interfaces), так и backend (Prisma schema) модели.

## Frontend Entities

### 1. SearchSuggestion

Представляет одно предложение в autocomplete dropdown.

```typescript
interface SearchSuggestion {
  id: string;              // Game ID
  title: string;           // Game title
  image: string;          // Thumbnail URL
  slug: string;           // Game slug for navigation
  relevanceScore: number;  // Calculated relevance (0-1)
}
```

**Validation Rules**:
- `id`: Required, non-empty string
- `title`: Required, non-empty string, max 200 characters
- `image`: Required, valid URL
- `slug`: Required, non-empty string, URL-safe
- `relevanceScore`: Required, number between 0 and 1

**State Transitions**: N/A (immutable data)

### 2. SavedFilterSet

Представляет сохраненный набор фильтров пользователя.

```typescript
interface SavedFilterSet {
  id: string;              // Unique identifier (UUID v4)
  name: string;            // User-defined name
  filters: FilterState;    // Complete filter configuration
  createdAt: number;       // Timestamp (milliseconds since epoch)
  lastUsed?: number;       // Optional: last usage timestamp
}
```

**Validation Rules**:
- `id`: Required, valid UUID v4
- `name`: Required, non-empty string, max 50 characters
- `filters`: Required, valid FilterState object
- `createdAt`: Required, positive number
- `lastUsed`: Optional, positive number if provided

**State Transitions**:
- Created → Saved (when user saves filter set)
- Saved → Deleted (when user deletes filter set)
- Saved → Used (when user applies filter set, updates lastUsed)

**Storage**: Browser localStorage, key: `gkeys_saved_filters`

### 3. FilterState

Представляет полное состояние всех активных фильтров.

```typescript
interface FilterState {
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
```

**Validation Rules**:
- `platforms`: Array of strings, each must be valid platform slug
- `genres`: Array of strings, each must be valid genre slug
- `priceRange.min`: If provided, must be >= 0 and <= priceRange.max
- `priceRange.max`: If provided, must be >= priceRange.min and <= 1000
- `pricePreset`: If provided, must be one of: 'under-10', '10-25', '25-50', '50-100', 'over-100'
- `rating.min`: If provided, must be between 0 and 100
- `releaseDate.from`: If provided, must be >= 1900 and <= current year
- `releaseDate.to`: If provided, must be >= releaseDate.from and <= current year + 10
- `languages`: Array of valid ISO 639-1 language codes
- `inStockOnly`: Required boolean, default: true

**State Transitions**:
- Empty → Partial (when user applies first filter)
- Partial → Complete (when user applies all desired filters)
- Complete → Saved (when user saves filter set)
- Any → Cleared (when user clears all filters)

### 4. SearchHistoryEntry

Представляет одну запись в истории поиска.

```typescript
interface SearchHistoryEntry {
  query: string;          // Search text
  timestamp: number;      // When searched (milliseconds since epoch)
  resultCount?: number;   // Optional: number of results
}
```

**Validation Rules**:
- `query`: Required, non-empty string, max 200 characters
- `timestamp`: Required, positive number
- `resultCount`: Optional, non-negative integer if provided

**State Transitions**: N/A (append-only log)

**Storage**: Browser localStorage, key: `gkeys_search_history`, max 10 entries (FIFO)

## Backend Entities

### 5. Game (Extended)

Расширенная модель игры с новыми полями для фильтрации.

**Prisma Schema** (добавления к существующей модели):

```prisma
model Game {
  // ... existing fields
  ratingCritic    Int?      @db.SmallInt  // 0-100, optional
  ratingUser      Int?      @db.SmallInt  // 0-100, optional
  releaseDate      DateTime?               // Release date
  languages       String[]                 // Array of language codes (ISO 639-1)
  
  // Indexes for performance
  @@index([ratingCritic])
  @@index([ratingUser])
  @@index([releaseDate])
  @@index([languages])
}
```

**Validation Rules** (Prisma + application level):
- `ratingCritic`: Optional, if provided must be 0-100
- `ratingUser`: Optional, if provided must be 0-100
- `releaseDate`: Optional, if provided must be valid date
- `languages`: Array, each element must be valid ISO 639-1 code

**Relationships**:
- Existing relationships preserved
- No new relationships required

**Migration Strategy**:
1. Add nullable fields to existing Game model
2. Populate with default values (null for optional fields)
3. Add indexes for filtering performance
4. Update application code to handle new fields

## Data Flow

### Autocomplete Flow

```
User Input (2+ chars)
  ↓
Debounce (300ms)
  ↓
API Request: GET /api/games/autocomplete?q={query}
  ↓
Backend: Search games by title/description
  ↓
Response: SearchSuggestion[]
  ↓
Frontend: Display in dropdown
  ↓
User Selection
  ↓
Navigate to game or apply search
```

### Filter Application Flow

```
User Applies Filter
  ↓
Update FilterState
  ↓
Debounce (300ms)
  ↓
API Request: GET /api/games?{filters}
  ↓
Backend: Filter games by criteria
  ↓
Response: PaginatedGameResponse
  ↓
Frontend: Update results display
  ↓
Update URL parameters (for shareability)
```

### Saved Filters Flow

```
User Saves Filters
  ↓
Serialize FilterState
  ↓
Store in localStorage (gkeys_saved_filters)
  ↓
User Loads Saved Filter
  ↓
Deserialize FilterState
  ↓
Apply to current search
  ↓
Update lastUsed timestamp
```

## Storage Considerations

### LocalStorage Limits

- **Browser Limit**: Typically 5-10MB per domain
- **Our Usage**: 
  - Saved filters: ~1-2KB per set, max 10 sets = ~20KB
  - Search history: ~100 bytes per entry, max 10 entries = ~1KB
  - **Total**: Well within limits

### Error Handling

- **LocalStorage Full**: Graceful degradation, show warning to user
- **LocalStorage Disabled**: Fallback to sessionStorage or in-memory storage
- **Corrupted Data**: Validate on load, reset to defaults if invalid
- **Migration**: Version data structure, migrate on load if version mismatch

## Type Definitions

**File**: `src/types/search.ts`

```typescript
export interface SearchSuggestion {
  id: string;
  title: string;
  image: string;
  slug: string;
  relevanceScore: number;
}

export interface SavedFilterSet {
  id: string;
  name: string;
  filters: FilterState;
  createdAt: number;
  lastUsed?: number;
}

export interface FilterState {
  platforms: string[];
  genres: string[];
  priceRange?: { min: number; max: number };
  pricePreset?: 'under-10' | '10-25' | '25-50' | '50-100' | 'over-100';
  rating?: { min: number };
  releaseDate?: { from: number; to: number };
  languages: string[];
  multiplayer?: boolean;
  inStockOnly: boolean;
  searchQuery?: string;
  activationServices?: string[];
  regions?: string[];
  publishers?: string[];
}

export interface SearchHistoryEntry {
  query: string;
  timestamp: number;
  resultCount?: number;
}

export type SearchHistory = SearchHistoryEntry[];
```
