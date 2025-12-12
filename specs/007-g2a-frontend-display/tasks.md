# Tasks: G2A Frontend Data Display

**Input**: Design documents from `/specs/007-g2a-frontend-display/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are OPTIONAL for this feature - not explicitly requested in specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `src/` at repository root (frontend)
- Backend API endpoints already exist and return G2A-synced data

---

## Phase 1: Setup (Verification & Preparation)

**Purpose**: Verify backend G2A integration is working and prepare frontend for G2A data display

- [X] T001 Verify backend G2A sync has run and database contains G2A-synced games
- [X] T002 [P] Test backend API endpoint `/api/games` returns G2A data with images, descriptions, and prices
- [X] T003 [P] Verify backend API response format matches frontend Game interface in `src/services/gamesApi.ts`
- [X] T004 Check environment variables for backend API URL in frontend configuration

---

## Phase 2: Foundational (API Service Updates)

**Purpose**: Update gamesApi service to prioritize backend API responses and handle G2A data correctly

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T005 Update `gamesApi.getGames()` in `src/services/gamesApi.ts` to prioritize backend API response over mock data fallback
- [X] T006 [P] Update `gamesApi.getBestSellers()` in `src/services/gamesApi.ts` to use backend API with proper error handling
- [X] T007 [P] Update `gamesApi.getNewInCatalog()` in `src/services/gamesApi.ts` to use backend API with proper error handling
- [X] T008 [P] Update `gamesApi.getPreorders()` in `src/services/gamesApi.ts` to use backend API with proper error handling
- [X] T009 [P] Update `gamesApi.getGameBySlug()` in `src/services/gamesApi.ts` to use backend API with proper error handling
- [X] T010 Add loading state management to gamesApi service methods in `src/services/gamesApi.ts`
- [X] T011 Add error handling for API failures in `src/services/gamesApi.ts` (show user-friendly messages, not mock data in production)
- [X] T012 Ensure mock data fallback is only used in development mode in `src/services/gamesApi.ts`

**Checkpoint**: Foundation ready - gamesApi service now prioritizes backend G2A data. User story implementation can now begin.

---

## Phase 3: User Story 1 - Display Real G2A Games on Homepage (Priority: P1) 🎯 MVP

**Goal**: Homepage displays real game data from G2A API including images, titles, prices, descriptions, and availability status, replacing placeholder/mock data.

**Independent Test**: Visit homepage and verify it displays games from database (synced from G2A), shows real images instead of placeholders, displays correct prices with markup, and shows descriptions. Test by running G2A sync, then checking homepage renders real data.

### Implementation for User Story 1

- [X] T013 [US1] Update `HomePage.jsx` to fetch best sellers from `gamesApi.getBestSellers()` instead of using mock data from `gamesData`
- [X] T014 [US1] Update `HomePage.jsx` to fetch new in catalog games from `gamesApi.getNewInCatalog()` instead of using mock data
- [X] T015 [US1] Update `HomePage.jsx` to fetch preorders from `gamesApi.getPreorders()` instead of using mock data
- [X] T016 [US1] Add loading state to `HomePage.jsx` while fetching G2A data (show skeleton/spinner)
- [X] T017 [US1] Add error handling to `HomePage.jsx` for API failures (show user-friendly error message)
- [X] T018 [US1] Update `HeroSection.jsx` to display featured game from G2A data with real image URL
- [X] T019 [US1] Update `GameCard.jsx` to handle G2A image URLs with lazy loading (`loading="lazy"` attribute)
- [X] T020 [US1] Add image error handling to `GameCard.jsx` to show placeholder if G2A image fails to load
- [X] T021 [US1] Update `GameCard.jsx` to display G2A-synced price with markup (from backend API)
- [X] T022 [US1] Update `GameCard.jsx` to display G2A-synced description when available
- [X] T023 [US1] Update `GameCard.jsx` to show availability status based on `inStock` field from G2A
- [X] T024 [US1] Verify homepage displays real G2A images instead of placeholder/question mark icons

**Checkpoint**: At this point, User Story 1 should be fully functional. Homepage displays real G2A games with images, prices, and descriptions. Test independently by visiting homepage and verifying data comes from backend API.

---

## Phase 4: User Story 2 - Display G2A Games in Catalog with Full Details (Priority: P1)

**Goal**: Catalog page displays all available G2A games with complete information including images, descriptions, prices, genres, platforms, and availability.

**Independent Test**: Navigate to catalog page and verify it fetches games from backend API, displays all game details correctly, shows images from G2A, and filters work with G2A data. Test by navigating to catalog and verifying games have real data.

### Implementation for User Story 2

- [X] T025 [US2] Update `CatalogPage.jsx` to fetch games from `gamesApi.getGames()` with filters instead of using mock data
- [X] T026 [US2] Add loading state to `CatalogPage.jsx` while fetching G2A games (show skeleton grid)
- [X] T027 [US2] Add error handling to `CatalogPage.jsx` for API failures (show "No games available" message)
- [X] T028 [US2] Update `CatalogPage.jsx` to handle pagination with G2A data from backend API
- [X] T029 [US2] Update `CatalogPage.jsx` filters to work with G2A data (genres, platforms, price range, stock status)
- [X] T030 [US2] Ensure `GameCard` components in catalog display G2A images with lazy loading
- [X] T031 [US2] Update catalog to show game descriptions from G2A data in game cards or detail view
- [X] T032 [US2] Verify catalog displays all G2A metadata (genres, platforms, publisher) correctly
- [ ] T033 [US2] Test catalog filtering by G2A genres and platforms
- [ ] T034 [US2] Test catalog filtering by stock status (`inStockOnly` filter)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently. Catalog page displays all G2A games with complete information and working filters.

---

## Phase 5: User Story 3 - Game Detail Page with Complete G2A Information (Priority: P1)

**Goal**: Game detail page displays complete game information including all images, full description, pricing, availability, platform, region, and activation service from G2A data.

**Independent Test**: Navigate to a game detail page and verify all G2A-synced data is displayed correctly including images (gallery), description, price with markup, availability, platform, region, and activation service.

### Implementation for User Story 3

- [X] T035 [US3] Update `GameDetailPage.jsx` to fetch game from `gamesApi.getGameBySlug()` instead of using mock data
- [X] T036 [US3] Add loading state to `GameDetailPage.jsx` while fetching G2A game data (show skeleton)
- [X] T037 [US3] Add error handling to `GameDetailPage.jsx` for API failures (show 404 or error message)
- [X] T038 [US3] Update `GameDetailPage.jsx` to display all images from G2A `images` array in image gallery
- [X] T039 [US3] Update `GameDetailPage.jsx` to display full description from G2A data
- [X] T040 [US3] Update `GameDetailPage.jsx` to display price with 2% markup from G2A data
- [X] T041 [US3] Update `GameDetailPage.jsx` to display availability status based on `inStock` from G2A
- [X] T042 [US3] Update `GameDetailPage.jsx` to display platform information from G2A `platforms` array
- [X] T043 [US3] Update `GameDetailPage.jsx` to display region information from G2A `region` field
- [X] T044 [US3] Update `GameDetailPage.jsx` to display activation service from G2A `activationService` field
- [X] T045 [US3] Update `GameDetailPage.jsx` to display publisher and developer from G2A data
- [X] T046 [US3] Update `GameDetailPage.jsx` to display genres and tags from G2A data
- [X] T047 [US3] Verify image gallery displays all G2A images correctly with error handling for failed loads

**Checkpoint**: All user stories should now be independently functional. Game detail page shows complete G2A information including all metadata.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories - image loading, error states, performance, and user experience

- [X] T048 [P] Add image lazy loading to all game images across HomePage, CatalogPage, and GameDetailPage
- [X] T049 [P] Implement consistent placeholder image component for failed G2A image loads in `src/components/ui/`
- [X] T050 [P] Add loading skeleton components for game cards and detail pages in `src/components/ui/`
- [X] T051 Update all components to handle empty states when no G2A games are available
- [ ] T052 Add error boundary for G2A API failures to prevent app crashes
- [X] T053 Optimize image loading performance (preload hero images, lazy load catalog images)
- [X] T054 Verify all game prices display with correct currency and markup from backend
- [X] T055 Verify stock status badges display correctly based on G2A `inStock` field
- [X] T056 Add console logging (dev only) for G2A API calls and data fetching
- [X] T057 Remove any remaining mock data usage in production code
- [ ] T058 Run quickstart.md validation checklist to verify all G2A data displays correctly
- [ ] T059 [P] Update documentation in `specs/007-g2a-frontend-display/quickstart.md` with any discovered issues or improvements

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational phase completion
  - User stories can proceed in parallel (if staffed) since they work on different pages
  - Or sequentially in priority order (US1 → US2 → US3)
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories (uses same GameCard component but independently testable)
- **User Story 3 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories (uses same gamesApi but independently testable)

### Within Each User Story

- API service updates before page component updates
- Loading states before error handling
- Basic data display before advanced features (gallery, filters)
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (different pages, no conflicts)
- Polish tasks marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all API method updates in parallel:
Task: "Update getBestSellers() in src/services/gamesApi.ts"
Task: "Update getNewInCatalog() in src/services/gamesApi.ts"
Task: "Update getPreorders() in src/services/gamesApi.ts"

# Launch component updates in parallel (after API updates):
Task: "Update HomePage.jsx to fetch best sellers"
Task: "Update HeroSection.jsx to display featured game"
Task: "Update GameCard.jsx to handle G2A image URLs"
```

---

## Parallel Example: All User Stories

```bash
# Once Foundational phase is complete, all user stories can run in parallel:
Developer A: User Story 1 (HomePage updates)
Developer B: User Story 2 (CatalogPage updates)
Developer C: User Story 3 (GameDetailPage updates)

# All work on different files, no conflicts
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (verify backend)
2. Complete Phase 2: Foundational (update gamesApi) - **CRITICAL - blocks all stories**
3. Complete Phase 3: User Story 1 (HomePage with G2A data)
4. **STOP and VALIDATE**: Test HomePage displays real G2A games independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 (HomePage) → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 (Catalog) → Test independently → Deploy/Demo
4. Add User Story 3 (Detail Page) → Test independently → Deploy/Demo
5. Add Polish phase → Final improvements → Deploy
6. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (HomePage)
   - Developer B: User Story 2 (CatalogPage)
   - Developer C: User Story 3 (GameDetailPage)
3. Stories complete and integrate independently (no conflicts - different files)
4. Team completes Polish phase together

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- All user stories are P1 priority - can be done in any order or parallel
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- Mock data fallback should only be used in development mode
- Production must always use backend API (no mock data)

---

## Task Summary

- **Total Tasks**: 59
- **Phase 1 (Setup)**: 4 tasks
- **Phase 2 (Foundational)**: 8 tasks
- **Phase 3 (User Story 1)**: 12 tasks
- **Phase 4 (User Story 2)**: 10 tasks
- **Phase 5 (User Story 3)**: 13 tasks
- **Phase 6 (Polish)**: 12 tasks

**Parallel Opportunities**: 
- 4 tasks in Setup phase
- 5 tasks in Foundational phase
- Multiple tasks within each user story
- All 3 user stories can run in parallel
- 3 tasks in Polish phase

**MVP Scope**: Phases 1-3 (Setup + Foundational + User Story 1) = 24 tasks
