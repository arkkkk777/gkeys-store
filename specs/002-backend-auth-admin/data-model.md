# Data Model: Complete Backend Setup with Database Models, Authorization, and Admin Panel

**Feature**: 002-backend-auth-admin  
**Date**: 2024-12-05

## Overview

Данная модель описывает структуры данных для backend инфраструктуры. Включает как Prisma schema модели, так и TypeScript типы для API.

## Database Entities (Prisma Schema)

### 1. User

Представляет пользователя платформы с учетными данными и профилем.

**Prisma Model**:
```prisma
model User {
  id            String   @id @default(uuid())
  email         String   @unique
  passwordHash  String
  nickname      String?  @default("Newbie Guy")
  firstName     String?
  lastName      String?
  avatar        String?
  balance       Decimal  @default(0) @db.Decimal(10, 2)
  role          Role     @default(USER)
  emailVerified Boolean  @default(false)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  orders        Order[]
  transactions  Transaction[]
  wishlist      Wishlist[]
  cart          CartItem[]

  @@index([email])
  @@map("users")
}
```

**Validation Rules**:
- `email`: Required, unique, valid email format
- `passwordHash`: Required, bcrypt hashed password
- `role`: Enum (USER or ADMIN), default: USER
- `balance`: Decimal, default: 0, precision: 10.2

**Relationships**:
- One-to-many: orders, transactions
- Many-to-many: wishlist (via Wishlist), cart (via CartItem)

**State Transitions**:
- Created → Verified (when email is verified)
- USER → ADMIN (when role is changed by admin)

### 2. Game

Представляет игру в каталоге.

**Prisma Model**: (See existing schema.prisma for full definition)

**Key Fields**:
- `id`, `title`, `slug`, `description`, `price`, `image`, `inStock`
- `ratingCritic`, `ratingUser`, `languages` (for advanced filters)
- `isBestSeller`, `isNew`, `isPreorder` (flags)

**Validation Rules**:
- `slug`: Required, unique, URL-safe
- `price`: Required, positive decimal
- `inStock`: Boolean, default: true

**Relationships**:
- Many-to-many: categories, genres, platforms, tags
- One-to-many: keys, orderItems, wishlist, cart

### 3. Order

Представляет заказ пользователя.

**Prisma Model**:
```prisma
model Order {
  id            String        @id @default(uuid())
  userId        String
  status        OrderStatus  @default(PENDING)
  subtotal      Decimal      @db.Decimal(10, 2)
  discount      Decimal      @default(0) @db.Decimal(10, 2)
  total         Decimal      @db.Decimal(10, 2)
  paymentMethod String?
  paymentStatus PaymentStatus?
  promoCode     String?
  createdAt     DateTime      @default(now())
  completedAt   DateTime?

  user          User          @relation(fields: [userId], references: [id], onDelete: Cascade)
  items         OrderItem[]
  keys          GameKey[]
  transaction   Transaction?

  @@index([userId])
  @@index([status])
  @@index([createdAt])
  @@map("orders")
}
```

**Validation Rules**:
- `status`: Enum (PENDING, PROCESSING, COMPLETED, FAILED, CANCELLED)
- `total`: Must equal `subtotal - discount`
- `userId`: Required, references User.id

**State Transitions**:
- PENDING → PROCESSING → COMPLETED
- PENDING → FAILED or CANCELLED (at any stage)

### 4. Transaction

Представляет финансовую транзакцию.

**Prisma Model**:
```prisma
model Transaction {
  id              String          @id @default(uuid())
  userId          String
  orderId         String?         @unique
  type            TransactionType
  amount          Decimal         @db.Decimal(10, 2)
  currency        String          @default("EUR")
  method          String?
  status          PaymentStatus
  description     String?
  transactionHash String?         @unique
  gatewayResponse Json?
  createdAt       DateTime        @default(now())

  user            User            @relation(fields: [userId], references: [id], onDelete: Cascade)
  order           Order?          @relation(fields: [orderId], references: [id])

  @@index([userId])
  @@index([type])
  @@index([status])
  @@index([transactionHash])
  @@index([createdAt])
  @@map("transactions")
}
```

**Validation Rules**:
- `type`: Enum (TOP_UP, PURCHASE, REFUND)
- `amount`: Required, positive decimal
- `status`: Enum (PENDING, PROCESSING, COMPLETED, FAILED, CANCELLED)

### 5. Article (BlogPost)

Представляет статью блога.

**Prisma Model**:
```prisma
model Article {
  id          String    @id @default(uuid())
  slug        String    @unique
  title       String
  excerpt     String
  content     String    @db.Text
  coverImage  String
  category    String
  author      String
  published   Boolean   @default(false)
  publishedAt DateTime?
  readTime    Int?
  tags        String[]
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@index([slug])
  @@index([category])
  @@index([published])
  @@map("articles")
}
```

**Validation Rules**:
- `slug`: Required, unique, URL-safe
- `published`: Boolean, default: false
- `publishedAt`: Set when `published` becomes true

**State Transitions**:
- Draft → Published (when `published` set to true)
- Published → Draft (when `published` set to false)

## TypeScript Types (API Layer)

### 1. Authentication Types

**File**: `backend/src/types/auth.ts`

```typescript
export interface RegisterRequest {
  email: string;
  password: string;
  nickname?: string;
  firstName?: string;
  lastName?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    nickname: string | null;
    firstName: string | null;
    lastName: string | null;
    avatar: string | null;
    role: 'USER' | 'ADMIN';
  };
  token: string;
  refreshToken: string;
  expiresIn: number; // seconds
}

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}
```

### 2. Admin Types

**File**: `backend/src/types/admin.ts`

```typescript
export interface AdminDashboardStats {
  totalUsers: number;
  newUsersToday: number;
  totalGames: number;
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  transactionsToday: number;
  totalRevenue: number;
  revenueToday: number;
  revenueWeek: number;
  revenueMonth: number;
  topSellingGames: Array<{
    id: string;
    title: string;
    salesCount: number;
    revenue: number;
  }>;
  recentOrders: Order[];
}

export interface UserSearchFilters {
  search?: string;
  role?: 'USER' | 'ADMIN';
  page?: number;
  pageSize?: number;
}

export interface TransactionFilters {
  type?: 'TOP_UP' | 'PURCHASE' | 'REFUND';
  status?: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
  userId?: string;
  page?: number;
  pageSize?: number;
}

export interface UserDetailsResponse {
  user: User;
  orders: Order[];
  transactions: Transaction[];
  totalSpent: number;
  gamesPurchased: number;
}

export interface GameCreateInput {
  title: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  // ... other game fields
}

export interface GameUpdateInput {
  title?: string;
  description?: string;
  price?: number;
  inStock?: boolean;
  // ... other updatable fields
}

export interface BlogPostCreateInput {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  author: string;
  tags?: string[];
  published?: boolean;
}

export interface BlogPostUpdateInput {
  title?: string;
  excerpt?: string;
  content?: string;
  coverImage?: string;
  category?: string;
  tags?: string[];
  published?: boolean;
  publishedAt?: Date;
}
```

### 3. Prisma Generated Types

**Import**: `import { User, Game, Order, Transaction, Article, ... } from '@prisma/client'`

These types are automatically generated by Prisma and include:
- All model types with proper field types
- Relationship types (e.g., `UserWithOrders`)
- Enum types (Role, OrderStatus, PaymentStatus, TransactionType)

## Data Flow

### Authentication Flow

```
User Registration/Login
  ↓
Validate Input (email, password)
  ↓
Hash Password (bcrypt) / Verify Password
  ↓
Create/Find User in Database
  ↓
Generate JWT Tokens (access + refresh)
  ↓
Return AuthResponse with tokens
```

### Authorization Flow

```
API Request
  ↓
Extract Token from Authorization Header
  ↓
Verify Token (JWT verification)
  ↓
Attach User Data to Request (req.user)
  ↓
Check Role (if admin endpoint)
  ↓
Proceed to Controller
```

### Admin Operation Flow

```
Admin Request
  ↓
Authentication Middleware (verify token)
  ↓
Authorization Middleware (verify ADMIN role)
  ↓
Controller (parse request, validate input)
  ↓
Service (business logic, database operations)
  ↓
Database (Prisma queries)
  ↓
Response (format data, return JSON)
```

## Type Generation

### Prisma Type Generation

**Command**: `npm run prisma:generate`

**Output**: Types generated to `node_modules/.prisma/client/`

**Usage**:
```typescript
import { User, Game, Order } from '@prisma/client';
import type { Prisma } from '@prisma/client';

// Use generated types
const user: User = await prisma.user.findUnique({ where: { id } });

// Use Prisma types for queries
const userWithOrders: Prisma.UserGetPayload<{
  include: { orders: true }
}> = await prisma.user.findUnique({
  where: { id },
  include: { orders: true }
});
```

### Custom Type Definitions

Custom types are defined in `backend/src/types/` directory:
- `auth.ts`: Authentication-related types
- `admin.ts`: Admin panel types
- `game.ts`: Game-related types
- `order.ts`: Order-related types
- `user.ts`: User-related types
- `blog.ts`: Blog-related types

These types extend or compose Prisma types for API-specific needs.

## Validation Rules

### Database Level
- Unique constraints: email (User), slug (Game, Article)
- Foreign key constraints: All relationships have proper foreign keys
- Check constraints: Can be added via Prisma for complex validations

### Application Level
- Input validation: express-validator for request validation
- Business logic validation: Service layer validates business rules
- Type validation: TypeScript compile-time type checking

## Indexes

### Performance Indexes
- User: `email` (for login lookups)
- Game: `slug`, `inStock`, `releaseDate`, `g2aProductId`, `ratingCritic`, `ratingUser`, `languages`
- Order: `userId`, `status`, `createdAt`
- Transaction: `userId`, `type`, `status`, `transactionHash`, `createdAt`
- Article: `slug`, `category`, `published`

Indexes are defined in Prisma schema using `@@index([field])` directive.
