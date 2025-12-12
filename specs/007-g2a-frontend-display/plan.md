# Implementation Plan: G2A Frontend Data Display

**Branch**: `007-g2a-frontend-display` | **Date**: 2024-12-10 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/007-g2a-frontend-display/spec.md`

## Summary

Enable frontend to display real game data from G2A API by connecting existing frontend components to backend API endpoints that return G2A-synced data. Replace mock/placeholder data with real game information including images, descriptions, prices, and metadata from G2A synchronization.

## Technical Context

**Language/Version**: TypeScript 5.9, React 19, Node.js 20+  
**Primary Dependencies**: React 19, React Router 7, Axios (via apiClient), Framer Motion 12  
**Storage**: Data fetched from backend API (PostgreSQL via Prisma)  
**Testing**: Jest/Vitest with React Testing Library (existing test infrastructure)  
**Target Platform**: Web browser (Chrome, Firefox, Safari, Edge)  
**Project Type**: Web application (frontend)  
**Performance Goals**: 
- Homepage load: < 2 seconds
- Image lazy loading: Progressive loading
- Catalog pagination: Smooth scrolling
**Constraints**: 
- Must work with existing backend API structure
- Must handle missing/loading states gracefully
- Must maintain existing UI/UX design
**Scale/Scope**: 
- Display 1000+ games from G2A
- Support pagination for large catalogs
- Handle image loading for all games

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Status**: ✅ PASSED - All requirements met

### Type Safety First
- [x] All code will be fully typed with TypeScript (no `any` without justification)
- [x] Type definitions will be comprehensive and accurate
- [x] Strict TypeScript configuration will be maintained

### Component-Driven Architecture (Frontend features)
- [x] Components will be modular, reusable, and self-contained
- [x] Single responsibility principle will be followed
- [x] Components will be independently testable
- [x] Composition over inheritance will be preferred
- [x] Functional components with hooks will be used

### Performance Optimization
- [x] Code splitting strategy defined for vendor libraries (already in place)
- [x] Lazy loading planned for routes and heavy components (React.lazy)
- [x] Image optimization strategy defined (lazy loading, placeholder fallbacks)
- [x] Bundle size target: < 1MB gzipped (maintained)
- [x] Console/debugger removal in production builds
- [x] React.memo, useMemo, useCallback usage identified where needed

### User Experience Consistency (Frontend features)
- [x] Design system consistency maintained (colors, spacing, typography)
- [x] Interactive elements have hover/focus states defined
- [x] Animation approach defined (Framer Motion)
- [x] Responsive design: Mobile-first approach
- [x] Accessibility: ARIA labels, keyboard navigation, semantic HTML

### Code Quality Standards
- [x] ESLint configuration will be followed
- [x] Prettier for code formatting
- [x] Meaningful naming conventions defined
- [x] Comment strategy for complex logic defined
- [x] No commented-out code in production

### Technology Stack Compliance
- [x] Frontend: React 19 + TypeScript, Vite 7, Tailwind CSS 3, shadcn/ui, Framer Motion/GSAP
- [x] Backend: Node.js + Express, PostgreSQL + Prisma, Full TypeScript (dependency)
- [x] No unauthorized technology additions

### Security Requirements
- [x] API authentication strategy defined (JWT tokens via apiClient)
- [x] Sensitive data handling plan defined (no sensitive data in frontend)
- [x] Environment variables usage identified (API URLs)
- [x] Input validation strategy (client + server) - React forms + backend validation
- [x] XSS/CSRF protection considered (React auto-escaping, backend CSRF tokens)

## Phase 0: Outline & Research Complete

**Research Document**: `research.md`

**Key Findings**:
- Backend G2A integration (006-g2a-integration) is complete and working
- Backend API endpoints (`/api/games`, `/api/games/:id`, etc.) return G2A-synced data from database
- Frontend components (GameCard, GameSection, HeroSection) already exist and work with Game interface
- Frontend uses `gamesApi` service which calls backend API with fallback to mock data
- **Decision**: Use existing `gamesApi` service but ensure it calls backend API (keep mock as dev fallback only)
- **Decision**: Use existing GameCard, GameSection components - no new components needed
- **Decision**: Ensure image loading handles G2A URLs correctly with lazy loading and error fallbacks
- **Decision**: Add proper error handling for missing G2A data with loading states

**Open Questions Resolved**:
- ✅ Frontend should NOT call G2A API directly (backend handles it)
- ✅ Mock data kept as development fallback only
- ✅ Image URLs from G2A used directly (no CDN needed initially)
- ✅ Frontend displays current database state (doesn't need to know about sync timing)

## Phase 1: Design & Contracts Complete

**Data Model**: `data-model.md`
- Game entity from backend matches frontend Game interface
- Image URLs from G2A stored in `images` array, displayed with lazy loading
- All G2A metadata (genres, platforms, publisher, developer, etc.) available in Game entity
- Price includes 2% markup (applied on backend)
- Stock status reflects G2A availability

**API Contracts**: `contracts/frontend-api-contracts.md`
- Frontend uses existing backend API contracts
- No new API endpoints needed
- All required endpoints documented with request/response formats
- Error handling contracts specified

**Quick Start Guide**: `quickstart.md`
- Instructions for verifying G2A data display
- Testing steps for homepage, catalog, and detail pages
- Troubleshooting guide for missing data
- Verification checklist included

**Agent Context**: Will be updated after plan completion

## Project Structure

### Documentation (this feature)

```text
specs/007-g2a-frontend-display/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── pages/
│   ├── HomePage.tsx           # Display G2A games in hero and sections
│   ├── CatalogPage.tsx        # Display all G2A games with filters
│   └── GameDetailPage.tsx     # Display complete G2A game information
├── components/
│   ├── GameCard.tsx           # Display game with G2A image and data
│   ├── GameSection.tsx        # Display collection of G2A games
│   └── HeroSection.tsx        # Display featured G2A game
└── services/
    └── gamesApi.ts            # API client - ensure uses backend (not mock)
```

**Structure Decision**: Frontend web application structure. This feature enhances existing components to display real G2A data instead of mock data. No new major components needed, only updates to ensure API integration works correctly.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | No violations | All requirements comply with constitution |
