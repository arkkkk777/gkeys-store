# Data Model: G2A Data Expansion

## Overview

This feature expands G2A integration to properly extract, store, and link categories, genres, and platforms from G2A API products. The database schema already supports these relationships via many-to-many junction tables. This document defines how G2A product data maps to our database entities and how relationships are established.

## Entities

### Game (Existing - Enhanced)

**Purpose**: Represents a game product from G2A API.

**Key Fields** (from existing schema):
- `id`: UUID primary key
- `title`: Game title from G2A
- `slug`: URL-friendly identifier
- `g2aProductId`: G2A product ID (for linking)
- `g2aLastSync`: Timestamp of last G2A sync
- `price`, `originalPrice`, `discount`: Pricing with markup
- `inStock`, `g2aStock`: Availability status
- `images`: Array of image URLs from G2A
- `description`, `shortDescription`: Game descriptions
- `activationService`, `region`: Activation details
- `publisher`, `developer`: Publisher/developer info

**Relationships**:
- Many-to-many with `Category` via `GameCategory`
- Many-to-many with `Genre` via `GameGenre`
- Many-to-many with `Platform` via `GamePlatform`
- Many-to-many with `Tag` via `GameTag`

**Changes for This Feature**:
- Ensure `g2aProductId` is properly set for all synced games
- Update `g2aLastSync` on every sync
- Link to categories, genres, and platforms via junction tables

### Category (Existing - To Be Populated)

**Purpose**: Represents G2A product categories (e.g., "Games", "DLC", "Software").

**Schema**:
```prisma
model Category {
  id    String @id @default(uuid())
  name  String @unique
  slug  String @unique
  games GameCategory[]
}
```

**Data Source**: 
- Extract from G2A API `category` parameter or product data
- Currently only 'games' category is used
- Need to discover other available categories

**Population Strategy**:
1. During sync, collect unique category values from G2A products
2. Create Category records for new categories
3. Link games to categories via `GameCategory` junction table

**Validation Rules**:
- Name must be unique
- Slug generated from name (lowercase, hyphenated)
- Both name and slug required

### Genre (Existing - To Be Populated)

**Purpose**: Represents game genres (e.g., "Action", "RPG", "Strategy").

**Schema**:
```prisma
model Genre {
  id    String @id @default(uuid())
  name  String @unique
  slug  String @unique
  games GameGenre[]
}
```

**Data Source**: 
- Extract from G2A product `tags` array (current approach)
- May also be in explicit `genre` field if G2A provides it
- Normalize genre names using mapping table

**Population Strategy**:
1. Extract genres from each G2A product's tags or genre field
2. Normalize genre names (e.g., "action", "Action", "ACTION" → "Action")
3. Create Genre records for new genres
4. Link games to all applicable genres via `GameGenre` junction table

**Genre Mapping** (from existing code):
- 'action' → 'Action'
- 'adventure' → 'Adventure'
- 'rpg' → 'RPG'
- 'shooter' → 'Shooter'
- 'strategy' → 'Strategy'
- 'simulation' → 'Simulation'
- 'sports' → 'Sports'
- 'racing' → 'Racing'
- 'puzzle' → 'Puzzle'
- 'horror' → 'Horror'
- 'indie' → 'Indie'
- 'mmo' → 'MMO'
- 'multiplayer' → 'Multiplayer'

**Validation Rules**:
- Name must be unique
- Slug generated from name
- Games can have multiple genres

### Platform (Existing - To Be Populated)

**Purpose**: Represents gaming platforms (e.g., "PC", "PlayStation", "Xbox").

**Schema**:
```prisma
model Platform {
  id    String @id @default(uuid())
  name  String @unique
  slug  String @unique
  games GamePlatform[]
}
```

**Data Source**: 
- Extract from G2A product `platforms` array
- Normalize platform names (Steam → PC, PSN → PlayStation, etc.)

**Population Strategy**:
1. Extract all platforms from each G2A product's `platforms` array
2. Normalize platform names using mapping logic
3. Create Platform records for new platforms
4. Link games to all applicable platforms via `GamePlatform` junction table

**Platform Normalization** (from existing code):
- 'steam' → 'PC'
- 'playstation', 'psn' → 'PlayStation'
- 'xbox', 'xbox live' → 'Xbox'
- 'nintendo', 'switch' → 'Nintendo'
- 'origin', 'ea', 'uplay', 'ubisoft', 'gog', 'epic' → 'PC'

**Validation Rules**:
- Name must be unique
- Slug generated from name
- Games can have multiple platforms

## Data Transformation Flow

### G2A Product → Game Transformation

**Input**: G2A API product response
**Output**: Game record with linked categories, genres, platforms

**Steps**:
1. **Extract Basic Game Data**:
   - Map G2A product fields to Game model
   - Apply 2% markup to prices
   - Generate slug from title
   - Set `g2aProductId` and `g2aLastSync`

2. **Extract and Create Categories**:
   - Get category from G2A product (or default to 'Games')
   - Find or create Category record
   - Create `GameCategory` link

3. **Extract and Create Genres**:
   - Extract genres from product tags or genre field
   - Normalize genre names using mapping
   - For each genre: find or create Genre record
   - Create `GameGenre` links for all genres

4. **Extract and Create Platforms**:
   - Extract all platforms from product.platforms array
   - Normalize platform names
   - For each platform: find or create Platform record
   - Create `GamePlatform` links for all platforms

5. **Store Game**:
   - Upsert Game record (create if new, update if exists)
   - Ensure all relationships are created/updated

### Sync Process

**Full Sync**:
1. Fetch all products from G2A API (paginated)
2. For each product:
   - Transform to Game data
   - Extract categories, genres, platforms
   - Create/update Category, Genre, Platform records
   - Create/update Game record
   - Create/update junction table links
3. Mark products not in G2A as out of stock (if fullSync=true)

**Incremental Sync**:
1. Fetch products updated since last sync (if API supports)
2. Or: Fetch all products but only update changed ones
3. Same transformation process as full sync

## Relationship Management

### Junction Tables

**GameCategory**:
- Links games to categories
- Composite primary key: (gameId, categoryId)
- Cascade delete: If game deleted, links deleted

**GameGenre**:
- Links games to genres
- Composite primary key: (gameId, genreId)
- Cascade delete: If game deleted, links deleted

**GamePlatform**:
- Links games to platforms
- Composite primary key: (gameId, platformId)
- Cascade delete: If game deleted, links deleted

### Update Strategy

**When Game is Updated**:
1. Check if categories/genres/platforms changed
2. Remove old links that no longer apply
3. Add new links for new categories/genres/platforms
4. Keep existing links that still apply

**When Category/Genre/Platform Name Changes**:
- Update the entity record
- Links remain valid (they reference by ID, not name)

## Data Validation

### Required Fields
- Game: title, slug, price, g2aProductId
- Category: name, slug
- Genre: name, slug
- Platform: name, slug

### Optional Fields
- Game: description, images, publisher, developer (can be empty)
- Genre: Can be empty if product has no genre info

### Validation Rules
- Slug must be URL-friendly (lowercase, hyphens only)
- Price must be positive
- G2A product ID must be unique per game
- Category/Genre/Platform names must be unique

## State Transitions

### Game Sync Status
- **Not Synced**: No `g2aProductId`, never synced
- **Synced**: Has `g2aProductId`, `g2aLastSync` set
- **Out of Stock**: `inStock = false`, `g2aStock = false`
- **Removed**: Product no longer in G2A (marked out of stock if fullSync)

### Category/Genre/Platform Lifecycle
- **Created**: When first encountered in G2A product
- **Updated**: Name/slug changes (rare)
- **Orphaned**: If all games with this category/genre/platform are removed (kept for historical data)
