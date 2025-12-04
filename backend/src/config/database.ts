import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

try {
  prisma = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });
  
  // Test connection
  prisma.$connect().catch(() => {
    console.warn('⚠️  Database connection failed. Some features may not work.');
  });
} catch (error) {
  console.warn('⚠️  Failed to initialize Prisma Client:', error);
  // @ts-ignore - Create a mock client for development
  prisma = null;
}

export default prisma;

