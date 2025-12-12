# Quick Start: G2A Integration

## Prerequisites

- Node.js 20+ installed
- PostgreSQL database running
- Backend dependencies installed (`npm install` in `backend/`)

## Setup Steps

### 1. Configure Environment Variables

Add G2A credentials to `backend/.env`:

```bash
# G2A API Credentials (Test)
G2A_API_HASH=qdaiciDiyMaTjxMt
G2A_API_KEY=74026b3dc2c6db6a30a73e71cdb138b1e1b5eb7a97ced46689e2d28db1050875
G2A_API_URL=https://www.g2a.com/integration-api/v1
```

**Note**: 
- Replace with production credentials when ready
- Never commit `.env` file to repository
- **NEEDS CLARIFICATION**: Verify which credential maps to HASH vs KEY

### 2. Verify Database Schema

Ensure Prisma schema includes G2A fields:

```bash
cd backend
npm run prisma:generate
npm run prisma:migrate
```

**Required Fields**:
- `Game.g2aProductId` (string, optional)
- `Game.g2aStock` (boolean)
- `Game.g2aLastSync` (DateTime, optional)

### 3. Test API Connection

Test G2A API connection via admin endpoint (requires admin authentication):

```bash
# Start backend server
npm run dev

# In another terminal, test connection (requires admin JWT token)
curl -X GET http://localhost:3000/api/admin/g2a/test-connection \
  -H "Authorization: Bearer {admin_jwt_token}"

# Expected response:
# {
#   "success": true,
#   "message": "G2A API connection successful",
#   "data": {
#     "status": 200,
#     "totalProducts": 1234,
#     "apiUrl": "https://www.g2a.com/integration-api/v1"
#   }
# }
```

Test manual sync:

```bash
# Sync all products
curl -X POST http://localhost:3000/api/admin/g2a/sync \
  -H "Authorization: Bearer {admin_jwt_token}" \
  -H "Content-Type: application/json" \
  -d '{"fullSync": true}'

# Sync specific products
curl -X POST http://localhost:3000/api/admin/g2a/sync \
  -H "Authorization: Bearer {admin_jwt_token}" \
  -H "Content-Type: application/json" \
  -d '{"productIds": ["product-id-1", "product-id-2"]}'

# Check sync status
curl -X GET http://localhost:3000/api/admin/g2a/status \
  -H "Authorization: Bearer {admin_jwt_token}"
```

### 4. Enable Scheduled Sync Jobs

Scheduled jobs are automatically started when backend server starts. Verify in `backend/src/index.ts`:

```typescript
import { startG2ASyncJob, startStockCheckJob } from './jobs/g2a-sync.job';

// Start scheduled jobs
startG2ASyncJob(); // Runs at 2 AM and 2 PM daily
startStockCheckJob(); // Runs every 15 minutes
```

### 5. Verify Integration

**Check Logs**:
- Look for "🔄 Starting G2A catalog sync..." messages
- Verify "✅ G2A catalog sync completed" appears
- Check for any error messages

**Check Database**:
```sql
-- Verify products have G2A product IDs
SELECT id, title, g2aProductId, g2aStock, g2aLastSync 
FROM games 
WHERE g2aProductId IS NOT NULL 
LIMIT 10;

-- Check sync status
SELECT 
  COUNT(*) as total,
  COUNT(g2aProductId) as with_g2a_id,
  SUM(CASE WHEN g2aStock = true THEN 1 ELSE 0 END) as in_stock
FROM games;
```

## Common Issues

### Authentication Fails

**Symptoms**: 401 Unauthorized errors in logs

**Solutions**:
1. Verify environment variables are set correctly
2. Check credential mapping (HASH vs KEY)
3. Verify timestamp generation is correct
4. Check G2A API URL is correct

### Products Not Syncing

**Symptoms**: No products in database with `g2aProductId`

**Solutions**:
1. Check G2A API response format matches expected structure
2. Verify product transformation logic
3. Check database connection
4. Review sync job logs for errors

### Stock Status Incorrect

**Symptoms**: `g2aStock` doesn't match actual G2A availability

**Solutions**:
1. Verify stock check endpoint is working
2. Check stock check job is running (every 15 minutes)
3. Review `validateGameStock` function
4. Check G2A API stock response format

### Order Processing Fails

**Symptoms**: Orders stuck in PROCESSING status

**Solutions**:
1. Check G2A API order endpoint response
2. Verify key storage logic
3. Check order status update logic
4. Review error logs for specific failure reason

## Testing

### Unit Tests

```bash
cd backend
npm test -- g2a.service.test.ts
```

### Integration Tests

**Manual Testing**:
1. Start backend: `npm run dev`
2. Use admin interface to trigger manual sync
3. Place test order with G2A product
4. Verify keys are received and stored

**Automated Integration Tests** (to be implemented):
```bash
npm test -- g2a.integration.test.ts
```

## Next Steps

1. ✅ **Error Handling**: Structured error logging and retry logic implemented
2. ✅ **Request Batching**: Bulk operations use batching with rate limiting
3. ✅ **Rate Limiting**: Automatic detection and handling of 429 responses
4. ✅ **Audit Logging**: All G2A API interactions are logged for debugging
5. ⚠️ **Security Hardening**: Game keys encryption - documented in code (see order.service.ts), needs implementation decision
6. **Monitoring**: Set up alerts for sync failures and API errors (external monitoring tool needed)
7. **Credential Rotation**: Implement secure credential rotation process

## Support

- G2A API Documentation: [NEEDS CLARIFICATION - provide link if available]
- Internal Documentation: See `specs/006-g2a-integration/research.md`
- Code Reference: `backend/src/services/g2a.service.ts`
