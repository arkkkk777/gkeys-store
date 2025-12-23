# Quick Start Guide

## Prerequisites Check

1. **PostgreSQL** running and accessible
2. **Redis** running (optional, for idempotency store)
3. **Environment variables** configured (`.env` file)

## Setup Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Database

See `DATABASE_SETUP.md` for detailed instructions.

Quick setup:
```bash
# Create .env file with DATABASE_URL
# Example: DATABASE_URL="postgresql://user:password@localhost:5432/gkeys_db"

# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Verify connection
npm run db:check
```

### 3. Start Development Server

```bash
npm run dev
```

Server will start on `http://localhost:3001`

## Verify Functionality

### 1. Health Check

```bash
curl http://localhost:3001/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "...",
  "checks": {
    "database": "ok",
    "redis": "ok",
    "g2a": "ok"
  }
}
```

### 2. User Registration

```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test1234",
    "nickname": "TestUser"
  }'
```

Expected: `201 Created` with user data and tokens

### 3. User Login

```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test1234"
  }'
```

Expected: `200 OK` with user data and tokens

### 4. Protected Route (with token)

```bash
curl http://localhost:3001/api/user/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

Expected: `200 OK` with user profile

## Common Issues

### Database Connection Failed

- Check PostgreSQL is running
- Verify `DATABASE_URL` in `.env`
- Run `npm run db:check` for diagnostics

### Registration/Login Fails

- Check database connection
- Verify Prisma client is generated: `npm run prisma:generate`
- Check migrations are applied: `npm run prisma:migrate`

### G2A Integration Issues

- Verify G2A env vars in `.env`:
  - `G2A_API_URL`
  - `G2A_API_KEY`
  - `G2A_API_HASH`
  - `G2A_ENV` (sandbox/live)

## Next Steps

- See `DATABASE_SETUP.md` for database configuration
- See `specs/011-g2a-integration-audit/` for G2A integration docs
- Check API routes in `src/routes/` directory
