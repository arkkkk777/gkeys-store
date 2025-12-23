import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFoundHandler';
import { sessionMiddleware } from './middleware/session.middleware';
import { startG2ASyncJob, startStockCheckJob } from './jobs/g2a-sync.job';
import prisma, { initializeDatabase } from './config/database';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessionMiddleware);

// Health check with G2A and idempotency store checks
app.get('/health', async (req, res) => {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    checks: {
      database: 'unknown',
      redis: 'unknown',
      g2a: 'unknown',
    },
  };
  
  try {
    // Check database
    await prisma.$queryRaw`SELECT 1`;
    health.checks.database = 'ok';
  } catch (err) {
    health.checks.database = 'error';
    health.status = 'degraded';
  }
  
  try {
    // Check Redis (idempotency store)
    const redis = await import('./config/redis');
    if (redis.default.isOpen) {
      await redis.default.ping();
      health.checks.redis = 'ok';
    } else {
      health.checks.redis = 'disconnected';
      health.status = 'degraded';
    }
  } catch (err) {
    health.checks.redis = 'error';
    health.status = 'degraded';
  }
  
  try {
    // Check G2A connectivity (try to get config - if it throws, G2A is misconfigured)
    const { getG2AConfig } = await import('./config/g2a');
    const config = getG2AConfig();
    // Try a simple token validation check
    const { validateG2ACredentials } = await import('./services/g2a.service');
    validateG2ACredentials();
    health.checks.g2a = 'ok';
  } catch (err) {
    health.checks.g2a = 'error';
    health.status = 'degraded';
  }
  
  const statusCode = health.status === 'ok' ? 200 : 503;
  res.status(statusCode).json(health);
});

// API Routes
import authRoutes from './routes/auth.routes';
import gameRoutes from './routes/game.routes';
import orderRoutes from './routes/order.routes';
import paymentRoutes from './routes/payment.routes';
import userRoutes from './routes/user.routes';
import blogRoutes from './routes/blog.routes';
import adminRoutes from './routes/admin.routes';
import cartRoutes from './routes/cart.routes';
import wishlistRoutes from './routes/wishlist.routes';
import faqRoutes from './routes/faq.routes';
import g2aWebhookRoutes from './routes/g2a-webhook.routes';

app.use('/api/auth', authRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/user', userRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/faq', faqRoutes);
app.use('/api/g2a', g2aWebhookRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Initialize database (for both server and serverless)
let dbInitialized = false;

async function initializeApp(): Promise<boolean> {
  if (!dbInitialized) {
    const dbConnected = await initializeDatabase();
    dbInitialized = true;
    return dbConnected;
  }
  return true;
}

// Initialize database and start server (only if not in Vercel/serverless environment)
const isVercel = !!process.env.VERCEL;
const isServerless = !!process.env.VERCEL_ENV;

if (!isVercel && !isServerless) {
  // Running as standalone server (development/production server)
  async function startServer() {
    const dbConnected = await initializeApp();
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
      
      // Start scheduled jobs only if database is connected
      if (process.env.NODE_ENV !== 'test' && dbConnected) {
        startG2ASyncJob();
        startStockCheckJob();
        console.log('⏰ Scheduled jobs started');
      }
    });
  }

  startServer().catch((error) => {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  });
} else {
  // Running as Vercel serverless function
  // Initialize database on first request (lazy initialization)
  initializeApp().catch((error) => {
    console.error('⚠️  Database initialization failed:', error);
  });
}

export default app;

