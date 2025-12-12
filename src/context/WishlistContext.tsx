import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { wishlistApi, type WishlistResponse } from '../services/wishlistApi';
import { useAuth } from './AuthContext';

interface WishlistContextType {
  wishlist: WishlistResponse | null;
  loading: boolean;
  error: string | null;
  addToWishlist: (gameId: string) => Promise<void>;
  removeFromWishlist: (gameId: string) => Promise<void>;
  isInWishlist: (gameId: string) => Promise<boolean>;
  refreshWishlist: () => Promise<void>;
  itemCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<WishlistResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const refreshWishlist = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const wishlistData = await wishlistApi.getWishlist();
      setWishlist(wishlistData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load wishlist');
      setWishlist(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshWishlist();
  }, [refreshWishlist]); // Refresh wishlist

  // Migrate wishlist when user logs in
  useEffect(() => {
    if (user?.id) {
      // User just logged in - migrate session wishlist
      wishlistApi.migrateWishlist().catch((err) => {
        console.warn('Wishlist migration failed:', err);
      });
      refreshWishlist();
    }
  }, [user?.id, refreshWishlist]);

  const addToWishlist = useCallback(
    async (gameId: string) => {
      try {
        await wishlistApi.addToWishlist(gameId);
        await refreshWishlist();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to add to wishlist');
        throw err;
      }
    },
    [refreshWishlist]
  );

  const removeFromWishlist = useCallback(
    async (gameId: string) => {
      try {
        await wishlistApi.removeFromWishlist(gameId);
        await refreshWishlist();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to remove from wishlist');
        throw err;
      }
    },
    [refreshWishlist]
  );

  const isInWishlist = useCallback(
    async (gameId: string): Promise<boolean> => {
      try {
        return await wishlistApi.isInWishlist(gameId);
      } catch (err) {
        return false;
      }
    },
    []
  );

  const itemCount = wishlist?.items.length || 0;

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        error,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        refreshWishlist,
        itemCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
