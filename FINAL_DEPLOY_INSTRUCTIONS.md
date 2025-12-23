# Final Deployment Instructions

## ✅ Everything is Ready!

All files are prepared and staged for deployment.

## Quick Deploy Commands

```bash
# 1. Review changes
git status

# 2. Commit everything
git commit -m "feat: Complete monolith deployment setup for Vercel

- Added serverless wrapper (api/index.ts) for Express backend
- Updated backend for serverless compatibility (conditional server startup)
- Configured vercel.json for serverless functions and rewrites
- Updated build scripts (vercel-build, build:all, build:backend)
- Complete G2A integration (webhooks, metrics, health checks)
- Database setup with externalOrderId migration
- Comprehensive documentation and deployment guides"

# 3. Push to repository
git push origin 003-design-ui-kit
# or
git push origin main

# 4. Deploy to Vercel (choose one method below)
```

## Vercel Deployment

### Method 1: Dashboard (Easiest)

1. **Go to**: https://vercel.com/new
2. **Import**: Your GitHub repository `gkeys2`
3. **Configure**:
   - Framework: **Vite**
   - Root Directory: `.`
   - Build Command: **`npm run vercel-build`**
   - Output Directory: **`dist`**
   - Install Command: **`npm install && cd backend && npm install`**
4. **Environment Variables** (add ALL):
   
   **Frontend**:
   ```
   VITE_API_BASE_URL = https://your-project.vercel.app/api
   ```
   (Use the deployment URL you'll get from Vercel)
   
   **Backend** (all required):
   ```
   DATABASE_URL = postgresql://user:password@host:5432/database
   DIRECT_URL = postgresql://user:password@host:5432/database
   JWT_SECRET = [generate strong 32+ char secret]
   JWT_REFRESH_SECRET = [generate different strong 32+ char secret]
   G2A_API_URL = https://api.g2a.com/integration-api/v1
   G2A_API_KEY = [your-g2a-key]
   G2A_API_HASH = [your-g2a-hash]
   G2A_ENV = sandbox
   FRONTEND_URL = https://your-project.vercel.app
   NODE_ENV = production
   ```
   
   **Optional**:
   ```
   REDIS_URL = redis://host:6379
   PORT = 3001
   ```

5. **Deploy**: Click "Deploy" button
6. **Wait**: ~3-5 minutes for build
7. **Get URL**: Copy the deployment URL
8. **Update VITE_API_BASE_URL**: 
   - Go to Settings → Environment Variables
   - Update `VITE_API_BASE_URL` with actual deployment URL
   - Redeploy

### Method 2: CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy (from project root)
vercel

# Follow prompts, then:
vercel --prod
```

## Post-Deployment Steps

### 1. Run Database Migrations

```bash
cd backend
DATABASE_URL="your-production-database-url" npm run prisma:migrate:deploy
```

### 2. Verify Deployment

Test these URLs (replace with your Vercel URL):

```bash
# Health check
curl https://your-project.vercel.app/api/health

# Registration test
curl -X POST https://your-project.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test1234","nickname":"Test"}'
```

### 3. Update Frontend Environment Variable

After first deployment:
1. Get your Vercel URL: `https://your-project.vercel.app`
2. Update `VITE_API_BASE_URL` in Vercel Dashboard:
   - Value: `https://your-project.vercel.app/api`
3. Redeploy (or wait for auto-redeploy)

## Files Added/Modified

### New Files
- `api/index.ts` - Serverless function wrapper
- `backend/src/config/g2a.ts` - G2A configuration
- `backend/src/services/g2a-webhook.service.ts` - Webhook handler
- `backend/src/services/g2a-metrics.service.ts` - Metrics system
- `backend/src/controllers/g2a-webhook.controller.ts` - Webhook controller
- `backend/src/routes/g2a-webhook.routes.ts` - Webhook routes
- `backend/scripts/test-endpoints.ts` - Endpoint testing
- `backend/scripts/test-g2a.ts` - G2A testing
- `backend/scripts/check-db.ts` - Database check
- Multiple documentation files

### Modified Files
- `backend/src/index.ts` - Serverless compatibility
- `backend/src/middleware/errorHandler.ts` - AppError class
- `backend/src/types/g2a.ts` - Webhook types
- `vercel.json` - Serverless functions config
- `package.json` - Build scripts
- `README.md` - Updated setup instructions

## Success Checklist

After deployment, verify:

- [ ] Frontend loads: `https://your-project.vercel.app`
- [ ] Health check works: `https://your-project.vercel.app/api/health`
- [ ] Registration works: `POST /api/auth/register`
- [ ] Login works: `POST /api/auth/login`
- [ ] Games load: `GET /api/games`
- [ ] No CORS errors in browser console
- [ ] Database migrations applied
- [ ] Environment variables set correctly

## Troubleshooting

### Build Fails
- Check Vercel build logs
- Verify Node.js version (>=20)
- Ensure all dependencies in both package.json files

### API Returns 404
- Check `vercel.json` rewrites
- Verify `api/index.ts` exists
- Check serverless function logs in Vercel Dashboard

### Database Errors
- Verify `DATABASE_URL` is set
- Check database is accessible from Vercel
- Run migrations: `npm run prisma:migrate:deploy`

## Documentation

- `DEPLOYMENT_READY.md` - This file
- `VERCEL_MONOLITH_DEPLOY.md` - Detailed deployment guide
- `DEPLOY_NOW.md` - Quick deploy steps
- `GIT_PUSH_AND_DEPLOY.md` - Git and deploy commands
- `FRONTEND_BACKEND_INTEGRATION.md` - Integration details

## Ready to Deploy!

All code is ready. Just:
1. `git commit` (if not done)
2. `git push`
3. Deploy on Vercel
4. Set environment variables
5. Run migrations
6. Test!
