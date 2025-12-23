# ✅ Deployment Ready

## Status

All files are prepared for Vercel monolith deployment:
- ✅ Serverless wrapper created (`api/index.ts`)
- ✅ Backend configured for serverless (`backend/src/index.ts`)
- ✅ Vercel configuration updated (`vercel.json`)
- ✅ Build scripts configured (`package.json`)
- ✅ Documentation complete

## What Was Done

### 1. Serverless Wrapper
- Created `api/index.ts` - Vercel serverless function handler
- Handles all `/api/*` requests
- Imports Express app from backend
- Adds `/api` prefix back to paths (Vercel strips it)

### 2. Backend Updates
- Modified `backend/src/index.ts` to:
  - Export Express app (for serverless)
  - Conditionally start server (only if not in Vercel)
  - Check `process.env.VERCEL` to detect serverless environment

### 3. Vercel Configuration
- Updated `vercel.json`:
  - Added `functions` configuration for `api/index.ts`
  - Added rewrite rule for `/api/*` → serverless function
  - Kept existing SPA routing for frontend

### 4. Build Configuration
- Updated root `package.json`:
  - Added `build:backend` script
  - Added `build:all` script (builds both)
  - Updated `vercel-build` to use `build:all`
  - Added `@vercel/node` to devDependencies

## Next Steps

### 1. Git Commit & Push

```bash
git add .
git commit -m "feat: Configure monolith deployment for Vercel

- Added serverless wrapper (api/index.ts)
- Updated backend for serverless compatibility  
- Configured vercel.json for serverless functions
- Updated build scripts for monolith deployment"

git push origin main
```

### 2. Deploy to Vercel

**Via Dashboard**:
1. Go to https://vercel.com/new
2. Import repository
3. Configure:
   - Build Command: `npm run vercel-build`
   - Install Command: `npm install && cd backend && npm install`
4. Add environment variables (see checklist below)
5. Deploy

**Via CLI**:
```bash
vercel --prod
```

### 3. Set Environment Variables

**In Vercel Dashboard → Settings → Environment Variables**:

**Frontend**:
- `VITE_API_BASE_URL` = `https://your-project.vercel.app/api`

**Backend** (all required):
- `DATABASE_URL` = PostgreSQL connection string
- `DIRECT_URL` = Same as DATABASE_URL
- `JWT_SECRET` = Strong random string
- `JWT_REFRESH_SECRET` = Different strong random string
- `G2A_API_URL` = `https://api.g2a.com/integration-api/v1`
- `G2A_API_KEY` = Your G2A API key
- `G2A_API_HASH` = Your G2A API hash
- `G2A_ENV` = `sandbox` or `live`
- `FRONTEND_URL` = `https://your-project.vercel.app`
- `NODE_ENV` = `production`

**Optional**:
- `REDIS_URL` = Redis connection string
- `PORT` = `3001`

### 4. Run Database Migrations

After deployment, run migrations on production database:

```bash
cd backend
DATABASE_URL="production-url" npm run prisma:migrate:deploy
```

### 5. Verify Deployment

Test endpoints:
- Frontend: `https://your-project.vercel.app`
- Health: `https://your-project.vercel.app/api/health`
- Register: `POST https://your-project.vercel.app/api/auth/register`
- Login: `POST https://your-project.vercel.app/api/auth/login`

## File Structure

```
gkeys2/
├── api/
│   └── index.ts              # Serverless function wrapper
├── backend/
│   ├── src/
│   │   └── index.ts          # Express app (exports app, conditional listen)
│   └── package.json
├── dist/                     # Frontend build (generated)
├── vercel.json               # Vercel config (updated)
└── package.json              # Root package (updated with vercel-build)
```

## Important Notes

1. **Build Process**: 
   - `vercel-build` runs `build:all` which builds both frontend and backend
   - Frontend → `dist/`
   - Backend → `backend/dist/`
   - Serverless function uses compiled backend

2. **Path Handling**:
   - Vercel strips `/api` prefix
   - Serverless wrapper adds it back
   - Express app receives paths with `/api` prefix

3. **Environment Detection**:
   - Backend checks `process.env.VERCEL` to detect serverless
   - Server only starts if not in Vercel environment
   - Scheduled jobs don't run in serverless (use Vercel Cron Jobs if needed)

4. **Database**:
   - Must be accessible from Vercel (IP whitelist if needed)
   - Run migrations after deployment
   - Use connection pooling for serverless

## Troubleshooting

See `VERCEL_MONOLITH_DEPLOY.md` for detailed troubleshooting.

## Documentation

- `DEPLOY_NOW.md` - Quick deploy guide
- `VERCEL_MONOLITH_DEPLOY.md` - Detailed monolith deployment guide
- `DEPLOY_CHECKLIST.md` - Pre-deployment checklist
- `GIT_PUSH_AND_DEPLOY.md` - Git and deploy commands
