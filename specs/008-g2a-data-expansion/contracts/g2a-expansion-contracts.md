# G2A Data Expansion API Contracts

## Enhanced G2A Service Methods

### fetchG2AProducts (Enhanced)

**Existing Method**: `fetchG2AProducts(page: number, perPage: number)`

**Enhancements**:
- Support multiple categories (not just 'games')
- Add category parameter to filter by category
- Return category information in product data

**Signature**:
```typescript
export const fetchG2AProducts = async (
  page: number = 1,
  perPage: number = 100,
  category?: string  // NEW: Optional category filter
): Promise<G2APaginatedResponse<G2AProduct>>
```

**Query Parameters** (G2A API):
- `page`: Page number
- `perPage`: Items per page (max 100)
- `category`: Category filter (e.g., 'games', 'dlc', 'software') - NEW
- `inStock`: Only in-stock products (optional)

### syncG2ACatalog (Enhanced)

**Existing Method**: `syncG2ACatalog(options?: { fullSync?: boolean; productIds?: string[] })`

**Enhancements**:
- Extract and create Category/Genre/Platform entities
- Link games to categories/genres/platforms
- Support syncing specific categories
- Track sync progress

**Signature**:
```typescript
export const syncG2ACatalog = async (options?: {
  fullSync?: boolean;
  productIds?: string[];
  categories?: string[];  // NEW: Sync specific categories
  includeRelationships?: boolean;  // NEW: Create category/genre/platform links
}): Promise<{
  added: number;
  updated: number;
  removed: number;
  categoriesCreated: number;  // NEW
  genresCreated: number;  // NEW
  platformsCreated: number;  // NEW
  errors: Array<{ productId: string; error: string }>;
}>
```

### New Methods

#### syncG2ACategories

**Purpose**: Fetch and sync category information from G2A API.

**Signature**:
```typescript
export const syncG2ACategories = async (): Promise<{
  categories: Array<{ name: string; slug: string }>;
  created: number;
  errors: string[];
}>
```

**Implementation**:
- Discover available categories from G2A API
- Create Category records in database
- Return list of categories

#### syncG2AGenres

**Purpose**: Extract and sync genre information from G2A products.

**Signature**:
```typescript
export const syncG2AGenres = async (): Promise<{
  genres: Array<{ name: string; slug: string }>;
  created: number;
  errors: string[];
}>
```

**Implementation**:
- Extract unique genres from all synced products
- Normalize genre names
- Create Genre records in database
- Return list of genres

#### syncG2APlatforms

**Purpose**: Extract and sync platform information from G2A products.

**Signature**:
```typescript
export const syncG2APlatforms = async (): Promise<{
  platforms: Array<{ name: string; slug: string }>;
  created: number;
  errors: string[];
}>
```

**Implementation**:
- Extract unique platforms from all synced products
- Normalize platform names
- Create Platform records in database
- Return list of platforms

#### linkGameRelationships

**Purpose**: Link a game to its categories, genres, and platforms.

**Signature**:
```typescript
export const linkGameRelationships = async (
  gameId: string,
  categoryNames: string[],
  genreNames: string[],
  platformNames: string[]
): Promise<{
  categoriesLinked: number;
  genresLinked: number;
  platformsLinked: number;
  errors: string[];
}>
```

**Implementation**:
- Find or create Category/Genre/Platform records by name
- Create GameCategory/GameGenre/GamePlatform links
- Remove old links that no longer apply
- Return counts of linked relationships

#### getG2ASyncProgress

**Purpose**: Get progress information for ongoing sync operation.

**Signature**:
```typescript
export const getG2ASyncProgress = async (): Promise<{
  inProgress: boolean;
  currentPage: number;
  totalPages: number;
  productsProcessed: number;
  productsTotal: number;
  categoriesCreated: number;
  genresCreated: number;
  platformsCreated: number;
  errors: number;
  startedAt: string | null;
  estimatedCompletion: string | null;
}>
```

**Implementation**:
- Track sync progress in database or Redis
- Calculate estimated completion time
- Return current progress metrics

## Admin API Endpoints

### Enhanced Sync Endpoint

**Endpoint**: `POST /api/admin/g2a/sync` (existing, enhanced)

**Request Body**:
```typescript
{
  fullSync?: boolean;
  productIds?: string[];
  categories?: string[];  // NEW: Sync specific categories
  includeRelationships?: boolean;  // NEW: Create category/genre/platform links
}
```

**Response**:
```typescript
{
  success: boolean;
  data: {
    added: number;
    updated: number;
    removed: number;
    categoriesCreated: number;  // NEW
    genresCreated: number;  // NEW
    platformsCreated: number;  // NEW
    errors: Array<{
      productId: string;
      error: string;
    }>;
  };
}
```

### Sync Categories Endpoint

**Endpoint**: `POST /api/admin/g2a/sync-categories` (NEW)

**Authentication**: Admin JWT token required

**Request Body**: (empty)

**Response**:
```typescript
{
  success: boolean;
  data: {
    categories: Array<{
      id: string;
      name: string;
      slug: string;
    }>;
    created: number;
    errors: string[];
  };
}
```

### Sync Genres Endpoint

**Endpoint**: `POST /api/admin/g2a/sync-genres` (NEW)

**Authentication**: Admin JWT token required

**Request Body**: (empty)

**Response**:
```typescript
{
  success: boolean;
  data: {
    genres: Array<{
      id: string;
      name: string;
      slug: string;
    }>;
    created: number;
    errors: string[];
  };
}
```

### Sync Platforms Endpoint

**Endpoint**: `POST /api/admin/g2a/sync-platforms` (NEW)

**Authentication**: Admin JWT token required

**Request Body**: (empty)

**Response**:
```typescript
{
  success: boolean;
  data: {
    platforms: Array<{
      id: string;
      name: string;
      slug: string;
    }>;
    created: number;
    errors: string[];
  };
}
```

### Get Sync Progress Endpoint

**Endpoint**: `GET /api/admin/g2a/sync-progress` (NEW)

**Authentication**: Admin JWT token required

**Response**:
```typescript
{
  success: boolean;
  data: {
    inProgress: boolean;
    currentPage: number;
    totalPages: number;
    productsProcessed: number;
    productsTotal: number;
    categoriesCreated: number;
    genresCreated: number;
    platformsCreated: number;
    errors: number;
    startedAt: string | null;
    estimatedCompletion: string | null;
  };
}
```

## Error Handling

All endpoints follow existing error handling patterns:

**Success Response**:
```typescript
{
  success: true;
  data: T;
}
```

**Error Response**:
```typescript
{
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
}
```

**Error Codes**:
- `G2A_AUTH_FAILED`: Authentication failed
- `G2A_API_ERROR`: G2A API returned error
- `G2A_RATE_LIMIT`: Rate limit exceeded
- `G2A_TIMEOUT`: Request timeout
- `SYNC_IN_PROGRESS`: Sync operation already in progress
- `INVALID_CATEGORY`: Invalid category name
- `DATABASE_ERROR`: Database operation failed

## Rate Limiting

- Maintain 200ms delay between page requests
- Implement retry logic with exponential backoff for rate limit errors
- Use `Retry-After` header when provided
- Log rate limit warnings when approaching limits

## Performance Considerations

- Batch database operations where possible
- Use transactions for atomic updates
- Index junction tables for fast lookups
- Cache category/genre/platform lookups during sync
