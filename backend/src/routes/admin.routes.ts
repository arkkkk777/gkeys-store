import { Router } from 'express';
import {
  getDashboardController,
  searchUsersController,
  getUserDetailsController,
  getTransactionsController,
  generateFakeDataController,
  exportUserReportController,
  syncG2AController,
} from '../controllers/admin.controller';
import { authenticate, requireAdmin } from '../middleware/auth';

const router = Router();

// All admin routes require authentication and admin role
router.use(authenticate);
router.use(requireAdmin);

router.get('/dashboard', getDashboardController);
router.get('/users', searchUsersController);
router.get('/users/:id', getUserDetailsController);
router.get('/users/:id/export', exportUserReportController);
router.post('/users/:id/generate-fake-data', generateFakeDataController);
router.get('/transactions', getTransactionsController);
router.post('/g2a/sync', syncG2AController);

export default router;

