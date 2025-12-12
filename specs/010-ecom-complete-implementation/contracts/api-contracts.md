# API Contracts: Complete E-Commerce Platform

**Date**: 2024-12-10  
**Feature**: 010-ecom-complete-implementation

## Overview

This document defines the API contracts for all endpoints required by the complete e-commerce platform implementation. Contracts follow RESTful conventions and use TypeScript types.

## Authentication Endpoints

### POST /api/auth/register
Register a new user account.

**Request**:
```typescript
{
  email: string;
  password: string;
  agreeToTerms: boolean;
}
```

**Response** (201):
```typescript
{
  user: {
    id: string;
    email: string;
    nickname: string;
  };
  message: string;
}
```

**Errors**:
- 400: Invalid input, email already exists, terms not agreed
- 500: Server error

### POST /api/auth/login
Login user and create session.

**Request**:
```typescript
{
  email: string;
  password: string;
}
```

**Response** (200):
```typescript
{
  user: {
    id: string;
    email: string;
    nickname: string;
  };
  token: string;
}
```

**Errors**:
- 401: Invalid credentials
- 500: Server error

### POST /api/auth/password-reset
Request password reset email.

**Request**:
```typescript
{
  email: string;
}
```

**Response** (200):
```typescript
{
  message: string;
}
```

## Cart Endpoints

### GET /api/cart
Get user's cart items (supports both authenticated and session-based).

**Response** (200):
```typescript
{
  items: Array<{
    gameId: string;
    game: Game;
    quantity: number;
  }>;
  total: number;
}
```

### POST /api/cart
Add item to cart.

**Request**:
```typescript
{
  gameId: string;
  quantity: number;
}
```

**Response** (201):
```typescript
{
  item: CartItem;
  message: string;
}
```

### PUT /api/cart/:gameId
Update cart item quantity.

**Request**:
```typescript
{
  quantity: number;
}
```

**Response** (200):
```typescript
{
  item: CartItem;
}
```

### DELETE /api/cart/:gameId
Remove item from cart.

**Response** (200):
```typescript
{
  message: string;
}
```

## Wishlist Endpoints

### GET /api/wishlist
Get user's wishlist.

**Response** (200):
```typescript
{
  items: Array<{
    gameId: string;
    game: Game;
    addedAt: string;
  }>;
}
```

### POST /api/wishlist
Add game to wishlist.

**Request**:
```typescript
{
  gameId: string;
}
```

**Response** (201):
```typescript
{
  item: WishlistItem;
  message: string;
}
```

### DELETE /api/wishlist/:gameId
Remove game from wishlist.

**Response** (200):
```typescript
{
  message: string;
}
```

## Order Endpoints

### POST /api/orders
Create new order from cart.

**Request**:
```typescript
{
  items: Array<{
    gameId: string;
    quantity: number;
  }>;
  promoCode?: string;
}
```

**Response** (201):
```typescript
{
  order: {
    id: string;
    status: OrderStatus;
    total: number;
    items: OrderItem[];
  };
}
```

**Errors**:
- 400: Insufficient balance, out of stock
- 500: Server error

### GET /api/orders
Get user's order history.

**Query Parameters**:
- `page?: number` (default: 1)
- `limit?: number` (default: 10)

**Response** (200):
```typescript
{
  orders: Order[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}
```

### GET /api/orders/:id
Get order details.

**Response** (200):
```typescript
{
  order: Order & {
    items: Array<OrderItem & { game: Game }>;
    keys: GameKey[];
  };
}
```

## Payment Endpoints

### POST /api/payment/top-up
Create balance top-up intent.

**Request**:
```typescript
{
  amount: number;
  currency: string;
  paymentMethod: string;
  promoCode?: string;
}
```

**Response** (201):
```typescript
{
  intent: {
    id: string;
    amount: number;
    currency: string;
    paymentUrl: string;
  };
}
```

### POST /api/payment/webhook
Payment gateway webhook (internal).

**Request**: Gateway-specific format

**Response** (200):
```typescript
{
  success: boolean;
}
```

## User Profile Endpoints

### GET /api/user/profile
Get user profile with statistics.

**Response** (200):
```typescript
{
  user: {
    id: string;
    email: string;
    nickname: string;
    firstName?: string;
    lastName?: string;
    balance: number;
    createdAt: string;
  };
  stats: {
    gamesPurchased: number;
    totalSavings: number;
    daysSinceRegistration: number;
  };
}
```

### PUT /api/user/profile
Update user profile.

**Request**:
```typescript
{
  nickname?: string;
  firstName?: string;
  lastName?: string;
}
```

**Response** (200):
```typescript
{
  user: User;
}
```

### PUT /api/user/password
Change password.

**Request**:
```typescript
{
  currentPassword: string;
  newPassword: string;
}
```

**Response** (200):
```typescript
{
  message: string;
}
```

## Game Catalog Endpoints

### GET /api/games
Get games with advanced filtering.

**Query Parameters**:
- `search?: string` - Search by title
- `minPrice?: number` - Minimum price
- `maxPrice?: number` - Maximum price
- `inStockOnly?: boolean` - Filter out preorders
- `platforms?: string[]` - Filter by platforms
- `genres?: string[]` - Filter by genres
- `publishers?: string[]` - Filter by publishers
- `activationServices?: string[]` - Filter by activation services
- `regions?: string[]` - Filter by regions
- `multiplayer?: boolean` - Filter by multiplayer
- `sort?: 'popular' | 'newest' | 'price-high' | 'price-low'`
- `page?: number` (default: 1)
- `limit?: number` (default: 36)

**Response** (200):
```typescript
{
  games: Game[];
  total: number;
  pagination: {
    page: number;
    limit: number;
    totalPages: number;
  };
}
```

### GET /api/games/:slug
Get game details.

**Response** (200):
```typescript
{
  game: Game & {
    similarGames: Game[];
  };
}
```

## Admin Endpoints

### GET /api/admin/users
Search users (admin only).

**Query Parameters**:
- `search?: string` - Search by name or email
- `page?: number`
- `limit?: number`

**Response** (200):
```typescript
{
  users: User[];
  pagination: Pagination;
}
```

### GET /api/admin/transactions
Get transactions with filtering (admin only).

**Query Parameters**:
- `paymentMethod?: string`
- `dateFrom?: string`
- `dateTo?: string`
- `hash?: string` - Search by transaction hash

**Response** (200):
```typescript
{
  transactions: Transaction[];
  total: number;
}
```

### GET /api/admin/users/:id/summary
Get user summary with all top-ups and orders (admin only).

**Response** (200):
```typescript
{
  user: User;
  topUps: Transaction[];
  orders: Order[];
  pdfUrl?: string; // If PDF generated
}
```

### GET /api/admin/users/:id/summary/pdf
Generate and download user summary PDF (admin only).

**Response** (200): PDF file

## Blog Endpoints

### GET /api/blog
Get blog articles.

**Query Parameters**:
- `category?: string` - Filter by article type
- `page?: number`
- `limit?: number`

**Response** (200):
```typescript
{
  articles: Article[];
  pagination: Pagination;
}
```

### GET /api/blog/:slug
Get article details.

**Response** (200):
```typescript
{
  article: Article;
}
```

## FAQ Endpoints

### GET /api/faq
Get FAQ items.

**Query Parameters**:
- `category?: string` - Filter by category

**Response** (200):
```typescript
{
  faqs: Array<{
    id: string;
    category: string;
    question: string;
    answer: string;
  }>;
}
```

## Type Definitions

```typescript
interface Game {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  images: string[];
  inStock: boolean;
  isBestSeller: boolean;
  isNew: boolean;
  isPreorder: boolean;
  releaseDate: string;
  platforms: Platform[];
  genres: Genre[];
  tags: Tag[];
}

interface Order {
  id: string;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
  total: number;
  discount: number;
  createdAt: string;
  items: OrderItem[];
}

interface Transaction {
  id: string;
  type: 'TOP_UP' | 'PURCHASE' | 'REFUND';
  amount: number;
  currency: string;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  paymentMethod?: string;
  transactionHash?: string;
  createdAt: string;
}

interface User {
  id: string;
  email: string;
  nickname: string;
  firstName?: string;
  lastName?: string;
  balance: number;
  createdAt: string;
}
```
