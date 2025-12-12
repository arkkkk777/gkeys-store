# Research: G2A Frontend Data Display

## Backend API Integration

### Decision: Use Existing Backend API Endpoints

**Rationale**: 
Backend G2A integration (006-g2a-integration) is already complete. Backend API endpoints (`/api/games`, `/api/games/:id`, etc.) return G2A-synced data from database. Frontend should use these existing endpoints.

**Current Implementation**:
- Frontend `gamesApi` service calls backend API endpoints
- Backend `game.service.ts` queries database (which contains G2A-synced games)
- Fallback to mock data exists in frontend for development

**Required Changes**:
- Ensure backend API returns G2A-synced games (verify game.service.ts queries include G2A products)
- Verify frontend uses real API responses (not mock fallbacks in production)
- Handle cases where G2A sync hasn't run yet (graceful degradation)

**Alternatives Considered**:
- Direct G2A API calls from frontend: Rejected - violates security (API keys in frontend), backend handles authentication
- New API endpoints: Rejected - existing endpoints sufficient, just need to ensure they return G2A data

## Image Display Strategy

### Decision: Use G2A Image URLs with Fallback Placeholders

**Rationale**: 
G2A API provides image URLs for games. These should be displayed directly. If images fail to load or are missing, show appropriate placeholder.

**Current Implementation**:
- GameCard component displays `game.image` and `game.images`
- Images from G2A stored in database `images` array
- Need to ensure image URLs are properly formatted and accessible

**Image Loading Strategy**:
- Use native `<img>` tags with `loading="lazy"` for performance
- Handle `onError` events to show placeholder if G2A image fails
- Use first image from `images` array as primary, others for gallery

**Alternatives Considered**:
- Image CDN/proxy: Considered but deferred - G2A URLs work directly
- Image optimization service: Considered but deferred - can add later if needed

## Data Flow

### Decision: Backend → Database → API → Frontend

**Flow**:
1. G2A API sync job runs (from 006-g2a-integration)
2. Games stored in database with G2A data (images, descriptions, prices, etc.)
3. Frontend calls backend API (`/api/games`)
4. Backend queries database and returns G2A-synced games
5. Frontend displays real data

**Current State**:
- Backend sync is implemented
- Backend API endpoints exist
- Frontend components exist
- **NEEDS VERIFICATION**: Backend API actually returns G2A data (not empty/mock)

**Required Verification**:
- Check `game.service.ts` queries include games with `g2aProductId`
- Verify API responses contain G2A image URLs
- Ensure prices include 2% markup
- Verify descriptions and metadata are present

## Error Handling

### Decision: Graceful Degradation with Loading States

**Rationale**: 
If G2A data is not available (sync hasn't run, API error, etc.), frontend should show loading states or appropriate messages, not crash.

**Current Implementation**:
- Frontend `gamesApi` has try-catch with mock data fallback
- Components should handle loading/error states

**Required Improvements**:
- Show loading skeletons while fetching G2A data
- Display user-friendly error messages if G2A data unavailable
- Keep mock data as development fallback only
- In production, show "No games available" if API fails (not mock data)

**Alternatives Considered**:
- Fail-fast approach: Rejected - poor UX, users see errors instead of content
- Always show mock data: Rejected - users see fake games, misleading

## Performance Considerations

### Decision: Lazy Loading and Pagination

**Rationale**: 
G2A catalog can have 1000+ games. Need efficient loading and display.

**Current Implementation**:
- Catalog supports pagination
- GameCard components exist
- Need to ensure images lazy load

**Required Optimizations**:
- Lazy load game images (native `loading="lazy"` attribute)
- Paginate catalog results (already supported)
- Use React.memo for GameCard if re-renders are expensive
- Consider virtual scrolling for very large catalogs (future enhancement)

**Alternatives Considered**:
- Load all games at once: Rejected - too slow, poor performance
- Server-side rendering: Considered but deferred - current client-side approach sufficient

## Data Synchronization Timing

### Decision: Real-time Display of Synced Data

**Rationale**: 
Frontend displays whatever is in database. G2A sync runs on schedule (2x daily) or manually. Frontend doesn't need to know about sync timing - just displays current database state.

**Current Implementation**:
- G2A sync job runs automatically (2 AM, 2 PM)
- Manual sync available via admin endpoint
- Stock checks every 15 minutes

**Frontend Behavior**:
- Frontend queries backend API
- Backend returns current database state
- If sync hasn't run yet, database may be empty - show appropriate message
- After sync runs, next API call returns G2A data

**Alternatives Considered**:
- Frontend triggers sync: Rejected - admin-only operation, security risk
- WebSocket for real-time updates: Considered but deferred - polling sufficient for MVP

## Open Questions Resolved

1. **Q: Should frontend call G2A API directly?**
   - **A**: No - backend handles G2A API, frontend calls backend API only

2. **Q: What if G2A sync hasn't run yet?**
   - **A**: Show "No games available" or loading state, not mock data

3. **Q: How to handle missing images?**
   - **A**: Show placeholder image if G2A image URL fails to load

4. **Q: Should we cache G2A data in frontend?**
   - **A**: No - backend handles caching, frontend just displays current state

5. **Q: What about image optimization?**
   - **A**: Use G2A URLs directly for now, can add CDN/proxy later if needed
