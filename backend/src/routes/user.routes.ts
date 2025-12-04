import { Router } from 'express';
import {
  getProfileController,
  updateProfileController,
  getBalanceController,
  getTransactionsController,
  getWishlistController,
  addToWishlistController,
  removeFromWishlistController,
} from '../controllers/user.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

// All user routes require authentication
router.use(authenticate);

router.get('/profile', getProfileController);
router.put('/profile', updateProfileController);
router.get('/balance', getBalanceController);
router.get('/transactions', getTransactionsController);
router.get('/wishlist', getWishlistController);
router.post('/wishlist/:gameId', addToWishlistController);
router.delete('/wishlist/:gameId', removeFromWishlistController);

export default router;

