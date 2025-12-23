# Database Setup Guide

## Prerequisites

- PostgreSQL 14+ installed and running
- Node.js 20+ installed
- Environment variables configured (see `.env.example`)

## Quick Start

### 1. Configure Environment Variables

Create `.env` file in `backend/` directory:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/gkeys_db?schema=public"
DIRECT_URL="postgresql://user:password@localhost:5432/gkeys_db?schema=public"
```

### 2. Create Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE gkeys_db;

# Exit psql
\q
```

### 3. Generate Prisma Client

```bash
npm run prisma:generate
```

### 4. Run Migrations

```bash
# Development (creates migration files)
npm run prisma:migrate

# Production (applies existing migrations)
npm run prisma:migrate:deploy
```

### 5. Seed Database (Optional)

```bash
npm run prisma:seed
```

### 6. Verify Database Connection

```bash
npm run db:check
```

## Troubleshooting

### Database Connection Failed

**Error**: `P1001: Can't reach database server`

**Solutions**:
1. Check if PostgreSQL is running: `pg_isready` or `systemctl status postgresql`
2. Verify DATABASE_URL in `.env` file
3. Check firewall rules
4. Verify PostgreSQL is listening on correct port (default: 5432)

### Authentication Failed

**Error**: `P1000: Authentication failed`

**Solutions**:
1. Verify database credentials in DATABASE_URL
2. Check PostgreSQL user permissions
3. Update `pg_hba.conf` if needed

### Database Does Not Exist

**Error**: `P1003: Database does not exist`

**Solution**: Create database first (see step 2 above)

### Migration Issues

**Error**: Migration conflicts or missing migrations

**Solutions**:
1. Check migration status: `npx prisma migrate status`
2. Reset database (development only): `npx prisma migrate reset`
3. Create new migration: `npm run prisma:migrate`

## Database Schema

The database includes the following main models:

- **User**: User accounts with authentication
- **Game**: Game products with G2A integration
- **Order**: Orders with external order ID for G2A webhooks
- **Transaction**: Payment transactions
- **CartItem**: Shopping cart items
- **Wishlist**: User wishlists
- **Category, Genre, Platform, Tag**: Game metadata

## Recent Schema Changes

### Added `externalOrderId` to Order Model

This field stores G2A order IDs for webhook integration:

```prisma
model Order {
  // ... other fields
  externalOrderId String? @unique // G2A order ID
  // ...
}
```

**Migration**: Run `npm run prisma:migrate` to apply this change.

## Health Check

The `/health` endpoint checks:
- Database connectivity
- Redis connectivity (idempotency store)
- G2A configuration

Access: `GET http://localhost:3001/health`

## Development Tools

- **Prisma Studio**: Visual database browser
  ```bash
  npm run prisma:studio
  ```
  Opens at: http://localhost:5555

- **Database Check Script**: Verify connection and migrations
  ```bash
  npm run db:check
  ```

## Production Deployment

1. Set `DATABASE_URL` in production environment
2. Run migrations: `npm run prisma:migrate:deploy`
3. Generate Prisma client: `npm run prisma:generate`
4. Verify connection: `npm run db:check`
