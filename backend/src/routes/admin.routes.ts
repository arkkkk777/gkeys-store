import { Router } from 'express';
import {
  getDashboardController,
  searchUsersController,
  getUserDetailsController,
  getTransactionsController,
  generateFakeDataController,
  exportUserReportController,
  syncG2AController,
  getGamesController,
  createGameController,
  updateGameController,
  deleteGameController,
  getBlogPostsController,
  createBlogPostController,
  updateBlogPostController,
  deleteBlogPostController,
  getOrdersController,
  updateOrderStatusController,
} from '../controllers/admin.controller';
import { authenticate, requireAdmin } from '../middleware/auth';

const router = Router();

// All admin routes require authentication and admin role
router.use(authenticate);
router.use(requireAdmin);

// Dashboard
router.get('/dashboard', getDashboardController);

// Users
router.get('/users', searchUsersController);
router.get('/users/:id', getUserDetailsController);
router.get('/users/:id/export', exportUserReportController);
router.post('/users/:id/generate-fake-data', generateFakeDataController);

// Transactions
router.get('/transactions', getTransactionsController);

// Games CRUD
router.get('/games', getGamesController);
router.post('/games', createGameController);
router.put('/games/:id', updateGameController);
router.delete('/games/:id', deleteGameController);

// Blog Posts CRUD
router.get('/blog', getBlogPostsController);
router.post('/blog', createBlogPostController);
router.put('/blog/:id', updateBlogPostController);
router.delete('/blog/:id', deleteBlogPostController);

// Orders
router.get('/orders', getOrdersController);
router.put('/orders/:id/status', updateOrderStatusController);

// G2A Sync
router.post('/g2a/sync', syncG2AController);

export default router;
