import prisma from '../config/database';
import { CreateOrderRequest, OrderResponse } from '../types/order';
import { AppError } from '../middleware/errorHandler';
import { purchaseGameKey } from './g2a.service';
import { sendGameKeyEmail } from './email.service';

export const createOrder = async (
  userId: string,
  data: CreateOrderRequest
): Promise<OrderResponse> => {
  const { items, promoCode } = data;

  // Get user with balance
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    const error: AppError = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  // Get games and calculate totals
  const gameIds = items.map((item) => item.gameId);
  const games = await prisma.game.findMany({
    where: { id: { in: gameIds } },
    include: {
      platforms: {
        include: { platform: true },
      },
    },
  });

  if (games.length !== gameIds.length) {
    const error: AppError = new Error('Some games not found');
    error.statusCode = 404;
    throw error;
  }

  // Check stock
  for (const item of items) {
    const game = games.find((g) => g.id === item.gameId);
    if (!game || !game.inStock) {
      const error: AppError = new Error(`Game ${game?.title || item.gameId} is out of stock`);
      error.statusCode = 400;
      throw error;
    }
  }

  // Calculate subtotal
  let subtotal = 0;
  const orderItems = items.map((item) => {
    const game = games.find((g) => g.id === item.gameId)!;
    const itemPrice = Number(game.price) * item.quantity;
    subtotal += itemPrice;
    return {
      gameId: item.gameId,
      quantity: item.quantity,
      price: Number(game.price),
      discount: 0,
    };
  });

  // Apply promo code if provided
  let discount = 0;
  if (promoCode) {
    const promo = await prisma.promoCode.findUnique({
      where: { code: promoCode },
    });

    if (promo && promo.active && promo.usedCount < (promo.maxUses || Infinity)) {
      const now = new Date();
      if (now >= promo.validFrom && now <= promo.validUntil) {
        discount = Number((subtotal * Number(promo.discount) / 100).toFixed(2));
        // Update promo code usage
        await prisma.promoCode.update({
          where: { id: promo.id },
          data: { usedCount: promo.usedCount + 1 },
        });
      }
    }
  }

  const total = subtotal - discount;

  // Check balance
  if (Number(user.balance) < total) {
    const error: AppError = new Error('Insufficient balance');
    error.statusCode = 400;
    throw error;
  }

  // Create order
  const order = await prisma.order.create({
    data: {
      userId,
      status: 'PROCESSING',
      subtotal,
      discount,
      total,
      promoCode,
      paymentStatus: 'PENDING',
      items: {
        create: orderItems,
      },
    },
    include: {
      items: {
        include: {
          game: {
            select: {
              id: true,
              title: true,
              image: true,
              slug: true,
            },
          },
        },
      },
    },
  });

  // Deduct balance
  await prisma.user.update({
    where: { id: userId },
    data: {
      balance: {
        decrement: total,
      },
    },
  });

  // Create transaction
  await prisma.transaction.create({
    data: {
      userId,
      orderId: order.id,
      type: 'PURCHASE',
      amount: -total,
      currency: 'EUR',
      status: 'COMPLETED',
      description: `Order ${order.id}`,
    },
  });

  // Purchase keys from G2A and send emails
  const gameKeys: any[] = [];
  for (const item of items) {
    const game = games.find((g) => g.id === item.gameId)!;
    
    if (game.g2aProductId) {
      try {
        // Purchase key from G2A
        const g2aKey = await purchaseGameKey(game.g2aProductId);
        
        // Create game key
        const gameKey = await prisma.gameKey.create({
          data: {
            gameId: game.id,
            key: g2aKey.key,
            orderId: order.id,
          },
        });

        gameKeys.push(gameKey);

        // Send email with key
        await sendGameKeyEmail(user.email, {
          gameTitle: game.title,
          key: g2aKey.key,
          platform: game.platforms[0]?.platform.name || 'PC',
        });
      } catch (error) {
        console.error(`Failed to purchase key for game ${game.id}:`, error);
        // Continue with other games even if one fails
      }
    }
  }

  // Update order status to COMPLETED
  const completedOrder = await prisma.order.update({
    where: { id: order.id },
    data: {
      status: 'COMPLETED',
      paymentStatus: 'COMPLETED',
      completedAt: new Date(),
    },
    include: {
      items: {
        include: {
          game: {
            select: {
              id: true,
              title: true,
              image: true,
              slug: true,
            },
          },
        },
      },
      keys: true,
    },
  });

  return {
    id: completedOrder.id,
    userId: completedOrder.userId,
    status: completedOrder.status,
    subtotal: Number(completedOrder.subtotal),
    discount: Number(completedOrder.discount),
    total: Number(completedOrder.total),
    paymentMethod: completedOrder.paymentMethod || undefined,
    paymentStatus: completedOrder.paymentStatus || undefined,
    promoCode: completedOrder.promoCode || undefined,
    createdAt: completedOrder.createdAt.toISOString(),
    completedAt: completedOrder.completedAt?.toISOString(),
    items: completedOrder.items.map((item) => ({
      id: item.id,
      gameId: item.gameId,
      game: item.game,
      quantity: item.quantity,
      price: Number(item.price),
      discount: Number(item.discount),
    })),
    keys: completedOrder.keys.map((key) => ({
      id: key.id,
      gameId: key.gameId,
      key: key.key,
      activated: key.activated,
      activationDate: key.activationDate?.toISOString(),
    })),
  };
};

export const getUserOrders = async (userId: string): Promise<OrderResponse[]> => {
  const orders = await prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    include: {
      items: {
        include: {
          game: {
            select: {
              id: true,
              title: true,
              image: true,
              slug: true,
            },
          },
        },
      },
      keys: true,
    },
  });

  return orders.map((order) => ({
    id: order.id,
    userId: order.userId,
    status: order.status,
    subtotal: Number(order.subtotal),
    discount: Number(order.discount),
    total: Number(order.total),
    paymentMethod: order.paymentMethod || undefined,
    paymentStatus: order.paymentStatus || undefined,
    promoCode: order.promoCode || undefined,
    createdAt: order.createdAt.toISOString(),
    completedAt: order.completedAt?.toISOString(),
    items: order.items.map((item) => ({
      id: item.id,
      gameId: item.gameId,
      game: item.game,
      quantity: item.quantity,
      price: Number(item.price),
      discount: Number(item.discount),
    })),
    keys: order.keys.map((key) => ({
      id: key.id,
      gameId: key.gameId,
      key: key.key,
      activated: key.activated,
      activationDate: key.activationDate?.toISOString(),
    })),
  }));
};

export const getOrderById = async (
  userId: string,
  orderId: string
): Promise<OrderResponse | null> => {
  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      userId,
    },
    include: {
      items: {
        include: {
          game: {
            select: {
              id: true,
              title: true,
              image: true,
              slug: true,
            },
          },
        },
      },
      keys: true,
    },
  });

  if (!order) return null;

  return {
    id: order.id,
    userId: order.userId,
    status: order.status,
    subtotal: Number(order.subtotal),
    discount: Number(order.discount),
    total: Number(order.total),
    paymentMethod: order.paymentMethod || undefined,
    paymentStatus: order.paymentStatus || undefined,
    promoCode: order.promoCode || undefined,
    createdAt: order.createdAt.toISOString(),
    completedAt: order.completedAt?.toISOString(),
    items: order.items.map((item) => ({
      id: item.id,
      gameId: item.gameId,
      game: item.game,
      quantity: item.quantity,
      price: Number(item.price),
      discount: Number(item.discount),
    })),
    keys: order.keys.map((key) => ({
      id: key.id,
      gameId: key.gameId,
      key: key.key,
      activated: key.activated,
      activationDate: key.activationDate?.toISOString(),
    })),
  };
};

