# G2A API Contracts (summary from PDF)

## Auth (POST /oauth/token)
Request: `client_id`, `client_secret`, `grant_type=client_credentials`
Response: `{ access_token, expires_in, token_type }`

## Product List / Query (GET /integration-api/v1/products)
- Params: search, page, pageSize, region, platform
- Response: array of products with id, name/title, price, stock, region, platform, etc.

## Price/Stock Check (GET /integration-api/v1/products/{id})
- Response: product detail, price { amount, currency }, stock, delivery, metadata

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
