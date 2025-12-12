# Data Model: G2A Frontend Data Display

## Frontend Game Entity

The frontend receives game data from backend API which contains G2A-synced information.

### Game Interface (Frontend)

```typescript
interface Game {
  id: string;                    // Game ID from database
  title: string;                 // Game name from G2A
  slug: string;                  // URL-friendly slug
  description: string;          // Full description from G2A
  shortDescription?: string;     // Short description
  price: number;                  // Price with 2% markup (from backend)
  originalPrice?: number;         // Original price with markup
  discount?: number;             // Discount percentage
  currency: string;              // Currency code (EUR, USD, etc.)
  image: string;                 // Primary image URL from G2A
  images: string[];              // All image URLs from G2A
  inStock: boolean;              // Stock status from G2A
  releaseDate: string;           // ISO date string
  platforms: string[];          // Platforms from G2A (Steam, Uplay, etc.)
  genres: string[];             // Genres from G2A
  tags: string[];               // Tags from G2A
  isBestSeller: boolean;        // Best seller flag
  isNew: boolean;               // New game flag
  isPreorder: boolean;          // Preorder flag
  publisher?: string;            // Publisher from G2A
  developer?: string;           // Developer from G2A
  activationService?: string;   // Activation service (Steam, Uplay, etc.)
  region?: string;              // Region code
}
```

### Data Source Flow

```
G2A API
  ↓ (sync)
Database (PostgreSQL)
  ↓ (query)
Backend API (/api/games)
  ↓ (HTTP)
Frontend (gamesApi service)
  ↓ (state)
React Components (GameCard, GameSection, etc.)
```

## Image Data

### Image URLs from G2A

- **Primary Image**: First image in `images` array, used in game cards
- **Gallery Images**: All images in `images` array, used in game detail page
- **Image Format**: G2A provides URLs like `https://images.g2a.com/...`
- **Fallback**: If image fails to load, show placeholder

### Image Loading Strategy

1. Use `loading="lazy"` attribute for performance
2. Handle `onError` to show placeholder
3. Preload hero section images (above fold)
4. Lazy load catalog images (below fold)

## Price Data

### Price Calculation

- **G2A Base Price**: Price from G2A API
- **Markup**: 2% applied on backend
- **Display Price**: `price` field includes markup
- **Original Price**: `originalPrice` field (if on sale)
- **Discount**: Calculated as `((originalPrice - price) / originalPrice) * 100`

## Availability Data

### Stock Status

- **inStock**: Boolean from G2A stock check
- **Updated**: Every 15 minutes via scheduled job
- **Display**: Show "In Stock" or "Out of Stock" badge
- **Filtering**: Can filter catalog by `inStockOnly`

## Metadata Display

### Game Information

- **Genres**: Display as tags/badges, used for filtering
- **Platforms**: Display as icons/badges, used for filtering
- **Publisher/Developer**: Display in game detail page
- **Release Date**: Display formatted date
- **Activation Service**: Display as badge (Steam, Uplay, etc.)
- **Region**: Display if not Global

## Component Data Flow

### HomePage Component

```typescript
// Fetches from backend API
const bestSellers = await gamesApi.getBestSellers();
const newGames = await gamesApi.getNewInCatalog();
const preorders = await gamesApi.getPreorders();

// Displays in GameSection components
<GameSection games={bestSellers} />
```

### CatalogPage Component

```typescript
// Fetches with filters
const games = await gamesApi.getGames(filters);

// Displays in grid
games.data.map(game => <GameCard game={game} />)
```

### GameDetailPage Component

```typescript
// Fetches single game
const game = await gamesApi.getGameBySlug(slug);

// Displays all information
<GameDetail game={game} />
```

## Error States

### Missing Data Handling

- **No Games**: Show "No games available" message
- **Missing Image**: Show placeholder image
- **API Error**: Show error message, don't crash
- **Loading**: Show loading skeleton/spinner

## Data Validation

### Frontend Validation

- Verify `image` URL is valid before displaying
- Check `price` is positive number
- Validate `inStock` is boolean
- Ensure arrays (images, genres, platforms) are not null
