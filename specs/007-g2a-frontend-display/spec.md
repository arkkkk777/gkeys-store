# Feature Specification: G2A Frontend Data Display

**Feature Branch**: `007-g2a-frontend-display`  
**Created**: 2024-12-10  
**Status**: Draft  
**Input**: User description: "сделай так чтобы подтянулись данные с G2A через API и появились данные обо всех доступных играх, с картинками, описанием и так далее."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Display Real G2A Games on Homepage (Priority: P1)

Users must see real game data from G2A API on the homepage, including game images, titles, prices, descriptions, and availability status, replacing placeholder/mock data.

**Why this priority**: The homepage is the first impression for users. Real data from G2A API ensures users see actual available games with accurate pricing and availability, building trust and enabling purchases.

**Independent Test**: Can be tested independently by verifying homepage displays games from database (synced from G2A), shows real images, prices, and descriptions. Test by running G2A sync, then checking homepage renders real data instead of placeholders.

**Acceptance Scenarios**:

1. **Given** G2A products are synced to database, **When** user visits homepage, **Then** homepage displays real games with images, titles, prices, and descriptions from G2A
2. **Given** game has G2A image URL, **When** homepage renders game card, **Then** actual game cover art is displayed instead of placeholder
3. **Given** game price is synced from G2A, **When** homepage displays game, **Then** price shown includes 2% markup and matches database value
4. **Given** game is out of stock on G2A, **When** homepage displays game, **Then** game is marked as unavailable or hidden from available games list

---

### User Story 2 - Display G2A Games in Catalog with Full Details (Priority: P1)

Users must be able to browse all available G2A games in the catalog page with complete information including images, descriptions, prices, genres, platforms, and availability.

**Why this priority**: Catalog page is the primary browsing interface. Users need to see all available games with complete information to make purchase decisions.

**Independent Test**: Can be tested independently by verifying catalog page fetches games from backend API, displays all game details correctly, and shows images from G2A. Test by navigating to catalog and verifying games have real data.

**Acceptance Scenarios**:

1. **Given** G2A games are in database, **When** user visits catalog page, **Then** all games are displayed with images, titles, prices, and descriptions
2. **Given** game has multiple images from G2A, **When** viewing game details, **Then** all images are available for viewing (gallery)
3. **Given** game has genre/platform information from G2A, **When** filtering catalog, **Then** filters work correctly based on G2A data
4. **Given** game description is synced from G2A, **When** viewing game card or details, **Then** full description is displayed

---

### User Story 3 - Game Detail Page with Complete G2A Information (Priority: P1)

Users must see complete game information on detail page including all images, full description, pricing, availability, platform, region, and activation service from G2A data.

**Why this priority**: Game detail page is where users make final purchase decisions. Complete and accurate information is essential for conversion.

**Independent Test**: Can be tested independently by navigating to a game detail page and verifying all G2A-synced data is displayed correctly including images, description, price, and availability.

**Acceptance Scenarios**:

1. **Given** user clicks on a game, **When** game detail page loads, **Then** all G2A data is displayed: images, description, price, platform, region, activation service
2. **Given** game has multiple images from G2A, **When** viewing game detail page, **Then** image gallery displays all available images
3. **Given** game price is updated via G2A sync, **When** user views game detail page, **Then** current price with markup is displayed
4. **Given** game stock status changes on G2A, **When** user views game detail page, **Then** availability status reflects current stock

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Frontend MUST fetch games from backend API (`/api/games`) which returns G2A-synced data
- **FR-002**: Frontend MUST display game images from G2A API URLs (not placeholders)
- **FR-003**: Frontend MUST show game descriptions synced from G2A API
- **FR-004**: Frontend MUST display prices with 2% markup applied (from backend)
- **FR-005**: Frontend MUST show availability status based on G2A stock information
- **FR-006**: Frontend MUST display game genres, platforms, and tags from G2A data
- **FR-007**: Frontend MUST handle missing images gracefully with fallback placeholder
- **FR-008**: Frontend MUST show loading states while fetching G2A data
- **FR-009**: Frontend MUST handle errors when G2A data is unavailable
- **FR-010**: Frontend MUST display all game metadata (publisher, developer, release date) from G2A

### Key Entities *(include if feature involves data)*

- **Game Display Data**: Frontend representation of game with all G2A-synced fields
- **Game Image**: Image URLs from G2A API, displayed in game cards and detail pages
- **Game Metadata**: Additional information (publisher, developer, genres, platforms) from G2A

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of displayed games show real images from G2A (no placeholders for synced games)
- **SC-002**: 100% of displayed games show descriptions from G2A API
- **SC-003**: 100% of displayed prices match backend values (with 2% markup)
- **SC-004**: Availability status accurately reflects G2A stock for 100% of games
- **SC-005**: All game metadata (genres, platforms, publisher) is displayed correctly
- **SC-006**: Homepage loads and displays G2A games within 2 seconds
- **SC-007**: Catalog page displays all available G2A games with pagination
- **SC-008**: Game detail pages show complete G2A information

## Non-Functional Requirements

### Performance
- Homepage must load and display games within 2 seconds
- Game images must load with lazy loading
- Catalog pagination must work smoothly with G2A data
- Image loading failures must not block page rendering

### User Experience
- Missing images must show appropriate placeholder
- Loading states must be shown while fetching data
- Error states must be user-friendly when G2A data unavailable
- All interactive elements must work with real G2A data

## Assumptions

- Backend G2A integration (006-g2a-integration) is complete and working
- G2A sync job is running and populating database
- Backend API endpoints return G2A-synced data correctly
- Game images from G2A are accessible via provided URLs
- Frontend can handle G2A data format from backend API

## Dependencies

- Backend G2A integration (specs/006-g2a-integration) - MUST be complete
- Backend API endpoints (`/api/games`, `/api/games/:id`, etc.) returning G2A data
- Database with G2A-synced games
- Frontend components (GameCard, GameSection, HeroSection) already exist

## Out of Scope

- G2A API integration itself (handled in 006-g2a-integration)
- Backend sync logic (already implemented)
- Creating new UI components (using existing components)
- Payment processing (handled separately)
- User authentication (handled separately)
