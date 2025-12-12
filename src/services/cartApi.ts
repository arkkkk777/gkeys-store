import apiClient from './api';
import type { Game } from './gamesApi';

export interface CartItem {
  gameId: string;
  quantity: number;
  game: Game;
}

export interface CartResponse {
  items: CartItem[];
  total: number;
}

export const cartApi = {
  /**
   * Get user's cart
   */
  getCart: async (): Promise<CartResponse> => {
    const response = await apiClient.get<{ success: boolean; data: CartResponse }>('/api/cart');
    return response.data;
  },

  /**
   * Add item to cart
   */
  addToCart: async (gameId: string, quantity: number = 1): Promise<void> => {
    await apiClient.post('/api/cart', { gameId, quantity });
  },

  /**
   * Update cart item quantity
   */
  updateCartItem: async (gameId: string, quantity: number): Promise<void> => {
    await apiClient.put(`/api/cart/${gameId}`, { quantity });
  },

  /**
   * Remove item from cart
   */
  removeFromCart: async (gameId: string): Promise<void> => {
    await apiClient.delete(`/api/cart/${gameId}`);
  },

  /**
   * Clear entire cart
   */
  clearCart: async (): Promise<void> => {
    await apiClient.delete('/api/cart');
  },

  /**
   * Migrate session cart to user cart (after login)
   */
  migrateCart: async (): Promise<void> => {
    await apiClient.post('/api/cart/migrate');
  },
};
