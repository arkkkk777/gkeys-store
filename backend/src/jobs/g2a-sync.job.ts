import cron from 'node-cron';
import { syncG2ACatalog } from '../services/g2a.service';
import { validateGameStock } from '../services/g2a.service';
import prisma from '../config/database';

// Sync G2A catalog 2 times per day (at 2 AM and 2 PM)
export const startG2ASyncJob = () => {
  cron.schedule('0 2,14 * * *', async () => {
    console.log('🔄 Starting G2A catalog sync...');
    try {
      await syncG2ACatalog();
      console.log('✅ G2A catalog sync completed');
    } catch (error) {
      console.error('❌ G2A catalog sync failed:', error);
    }
  });
};

// Check game stock every 15 minutes
export const startStockCheckJob = () => {
  cron.schedule('*/15 * * * *', async () => {
    console.log('🔍 Checking game stock...');
    try {
      // Get all games with G2A product IDs
      const games = await prisma.game.findMany({
        where: {
          g2aProductId: { not: null },
          inStock: true,
        },
        select: {
          id: true,
          g2aProductId: true,
        },
      });

      // Check stock for each game
      for (const game of games) {
        if (game.g2aProductId) {
          try {
            const inStock = await validateGameStock(game.g2aProductId);
            await prisma.game.update({
              where: { id: game.id },
              data: {
                g2aStock: inStock,
                inStock: inStock,
                g2aLastSync: new Date(),
              },
            });
          } catch (error) {
            console.error(`Failed to check stock for game ${game.id}:`, error);
          }
        }
      }

      console.log(`✅ Stock check completed for ${games.length} games`);
    } catch (error) {
      console.error('❌ Stock check failed:', error);
    }
  });
};

