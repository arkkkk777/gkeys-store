# Quick Start: G2A Frontend Data Display

## Prerequisites

- Backend G2A integration (006-g2a-integration) is complete and working
- G2A sync has run at least once (games in database)
- Backend server is running
- Frontend dependencies installed

## Setup Steps

### 1. Verify Backend G2A Sync

Ensure G2A sync has run and populated database:

```bash
# Check backend logs for sync completion
# Or trigger manual sync via admin endpoint:
curl -X POST http://localhost:3001/api/admin/g2a/sync \
  -H "Authorization: Bearer {admin_jwt_token}" \
  -H "Content-Type: application/json" \
  -d '{"fullSync": true}'
```

### 2. Verify Backend API Returns G2A Data

Test backend API endpoint:

```bash
# Get games from backend
curl http://localhost:3001/api/games?pageSize=5

# Expected: Games with g2aProductId, real images, descriptions
# Verify response includes:
# - image URLs from G2A (https://images.g2a.com/...)
# - descriptions from G2A
# - prices with 2% markup
```

### 3. Start Frontend Development Server

```bash
cd /path/to/project
npm run dev
```

### 4. Verify Homepage Displays G2A Games

1. Open browser to `http://localhost:5173`
2. Check homepage hero section - should show real game with G2A image
3. Check "Best Sellers" section - should show games with real images
4. Verify no placeholder/question mark images for synced games

### 5. Verify Catalog Page

1. Navigate to `/catalog`
2. Verify games are displayed with:
   - Real images from G2A
   - Descriptions
   - Prices
   - Genres and platforms
3. Test filters - should work with G2A data

### 6. Verify Game Detail Page

1. Click on any game
2. Verify detail page shows:
   - All images from G2A (gallery)
   - Full description
   - Complete metadata (publisher, developer, etc.)
   - Correct price with markup

## Verification Checklist

- [ ] Homepage hero shows real G2A game with image
- [ ] Best Sellers section shows games with G2A images (no placeholders)
- [ ] Catalog page displays G2A games with images and descriptions
- [ ] Game detail page shows complete G2A information
- [ ] Prices include 2% markup
- [ ] Stock status reflects G2A availability
- [ ] Genres and platforms are displayed correctly
- [ ] Images load successfully from G2A URLs
- [ ] Missing images show appropriate placeholder

## Common Issues

### Games Not Appearing

**Symptoms**: Homepage/catalog shows no games or empty state

**Solutions**:
1. Verify G2A sync has run: Check admin sync status endpoint
2. Check backend API returns games: Test `/api/games` endpoint
3. Check browser console for API errors
4. Verify backend is running and database is connected

### Images Not Loading

**Symptoms**: Placeholder images or broken image icons

**Solutions**:
1. Verify G2A image URLs are in database: Check `images` field
2. Test image URL directly in browser
3. Check CORS settings if images fail to load
4. Verify image URLs are properly formatted

### Prices Incorrect

**Symptoms**: Prices don't match expected values

**Solutions**:
1. Verify backend applies 2% markup correctly
2. Check G2A sync updated prices recently
3. Verify currency is correct (EUR, USD, etc.)
4. Check database `price` field values

### Missing Descriptions

**Symptoms**: Games show no description or empty description

**Solutions**:
1. Verify G2A sync includes descriptions
2. Check database `description` field is populated
3. Verify backend API returns description field
4. Check G2A API response includes description

## Testing

### Manual Testing

1. **Homepage Test**:
   - Visit homepage
   - Verify hero section shows real game
   - Check all game sections display real data

2. **Catalog Test**:
   - Navigate to catalog
   - Verify games load with pagination
   - Test filters (genre, platform, price)
   - Verify filtered results show G2A data

3. **Detail Page Test**:
   - Click on a game
   - Verify all information displays
   - Check image gallery works
   - Verify price and availability

### Automated Testing (Future)

```bash
# Unit tests for gamesApi service
npm test -- gamesApi.test.ts

# Component tests for GameCard with G2A data
npm test -- GameCard.test.tsx

# Integration tests for full data flow
npm test -- g2a-display.integration.test.tsx
```

## Next Steps

1. **Verify Data Flow**: Ensure backend → frontend data flow works end-to-end
2. **Image Optimization**: Consider CDN/proxy for G2A images if needed
3. **Error Handling**: Improve error states for missing G2A data
4. **Performance**: Optimize image loading and catalog pagination
5. **Testing**: Add comprehensive tests for G2A data display

## Support

- Backend G2A Integration: See `specs/006-g2a-integration/`
- Backend API Documentation: See `backend/src/routes/game.routes.ts`
- Frontend Components: See `src/components/GameCard.tsx`, `GameSection.tsx`
