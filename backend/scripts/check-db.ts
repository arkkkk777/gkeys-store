#!/usr/bin/env tsx
/**
 * Database connection and migration check script
 * Usage: tsx scripts/check-db.ts
 */

import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function checkDatabase() {
  try {
    console.log('🔍 Checking database connection...');
    
    // Test connection
    await prisma.$queryRaw`SELECT 1`;
    console.log('✅ Database connection successful');
    
    // Check if migrations are up to date
    console.log('\n🔍 Checking migrations...');
    const migrations = await prisma.$queryRaw<Array<{ migration_name: string }>>`
      SELECT migration_name 
      FROM _prisma_migrations 
      ORDER BY finished_at DESC 
      LIMIT 5
    `;
    
    console.log('✅ Recent migrations:');
    migrations.forEach((m, i) => {
      console.log(`   ${i + 1}. ${m.migration_name}`);
    });
    
    // Check if externalOrderId field exists in orders table
    console.log('\n🔍 Checking Order model fields...');
    try {
      const testOrder = await prisma.order.findFirst({
        select: { externalOrderId: true },
      });
      console.log('✅ externalOrderId field exists in Order model');
    } catch (err) {
      console.warn('⚠️  externalOrderId field may not exist. Run migration: npm run prisma:migrate');
    }
    
    // Check user count
    const userCount = await prisma.user.count();
    console.log(`\n📊 Database stats:`);
    console.log(`   Users: ${userCount}`);
    
    const gameCount = await prisma.game.count();
    console.log(`   Games: ${gameCount}`);
    
    const orderCount = await prisma.order.count();
    console.log(`   Orders: ${orderCount}`);
    
    console.log('\n✅ Database check completed successfully');
    
  } catch (error) {
    console.error('❌ Database check failed:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('P1001')) {
        console.error('\n💡 Database server is not reachable. Check:');
        console.error('   1. Is PostgreSQL running?');
        console.error('   2. Is DATABASE_URL correct in .env?');
        console.error('   3. Are firewall rules allowing connections?');
      } else if (error.message.includes('P1000')) {
        console.error('\n💡 Authentication failed. Check:');
        console.error('   1. Database credentials in DATABASE_URL');
        console.error('   2. User permissions');
      } else if (error.message.includes('P1003')) {
        console.error('\n💡 Database does not exist. Create it first:');
        console.error('   CREATE DATABASE your_database_name;');
      }
    }
    
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabase();
