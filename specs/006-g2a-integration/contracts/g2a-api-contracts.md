# G2A API Contracts

## Authentication

All G2A API requests require authentication via headers:

```
X-API-HASH: {G2A_API_HASH}
X-API-KEY: {G2A_API_KEY}
X-G2A-Timestamp: {unix_timestamp_seconds}
X-G2A-Hash: {sha256_hash}
```

**Hash Generation**:
```
hash = SHA256(G2A_API_HASH + G2A_API_KEY + timestamp)
```

## Endpoints

### 1. Get Product Catalog

**Endpoint**: `GET /products`

**Query Parameters**:
- `page` (number, optional): Page number (default: 1)
- `perPage` (number, optional): Items per page (default: 50, max: 100)

**Response**:
```typescript
{
  data: G2AProduct[];
  meta: {
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;
  };
}
```

**Error Responses**:
- `401 Unauthorized`: Invalid credentials
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: G2A API error

### 2. Get Single Product

**Endpoint**: `GET /products/:productId`

**Path Parameters**:
- `productId` (string): G2A product ID

**Response**:
```typescript
G2AProduct
```

**Error Responses**:
- `404 Not Found`: Product not found
- `401 Unauthorized`: Invalid credentials

### 3. Get Product Prices

**Endpoint**: `POST /products/prices`

**Request Body**:
```typescript
{
  productIds: string[];
}
```

**Response**:
```typescript
Array<{
  productId: string;
  price: number;
  currency: string;
}>
```

**Error Responses**:
- `400 Bad Request`: Invalid product IDs
- `401 Unauthorized`: Invalid credentials

### 4. Create Order (Purchase Keys)

**Endpoint**: `POST /orders`

**Request Body**:
```typescript
{
  productId: string;
  quantity: number; // default: 1
}
```

**Response**:
```typescript
{
  orderId: string;
  status: 'completed' | 'failed' | 'pending';
  keys: Array<{
    key: string;
    productId: string;
    orderId: string;
    purchaseDate: string; // ISO 8601
  }>;
  totalPrice: number;
  currency: string;
}
```

**Error Responses**:
- `400 Bad Request`: Invalid product ID or quantity
- `401 Unauthorized`: Invalid credentials
- `402 Payment Required`: Insufficient funds or product unavailable
- `500 Internal Server Error`: G2A API error

### 5. Check Product Stock

**Endpoint**: `GET /products/:productId/stock`

**Path Parameters**:
- `productId` (string): G2A product ID

**Response**:
```typescript
{
  productId: string;
  stock: number;
  available: boolean;
}
```

**Error Responses**:
- `404 Not Found`: Product not found
- `401 Unauthorized`: Invalid credentials

## Internal API Contracts

### Admin Endpoints

#### Manual G2A Sync

**Endpoint**: `POST /api/admin/g2a/sync`

**Authentication**: Admin JWT token required

**Request Body**:
```typescript
{
  fullSync?: boolean; // default: false (only sync changed products)
  productIds?: string[]; // optional: sync specific products
}
```

**Response**:
```typescript
{
  success: boolean;
  synced: number;
  updated: number;
  errors: Array<{
    productId: string;
    error: string;
  }>;
}
```

#### Get Sync Status

**Endpoint**: `GET /api/admin/g2a/status`

**Authentication**: Admin JWT token required

**Response**:
```typescript
{
  lastSync: string | null; // ISO 8601
  totalProducts: number;
  inStock: number;
  outOfStock: number;
  syncInProgress: boolean;
}
```

## Error Handling

All endpoints should handle errors consistently:

```typescript
{
  error: {
    code: string;
    message: string;
    details?: any;
  }
}
```

**Error Codes**:
- `G2A_AUTH_FAILED`: Authentication failed
- `G2A_PRODUCT_NOT_FOUND`: Product not found
- `G2A_OUT_OF_STOCK`: Product out of stock
- `G2A_API_ERROR`: G2A API returned error
- `G2A_RATE_LIMIT`: Rate limit exceeded
- `G2A_TIMEOUT`: Request timeout
