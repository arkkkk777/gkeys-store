import apiClient from './api';
import type { Game } from './gamesApi';

export interface WishlistItem {
  gameId: string;
  game: Game;
  addedAt: string;
}

export interface WishlistResponse {
  items: WishlistItem[];
}

export const wishlistApi = {
  /**
   * Get user's wishlist
   */
  getWishlist: async (): Promise<WishlistResponse> => {
    const response = await apiClient.get<{ success: boolean; data: WishlistResponse }>('/api/wishlist');
    return response.data;
  },

  /**
   * Add game to wishlist
   */
  addToWishlist: async (gameId: string): Promise<void> => {
    await apiClient.post('/api/wishlist', { gameId });
  },

  /**
   * Remove game from wishlist
   */
  removeFromWishlist: async (gameId: string): Promise<void> => {
    await apiClient.delete(`/api/wishlist/${gameId}`);
  },

  /**
   * Check if game is in wishlist
   */
  isInWishlist: async (gameId: string): Promise<boolean> => {
    const response = await apiClient.get<{ success: boolean; data: { inWishlist: boolean } }>(`/api/wishlist/${gameId}/check`);
    return response.data.inWishlist;
  },

  /**
   * Migrate session wishlist to user wishlist (after login)
   */
  migrateWishlist: async (): Promise<void> => {
    await apiClient.post('/api/wishlist/migrate');
  },
};
