# Implementation Plan: G2A Data Expansion

**Branch**: `008-g2a-data-expansion` | **Date**: 2024-12-10 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/008-g2a-data-expansion/spec.md`

## Summary

Expand G2A API integration to fetch and synchronize a comprehensive catalog of games, including all available categories, genres, and platforms from G2A. Enhance the existing G2A service to support fetching games across all categories (not just 'games'), properly extract and store category/genre information from G2A API, improve platform extraction, and optimize synchronization for large catalogs. This will enable the frontend to display a diverse selection of games with proper categorization and filtering.

## Technical Context

**Language/Version**: TypeScript 5.9, Node.js 20+  
**Primary Dependencies**: Express 4.21, Axios 1.7.9, Prisma 5.17, BullMQ 5.25 (for job scheduling)  
**Storage**: PostgreSQL with Prisma ORM  
**Testing**: Jest with existing test infrastructure (`backend/src/__tests__/`)  
**Target Platform**: Node.js backend server (Linux/macOS)  
**Project Type**: Web application (backend)  
**Performance Goals**: 
- Full catalog sync (1000+ products): < 30 minutes
- Incremental sync: < 5 minutes
- Single API call: < 5 seconds
- Rate limiting: Respect G2A API limits (200ms delay between requests)
**Constraints**: 
- API rate limiting must be respected (200ms delay between requests)
- Must handle G2A API downtime gracefully
- Must support pagination for large catalogs
- Database schema already supports categories, genres, platforms (many-to-many relationships)
**Scale/Scope**: 
- Support 1000+ products from G2A
- Support 10+ genres
- Support 5+ platforms
- Support multiple categories
- Handle large catalog synchronization efficiently

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Status**: ✅ PASSED - All requirements met

### Type Safety First
- [x] All code will be fully typed with TypeScript (no `any` without justification)
- [x] Type definitions will be comprehensive and accurate
- [x] Strict TypeScript configuration will be maintained

### Component-Driven Architecture (Frontend features)
- [N/A] Backend service implementation, not frontend components

### Performance Optimization
- [x] Code splitting strategy defined for vendor libraries (already in place)
- [x] Lazy loading planned for routes and heavy components (N/A for backend)
- [x] Image optimization strategy defined (N/A for backend)
- [x] Bundle size target: < 1MB gzipped (backend bundle separate)
- [x] Console/debugger removal in production builds
- [x] React.memo, useMemo, useCallback usage identified where needed (N/A for backend)

### User Experience Consistency (Frontend features)
- [N/A] Backend API implementation, frontend consistency handled separately

### Code Quality Standards
- [x] ESLint configuration will be followed
- [x] Prettier for code formatting
- [x] Meaningful naming conventions defined
- [x] Comment strategy for complex logic defined
- [x] No commented-out code in production

### Technology Stack Compliance
- [x] Frontend: React 19 + TypeScript, Vite 7, Tailwind CSS 3, shadcn/ui, Framer Motion/GSAP (N/A - backend feature)
- [x] Backend: Node.js + Express, PostgreSQL + Prisma, Full TypeScript
- [x] No unauthorized technology additions

### Security Requirements
- [x] API authentication strategy defined (G2A API hash-based auth - already implemented)
- [x] Sensitive data handling plan defined (environment variables, encrypted keys - already in place)
- [x] Environment variables usage identified (G2A_API_HASH, G2A_API_KEY - already configured)
- [x] Input validation strategy (client + server) - Express validators
- [x] XSS/CSRF protection considered (Helmet middleware)

## Phase 0: Outline & Research

**Status**: ✅ COMPLETE

**Research Document**: `research.md`

**Key Findings**:
- Categories/genres are embedded in product data, not separate endpoints
- Current implementation extracts genres from tags, platforms from platforms array
- Database schema already supports many-to-many relationships
- Need to enhance extraction logic to create Category/Genre/Platform entities
- Rate limiting strategy (200ms delay) is conservative and safe
- Need to support multiple categories beyond just 'games'

**Resolved Unknowns**:
- Categories/genres extracted from product data (tags/platforms fields)
- Category parameter exists but only 'games' currently used - need to test other values
- Pagination strategy: 100 products per page with 200ms delay works well
- Missing data handled with defaults and normalization

## Phase 1: Design & Contracts

**Status**: ✅ COMPLETE

**Data Model**: `data-model.md`
- Defined Game → Category/Genre/Platform relationship strategy
- Defined transformation flow from G2A products to database entities
- Defined junction table management and update strategies
- Documented validation rules and state transitions

**API Contracts**: `contracts/g2a-expansion-contracts.md`
- Enhanced `fetchG2AProducts` with category parameter
- Enhanced `syncG2ACatalog` with relationship creation
- New methods: `syncG2ACategories`, `syncG2AGenres`, `syncG2APlatforms`, `linkGameRelationships`, `getG2ASyncProgress`
- New admin endpoints for category/genre/platform syncing
- Progress tracking endpoint

**Quick Start Guide**: `quickstart.md`
- Setup instructions
- Testing procedures for all sync types
- Verification checklist
- Common issues and solutions
- Performance benchmarks

**Agent Context**: To be updated after implementation

## Project Structure

### Documentation (this feature)

```text
specs/008-g2a-data-expansion/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
backend/
├── src/
│   ├── services/
│   │   └── g2a.service.ts          # Enhanced G2A service (existing, to be expanded)
│   ├── jobs/
│   │   └── g2a-sync.job.ts         # Enhanced sync job (existing, to be improved)
│   ├── controllers/
│   │   └── admin.controller.ts     # Admin endpoints (existing, may need updates)
│   ├── config/
│   │   └── database.ts             # Prisma client (existing)
│   └── __tests__/
│       └── unit/
│           └── g2a.service.test.ts # G2A service tests (existing, to be updated)
└── prisma/
    └── schema.prisma               # Database schema (existing, supports categories/genres/platforms)
```

**Structure Decision**: Web application backend structure. This is an enhancement to existing G2A integration. No new major components needed, only improvements to existing G2A service, sync job, and potentially admin controller. Database schema already supports many-to-many relationships for categories, genres, and platforms.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | No violations | All requirements comply with constitution |
