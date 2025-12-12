import apiClient from './api';

export interface OrderItem {
  gameId: string;
  quantity: number;
}

export interface CreateOrderRequest {
  items: OrderItem[];
  promoCode?: string;
}

export interface Order {
  id: string;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
  subtotal: number;
  discount: number;
  total: number;
  promoCode?: string;
  paymentStatus?: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
  createdAt: string;
  completedAt?: string;
  items: Array<{
    id: string;
    gameId: string;
    quantity: number;
    price: number;
    game: {
      id: string;
      title: string;
      slug: string;
      image: string;
    };
  }>;
}

export interface CreateOrderResponse {
  id: string;
  status: string;
  total: number;
  items: OrderItem[];
}

export const orderApi = {
  /**
   * Create a new order from cart items
   */
  createOrder: async (data: CreateOrderRequest): Promise<CreateOrderResponse> => {
    const response = await apiClient.post<{ success: boolean; data: CreateOrderResponse }>(
      '/api/orders',
      data
    );
    return response.data;
  },

  /**
   * Get user's order history
   */
  getOrders: async (page: number = 1, limit: number = 10): Promise<{
    orders: Order[];
    pagination: {
      page: number;
      limit: number;
      total: number;
    };
  }> => {
    const response = await apiClient.get<{
      success: boolean;
      data: Order[];
    }>('/api/orders', {
      params: { page, limit },
    });
    
    // Backend returns array directly
    return {
      orders: response.data,
      pagination: {
        page,
        limit,
        total: response.data.length,
      },
    };
  },

  /**
   * Get order by ID
   */
  getOrderById: async (orderId: string): Promise<Order> => {
    const response = await apiClient.get<{ success: boolean; data: Order }>(
      `/api/orders/${orderId}`
    );
    return response.data;
  },
};
