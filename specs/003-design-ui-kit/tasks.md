# Tasks: New Games Section Design Update

**Input**: Design documents from `/specs/003-design-ui-kit/`
**Prerequisites**: plan.md ✓, research.md ✓, data-model.md ✓, contracts/ ✓, quickstart.md ✓

**Tests**: No test tasks included (not requested in feature specification)

**Organization**: Tasks are organized by implementation phase. This is a focused UI component update to match screenshot design exactly.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Not applicable - this is a single focused feature
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `src/` at repository root
- Paths shown below use absolute paths from repository root

---

## Phase 1: Configuration Update

**Purpose**: Enable carousel mode for "new-games" section

- [X] T001 Update homepageSections.ts to enable carousel for "new-games" section in src/config/homepageSections.ts (change carousel: false to carousel: true on line 73)

**Checkpoint**: "new-games" section will use carousel layout instead of grid

---

## Phase 2: Section Container Styling

**Purpose**: Add dark container with rounded corners and padding for description sections

- [X] T002 Update GameSection.jsx to add dark container wrapper when description prop exists in src/components/GameSection.jsx (add conditional container with backgroundColor: colors.surface, borderRadius: 24px, padding: 32px 40px)

**Checkpoint**: Sections with description now have dark container background

---

## Phase 3: Typography Updates

**Purpose**: Update title and subtitle typography to match screenshot specifications

- [X] T003 Update title typography in GameSection.jsx for description sections in src/components/GameSection.jsx (fontSize: 2.5rem, fontWeight: 700, color: colors.text)
- [X] T004 Update subtitle typography in GameSection.jsx for description sections in src/components/GameSection.jsx (fontSize: 1.125rem, fontWeight: 400, color: colors.textSecondary, margin: 12px 0 0 0)

**Checkpoint**: Title and subtitle match screenshot typography specifications

---

## Phase 4: Game Card Updates

**Purpose**: Add "New" badge and update price overlay styling

- [X] T005 [P] Add PinIcon component to GameCard.jsx in src/components/GameCard.jsx (create SVG pin icon component)
- [X] T006 [P] Add "New" badge rendering logic to GameCard.jsx in src/components/GameCard.jsx (check game.isNew or showNewBadge prop, position top-right, use colors.accent background, include PinIcon)
- [X] T007 [P] Update price overlay gradient in GameCard.jsx in src/components/GameCard.jsx (update background gradient to: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 50%, transparent 100%))

**Checkpoint**: Game cards display "New" badge and updated price overlay

---

## Phase 5: Button and Decorative Elements

**Purpose**: Update "Check all" button styling and add decorative background

- [X] T008 Update "Check all" button styling in GameSection.jsx for description sections in src/components/GameSection.jsx (center button, use colors.accent background, black text, padding: 12px 32px)
- [X] T009 Add decorative background gradient to section container in GameSection.jsx in src/components/GameSection.jsx (add backgroundImage with gradient: linear-gradient(135deg, rgba(0, 200, 194, 0.05) 0%, rgba(26, 26, 26, 0.8) 50%, rgba(0, 0, 0, 0.1) 100%))

**Checkpoint**: Button is centered and styled, decorative background is visible

---

## Phase 6: Verification & Polish

**Purpose**: Verify implementation matches screenshot and ensure responsive behavior

- [ ] T010 [P] Visual inspection: Verify section container matches screenshot (dark background, rounded corners, padding) in browser (REQUIRES MANUAL VERIFICATION)
- [ ] T011 [P] Visual inspection: Verify title and subtitle typography match screenshot (large title, medium subtitle) in browser (REQUIRES MANUAL VERIFICATION)
- [ ] T012 [P] Visual inspection: Verify carousel displays 4 cards horizontally with navigation arrows in browser (REQUIRES MANUAL VERIFICATION)
- [ ] T013 [P] Visual inspection: Verify game cards have "New" badge with pin icon in top-right corner in browser (REQUIRES MANUAL VERIFICATION)
- [ ] T014 [P] Visual inspection: Verify price displays in bottom-left with gradient overlay in browser (REQUIRES MANUAL VERIFICATION)
- [ ] T015 [P] Visual inspection: Verify "Check all" button is centered below carousel with accent color in browser (REQUIRES MANUAL VERIFICATION)
- [ ] T016 [P] Visual inspection: Verify decorative background is visible behind title/subtitle in browser (REQUIRES MANUAL VERIFICATION)
- [X] T017 [P] Verify all colors use design tokens (no hardcoded colors) using grep search
- [ ] T018 [P] Test responsive behavior on mobile/tablet/desktop viewports (REQUIRES MANUAL VERIFICATION)
- [X] T019 Build and test application: `npm run build && npm run preview`

**Checkpoint**: Implementation complete and verified against screenshot

---

## Dependencies & Execution Order

### Phase Dependencies

- **Configuration (Phase 1)**: No dependencies - can start immediately
- **Container Styling (Phase 2)**: Depends on Phase 1 (carousel must be enabled)
- **Typography (Phase 3)**: Depends on Phase 2 (container must exist)
- **Game Card Updates (Phase 4)**: Can run in parallel with Phase 3 (different component)
- **Button and Decorative (Phase 5)**: Depends on Phase 2 (container must exist)
- **Verification (Phase 6)**: Depends on all previous phases completion

### Task Dependencies

- **T001**: No dependencies - can start immediately
- **T002**: Depends on T001 (carousel should be enabled)
- **T003, T004**: Both depend on T002 (container must exist)
  - T003 and T004 can run in parallel (different style properties)
- **T005, T006, T007**: All can run in parallel (different parts of GameCard component)
- **T008, T009**: Both depend on T002 (container must exist)
  - T008 and T009 can run in parallel (different styling aspects)
- **T010-T019**: All depend on T001-T009 completion
  - T010-T019 can run in parallel (different verification activities)

### Parallel Opportunities

- **Phase 3**: Tasks T003 and T004 can run in parallel (different typography properties)
- **Phase 4**: Tasks T005, T006, T007 can run in parallel (different parts of GameCard)
- **Phase 5**: Tasks T008 and T009 can run in parallel (different styling aspects)
- **Phase 6**: Tasks T010-T019 can run in parallel (different verification activities)

---

## Parallel Example: Game Card Updates

```bash
# Launch all GameCard updates together (Phase 4):
Task: "Add PinIcon component to GameCard.jsx in src/components/GameCard.jsx"
Task: "Add 'New' badge rendering logic to GameCard.jsx in src/components/GameCard.jsx"
Task: "Update price overlay gradient in GameCard.jsx in src/components/GameCard.jsx"
```

---

## Implementation Strategy

### Sequential Execution (Recommended)

1. **Phase 1**: Enable carousel in configuration
2. **Phase 2**: Add container styling for description sections
3. **Phase 3**: Update typography (can parallelize T003-T004)
4. **Phase 4**: Update game cards (can parallelize T005-T007)
5. **Phase 5**: Update button and decorative elements (can parallelize T008-T009)
6. **Phase 6**: Verify and test (can parallelize T010-T019)

### Quick Validation Points

- After Phase 1: Check that "new-games" section uses carousel layout
- After Phase 2: Check that section has dark container background
- After Phase 3: Check that title is large (2.5rem) and subtitle is medium (1.125rem)
- After Phase 4: Check that "New" badge appears on game cards
- After Phase 5: Check that button is centered and decorative background is visible
- After Phase 6: Visual comparison with screenshot

### MVP Scope

This entire feature is the MVP - it's a focused, single-purpose update:
- Update section configuration
- Add container styling
- Update typography
- Add "New" badge to cards
- Update button styling
- Add decorative background
- Verify completion

---

## Notes

- [P] tasks = different files or different parts of same file, no dependencies
- All tasks are specific with exact file paths and line numbers where applicable
- Design tokens must be used for all colors, spacing, and typography
- Accent color is `#00C8C2` from design tokens (not `#b4ff00` from screenshot)
- Screenshot structure must be matched exactly
- Responsive behavior must be maintained
- All visual elements must use design tokens for consistency

---

## Success Criteria Checklist

- [ ] Carousel enabled for "new-games" section in configuration
- [ ] Section container has dark background (#1A1A1A) with rounded corners (24px)
- [ ] Title is large (2.5rem) and bold (700), white color
- [ ] Subtitle is medium (1.125rem) and regular (400), light gray color
- [ ] Carousel displays 4 cards horizontally with navigation arrows
- [ ] Game cards have "New" badge with pin icon in top-right corner
- [ ] Price displays in bottom-left with gradient overlay
- [ ] "Check all" button is centered below carousel with accent color (#00C8C2)
- [ ] Decorative background is visible behind title/subtitle
- [ ] All colors use design tokens (no hardcoded values)
- [ ] Responsive behavior maintained on all viewports
- [ ] Visual inspection confirms 100% structure match to screenshot
