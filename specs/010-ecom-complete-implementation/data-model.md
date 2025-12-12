# Data Model: Complete E-Commerce Platform Implementation

**Date**: 2024-12-10  
**Feature**: 010-ecom-complete-implementation

## Overview

This document defines the data models required for the complete e-commerce platform implementation. The models extend the existing Prisma schema to support all features from the technical specification.

## Existing Models (Already Implemented)

### User Model
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
}
```

**Fields Used**:
- `nickname`: Display name (default: "Newbie Guy")
- `firstName`, `lastName`: User profile information
- `balance`: Account balance for purchases
- `createdAt`: Used to calculate days since registration

### Game Model
```prisma
model Game {
  id                String   @id @default(uuid())
  title             String
  slug              String   @unique
  description       String   @db.Text
  shortDescription  String?
  price             Decimal  @db.Decimal(10, 2)
  originalPrice     Decimal? @db.Decimal(10, 2)
  discount          Int?     @default(0)
  currency          String   @default("EUR")
  image             String
  images            String[]
  inStock           Boolean  @default(true)
  g2aProductId      String?
  g2aStock          Boolean  @default(false)
  g2aLastSync       DateTime?
  releaseDate       DateTime
  isBestSeller      Boolean  @default(false)
  isNew             Boolean  @default(false)
  isPreorder        Boolean  @default(false)
  // ... other fields
}
```

**Fields Used**:
- `isBestSeller`: For Best Seller badge
- `isNew`: For New badge (games released within 2 weeks)
- `isPreorder`: For Preorder badge
- `discount`: Random 5-10% discount calculation
- `originalPrice`: For showing crossed-out price

### Order Model
```prisma
model Order {
  id            String      @id @default(uuid())
  userId        String
  status        OrderStatus @default(PENDING)
  total         Decimal     @db.Decimal(10, 2)
  discount      Decimal     @default(0) @db.Decimal(10, 2)
  promoCodeId   String?
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt

  user          User        @relation(fields: [userId], references: [id])
  items         OrderItem[]
  transactions  Transaction[]
}
```

**Fields Used**:
- `status`: Order status (PENDING, PROCESSING, COMPLETED, FAILED, CANCELLED)
- `total`: Total order amount
- `discount`: Applied discount amount
- `createdAt`: Order date display

### Transaction Model
```prisma
model Transaction {
  id            String          @id @default(uuid())
  userId        String
  type          TransactionType
  amount        Decimal         @db.Decimal(10, 2)
  currency      String          @default("EUR")
  status        PaymentStatus   @default(PENDING)
  paymentMethod String?
  gatewayHash   String?
  createdAt     DateTime        @default(now())

  user          User            @relation(fields: [userId], references: [id])
  order         Order?          @relation(fields: [orderId], references: [id])
  orderId       String?
}
```

**Fields Used**:
- `type`: TOP_UP, PURCHASE, REFUND
- `amount`: Transaction amount
- `paymentMethod`: Payment method used
- `gatewayHash`: Transaction hash for search
- `createdAt`: Transaction date/time

### Wishlist Model
```prisma
model Wishlist {
  id        String   @id @default(uuid())
  userId    String
  gameId    String
  createdAt DateTime @default(now())

  user      User     @relation(fields: [userId], references: [id])
  game      Game     @relation(fields: [gameId], references: [id])

  @@unique([userId, gameId])
}
```

**Status**: Already exists, supports both authenticated and guest users (via session)

### CartItem Model
```prisma
model CartItem {
  id        String   @id @default(uuid())
  userId    String?  // Nullable for guest users (uses session ID)
  gameId    String
  quantity  Int      @default(1)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user      User?    @relation(fields: [userId], references: [id])
  game      Game     @relation(fields: [gameId], references: [id])

  @@unique([userId, gameId])
}
```

**Enhancement Needed**: 
- Support for session-based cart (userId nullable, use session ID)
- Migration logic when guest logs in

## Extended Models (To Be Enhanced)

### OrderItem Model
```prisma
model OrderItem {
  id        String   @id @default(uuid())
  orderId   String
  gameId    String
  quantity  Int
  price     Decimal  @db.Decimal(10, 2)
  discount  Decimal  @default(0) @db.Decimal(10, 2)
  gameKey   String?  // G2A key after purchase

  order     Order    @relation(fields: [orderId], references: [id])
  game      Game     @relation(fields: [gameId], references: [id])

  @@index([orderId])
  @@index([gameId])
}
```

**Enhancement**: 
- `gameKey` field stores G2A key after purchase
- Used for email delivery

## New Models (To Be Created)

### Session Model (For Guest Cart/Wishlist)
```prisma
model Session {
  id        String   @id @default(uuid())
  sessionId String   @unique
  data      Json     // Stores cart/wishlist data
  expiresAt DateTime
  createdAt DateTime @default(now())

  @@index([sessionId])
  @@index([expiresAt])
}
```

**Purpose**: Store guest cart/wishlist data with expiration

### EmailTemplate Model (Optional - for dynamic templates)
```prisma
model EmailTemplate {
  id        String   @id @default(uuid())
  name      String   @unique // 'registration', 'balance-topup', 'game-key', 'password-reset'
  subject   String
  html      String   @db.Text
  variables Json     // Available variables
  active    Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

**Purpose**: Store email templates in database for easy editing (optional enhancement)

### PromoCode Model (Already exists, verify)
```prisma
model PromoCode {
  id          String   @id @default(uuid())
  code        String   @unique
  discount    Decimal  @db.Decimal(5, 2) // Percentage
  active      Boolean  @default(true)
  validFrom   DateTime
  validUntil  DateTime
  maxUses     Int?
  usedCount   Int      @default(0)
  createdAt   DateTime @default(now())
}
```

**Status**: Verify existence, used in payment and order services

### BlogArticle Model (Verify existence)
```prisma
model BlogArticle {
  id          String   @id @default(uuid())
  title       String
  slug        String   @unique
  tag         String?  // Article type/category
  introduction String  @db.Text
  content     String   @db.Text
  image       String?
  published   Boolean  @default(false)
  publishedAt DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([tag])
  @@index([published, publishedAt])
}
```

**Status**: Verify existence for blog functionality

### FAQ Model (For FAQ page)
```prisma
model FAQ {
  id        String   @id @default(uuid())
  category  String
  question  String
  answer    String   @db.Text
  order     Int      @default(0) // Display order
  active    Boolean  @default(true)
  createdAt DateTime @default(now())

  @@index([category, order])
}
```

**Purpose**: Store FAQ questions and answers by category

## Data Relationships

### User Relationships
```
User
├── orders (1:N) → Order
├── transactions (1:N) → Transaction
├── wishlist (1:N) → Wishlist
└── cart (1:N) → CartItem
```

### Order Relationships
```
Order
├── user (N:1) → User
├── items (1:N) → OrderItem
└── transactions (1:N) → Transaction
```

### Game Relationships
```
Game
├── cartItems (1:N) → CartItem
├── wishlistItems (1:N) → Wishlist
└── orderItems (1:N) → OrderItem
```

## Data Validation Rules

### User Model
- `email`: Must be unique, valid email format
- `nickname`: Optional, default "Newbie Guy"
- `balance`: Must be >= 0
- `passwordHash`: Required, hashed with bcrypt

### Game Model
- `price`: Must be > 0
- `originalPrice`: Must be >= price if discount exists
- `discount`: Calculated as: `((originalPrice - price) / originalPrice) * 100`
- `isNew`: Calculated as: `releaseDate >= (now() - 14 days)`
- `isBestSeller`: Set randomly or by sales volume

### Order Model
- `total`: Must be > 0
- `discount`: Must be <= total
- `status`: Must follow state machine: PENDING → PROCESSING → COMPLETED/FAILED

### Transaction Model
- `amount`: Must be > 0 for TOP_UP, can be negative for PURCHASE
- `gatewayHash`: Unique if provided
- `type`: Must be one of: TOP_UP, PURCHASE, REFUND

### CartItem Model
- `quantity`: Must be > 0
- `userId`: Can be null for guest users (uses session ID)
- Unique constraint on `[userId, gameId]`

## State Transitions

### Order Status Flow
```
PENDING → PROCESSING → COMPLETED
                ↓
             FAILED
                ↓
            CANCELLED
```

**Rules**:
- Order starts as PENDING
- Moves to PROCESSING when payment confirmed
- Moves to COMPLETED when G2A key received
- Moves to FAILED if G2A purchase fails
- Can be CANCELLED before PROCESSING

### Payment Status Flow
```
PENDING → PROCESSING → COMPLETED
                ↓
             FAILED
                ↓
            CANCELLED
```

**Rules**:
- Transaction starts as PENDING
- Moves to PROCESSING when gateway confirms
- Moves to COMPLETED when balance updated
- Moves to FAILED if gateway rejects
- Can be CANCELLED by user

## Indexes for Performance

### User Model
- `@@index([email])` - For login and search

### Game Model
- `@@index([price])` - For price filtering
- `@@index([inStock, isPreorder])` - For stock filtering
- `@@index([releaseDate])` - For new games
- `@@index([isBestSeller, isNew])` - For homepage sections
- `@@index([g2aProductId])` - For G2A sync

### Order Model
- `@@index([userId, createdAt])` - For user order history
- `@@index([status])` - For order filtering

### Transaction Model
- `@@index([userId, type, createdAt])` - For user transaction history
- `@@index([gatewayHash])` - For transaction search
- `@@index([paymentMethod, createdAt])` - For admin filtering

### CartItem Model
- `@@index([userId])` - For user cart retrieval
- `@@unique([userId, gameId])` - Prevent duplicates

### Wishlist Model
- `@@index([userId])` - For user wishlist retrieval
- `@@unique([userId, gameId])` - Prevent duplicates

## Migration Strategy

### Phase 1: Session Support
1. Make `CartItem.userId` nullable
2. Add `Session` model
3. Create migration script for existing carts

### Phase 2: Email Templates
1. Create `EmailTemplate` model (optional)
2. Migrate existing templates to database

### Phase 3: FAQ
1. Create `FAQ` model
2. Seed initial FAQ data

### Phase 4: Blog Enhancement
1. Verify `BlogArticle` model exists
2. Add missing fields if needed

## Data Seeding

### Initial Data Required
1. **FAQ Categories**: Support, Payment, Account, Orders, G2A
2. **Email Templates**: Registration, Balance Top-up, Game Key, Password Reset
3. **Promo Codes**: None initially (admin can create)
4. **Blog Articles**: Sample articles for testing

## Summary

Most data models already exist in the Prisma schema. The main additions needed are:
1. Session model for guest cart/wishlist
2. FAQ model for FAQ page
3. Email template model (optional enhancement)
4. Enhancements to existing models for new features

All relationships are properly defined, and indexes are in place for performance optimization.
