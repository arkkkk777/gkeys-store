import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';


let prisma: ReturnType<typeof createPrismaClient>;

function createPrismaClient() {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'production' ? ['error', 'warn'] : ['error'],
  }).$extends(withAccelerate());
}

try {
  prisma = createPrismaClient();
  
  // Test connection
  prisma.$connect().catch(() => {
    console.warn('⚠️  Database connection failed. Some features may not work.');
  });
  
  console.log('✅ Prisma Client with Accelerate initialized');
} catch (error) {
  console.warn('⚠️  Failed to initialize Prisma Client:', error);
  // @ts-expect-error - Create a mock client for development
  prisma = null;
}

export default prisma;
