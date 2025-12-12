# Feature Specification: G2A API Integration

**Feature Branch**: `006-g2a-integration`  
**Created**: 2024-12-09  
**Status**: Draft  
**Input**: User description: "Подключи интеграцию G2A - Для последующей интеграции G2A можно пробовать вот эти тестовые доступы"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - G2A API Authentication and Connection (Priority: P1)

The system must successfully authenticate with G2A API using provided test credentials and establish a reliable connection for fetching product data, checking stock, and processing orders.

**Why this priority**: Authentication is the foundation for all G2A API operations. Without proper authentication, no G2A functionality can work.

**Independent Test**: Can be tested independently by verifying API authentication headers are correctly generated, test credentials are properly configured, and API connection test endpoint returns success.

**Acceptance Scenarios**:

1. **Given** G2A test credentials are configured, **When** the system attempts to authenticate, **Then** authentication headers are correctly generated with timestamp and hash
2. **Given** valid G2A credentials, **When** making an API request, **Then** the request succeeds with proper authentication
3. **Given** invalid G2A credentials, **When** making an API request, **Then** the system returns an appropriate error message
4. **Given** G2A API is unavailable, **When** making a request, **Then** the system handles the error gracefully with fallback behavior

---

### User Story 2 - Product Data Synchronization (Priority: P1)

The system must fetch product data from G2A API, transform it to match internal data model, and synchronize it with the local database while maintaining data consistency.

**Why this priority**: Product data synchronization is essential for displaying accurate game information, prices, and availability to users.

**Independent Test**: Can be tested independently by verifying products are fetched from G2A, transformed correctly, stored in database, and prices include markup.

**Acceptance Scenarios**:

1. **Given** G2A API returns product data, **When** synchronizing products, **Then** products are transformed and stored in the database with correct fields
2. **Given** product prices from G2A, **When** storing products, **Then** prices include 2% markup as configured
3. **Given** a product already exists in database, **When** synchronizing, **Then** existing product data is updated with latest G2A information
4. **Given** product stock information from G2A, **When** synchronizing, **Then** stock status is accurately reflected in the database

---

### User Story 3 - Real-time Stock and Price Updates (Priority: P2)

The system must periodically check G2A API for stock availability and price changes, updating the database to reflect current availability and pricing.

**Why this priority**: Real-time stock and price information ensures users see accurate availability and pricing, improving user trust and reducing order failures.

**Independent Test**: Can be tested independently by verifying scheduled jobs fetch stock/price data, update database records, and handle API errors gracefully.

**Acceptance Scenarios**:

1. **Given** a scheduled sync job runs, **When** checking product stock, **Then** database stock status is updated based on G2A API response
2. **Given** product prices change on G2A, **When** price sync runs, **Then** database prices are updated with new values including markup
3. **Given** a product goes out of stock on G2A, **When** stock check runs, **Then** the product is marked as unavailable in the database
4. **Given** API rate limits are reached, **When** sync job runs, **Then** the system handles rate limiting gracefully and retries appropriately

---

### User Story 4 - Order Processing and Key Delivery (Priority: P1)

The system must process orders through G2A API, purchase game keys, and deliver them to users while handling errors and maintaining order records.

**Why this priority**: Order processing is a core business function. Users must be able to purchase games and receive keys reliably.

**Independent Test**: Can be tested independently by verifying orders are created, G2A API purchase is called, keys are received and stored, and order status is updated.

**Acceptance Scenarios**:

1. **Given** a user places an order, **When** processing the order, **Then** G2A API purchase endpoint is called with correct product ID and quantity
2. **Given** G2A API returns game keys, **When** processing order, **Then** keys are stored securely and associated with the order
3. **Given** G2A API purchase fails, **When** processing order, **Then** order status is updated to failed and user is notified
4. **Given** an order is successfully processed, **When** delivering keys, **Then** user receives keys via email or order page

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST authenticate with G2A API using Client ID and API Key with proper hash generation
- **FR-002**: System MUST fetch product catalog from G2A API and transform to internal data model
- **FR-003**: System MUST apply 2% markup to all G2A prices before storing in database
- **FR-004**: System MUST synchronize product data (name, price, stock, images) from G2A to local database
- **FR-005**: System MUST check product stock availability via G2A API before allowing purchases
- **FR-006**: System MUST process orders through G2A API purchase endpoint
- **FR-007**: System MUST store purchased game keys securely and associate with orders
- **FR-008**: System MUST handle G2A API errors gracefully with appropriate fallback behavior
- **FR-009**: System MUST implement rate limiting and retry logic for G2A API calls
- **FR-010**: System MUST log all G2A API interactions for debugging and auditing
- **FR-011**: System MUST support scheduled synchronization jobs for product data updates
- **FR-012**: System MUST validate G2A API responses before processing
- **FR-013**: System MUST handle G2A API authentication token expiration and refresh
- **FR-014**: System MUST provide admin interface for manual G2A synchronization
- **FR-015**: System MUST support test mode using provided test credentials

### Key Entities *(include if feature involves data)*

- **G2A Product**: Product data from G2A API including ID, name, price, stock, platform, region
- **G2A Order**: Order information from G2A API including order ID, status, keys, total price
- **G2A Key**: Game activation key purchased from G2A, associated with order and product
- **G2A Sync Job**: Scheduled task that synchronizes product data from G2A API
- **G2A API Credentials**: Authentication credentials (Client ID, API Key) stored securely
- **Product Markup**: Configuration for price markup percentage applied to G2A prices

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: G2A API authentication succeeds 100% of the time with valid credentials
- **SC-002**: Product synchronization completes successfully for 95% of products
- **SC-003**: All G2A prices include 2% markup when stored in database
- **SC-004**: Stock availability is accurate within 5 minutes of G2A API updates
- **SC-005**: Order processing succeeds for 98% of valid orders
- **SC-006**: API error handling prevents system crashes in 100% of error scenarios
- **SC-007**: Scheduled sync jobs complete within 10 minutes for 1000 products
- **SC-008**: All G2A API calls are logged with request/response data for auditing

## Non-Functional Requirements

### Performance
- G2A API calls should complete within 5 seconds for single product requests
- Bulk product synchronization should handle 1000+ products within 10 minutes
- Order processing should complete within 30 seconds from order placement
- API rate limiting should be respected to prevent service disruption

### Security
- G2A API credentials must be stored in environment variables, never in code
- API keys must not be exposed in logs or error messages
- Game keys must be encrypted at rest in database
- All G2A API communications must use HTTPS

### Reliability
- System must handle G2A API downtime gracefully with fallback to cached data
- Failed API calls must be retried with exponential backoff
- Order processing must be idempotent to prevent duplicate purchases
- Data synchronization must be resumable if interrupted

## Assumptions

- G2A API test credentials are provided: Client ID `qdaiciDiyMaTjxMt`, API Key `74026b3dc2c6db6a30a73e71cdb138b1e1b5eb7a97ced46689e2d28db1050875`
- Existing G2A service implementation in `backend/src/services/g2a.service.ts` can be enhanced
- Database schema supports G2A product data and order information
- Existing admin interface can be extended for G2A synchronization controls
- G2A API documentation is available for reference
- Test environment allows API calls without production impact

## Dependencies

- Existing G2A service implementation (`backend/src/services/g2a.service.ts`)
- Database schema with Game and Order models
- Environment variable configuration system
- Scheduled job system (if exists) or need to implement
- Admin interface for manual synchronization
- Logging system for API interactions

## Out of Scope

- Creating new G2A service from scratch (enhancing existing implementation)
- Modifying G2A API itself
- Payment processing (handled separately)
- User-facing G2A branding or UI elements
- G2A affiliate program integration
- Multi-provider integration (focusing only on G2A)
