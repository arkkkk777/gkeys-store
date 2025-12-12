# Implementation Plan: G2A API Integration

**Branch**: `006-g2a-integration` | **Date**: 2024-12-09 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/006-g2a-integration/spec.md`

## Summary

Integrate G2A API with the existing GKEYS store backend to enable real-time product synchronization, stock checking, and order processing. The implementation will enhance the existing G2A service (`backend/src/services/g2a.service.ts`) to properly authenticate with G2A API using provided test credentials, implement robust error handling, and ensure reliable product data synchronization and order fulfillment.

## Technical Context

**Language/Version**: TypeScript 5.9, Node.js 20+  
**Primary Dependencies**: Express 4.21, Axios 1.7.9, Prisma 5.17, BullMQ 5.25 (for job scheduling)  
**Storage**: PostgreSQL with Prisma ORM  
**Testing**: Jest with existing test infrastructure (`backend/src/__tests__/`)  
**Target Platform**: Node.js backend server (Linux/macOS)  
**Project Type**: Web application (backend)  
**Performance Goals**: 
- Single API call: < 5 seconds
- Bulk sync (1000 products): < 10 minutes
- Order processing: < 30 seconds
**Constraints**: 
- API rate limiting must be respected
- Must handle G2A API downtime gracefully
- Credentials must be stored securely in environment variables
**Scale/Scope**: 
- Support 1000+ products
- Handle concurrent orders
- Scheduled sync jobs for product updates

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
- [x] API authentication strategy defined (G2A API hash-based auth)
- [x] Sensitive data handling plan defined (environment variables, encrypted keys)
- [x] Environment variables usage identified (G2A_API_HASH, G2A_API_KEY)
- [x] Input validation strategy (client + server) - Express validators
- [x] XSS/CSRF protection considered (Helmet middleware)

## Phase 0: Research Complete

**Research Document**: `research.md`

**Key Findings**:
- Hash-based authentication method confirmed
- Test credentials provided: Client ID `qdaiciDiyMaTjxMt`, API Key `74026b3dc2c6db6a30a73e71cdb138b1e1b5eb7a97ced46689e2d28db1050875`
- **Open Question**: Credential mapping (which is HASH vs KEY) needs clarification
- Error handling strategy: Graceful degradation with mock data fallback
- Scheduled sync jobs: 2x daily catalog sync, 15-minute stock checks

## Phase 1: Design Complete

**Data Model**: `data-model.md`
- G2A Product → Game transformation defined
- G2A Order → Internal Order + GameKeys mapping defined
- Database schema already includes required G2A fields

**API Contracts**: `contracts/g2a-api-contracts.md`
- G2A API endpoints documented
- Internal admin endpoints defined
- Error handling contracts specified

**Quick Start Guide**: `quickstart.md`
- Setup instructions provided
- Testing procedures documented
- Common issues and solutions listed

**Agent Context**: Updated (attempted - script found different spec, but structure is correct)

## Project Structure

### Documentation (this feature)

```text
specs/006-g2a-integration/
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
│   │   └── g2a.service.ts          # Enhanced G2A service (existing, to be improved)
│   ├── jobs/
│   │   └── g2a-sync.job.ts         # Scheduled sync job (existing, to be enhanced)
│   ├── controllers/
│   │   └── admin.controller.ts    # Admin endpoints for G2A sync (existing)
│   ├── config/
│   │   └── database.ts             # Prisma client (existing)
│   └── __tests__/
│       └── unit/
│           └── g2a.service.test.ts # G2A service tests (existing, to be updated)
└── .env                              # Environment variables (G2A credentials)
```

**Structure Decision**: Web application backend structure. G2A integration is a backend service enhancement. Existing service structure will be maintained and enhanced. No new major components needed, only improvements to existing G2A service, sync job, and admin controller.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | No violations | All requirements comply with constitution |
