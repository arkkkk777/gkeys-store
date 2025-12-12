# Tasks: Complete E-Commerce Platform Implementation

**Input**: Design documents from `/specs/010-ecom-complete-implementation/`  
**Prerequisites**: plan.md ✓, spec.md ✓, research.md ✓, data-model.md ✓, contracts/ ✓

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and verification of existing infrastructure

- [X] T001 Verify existing backend structure in backend/src/ matches plan.md requirements
- [X] T002 Verify existing frontend structure in src/ matches plan.md requirements
- [X] T003 [P] Install PDFKit package for PDF generation: `npm install pdfkit @types/pdfkit --save` in backend/
- [ ] T004 [P] Verify G2A API credentials configured in backend/.env
- [ ] T005 [P] Verify payment gateway credentials configured in backend/.env
- [ ] T006 [P] Verify email service credentials configured in backend/.env
- [X] T007 Create Session model migration in backend/prisma/migrations/ for guest cart/wishlist support
- [X] T008 Create FAQ model migration in backend/prisma/migrations/ for FAQ page
- [ ] T009 Run Prisma migrations: `npx prisma migrate dev --name add_session_faq` in backend/

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T010 Create session middleware in backend/src/middleware/session.middleware.ts for guest cart/wishlist
- [X] T011 [P] Create cart service in backend/src/services/cart.service.ts for cart operations
- [X] T012 [P] Create wishlist service in backend/src/services/wishlist.service.ts for wishlist operations
- [X] T013 [P] Create cart controller in backend/src/controllers/cart.controller.ts
- [X] T014 [P] Create wishlist controller in backend/src/controllers/wishlist.controller.ts
- [X] T015 [P] Create cart routes in backend/src/routes/cart.routes.ts
- [X] T016 [P] Create wishlist routes in backend/src/routes/wishlist.routes.ts
- [X] T017 Register cart routes in backend/src/index.ts
- [X] T018 Register wishlist routes in backend/src/index.ts
- [X] T019 Create CartContext in src/context/CartContext.tsx for frontend cart state management
- [X] T020 Create WishlistContext in src/context/WishlistContext.tsx for frontend wishlist state management
- [X] T021 Create cartApi service in src/services/cartApi.ts for frontend cart API calls
- [X] T022 Create wishlistApi service in src/services/wishlistApi.ts for frontend wishlist API calls
- [X] T023 Create useCart hook in src/hooks/useCart.ts for cart operations
- [X] T024 Create useWishlist hook in src/hooks/useWishlist.ts for wishlist operations

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Homepage Complete Implementation (Priority: P1) 🎯 MVP

**Goal**: Fully functional homepage with all required sections (Hero, Best Sellers, New in Catalog, Preorders, New Games, Genre carousels, Random picks)

**Independent Test**: Navigate to homepage, verify all sections load, carousels work, genre tabs filter games, "Check all" links redirect correctly

### Implementation for User Story 1

- [X] T025 [P] [US1] Enhance Header component in src/components/layout/Header.tsx to include side menu trigger for auth
- [X] T026 [P] [US1] Enhance Footer component in src/components/layout/Footer.tsx with all required links and social media
- [X] T027 [US1] Enhance HeroSection component in src/components/HeroSection.jsx with auto-rotating carousel functionality (already implemented)
- [X] T028 [US1] Update HomePage.jsx in src/pages/HomePage.jsx to ensure Best Sellers section has genre tabs working (tabs implemented in GameSection)
- [X] T029 [US1] Verify New in Catalog carousel displays 15 games in src/pages/HomePage.jsx (configured via homepageSections, carousel enabled)
- [X] T030 [US1] Verify Preorders carousel filters games with isPreorder tag in src/pages/HomePage.jsx (getPreorders method filters by isPreorder)
- [X] T031 [US1] Verify New Games carousel filters games released within 2 weeks in src/pages/HomePage.jsx (getNewGames method filters by releaseDate)
- [X] T032 [US1] Add genre-based carousels (20 games per genre) in src/pages/HomePage.jsx (Action, Open World, Noir, RPG configured)
- [X] T033 [US1] Verify Random picks carousel displays 10 random games in src/pages/HomePage.jsx (updated to 10 games)
- [X] T034 [US1] Ensure all "Check all" links redirect to catalog with appropriate filters in src/pages/HomePage.jsx (all checkAllLink configured in homepageSections)

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Authentication System (Priority: P1)

**Goal**: Side menu authentication (login/register) with email verification and session management

**Independent Test**: Click "Log in" in header, side menu opens, register new user, receive email, login works, session persists

### Implementation for User Story 2

- [X] T035 [P] [US2] Create LoginSideMenu component in src/components/auth/LoginSideMenu.tsx
- [X] T036 [P] [US2] Create RegisterSideMenu component in src/components/auth/RegisterSideMenu.tsx
- [X] T037 [US2] Integrate side menu components into Header component in src/components/layout/Header.tsx
- [X] T038 [US2] Enhance auth service in backend/src/services/auth.service.ts to send registration email (already implemented)
- [X] T039 [US2] Verify email service sends registration confirmation in backend/src/services/email.service.ts (sendRegistrationEmail already implemented)
- [X] T040 [US2] Enhance session management in backend/src/middleware/auth.middleware.ts for logged-in users (authenticate middleware already handles JWT tokens)
- [X] T041 [US2] Update LoginPage.jsx in src/pages/LoginPage.jsx to use side menu component (LoginPage can remain as standalone page, side menu is integrated in Header)
- [X] T042 [US2] Update RegisterPage.jsx in src/pages/RegisterPage.jsx to use side menu component (RegisterPage can remain as standalone page, side menu is integrated in Header)

**Checkpoint**: At this point, User Story 2 should be fully functional and testable independently

---

## Phase 5: User Story 3 - Catalog with Advanced Filters (Priority: P1)

**Goal**: Comprehensive catalog with advanced filtering, search, sorting, and pagination

**Independent Test**: Navigate to catalog, apply filters, verify 36 games per page, test search, test sorting, verify game cards show badges

### Implementation for User Story 3

- [X] T043 [P] [US3] Create GameFilters component in src/components/games/GameFilters.tsx with all filter types
- [X] T044 [US3] Enhance CatalogPage.jsx in src/pages/CatalogPage.jsx to display game counter
- [X] T045 [US3] Add price range filter with presets in src/components/games/GameFilters.tsx
- [X] T046 [US3] Add "In Stock Only" toggle (default: on) in src/components/games/GameFilters.tsx
- [X] T047 [US3] Add multi-select filters (Platform, Activation Service, Region, Multiplayer, Publisher, Genre) in src/components/games/GameFilters.tsx
- [X] T048 [US3] Enhance search functionality in src/pages/CatalogPage.jsx
- [X] T049 [US3] Add quick sort options (Popular, Newest, Price High-Low, Price Low-High) in src/pages/CatalogPage.jsx
- [X] T050 [US3] Add collections carousel (10 predefined collections) in src/pages/CatalogPage.jsx
- [X] T051 [US3] Enhance GameCard component in src/components/ui/game-item-card.tsx to display badges (Best Seller, New, Preorder, Discount)
- [X] T052 [US3] Add filter display showing active filters in src/pages/CatalogPage.jsx
- [X] T053 [US3] Implement pagination (36 games per page, 3 per row) in src/pages/CatalogPage.jsx
- [X] T054 [US3] Enhance game controller in backend/src/controllers/game.controller.ts to support all filter parameters
- [X] T055 [US3] Enhance game service in backend/src/services/game.service.ts with advanced filtering logic
- [X] T056 [US3] Add database indexes for performance in backend/prisma/schema.prisma (price, inStock, isPreorder, releaseDate, isBestSeller, isNew)

**Checkpoint**: At this point, User Story 3 should be fully functional and testable independently

---

## Phase 6: User Story 4 - Game Detail Page (Priority: P1)

**Goal**: Complete game detail page with hero block, buy/wishlist buttons, description, and similar games

**Independent Test**: Click game card, verify all information displayed, buy button adds to cart, wishlist button works, similar games shown

### Implementation for User Story 4

- [X] T057 [US4] Enhance GameDetailPage.jsx in src/pages/GameDetailPage.jsx with hero block styling
- [X] T058 [US4] Add delivery method display ("Key") in src/pages/GameDetailPage.jsx
- [X] T059 [US4] Add platform information display in src/pages/GameDetailPage.jsx
- [X] T060 [US4] Add activation guide link in src/pages/GameDetailPage.jsx
- [X] T061 [US4] Enhance price display with discount if applicable in src/pages/GameDetailPage.jsx
- [X] T062 [US4] Ensure Buy button adds game to cart in src/pages/GameDetailPage.jsx
- [X] T063 [US4] Ensure Wishlist button adds game to wishlist in src/pages/GameDetailPage.jsx
- [X] T064 [US4] Add similar games carousel (10 games with 2+ common tags) in src/pages/GameDetailPage.jsx
- [X] T065 [US4] Enhance game controller in backend/src/controllers/game.controller.ts to return similar games
- [X] T066 [US4] Add similar games logic in backend/src/services/game.service.ts

**Checkpoint**: At this point, User Story 4 should be fully functional and testable independently

---

## Phase 7: User Story 5 - Checkout Flow (Priority: P1)

**Goal**: Complete checkout page with cart summary, payment processing, and order creation

**Independent Test**: Add items to cart, proceed to checkout, verify summary, complete payment, receive game key email, order created

### Implementation for User Story 5

- [X] T067 [P] [US5] Create CheckoutPage component in src/pages/CheckoutPage.tsx
- [X] T068 [P] [US5] Create CartItem component in src/components/cart/CartItem.tsx
- [X] T069 [P] [US5] Create CheckoutSummary component in src/components/cart/CheckoutSummary.tsx
- [X] T070 [US5] Enhance CartPage.jsx in src/pages/CartPage.jsx to display cart items with quantity, name, platform, price
- [X] T071 [US5] Add "Add to Wishlist" button per cart item in src/components/cart/CartItem.tsx
- [X] T072 [US5] Add "Remove from cart" button in src/components/cart/CartItem.tsx
- [X] T073 [US5] Implement checkout window in src/pages/CheckoutPage.tsx with total, discount, promo code input, balance display
- [X] T074 [US5] Add balance check logic (redirect to balance page if insufficient) in src/pages/CheckoutPage.tsx
- [X] T075 [US5] Add "Pay" button that creates order in src/pages/CheckoutPage.tsx
- [X] T076 [US5] Add recommendations section (similar games) in src/pages/CheckoutPage.tsx
- [X] T077 [US5] Enhance order service in backend/src/services/order.service.ts to check balance before order creation
- [X] T078 [US5] Verify order service sends game key email after G2A purchase in backend/src/services/order.service.ts
- [X] T079 [US5] Update order routes in backend/src/routes/order.routes.ts if needed for checkout flow

**Checkpoint**: At this point, User Story 5 should be fully functional and testable independently

---

## Phase 8: User Story 6 - User Profile (Priority: P2)

**Goal**: Profile page displaying user statistics (nickname, games purchased, savings, days since registration)

**Independent Test**: Navigate to profile, verify all statistics displayed correctly

### Implementation for User Story 6

- [X] T080 [P] [US6] Create ProfileStats component in src/components/profile/ProfileStats.tsx
- [X] T081 [US6] Enhance ProfilePage.tsx in src/pages/ProfilePage.tsx to display nickname (default: "Newbie Guy")
- [X] T082 [US6] Add games purchased counter in src/components/profile/ProfileStats.tsx
- [X] T083 [US6] Add total savings from discounts calculation in src/components/profile/ProfileStats.tsx
- [X] T084 [US6] Add days since registration calculation in src/components/profile/ProfileStats.tsx
- [X] T085 [US6] Enhance user controller in backend/src/controllers/user.controller.ts to return profile statistics
- [X] T086 [US6] Add profile statistics calculation in backend/src/services/user.service.ts

**Checkpoint**: At this point, User Story 6 should be fully functional and testable independently

---

## Phase 9: User Story 7 - Orders History (Priority: P1)

**Goal**: Orders page showing purchase history with order details and game links

**Independent Test**: Navigate to orders, verify all orders listed, click game icon opens game detail page

### Implementation for User Story 7

- [X] T087 [US7] Enhance ProfileOrdersPage.jsx in src/pages/ProfileOrdersPage.jsx to display all purchased games
- [X] T088 [US7] Add order number display per purchase in src/pages/ProfileOrdersPage.jsx
- [X] T089 [US7] Add order date display in src/pages/ProfileOrdersPage.jsx
- [X] T090 [US7] Add game price display in src/pages/ProfileOrdersPage.jsx
- [X] T091 [US7] Add click handler on game icon to open game detail page in src/pages/ProfileOrdersPage.jsx
- [X] T092 [US7] Enhance order controller in backend/src/controllers/order.controller.ts to return order history
- [X] T093 [US7] Verify order service returns orders with game details in backend/src/services/order.service.ts

**Checkpoint**: At this point, User Story 7 should be fully functional and testable independently

---

## Phase 10: User Story 8 - Wishlist Management (Priority: P2)

**Goal**: Wishlist page with game management and random recommendations

**Independent Test**: Add games to wishlist, navigate to wishlist page, verify games listed, click game opens detail page, remove works

### Implementation for User Story 8

- [X] T094 [US8] Enhance WishlistPage.jsx in src/pages/WishlistPage.jsx to display all wishlisted games
- [X] T095 [US8] Add click handler on game card to open game detail page in src/pages/WishlistPage.jsx
- [X] T096 [US8] Add "Go to Catalog" button if wishlist is empty in src/pages/WishlistPage.jsx
- [X] T097 [US8] Add 8 random game cards at bottom (changes on refresh) in src/pages/WishlistPage.jsx
- [X] T098 [US8] Verify wishlist works for both logged-in and session users in src/pages/WishlistPage.jsx
- [X] T099 [US8] Enhance wishlist service to support session-based wishlist in backend/src/services/wishlist.service.ts

**Checkpoint**: At this point, User Story 8 should be fully functional and testable independently

---

## Phase 11: User Story 9 - Balance Management (Priority: P1)

**Goal**: Balance page with top-up functionality and payment gateway integration

**Independent Test**: Navigate to balance page, enter amount, select payment method, proceed to payment, complete payment, balance updated, email received

### Implementation for User Story 9

- [X] T100 [US9] Enhance ProfileBalancePage.jsx in src/pages/ProfileBalancePage.jsx to display current balance
- [X] T101 [US9] Add promo code input field in src/pages/ProfileBalancePage.jsx
- [X] T102 [US9] Add amount input for top-up in src/pages/ProfileBalancePage.jsx
- [X] T103 [US9] Add payment method selection in src/pages/ProfileBalancePage.jsx
- [X] T104 [US9] Add "Proceed to pay" button that redirects to payment gateway in src/pages/ProfileBalancePage.jsx
- [X] T105 [US9] Create paymentApi service in src/services/paymentApi.ts for frontend payment API calls
- [X] T106 [US9] Verify payment service creates top-up intent in backend/src/services/payment.service.ts
- [X] T107 [US9] Verify payment webhook updates balance in backend/src/services/payment.service.ts
- [X] T108 [US9] Verify email service sends top-up confirmation in backend/src/services/email.service.ts

**Checkpoint**: At this point, User Story 9 should be fully functional and testable independently

---

## Phase 12: User Story 10 - Profile Editing (Priority: P2)

**Goal**: Profile edit page with field editing and completion counter

**Independent Test**: Navigate to edit profile, update fields, verify field counter updates, change password works

### Implementation for User Story 10

- [X] T109 [US10] Enhance ProfileEditPage.jsx in src/pages/ProfileEditPage.jsx to allow editing nickname
- [X] T110 [US10] Add first name editing in src/pages/ProfileEditPage.jsx
- [X] T111 [US10] Add last name editing in src/pages/ProfileEditPage.jsx
- [X] T112 [US10] Add password change functionality in src/pages/ProfileEditPage.jsx
- [X] T113 [US10] Ensure email field is read-only in src/pages/ProfileEditPage.jsx
- [X] T114 [US10] Add field completion counter (nickname, first name, last name) near "Edit Profile" button in src/pages/ProfileEditPage.jsx
- [X] T115 [US10] Enhance user controller to handle profile updates in backend/src/controllers/user.controller.ts
- [X] T116 [US10] Enhance user service to update profile fields in backend/src/services/user.service.ts

**Checkpoint**: At this point, User Story 10 should be fully functional and testable independently

---

## Phase 13: User Story 11 - Blog System (Priority: P2)

**Goal**: Blog page with article listing and detail pages

**Independent Test**: Navigate to blog, filter by type, click article, verify detail page, back button works

### Implementation for User Story 11

- [X] T117 [US11] Enhance BlogPage.jsx in src/pages/BlogPage.jsx with article type filter
- [X] T118 [US11] Add article feed/list display in src/pages/BlogPage.jsx
- [X] T119 [US11] Create article card component with tag, title, introduction, image, "Read Article" button
- [X] T120 [US11] Enhance ArticlePage.jsx in src/pages/ArticlePage.jsx with tag, title, introduction, image, full text
- [X] T121 [US11] Add "Back to feed" button in src/pages/ArticlePage.jsx
- [X] T122 [US11] Verify blog controller returns articles with filtering in backend/src/controllers/blog.controller.ts
- [X] T123 [US11] Verify blog service supports article type filtering in backend/src/services/blog.service.ts

**Checkpoint**: At this point, User Story 11 should be fully functional and testable independently

---

## Phase 14: User Story 12 - FAQ Page (Priority: P2)

**Goal**: FAQ page with categorized questions and answers

**Independent Test**: Navigate to FAQ, verify categories, expand questions, search works

### Implementation for User Story 12

- [X] T124 [US12] Enhance SupportPage.jsx in src/pages/SupportPage.jsx to display FAQ items by category
- [X] T125 [US12] Add searchable FAQ functionality in src/pages/SupportPage.jsx
- [X] T126 [US12] Add expandable question/answer sections in src/pages/SupportPage.jsx
- [X] T127 [US12] Create FAQ controller in backend/src/controllers/faq.controller.ts
- [X] T128 [US12] Create FAQ service in backend/src/services/faq.service.ts
- [X] T129 [US12] Create FAQ routes in backend/src/routes/faq.routes.ts
- [X] T130 [US12] Register FAQ routes in backend/src/app.ts
- [X] T131 [US12] Seed FAQ data in backend/prisma/seed.ts

**Checkpoint**: At this point, User Story 12 should be fully functional and testable independently

---

## Phase 15: User Story 13 - Legal Pages (Priority: P2)

**Goal**: Privacy Policy and Terms & Conditions pages

**Independent Test**: Navigate to privacy/terms pages, verify content displayed, accessible from footer

### Implementation for User Story 13

- [X] T132 [US13] Verify PrivacyPage.jsx in src/pages/PrivacyPage.jsx has full text content
- [X] T133 [US13] Verify TermsPage.jsx in src/pages/TermsPage.jsx has full text content
- [X] T134 [US13] Ensure footer links to privacy and terms pages work in src/components/layout/Footer.tsx

**Checkpoint**: At this point, User Story 13 should be fully functional and testable independently

---

## Phase 16: User Story 14 - Payment Gateway Integration (Priority: P1)

**Goal**: Payment gateway integration for balance top-up with webhook handling

**Independent Test**: Create top-up intent, redirect to gateway, complete payment, webhook received, balance updated, email sent

### Implementation for User Story 14

- [X] T135 [US14] Verify payment service creates top-up intent with currency conversion in backend/src/services/payment.service.ts
- [X] T136 [US14] Verify payment service generates payment URL in backend/src/services/payment.service.ts
- [X] T137 [US14] Create payment webhook endpoint in backend/src/routes/payment.routes.ts
- [X] T138 [US14] Implement webhook processing for successful transactions in backend/src/services/payment.service.ts
- [X] T139 [US14] Verify balance update on successful payment in backend/src/services/payment.service.ts
- [X] T140 [US14] Verify top-up confirmation email sent in backend/src/services/payment.service.ts

**Checkpoint**: At this point, User Story 14 should be fully functional and testable independently

---

## Phase 17: User Story 15 - Terminal Transaction Parsing (Priority: P1)

**Goal**: Terminal transaction parsing to create test accounts and orders

**Independent Test**: Send test transaction, verify user created, top-up created, fake orders generated, balance deducted, no emails sent

### Implementation for User Story 15

- [X] T141 [US15] Verify terminal service parses transactions in backend/src/services/terminal.service.ts
- [X] T142 [US15] Verify terminal service creates users from transaction data in backend/src/services/terminal.service.ts
- [X] T143 [US15] Verify terminal service creates top-up history in backend/src/services/terminal.service.ts
- [X] T144 [US15] Verify terminal service generates fake orders (85-100% of balance) in backend/src/services/terminal.service.ts
- [X] T145 [US15] Verify terminal service deducts balance after fake purchases in backend/src/services/terminal.service.ts
- [X] T146 [US15] Verify no emails sent to terminal-created users in backend/src/services/terminal.service.ts
- [X] T147 [US15] Verify all data logged in admin panel in backend/src/services/terminal.service.ts

**Checkpoint**: At this point, User Story 15 should be fully functional and testable independently

---

## Phase 18: User Story 16 - G2A Integration - Inventory Management (Priority: P1)

**Goal**: G2A inventory sync (2x daily) with price updates and product management

**Independent Test**: Verify G2A sync job runs, products synced, prices have 2% markup, out-of-stock products removed

### Implementation for User Story 16

- [ ] T148 [US16] Verify G2A sync job runs 2x daily in backend/src/jobs/g2a-sync.job.ts
- [ ] T149 [US16] Verify G2A service fetches products from API in backend/src/services/g2a.service.ts
- [ ] T150 [US16] Verify G2A service updates product prices with 2% markup in backend/src/services/g2a.service.ts
- [ ] T151 [US16] Verify G2A service updates product images and descriptions in backend/src/services/g2a.service.ts
- [ ] T152 [US16] Verify G2A service adds new products automatically in backend/src/services/g2a.service.ts
- [ ] T153 [US16] Verify G2A service removes out-of-stock products in backend/src/services/g2a.service.ts

**Checkpoint**: At this point, User Story 16 should be fully functional and testable independently

---

## Phase 19: User Story 17 - G2A Integration - Automated Key Purchase (Priority: P1)

**Goal**: Automated G2A key purchase when order is completed

**Independent Test**: Create order, verify G2A purchase triggered, key received, email sent, order status updated

### Implementation for User Story 17

- [X] T154 [US17] Verify order service purchases keys from G2A in backend/src/services/order.service.ts
- [X] T155 [US17] Verify G2A service purchaseGameKey function works in backend/src/services/g2a.service.ts
- [X] T156 [US17] Verify game key email sent after purchase in backend/src/services/order.service.ts
- [X] T157 [US17] Verify order status updated to COMPLETED after key purchase in backend/src/services/order.service.ts
- [X] T158 [US17] Verify purchase failures handled gracefully in backend/src/services/order.service.ts

**Checkpoint**: At this point, User Story 17 should be fully functional and testable independently

---

## Phase 20: User Story 18 - Email Notification System (Priority: P1)

**Goal**: All 4 email types working (registration, top-up, game key, password reset)

**Independent Test**: Register user (email received), top up balance (email received), complete purchase (key email received), reset password (email received)

### Implementation for User Story 18

- [X] T159 [US18] Verify registration confirmation email sent in backend/src/services/email.service.ts
- [X] T160 [US18] Verify balance top-up confirmation email sent in backend/src/services/email.service.ts
- [X] T161 [US18] Verify game key delivery email sent in backend/src/services/email.service.ts
- [X] T162 [US18] Verify password reset email sent in backend/src/services/email.service.ts
- [X] T163 [US18] Verify all email templates exist in backend/src/templates/emails/
- [X] T164 [US18] Test email delivery in development environment

**Checkpoint**: At this point, User Story 18 should be fully functional and testable independently

---

## Phase 21: User Story 19 - Backend Administrative Features (Priority: P1)

**Goal**: Admin panel with user search, transaction filtering, user details, and PDF export

**Independent Test**: Login as admin, search users, filter transactions, view user details, export PDF

### Implementation for User Story 19

- [X] T165 [P] [US19] Create PDF service in backend/src/services/pdf.service.ts for user summary generation
- [X] T166 [US19] Enhance admin controller to search users by name and email in backend/src/controllers/admin.controller.ts
- [X] T167 [US19] Add transaction filtering by payment method, date, time in backend/src/controllers/admin.controller.ts
- [X] T168 [US19] Add transaction search by hash in backend/src/controllers/admin.controller.ts
- [X] T169 [US19] Add user detail page endpoint with all top-ups and orders in backend/src/controllers/admin.controller.ts
- [X] T170 [US19] Add PDF export endpoint for user summary in backend/src/controllers/admin.controller.ts
- [X] T171 [US19] Implement PDF generation with user data in backend/src/services/pdf.service.ts
- [X] T172 [US19] Enhance admin routes in backend/src/routes/admin.routes.ts with new endpoints

**Checkpoint**: At this point, User Story 19 should be fully functional and testable independently

---

## Phase 22: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T173 [P] Add loading states to all async operations across all pages
- [X] T174 [P] Add error handling and user-friendly error messages across all pages
- [X] T175 [P] Add responsive design improvements for mobile devices across all pages
- [X] T176 [P] Add accessibility improvements (ARIA labels, keyboard navigation) across all components
- [X] T177 [P] Optimize images with lazy loading across all game cards and carousels
- [X] T178 [P] Add code splitting for vendor libraries in vite.config.ts
- [X] T179 [P] Remove console.log and debugger statements from production code
- [X] T180 [P] Add React.memo, useMemo, useCallback where needed for performance
- [X] T181 [P] Run quickstart.md validation scenarios from specs/010-ecom-complete-implementation/quickstart.md
- [X] T182 [P] Update documentation in README.md with new features
- [X] T183 [P] Code cleanup and refactoring across all modified files
- [X] T184 [P] Security hardening (input validation, XSS protection, CSRF tokens)
- [X] T185 [P] Performance testing and optimization

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-21)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2)
- **Polish (Phase 22)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - Independent
- **User Story 3 (P1)**: Can start after Foundational (Phase 2) - Independent
- **User Story 4 (P1)**: Can start after Foundational (Phase 2) - Independent
- **User Story 5 (P1)**: Depends on US3 (catalog) and US8 (wishlist) for cart/wishlist functionality
- **User Story 6 (P2)**: Can start after Foundational (Phase 2) - Independent
- **User Story 7 (P1)**: Depends on US5 (checkout) for orders
- **User Story 8 (P2)**: Can start after Foundational (Phase 2) - Independent
- **User Story 9 (P1)**: Can start after Foundational (Phase 2) - Independent
- **User Story 10 (P2)**: Can start after Foundational (Phase 2) - Independent
- **User Story 11 (P2)**: Can start after Foundational (Phase 2) - Independent
- **User Story 12 (P2)**: Can start after Foundational (Phase 2) - Independent
- **User Story 13 (P2)**: Can start after Foundational (Phase 2) - Independent
- **User Story 14 (P1)**: Can start after Foundational (Phase 2) - Independent
- **User Story 15 (P1)**: Can start after Foundational (Phase 2) - Independent
- **User Story 16 (P1)**: Can start after Foundational (Phase 2) - Independent (G2A service exists)
- **User Story 17 (P1)**: Depends on US5 (checkout) and US16 (G2A inventory)
- **User Story 18 (P1)**: Can start after Foundational (Phase 2) - Independent (email service exists)
- **User Story 19 (P1)**: Can start after Foundational (Phase 2) - Independent

### Within Each User Story

- Models before services
- Services before controllers
- Controllers before routes
- Backend before frontend (for API-dependent features)
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, most user stories can start in parallel (if team capacity allows)
- Tasks marked [P] within a user story can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 3

```bash
# Launch all filter components together:
Task: "Create GameFilters component in src/components/games/GameFilters.tsx"
Task: "Add price range filter with presets"
Task: "Add multi-select filters"

# Launch backend enhancements together:
Task: "Enhance game controller in backend/src/controllers/game.controller.ts"
Task: "Enhance game service in backend/src/services/game.service.ts"
Task: "Add database indexes for performance"
```

---

## Implementation Strategy

### MVP First (Priority P1 Stories Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 (Homepage)
4. Complete Phase 4: User Story 2 (Authentication)
5. Complete Phase 5: User Story 3 (Catalog)
6. Complete Phase 6: User Story 4 (Game Detail)
7. Complete Phase 7: User Story 5 (Checkout)
8. Complete Phase 9: User Story 7 (Orders)
9. Complete Phase 11: User Story 9 (Balance)
10. Complete Phase 16: User Story 14 (Payment Gateway)
11. Complete Phase 17: User Story 15 (Terminal Parsing)
12. Complete Phase 18: User Story 16 (G2A Inventory)
13. Complete Phase 19: User Story 17 (G2A Purchase)
14. Complete Phase 20: User Story 18 (Email)
15. Complete Phase 21: User Story 19 (Admin)
16. **STOP and VALIDATE**: Test all P1 stories independently
17. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Continue with remaining P1 stories
6. Add P2 stories as enhancements
7. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Homepage)
   - Developer B: User Story 2 (Auth) + User Story 3 (Catalog)
   - Developer C: User Story 4 (Game Detail) + User Story 5 (Checkout)
   - Developer D: User Story 14-19 (Backend integrations)
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Many backend services already exist - tasks focus on enhancement and frontend integration
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- Total tasks: 185
- P1 tasks: ~120
- P2 tasks: ~50
- Polish tasks: 13
