import { Router } from 'express';
import {
  createOrderController,
  getUserOrdersController,
  getOrderByIdController,
} from '../controllers/order.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

// All order routes require authentication
router.use(authenticate);

router.post('/', createOrderController);
router.get('/', getUserOrdersController);
router.get('/:id', getOrderByIdController);

export default router;

