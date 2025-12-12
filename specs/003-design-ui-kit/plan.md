# Implementation Plan: New Games Section Design Update

**Branch**: `003-design-ui-kit` | **Date**: 2025-12-12 | **Spec**: `/specs/003-design-ui-kit/spec.md`
**Input**: User request: "приведи дизайн раздела New games к виду как указано на скриншоте чтобы было по структуре на 100% похоже"

## Summary

Update the "New games" section on the homepage to match the design specification from the provided screenshot. The section should have a dark container with rounded corners, large title and subtitle, horizontal carousel with navigation arrows, game cards with "New" badges, and a centered "Check all" button. All visual elements must match the screenshot exactly in structure, spacing, colors, and layout.

## Technical Context

**Language/Version**: TypeScript 5.9.3, React 19.2.0  
**Primary Dependencies**: Tailwind CSS 3.4.18, Vite 7.2.7, React 19, Framer Motion 12  
**Storage**: N/A (UI component update)  
**Testing**: Visual inspection against screenshot, responsive behavior verification  
**Target Platform**: Web (browser-based React application)  
**Project Type**: Web application (frontend + backend)  
**Performance Goals**: No performance degradation, smooth carousel scrolling  
**Constraints**: Must match screenshot design exactly, maintain responsive behavior, use design tokens  
**Scale/Scope**: Single section component update, affects GameSection.jsx, GameCard.jsx, homepageSections.ts config

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

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
- [x] Code splitting strategy defined for vendor libraries
- [x] Lazy loading planned for routes and heavy components
- [x] Image optimization strategy defined
- [x] Bundle size target: < 1MB gzipped
- [x] Console/debugger removal in production builds
- [x] React.memo, useMemo, useCallback usage identified where needed

### User Experience Consistency (Frontend features)
- [x] Design system consistency maintained (colors, spacing, typography)
- [x] Interactive elements have hover/focus states defined
- [x] Animation approach defined (Framer Motion or GSAP)
- [x] Responsive design: Mobile-first approach
- [x] Accessibility: ARIA labels, keyboard navigation, semantic HTML

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
- [x] API authentication strategy defined (N/A for UI update)
- [x] Sensitive data handling plan defined (N/A for UI update)
- [x] Environment variables usage identified (N/A for UI update)
- [x] Input validation strategy (client + server) (N/A for UI update)
- [x] XSS/CSRF protection considered (N/A for UI update)

## Project Structure

### Documentation (this feature)

```text
specs/003-design-ui-kit/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── GameSection.jsx          # Main section component (needs update for container styling)
│   └── GameCard.jsx             # Game card component (needs "New" badge support)
├── config/
│   └── homepageSections.ts      # Section configuration (needs carousel: true for new-games)
└── pages/
    └── HomePage.jsx             # Homepage (may need minor adjustments)
```

**Structure Decision**: Web application structure. The update affects:
1. `GameSection.jsx` - Add dark container with rounded corners, update layout for "New games" section
2. `GameCard.jsx` - Add "New" badge with pin icon, update price overlay styling
3. `homepageSections.ts` - Enable carousel for "new-games" section
4. Design tokens usage - Ensure all colors, spacing, and typography use centralized tokens

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations - this is a UI component update that maintains all constitution requirements.
