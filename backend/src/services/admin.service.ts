import prisma from '../config/database';
import { AdminDashboardStats, UserSearchFilters, TransactionFilters, UserDetailsResponse } from '../types/admin';
import { AppError } from '../middleware/errorHandler';
import { Prisma } from '@prisma/client';

export const getDashboardStats = async (): Promise<AdminDashboardStats> => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [totalUsers, transactionsToday, pendingOrders, revenueData] = await Promise.all([
    prisma.user.count(),
    prisma.transaction.count({
      where: {
        createdAt: { gte: today },
        type: 'TOP_UP',
        status: 'COMPLETED',
      },
    }),
    prisma.order.count({
      where: { status: 'PENDING' },
    }),
    prisma.transaction.aggregate({
      where: {
        type: 'TOP_UP',
        status: 'COMPLETED',
      },
      _sum: {
        amount: true,
      },
    }),
  ]);

  return {
    totalUsers,
    transactionsToday,
    pendingOrders,
    totalRevenue: revenueData._sum.amount ? Number(revenueData._sum.amount) : 0,
  };
};

export const searchUsers = async (filters: UserSearchFilters) => {
  const where: Prisma.UserWhereInput = {};

  if (filters.query) {
    where.OR = [
      { email: { contains: filters.query, mode: 'insensitive' } },
      { nickname: { contains: filters.query, mode: 'insensitive' } },
      { firstName: { contains: filters.query, mode: 'insensitive' } },
      { lastName: { contains: filters.query, mode: 'insensitive' } },
    ];
  }

  if (filters.email) {
    where.email = { contains: filters.email, mode: 'insensitive' };
  }

  if (filters.name) {
    where.OR = [
      { firstName: { contains: filters.name, mode: 'insensitive' } },
      { lastName: { contains: filters.name, mode: 'insensitive' } },
    ];
  }

  const users = await prisma.user.findMany({
    where,
    take: 50,
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      email: true,
      nickname: true,
      firstName: true,
      lastName: true,
      balance: true,
      role: true,
      createdAt: true,
    },
  });

  return users.map((user) => ({
    id: user.id,
    email: user.email,
    nickname: user.nickname || 'Newbie Guy',
    firstName: user.firstName || undefined,
    lastName: user.lastName || undefined,
    balance: Number(user.balance),
    role: user.role,
    createdAt: user.createdAt.toISOString(),
  }));
};

export const getUserDetails = async (userId: string): Promise<UserDetailsResponse> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      orders: {
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          status: true,
          total: true,
          createdAt: true,
        },
      },
      transactions: {
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          type: true,
          amount: true,
          status: true,
          createdAt: true,
        },
      },
    },
  });

  if (!user) {
    const error: AppError = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  return {
    id: user.id,
    email: user.email,
    nickname: user.nickname || 'Newbie Guy',
    firstName: user.firstName || undefined,
    lastName: user.lastName || undefined,
    balance: Number(user.balance),
    role: user.role,
    createdAt: user.createdAt.toISOString(),
    orders: user.orders.map((order) => ({
      id: order.id,
      status: order.status,
      total: Number(order.total),
      createdAt: order.createdAt.toISOString(),
    })),
    transactions: user.transactions.map((t) => ({
      id: t.id,
      type: t.type,
      amount: Number(t.amount),
      status: t.status,
      createdAt: t.createdAt.toISOString(),
    })),
  };
};

export const getTransactions = async (filters?: TransactionFilters) => {
  const where: Prisma.TransactionWhereInput = {};

  if (filters?.method) {
    where.method = filters.method;
  }

  if (filters?.status) {
    where.status = filters.status as 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
  }

  if (filters?.transactionHash) {
    where.transactionHash = { contains: filters.transactionHash, mode: 'insensitive' };
  }

  if (filters?.startDate || filters?.endDate) {
    where.createdAt = {};
    if (filters.startDate) {
      where.createdAt.gte = new Date(filters.startDate);
    }
    if (filters.endDate) {
      where.createdAt.lte = new Date(filters.endDate);
    }
  }

  const transactions = await prisma.transaction.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: 100,
    include: {
      user: {
        select: {
          id: true,
          email: true,
          nickname: true,
        },
      },
      order: {
        select: {
          id: true,
          status: true,
        },
      },
    },
  });

  return transactions.map((t) => ({
    id: t.id,
    userId: t.userId,
    user: {
      id: t.user.id,
      email: t.user.email,
      nickname: t.user.nickname || 'Newbie Guy',
    },
    orderId: t.orderId || undefined,
    order: t.order ? {
      id: t.order.id,
      status: t.order.status,
    } : undefined,
    type: t.type,
    amount: Number(t.amount),
    currency: t.currency,
    method: t.method || undefined,
    status: t.status,
    description: t.description || undefined,
    transactionHash: t.transactionHash || undefined,
    createdAt: t.createdAt.toISOString(),
  }));
};

export const generateFakeDataForUser = async (userId: string, webhookData: Record<string, unknown>): Promise<void> => {
  // This function is called when processing terminal webhooks
  // The actual logic is in processTerminalWebhook in payment.service.ts
  // This is just a placeholder for admin-triggered fake data generation
  console.log(`Generating fake data for user ${userId}`);
};

export const exportUserReport = async (userId: string): Promise<Buffer> => {
  // TODO: Implement PDF generation
  // This should generate a PDF with:
  // - User details
  // - All top-up transactions
  // - All orders
  // - Summary statistics

  // For now, return empty buffer
  return Buffer.from('');
};

