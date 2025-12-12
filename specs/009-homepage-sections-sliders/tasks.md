# Tasks: Homepage Sections & Sliders Enhancement

**Input**: Design documents from `/specs/009-homepage-sections-sliders/`
**Prerequisites**: plan.md, spec.md, data-model.md, contracts/, research.md, quickstart.md

**Tests**: Tests are OPTIONAL for this feature - not explicitly requested in spec. Focus on implementation tasks.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

- Frontend project: `src/` at repository root
- Components: `src/components/`
- Pages: `src/pages/`
- Services: `src/services/`
- Data: `src/data/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare types and configuration for sections

- [X] T001 Create SectionConfig TypeScript interface in `src/types/sections.ts` based on data-model.md
- [X] T002 [P] Create SectionState TypeScript interface in `src/types/sections.ts`
- [X] T003 [P] Create AnimationConfig TypeScript interface in `src/types/sections.ts`
- [X] T004 [P] Create section configuration constants array in `src/config/homepageSections.ts` with all 12 sections from spec.md

---

## Phase 2: User Story 1 - Additional Game Sections Display (Priority: P1) 🎯 MVP

**Goal**: Display multiple game sections (Action, Open World, Former Sony Exclusives, Noir, Remakes, RPG, etc.) on the homepage with proper loading and empty states.

**Independent Test**: Navigate to homepage and verify all 12 sections display with games. Each section should have a title, "Check all" link, and handle loading/empty states gracefully.

### Implementation for User Story 1

- [X] T005 [US1] Update HomePage.jsx to import section configurations from `src/config/homepageSections.ts`
- [X] T006 [US1] Add state management in HomePage.jsx for section data using useState hooks (one state per section or unified state object)
- [X] T007 [US1] Implement fetchSectionData helper function in HomePage.jsx that calls appropriate gamesApi method based on SectionConfig
- [X] T008 [US1] Implement parallel data fetching in HomePage.jsx useEffect using Promise.allSettled for all sections
- [X] T009 [US1] Add loading state handling in HomePage.jsx - show skeleton loaders for each section while loading
- [X] T010 [US1] Add error state handling in HomePage.jsx - gracefully handle API failures with fallback to mock data
- [X] T011 [US1] Render Best Sellers section in HomePage.jsx with GameSection component, passing games, title, tabs, and checkAllLink
- [X] T012 [US1] Render New in the Catalog section in HomePage.jsx with GameSection component (carousel mode)
- [X] T013 [US1] Render Preorders section in HomePage.jsx with GameSection component (carousel mode, 5 columns)
- [X] T014 [US1] Render New Games section in HomePage.jsx with GameSection component (description box, 4 columns)
- [X] T015 [US1] Render Action section in HomePage.jsx with GameSection component (6 columns)
- [X] T016 [US1] Render Open World section in HomePage.jsx with GameSection component (6 columns)
- [X] T017 [US1] Render Former Sony Exclusives section in HomePage.jsx with GameSection component (6 columns)
- [X] T018 [US1] Render Noir section in HomePage.jsx with GameSection component (description box, 4 columns)
- [X] T019 [US1] Render Remakes / Remasters / Reboots section in HomePage.jsx with GameSection component (5 columns)
- [X] T020 [US1] Render Role-Playing (RPG) section in HomePage.jsx with GameSection component (5 columns)
- [X] T021 [US1] Render Random Picks section in HomePage.jsx with special styling (existing implementation, ensure it uses fetched data)
- [X] T022 [US1] Add empty state handling in HomePage.jsx - show "No games available" message when section has no games
- [X] T023 [US1] Verify all sections display correctly with proper titles, checkAll links, and game cards

**Checkpoint**: At this point, all 12 sections should display on homepage with data from API or mock fallback. Each section should handle loading and empty states.

---

## Phase 3: User Story 2 - Animated Sliders with Framer Motion (Priority: P1)

**Goal**: Implement smooth Framer Motion animations for game sections - entrance animations, staggered card animations, and respect for prefers-reduced-motion.

**Independent Test**: Scroll through homepage and verify sections fade in smoothly as they enter viewport. Game cards should animate in with stagger effect. Check DevTools to verify 60fps performance. Enable prefers-reduced-motion and verify animations are disabled.

### Implementation for User Story 2

- [ ] T024 [US2] Check for prefers-reduced-motion preference in HomePage.jsx using window.matchMedia and store in state
- [ ] T025 [US2] Create animation variants object in HomePage.jsx or separate file following existing patterns (containerVariants, itemVariants from GameSection)
- [ ] T026 [US2] Update GameSection.jsx to accept animation config prop (enabled, staggerDelay, duration) from SectionConfig
- [ ] T027 [US2] Enhance GameSection.jsx motion.div to use animation config props with fallback to defaults (staggerDelay: 0.05s, duration: 0.3s)
- [ ] T028 [US2] Update GameSection.jsx to disable animations when prefers-reduced-motion is true (instant transitions or no animation)
- [ ] T029 [US2] Ensure GameSection.jsx grid animations use whileInView with viewport={{ once: true }} to animate only once
- [ ] T030 [US2] Verify GameCard.jsx hover animations (whileHover, whileTap) work correctly with Framer Motion
- [ ] T031 [US2] Add entrance animation to section containers in HomePage.jsx using motion.section or motion.div with fade-in
- [ ] T032 [US2] Test animation performance in Chrome DevTools Performance tab - verify 60fps during scroll
- [ ] T033 [US2] Add will-change: transform CSS property to animated elements for GPU acceleration
- [ ] T034 [US2] Verify animations respect prefers-reduced-motion by testing with browser DevTools reduced motion emulation

**Checkpoint**: All sections should have smooth entrance animations. Cards should stagger in smoothly. Animations should be disabled when user prefers reduced motion. Performance should be 60fps.

---

## Phase 4: User Story 3 - Data Integration - G2A API + Mock + Fallback (Priority: P1)

**Goal**: Implement robust data fetching strategy using G2A API as primary source, mock data as fallback, with optimized parallel requests and graceful error handling.

**Independent Test**: Test with backend running (API works), then stop backend (API fails) and verify mock data fallback works. Check Network tab to verify parallel requests. Verify error messages are user-friendly.

### Implementation for User Story 3

- [ ] T035 [US3] Verify gamesApi.getBestSellers() method exists and works correctly in `src/services/gamesApi.ts`
- [ ] T036 [US3] Verify gamesApi.getNewInCatalog() method exists and works correctly in `src/services/gamesApi.ts`
- [ ] T037 [US3] Verify gamesApi.getPreorders() method exists and works correctly in `src/services/gamesApi.ts`
- [ ] T038 [US3] Verify gamesApi.getNewGames() method exists and works correctly in `src/services/gamesApi.ts`
- [ ] T039 [US3] Verify gamesApi.getGamesByGenre(genre) method exists and works correctly in `src/services/gamesApi.ts`
- [ ] T040 [US3] Verify gamesApi.getRandomGames(count) method exists and works correctly in `src/services/gamesApi.ts`
- [ ] T041 [US3] Verify gamesApi.getCollections() method exists and works correctly in `src/services/gamesApi.ts`
- [ ] T042 [US3] Implement fetchSectionData function in HomePage.jsx that maps SectionConfig.dataSource to appropriate gamesApi method
- [ ] T043 [US3] Implement data fetching for Best Sellers section in HomePage.jsx using gamesApi.getBestSellers()
- [ ] T044 [US3] Implement data fetching for New in Catalog section in HomePage.jsx using gamesApi.getNewInCatalog()
- [ ] T045 [US3] Implement data fetching for Preorders section in HomePage.jsx using gamesApi.getPreorders()
- [ ] T046 [US3] Implement data fetching for New Games section in HomePage.jsx using gamesApi.getNewGames()
- [ ] T047 [US3] Implement data fetching for Action section in HomePage.jsx using gamesApi.getGamesByGenre('Action')
- [ ] T048 [US3] Implement data fetching for Open World section in HomePage.jsx using gamesApi.getGamesByGenre('Open World')
- [ ] T049 [US3] Implement data fetching for Former Sony Exclusives section in HomePage.jsx using gamesApi.getCollections() and filtering for Sony collection
- [ ] T050 [US3] Implement data fetching for Noir section in HomePage.jsx using gamesApi.getGamesByGenre('Noir')
- [ ] T051 [US3] Implement data fetching for Remakes section in HomePage.jsx using gamesApi.getCollections() and filtering for Remakes collection
- [ ] T052 [US3] Implement data fetching for RPG section in HomePage.jsx using gamesApi.getGamesByGenre('RPG')
- [ ] T053 [US3] Implement data fetching for Random Picks section in HomePage.jsx using gamesApi.getRandomGames(4)
- [ ] T054 [US3] Update fetchSectionData in HomePage.jsx to handle API errors gracefully - catch errors and log warnings
- [ ] T055 [US3] Verify mock data fallback works in development mode when API fails (gamesApi already handles this)
- [ ] T056 [US3] Implement Promise.allSettled for parallel fetching in HomePage.jsx useEffect to fetch all sections simultaneously
- [ ] T057 [US3] Add error state per section in HomePage.jsx state management to track which sections failed
- [ ] T058 [US3] Display user-friendly error messages in HomePage.jsx when section fails to load (optional - can use empty state)
- [ ] T059 [US3] Verify data fetching is optimized - check Network tab shows parallel requests, not sequential

**Checkpoint**: All sections should fetch data from G2A API when available. When API fails, mock data should be used automatically (handled by gamesApi). Data fetching should be parallel and optimized.

---

## Phase 5: User Story 4 - Responsive Slider/Carousel Components (Priority: P2)

**Goal**: Ensure game sections display correctly as responsive carousels/sliders on mobile, tablet, and desktop with proper column counts and touch/swipe support.

**Independent Test**: Test homepage on different screen sizes (mobile 375px, tablet 768px, desktop 1920px). Verify column counts are correct. Test carousel navigation buttons. Test touch/swipe on mobile device or emulator.

### Implementation for User Story 4

- [ ] T060 [US4] Verify GameSection.jsx responsive breakpoints are correct (600px, 900px, 1200px) in existing CSS
- [ ] T061 [US4] Verify GameSection.jsx grid columns adapt correctly: 6→4→3→2 for desktop→tablet→mobile-tablet→mobile
- [ ] T062 [US4] Verify GameSection.jsx carousel mode works correctly with scrollRef and scrollBy functionality
- [ ] T063 [US4] Test carousel prev/next buttons in GameSection.jsx work correctly on desktop
- [ ] T064 [US4] Verify carousel buttons are hidden on mobile (<600px) in GameSection.jsx CSS
- [ ] T065 [US4] Test touch/swipe functionality on carousel sections in GameSection.jsx (native scroll should work)
- [ ] T066 [US4] Verify scroll-snap works correctly in GameSection.jsx carousel (cards snap into place)
- [ ] T067 [US4] Test Best Sellers section displays 6 columns on desktop, adapts on smaller screens
- [ ] T068 [US4] Test Preorders section displays 5 columns on desktop, adapts on smaller screens
- [ ] T069 [US4] Test New Games section displays 4 columns on desktop, adapts on smaller screens
- [ ] T070 [US4] Verify all sections maintain proper spacing and gap on all screen sizes
- [ ] T071 [US4] Test GameCard component displays correctly at different sizes (small, medium)
- [ ] T072 [US4] Verify touch targets are at least 44x44px for mobile accessibility
- [ ] T073 [US4] Test responsive behavior in Chrome DevTools device emulation for mobile, tablet, desktop
- [ ] T074 [US4] Verify no horizontal scroll issues on mobile devices

**Checkpoint**: All sections should display correctly on mobile, tablet, and desktop. Carousel functionality should work with buttons on desktop and touch/swipe on mobile. Column counts should adapt correctly to screen size.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final improvements, performance optimization, accessibility, and validation

- [ ] T075 [P] Add React.memo to GameCard component if not already memoized in `src/components/GameCard.jsx`
- [ ] T076 [P] Add useMemo to section data in HomePage.jsx to prevent unnecessary re-renders
- [ ] T077 [P] Add useCallback to data fetching functions in HomePage.jsx to prevent recreation on each render
- [ ] T078 [P] Verify images use loading="lazy" in GameCard.jsx for performance
- [ ] T079 [P] Add ARIA labels to carousel buttons in GameSection.jsx for accessibility
- [ ] T080 [P] Add ARIA labels to section headings in HomePage.jsx for screen readers
- [ ] T081 [P] Verify keyboard navigation works for all interactive elements (tabs, carousel buttons, check all links)
- [ ] T082 [P] Test with screen reader (VoiceOver/NVDA) to verify accessibility
- [ ] T083 [P] Run Lighthouse audit and verify performance score meets requirements (< 3s load, < 4s TTI, 60fps)
- [ ] T084 [P] Verify no console errors or warnings in browser console
- [ ] T085 [P] Verify no layout shift (CLS) during page load using Chrome DevTools
- [ ] T086 [P] Test all "Check all" links navigate to correct catalog pages with proper query parameters
- [ ] T087 [P] Verify Best Sellers tabs filter games correctly when clicked
- [ ] T088 [P] Run quickstart.md validation tests to ensure all acceptance criteria are met
- [ ] T089 [P] Code cleanup - remove any console.log statements, commented code, or unused imports
- [ ] T090 [P] Verify ESLint passes with no errors or warnings
- [ ] T091 [P] Verify Prettier formatting is applied consistently

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **User Story 1 (Phase 2)**: Depends on Setup completion (types and configs)
- **User Story 2 (Phase 3)**: Can start after US1 or in parallel (animations don't depend on data)
- **User Story 3 (Phase 4)**: Depends on US1 (data fetching integrates with sections from US1)
- **User Story 4 (Phase 5)**: Depends on US1 (responsive behavior for sections from US1)
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Setup (Phase 1) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Setup (Phase 1) - Can work in parallel with US1 (animations are independent)
- **User Story 3 (P1)**: Depends on US1 completion (needs sections to fetch data for)
- **User Story 4 (P2)**: Depends on US1 completion (needs sections to make responsive)

### Within Each User Story

- Setup tasks (types, configs) before implementation
- Data fetching before rendering
- Core implementation before polish
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks (T001-T004) marked [P] can run in parallel
- US1 and US2 can be worked on in parallel (different concerns - data vs animations)
- US3 and US4 can be worked on in parallel after US1 (different concerns - data fetching vs responsive)
- All Polish tasks marked [P] can run in parallel

---

## Parallel Example: Setup Phase

```bash
# Launch all setup tasks together:
Task: "Create SectionConfig TypeScript interface in src/types/sections.ts"
Task: "Create SectionState TypeScript interface in src/types/sections.ts"
Task: "Create AnimationConfig TypeScript interface in src/types/sections.ts"
Task: "Create section configuration constants array in src/config/homepageSections.ts"
```

---

## Parallel Example: User Story 1

```bash
# After setup, can work on data fetching and rendering in parallel:
Task: "Add state management in HomePage.jsx"
Task: "Implement fetchSectionData helper function in HomePage.jsx"
Task: "Implement parallel data fetching in HomePage.jsx useEffect"

# Then render sections (can be done in parallel for different sections):
Task: "Render Best Sellers section in HomePage.jsx"
Task: "Render New in the Catalog section in HomePage.jsx"
Task: "Render Preorders section in HomePage.jsx"
# ... etc for all sections
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (types and configs)
2. Complete Phase 2: User Story 1 (all sections display)
3. **STOP and VALIDATE**: Test that all 12 sections display correctly with data
4. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup → Types and configs ready
2. Add User Story 1 → All sections display → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Animations work → Test independently → Deploy/Demo
4. Add User Story 3 → Data fetching optimized → Test independently → Deploy/Demo
5. Add User Story 4 → Responsive behavior → Test independently → Deploy/Demo
6. Polish → Final optimizations → Deploy/Demo

### Parallel Team Strategy

With multiple developers:

1. Developer A: Setup (Phase 1) → User Story 1 (Phase 2)
2. Developer B: User Story 2 (Phase 3) - can start after Setup, works in parallel with US1
3. Developer C: User Story 3 (Phase 4) - starts after US1 complete
4. Developer D: User Story 4 (Phase 5) - starts after US1 complete
5. All: Polish (Phase 6) - after all stories complete

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- Tests are optional - not included in this task list as not explicitly requested
- G2A website scraping is deferred (requires backend proxy) - using API + mock data only

---

## Task Summary

- **Total Tasks**: 91
- **Setup Tasks**: 4 (T001-T004)
- **User Story 1 Tasks**: 19 (T005-T023)
- **User Story 2 Tasks**: 11 (T024-T034)
- **User Story 3 Tasks**: 25 (T035-T059)
- **User Story 4 Tasks**: 15 (T060-T074)
- **Polish Tasks**: 17 (T075-T091)

**Parallel Opportunities**: 
- Setup phase: 4 tasks can run in parallel
- US1 and US2: Can work in parallel (different files/concerns)
- US3 and US4: Can work in parallel after US1 (different concerns)
- Polish phase: 17 tasks can run in parallel

**Suggested MVP Scope**: Setup (Phase 1) + User Story 1 (Phase 2) = 23 tasks
