# Frontend API Contracts: G2A Data Display

## Backend API Endpoints Used

Frontend uses existing backend API endpoints. No new endpoints needed.

### Get Games (Paginated)

**Endpoint**: `GET /api/games`

**Query Parameters**:
- `page` (number, optional): Page number
- `pageSize` (number, optional): Items per page
- `search` (string, optional): Search query
- `genres` (string[], optional): Filter by genres
- `platforms` (string[], optional): Filter by platforms
- `inStockOnly` (boolean, optional): Only in-stock games
- `sort` (string, optional): Sort order (popular, newest, price-asc, price-desc)

**Response**:
```typescript
{
  success: true,
  data: {
    data: Game[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }
}
```

**Game Object** (from backend):
```typescript
{
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;              // With 2% markup
  originalPrice?: number;     // With markup
  discount?: number;
  currency: string;
  image: string;              // G2A image URL
  images: string[];           // All G2A image URLs
  inStock: boolean;           // From G2A stock check
  releaseDate: string;        // ISO date
  platforms: string[];
  genres: string[];
  tags: string[];
  publisher?: string;
  developer?: string;
  activationService?: string;
  region?: string;
  isBestSeller: boolean;
  isNew: boolean;
  isPreorder: boolean;
}
```

### Get Game by ID

**Endpoint**: `GET /api/games/:id`

**Response**:
```typescript
{
  success: true,
  data: Game
}
```

### Get Game by Slug

**Endpoint**: `GET /api/games/slug/:slug`

**Response**:
```typescript
{
  success: true,
  data: Game
}
```

### Get Best Sellers

**Endpoint**: `GET /api/games/best-sellers`

**Query Parameters**:
- `genre` (string, optional): Filter by genre

**Response**:
```typescript
{
  success: true,
  data: Game[]
}
```

### Get New in Catalog

**Endpoint**: `GET /api/games/new-in-catalog`

**Response**:
```typescript
{
  success: true,
  data: Game[]
}
```

### Get Preorders

**Endpoint**: `GET /api/games/preorders`

**Response**:
```typescript
{
  success: true,
  data: Game[]
}
```

## Error Responses

All endpoints return errors in format:

```typescript
{
  success: false,
  error: {
    message: string;
    code?: string;
  }
}
```

**HTTP Status Codes**:
- `200`: Success
- `400`: Bad Request (invalid parameters)
- `404`: Not Found (game doesn't exist)
- `500`: Internal Server Error

## Data Requirements

### Required Fields for Display

- **Homepage**: `title`, `image`, `price`, `originalPrice`, `discount`, `inStock`, `slug`
- **Catalog**: All fields above + `genres`, `platforms`, `description`
- **Detail Page**: All fields + `images[]`, `publisher`, `developer`, `releaseDate`, `activationService`, `region`

### Image URL Format

- G2A provides URLs like: `https://images.g2a.com/...`
- URLs should be accessible (no authentication required)
- If image fails to load, frontend shows placeholder

### Price Format

- Prices are numbers (not strings)
- Currency code in separate `currency` field
- Display format: `{price}{currency}` (e.g., "29€")
- Original price shown with strikethrough if discount exists

## Loading States

### Request States

- **Loading**: Show skeleton/spinner
- **Success**: Display data
- **Error**: Show error message
- **Empty**: Show "No games available" message

## Caching Strategy

- Frontend doesn't cache G2A data (backend handles caching)
- React Query or similar can be used for request deduplication
- Images are cached by browser automatically
