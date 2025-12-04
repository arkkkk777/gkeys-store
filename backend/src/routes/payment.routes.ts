import { Router } from 'express';
import {
  createBalanceTopUpController,
  paymentWebhookController,
  terminalWebhookController,
} from '../controllers/payment.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

// Balance top-up requires authentication
router.post('/balance-top-up', authenticate, createBalanceTopUpController);

// Webhooks don't require authentication (they use signature verification)
router.post('/webhook', paymentWebhookController);
router.post('/terminal-webhook', terminalWebhookController);

export default router;

