# Data Model: G2A Integration

## Entities

### G2A Product (External - G2A API)
Represents product data from G2A API before transformation to internal Game model.

**Fields**:
- `id` (string): G2A product ID
- `name` (string): Product name
- `slug` (string): URL-friendly identifier
- `price` (number): Base price from G2A (before markup)
- `originalPrice` (number): Original price if on sale
- `currency` (string): Currency code (EUR, USD, etc.)
- `stock` (number): Available quantity
- `platform` (string[]): Supported platforms (PC, PlayStation, Xbox, etc.)
- `region` (string): Region code
- `activationService` (string): Service name (Steam, Uplay, etc.)
- `description` (string): Product description
- `images` (string[]): Product image URLs
- `genre` (string, optional): Game genre
- `publisher` (string, optional): Publisher name
- `developer` (string, optional): Developer name
- `releaseDate` (string, optional): Release date ISO string
- `tags` (string[], optional): Product tags

**Relationships**:
- Transformed to internal `Game` entity
- One G2A product → One Game (via `g2aProductId`)

### Game (Internal - Enhanced)
Internal game entity with G2A integration fields.

**Existing Fields** (from Prisma schema):
- `id`, `title`, `slug`, `description`, `price`, `originalPrice`, `discount`, `currency`
- `image`, `images`, `inStock`, `releaseDate`, etc.

**G2A-Specific Fields**:
- `g2aProductId` (string?, optional): G2A product ID for synchronization
- `g2aStock` (boolean, default: false): Stock status from G2A API
- `g2aLastSync` (DateTime?, optional): Last synchronization timestamp

**Validation Rules**:
- `g2aProductId` must be unique if provided
- `g2aLastSync` updated on every sync operation
- `g2aStock` must match actual G2A API stock status

**State Transitions**:
- New product from G2A → Create Game with `g2aProductId`
- Existing product update → Update Game fields, set `g2aLastSync`
- Stock change → Update `g2aStock` and `inStock`

### G2A Order (External - G2A API Response)
Represents order response from G2A API after purchase.

**Fields**:
- `orderId` (string): G2A order ID
- `status` (string): Order status (completed, failed, pending)
- `keys` (G2AKeyResponse[]): Array of purchased keys
- `totalPrice` (number): Total order price
- `currency` (string): Currency code

**Relationships**:
- Maps to internal `Order` entity
- Keys stored in `GameKey` entities

### GameKey (Internal - Enhanced)
Game activation key purchased from G2A.

**Existing Fields** (from Prisma schema):
- `id`, `gameId`, `key`, `orderId`, `activated`, `activationDate`, `createdAt`

**G2A-Specific Considerations**:
- `key`: Encrypted or plain text? (NEEDS CLARIFICATION)
- `orderId`: Links to internal Order, which may reference G2A order

**Validation Rules**:
- `key` must be unique
- `key` format validation (alphanumeric, typical length)
- `orderId` must reference valid Order

### Order (Internal - Enhanced)
Internal order entity with G2A processing.

**Existing Fields** (from Prisma schema):
- `id`, `userId`, `status`, `subtotal`, `discount`, `total`, `paymentMethod`, `paymentStatus`
- `createdAt`, `completedAt`

**G2A Processing Flow**:
1. Order created with status `PENDING`
2. G2A API called → status `PROCESSING`
3. Keys received → status `COMPLETED`, `completedAt` set
4. API failure → status `FAILED`

**State Transitions**:
- `PENDING` → `PROCESSING` (G2A API call initiated)
- `PROCESSING` → `COMPLETED` (Keys received and stored)
- `PROCESSING` → `FAILED` (API error or invalid response)

## Data Transformations

### G2A Product → Game
```typescript
{
  g2aProductId: g2aProduct.id,
  title: g2aProduct.name,
  slug: generateSlug(g2aProduct.name),
  price: applyMarkup(g2aProduct.price), // 2% markup
  originalPrice: g2aProduct.originalPrice ? applyMarkup(g2aProduct.originalPrice) : null,
  currency: g2aProduct.currency,
  image: g2aProduct.images[0],
  images: g2aProduct.images,
  inStock: g2aProduct.stock > 0,
  g2aStock: g2aProduct.stock > 0,
  g2aLastSync: new Date(),
  activationService: g2aProduct.activationService,
  region: g2aProduct.region,
  publisher: g2aProduct.publisher,
  releaseDate: g2aProduct.releaseDate ? new Date(g2aProduct.releaseDate) : new Date(),
  // ... map other fields
}
```

### G2A Order → Internal Order + GameKeys
```typescript
// Update Order
{
  status: g2aOrder.status === 'completed' ? 'COMPLETED' : 'FAILED',
  completedAt: g2aOrder.status === 'completed' ? new Date() : null,
}

// Create GameKeys
g2aOrder.keys.map(key => ({
  gameId: orderItem.gameId,
  key: key.key,
  orderId: order.id,
  activated: false,
}))
```

## Relationships

```
G2A Product (External)
    ↓ (sync)
Game (Internal)
    ↓ (purchase)
Order (Internal)
    ↓ (contains)
GameKey (Internal)
```

## Data Consistency Rules

1. **Price Consistency**: Internal price = G2A price + 2% markup (always)
2. **Stock Consistency**: `inStock` and `g2aStock` should match after sync
3. **Sync Timestamps**: `g2aLastSync` updated on every successful sync
4. **Key Uniqueness**: Game keys must be unique across all orders
5. **Order-Key Relationship**: Every completed order must have corresponding GameKeys

## Indexes and Performance

**Existing Indexes** (from Prisma schema):
- `Game.g2aProductId` - For G2A product lookups
- `GameKey.orderId` - For order-key relationships
- `Order.status` - For order status queries

**Additional Considerations**:
- Index on `Game.g2aLastSync` for sync job queries (games needing sync)
- Composite index on `(Game.g2aProductId, Game.g2aLastSync)` for efficient sync operations
