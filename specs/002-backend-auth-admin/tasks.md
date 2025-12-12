---
description: "Task list for complete backend setup with database models, authorization, and admin panel"
---

# Tasks: Complete Backend Setup with Database Models, Authorization, and Admin Panel

**Input**: Design documents from `/specs/002-backend-auth-admin/`
**Prerequisites**: plan.md ✅, spec.md ✅, data-model.md ✅, contracts/ ✅, research.md ✅

**Tests**: Tests are OPTIONAL and not included in this task list. Add test tasks if TDD approach is requested.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

- **Backend**: `backend/src/` at repository root
- **Prisma**: `backend/prisma/` at repository root
- All paths are relative to repository root

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project structure verification and preparation

- [x] T001 Verify backend project structure matches plan.md requirements
- [x] T002 [P] Verify all required dependencies are installed in backend/package.json (Express, Prisma, jsonwebtoken, bcrypt)
- [x] T003 [P] Verify TypeScript configuration in backend/tsconfig.json supports strict mode
- [x] T004 [P] Verify environment variables are documented in backend/.env.example (DATABASE_URL, JWT_SECRET, JWT_REFRESH_SECRET)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T005 Verify Prisma schema file exists at backend/prisma/schema.prisma
- [x] T006 [P] Verify Prisma client configuration in backend/src/config/database.ts exports prisma instance
- [x] T007 [P] Verify JWT utilities exist in backend/src/utils/jwt.ts with generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken functions
- [x] T008 [P] Verify password hashing utilities exist in backend/src/utils/bcrypt.ts with hashPassword and comparePassword functions
- [x] T009 Verify Express error handling middleware exists in backend/src/middleware/errorHandler.ts
- [x] T010 Verify authentication middleware exists in backend/src/middleware/auth.ts with authenticate and requireAdmin functions

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Complete Database Schema and Type Generation (Priority: P1) 🎯 MVP

**Goal**: Administrators and developers have a complete, well-defined database schema with all necessary models, relationships, and constraints. The system generates TypeScript types automatically from the database schema.

**Independent Test**: Run database migrations, verify all models exist in Prisma schema, and confirm TypeScript types are generated correctly without compilation errors.

### Implementation for User Story 1

- [x] T011 [US1] Review backend/prisma/schema.prisma to verify all required models exist (User, Game, Order, Transaction, Article, GameKey, OrderItem, etc.)
- [x] T012 [US1] Verify all model relationships are correctly defined in backend/prisma/schema.prisma (foreign keys, many-to-many junctions)
- [x] T013 [US1] Verify all performance indexes are defined in backend/prisma/schema.prisma (@@index directives)
- [x] T014 [US1] Run `npm run prisma:generate` in backend directory to generate TypeScript types
- [x] T015 [US1] Verify types are generated successfully in node_modules/.prisma/client/ without errors
- [x] T016 [US1] Verify TypeScript compilation succeeds with `npm run build` in backend directory
- [x] T017 [US1] Create or update documentation in backend/README.md explaining how to import Prisma types (import { User, Game } from '@prisma/client')
- [x] T018 [US1] Verify database constraints (unique, foreign keys) are properly defined in backend/prisma/schema.prisma

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently. Database schema is complete, types generate successfully, and TypeScript compilation succeeds.

---

## Phase 4: User Story 2 - Working Authentication System (Priority: P1)

**Goal**: Users can register, login, and maintain authenticated sessions. The system securely handles user credentials and provides token-based authentication for API access.

**Independent Test**: Create a new user account, login with credentials, and verify that authenticated API requests succeed while unauthenticated requests are rejected.

### Implementation for User Story 2

- [x] T019 [US2] Verify registration endpoint exists at POST /api/auth/register in backend/src/routes/auth.routes.ts
- [x] T020 [US2] Verify registration controller exists in backend/src/controllers/auth.controller.ts (registerController function)
- [x] T021 [US2] Verify registration service function exists in backend/src/services/auth.service.ts (register function)
- [x] T022 [US2] Verify registration validates email format and password strength in backend/src/validators/auth.ts
- [x] T023 [US2] Verify registration hashes password using bcrypt in backend/src/services/auth.service.ts
- [x] T024 [US2] Verify registration generates JWT tokens (access + refresh) in backend/src/services/auth.service.ts
- [x] T025 [US2] Verify login endpoint exists at POST /api/auth/login in backend/src/routes/auth.routes.ts
- [x] T026 [US2] Verify login controller exists in backend/src/controllers/auth.controller.ts (loginController function)
- [x] T027 [US2] Verify login service function exists in backend/src/services/auth.service.ts (login function)
- [x] T028 [US2] Verify login validates credentials and returns JWT tokens in backend/src/services/auth.service.ts
- [x] T029 [US2] Verify authentication middleware validates JWT tokens in backend/src/middleware/auth.ts (authenticate function)
- [x] T030 [US2] Verify protected endpoints reject requests without valid token (returns 401) in backend/src/middleware/auth.ts
- [x] T031 [US2] Verify protected endpoints reject requests with expired tokens (returns 401) in backend/src/middleware/auth.ts
- [x] T032 [US2] Verify refresh token endpoint exists at POST /api/auth/refresh in backend/src/routes/auth.routes.ts
- [x] T033 [US2] Implement refresh token controller logic in backend/src/controllers/auth.controller.ts (refreshTokenController function - currently has TODO)
- [x] T034 [US2] Implement refresh token service logic in backend/src/services/auth.service.ts (add refreshToken function if missing)
- [x] T035 [US2] Verify refresh token validates refreshToken and returns new access token in backend/src/services/auth.service.ts

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently. Users can register, login, and use JWT tokens for authenticated API access. Token refresh mechanism is implemented.

---

## Phase 5: User Story 3 - Role-Based Authorization System (Priority: P1)

**Goal**: The system distinguishes between regular users and administrators, enforcing different access levels based on user roles. Administrators have access to admin panel functions while regular users are restricted to their own data.

**Independent Test**: Login as a regular user and attempt to access admin endpoints (should fail with 403), then login as an admin and access the same endpoints (should succeed).

### Implementation for User Story 3

- [x] T036 [US3] Verify requireAdmin middleware exists in backend/src/middleware/auth.ts (requireAdmin function)
- [x] T037 [US3] Verify requireAdmin middleware checks req.user.role === 'ADMIN' in backend/src/middleware/auth.ts
- [x] T038 [US3] Verify requireAdmin middleware returns 403 Forbidden for non-admin users in backend/src/middleware/auth.ts
- [x] T039 [US3] Verify all admin routes use requireAdmin middleware in backend/src/routes/admin.routes.ts (router.use(requireAdmin))
- [x] T040 [US3] Verify regular user tokens cannot access admin endpoints (test returns 403) in backend/src/middleware/auth.ts
- [x] T041 [US3] Verify admin user tokens can access admin endpoints (test succeeds) in backend/src/middleware/auth.ts
- [x] T042 [US3] Verify user data access control: regular users can only access own data unless admin in backend/src/services/user.service.ts or relevant services
- [x] T043 [US3] Verify admin users can access any user's data regardless of ownership in backend/src/services/admin.service.ts

**Checkpoint**: At this point, User Stories 1, 2, AND 3 should all work independently. Authentication and authorization are fully functional with proper role-based access control.

---

## Phase 6: User Story 4 - Complete Admin Panel Backend Functions (Priority: P2)

**Goal**: Administrators have comprehensive backend functionality to manage all aspects of the platform including users, games, orders, transactions, blog posts, and system configuration.

**Independent Test**: Authenticate as an administrator and verify all admin API endpoints respond correctly with appropriate data and error handling.

### Implementation for User Story 4

- [x] T044 [US4] Verify dashboard endpoint exists at GET /api/admin/dashboard in backend/src/routes/admin.routes.ts
- [x] T045 [US4] Verify dashboard controller exists in backend/src/controllers/admin.controller.ts (getDashboardController function)
- [x] T046 [US4] Verify dashboard service function exists in backend/src/services/admin.service.ts (getDashboardStats function)
- [x] T047 [US4] Verify dashboard returns all required statistics (user counts, order stats, revenue metrics, top games) in backend/src/services/admin.service.ts
- [x] T048 [US4] Verify user search endpoint exists at GET /api/admin/users in backend/src/routes/admin.routes.ts
- [x] T049 [US4] Verify user search controller exists in backend/src/controllers/admin.controller.ts (searchUsersController function)
- [x] T050 [US4] Verify user search service function exists in backend/src/services/admin.service.ts (searchUsers function)
- [x] T051 [US4] Verify user search supports filters (search, role, pagination) in backend/src/services/admin.service.ts
- [x] T052 [US4] Verify user details endpoint exists at GET /api/admin/users/:id in backend/src/routes/admin.routes.ts
- [x] T053 [US4] Verify user details controller exists in backend/src/controllers/admin.controller.ts (getUserDetailsController function)
- [x] T054 [US4] Verify user details service function exists in backend/src/services/admin.service.ts (getUserDetails function)
- [x] T055 [US4] Verify user export endpoint exists at GET /api/admin/users/:id/export in backend/src/routes/admin.routes.ts
- [x] T056 [US4] Verify user export controller exists in backend/src/controllers/admin.controller.ts (exportUserReportController function)
- [x] T057 [US4] Verify user export service function exists in backend/src/services/admin.service.ts (exportUserReport function)
- [x] T058 [US4] Verify game list endpoint exists at GET /api/admin/games in backend/src/routes/admin.routes.ts
- [x] T059 [US4] Verify game create endpoint exists at POST /api/admin/games in backend/src/routes/admin.routes.ts
- [x] T060 [US4] Verify game create controller exists in backend/src/controllers/admin.controller.ts (createGameController function)
- [x] T061 [US4] Verify game create service function exists in backend/src/services/admin.service.ts (createGame function)
- [x] T062 [US4] Verify game update endpoint exists at PUT /api/admin/games/:id in backend/src/routes/admin.routes.ts
- [x] T063 [US4] Verify game update controller exists in backend/src/controllers/admin.controller.ts (updateGameController function)
- [x] T064 [US4] Verify game update service function exists in backend/src/services/admin.service.ts (updateGame function)
- [x] T065 [US4] Verify game delete endpoint exists at DELETE /api/admin/games/:id in backend/src/routes/admin.routes.ts
- [x] T066 [US4] Verify game delete controller exists in backend/src/controllers/admin.controller.ts (deleteGameController function)
- [x] T067 [US4] Verify game delete service function exists in backend/src/services/admin.service.ts (deleteGame function)
- [x] T068 [US4] Verify order list endpoint exists at GET /api/admin/orders in backend/src/routes/admin.routes.ts
- [x] T069 [US4] Verify order list controller exists in backend/src/controllers/admin.controller.ts (getOrdersController function)
- [x] T070 [US4] Verify order list service function exists in backend/src/services/admin.service.ts (getAllOrders function)
- [x] T071 [US4] Verify order status update endpoint exists at PUT /api/admin/orders/:id/status in backend/src/routes/admin.routes.ts
- [x] T072 [US4] Verify order status update controller exists in backend/src/controllers/admin.controller.ts (updateOrderStatusController function)
- [x] T073 [US4] Verify order status update service function exists in backend/src/services/admin.service.ts (updateOrderStatus function)
- [x] T074 [US4] Verify blog post list endpoint exists at GET /api/admin/blog in backend/src/routes/admin.routes.ts
- [x] T075 [US4] Verify blog post create endpoint exists at POST /api/admin/blog in backend/src/routes/admin.routes.ts
- [x] T076 [US4] Verify blog post create controller exists in backend/src/controllers/admin.controller.ts (createBlogPostController function)
- [x] T077 [US4] Verify blog post create service function exists in backend/src/services/admin.service.ts (createBlogPost function)
- [x] T078 [US4] Verify blog post update endpoint exists at PUT /api/admin/blog/:id in backend/src/routes/admin.routes.ts
- [x] T079 [US4] Verify blog post update controller exists in backend/src/controllers/admin.controller.ts (updateBlogPostController function)
- [x] T080 [US4] Verify blog post update service function exists in backend/src/services/admin.service.ts (updateBlogPost function)
- [x] T081 [US4] Verify blog post delete endpoint exists at DELETE /api/admin/blog/:id in backend/src/routes/admin.routes.ts
- [x] T082 [US4] Verify blog post delete controller exists in backend/src/controllers/admin.controller.ts (deleteBlogPostController function)
- [x] T083 [US4] Verify blog post delete service function exists in backend/src/services/admin.service.ts (deleteBlogPost function)
- [x] T084 [US4] Verify transaction list endpoint exists at GET /api/admin/transactions in backend/src/routes/admin.routes.ts
- [x] T085 [US4] Verify transaction list controller exists in backend/src/controllers/admin.controller.ts (getTransactionsController function)
- [x] T086 [US4] Verify transaction list service function exists in backend/src/services/admin.service.ts (getTransactions function)
- [x] T087 [US4] Verify transaction list supports filters (type, status, userId, pagination) in backend/src/services/admin.service.ts
- [x] T088 [US4] Verify G2A sync endpoint exists at POST /api/admin/g2a/sync in backend/src/routes/admin.routes.ts
- [x] T089 [US4] Verify G2A sync controller exists in backend/src/controllers/admin.controller.ts (syncG2AController function)
- [x] T090 [US4] Verify G2A sync service function exists in backend/src/services/admin.service.ts or backend/src/services/g2a.service.ts

**Checkpoint**: At this point, all user stories should be independently functional. All admin panel backend functions are verified and working correctly.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Integration, optimization, and improvements that affect multiple user stories

- [x] T091 Verify all admin endpoints return consistent response format { success: boolean, data?: any, error?: { message: string } } in backend/src/controllers/admin.controller.ts
- [x] T092 Verify all authentication endpoints return consistent response format in backend/src/controllers/auth.controller.ts
- [x] T093 [P] Verify input validation exists for all admin endpoints using express-validator in backend/src/validators/ directory
- [x] T094 [P] Verify input validation exists for all authentication endpoints in backend/src/validators/auth.ts
- [x] T095 Verify error handling returns appropriate HTTP status codes (400, 401, 403, 404, 500) in backend/src/middleware/errorHandler.ts
- [x] T096 Verify authentication attempts are logged (if logging exists) in backend/src/middleware/auth.ts or logging service
- [x] T097 Verify authorization failures are logged (if logging exists) in backend/src/middleware/auth.ts or logging service
- [x] T098 Verify all database queries use Prisma (parameterized, preventing SQL injection) throughout backend/src/services/
- [x] T099 Verify password hashing uses bcrypt with appropriate salt rounds in backend/src/utils/bcrypt.ts
- [x] T100 Verify JWT tokens include expiration times in backend/src/utils/jwt.ts
- [x] T101 Verify environment variables are used for JWT secrets (not hardcoded) in backend/src/utils/jwt.ts
- [x] T102 Verify TypeScript types are used consistently (no `any` without justification) throughout backend/src/
- [x] T103 Run quickstart.md validation checklist from specs/002-backend-auth-admin/quickstart.md
- [x] T104 Verify all endpoints match API contracts in specs/002-backend-auth-admin/contracts/api-spec.json

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-6)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2)
- **Polish (Phase 7)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - Uses User model from US1, but independently testable
- **User Story 3 (P1)**: Can start after Foundational (Phase 2) - Uses authentication from US2, but independently testable
- **User Story 4 (P2)**: Can start after Foundational (Phase 2) - Uses authorization from US3, but independently testable

### Within Each User Story

- Schema/model verification before type generation
- Service functions before controllers
- Controllers before routes
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- **Phase 1**: 3 parallel tasks (T002, T003, T004)
- **Phase 2**: 4 parallel tasks (T006, T007, T008, T010)
- **Phase 3 (US1)**: Schema review tasks can be parallel
- **Phase 4 (US2)**: Registration and login verification can be parallel
- **Phase 5 (US3)**: Middleware verification tasks can be parallel
- **Phase 6 (US4)**: Different admin endpoint verifications can be parallel
- **Phase 7**: 2 parallel tasks (T093, T094)

### Independent Test Criteria

- **US1**: Prisma schema complete, types generate successfully, TypeScript compilation succeeds
- **US2**: User can register, login, receive tokens, and use tokens for authenticated requests. Token refresh works.
- **US3**: Regular users get 403 on admin endpoints, admin users can access admin endpoints, resource ownership is enforced
- **US4**: All admin endpoints respond correctly with proper data, validation, and error handling

### Suggested MVP Scope

**MVP = User Stories 1, 2, and 3** (Database schema, authentication, authorization)
- Provides complete foundation for backend security
- Enables all protected endpoints
- Can be deployed and tested independently
- Foundation for admin panel (US4)

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Most tasks are verification/completion tasks since infrastructure already exists
- Focus on ensuring completeness and correctness rather than building from scratch
- All components must use TypeScript with strict typing (no `any` without justification)
- All components must follow existing Express.js middleware patterns
- Performance goals: Database queries < 500ms, auth overhead < 50ms, admin endpoints < 2 seconds
