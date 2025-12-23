# Data Model: G2A Integration

## Entities

### G2AAuthToken
- access_token: string
- expires_in: number (seconds)
- issued_at: datetime
- token_type: string

### G2AProduct
- id: string
- title: string
- price: { amount: number; currency: string }
- stock: number
- region: string
- platform: string
- attributes: object (age rating, drm, etc.)

### G2AOrder
- id: string
- external_order_id: string (our id)
- items: [{ product_id: string; quantity: number; unit_price: number; currency: string }]
- amount: { total: number; currency: string }
- status: enum (pending, paid, failed, cancelled)
- created_at: datetime

### WebhookEvent
- event_id: string
- order_id: string
- type: string
- payload: json
- signature: string
- nonce: string
- timestamp: number
- processed_at: datetime

### IdempotencyRecord
- key: string (event_id or order_id + type)
- status: enum (processing, done, failed)
- attempts: number
- last_error: string | null
- updated_at: datetime

## Relations
- WebhookEvent references G2AOrder by order_id.
- IdempotencyRecord keyed by event/order; guards WebhookEvent processing.

## Validation Notes
- Price/amount fields must align currency across order and items.
- Timestamps checked against clock skew window.
- Stock/price responses validated for required fields; fallback defaults rejected.
