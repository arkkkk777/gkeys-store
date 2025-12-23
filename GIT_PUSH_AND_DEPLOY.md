# Git Push & Vercel Deploy - Final Steps

## Quick Commands

```bash
# 1. Check status
git status

# 2. Add all changes
git add .

# 3. Commit
git commit -m "feat: Configure monolith deployment for Vercel

- Added serverless wrapper (api/index.ts) for Express backend
- Updated backend/src/index.ts for serverless compatibility
- Configured vercel.json for serverless functions
- Updated build scripts (vercel-build)
- Complete G2A integration with webhooks and metrics
- Database setup with migrations
- Comprehensive documentation"

# 4. Push
git push origin 003-design-ui-kit
# or
git push origin main
```

## Vercel Deployment

### Option 1: Dashboard (Recommended)

1. Go to https://vercel.com/new
2. Import repository: `gkeys2`
3. Configure:
   - **Framework**: Vite
   - **Root Directory**: `.`
   - **Build Command**: `npm run vercel-build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install && cd backend && npm install`
4. **Environment Variables** (add all):
   ```
   # Frontend
   VITE_API_BASE_URL=https://your-project.vercel.app/api
   
   # Backend
   DATABASE_URL=postgresql://...
   DIRECT_URL=postgresql://...
   JWT_SECRET=...
   JWT_REFRESH_SECRET=...
   G2A_API_URL=https://api.g2a.com/integration-api/v1
   G2A_API_KEY=...
   G2A_API_HASH=...
   G2A_ENV=sandbox
   FRONTEND_URL=https://your-project.vercel.app
   NODE_ENV=production
   ```
5. Click "Deploy"

### Option 2: CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

## Post-Deployment

1. **Run Migrations**:
   ```bash
   cd backend
   DATABASE_URL="production-url" npm run prisma:migrate:deploy
   ```

2. **Verify**:
   - Frontend: `https://your-project.vercel.app`
   - Health: `https://your-project.vercel.app/api/health`
   - Test registration: `https://your-project.vercel.app/api/auth/register`

## Files Changed for Deployment

- `api/index.ts` - NEW: Serverless wrapper
- `backend/src/index.ts` - Updated: Conditional server startup
- `vercel.json` - Updated: Serverless functions config
- `package.json` - Updated: vercel-build script
- Documentation files updated

## Troubleshooting

See `VERCEL_MONOLITH_DEPLOY.md` for detailed troubleshooting guide.
