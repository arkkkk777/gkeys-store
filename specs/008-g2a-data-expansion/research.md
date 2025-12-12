# Research: G2A Data Expansion

## G2A API Category and Genre Support

### Decision: Extract Categories and Genres from Product Data

**Rationale**: 
Based on existing G2A service implementation, G2A API products endpoint accepts a `category` parameter (currently hardcoded to 'games'). Categories and genres appear to be embedded in product data rather than available via separate endpoints. The current implementation extracts genres from product tags and platforms from product platform fields.

**Current Implementation Analysis**:
- Products endpoint: `GET /products` with `category: 'games'` parameter
- Genre extraction: From `product.tags` array using mapping logic
- Platform extraction: From `product.platforms` array
- Category: Currently hardcoded to 'games' only

**Findings**:
1. **Category Parameter**: The API accepts `category` parameter, but only 'games' is currently used. Other possible values need investigation.
2. **Genre Extraction**: Genres are extracted from tags using a mapping table. This approach works but may miss genres not in the mapping.
3. **Platform Extraction**: Platforms are extracted from product.platforms array with normalization logic (Steam → PC, etc.)
4. **No Separate Endpoints**: No evidence of separate `/categories` or `/genres` endpoints in current implementation.

**Alternatives Considered**:
- Separate category/genre endpoints: Not available in G2A API (based on current implementation)
- Direct genre field: G2A products may have explicit genre field, but current code extracts from tags
- Category enumeration: Need to test if other category values work (e.g., 'dlc', 'software', 'hardware')

**Action Items**:
- Test G2A API with different category values to discover available categories
- Investigate if G2A product response includes explicit category/genre fields beyond tags
- Enhance genre extraction to handle more genre types
- Create proper category/genre entities in database and link them to games

## Large Catalog Synchronization Strategy

### Decision: Paginated Fetching with Rate Limiting and Error Recovery

**Rationale**: 
Current implementation already supports pagination (100 products per page) and includes rate limiting (200ms delay between requests). For large catalogs (1000+ products), we need to ensure efficient pagination, proper error handling, and progress tracking.

**Current Implementation**:
- Pagination: `fetchG2AProducts(page, perPage)` with max 100 per page
- Rate limiting: 200ms delay between page requests in sync loop
- Error handling: Continues to next page on error, logs errors
- Progress: Logs page numbers and product counts

**Findings**:
1. **Pagination Works**: Current pagination logic correctly handles `lastPage` from API response
2. **Rate Limiting**: 200ms delay is conservative and should prevent rate limit issues
3. **Error Recovery**: Current implementation stops on first page error - needs improvement
4. **Progress Tracking**: Basic logging exists but no structured progress reporting

**Improvements Needed**:
- Continue syncing remaining pages even if one page fails
- Add retry logic for failed pages (with exponential backoff)
- Implement progress tracking that can be queried (database or Redis)
- Add batch processing to avoid memory issues with very large catalogs

**Alternatives Considered**:
- Parallel requests: Risk of hitting rate limits, rejected
- Streaming API: Not available from G2A
- Webhook-based: Not available, polling required

## Category and Genre Database Integration

### Decision: Use Existing Many-to-Many Relationships

**Rationale**: 
Database schema already supports many-to-many relationships via `GameCategory`, `GameGenre`, and `GamePlatform` junction tables. We need to populate `Category`, `Genre`, and `Platform` tables from G2A data and link them to games.

**Current Schema**:
- `Category` table: id, name, slug
- `Genre` table: id, name, slug  
- `Platform` table: id, name, slug
- Junction tables: `GameCategory`, `GameGenre`, `GamePlatform`

**Findings**:
1. **Schema Ready**: Database already supports the relationships we need
2. **Missing Data**: Category, Genre, and Platform tables likely empty or have minimal data
3. **Linking Logic**: Current `transformG2AProductToGame` doesn't create category/genre/platform links
4. **Slug Generation**: Need consistent slug generation for categories/genres/platforms

**Implementation Strategy**:
1. Extract unique categories/genres/platforms from G2A products during sync
2. Create or update Category/Genre/Platform records in database
3. Link games to categories/genres/platforms via junction tables
4. Handle updates: If G2A category/genre changes, update relationships

**Alternatives Considered**:
- Single category/genre per game: Rejected - games can have multiple genres
- Denormalized fields: Rejected - many-to-many is more flexible
- External taxonomy: Considered but G2A data is source of truth

## Platform and Activation Service Extraction

### Decision: Enhanced Platform Extraction with Multiple Platform Support

**Rationale**: 
Current `extractPlatform` function returns a single platform string, but G2A products may support multiple platforms. Database schema supports multiple platforms per game via `GamePlatform` junction table.

**Current Implementation**:
- Returns single platform: `extractPlatform()` returns one string
- Normalization: Maps various platform strings to standard names (PC, PlayStation, Xbox, Nintendo)
- Activation service: Extracted from `product.platform` or `product.activationService`

**Findings**:
1. **Multiple Platforms**: G2A products may have multiple platforms in `platforms` array
2. **Normalization Needed**: Platform names vary (Steam, PSN, Xbox Live, etc.) and need normalization
3. **Activation Service**: Separate from platform (e.g., Steam key for PC platform)
4. **Database Support**: Schema supports multiple platforms per game

**Improvements Needed**:
- Extract all platforms from `product.platforms` array, not just first
- Create Platform records for each unique platform
- Link game to all applicable platforms
- Store activation service separately (already in Game model)

**Alternatives Considered**:
- Single platform per game: Rejected - games can be multi-platform
- Platform as string array: Rejected - normalized Platform entities are better for filtering

## Incremental vs Full Sync Strategy

### Decision: Support Both Incremental and Full Sync with Smart Updates

**Rationale**: 
Full sync is needed for initial catalog population and periodic complete updates. Incremental sync is more efficient for regular updates. Current implementation supports both via `fullSync` parameter.

**Current Implementation**:
- `fullSync` parameter: Controls whether to mark removed products as out of stock
- Update logic: Updates existing games, creates new ones
- No change detection: Always updates all products, doesn't detect what changed

**Findings**:
1. **Full Sync**: Works but processes all products even if unchanged
2. **Incremental Sync**: Currently same as full sync, just doesn't mark removed products
3. **Change Detection**: No logic to detect if product data actually changed
4. **Performance**: Full sync of 1000+ products takes significant time

**Improvements Needed**:
- Add change detection: Compare G2A data with database before updating
- Optimize updates: Only update fields that actually changed
- Track last sync timestamp: Use `g2aLastSync` to identify products needing update
- Incremental sync: Only sync products updated since last sync (if G2A API supports this)

**Alternatives Considered**:
- Always full sync: Too slow for large catalogs
- Webhook-based: Not available from G2A
- Hash-based change detection: Could compare data hashes to detect changes

## Rate Limiting and Performance Optimization

### Decision: Conservative Rate Limiting with Adaptive Delays

**Rationale**: 
Current 200ms delay between requests is conservative and safe. For large syncs, we can optimize while respecting API limits. Need to handle rate limit errors gracefully.

**Current Implementation**:
- Fixed delay: 200ms between page requests
- Timeout: 30 seconds per request
- Rate limit detection: Checks response headers for rate limit info
- Error handling: Logs rate limit errors but doesn't retry automatically

**Findings**:
1. **Rate Limit Headers**: Code checks for `x-ratelimit-remaining` and `x-ratelimit-reset` headers
2. **429 Handling**: Detects 429 status but doesn't implement retry-after logic
3. **Conservative Approach**: 200ms delay is safe but may be slower than necessary
4. **No Backoff**: No exponential backoff for retries

**Improvements Needed**:
- Implement retry-after logic: Use `Retry-After` header when rate limited
- Adaptive delays: Increase delay if rate limit warnings appear
- Exponential backoff: For retries after rate limit errors
- Batch optimization: Process multiple products per request if API supports it

**Alternatives Considered**:
- Aggressive rate limiting: Risk of getting blocked
- No rate limiting: Will definitely hit limits
- Queue-based: Overkill for current scale

## Data Quality and Validation

### Decision: Validate and Normalize G2A Data Before Storage

**Rationale**: 
G2A API may return incomplete or inconsistent data. We need validation and normalization to ensure data quality in our database.

**Current Implementation**:
- Basic validation: Checks for required fields
- Default values: Provides defaults for missing data (e.g., 'PC' for platform, 'Action' for genre)
- Slug generation: Creates URL-friendly slugs from names

**Findings**:
1. **Missing Data**: Some products may lack genre, platform, or description
2. **Inconsistent Formats**: Platform names vary, need normalization
3. **Data Quality**: No validation of price, stock, or other critical fields
4. **Duplicate Detection**: No logic to detect duplicate products

**Improvements Needed**:
- Validate required fields: Ensure title, price, and other critical fields exist
- Normalize data: Consistent format for platforms, genres, regions
- Handle missing data: Better defaults or skip products with critical missing data
- Duplicate detection: Check for existing products by G2A product ID before creating

**Alternatives Considered**:
- Accept all data: Risk of poor data quality
- Strict validation: May reject valid products with minor data issues
- Manual review: Too slow for automated sync

## Summary of Key Decisions

1. **Categories/Genres**: Extract from product data, create entities in database, link via junction tables
2. **Multiple Platforms**: Extract all platforms from product, normalize names, link all to game
3. **Sync Strategy**: Support both incremental and full sync, add change detection for efficiency
4. **Rate Limiting**: Maintain conservative approach, add retry logic and adaptive delays
5. **Data Quality**: Validate and normalize data before storage, handle missing data gracefully
6. **Error Recovery**: Continue syncing on errors, retry failed pages, track errors for review

## Open Questions

1. **G2A API Categories**: What category values are available besides 'games'? (Need to test)
2. **Genre Field**: Does G2A API provide explicit genre field, or only tags? (Current code uses tags)
3. **Change Detection**: Does G2A API support filtering by last updated date for incremental sync?
4. **Rate Limits**: What are the actual rate limits? (Headers may provide this)
5. **Batch Operations**: Can we fetch multiple products in one request? (Currently one product per request for details)
