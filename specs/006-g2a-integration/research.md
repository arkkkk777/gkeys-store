# Research: G2A API Integration

## Authentication Method

### Decision: Hash-based Authentication with Timestamp

**Rationale**: 
The existing G2A service implementation uses a hash-based authentication system that generates a SHA-256 hash from API_HASH + API_KEY + timestamp. This method provides secure, time-limited authentication without requiring token storage or refresh.

**Current Implementation**:
```typescript
const timestamp = Math.floor(Date.now() / 1000).toString();
const hash = crypto
  .createHash('sha256')
  .update(G2A_API_HASH + G2A_API_KEY + timestamp)
  .digest('hex');
```

**Headers Used**:
- `X-API-HASH`: G2A_API_HASH (from environment)
- `X-API-KEY`: G2A_API_KEY (from environment)
- `X-G2A-Timestamp`: Unix timestamp in seconds
- `X-G2A-Hash`: SHA-256 hash of (HASH + KEY + timestamp)

**Test Credentials Mapping**:
- User provided: "Test Client Id: qdaiciDiyMaTjxMt"
- User provided: "Test Api Key: 74026b3dc2c6db6a30a73e71cdb138b1e1b5eb7a97ced46689e2d28db1050875"
- **NEEDS CLARIFICATION**: Which credential maps to G2A_API_HASH and which to G2A_API_KEY?
- **NEEDS CLARIFICATION**: Is the API Key the hash itself, or do we need to generate a hash from it?

**Alternatives Considered**:
- OAuth2 token-based auth: Rejected - existing implementation uses hash-based auth
- API key only: Rejected - G2A API requires hash-based authentication for security
- Session-based auth: Rejected - stateless hash-based auth is more suitable for API integration

## API Endpoint Structure

### Decision: RESTful API with Base URL Configuration

**Rationale**: 
G2A API follows RESTful conventions with a base URL that can be configured via environment variable. Default endpoint is `https://www.g2a.com/integration-api/v1`.

**Current Implementation**:
- Base URL: `process.env.G2A_API_URL || 'https://www.g2a.com/integration-api/v1'`
- Products endpoint: `/products` (GET for list, GET `/products/:id` for single)
- Orders endpoint: `/orders` (POST to create order)
- Prices endpoint: `/products/prices` (POST with productIds array)

**Endpoints Used**:
1. `GET /products` - Fetch product catalog
2. `GET /products/:id` - Get single product details
3. `POST /products/prices` - Get prices for multiple products
4. `POST /orders` - Create order and purchase keys

**Alternatives Considered**:
- GraphQL API: Not available from G2A
- Webhook-based: Rejected - polling/sync approach is more reliable for initial implementation

## Error Handling Strategy

### Decision: Graceful Degradation with Fallback to Mock Data

**Rationale**: 
The existing implementation uses fallback to mock data when G2A API is unavailable or returns errors. This ensures the system continues to function during API outages, though with limited functionality.

**Current Error Handling**:
- API errors log to console but don't crash the system
- Mock data generation for testing/fallback scenarios
- Try-catch blocks around all API calls
- Fallback prices and stock status when API fails

**Error Scenarios Handled**:
1. Missing API credentials → Use mock data
2. API timeout → Fallback to mock data
3. API authentication failure → Log error, fallback to mock
4. Invalid product ID → Return error, don't crash
5. Out of stock → Update database, mark as unavailable

**Improvements Needed**:
- Structured error logging (not just console.log)
- Retry logic with exponential backoff
- Rate limiting detection and handling
- Error notification system for admin

**Alternatives Considered**:
- Fail-fast approach: Rejected - would cause system downtime during API issues
- Queue-based retry: Considered but deferred - current approach sufficient for MVP

## Data Synchronization Strategy

### Decision: Scheduled Cron Jobs with Manual Trigger Option

**Rationale**: 
Product data needs to be synchronized periodically to ensure prices and stock are current. Scheduled jobs run automatically, with admin interface allowing manual triggers for immediate updates.

**Current Implementation**:
- Catalog sync: 2 times per day (2 AM and 2 PM) via `node-cron`
- Stock check: Every 15 minutes for in-stock games
- Manual sync: Available via admin controller endpoint

**Sync Frequency**:
- Full catalog sync: 2x daily (sufficient for price/description updates)
- Stock check: Every 15 minutes (critical for availability)
- Price updates: Included in catalog sync

**Data Transformation**:
- G2A product → Internal Game model mapping
- Price markup: 2% applied to all G2A prices
- Slug generation: URL-friendly slugs from product names
- Platform extraction: Parse platform from G2A data

**Alternatives Considered**:
- Real-time webhooks: Not available from G2A API
- Event-driven sync: Overkill for current scale
- Continuous polling: Too resource-intensive

## Order Processing Flow

### Decision: Synchronous Order Processing with Async Key Delivery

**Rationale**: 
Orders should be processed immediately when placed, but key delivery can be asynchronous. This provides immediate feedback to users while allowing time for G2A API processing.

**Current Flow**:
1. User places order
2. System calls G2A API `/orders` endpoint
3. G2A returns game keys
4. Keys stored in database, associated with order
5. Order status updated to "completed"
6. Keys delivered to user (email or order page)

**Error Handling in Orders**:
- API failure → Order status "failed", user notified
- Partial key delivery → Handle gracefully (all or nothing approach)
- Invalid product ID → Validate before order placement

**Alternatives Considered**:
- Queue-based processing: Considered but synchronous is simpler for MVP
- Pre-purchased key pool: Too complex, requires inventory management

## Rate Limiting and Performance

### Decision: Respect API Rate Limits with Request Batching

**Rationale**: 
G2A API has rate limits that must be respected. Bulk operations should batch requests to stay within limits while maintaining reasonable performance.

**Current Approach**:
- Single product requests: Immediate
- Bulk operations: Sequential with delays if needed
- Timeout: 30 seconds per request

**Rate Limiting Strategy**:
- **NEEDS CLARIFICATION**: What are G2A API rate limits?
- Implement request queuing if limits are known
- Add delays between bulk requests if needed
- Monitor API response headers for rate limit info

**Performance Targets**:
- Single product fetch: < 5 seconds
- Bulk sync (1000 products): < 10 minutes
- Order processing: < 30 seconds

**Alternatives Considered**:
- Parallel requests: Risk of hitting rate limits
- Caching: Already implemented via Redis/database

## Security Considerations

### Decision: Environment Variables for Credentials, Encryption for Keys

**Rationale**: 
API credentials must never be committed to code. Game keys are sensitive data that should be encrypted at rest.

**Current Security Measures**:
- Credentials in environment variables (G2A_API_HASH, G2A_API_KEY)
- HTTPS for all API communications
- No credentials in logs or error messages

**Improvements Needed**:
- **NEEDS CLARIFICATION**: Should game keys be encrypted in database?
- Credential validation on startup
- Secure credential rotation process
- Audit logging for API access

**Alternatives Considered**:
- Secrets management service: Overkill for current scale
- Encrypted config files: Environment variables are simpler

## Testing Strategy

### Decision: Unit Tests with Mocked API Calls, Integration Tests with Test Credentials

**Rationale**: 
Unit tests should not make real API calls. Integration tests can use test credentials to verify actual API integration works correctly.

**Current Test Coverage**:
- Unit tests for `applyMarkup` function
- Mocked Prisma client
- **NEEDS IMPROVEMENT**: More comprehensive test coverage

**Test Credentials Usage**:
- Test Client ID: `qdaiciDiyMaTjxMt`
- Test API Key: `74026b3dc2c6db6a30a73e71cdb138b1e1b5eb7a97ced46689e2d28db1050875`
- Use in integration tests only
- Never commit to repository

**Alternatives Considered**:
- Mock API server: Too complex for current needs
- Contract testing: Considered but unit + integration sufficient

## Open Questions Requiring Clarification

1. **Credential Mapping**: How do the provided test credentials (Client Id and Api Key) map to G2A_API_HASH and G2A_API_KEY environment variables?

2. **API Rate Limits**: What are the actual rate limits for G2A API? (requests per minute/hour)

3. **Key Encryption**: Should purchased game keys be encrypted when stored in the database?

4. **API Documentation**: Is official G2A API documentation available for reference? (endpoint details, response formats, error codes)

5. **Test Environment**: Are the provided test credentials for a sandbox/test environment, or production?

6. **Hash Generation**: Is the existing hash generation method (SHA-256 of HASH + KEY + timestamp) correct for the current G2A API version?
