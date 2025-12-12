# Implementation Plan: Complete E-Commerce Platform Implementation

**Branch**: `010-ecom-complete-implementation` | **Date**: 2024-12-10 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/010-ecom-complete-implementation/spec.md`

## Summary

Complete implementation of a full-featured e-commerce platform for video game keys, including all 14 pages from the technical specification, payment gateway integrations, G2A API integration, email notification system, and comprehensive backend administrative features. This is a comprehensive enhancement of the existing platform to meet all requirements from the technical specification.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 20+, React 19, Vite 7  
**Primary Dependencies**: 
- Frontend: React 19, React Router 7, Framer Motion 12, Tailwind CSS 3, shadcn/ui
- Backend: Express.js, Prisma ORM, PostgreSQL
- Integrations: G2A API client, Payment Gateway SDK, Email service (Nodemailer/SendGrid)
- PDF Generation: PDFKit or Puppeteer

**Storage**: PostgreSQL with Prisma ORM (existing schema to be extended)  
**Testing**: Jest, React Testing Library, Supertest for API testing  
**Target Platform**: Web application (responsive, mobile-first)  
**Project Type**: Web application (frontend + backend)  
**Performance Goals**: 
- Page load < 3s
- API response < 500ms (p95)
- 60fps animations
- Bundle size < 1MB gzipped

**Constraints**: 
- Must maintain existing design system
- Must preserve existing authentication flow
- Must integrate with existing database schema
- Currency conversion required (EUR to gateway currency)
- G2A prices + 2% markup

**Scale/Scope**: 
- 14 pages to implement/enhance
- 4 email types
- 2 payment gateway integrations
- G2A API integration (inventory + purchase)
- Admin features for user/transaction management
- Estimated: 50+ components, 30+ API endpoints, 10+ services

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
- [x] Code splitting strategy defined for vendor libraries (React, UI, Animation)
- [x] Lazy loading planned for routes and heavy components
- [x] Image optimization strategy defined (lazy loading, WebP format)
- [x] Bundle size target: < 1MB gzipped
- [x] Console/debugger removal in production builds
- [x] React.memo, useMemo, useCallback usage identified where needed

### User Experience Consistency (Frontend features)
- [x] Design system consistency maintained (colors, spacing, typography)
- [x] Interactive elements have hover/focus states defined
- [x] Animation approach defined (Framer Motion for UI, GSAP for complex animations)
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
- [x] API authentication strategy defined (JWT tokens, session management)
- [x] Sensitive data handling plan defined (environment variables, encrypted storage)
- [x] Environment variables usage identified (API keys, database URLs, email credentials)
- [x] Input validation strategy (client + server, Zod schemas)
- [x] XSS/CSRF protection considered (sanitization, CSRF tokens)

## Project Structure

### Documentation (this feature)

```text
specs/010-ecom-complete-implementation/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
backend/
├── src/
│   ├── controllers/
│   │   ├── auth.controller.ts          # Authentication (login, register, password reset)
│   │   ├── user.controller.ts          # User profile, editing, balance
│   │   ├── game.controller.ts          # Game CRUD, search, filters (existing, enhanced)
│   │   ├── cart.controller.ts          # Cart management (new)
│   │   ├── order.controller.ts         # Order creation, history (enhanced)
│   │   ├── wishlist.controller.ts      # Wishlist management (new)
│   │   ├── payment.controller.ts       # Payment gateway integration (new)
│   │   ├── g2a.controller.ts           # G2A API integration (new)
│   │   ├── email.controller.ts         # Email sending (new)
│   │   └── admin.controller.ts         # Admin features (user search, transactions, PDF export)
│   ├── services/
│   │   ├── auth.service.ts             # Authentication logic
│   │   ├── user.service.ts             # User management
│   │   ├── game.service.ts             # Game management (existing, enhanced)
│   │   ├── cart.service.ts             # Cart operations
│   │   ├── order.service.ts            # Order processing, G2A purchase
│   │   ├── payment.service.ts          # Payment gateway integration
│   │   ├── g2a.service.ts              # G2A API client (existing, enhanced)
│   │   ├── email.service.ts            # Email templates and sending
│   │   └── pdf.service.ts              # PDF generation for user summaries
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── user.routes.ts
│   │   ├── game.routes.ts              # Existing, enhanced
│   │   ├── cart.routes.ts              # New
│   │   ├── order.routes.ts             # Enhanced
│   │   ├── wishlist.routes.ts          # New
│   │   ├── payment.routes.ts           # New
│   │   ├── g2a.routes.ts               # New
│   │   └── admin.routes.ts             # New
│   ├── middleware/
│   │   ├── auth.middleware.ts          # JWT verification
│   │   ├── validation.middleware.ts     # Request validation
│   │   └── error.middleware.ts         # Error handling
│   ├── types/
│   │   ├── auth.types.ts
│   │   ├── user.types.ts
│   │   ├── order.types.ts
│   │   ├── payment.types.ts
│   │   └── g2a.types.ts
│   └── utils/
│       ├── currency.ts                 # Currency conversion
│       └── validation.ts                # Zod schemas
├── prisma/
│   ├── schema.prisma                    # Existing, to be extended
│   └── migrations/                      # New migrations
└── tests/
    ├── integration/
    └── unit/

src/
├── pages/
│   ├── HomePage.jsx                     # Existing, to be enhanced
│   ├── LoginPage.jsx                   # Existing, to be enhanced (side menu)
│   ├── RegisterPage.jsx                # Existing, to be enhanced (side menu)
│   ├── CatalogPage.jsx                 # Existing, to be enhanced (filters, pagination)
│   ├── GameDetailPage.jsx              # Existing, to be enhanced
│   ├── CartPage.jsx                     # Existing, to be enhanced
│   ├── CheckoutPage.tsx                # New
│   ├── ProfilePage.tsx                 # Existing, to be enhanced
│   ├── ProfileEditPage.jsx             # Existing, to be enhanced
│   ├── ProfileOrdersPage.jsx            # Existing, to be enhanced
│   ├── ProfileBalancePage.jsx          # Existing, to be enhanced
│   ├── WishlistPage.jsx                # Existing, to be enhanced
│   ├── BlogPage.jsx                    # Existing, to be enhanced
│   ├── ArticlePage.jsx                 # Existing, to be enhanced
│   ├── SupportPage.jsx                 # Existing, to be enhanced (FAQ)
│   ├── PrivacyPage.jsx                 # Existing
│   └── TermsPage.jsx                   # Existing
├── components/
│   ├── layout/
│   │   ├── Header.tsx                  # Enhanced (side menu for auth)
│   │   └── Footer.tsx                  # Enhanced
│   ├── auth/
│   │   ├── LoginSideMenu.tsx           # New
│   │   └── RegisterSideMenu.tsx       # New
│   ├── games/
│   │   ├── GameCard.tsx                # Existing, enhanced (badges)
│   │   ├── GameCarousel.tsx            # New
│   │   └── GameFilters.tsx             # New
│   ├── cart/
│   │   ├── CartItem.tsx                # New
│   │   └── CheckoutSummary.tsx         # New
│   ├── profile/
│   │   ├── ProfileStats.tsx            # New
│   │   └── OrderHistory.tsx            # Enhanced
│   └── ui/                              # shadcn/ui components (existing)
├── services/
│   ├── api.ts                           # Existing API client
│   ├── authApi.ts                       # Existing, enhanced
│   ├── gamesApi.ts                      # Existing, enhanced
│   ├── cartApi.ts                       # New
│   ├── orderApi.ts                      # New
│   ├── paymentApi.ts                    # New
│   └── userApi.ts                       # New
├── hooks/
│   ├── useAuth.ts                       # Existing, enhanced
│   ├── useCart.ts                       # New
│   └── useWishlist.ts                   # New
├── context/
│   ├── AuthContext.tsx                  # Existing
│   ├── CartContext.tsx                  # New
│   └── WishlistContext.tsx              # New
└── types/
    ├── game.ts                          # Existing
    ├── user.ts                          # New
    ├── order.ts                         # New
    └── payment.ts                       # New
```

**Structure Decision**: Web application structure (frontend + backend) is already established. This implementation will enhance existing pages and add new components/services as needed. The structure follows the existing patterns and extends them with new features.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Multiple external service integrations (G2A, Payment Gateway, Email) | Required by specification for automated inventory, payments, and notifications | Manual processes would not meet business requirements |
| PDF generation library | Required for admin user summary export | Manual report generation would be time-consuming and error-prone |
| Currency conversion logic | Payment gateway may require different currency than EUR | Hard-coding EUR would break payment flow for non-EUR gateways |
| Terminal transaction parsing | Required for test account generation from real transactions | Manual account creation would not scale |

## Phase 0: Research Requirements

The following areas need research before implementation:

1. **Payment Gateway Selection & Integration**
   - Research available payment gateways supporting EUR and currency conversion
   - Understand webhook patterns for transaction confirmation
   - Terminal transaction parsing requirements
   - Security best practices for payment integration

2. **G2A API Deep Dive**
   - Complete API documentation review
   - Inventory sync strategies (2x daily updates)
   - Automated purchase flow
   - Error handling and retry logic
   - Rate limiting considerations

3. **Email Service Integration**
   - Email service provider selection (SendGrid, Nodemailer, etc.)
   - Template design for 4 email types
   - HTML email best practices
   - Delivery tracking

4. **PDF Generation**
   - Library selection (PDFKit vs Puppeteer)
   - Template design for user summaries
   - Performance considerations

5. **Session Management for Cart/Wishlist**
   - Implementation strategy for guest users
   - Session storage vs localStorage
   - Migration from guest to authenticated user

6. **Advanced Filtering Performance**
   - Database query optimization for complex filters
   - Caching strategies
   - Pagination with filters

7. **Currency Conversion**
   - Real-time exchange rates API
   - Conversion accuracy requirements
   - Caching exchange rates

## Phase 1: Design Artifacts to Generate

1. **data-model.md**: Extended data models for:
   - Cart items (session-based)
   - Enhanced order model
   - Payment transactions
   - Email templates
   - Admin audit logs

2. **contracts/**: API contracts for:
   - Authentication endpoints
   - User management endpoints
   - Cart/Wishlist endpoints
   - Order endpoints
   - Payment gateway webhooks
   - G2A integration endpoints
   - Admin endpoints

3. **quickstart.md**: Testing guide for:
   - User registration and login
   - Adding items to cart
   - Checkout flow
   - Payment processing
   - G2A integration testing
   - Admin features

## Next Steps

1. Execute Phase 0 research to resolve all "NEEDS CLARIFICATION" items
2. Generate data-model.md with extended schemas
3. Create API contracts in contracts/
4. Write quickstart.md with testing scenarios
5. Update agent context with new technologies
6. Proceed to task generation with `/speckit.tasks`
