import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { cartApi, type CartResponse } from '../services/cartApi';
import { useAuth } from './AuthContext';

interface CartContextType {
  cart: CartResponse | null;
  loading: boolean;
  error: string | null;
  addToCart: (gameId: string, quantity?: number) => Promise<void>;
  updateCartItem: (gameId: string, quantity: number) => Promise<void>;
  removeFromCart: (gameId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const refreshCart = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const cartData = await cartApi.getCart();
      setCart(cartData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load cart');
      setCart(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]); // Refresh cart

  // Migrate cart when user logs in
  useEffect(() => {
    if (user?.id) {
      // User just logged in - migrate session cart
      cartApi.migrateCart().catch((err) => {
        console.warn('Cart migration failed:', err);
      });
      refreshCart();
    }
  }, [user?.id, refreshCart]);

  const addToCart = useCallback(
    async (gameId: string, quantity: number = 1) => {
      try {
        await cartApi.addToCart(gameId, quantity);
        await refreshCart();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to add to cart');
        throw err;
      }
    },
    [refreshCart]
  );

  const updateCartItem = useCallback(
    async (gameId: string, quantity: number) => {
      try {
        await cartApi.updateCartItem(gameId, quantity);
        await refreshCart();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to update cart item');
        throw err;
      }
    },
    [refreshCart]
  );

  const removeFromCart = useCallback(
    async (gameId: string) => {
      try {
        await cartApi.removeFromCart(gameId);
        await refreshCart();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to remove from cart');
        throw err;
      }
    },
    [refreshCart]
  );

  const clearCart = useCallback(async () => {
    try {
      await cartApi.clearCart();
      await refreshCart();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to clear cart');
      throw err;
    }
  }, [refreshCart]);

  const itemCount = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        refreshCart,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
