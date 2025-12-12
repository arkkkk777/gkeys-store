# Quickstart Guide: Complete Backend Setup

**Feature**: 002-backend-auth-admin  
**Date**: 2024-12-05

## Prerequisites

- Node.js >= 20.0.0
- PostgreSQL database (local or remote)
- Environment variables configured (see Setup section)

## Development Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create or update `.env` file in `backend/` directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/gkeys_db"

# JWT Secrets
JWT_SECRET="your-secret-key-change-in-production"
JWT_EXPIRES_IN="7d"
JWT_REFRESH_SECRET="your-refresh-secret-change-in-production"
JWT_REFRESH_EXPIRES_IN="30d"

# Server
PORT=3001
NODE_ENV=development
```

### 3. Setup Database

```bash
# Generate Prisma client and types
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# (Optional) Seed database with test data
npm run prisma:seed
```

### 4. Verify Type Generation

```bash
# Generate types
npm run prisma:generate

# Verify TypeScript compilation
npm run build
```

If compilation succeeds, types are generated correctly.

### 5. Start Development Server

```bash
npm run dev
```

Server should start on `http://localhost:3001`

## Testing Authentication

### Register a New User

```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "nickname": "TestUser"
  }'
```

**Expected Response**:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "test@example.com",
      "nickname": "TestUser",
      "role": "USER"
    },
    "token": "jwt-access-token",
    "refreshToken": "jwt-refresh-token",
    "expiresIn": 604800
  }
}
```

### Login

```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Expected Response**: Same format as registration

### Test Protected Endpoint

```bash
# Use token from login response
TOKEN="your-jwt-token"

curl -X GET http://localhost:3001/api/admin/dashboard \
  -H "Authorization: Bearer $TOKEN"
```

**Expected Response** (if admin):
```json
{
  "success": true,
  "data": {
    "totalUsers": 100,
    "newUsersToday": 5,
    "totalGames": 500,
    ...
  }
}
```

**Expected Response** (if regular user):
```json
{
  "success": false,
  "error": {
    "message": "Admin access required"
  }
}
```
Status code: 403 Forbidden

## Testing Admin Endpoints

### Create Admin User

Admin users must be created manually or via seed script. To create an admin user:

1. Register a regular user
2. Update user role in database:
   ```sql
   UPDATE users SET role = 'ADMIN' WHERE email = 'admin@example.com';
   ```
3. Login with admin credentials to get admin token

### Test Admin Dashboard

```bash
ADMIN_TOKEN="admin-jwt-token"

curl -X GET http://localhost:3001/api/admin/dashboard \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

### Test User Management

```bash
# Search users
curl -X GET "http://localhost:3001/api/admin/users?search=test&page=1&pageSize=20" \
  -H "Authorization: Bearer $ADMIN_TOKEN"

# Get user details
curl -X GET "http://localhost:3001/api/admin/users/{userId}" \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

### Test Game Management

```bash
# List games
curl -X GET http://localhost:3001/api/admin/games \
  -H "Authorization: Bearer $ADMIN_TOKEN"

# Create game
curl -X POST http://localhost:3001/api/admin/games \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Game",
    "slug": "test-game",
    "description": "Test description",
    "price": 29.99,
    "image": "https://example.com/image.jpg"
  }'
```

## Verification Checklist

### Database & Types
- [ ] Prisma schema contains all required models
- [ ] `npm run prisma:generate` completes without errors
- [ ] TypeScript compilation succeeds (`npm run build`)
- [ ] Types are importable: `import { User } from '@prisma/client'`

### Authentication
- [ ] User registration works
- [ ] User login works
- [ ] JWT tokens are generated correctly
- [ ] Tokens contain correct payload (userId, email, role)
- [ ] Protected endpoints require valid token
- [ ] Invalid tokens return 401 Unauthorized

### Authorization
- [ ] Regular users cannot access admin endpoints (403 Forbidden)
- [ ] Admin users can access admin endpoints
- [ ] `requireAdmin` middleware works correctly

### Admin Functions
- [ ] Dashboard endpoint returns statistics
- [ ] User search works with filters
- [ ] User details endpoint returns complete data
- [ ] Game CRUD operations work
- [ ] Blog post CRUD operations work
- [ ] Order listing works
- [ ] Transaction listing works
- [ ] G2A sync endpoint works

### Error Handling
- [ ] Invalid input returns 400 Bad Request
- [ ] Missing token returns 401 Unauthorized
- [ ] Invalid role returns 403 Forbidden
- [ ] Not found resources return 404 Not Found
- [ ] Server errors return 500 Internal Server Error
- [ ] All errors follow consistent format: `{ success: false, error: { message: string } }`

## Common Issues & Solutions

### Issue: Type generation fails
**Solution**: Check Prisma schema syntax, ensure all models are valid

### Issue: Database connection fails
**Solution**: Verify DATABASE_URL in .env, ensure PostgreSQL is running

### Issue: JWT token validation fails
**Solution**: Verify JWT_SECRET matches between token generation and validation

### Issue: Admin endpoints return 403
**Solution**: Verify user role is set to 'ADMIN' in database, check token contains correct role

### Issue: TypeScript compilation errors
**Solution**: Run `npm run prisma:generate` to regenerate types after schema changes

## Next Steps

1. **Generate Tasks**: Run `/speckit.tasks` to create detailed implementation tasks
2. **Review Implementation**: Verify all endpoints match API contracts
3. **Test Thoroughly**: Run integration tests to verify functionality
4. **Documentation**: Update API documentation with actual endpoint details
