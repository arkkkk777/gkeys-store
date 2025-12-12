# API Contracts: Homepage Sections & Sliders

## Overview

This document defines the API contracts for data fetching methods used by the homepage sections. All methods are from the existing `gamesApi` service - no new backend endpoints are required.

## Existing API Methods

### getBestSellers

**Purpose**: Fetch best-selling games, optionally filtered by genre.

**Signature**:
```typescript
getBestSellers(genre?: string): Promise<Game[]>
```

**Parameters**:
- `genre` (optional): Filter by genre name (e.g., 'Action', 'RPG')

**Returns**: Array of `Game` objects

**Usage**:
```typescript
// All best sellers
const games = await gamesApi.getBestSellers();

// Best sellers in Action genre
const actionGames = await gamesApi.getBestSellers('Action');
```

**Error Handling**: Falls back to mock data in development mode

---

### getNewInCatalog

**Purpose**: Fetch recently added games to the catalog.

**Signature**:
```typescript
getNewInCatalog(): Promise<Game[]>
```

**Returns**: Array of `Game` objects (typically 15 games)

**Usage**:
```typescript
const newGames = await gamesApi.getNewInCatalog();
```

**Error Handling**: Falls back to mock data in development mode

---

### getPreorders

**Purpose**: Fetch games available for preorder.

**Signature**:
```typescript
getPreorders(): Promise<Game[]>
```

**Returns**: Array of `Game` objects with `isPreorder: true`

**Usage**:
```typescript
const preorders = await gamesApi.getPreorders();
```

**Error Handling**: Falls back to mock data in development mode

---

### getNewGames

**Purpose**: Fetch newly released games.

**Signature**:
```typescript
getNewGames(): Promise<Game[]>
```

**Returns**: Array of `Game` objects (typically 8 games)

**Usage**:
```typescript
const newGames = await gamesApi.getNewGames();
```

**Error Handling**: Falls back to mock data in development mode

---

### getGamesByGenre

**Purpose**: Fetch games filtered by genre.

**Signature**:
```typescript
getGamesByGenre(genre: string): Promise<Game[]>
```

**Parameters**:
- `genre`: Genre name (e.g., 'Action', 'RPG', 'Open World', 'Noir')

**Returns**: Array of `Game` objects matching the genre (typically 20 games)

**Usage**:
```typescript
const actionGames = await gamesApi.getGamesByGenre('Action');
const rpgGames = await gamesApi.getGamesByGenre('RPG');
```

**Error Handling**: Falls back to mock data in development mode

**Genre Mapping**:
- 'Action' → Action games
- 'RPG' → Role-playing games
- 'Open World' → Open world games
- 'Noir' → Noir genre games
- Case-insensitive matching

---

### getRandomGames

**Purpose**: Fetch random games for "Random Picks" section.

**Signature**:
```typescript
getRandomGames(count?: number): Promise<Game[]>
```

**Parameters**:
- `count` (optional): Number of random games to return (default: 10)

**Returns**: Array of `Game` objects (shuffled)

**Usage**:
```typescript
const randomGames = await gamesApi.getRandomGames(4);
```

**Error Handling**: Falls back to mock data in development mode

---

### getCollections

**Purpose**: Fetch game collections (e.g., Sony Exclusives, Remakes).

**Signature**:
```typescript
getCollections(): Promise<Array<{
  id: string;
  title: string;
  type: 'genre' | 'publisher';
  value: string;
  games: Game[];
}>>
```

**Returns**: Array of collection objects, each containing games

**Usage**:
```typescript
const collections = await gamesApi.getCollections();

// Find Sony Exclusives collection
const sonyCollection = collections.find(c => 
  c.title.toLowerCase().includes('sony') || 
  c.value.toLowerCase().includes('sony')
);

// Find Remakes collection
const remakesCollection = collections.find(c => 
  c.title.toLowerCase().includes('remake') ||
  c.title.toLowerCase().includes('remaster')
);
```

**Error Handling**: Falls back to mock data in development mode

**Collection Types**:
- Genre-based: `type: 'genre'`, `value: 'Action'`
- Publisher-based: `type: 'publisher'`, `value: 'Ubisoft'`

---

## Data Fetching Strategy

### Parallel Fetching

All sections should be fetched in parallel using `Promise.allSettled`:

```typescript
const sectionPromises = sections.map(section => 
  fetchSectionData(section)
);

const results = await Promise.allSettled(sectionPromises);

results.forEach((result, index) => {
  if (result.status === 'fulfilled') {
    // Update section state with games
    updateSectionState(sections[index].id, result.value);
  } else {
    // Handle error
    updateSectionError(sections[index].id, result.reason);
  }
});
```

### Error Handling

1. **API Failure**: 
   - In development: Fall back to mock data
   - In production: Show error message, use empty state

2. **Empty Results**:
   - Show empty state message
   - Hide section or show "No games available"

3. **Network Error**:
   - Retry once after 2 seconds
   - If still fails, show error state

### Loading States

Each section should have independent loading state:
- Show skeleton loader while `loading: true`
- Hide skeleton when `loading: false` and games are available
- Show error message if `error !== null`

## Mock Data Fallback

When API fails in development mode, methods fall back to mock data from `gamesData.js`:

- `bestSellersGames` - for Best Sellers
- `newInCatalogGames` - for New in Catalog
- `preorderGames` - for Preorders
- `newGames` - for New Games
- `actionGames` - for Action section
- `openWorldGames` - for Open World section
- `sonyExclusives` - for Sony Exclusives
- `noirGames` - for Noir section
- `remakesGames` - for Remakes section
- `rpgGames` - for RPG section
- `randomPicks` - for Random Picks

## Response Format

All methods return `Game[]` (array of Game objects) with the following structure:

```typescript
interface Game {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  currency: string;
  image: string;
  images: string[];
  inStock: boolean;
  releaseDate: string;
  platforms: string[];
  genres: string[];
  tags: string[];
  isBestSeller: boolean;
  isNew: boolean;
  isPreorder: boolean;
  developer?: string;
  publisher?: string;
  qty?: number;
}
```

## Performance Considerations

- **Parallel Fetching**: All sections fetched simultaneously
- **Caching**: Games cached in component state (no persistent cache)
- **Pagination**: Not needed (sections show limited games, e.g., 6-20)
- **Rate Limiting**: Backend handles G2A API rate limiting

## Testing

### Unit Tests
- Test each API method with mock responses
- Test error handling and fallbacks
- Test parallel fetching with `Promise.allSettled`

### Integration Tests
- Test HomePage component with real API calls
- Test loading states and error states
- Test section rendering with different data

### E2E Tests
- Test homepage loads all sections
- Test section interactions (tabs, carousel)
- Test responsive behavior
