# Implementation Plan: Profile Design Redesign

**Branch**: `005-profile-design-redesign` | **Date**: 2024-12-08 | **Spec**: `/specs/005-profile-design-redesign/spec.md`
**Input**: User request: "Доработай личный кабинет а именно дизайн так чтобы было как на скриншотах. Меню слева справа контент."

## Summary

Redesign the personal account (личный кабинет) pages to match the provided screenshots. The design should follow a consistent two-column layout: left sidebar menu and right content area. Key improvements include:

- Consistent left sidebar navigation across all profile pages
- Proper content alignment and spacing in the right area
- Match visual design from screenshots (dark theme, green accents, proper card layouts)
- Ensure all profile pages (Edit Profile, Balance, Orders) follow the same design pattern

**Technical Approach**: 
- Update ProfileSidebar component to match screenshot design (simplified menu, proper styling)
- Redesign ProfileEditPage to match screenshot layout (fields, buttons, sections)
- Redesign ProfileBalancePage to match screenshot layout (balance card, payment methods)
- Ensure consistent spacing, typography, and color scheme across all profile pages
- Maintain responsive design for mobile devices

## Technical Context

**Language/Version**: TypeScript 5.9.3, React 19.2.0
**Primary Dependencies**: Tailwind CSS 3.4.18, Framer Motion 12.23.25, React Router 7.10.0
**Storage**: N/A (frontend-only changes)
**Testing**: Manual testing on desktop and mobile viewports, browser dev tools responsive mode
**Target Platform**: Web (desktop-first with mobile adaptation)
**Project Type**: Web application (React SPA)
**Performance Goals**: Maintain current performance, ensure no layout shift
**Constraints**: 
- Must maintain existing design system tokens
- Must preserve existing functionality
- Must maintain responsive breakpoints (design-mobile: 320px, design-tablet: 768px)
- Must follow existing component patterns
**Scale/Scope**: ~4 profile pages/components requiring design updates

## Constitution Check

### Type Safety First
- [x] All code will be fully typed with TypeScript (no `any` without justification)
- [x] Type definitions will be comprehensive and accurate
- [x] Strict TypeScript configuration will be maintained

### Component-Driven Architecture (Frontend features)
- [x] Components will be modular, reusable, and self-contained
- [x] Single responsibility principle will be followed
- [x] Components will be independently testable
- [x] Composition over inheritance will be preferred
- [x] Functional components with hooks will be used

### Performance Optimization
- [x] Code splitting strategy defined for vendor libraries (already implemented)
- [x] Lazy loading planned for routes and heavy components (already implemented)
- [x] Image optimization strategy defined (lazy loading in place)
- [x] Bundle size target: < 1MB gzipped (current: ~843KB)
- [x] Console/debugger removal in production builds (handled by build process)
- [x] React.memo, useMemo, useCallback usage identified where needed (existing components)

### User Experience Consistency (Frontend features)
- [x] Design system consistency maintained (colors, spacing, typography) - using design tokens
- [x] Interactive elements have hover/focus states defined (existing)
- [x] Animation approach defined (Framer Motion 12, GSAP 3)
- [x] Responsive design: Mobile-first approach
- [x] Accessibility: ARIA labels, keyboard navigation, semantic HTML (existing)

### Code Quality Standards
- [x] ESLint configuration will be followed
- [x] Prettier for code formatting
- [x] Meaningful naming conventions defined
- [x] Comment strategy for complex logic defined
- [x] No commented-out code in production

### Technology Stack Compliance
- [x] Frontend: React 19 + TypeScript, Vite 7, Tailwind CSS 3, shadcn/ui, Framer Motion/GSAP
- [x] Backend: Node.js + Express, PostgreSQL + Prisma, Full TypeScript
- [x] No unauthorized technology additions

### Security Requirements
- [x] API authentication strategy defined (existing)
- [x] Sensitive data handling plan defined (existing)
- [x] Environment variables usage identified (existing)
- [x] Input validation strategy (client + server) (existing)
- [x] XSS/CSRF protection considered (existing)

## Project Structure

### Specification Artifacts (specs/005-profile-design-redesign/)

```text
specs/005-profile-design-redesign/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
│   └── [API contracts if needed]
├── quickstart.md        # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
src/
├── pages/
│   ├── ProfileEditPage.jsx          # Redesign to match screenshot
│   ├── ProfileBalancePage.jsx       # Redesign to match screenshot
│   └── ProfileOrdersPage.jsx        # Verify design consistency
├── components/
│   ├── profile/
│   │   ├── ProfileSidebar.tsx       # Update to match screenshot design
│   │   ├── PromoCodeSection.tsx     # Verify styling
│   │   └── PaymentMethodsSection.tsx # Verify styling
│   └── ui/
│       ├── card.tsx                 # Verify card component
│       ├── button.tsx               # Verify button component
│       └── input.tsx                # Verify input component
└── styles/
    └── design-tokens.ts             # Reference for design tokens
```

**Structure Decision**: Single React application with component-based architecture. Design updates will be applied directly to existing pages and components using Tailwind CSS utility classes and design tokens.

## Complexity Tracking

> **No violations identified - all changes align with constitution principles**

## Phase 0: Research & Analysis

### Research Tasks

1. **Analyze screenshot requirements**
   - Identify left sidebar menu structure and styling
   - Document content area layout patterns
   - Map form field layouts and button placements
   - List card component styling requirements

2. **Review current profile page implementations**
   - Analyze ProfileSidebar component structure
   - Review ProfileEditPage form layout
   - Check ProfileBalancePage card structure
   - Identify gaps between current and target design

3. **Best practices for profile page layouts**
   - Research two-column layout patterns
   - Review sidebar navigation best practices
   - Form layout and spacing guidelines
   - Card component design patterns

### Research Output: `research.md`

**Key Findings to Document:**
- Left sidebar menu structure (items, styling, active states)
- Content area layout patterns (spacing, alignment, cards)
- Form field layouts (labels, inputs, buttons)
- Color scheme and typography from screenshots
- Responsive behavior requirements

## Phase 1: Design & Contracts

### Data Model

**No data model changes required** - this is a frontend design update only.

### Component Interface Contracts

**Updated Component Props:**

1. **ProfileSidebar Component** (`src/components/profile/ProfileSidebar.tsx`)
   - Simplify menu structure to match screenshots
   - Update styling for menu items (active state, hover states)
   - Ensure proper spacing and typography
   - Remove or conditionally show user stats card based on page

2. **ProfileEditPage Component** (`src/pages/ProfileEditPage.jsx`)
   - Update form layout to match screenshot
   - Align fields and buttons correctly
   - Update section headings and spacing
   - Ensure proper card structure

3. **ProfileBalancePage Component** (`src/pages/ProfileBalancePage.jsx`)
   - Update balance card layout
   - Ensure proper spacing between sections
   - Align user avatar and name correctly
   - Update payment methods section styling

4. **ProfileOrdersPage Component** (`src/pages/ProfileOrdersPage.jsx`)
   - Verify design consistency with other pages
   - Ensure proper card layout for orders

### API Contracts

**N/A** - No API changes required.

### Quickstart Guide

**Output**: `quickstart.md` with:
- Steps to test profile pages
- Checklist of pages to verify
- Design comparison checklist
- Common design issues and fixes

## Phase 2: Implementation Planning

### Implementation Strategy

1. **Update ProfileSidebar Component**
   - Simplify menu structure
   - Update styling to match screenshots
   - Ensure active state highlighting
   - Update logout button styling

2. **Redesign ProfileEditPage**
   - Update form layout and field alignment
   - Update button placement and styling
   - Ensure proper section spacing
   - Match screenshot typography and colors

3. **Redesign ProfileBalancePage**
   - Update balance card structure
   - Align user avatar and name
   - Update payment methods section
   - Ensure proper spacing

4. **Verify ProfileOrdersPage**
   - Check design consistency
   - Update if needed to match overall design

5. **Test and Verify**
   - Test all profile pages on desktop viewports
   - Verify responsive behavior on mobile
   - Check design consistency across pages

### Files to Modify

1. `src/components/profile/ProfileSidebar.tsx` - Menu design update
2. `src/pages/ProfileEditPage.jsx` - Form layout redesign
3. `src/pages/ProfileBalancePage.jsx` - Card layout redesign
4. `src/pages/ProfileOrdersPage.jsx` - Design consistency check

### Success Criteria

- [ ] Left sidebar menu matches screenshot design
- [ ] ProfileEditPage layout matches screenshot
- [ ] ProfileBalancePage layout matches screenshot
- [ ] All profile pages have consistent design
- [ ] Proper spacing and alignment throughout
- [ ] Responsive design maintained
- [ ] All interactive elements work correctly
- [ ] Design tokens used consistently

## Next Steps

1. Run `/speckit.tasks` to generate detailed task breakdown
2. Execute tasks in order: Research → Design → Implementation → Testing
3. Verify design matches screenshots on actual browser
4. Document any additional design decisions made during implementation
