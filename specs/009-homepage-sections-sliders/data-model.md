# Data Model: Homepage Sections & Sliders

## Overview

This feature enhances the homepage with additional game sections. The data model defines the structure for section configurations, game data, and animation states. No database changes are required - all data is fetched from existing APIs and managed in component state.

## Entities

### Section Configuration

**Purpose**: Defines the structure and behavior of each game section on the homepage.

**TypeScript Interface**:
```typescript
interface SectionConfig {
  id: string;                    // Unique section identifier
  title: string;                 // Section title (e.g., "Action", "Open World")
  subtitle?: string;             // Optional subtitle
  description?: {                // Optional description box
    title: string;
    text: string;
  };
  dataSource: {                   // How to fetch games for this section
    type: 'api' | 'mock' | 'collection';
    method: string;                // API method name or collection ID
    params?: Record<string, any>;  // Parameters for API call
  };
  display: {
    columns: 4 | 5 | 6;           // Column count for grid
    carousel: boolean;             // Use carousel mode
    showCheckAll: boolean;        // Show "Check all" link
    checkAllLink: string;         // URL for "Check all"
    checkAllText?: string;        // Custom "Check all" text
  };
  tabs?: string[];                // Optional tabs for filtering (e.g., Best Sellers)
  animation?: {                   // Animation configuration
    enabled: boolean;
    staggerDelay?: number;         // Delay between items (default: 0.05s)
    duration?: number;             // Animation duration (default: 0.3s)
  };
}
```

**Examples**:
```typescript
// Best Sellers section with tabs
{
  id: 'best-sellers',
  title: 'Best Sellers',
  dataSource: {
    type: 'api',
    method: 'getBestSellers',
  },
  display: {
    columns: 6,
    carousel: false,
    showCheckAll: true,
    checkAllLink: '/catalog?sort=best-sellers',
  },
  tabs: ['All', 'Adventure', 'Action', 'Sci-Fi', 'Open World', 'Horror', 'RPG', 'Battle Royale'],
}

// Action section
{
  id: 'action',
  title: 'Action',
  dataSource: {
    type: 'api',
    method: 'getGamesByGenre',
    params: { genre: 'Action' },
  },
  display: {
    columns: 6,
    carousel: false,
    showCheckAll: true,
    checkAllLink: '/catalog?genre=action',
  },
}

// New Games with description
{
  id: 'new-games',
  title: 'New games',
  description: {
    title: 'New games',
    text: "There's nothing more exciting than trying something new",
  },
  dataSource: {
    type: 'api',
    method: 'getNewGames',
  },
  display: {
    columns: 4,
    carousel: false,
    showCheckAll: true,
    checkAllLink: '/catalog?filter=new',
    checkAllText: 'Check all',
  },
}
```

### Game Data

**Purpose**: Represents a game item displayed in sections. Uses existing `Game` interface from `gamesApi.ts`.

**TypeScript Interface** (from gamesApi.ts):
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

**Data Sources**:
1. **G2A API** (primary): Via `gamesApi` methods
2. **Mock Data** (fallback): From `gamesData.js`
3. **Collections** (enhancement): Via `gamesApi.getCollections()`

### Section State

**Purpose**: Tracks loading and error states for each section.

**TypeScript Interface**:
```typescript
interface SectionState {
  id: string;
  games: Game[];
  loading: boolean;
  error: string | null;
  lastFetched: number | null;  // Timestamp
}
```

**State Management**:
- Managed in `HomePage` component using `useState`
- Each section has independent state
- Errors don't block other sections

### Animation State

**Purpose**: Tracks animation preferences and states.

**TypeScript Interface**:
```typescript
interface AnimationConfig {
  reducedMotion: boolean;        // User prefers reduced motion
  enabled: boolean;               // Animations enabled (respects reducedMotion)
  staggerDelay: number;          // Default: 0.05s
  duration: number;              // Default: 0.3s
}
```

**Detection**:
```typescript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
```

## Data Flow

### Section Rendering Flow

```
1. HomePage component mounts
2. Define section configurations (array of SectionConfig)
3. For each section:
   a. Initialize state: { games: [], loading: true, error: null }
   b. Fetch data based on dataSource:
      - If type === 'api': Call gamesApi[method](params)
      - If type === 'mock': Use gamesData[collection]
      - If type === 'collection': Call gamesApi.getCollections()
   c. Update state: { games: [...], loading: false }
   d. If error: { error: message, loading: false }
4. Render GameSection components with fetched data
5. GameSection renders GameCard components with Framer Motion animations
```

### Data Fetching Strategy

**Parallel Fetching**:
```typescript
// Fetch all sections in parallel
const sectionPromises = sections.map(section => 
  fetchSectionData(section)
);

const results = await Promise.allSettled(sectionPromises);
// Promise.allSettled ensures one failure doesn't block others
```

**Per-Section Loading**:
- Each section shows its own loading skeleton
- Sections render as data becomes available
- No blocking of entire page

## Section Definitions

### All Sections (in order)

1. **Hero Section** (existing, not modified)
   - Uses `gamesApi.getBestSellers()` (first 5)

2. **Best Sellers**
   - ID: `best-sellers`
   - API: `getBestSellers()`
   - Columns: 6
   - Tabs: ['All', 'Adventure', 'Action', 'Sci-Fi', 'Open World', 'Horror', 'RPG', 'Battle Royale']

3. **New in the Catalog**
   - ID: `new-in-catalog`
   - API: `getNewInCatalog()`
   - Columns: 6
   - Carousel: true

4. **Preorders**
   - ID: `preorders`
   - API: `getPreorders()`
   - Columns: 5
   - Carousel: true

5. **New Games**
   - ID: `new-games`
   - API: `getNewGames()`
   - Columns: 4
   - Description: { title: 'New games', text: "There's nothing more exciting than trying something new" }

6. **Action**
   - ID: `action`
   - API: `getGamesByGenre('Action')`
   - Columns: 6

7. **Open World**
   - ID: `open-world`
   - API: `getGamesByGenre('Open World')` or collection
   - Columns: 6

8. **Former Sony Exclusives**
   - ID: `sony-exclusives`
   - API: `getCollections()` (filter by collection type)
   - Columns: 6

9. **Noir**
   - ID: `noir`
   - API: `getGamesByGenre('Noir')` or collection
   - Columns: 4
   - Description: { title: 'Noir', text: 'The situation was quickly going from bad to worse' }

10. **Remakes / Remasters / Reboots**
    - ID: `remakes`
    - API: `getCollections()` (filter by collection)
    - Columns: 5

11. **Role-Playing (RPG)**
    - ID: `rpg`
    - API: `getGamesByGenre('RPG')`
    - Columns: 5

12. **Random Picks**
    - ID: `random-picks`
    - API: `getRandomGames(4)`
    - Columns: 4
    - Special styling (existing implementation)

## Validation Rules

### Section Configuration
- `id` must be unique
- `title` is required
- `dataSource.method` must be a valid `gamesApi` method
- `display.columns` must be 4, 5, or 6
- `checkAllLink` must be a valid route

### Game Data
- Games array can be empty (shows empty state)
- Each game must have `id`, `title`, `image`
- Missing images use placeholder
- Missing descriptions use fallback text

### Animation
- Animations disabled if `prefers-reduced-motion: reduce`
- Stagger delay: 0.05s (default)
- Duration: 0.3s (default)
- Viewport trigger: `once: true` (animate only once)

## Relationships

- **SectionConfig** → **Game[]**: One-to-many (one section has many games)
- **SectionConfig** → **SectionState**: One-to-one (each section has state)
- **Game** → **GameCard**: One-to-one (each game renders as one card)

## Data Transformation

### API Response → Game
- Uses existing `gamesApi` methods (no transformation needed)
- Games are already in correct format

### Mock Data → Game
- Mock data from `gamesData.js` matches `Game` interface
- No transformation needed

### Collection → Game[]
- `getCollections()` returns `{ games: Game[] }[]`
- Extract games array from collection object

## Caching Strategy

- **Component State**: Games cached in `useState` for component lifetime
- **No Persistent Cache**: Data refetches on page reload
- **Future Enhancement**: Could add React Query or SWR for caching

## Error Handling

- **API Failure**: Show error message, use mock data fallback (dev only)
- **Empty Results**: Show empty state message
- **Missing Images**: Use placeholder image
- **Network Error**: Retry once, then show error
