---
description: "Task list for advanced search and filters feature implementation"
---

# Tasks: Расширенный поиск и фильтры

**Input**: Design documents from `/specs/001-advanced-search-filters/`
**Prerequisites**: plan.md ✅, spec.md ✅, data-model.md ✅, contracts/ ✅

**Tests**: Tests are OPTIONAL and not included in this task list. Add test tasks if TDD approach is requested.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

- **Frontend**: `src/` at repository root
- **Backend**: `backend/src/` at repository root
- All paths are relative to repository root

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project structure verification and preparation

- [x] T001 Verify project structure matches plan.md requirements
- [x] T002 [P] Verify Framer Motion 12.23.25 is installed in package.json
- [x] T003 [P] Verify TypeScript configuration supports path aliases (@/lib/utils)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Create TypeScript type definitions in src/types/search.ts (SearchSuggestion, SavedFilterSet, FilterState, SearchHistoryEntry)
- [ ] T005 [P] Create Prisma migration for extended Game fields (ratingCritic, ratingUser, releaseDate, languages) in backend/prisma/migrations/
- [x] T006 [P] Update backend/src/types/game.ts to include new filter types (rating, releaseDate, languages)
- [x] T007 Update src/services/gamesApi.ts to add autocomplete method signature (implementation in US1)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Улучшенный поиск с автодополнением (Priority: P1) 🎯 MVP

**Goal**: Пользователь может быстро найти игру, начиная вводить название в поле поиска. Система предлагает релевантные варианты по мере ввода.

**Independent Test**: Открыть страницу каталога, начать вводить текст в поле поиска (минимум 2 символа), проверить что появляются релевантные предложения. Функция работает автономно.

### Implementation for User Story 1

- [x] T008 [US1] Create useAutocomplete hook in src/hooks/useAutocomplete.ts with debouncing logic (300ms)
- [x] T009 [US1] Implement autocomplete API endpoint GET /api/games/autocomplete in backend/src/routes/game.routes.ts
- [x] T010 [US1] Implement getGameAutocomplete service method in backend/src/services/game.service.ts with search logic
- [x] T011 [US1] Implement getAutocomplete method in src/services/gamesApi.ts to call backend endpoint
- [x] T012 [US1] Create SearchAutocomplete component in src/components/ui/search-autocomplete.tsx with dropdown, keyboard navigation, and loading states
- [x] T013 [US1] Integrate SearchAutocomplete component into src/pages/CatalogPage.jsx replacing existing search input
- [x] T014 [US1] Add error handling and empty state messaging in SearchAutocomplete component
- [x] T015 [US1] Add ARIA labels and keyboard navigation support (Arrow keys, Enter, Escape) in SearchAutocomplete component

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently. Autocomplete should appear after 2+ characters, debounce at 300ms, and support keyboard navigation.

---

## Phase 4: User Story 2 - Сохранение и восстановление фильтров (Priority: P2)

**Goal**: Пользователь может сохранить набор выбранных фильтров для быстрого доступа в будущем.

**Independent Test**: Выбрать набор фильтров, сохранить их с именем, затем загрузить сохраненный набор и проверить, что все фильтры применены корректно.

### Implementation for User Story 2

- [ ] T016 [US2] Create useSavedFilters hook in src/hooks/useSavedFilters.ts with localStorage operations (key: gkeys_saved_filters)
- [ ] T017 [US2] Implement filter serialization/deserialization logic in useSavedFilters hook
- [ ] T018 [US2] Implement max 10 saved filters limit logic in useSavedFilters hook
- [ ] T019 [US2] Create FilterManager component in src/components/ui/filter-manager.tsx with save/load/delete UI
- [ ] T020 [US2] Add filter naming functionality in FilterManager component
- [ ] T021 [US2] Integrate FilterManager component into src/pages/CatalogPage.jsx
- [ ] T022 [US2] Add validation for corrupted localStorage data in useSavedFilters hook
- [ ] T023 [US2] Add lastUsed timestamp tracking when loading saved filters in useSavedFilters hook

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently. Users can save filter combinations, load them, and delete them.

---

## Phase 5: User Story 3 - Расширенные фильтры (рейтинг, дата выхода, язык) (Priority: P2)

**Goal**: Пользователь может фильтровать игры по дополнительным критериям: рейтингу критиков/пользователей, дате выхода и поддерживаемым языкам.

**Independent Test**: Выбрать фильтры по рейтингу, дате выхода или языку и проверить, что результаты корректно фильтруются согласно выбранным критериям.

### Implementation for User Story 3

- [ ] T024 [US3] Update backend/src/services/game.service.ts to support ratingMin filter parameter in getGames method
- [ ] T025 [US3] Update backend/src/services/game.service.ts to support releaseDateFrom and releaseDateTo filter parameters in getGames method
- [ ] T026 [US3] Update backend/src/services/game.service.ts to support languages array filter parameter in getGames method
- [ ] T027 [US3] Add database indexes for ratingCritic, ratingUser, releaseDate, and languages fields in Prisma schema (if not in migration)
- [ ] T028 [US3] Update src/services/gamesApi.ts getGames method to accept and pass new filter parameters (ratingMin, releaseDateFrom, releaseDateTo, languages)
- [ ] T029 [US3] Create AdvancedFilters component in src/components/catalog/advanced-filters.tsx with rating filter UI (slider or input)
- [ ] T030 [US3] Add release date range picker (year from/to) in AdvancedFilters component
- [ ] T031 [US3] Add language multi-select dropdown in AdvancedFilters component
- [ ] T032 [US3] Integrate AdvancedFilters component into src/pages/CatalogPage.jsx
- [ ] T033 [US3] Update FilterState type usage in CatalogPage to include new extended filter fields
- [ ] T034 [US3] Add validation for filter ranges (rating 0-100, dates valid years) in AdvancedFilters component

**Checkpoint**: At this point, User Stories 1, 2, AND 3 should all work independently. Users can filter by rating, release date, and languages.

---

## Phase 6: User Story 4 - История поиска (Priority: P3)

**Goal**: Пользователь может видеть свою историю поисковых запросов для быстрого повторного поиска ранее использованных запросов.

**Independent Test**: Выполнить несколько поисковых запросов, затем открыть историю и проверить, что предыдущие запросы отображаются и могут быть повторно использованы.

### Implementation for User Story 4

- [ ] T035 [US4] Create useSearchHistory hook in src/hooks/useSearchHistory.ts with localStorage operations (key: gkeys_search_history)
- [ ] T036 [US4] Implement max 10 entries FIFO logic in useSearchHistory hook
- [ ] T037 [US4] Create SearchHistory component in src/components/ui/search-history.tsx with dropdown display of history entries
- [ ] T038 [US4] Add clear history functionality in SearchHistory component
- [ ] T039 [US4] Integrate SearchHistory component with SearchAutocomplete component in src/components/ui/search-autocomplete.tsx
- [ ] T040 [US4] Add history entry creation on search execution in SearchAutocomplete component
- [ ] T041 [US4] Add click handler to apply history entry as search query in SearchHistory component

**Checkpoint**: At this point, all user stories should be independently functional. Users can see search history, select from it, and clear it.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Integration, optimization, and improvements that affect multiple user stories

- [ ] T042 Integrate all new components (SearchAutocomplete, FilterManager, AdvancedFilters, SearchHistory) into src/pages/CatalogPage.jsx
- [ ] T043 Update filter state management in CatalogPage to handle all new filter types (rating, releaseDate, languages)
- [ ] T044 Implement URL parameter synchronization for filter state in CatalogPage (for shareable links)
- [ ] T045 Add loading indicators during search operations in CatalogPage
- [ ] T046 Add error handling for network failures with user-friendly messages in all API calls
- [ ] T047 [P] Add input sanitization to prevent XSS attacks in SearchAutocomplete component
- [ ] T048 [P] Add input sanitization to prevent XSS attacks in all filter inputs
- [ ] T049 Optimize component re-renders with useMemo/useCallback in CatalogPage and filter components
- [ ] T050 Verify mobile responsiveness (min width 320px) for all new components
- [ ] T051 Verify dark theme compatibility for all new components (accent color #b4ff00)
- [ ] T052 Verify keyboard navigation and ARIA labels for accessibility (WCAG 2.1 AA)
- [ ] T053 Verify bundle size is < 1MB gzipped after code splitting
- [ ] T054 Remove console.log and debugger statements from production code
- [ ] T055 Run quickstart.md validation checklist

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-6)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Phase 7)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Uses FilterState type from Foundational, but independently testable
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - Requires database migration from Foundational, but independently testable
- **User Story 4 (P3)**: Can start after Foundational (Phase 2) - Integrates with US1 SearchAutocomplete, but can be tested independently

### Within Each User Story

- Hooks before components (data layer before UI)
- Backend endpoints before frontend integration
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- Backend and frontend tasks within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Backend and frontend can be developed in parallel:
Task: "Implement autocomplete API endpoint GET /api/games/autocomplete in backend/src/routes/game.routes.ts"
Task: "Create useAutocomplete hook in src/hooks/useAutocomplete.ts with debouncing logic (300ms)"
Task: "Create SearchAutocomplete component in src/components/ui/search-autocomplete.tsx with dropdown, keyboard navigation, and loading states"
```

---

## Parallel Example: User Story 3

```bash
# Backend filter support can be developed in parallel:
Task: "Update backend/src/services/game.service.ts to support ratingMin filter parameter in getGames method"
Task: "Update backend/src/services/game.service.ts to support releaseDateFrom and releaseDateTo filter parameters in getGames method"
Task: "Update backend/src/services/game.service.ts to support languages array filter parameter in getGames method"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 (Autocomplete)
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Add User Story 4 → Test independently → Deploy/Demo
6. Complete Polish phase → Final integration and optimization
7. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Autocomplete)
   - Developer B: User Story 2 (Saved Filters)
   - Developer C: User Story 3 (Extended Filters)
   - Developer D: User Story 4 (Search History)
3. Stories complete and integrate independently
4. Team works together on Polish phase

---

## Task Summary

- **Total Tasks**: 55
- **Setup Phase**: 3 tasks
- **Foundational Phase**: 4 tasks
- **User Story 1 (P1 - MVP)**: 8 tasks
- **User Story 2 (P2)**: 8 tasks
- **User Story 3 (P2)**: 11 tasks
- **User Story 4 (P3)**: 7 tasks
- **Polish Phase**: 14 tasks

### Parallel Opportunities Identified

- **Phase 1**: 2 parallel tasks (T002, T003)
- **Phase 2**: 2 parallel tasks (T005, T006)
- **Phase 3 (US1)**: Backend and frontend can be parallel
- **Phase 5 (US3)**: Multiple backend filter updates can be parallel
- **Phase 7**: 2 parallel tasks (T047, T048)

### Independent Test Criteria

- **US1**: Autocomplete appears after 2+ characters, debounce works, keyboard navigation functional
- **US2**: Can save filters with name, load saved filters, delete saved filters - all persist in localStorage
- **US3**: Can filter by rating (min threshold), release date (year range), languages (multi-select) - results update correctly
- **US4**: Search history shows last 10 queries, can select from history, can clear history - persists in localStorage

### Suggested MVP Scope

**MVP = User Story 1 only** (Autocomplete search)
- Provides immediate value (faster game discovery)
- Can be deployed and tested independently
- Foundation for other features
- Meets primary user need

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- Phase 2.1 (Tabs component integration) is already completed per plan.md - not included in tasks
- All components must use TypeScript with strict typing (no `any` without justification)
- All components must follow existing design system (accent color #b4ff00, dark theme)
- Performance goals: Autocomplete < 300ms debounce, results < 1 second, bundle < 1MB gzipped
