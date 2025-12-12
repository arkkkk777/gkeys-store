# Quick Start Guide: G2A Data Expansion

## Overview

This guide helps you set up and test the expanded G2A integration that fetches comprehensive game catalogs with proper category, genre, and platform classification.

## Prerequisites

- G2A API credentials configured (G2A_API_KEY, G2A_API_HASH, G2A_API_URL)
- Backend server running
- Database schema up to date (Prisma migrations applied)
- Admin access for triggering syncs

## Setup

### 1. Verify Environment Variables

Ensure these are set in `backend/.env`:

```bash
G2A_API_KEY=your_api_key
G2A_API_HASH=your_api_hash
G2A_API_URL=https://sandboxapi.g2a.com/v1  # or production URL
```

### 2. Verify Database Schema

Run Prisma migrations to ensure schema is up to date:

```bash
cd backend
npx prisma migrate dev
npx prisma generate
```

Verify these tables exist:
- `games` (with `g2aProductId`, `g2aLastSync` fields)
- `categories`
- `genres`
- `platforms`
- `game_categories` (junction table)
- `game_genres` (junction table)
- `game_platforms` (junction table)

### 3. Start Backend Server

```bash
cd backend
npm run dev
```

## Testing the Expansion

### Test 1: Full Catalog Sync with Relationships

**Purpose**: Sync all games and create category/genre/platform links.

**Steps**:
1. Call admin sync endpoint:
```bash
curl -X POST http://localhost:3001/api/admin/g2a/sync \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "fullSync": true,
    "includeRelationships": true
  }'
```

2. Check response for counts:
```json
{
  "success": true,
  "data": {
    "added": 150,
    "updated": 50,
    "removed": 0,
    "categoriesCreated": 3,
    "genresCreated": 12,
    "platformsCreated": 5,
    "errors": []
  }
}
```

3. Verify in database:
```sql
-- Check games synced
SELECT COUNT(*) FROM games WHERE g2aProductId IS NOT NULL;

-- Check categories created
SELECT * FROM categories;

-- Check genres created
SELECT * FROM genres;

-- Check platforms created
SELECT * FROM platforms;

-- Check game-genre links
SELECT g.title, ge.name as genre
FROM games g
JOIN game_genres gg ON g.id = gg.gameId
JOIN genres ge ON gg.genreId = ge.id
LIMIT 10;
```

### Test 2: Sync Specific Categories

**Purpose**: Test syncing games from specific G2A categories.

**Steps**:
1. Call sync with category filter:
```bash
curl -X POST http://localhost:3001/api/admin/g2a/sync \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "categories": ["games", "dlc"],
    "includeRelationships": true
  }'
```

2. Verify games from specified categories are synced.

### Test 3: Sync Categories Separately

**Purpose**: Test syncing category information independently.

**Steps**:
1. Call category sync endpoint:
```bash
curl -X POST http://localhost:3001/api/admin/g2a/sync-categories \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

2. Check response:
```json
{
  "success": true,
  "data": {
    "categories": [
      { "id": "...", "name": "Games", "slug": "games" },
      { "id": "...", "name": "DLC", "slug": "dlc" }
    ],
    "created": 2,
    "errors": []
  }
}
```

### Test 4: Sync Genres Separately

**Purpose**: Test extracting and syncing genres from existing games.

**Steps**:
1. Call genre sync endpoint:
```bash
curl -X POST http://localhost:3001/api/admin/g2a/sync-genres \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

2. Verify genres are created and linked to games.

### Test 5: Sync Platforms Separately

**Purpose**: Test extracting and syncing platforms from existing games.

**Steps**:
1. Call platform sync endpoint:
```bash
curl -X POST http://localhost:3001/api/admin/g2a/sync-platforms \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

2. Verify platforms are created and linked to games.

### Test 6: Check Sync Progress

**Purpose**: Monitor progress of large sync operations.

**Steps**:
1. Start a large sync operation
2. Check progress:
```bash
curl http://localhost:3001/api/admin/g2a/sync-progress \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

3. Response shows:
```json
{
  "success": true,
  "data": {
    "inProgress": true,
    "currentPage": 5,
    "totalPages": 20,
    "productsProcessed": 500,
    "productsTotal": 2000,
    "categoriesCreated": 3,
    "genresCreated": 12,
    "platformsCreated": 5,
    "errors": 2,
    "startedAt": "2024-12-10T12:00:00Z",
    "estimatedCompletion": "2024-12-10T12:15:00Z"
  }
}
```

## Verification Checklist

After running syncs, verify:

- [ ] Games are synced with `g2aProductId` set
- [ ] `g2aLastSync` timestamp is updated
- [ ] Categories are created in `categories` table
- [ ] Genres are created in `genres` table
- [ ] Platforms are created in `platforms` table
- [ ] Games are linked to categories via `game_categories`
- [ ] Games are linked to genres via `game_genres`
- [ ] Games are linked to platforms via `game_platforms`
- [ ] Frontend can filter by genres
- [ ] Frontend can filter by platforms
- [ ] Frontend displays games with proper categorization

## Common Issues

### Issue: No categories/genres/platforms created

**Symptoms**: Sync completes but `categoriesCreated`, `genresCreated`, `platformsCreated` are 0.

**Possible Causes**:
- `includeRelationships` parameter not set to `true`
- G2A products don't have category/genre/platform data
- Extraction logic not working correctly

**Solution**:
1. Check G2A API response to see if products have category/genre/platform fields
2. Verify extraction logic in `g2a.service.ts`
3. Check logs for extraction errors

### Issue: Duplicate categories/genres/platforms

**Symptoms**: Multiple records with same name but different IDs.

**Possible Causes**:
- Name normalization not working (e.g., "Action" vs "action")
- Race condition during concurrent syncs

**Solution**:
1. Check name normalization logic
2. Use database unique constraints on name field
3. Use upsert logic (find or create) instead of always creating

### Issue: Games not linked to categories/genres/platforms

**Symptoms**: Categories/genres/platforms exist but `game_categories`/`game_genres`/`game_platforms` are empty.

**Possible Causes**:
- `linkGameRelationships` not called
- Junction table creation failing silently
- Game IDs don't match

**Solution**:
1. Verify `includeRelationships: true` is set
2. Check logs for relationship creation errors
3. Manually test `linkGameRelationships` function

### Issue: Sync is very slow

**Symptoms**: Sync takes hours for large catalogs.

**Possible Causes**:
- Rate limiting too conservative
- Database operations not optimized
- Processing products one by one instead of batching

**Solution**:
1. Check rate limiting delays (should be 200ms between pages)
2. Use database transactions for batch operations
3. Consider parallel processing with proper rate limit handling

### Issue: Rate limit errors

**Symptoms**: 429 errors during sync.

**Possible Causes**:
- Too many requests too quickly
- Rate limit headers not being respected

**Solution**:
1. Increase delay between requests
2. Implement retry logic with exponential backoff
3. Check G2A API rate limit documentation

## Performance Benchmarks

Expected performance for sync operations:

- **Small sync** (100 products): < 1 minute
- **Medium sync** (500 products): < 5 minutes
- **Large sync** (1000+ products): < 30 minutes
- **Category sync**: < 10 seconds
- **Genre sync**: < 30 seconds (depends on number of games)
- **Platform sync**: < 30 seconds (depends on number of games)

## Next Steps

After successful setup:

1. **Schedule Regular Syncs**: Set up cron jobs for automatic syncing
2. **Monitor Sync Health**: Check sync status regularly
3. **Update Frontend**: Ensure frontend uses new category/genre/platform filters
4. **Test Filtering**: Verify users can filter games by category, genre, platform
5. **Optimize Performance**: Monitor and optimize slow sync operations

## Support

For issues or questions:
- Check logs in `backend/src/services/g2a.service.ts`
- Review error messages in sync responses
- Verify G2A API credentials are correct
- Check database schema is up to date
