# Research: Homepage Sections & Sliders Enhancement

**Feature**: 009-homepage-sections-sliders  
**Date**: 2024-12-10  
**Phase**: 0 - Research

## Research Questions & Findings

### RQ1: Framer Motion Integration Patterns

**Question**: How is Framer Motion currently used in the project, and what patterns should we follow?

**Findings**:
- Framer Motion 12.23.25 is already installed and used in:
  - `HeroSection.jsx`: Uses `motion.div`, `AnimatePresence`, `whileHover`, `whileTap`
  - `GameSection.jsx`: Uses `motion.div`, `motion.button`, `variants` for staggered animations
- Existing patterns:
  - `containerVariants` and `itemVariants` for staggered grid animations
  - `whileInView` with `viewport={{ once: true }}` for scroll-triggered animations
  - `whileHover` and `whileTap` for interactive elements
  - `staggerChildren` for sequential animations

**Decision**: Follow existing patterns. Use `variants` for consistency, `whileInView` for section entrances, and maintain the same animation timing (0.3s duration, 0.05s stagger).

**Rationale**: Consistency with existing codebase, proven performance, and user familiarity.

**Alternatives Considered**: 
- GSAP: Already installed but not used in components - would require new patterns
- CSS animations: Less flexible, harder to coordinate with React state

---

### RQ2: Data Fetching Strategy for Multiple Sections

**Question**: How to efficiently fetch data for 12+ sections without causing performance issues?

**Findings**:
- Current `HomePage.jsx` uses `Promise.all` for parallel fetching (4 sections)
- `gamesApi` methods available:
  - `getBestSellers(genre?)` - supports genre filtering
  - `getNewInCatalog()` - returns array
  - `getPreorders()` - returns array
  - `getGamesByGenre(genre)` - for genre sections
  - `getRandomGames(count)` - for random picks
  - `getCollections()` - for collection-based sections
- Mock data available in `gamesData.js` with all required sections

**Decision**: 
1. Use `Promise.all` to fetch all sections in parallel (optimized)
2. Implement per-section loading states (skeleton loaders)
3. Use mock data as immediate fallback, then try API
4. Cache API responses in component state to avoid re-fetching

**Rationale**: Parallel fetching minimizes total load time. Per-section loading provides better UX than blocking entire page. Mock data ensures content is always visible.

**Alternatives Considered**:
- Sequential fetching: Too slow (12+ API calls sequentially)
- Server-side rendering: Not applicable (client-side React app)

---

### RQ3: G2A Website Scraping Implementation

**Question**: How to implement scraping from https://www.g2a.com/category/gaming-c1 for missing images/descriptions?

**Findings**:
- G2A website is client-side rendered (React/Next.js)
- Direct scraping from browser would require:
  - CORS issues (G2A doesn't allow cross-origin requests)
  - Server-side proxy or backend endpoint
- Alternative: Use G2A API (already integrated) which provides images and descriptions
- If API doesn't have data, mock data has fallback images

**Decision**: 
1. **Primary**: Use G2A API data (already provides images/descriptions)
2. **Fallback**: Use mock data from `gamesData.js` (has G2A image URLs)
3. **Enhancement**: If specific game missing image, use placeholder or generic game image
4. **Scraping**: Defer to future enhancement - requires backend proxy endpoint

**Rationale**: 
- G2A API already provides rich data
- Mock data has valid G2A image URLs
- Client-side scraping has CORS limitations
- Backend scraping would require new endpoint (out of scope)

**Alternatives Considered**:
- Client-side scraping: CORS blocked, not feasible
- Backend scraping endpoint: Requires backend changes (out of scope for this feature)
- Third-party game database API: Additional dependency, cost considerations

---

### RQ4: Carousel/Slider Implementation

**Question**: Should we enhance GameSection carousel or create a new GameSlider component?

**Findings**:
- `GameSection.jsx` already has carousel functionality:
  - `carousel` prop toggles carousel mode
  - Uses `scrollRef` with `scrollBy` for navigation
  - Has prev/next buttons
  - Responsive (hides buttons on mobile)
- `embla-carousel-react` is installed but not used
- Current implementation uses native scroll with `scrollSnapType`

**Decision**: Enhance existing `GameSection` carousel functionality:
- Keep current scroll-based approach (works well, lightweight)
- Add Framer Motion animations to carousel items
- Improve touch/swipe support on mobile
- Add scroll indicators (dots) for better UX

**Rationale**: 
- Existing carousel works, just needs enhancement
- Native scroll is performant and accessible
- Embla would add bundle size without significant benefit
- Framer Motion can animate items within carousel

**Alternatives Considered**:
- Embla Carousel: More features but adds ~15KB, current solution sufficient
- Swiper.js: Popular but adds dependency, current solution works

---

### RQ5: Performance Optimization for 12+ Sections

**Question**: How to ensure 60fps animations with 50-100+ game cards?

**Findings**:
- React 19 has improved rendering performance
- Framer Motion uses `will-change` and GPU acceleration
- Current `GameSection` uses `viewport={{ once: true }}` to prevent re-animations
- Images should use `loading="lazy"` (already in GameCard)

**Decision**:
1. Use `React.memo` for GameCard (already implemented)
2. Memoize section data with `useMemo`
3. Lazy load sections below fold with `React.lazy` (if needed)
4. Use `will-change: transform` for animated elements
5. Limit initial visible sections, load more on scroll

**Rationale**: 
- React.memo prevents unnecessary re-renders
- Memoization reduces computation
- Lazy loading reduces initial bundle
- GPU acceleration ensures smooth animations

**Alternatives Considered**:
- Virtual scrolling: Overkill for 50-100 items, adds complexity
- Intersection Observer for lazy loading: Already used by Framer Motion `whileInView`

---

### RQ6: Responsive Breakpoints and Column Counts

**Question**: What are the optimal column counts for different screen sizes?

**Findings**:
- Current breakpoints in `GameSection.jsx`:
  - Desktop (>1200px): 6 columns (or 5, 4 based on section)
  - Tablet (900-1200px): 4 columns
  - Mobile tablet (600-900px): 3 columns
  - Mobile (<600px): 2 columns
- GameCard size: ~180px width in carousel, flexible in grid

**Decision**: Maintain existing responsive breakpoints:
- Desktop: 6 columns (Best Sellers, New in Catalog, Action, Open World, Sony Exclusives)
- Desktop: 5 columns (Preorders, Remakes)
- Desktop: 4 columns (New Games, Noir, Random Picks)
- Tablet: 4 columns (all sections)
- Mobile tablet: 3 columns (all sections)
- Mobile: 2 columns (all sections)

**Rationale**: Existing breakpoints work well, tested, and provide good UX across devices.

**Alternatives Considered**: 
- Different breakpoints: Current ones are standard and work well
- More granular breakpoints: Adds complexity without significant benefit

---

### RQ7: Accessibility for Animations

**Question**: How to ensure animations respect user preferences and accessibility?

**Findings**:
- CSS `prefers-reduced-motion` media query exists
- Framer Motion supports `reducedMotion` config
- Current components don't check for reduced motion preference

**Decision**:
1. Check `window.matchMedia('(prefers-reduced-motion: reduce)')`
2. Disable animations or use instant transitions when reduced motion preferred
3. Add `reducedMotion: "user"` to Framer Motion config
4. Ensure all interactive elements work without animations

**Rationale**: 
- WCAG 2.1 requires respecting motion preferences
- Some users experience motion sickness
- Animations are enhancement, not requirement

**Alternatives Considered**:
- Always show animations: Violates accessibility guidelines
- User toggle: Adds UI complexity, system preference is sufficient

---

## Technical Decisions Summary

| Decision | Rationale | Alternative Rejected |
|----------|-----------|---------------------|
| Use existing Framer Motion patterns | Consistency, proven performance | GSAP or CSS animations |
| Parallel data fetching with Promise.all | Minimizes load time | Sequential fetching |
| Use G2A API + mock data (defer scraping) | API provides data, scraping requires backend | Client-side scraping (CORS) |
| Enhance existing GameSection carousel | Works well, lightweight | Embla Carousel (adds bundle size) |
| React.memo + useMemo for performance | Prevents re-renders, reduces computation | Virtual scrolling (overkill) |
| Maintain existing responsive breakpoints | Tested, works well | New breakpoints (unnecessary) |
| Respect prefers-reduced-motion | Accessibility requirement | Always animate (violates guidelines) |

## Unresolved Questions

**None** - All research questions resolved.

## Next Steps

1. Create data model for section configurations
2. Define API contracts for new data fetching methods (if needed)
3. Create quickstart guide for testing
4. Generate implementation tasks
