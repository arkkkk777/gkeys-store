# Tasks: Profile Design Redesign

**Input**: Design documents from `/specs/005-profile-design-redesign/`
**Prerequisites**: plan.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: Manual testing only - no automated test tasks required for this design update.

**Organization**: Tasks are organized by component/page to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which component/page this task belongs to (e.g., SIDEBAR, EDIT, BALANCE, ORDERS)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/` at repository root
- All paths are relative to repository root

---

## Phase 1: Setup & Preparation

**Purpose**: Prepare for design updates, verify current state

- [X] T001 Review current ProfileSidebar component implementation in src/components/profile/ProfileSidebar.tsx
- [X] T002 Review current ProfileEditPage implementation in src/pages/ProfileEditPage.jsx
- [X] T003 Review current ProfileBalancePage implementation in src/pages/ProfileBalancePage.jsx
- [X] T004 Review current ProfileOrdersPage implementation in src/pages/ProfileOrdersPage.jsx
- [X] T005 [P] Verify design tokens are available in src/styles/design-tokens.ts
- [X] T006 [P] Check responsive breakpoints in design tokens (design-mobile, design-tablet)

**Checkpoint**: Current state understood, ready to begin design updates

---

## Phase 2: ProfileSidebar Component Update (SIDEBAR)

**Goal**: Update left sidebar menu to match screenshot design - simplified menu, proper active states, green logout button

**Independent Test**: Navigate between profile pages and verify sidebar menu matches screenshot design (active state highlighting, green logout, proper spacing)

### Implementation for ProfileSidebar

- [X] T007 [SIDEBAR] Update ProfileSidebar active state background color to match screenshot (light gray #242424 or #333333) in src/components/profile/ProfileSidebar.tsx
- [X] T008 [SIDEBAR] Update ProfileSidebar menu item text colors (white for non-active, proper contrast for active) in src/components/profile/ProfileSidebar.tsx
- [X] T009 [SIDEBAR] Update logout button styling to use bright green text color in src/components/profile/ProfileSidebar.tsx
- [X] T010 [SIDEBAR] Add prop to conditionally show/hide user stats card based on page in src/components/profile/ProfileSidebar.tsx
- [X] T011 [SIDEBAR] Update menu item spacing and padding to match screenshot design in src/components/profile/ProfileSidebar.tsx
- [X] T012 [SIDEBAR] Ensure active state has rounded corners matching screenshot in src/components/profile/ProfileSidebar.tsx
- [X] T013 [SIDEBAR] Update badge styling for "Edit Profile" item (+5 badge) to use green color in src/components/profile/ProfileSidebar.tsx

**Checkpoint**: ProfileSidebar component matches screenshot design, all profile pages use updated sidebar

---

## Phase 3: ProfileEditPage Redesign (EDIT)

**Goal**: Redesign ProfileEditPage form layout to match screenshot - centered avatar/name, proper field alignment, correct button placement

**Independent Test**: Navigate to /profile/edit and verify layout matches screenshot (centered avatar, form fields aligned, Edit buttons positioned correctly)

### Implementation for ProfileEditPage

- [X] T014 [EDIT] Center user avatar and name at top of content area in src/pages/ProfileEditPage.jsx
- [X] T015 [EDIT] Update form field layout and alignment to match screenshot in src/pages/ProfileEditPage.jsx
- [X] T016 [EDIT] Position "Edit" buttons to the right of email field as shown in screenshot in src/pages/ProfileEditPage.jsx
- [X] T017 [EDIT] Update section spacing between Profile Information and Change Password sections in src/pages/ProfileEditPage.jsx
- [X] T018 [EDIT] Update form field labels and input styling to match screenshot (dark backgrounds, proper spacing) in src/pages/ProfileEditPage.jsx
- [X] T019 [EDIT] Ensure "Change password" section has proper spacing and layout in src/pages/ProfileEditPage.jsx
- [X] T020 [EDIT] Update button styling to use green accent color for primary actions in src/pages/ProfileEditPage.jsx
- [X] T021 [EDIT] Update card structure and padding to match screenshot design in src/pages/ProfileEditPage.jsx
- [X] T022 [EDIT] Ensure typography matches screenshot (font sizes, weights, line heights) in src/pages/ProfileEditPage.jsx

**Checkpoint**: ProfileEditPage layout matches screenshot design, all form functionality preserved

---

## Phase 4: ProfileBalancePage Redesign (BALANCE)

**Goal**: Redesign ProfileBalancePage to match screenshot - centered avatar/name, consolidated balance card with all sections

**Independent Test**: Navigate to /profile/balance and verify layout matches screenshot (centered avatar, single card with all sections, proper spacing)

### Implementation for ProfileBalancePage

- [X] T023 [BALANCE] Center user avatar and name at top of content area in src/pages/ProfileBalancePage.jsx
- [X] T024 [BALANCE] Ensure all balance sections (balance info, promo code, payment methods) are within single card in src/pages/ProfileBalancePage.jsx
- [X] T025 [BALANCE] Update spacing between balance card sections to match screenshot in src/pages/ProfileBalancePage.jsx
- [X] T026 [BALANCE] Update balance card structure and padding to match screenshot design in src/pages/ProfileBalancePage.jsx
- [X] T027 [BALANCE] Update PromoCodeSection styling to match screenshot (input field, button placement) in src/components/profile/PromoCodeSection.tsx
- [X] T028 [BALANCE] Update PaymentMethodsSection styling to match screenshot (radio buttons, button styling) in src/components/profile/PaymentMethodsSection.tsx
- [X] T029 [BALANCE] Ensure "Proceed to pay" button uses green accent color and proper styling in src/components/profile/PaymentMethodsSection.tsx
- [X] T030 [BALANCE] Update card width and max-width to match screenshot layout in src/pages/ProfileBalancePage.jsx
- [X] T031 [BALANCE] Ensure proper alignment of balance card content area in src/pages/ProfileBalancePage.jsx

**Checkpoint**: ProfileBalancePage layout matches screenshot design, all functionality preserved

---

## Phase 5: ProfileOrdersPage Verification (ORDERS)

**Goal**: Verify ProfileOrdersPage design consistency with other profile pages

**Independent Test**: Navigate to /profile/orders and verify design is consistent with other profile pages

### Implementation for ProfileOrdersPage

- [X] T032 [ORDERS] Verify ProfileOrdersPage uses updated ProfileSidebar component in src/pages/ProfileOrdersPage.jsx
- [X] T033 [ORDERS] Check order card layout matches overall design system in src/pages/ProfileOrdersPage.jsx
- [X] T034 [ORDERS] Verify spacing and typography consistency with other profile pages in src/pages/ProfileOrdersPage.jsx
- [X] T035 [ORDERS] Update order card styling if needed to match design system in src/pages/ProfileOrdersPage.jsx
- [X] T036 [ORDERS] Ensure status badges use consistent styling across all profile pages in src/pages/ProfileOrdersPage.jsx

**Checkpoint**: ProfileOrdersPage design is consistent with other profile pages

---

## Phase 6: Responsive Design & Polish

**Purpose**: Ensure responsive behavior and final polish across all profile pages

- [X] T037 [P] Verify left sidebar stacks or collapses properly on mobile viewports (design-mobile breakpoint)
- [X] T038 [P] Verify content area is full width on mobile viewports for all profile pages
- [X] T039 [P] Verify form fields stack vertically on mobile for ProfileEditPage
- [X] T040 [P] Verify cards are full width on mobile for all profile pages
- [X] T041 [P] Verify touch targets meet 44x44px minimum on mobile
- [X] T042 [P] Test all profile pages on desktop viewport (1920x1080)
- [X] T043 [P] Test all profile pages on tablet viewport (768x1024)
- [X] T044 [P] Test all profile pages on mobile viewport (375x667)
- [X] T045 [P] Verify no horizontal scrolling on any viewport
- [X] T046 [P] Verify design tokens are used consistently across all profile pages
- [X] T047 [P] Verify color scheme matches screenshots (dark background, green accents)
- [X] T048 [P] Verify typography consistency across all profile pages
- [X] T049 [P] Verify spacing consistency across all profile pages
- [X] T050 [P] Verify all interactive elements work correctly (buttons, inputs, links)
- [X] T051 [P] Run quickstart.md validation checklist from specs/005-profile-design-redesign/quickstart.md

**Checkpoint**: All profile pages are responsive, consistent, and match screenshot design

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **ProfileSidebar (Phase 2)**: Can start after Setup - BLOCKS other profile pages
- **ProfileEditPage (Phase 3)**: Depends on ProfileSidebar completion
- **ProfileBalancePage (Phase 4)**: Depends on ProfileSidebar completion
- **ProfileOrdersPage (Phase 5)**: Depends on ProfileSidebar completion
- **Responsive & Polish (Phase 6)**: Depends on all previous phases

### Component Dependencies

- **ProfileSidebar**: Must be updated first as all pages use it
- **ProfileEditPage**: Independent after ProfileSidebar
- **ProfileBalancePage**: Independent after ProfileSidebar (can run in parallel with ProfileEditPage)
- **ProfileOrdersPage**: Independent after ProfileSidebar (can run in parallel with other pages)
- **PromoCodeSection & PaymentMethodsSection**: Used by ProfileBalancePage, can be updated in Phase 4

### Within Each Phase

- Setup tasks can run in any order
- ProfileSidebar tasks should be sequential (styling updates build on each other)
- ProfileEditPage tasks should be sequential (layout updates build on each other)
- ProfileBalancePage tasks should be sequential (card structure updates build on each other)
- ProfileOrdersPage tasks can run in parallel
- Responsive tasks marked [P] can run in parallel

### Parallel Opportunities

- **Phase 1**: T005 and T006 can run in parallel
- **Phase 2**: Most tasks are sequential (styling builds on previous)
- **Phase 3 & 4**: Can run in parallel after Phase 2 (different pages)
- **Phase 5**: Can run in parallel with Phase 3 & 4 after Phase 2
- **Phase 6**: All tasks marked [P] can run in parallel

---

## Parallel Example: After ProfileSidebar Completion

```bash
# Launch ProfileEditPage and ProfileBalancePage updates in parallel:
Task: "Center user avatar and name at top of content area in src/pages/ProfileEditPage.jsx"
Task: "Center user avatar and name at top of content area in src/pages/ProfileBalancePage.jsx"

# Launch responsive testing in parallel:
Task: "Verify left sidebar stacks or collapses properly on mobile viewports"
Task: "Verify content area is full width on mobile viewports for all profile pages"
Task: "Test all profile pages on desktop viewport (1920x1080)"
```

---

## Implementation Strategy

### MVP First (ProfileSidebar + One Page)

1. Complete Phase 1: Setup & Preparation
2. Complete Phase 2: ProfileSidebar Component Update
3. Complete Phase 3: ProfileEditPage Redesign
4. **STOP and VALIDATE**: Test ProfileEditPage matches screenshot
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + ProfileSidebar → Sidebar ready for all pages
2. Add ProfileEditPage → Test independently → Deploy/Demo
3. Add ProfileBalancePage → Test independently → Deploy/Demo
4. Add ProfileOrdersPage → Test independently → Deploy/Demo
5. Add Responsive & Polish → Final validation → Deploy/Demo
6. Each page adds value without breaking previous pages

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + ProfileSidebar together
2. Once ProfileSidebar is done:
   - Developer A: ProfileEditPage
   - Developer B: ProfileBalancePage
   - Developer C: ProfileOrdersPage
3. Pages complete and integrate independently
4. All developers: Responsive & Polish phase

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific component/page for traceability
- Each component/page should be independently completable and testable
- Verify design matches screenshots after each phase
- Commit after each task or logical group
- Stop at any checkpoint to validate component independently
- Avoid: vague tasks, same file conflicts, cross-component dependencies that break independence
- All design updates must use design tokens from src/styles/design-tokens.ts
- Maintain existing functionality while updating design
- Ensure responsive behavior is preserved

---

## Summary

- **Total Tasks**: 51
- **Setup Tasks**: 6 (Phase 1)
- **ProfileSidebar Tasks**: 7 (Phase 2)
- **ProfileEditPage Tasks**: 9 (Phase 3)
- **ProfileBalancePage Tasks**: 9 (Phase 4)
- **ProfileOrdersPage Tasks**: 5 (Phase 5)
- **Responsive & Polish Tasks**: 15 (Phase 6)
- **Parallel Opportunities**: Multiple tasks in Phase 1, Phase 6, and between Phase 3-5 after Phase 2
- **Suggested MVP Scope**: Phase 1 + Phase 2 + Phase 3 (ProfileSidebar + ProfileEditPage)
