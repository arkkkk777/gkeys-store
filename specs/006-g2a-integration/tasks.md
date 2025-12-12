# Tasks: G2A API Integration

**Input**: Design documents from `/specs/006-g2a-integration/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `backend/src/` for backend code
- Paths shown below use backend structure

## Phase 1: Setup (Configuration)

**Purpose**: Configure G2A API credentials and verify environment setup

- [X] T001 Configure G2A API credentials in backend/.env file with test credentials (G2A_API_HASH and G2A_API_KEY)
- [X] T002 [P] Verify environment variable loading in backend/src/services/g2a.service.ts
- [X] T003 [P] Create backend/.env.example with G2A credential placeholders

---

## Phase 2: Foundational (Core Infrastructure)

**Purpose**: Core infrastructure enhancements that support all user stories

**⚠️ CRITICAL**: These tasks improve the foundation but existing code already works. User stories can proceed, but these improvements should be done early.

- [X] T004 [P] Enhance error handling in backend/src/services/g2a.service.ts with structured error types (G2A_AUTH_FAILED, G2A_API_ERROR, etc.)
- [X] T005 [P] Implement structured logging for G2A API calls in backend/src/services/g2a.service.ts (replace console.log with proper logger)
- [X] T006 [P] Add credential validation function in backend/src/services/g2a.service.ts to check credentials on service initialization
- [X] T007 [P] Create G2A API error types in backend/src/types/g2a.ts with error codes from contracts

**Checkpoint**: Foundation improvements ready - user story implementation can now begin

---

## Phase 3: User Story 1 - G2A API Authentication and Connection (Priority: P1) 🎯 MVP

**Goal**: Successfully authenticate with G2A API using provided test credentials and establish reliable connection for all API operations.

**Independent Test**: Verify API authentication headers are correctly generated, test credentials are properly configured, and API connection test endpoint returns success. Test by calling a simple G2A API endpoint (e.g., GET /products with limit=1) and verifying successful response.

### Implementation for User Story 1

- [X] T008 [US1] Update createG2AClient function in backend/src/services/g2a.service.ts to properly map test credentials (Client ID → G2A_API_HASH or G2A_API_KEY - needs clarification)
- [X] T009 [US1] Add credential validation in createG2AClient function in backend/src/services/g2a.service.ts to throw error if credentials missing
- [X] T010 [US1] Implement testConnection function in backend/src/services/g2a.service.ts that makes a test API call to verify authentication works
- [X] T011 [US1] Add error handling for authentication failures in backend/src/services/g2a.service.ts with specific error messages
- [X] T012 [US1] Update all G2A API call functions in backend/src/services/g2a.service.ts to use enhanced error handling from T004
- [X] T013 [US1] Add connection test endpoint in backend/src/controllers/admin.controller.ts (GET /api/admin/g2a/test-connection) that calls testConnection

**Checkpoint**: At this point, User Story 1 should be fully functional - G2A API authentication works and can be tested via admin endpoint

---

## Phase 4: User Story 2 - Product Data Synchronization (Priority: P1)

**Goal**: Fetch product data from G2A API, transform it to match internal data model, and synchronize it with local database while maintaining data consistency.

**Independent Test**: Verify products are fetched from G2A, transformed correctly, stored in database, and prices include 2% markup. Test by running manual sync via admin endpoint and verifying products appear in database with correct fields and prices.

### Implementation for User Story 2

- [X] T014 [US2] Enhance syncG2ACatalog function in backend/src/services/g2a.service.ts to handle pagination properly (fetch all pages)
- [X] T015 [US2] Improve G2A Product to Game transformation in backend/src/services/g2a.service.ts to map all fields from data-model.md
- [X] T016 [US2] Ensure applyMarkup is applied to all prices in syncG2ACatalog function in backend/src/services/g2a.service.ts
- [X] T017 [US2] Add upsert logic in syncG2ACatalog function in backend/src/services/g2a.service.ts to update existing products by g2aProductId
- [X] T018 [US2] Update g2aLastSync timestamp in syncG2ACatalog function in backend/src/services/g2a.service.ts for all synced products
- [X] T019 [US2] Add error handling for individual product sync failures in syncG2ACatalog function in backend/src/services/g2a.service.ts (continue on error, collect errors)
- [X] T020 [US2] Enhance admin sync endpoint in backend/src/controllers/admin.controller.ts to support fullSync and productIds parameters per contracts
- [X] T021 [US2] Add sync status endpoint in backend/src/controllers/admin.controller.ts (GET /api/admin/g2a/status) per contracts specification

**Checkpoint**: At this point, User Story 2 should be fully functional - products can be synchronized from G2A API and stored in database with correct markup

---

## Phase 5: User Story 3 - Real-time Stock and Price Updates (Priority: P2)

**Goal**: Periodically check G2A API for stock availability and price changes, updating database to reflect current availability and pricing.

**Independent Test**: Verify scheduled jobs fetch stock/price data, update database records, and handle API errors gracefully. Test by manually triggering stock check job and verifying database updates.

### Implementation for User Story 3

- [X] T022 [US3] Enhance validateGameStock function in backend/src/services/g2a.service.ts to return structured response with stock count
- [X] T023 [US3] Add getG2APrices function enhancement in backend/src/services/g2a.service.ts to handle bulk price updates efficiently
- [X] T024 [US3] Improve stock check job in backend/src/jobs/g2a-sync.job.ts to handle rate limiting with delays between requests
- [X] T025 [US3] Add price update logic to stock check job in backend/src/jobs/g2a-sync.job.ts to update prices when they change
- [X] T026 [US3] Implement retry logic with exponential backoff in backend/src/jobs/g2a-sync.job.ts for failed API calls
- [X] T027 [US3] Add error collection and reporting in backend/src/jobs/g2a-sync.job.ts to track sync failures
- [X] T028 [US3] Update g2aLastSync timestamp in stock check job in backend/src/jobs/g2a-sync.job.ts after successful checks

**Checkpoint**: At this point, User Story 3 should be fully functional - scheduled jobs update stock and prices automatically

---

## Phase 6: User Story 4 - Order Processing and Key Delivery (Priority: P1)

**Goal**: Process orders through G2A API, purchase game keys, and deliver them to users while handling errors and maintaining order records.

**Independent Test**: Verify orders are created, G2A API purchase is called, keys are received and stored, and order status is updated. Test by placing a test order and verifying keys are stored and order status is COMPLETED.

### Implementation for User Story 4

- [X] T029 [US4] Enhance purchaseGameKey function in backend/src/services/g2a.service.ts to validate product stock before purchase
- [X] T030 [US4] Improve error handling in purchaseGameKey function in backend/src/services/g2a.service.ts with specific error codes (G2A_OUT_OF_STOCK, G2A_API_ERROR)
- [X] T031 [US4] Add key storage logic in backend/src/services/order.service.ts to create GameKey records from G2A response
- [X] T032 [US4] Update order processing flow in backend/src/services/order.service.ts to call purchaseGameKey and handle responses
- [X] T033 [US4] Add order status update logic in backend/src/services/order.service.ts to set status to PROCESSING when G2A API call starts
- [X] T034 [US4] Implement order completion logic in backend/src/services/order.service.ts to set status to COMPLETED when keys received
- [X] T035 [US4] Add order failure handling in backend/src/services/order.service.ts to set status to FAILED when G2A API fails
- [X] T036 [US4] Ensure idempotency in order processing in backend/src/services/order.service.ts to prevent duplicate purchases
- [X] T037 [US4] Add key delivery logic in backend/src/services/email.service.ts or order.service.ts to send keys to user via email

**Checkpoint**: At this point, User Story 4 should be fully functional - orders can be processed through G2A API and keys delivered to users

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories and final polish

- [ ] T038 [P] Add comprehensive unit tests for G2A service functions in backend/src/__tests__/unit/g2a.service.test.ts
- [ ] T039 [P] Add integration tests for G2A API calls in backend/src/__tests__/integration/g2a.integration.test.ts (using test credentials)
- [X] T040 [P] Update quickstart.md validation - verify all setup steps work correctly
- [X] T041 [P] Add rate limiting detection and handling in backend/src/services/g2a.service.ts (check for 429 responses)
- [X] T042 [P] Implement request queuing for bulk operations in backend/src/services/g2a.service.ts to respect rate limits
- [X] T043 [P] Add audit logging for all G2A API interactions in backend/src/services/g2a.service.ts (log requests/responses for debugging)
- [X] T044 [P] Remove console.log statements from backend/src/services/g2a.service.ts and replace with proper logging
- [X] T045 [P] Add JSDoc comments to all G2A service functions in backend/src/services/g2a.service.ts
- [X] T046 [P] Verify game key encryption consideration in backend/src/services/order.service.ts (document decision if not implementing)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Can run in parallel with user stories, but should be done early for better error handling
- **User Stories (Phase 3-6)**: All depend on Setup completion (credentials configured)
  - User Story 1 (P1): Must complete before other stories can reliably test
  - User Story 2 (P1): Can start after US1, but can work in parallel with US4
  - User Story 3 (P2): Can start after US2 (depends on sync functionality)
  - User Story 4 (P1): Can start after US1, can work in parallel with US2
- **Polish (Phase 7)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Foundation for all other stories - authentication must work first
- **User Story 2 (P1)**: Depends on US1 (needs working authentication), but can proceed in parallel with US4
- **User Story 3 (P2)**: Depends on US2 (needs sync functionality), lower priority
- **User Story 4 (P1)**: Depends on US1 (needs working authentication), can proceed in parallel with US2

### Within Each User Story

- Core authentication functions before API call functions
- Service layer before controller endpoints
- Error handling improvements before feature enhancements
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel
- User Story 2 and User Story 4 can be worked on in parallel (after US1 completes)
- All Polish tasks marked [P] can run in parallel
- Different functions within a service can be enhanced in parallel if they don't conflict

---

## Parallel Example: User Story 1

```bash
# These can run in parallel (different functions in same file, but independent):
Task T008: "Update createG2AClient function in backend/src/services/g2a.service.ts"
Task T010: "Implement testConnection function in backend/src/services/g2a.service.ts"
Task T011: "Add error handling for authentication failures in backend/src/services/g2a.service.ts"
```

## Parallel Example: User Story 2 and 4

```bash
# After US1 completes, these can run in parallel:
Developer A: User Story 2 (Product Synchronization)
  - T014: Enhance syncG2ACatalog
  - T015: Improve transformation
  - T016: Ensure markup application

Developer B: User Story 4 (Order Processing)
  - T029: Enhance purchaseGameKey
  - T030: Improve error handling
  - T031: Add key storage logic
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (configure credentials)
2. Complete Phase 2: Foundational (improve error handling)
3. Complete Phase 3: User Story 1 (authentication)
4. **STOP and VALIDATE**: Test G2A API connection works
5. Deploy/demo authentication working

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test authentication → Deploy/Demo (MVP!)
3. Add User Story 2 → Test product sync → Deploy/Demo
4. Add User Story 4 → Test order processing → Deploy/Demo
5. Add User Story 3 → Test scheduled updates → Deploy/Demo
6. Add Polish → Final improvements → Production ready

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once User Story 1 is done:
   - Developer A: User Story 2 (Product Sync)
   - Developer B: User Story 4 (Order Processing)
3. Once User Story 2 is done:
   - Developer C: User Story 3 (Scheduled Updates)
4. All developers: Polish phase

---

## Notes

- [P] tasks = different files or different functions, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Existing code in g2a.service.ts will be enhanced, not rewritten
- Credential mapping (Client ID → HASH/KEY) needs clarification before T008
- All tasks enhance existing implementation - no new major components needed
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: breaking existing functionality, removing fallback mock data without replacement
