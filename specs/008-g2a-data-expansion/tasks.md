# Tasks: G2A Data Expansion

**Input**: Design documents from `/specs/008-g2a-data-expansion/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and verification

- [X] T001 Verify database schema supports Category, Genre, Platform entities and junction tables in `backend/prisma/schema.prisma`
- [X] T002 [P] Verify G2A API credentials are configured in `backend/.env`
- [X] T003 [P] Review existing G2A service implementation in `backend/src/services/g2a.service.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core extraction and helper functions that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T004 Enhance `extractGenre` function to return multiple genres in `backend/src/services/g2a.service.ts`
- [X] T005 Enhance `extractPlatform` function to return multiple platforms in `backend/src/services/g2a.service.ts`
- [X] T006 Create `extractCategories` function to extract category from G2A product in `backend/src/services/g2a.service.ts`
- [X] T007 Create `normalizeGenreName` helper function for genre name normalization in `backend/src/services/g2a.service.ts`
- [X] T008 Create `normalizePlatformName` helper function for platform name normalization in `backend/src/services/g2a.service.ts`
- [X] T009 Create `generateSlug` helper function (reuse existing or create new) for category/genre/platform slugs in `backend/src/services/g2a.service.ts`
- [X] T010 Create `findOrCreateCategory` helper function to find or create Category record in `backend/src/services/g2a.service.ts`
- [X] T011 Create `findOrCreateGenre` helper function to find or create Genre record in `backend/src/services/g2a.service.ts`
- [X] T012 Create `findOrCreatePlatform` helper function to find or create Platform record in `backend/src/services/g2a.service.ts`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Comprehensive Game Catalog Synchronization (Priority: P1) 🎯 MVP

**Goal**: Fetch and synchronize a comprehensive catalog of games from G2A API, including all available categories, ensuring the database contains a diverse and complete game library.

**Independent Test**: Run a full G2A catalog sync and verify that games from multiple categories are successfully loaded into the database. Check database counts before and after sync, and verify games from different categories appear in the catalog.

### Implementation for User Story 1

- [X] T013 [US1] Enhance `fetchG2AProducts` to accept optional `category` parameter in `backend/src/services/g2a.service.ts`
- [X] T014 [US1] Update `fetchG2AProducts` to use category parameter in API request instead of hardcoded 'games' in `backend/src/services/g2a.service.ts`
- [X] T015 [US1] Enhance `syncG2ACatalog` to support `categories` array parameter for syncing specific categories in `backend/src/services/g2a.service.ts`
- [X] T016 [US1] Implement logic to fetch products from multiple categories when `categories` parameter is provided in `backend/src/services/g2a.service.ts`
- [X] T017 [US1] Add error recovery to continue syncing remaining pages when one page fails in `backend/src/services/g2a.service.ts`
- [X] T018 [US1] Update `syncG2ACatalog` to handle pagination across multiple categories in `backend/src/services/g2a.service.ts`
- [X] T019 [US1] Add logging for category-based fetching in `backend/src/services/g2a.service.ts`
- [X] T020 [US1] Update admin sync endpoint to accept `categories` parameter in `backend/src/controllers/admin.controller.ts`
- [X] T021 [US1] Update admin sync route to pass categories parameter in `backend/src/routes/admin.routes.ts`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently - games from multiple categories can be synced

---

## Phase 4: User Story 2 - G2A Categories and Genres Integration (Priority: P1)

**Goal**: Fetch and synchronize category and genre information directly from G2A API, creating a comprehensive taxonomy that matches G2A's classification system.

**Independent Test**: Verify that categories and genres are fetched from G2A API, stored in database, and properly linked to games. Test by checking that genre/category filters work correctly with G2A-synced data.

### Implementation for User Story 2

- [X] T022 [US2] Implement `syncG2ACategories` function to discover and sync categories from G2A API in `backend/src/services/g2a.service.ts`
- [X] T023 [US2] Implement `syncG2AGenres` function to extract and sync genres from synced products in `backend/src/services/g2a.service.ts`
- [X] T024 [US2] Enhance `extractGenre` to extract all genres from product tags, not just first match in `backend/src/services/g2a.service.ts`
- [X] T025 [US2] Implement `linkGameRelationships` function to link games to categories, genres, and platforms in `backend/src/services/g2a.service.ts`
- [X] T026 [US2] Update `transformG2AProductToGame` to extract category information from G2A product in `backend/src/services/g2a.service.ts`
- [X] T027 [US2] Update `transformG2AProductToGame` to extract all genres from product tags in `backend/src/services/g2a.service.ts`
- [X] T028 [US2] Enhance `syncG2ACatalog` to create Category records during sync when `includeRelationships` is true in `backend/src/services/g2a.service.ts`
- [X] T029 [US2] Enhance `syncG2ACatalog` to create Genre records during sync when `includeRelationships` is true in `backend/src/services/g2a.service.ts`
- [X] T030 [US2] Enhance `syncG2ACatalog` to link games to categories via GameCategory junction table in `backend/src/services/g2a.service.ts`
- [X] T031 [US2] Enhance `syncG2ACatalog` to link games to genres via GameGenre junction table in `backend/src/services/g2a.service.ts`
- [X] T032 [US2] Update `syncG2ACatalog` return type to include `categoriesCreated` and `genresCreated` counts in `backend/src/services/g2a.service.ts`
- [X] T033 [US2] Implement admin endpoint `POST /api/admin/g2a/sync-categories` in `backend/src/controllers/admin.controller.ts`
- [X] T034 [US2] Implement admin endpoint `POST /api/admin/g2a/sync-genres` in `backend/src/controllers/admin.controller.ts`
- [X] T035 [US2] Add routes for sync-categories and sync-genres endpoints in `backend/src/routes/admin.routes.ts`
- [X] T036 [US2] Update admin sync endpoint to accept `includeRelationships` parameter in `backend/src/controllers/admin.controller.ts`
- [X] T037 [US2] Update `linkGameRelationships` to remove old links that no longer apply when updating game relationships in `backend/src/services/g2a.service.ts`

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently - categories and genres are synced and linked to games

---

## Phase 5: User Story 3 - Enhanced Platform and Activation Service Support (Priority: P2)

**Goal**: Properly extract and store platform information and activation services from G2A API, supporting all platforms available in G2A catalog.

**Independent Test**: Verify that platform information is correctly extracted from G2A products, stored in database, and displayed correctly in frontend. Test by checking platform filters work with G2A-synced data.

### Implementation for User Story 3

- [X] T038 [US3] Enhance `extractPlatform` to return all platforms from product.platforms array, not just first in `backend/src/services/g2a.service.ts`
- [X] T039 [US3] Update `transformG2AProductToGame` to extract all platforms from G2A product in `backend/src/services/g2a.service.ts`
- [X] T040 [US3] Implement `syncG2APlatforms` function to extract and sync platforms from synced products in `backend/src/services/g2a.service.ts`
- [X] T041 [US3] Enhance `syncG2ACatalog` to create Platform records during sync when `includeRelationships` is true in `backend/src/services/g2a.service.ts`
- [X] T042 [US3] Enhance `syncG2ACatalog` to link games to platforms via GamePlatform junction table in `backend/src/services/g2a.service.ts`
- [X] T043 [US3] Update `syncG2ACatalog` return type to include `platformsCreated` count in `backend/src/services/g2a.service.ts`
- [X] T044 [US3] Update `linkGameRelationships` to handle platform linking in `backend/src/services/g2a.service.ts`
- [X] T045 [US3] Implement admin endpoint `POST /api/admin/g2a/sync-platforms` in `backend/src/controllers/admin.controller.ts`
- [X] T046 [US3] Add route for sync-platforms endpoint in `backend/src/routes/admin.routes.ts`
- [X] T047 [US3] Ensure activation service information is properly stored in Game.activationService field during sync in `backend/src/services/g2a.service.ts`

**Checkpoint**: At this point, User Stories 1, 2, AND 3 should all work independently - platforms are synced and linked to games

---

## Phase 6: User Story 4 - Incremental and Full Sync Optimization (Priority: P2)

**Goal**: Support both incremental updates (only changed products) and full catalog synchronization with proper error handling, rate limiting, and progress tracking.

**Independent Test**: Run incremental sync (only new/changed products) and full sync, verifying that both modes work correctly, handle errors gracefully, and provide accurate progress information.

### Implementation for User Story 4

- [X] T048 [US4] Create sync progress tracking structure (database table or Redis) for tracking sync state in `backend/src/services/g2a.service.ts`
- [X] T049 [US4] Implement `getG2ASyncProgress` function to return current sync progress information in `backend/src/services/g2a.service.ts`
- [X] T050 [US4] Add progress tracking to `syncG2ACatalog` to update progress after each page in `backend/src/services/g2a.service.ts`
- [X] T051 [US4] Implement change detection logic to compare G2A data with database before updating in `backend/src/services/g2a.service.ts`
- [X] T052 [US4] Enhance `syncG2ACatalog` to only update games that have actually changed when not in fullSync mode in `backend/src/services/g2a.service.ts`
- [X] T053 [US4] Add retry logic with exponential backoff for failed page requests in `backend/src/services/g2a.service.ts`
- [X] T054 [US4] Implement rate limit detection and adaptive delay adjustment in `backend/src/services/g2a.service.ts`
- [X] T055 [US4] Add sync lock mechanism to prevent concurrent syncs in `backend/src/services/g2a.service.ts`
- [X] T056 [US4] Implement admin endpoint `GET /api/admin/g2a/sync-progress` in `backend/src/controllers/admin.controller.ts`
- [X] T057 [US4] Add route for sync-progress endpoint in `backend/src/routes/admin.routes.ts`
- [X] T058 [US4] Update sync job to use progress tracking in `backend/src/jobs/g2a-sync.job.ts`
- [X] T059 [US4] Add error aggregation and reporting for sync operations in `backend/src/services/g2a.service.ts`
- [X] T060 [US4] Implement batch database operations for better performance during large syncs in `backend/src/services/g2a.service.ts`

**Checkpoint**: At this point, all user stories should be independently functional - sync operations are optimized with progress tracking

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T061 [P] Update G2A service TypeScript types to include new return fields (categoriesCreated, genresCreated, platformsCreated) in `backend/src/types/g2a.ts`
- [X] T062 [P] Add comprehensive error handling for category/genre/platform creation failures in `backend/src/services/g2a.service.ts`
- [X] T063 [P] Add validation for category/genre/platform names before database insertion in `backend/src/services/g2a.service.ts`
- [X] T064 [P] Add logging for relationship creation operations in `backend/src/services/g2a.service.ts`
- [X] T065 [P] Update existing G2A service tests to cover new functionality in `backend/src/__tests__/unit/g2a.service.test.ts`
- [X] T066 [P] Add unit tests for new helper functions (findOrCreateCategory, findOrCreateGenre, findOrCreatePlatform) in `backend/src/__tests__/unit/g2a.service.test.ts`
- [X] T067 [P] Add integration tests for category/genre/platform syncing in `backend/src/__tests__/integration/g2a-sync.test.ts`
- [X] T068 [P] Update admin controller error handling for new endpoints in `backend/src/controllers/admin.controller.ts`
- [X] T069 [P] Add input validation for admin endpoints (categories array, includeRelationships boolean) in `backend/src/controllers/admin.controller.ts`
- [X] T070 [P] Update documentation comments in g2a.service.ts for all new and enhanced functions in `backend/src/services/g2a.service.ts`
- [X] T071 [P] Run quickstart.md validation checklist to verify all functionality works correctly
- [X] T072 [P] Update quickstart.md with any discovered issues or improvements in `specs/008-g2a-data-expansion/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-6)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (US1 → US2 → US3 → US4)
- **Polish (Phase 7)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - Enhances US1 but can be independently tested
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - Enhances US1/US2 but can be independently tested
- **User Story 4 (P2)**: Can start after Foundational (Phase 2) - Optimizes all sync operations, can be independently tested

### Within Each User Story

- Helper functions before main functions
- Service layer before controller layer
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, user stories can start in parallel (if team capacity allows)
- Tasks within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members
- Polish phase tasks marked [P] can run in parallel

---

## Parallel Example: User Story 2

```bash
# Launch helper function implementations in parallel:
Task: "Create findOrCreateCategory helper function in backend/src/services/g2a.service.ts"
Task: "Create findOrCreateGenre helper function in backend/src/services/g2a.service.ts"
Task: "Create findOrCreatePlatform helper function in backend/src/services/g2a.service.ts"

# Launch admin endpoint implementations in parallel:
Task: "Implement admin endpoint POST /api/admin/g2a/sync-categories in backend/src/controllers/admin.controller.ts"
Task: "Implement admin endpoint POST /api/admin/g2a/sync-genres in backend/src/controllers/admin.controller.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently - verify games from multiple categories can be synced
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo (Categories/Genres working)
4. Add User Story 3 → Test independently → Deploy/Demo (Platforms working)
5. Add User Story 4 → Test independently → Deploy/Demo (Optimized sync)
6. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Comprehensive sync)
   - Developer B: User Story 2 (Categories/Genres)
   - Developer C: User Story 3 (Platforms)
   - Developer D: User Story 4 (Optimization)
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- Database schema already supports relationships - no schema changes needed
- Existing G2A service will be enhanced, not replaced
