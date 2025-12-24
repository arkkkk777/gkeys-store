# G2A API Contracts

## Authentication

G2A Integration API uses **hash-based authentication** with timestamp, not OAuth2. Each request requires specific headers for authentication.

### Hash-based Authentication (Current Implementation)

**Method**: Hash-based authentication with SHA-256 hash generation

**Headers Required**:
- `X-API-HASH`: G2A_API_HASH (from environment variable)
- `X-API-KEY`: G2A_API_KEY (from environment variable)
- `X-G2A-Timestamp`: Unix timestamp in seconds (current time)
- `X-G2A-Hash`: SHA-256 hash of (G2A_API_HASH + G2A_API_KEY + timestamp)

**Hash Generation**:
```
timestamp = Math.floor(Date.now() / 1000).toString()
hash = SHA256(G2A_API_HASH + G2A_API_KEY + timestamp)
```

**Sandbox Authentication** (simplified):
- For sandbox API (`sandboxapi.g2a.com`), uses simple Authorization header:
  - `Authorization: "{G2A_API_HASH}, {G2A_API_KEY}"`

**Environment Variables**:
- `G2A_API_HASH` (or `G2A_API_SECRET` for backward compatibility)
- `G2A_API_KEY`
- `G2A_API_URL` (base URL, auto-normalized to include `/integration-api/v1`)

**Note**: OAuth2 token-based authentication (`POST /oauth/token`) is mentioned in some documentation but is **not used** in the current G2A Integration API implementation. The hash-based method is the correct approach for Integration API.

## Product List / Query (GET /integration-api/v1/products)
- Params: search, page, pageSize, region, platform
- Response: array of products with id, name/title, price, stock, region, platform, etc.

## Price/Stock Check (GET /integration-api/v1/products/{id})
- Response: product detail, price { amount, currency }, stock, delivery, metadata
- **Note**: Stock information is included in the main product endpoint response. There is no separate `/products/{id}/stock` endpoint (returns 404).
- **Note**: There is no batch price endpoint `POST /products/prices` (returns 404). Use individual `GET /products/{id}` requests for each product.

## Order Create (POST /integration-api/v1/orders)
- Body: { items: [{product_id, qty}], currency, customer info optional, callback URLs }
- Response: { order_id, status, amount, currency, created_at }

## Webhook / Callback
Headers: signature, timestamp, nonce (names per PDF), content-type JSON.
Payload: { order_id, status, amount, currency, items, event_type }
Validation: verify signature over payload + timestamp/nonce; reject stale timestamp.

## Error Model
- HTTP codes: 4xx validation/auth; 429 rate limit; 5xx server.
- Include error code/message; map to internal error taxonomy.

## Internal Models (mirror)
- G2AProduct, G2AOrder, WebhookEvent, IdempotencyRecord.

> For full field list, consult the PDF; this contract captures required fields for typing and validation.
