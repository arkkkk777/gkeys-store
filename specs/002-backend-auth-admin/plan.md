# Implementation Plan: Complete Backend Setup with Database Models, Authorization, and Admin Panel

**Branch**: `002-backend-auth-admin` | **Date**: 2024-12-05 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-backend-auth-admin/spec.md`

## Summary

Завершение настройки backend инфраструктуры для GKEYS Store: обеспечение полной схемы базы данных с автоматической генерацией TypeScript типов, рабочей системы аутентификации и авторизации на основе JWT, а также полного набора backend функций для админ-панели. Все компоненты должны быть полностью типизированы TypeScript, использовать существующую архитектуру Express.js + Prisma, и соответствовать принципам безопасности и производительности.

## Technical Context

**Language/Version**: TypeScript 5.9.3, Node.js >=20.0.0  
**Primary Dependencies**: Express 4.21.1, Prisma 5.19.1, jsonwebtoken 9.0.2, bcrypt 5.1.1, @prisma/client 5.19.1  
**Storage**: PostgreSQL with Prisma ORM  
**Testing**: Jest/Vitest (optional), existing integration tests in `__tests__/integration/`  
**Target Platform**: Node.js server (Linux/macOS/Windows)  
**Project Type**: Web application backend (API server)  
**Performance Goals**: 
- Database queries: < 500ms for standard operations
- Authentication token validation: < 50ms overhead per request
- Admin endpoints: < 2 seconds response time (excluding network latency and complex queries)
- Support for 1000+ concurrent authenticated requests

**Constraints**: 
- Must use existing Prisma schema structure
- Must maintain backward compatibility with existing API endpoints
- All code must be fully typed TypeScript (no `any` without justification)
- Must follow existing Express.js middleware patterns
- Environment variables must be used for secrets (JWT secrets, database URLs)

**Scale/Scope**: 
- Complete database schema with all 20+ models
- Full TypeScript type coverage for all Prisma models
- Authentication system supporting unlimited users
- Admin panel with 7+ management areas (dashboard, users, games, orders, blog, transactions, G2A sync)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### I. Type Safety First ✅
- Все backend код будет полностью типизирован TypeScript
- Использование строгих типов для всех Prisma моделей, API responses, request bodies
- Нет `any` типов без обоснования
- Автоматическая генерация типов из Prisma schema

### II. Component-Driven Architecture
- N/A (backend feature, не применимо к React компонентам)
- Backend использует модульную архитектуру: controllers → services → database

### III. Performance Optimization ✅
- Database queries оптимизированы с использованием Prisma indexes
- Authentication middleware минимизирует overhead (< 50ms)
- Admin endpoints используют эффективные агрегации и пагинацию
- Кэширование где необходимо (через существующий cache.service.ts)

### IV. User Experience Consistency
- N/A (backend feature, UX относится к frontend)
- API responses следуют консистентному формату: `{ success: boolean, data?: any, error?: { message: string } }`

### V. Code Quality Standards ✅
- Следование ESLint конфигурации
- Prettier для форматирования
- Осмысленные имена переменных и функций
- Комментарии для сложной логики
- Нет закомментированного кода в production

### Technology Stack Compliance ✅
- Backend: Node.js + Express, PostgreSQL + Prisma, Full TypeScript
- Использование существующих зависимостей без добавления новых
- Соответствие существующей архитектуре проекта

### Security Requirements ✅
- JWT tokens с expiration times
- Password hashing через bcrypt
- Parameterized queries через Prisma (защита от SQL injection)
- Input validation через express-validator
- Environment variables для секретов
- Rate limiting для authentication endpoints (опционально, но рекомендуется)

**GATE STATUS**: ✅ PASS - Все принципы конституции соблюдены

## Project Structure

### Documentation (this feature)

```text
specs/002-backend-auth-admin/
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
├── prisma/
│   ├── schema.prisma           # Database schema (EXISTS - verify completeness)
│   └── migrations/             # Database migrations
├── src/
│   ├── config/
│   │   └── database.ts         # Prisma client configuration (EXISTS)
│   ├── controllers/
│   │   ├── admin.controller.ts # Admin endpoints (EXISTS - verify completeness)
│   │   └── auth.controller.ts  # Auth endpoints (EXISTS - verify completeness)
│   ├── middleware/
│   │   ├── auth.ts             # Authentication & authorization middleware (EXISTS)
│   │   └── errorHandler.ts     # Error handling (EXISTS)
│   ├── routes/
│   │   ├── admin.routes.ts     # Admin routes (EXISTS - verify all endpoints)
│   │   └── auth.routes.ts      # Auth routes (EXISTS)
│   ├── services/
│   │   ├── admin.service.ts   # Admin business logic (EXISTS - verify completeness)
│   │   └── auth.service.ts    # Auth business logic (EXISTS)
│   ├── types/
│   │   ├── admin.ts            # Admin type definitions (EXISTS - verify completeness)
│   │   └── auth.ts             # Auth type definitions (EXISTS)
│   └── utils/
│       ├── jwt.ts              # JWT token utilities (EXISTS)
│       └── bcrypt.ts           # Password hashing utilities (EXISTS)
└── package.json                # Dependencies (EXISTS)
```

**Structure Decision**: Используем существующую структуру backend. Все основные компоненты уже существуют, задача - убедиться в их полноте и корректности работы. Новые файлы создаются только если отсутствуют необходимые функции.

## Complexity Tracking

> **No violations detected** - все решения соответствуют конституции проекта и существующей архитектуре

## Phase 0: Outline & Research

### Research Tasks

1. **Prisma Schema Completeness Verification**
   - Decision: Verify all required models exist in schema.prisma
   - Rationale: Complete database schema is foundation for type generation
   - Current state: Schema exists with 20+ models (User, Game, Order, Transaction, etc.)
   - Action: Review schema against spec requirements, ensure all relationships and indexes are defined

2. **TypeScript Type Generation Workflow**
   - Decision: Use Prisma's built-in type generation (`prisma generate`)
   - Rationale: Prisma automatically generates TypeScript types from schema
   - Current state: `prisma:generate` script exists in package.json
   - Action: Verify type generation works correctly and types are exported properly

3. **JWT Authentication Implementation Review**
   - Decision: Use existing JWT implementation with jsonwebtoken library
   - Rationale: JWT utilities already exist in `utils/jwt.ts`
   - Current state: Token generation and verification functions exist
   - Action: Verify token refresh mechanism is implemented (if required by spec)

4. **Authorization Middleware Completeness**
   - Decision: Use existing `authenticate` and `requireAdmin` middleware
   - Rationale: Middleware already exists and follows Express.js patterns
   - Current state: Basic auth middleware exists in `middleware/auth.ts`
   - Action: Verify all admin routes are protected, verify role validation works correctly

5. **Admin Service Function Completeness**
   - Decision: Verify all admin functions from spec are implemented
   - Rationale: Admin service exists but needs verification against spec requirements
   - Current state: Admin service has dashboard, user management, game CRUD, blog CRUD, orders, transactions, G2A sync
   - Action: Cross-reference service functions with spec requirements (FR-009 through FR-015)

6. **Input Validation Strategy**
   - Decision: Use express-validator for request validation
   - Rationale: express-validator is already in dependencies, follows Express.js patterns
   - Current state: Validators exist in `validators/` directory
   - Action: Verify all admin endpoints have proper input validation

## Phase 1: Design & Contracts

### Data Model

**File**: `data-model.md`

#### Entities

1. **User** (from Prisma schema)
   - Fields: id, email, passwordHash, nickname, firstName, lastName, avatar, balance, role, emailVerified, createdAt, updatedAt
   - Relationships: orders, transactions, wishlist, cart
   - Validation: email unique, passwordHash required, role enum (USER/ADMIN)

2. **Game** (from Prisma schema)
   - Fields: id, title, slug, description, price, image, inStock, etc.
   - Relationships: categories, genres, platforms, tags, keys, orderItems, wishlist, cart
   - Validation: slug unique, price positive, inStock boolean

3. **Order** (from Prisma schema)
   - Fields: id, userId, status, subtotal, discount, total, paymentMethod, paymentStatus, createdAt, completedAt
   - Relationships: user, items, keys, transaction
   - Validation: status enum, total = subtotal - discount

4. **Transaction** (from Prisma schema)
   - Fields: id, userId, orderId, type, amount, currency, method, status, description, transactionHash, gatewayResponse, createdAt
   - Relationships: user, order
   - Validation: type enum, amount positive, status enum

5. **Article** (BlogPost in Prisma schema)
   - Fields: id, slug, title, excerpt, content, coverImage, category, author, published, publishedAt, readTime, tags, createdAt, updatedAt
   - Validation: slug unique, published boolean

6. **Authentication Token** (JWT)
   - Payload: userId, email, role
   - Expiration: configurable via environment variables
   - Types: Access token (short-lived), Refresh token (long-lived)

### API Contracts

**Directory**: `contracts/`

#### 1. Authentication Endpoints

**POST** `/api/auth/register`
- Request: `{ email: string, password: string, nickname?: string, firstName?: string, lastName?: string }`
- Response: `{ success: boolean, data: { user: User, token: string, refreshToken: string, expiresIn: number } }`

**POST** `/api/auth/login`
- Request: `{ email: string, password: string }`
- Response: `{ success: boolean, data: { user: User, token: string, refreshToken: string, expiresIn: number } }`

**POST** `/api/auth/refresh` (if implemented)
- Request: `{ refreshToken: string }`
- Response: `{ success: boolean, data: { token: string, refreshToken: string, expiresIn: number } }`

#### 2. Admin Endpoints

**GET** `/api/admin/dashboard`
- Headers: `Authorization: Bearer <token>`
- Response: `{ success: boolean, data: AdminDashboardStats }`

**GET** `/api/admin/users`
- Query params: `search?, role?, page?, pageSize?`
- Response: `{ success: boolean, data: { users: User[], total: number, page: number, pageSize: number } }`

**GET** `/api/admin/users/:id`
- Response: `{ success: boolean, data: UserDetailsResponse }`

**GET** `/api/admin/users/:id/export`
- Response: PDF file or JSON export

**GET** `/api/admin/games`
- Query params: `search?, page?, pageSize?`
- Response: `{ success: boolean, data: { games: Game[], total: number } }`

**POST** `/api/admin/games`
- Request: `GameCreateInput`
- Response: `{ success: boolean, data: Game }`

**PUT** `/api/admin/games/:id`
- Request: `GameUpdateInput`
- Response: `{ success: boolean, data: Game }`

**DELETE** `/api/admin/games/:id`
- Response: `{ success: boolean, message: string }`

**GET** `/api/admin/blog`
- Response: `{ success: boolean, data: { posts: Article[], total: number } }`

**POST** `/api/admin/blog`
- Request: `BlogPostCreateInput`
- Response: `{ success: boolean, data: Article }`

**PUT** `/api/admin/blog/:id`
- Request: `BlogPostUpdateInput`
- Response: `{ success: boolean, data: Article }`

**DELETE** `/api/admin/blog/:id`
- Response: `{ success: boolean, message: string }`

**GET** `/api/admin/orders`
- Query params: `status?, userId?, page?, pageSize?`
- Response: `{ success: boolean, data: { orders: Order[], total: number } }`

**PUT** `/api/admin/orders/:id/status`
- Request: `{ status: OrderStatus }`
- Response: `{ success: boolean, data: Order }`

**GET** `/api/admin/transactions`
- Query params: `type?, status?, userId?, page?, pageSize?`
- Response: `{ success: boolean, data: { transactions: Transaction[], total: number } }`

**POST** `/api/admin/g2a/sync`
- Response: `{ success: boolean, message: string, data?: { synced: number, errors: number } }`

### Quickstart Guide

**File**: `quickstart.md`

#### Development Setup

1. **Verify Prisma Schema**:
   ```bash
   cd backend
   # Review schema.prisma for completeness
   cat prisma/schema.prisma
   ```

2. **Generate TypeScript Types**:
   ```bash
   npm run prisma:generate
   # Verify types are generated in node_modules/.prisma/client/
   ```

3. **Run Database Migrations** (if schema changed):
   ```bash
   npm run prisma:migrate
   ```

4. **Verify Authentication Endpoints**:
   ```bash
   # Start backend server
   npm run dev
   
   # Test registration
   curl -X POST http://localhost:3001/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password123"}'
   
   # Test login
   curl -X POST http://localhost:3001/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password123"}'
   ```

5. **Verify Admin Endpoints** (requires admin token):
   ```bash
   # Get admin token (from login response)
   TOKEN="your-admin-token"
   
   # Test dashboard
   curl -X GET http://localhost:3001/api/admin/dashboard \
     -H "Authorization: Bearer $TOKEN"
   
   # Test user search
   curl -X GET "http://localhost:3001/api/admin/users?search=test" \
     -H "Authorization: Bearer $TOKEN"
   ```

#### Testing Checklist

- [ ] Prisma schema contains all required models
- [ ] TypeScript types generate without errors
- [ ] Authentication endpoints work (register, login)
- [ ] JWT tokens are generated and validated correctly
- [ ] Admin middleware protects admin routes
- [ ] Regular users cannot access admin endpoints (403 error)
- [ ] Admin users can access all admin endpoints
- [ ] All admin service functions are implemented
- [ ] Input validation works on all endpoints
- [ ] Error handling returns appropriate HTTP status codes

## Phase 2: Implementation Phases

### Phase 2.1: Database Schema Verification & Type Generation (P1)

1. **Verify Prisma Schema Completeness**
   - Review `backend/prisma/schema.prisma` against spec requirements
   - Ensure all models from Key Entities section exist
   - Verify all relationships are defined correctly
   - Verify all indexes are in place for performance

2. **Verify Type Generation**
   - Run `npm run prisma:generate` in backend directory
   - Verify types are generated in `node_modules/.prisma/client/`
   - Verify TypeScript compilation succeeds
   - Document type import paths for developers

### Phase 2.2: Authentication System Verification (P1)

3. **Verify Registration Endpoint**
   - Test user registration with valid data
   - Verify password hashing works (bcrypt)
   - Verify JWT token is returned
   - Verify user is created in database

4. **Verify Login Endpoint**
   - Test login with correct credentials
   - Verify JWT token is returned
   - Test login with incorrect credentials (should fail)
   - Verify token contains correct user data (userId, email, role)

5. **Verify Token Validation**
   - Test protected endpoint with valid token (should succeed)
   - Test protected endpoint with invalid token (should return 401)
   - Test protected endpoint with expired token (should return 401)
   - Test protected endpoint without token (should return 401)

6. **Verify Token Refresh** (if implemented)
   - Test refresh endpoint with valid refresh token
   - Verify new access token is returned
   - Test refresh with expired refresh token (should fail)

### Phase 2.3: Authorization System Verification (P1)

7. **Verify Admin Middleware**
   - Test admin endpoint with regular user token (should return 403)
   - Test admin endpoint with admin user token (should succeed)
   - Verify `requireAdmin` middleware checks role correctly

8. **Verify Resource Ownership**
   - Test user accessing own data (should succeed)
   - Test user accessing another user's data (should fail unless admin)
   - Test admin accessing any user's data (should succeed)

### Phase 2.4: Admin Panel Backend Functions Verification (P2)

9. **Verify Dashboard Endpoint**
   - Test `/api/admin/dashboard` returns statistics
   - Verify response includes user counts, order stats, revenue metrics
   - Verify aggregation queries are efficient

10. **Verify User Management Endpoints**
    - Test user search with filters
    - Test user details retrieval
    - Test user export functionality
    - Verify input validation on all endpoints

11. **Verify Game Management Endpoints**
    - Test game CRUD operations (create, read, update, delete)
    - Verify game creation validates required fields
    - Verify game updates persist correctly
    - Verify game deletion handles relationships

12. **Verify Order Management Endpoints**
    - Test order listing with filters
    - Test order status updates
    - Verify order data is accurate

13. **Verify Blog Post Management Endpoints**
    - Test blog post CRUD operations
    - Verify publishing/unpublishing works
    - Verify content is saved correctly

14. **Verify Transaction Endpoints**
    - Test transaction listing with filters
    - Verify transaction data is complete

15. **Verify G2A Sync Endpoint**
    - Test G2A synchronization trigger
    - Verify sync process completes
    - Verify errors are handled gracefully

### Phase 2.5: Error Handling & Validation (P2)

16. **Verify Input Validation**
    - Test all endpoints with invalid input
    - Verify validation errors are returned correctly
    - Verify validation prevents SQL injection

17. **Verify Error Handling**
    - Test error responses follow consistent format
    - Verify appropriate HTTP status codes (400, 401, 403, 404, 500)
    - Verify error messages are user-friendly

18. **Verify Logging**
    - Verify authentication attempts are logged
    - Verify authorization failures are logged
    - Verify admin actions are logged (if audit logging exists)

## Next Steps

После завершения планирования:

1. **Generate Tasks**: Run `/speckit.tasks` to create detailed task breakdown
2. **Review Plan**: Ensure all requirements from spec are covered
3. **Begin Implementation**: Run `/speckit.implement` to execute tasks
