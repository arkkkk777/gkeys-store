import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFoundHandler';
import { startG2ASyncJob, startStockCheckJob } from './jobs/g2a-sync.job';

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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
import authRoutes from './routes/auth.routes';
import gameRoutes from './routes/game.routes';
import orderRoutes from './routes/order.routes';
import paymentRoutes from './routes/payment.routes';
import userRoutes from './routes/user.routes';
import blogRoutes from './routes/blog.routes';
import adminRoutes from './routes/admin.routes';

app.use('/api/auth', authRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/user', userRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/admin', adminRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  
  // Start scheduled jobs
  if (process.env.NODE_ENV !== 'test') {
    startG2ASyncJob();
    startStockCheckJob();
    console.log('⏰ Scheduled jobs started');
  }
});

export default app;

