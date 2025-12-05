# Quick Start Guide: Расширенный поиск и фильтры

**Feature**: 001-advanced-search-filters  
**Date**: 2024-12-05

## Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL database (for backend)
- Existing GKEYS Store project setup

## Step 1: Install Dependencies

```bash
# Frontend dependencies (if not already installed)
npm install framer-motion

# Verify installation
npm list framer-motion
```

**Note**: `framer-motion` should already be installed (version 12.23.25). Verify in `package.json`.

## Step 2: Integrate Animated Tabs Component

### 2.1 Create Tabs Component

Create file: `src/components/ui/tabs.tsx`

**Important**: 
- Remove `"use client"` directive (not needed in Vite)
- Adapt colors to use accent color `#b4ff00`
- Replace Next.js Image with standard `img` tag
- Ensure dark mode compatibility

### 2.2 Verify Component Structure

The component should:
- Use `cn()` from `@/lib/utils` for className merging
- Support dark theme (#0D0D0D background)
- Use accent color `#b4ff00` for active states
- Be fully typed with TypeScript

## Step 3: Backend Setup

### 3.1 Database Migration

```bash
cd backend

# Create Prisma migration for new Game fields
npx prisma migrate dev --name add_extended_filters

# Verify migration
npx prisma studio
```

**Migration adds**:
- `ratingCritic: Int?` - Critic rating (0-100)
- `ratingUser: Int?` - User rating (0-100)
- `releaseDate: DateTime?` - Release date
- `languages: String[]` - Supported languages

### 3.2 Add Autocomplete Endpoint

**File**: `backend/src/routes/game.routes.ts`

Add route:
```typescript
router.get('/autocomplete', getGameAutocompleteController);
```

**File**: `backend/src/controllers/game.controller.ts`

Add controller:
```typescript
export const getGameAutocompleteController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Implementation
};
```

**File**: `backend/src/services/game.service.ts`

Add service method:
```typescript
export const getGameAutocomplete = async (
  query: string,
  limit: number = 10
): Promise<SearchSuggestion[]> => {
  // Implementation
};
```

## Step 4: Frontend Component Creation

### 4.1 Create Type Definitions

**File**: `src/types/search.ts`

Define all TypeScript interfaces:
- `SearchSuggestion`
- `SavedFilterSet`
- `FilterState`
- `SearchHistoryEntry`

### 4.2 Create Hooks

**File**: `src/hooks/useAutocomplete.ts`
- Debouncing logic (300ms)
- API integration
- Error handling

**File**: `src/hooks/useSavedFilters.ts`
- localStorage operations
- Filter serialization/deserialization
- Max 10 filters limit

**File**: `src/hooks/useSearchHistory.ts`
- History management
- Max 10 entries (FIFO)
- localStorage operations

### 4.3 Create Components

**File**: `src/components/ui/search-autocomplete.tsx`
- Autocomplete dropdown
- Keyboard navigation
- Loading states

**File**: `src/components/ui/filter-manager.tsx`
- Save/load filters UI
- Filter naming
- Delete functionality

**File**: `src/components/catalog/advanced-filters.tsx`
- Extended filters UI (rating, date, languages)
- Integration with existing filters

## Step 5: Integration

### 5.1 Update CatalogPage

**File**: `src/pages/CatalogPage.jsx`

Integration points:
1. Replace search input with `SearchAutocomplete` component
2. Add `FilterManager` component for saved filters
3. Add `AdvancedFilters` component for extended filters
4. Integrate `useSearchHistory` hook
5. Update filter state management

### 5.2 Update API Service

**File**: `src/services/gamesApi.ts`

Add methods:
- `getAutocomplete(query: string, limit?: number)`
- Update `getGames()` to support new filter parameters

## Step 6: Testing

### 6.1 Manual Testing Checklist

- [ ] Autocomplete appears after typing 2+ characters
- [ ] Debounce works (300ms delay)
- [ ] Keyboard navigation works (Arrow keys, Enter, Escape)
- [ ] Saved filters persist in localStorage
- [ ] Saved filters can be loaded and applied
- [ ] Search history maintains max 10 entries
- [ ] Extended filters (rating, date, language) work
- [ ] Mobile responsive design
- [ ] Dark theme compatibility
- [ ] Performance: results load in < 1 second

### 6.2 Browser Testing

Test in:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

### 6.3 Accessibility Testing

- [ ] Keyboard navigation works
- [ ] Screen reader compatibility
- [ ] ARIA labels present
- [ ] Focus management correct

## Step 7: Deployment

### 7.1 Pre-deployment Checklist

- [ ] All TypeScript types correct (no `any`)
- [ ] No console.log or debugger in code
- [ ] Bundle size check (< 1MB gzipped)
- [ ] Performance metrics met
- [ ] All tests passing

### 7.2 Build and Deploy

```bash
# Build frontend
npm run build

# Verify build
npm run preview

# Deploy (Vercel automatic or manual)
```

## Troubleshooting

### Issue: Autocomplete not appearing

**Check**:
- API endpoint is accessible
- Debounce delay is correct (300ms)
- Minimum character count (2) is met
- Network requests in browser DevTools

### Issue: Saved filters not persisting

**Check**:
- localStorage is available (not in private mode)
- Data structure is valid JSON
- Storage limits not exceeded

### Issue: TypeScript errors

**Check**:
- All types are imported correctly
- `@/lib/utils` path alias is configured
- TypeScript config includes new files

### Issue: Performance issues

**Check**:
- Debouncing is working
- API responses are cached
- Components are memoized
- Bundle size is within limits

## Next Steps

After quickstart:

1. **Generate Tasks**: Run `/speckit.tasks` to create detailed task breakdown
2. **Review Implementation**: Ensure all requirements are covered
3. **Begin Development**: Run `/speckit.implement` to execute tasks

## Support

For issues or questions:
- Check existing codebase patterns
- Review constitution principles
- Consult specification: `spec.md`
- Review plan: `plan.md`
