import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import type { CartItem as CartItemType } from '../../services/cartApi';

const theme = {
  colors: {
    primary: '#00C8C2',
    background: '#0D0D0D',
    surface: '#1A1A1A',
    surfaceLight: '#2A2A2A',
    text: '#FFFFFF',
    textSecondary: '#999999',
    textMuted: '#666666',
    border: '#333333',
    error: '#FF4444',
  },
};

const Icons = {
  Heart: ({ filled }: { filled?: boolean }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
      <title>Heart</title>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  Trash: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <title>Trash</title>
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  ),
  Plus: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <title>Plus</title>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  Minus: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <title>Minus</title>
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
};

interface CartItemProps {
  item: CartItemType;
  onQuantityChange?: (gameId: string, quantity: number) => void;
}

export const CartItem: React.FC<CartItemProps> = ({ item, onQuantityChange }) => {
  const { updateCartItem, removeFromCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const [isWishlisted, setIsWishlisted] = React.useState(false);
  const [isRemoving, setIsRemoving] = React.useState(false);
  const [isAddingToWishlist, setIsAddingToWishlist] = React.useState(false);

  // Check wishlist status
  React.useEffect(() => {
    const checkWishlist = async () => {
      try {
        const inWishlist = await isInWishlist(item.gameId);
        setIsWishlisted(inWishlist);
      } catch (err) {
        console.error('Failed to check wishlist:', err);
      }
    };
    checkWishlist();
  }, [item.gameId, isInWishlist]);

  const handleQuantityChange = async (delta: number) => {
    const newQuantity = Math.max(1, item.quantity + delta);
    try {
      await updateCartItem(item.gameId, newQuantity);
      onQuantityChange?.(item.gameId, newQuantity);
    } catch (err) {
      console.error('Failed to update quantity:', err);
    }
  };

  const handleRemove = async () => {
    setIsRemoving(true);
    try {
      await removeFromCart(item.gameId);
    } catch (err) {
      console.error('Failed to remove item:', err);
    } finally {
      setIsRemoving(false);
    }
  };

  const handleAddToWishlist = async () => {
    if (isWishlisted) return;
    setIsAddingToWishlist(true);
    try {
      await addToWishlist(item.gameId);
      setIsWishlisted(true);
    } catch (err) {
      console.error('Failed to add to wishlist:', err);
    } finally {
      setIsAddingToWishlist(false);
    }
  };

  const itemTotal = item.game.price * item.quantity;
  const originalTotal = item.game.originalPrice ? item.game.originalPrice * item.quantity : null;
  const discount = originalTotal && originalTotal > itemTotal
    ? Math.round((1 - itemTotal / originalTotal) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      style={{
        background: theme.colors.surface,
        borderRadius: '12px',
        padding: '20px',
        border: `1px solid ${theme.colors.border}`,
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '100px 1fr auto',
          gap: '16px',
          alignItems: 'center',
        }}
        className="cart-item"
      >
        {/* Game Image */}
        <Link to={`/game/${item.game.slug}`} style={{ textDecoration: 'none' }}>
          <img
            src={item.game.image}
            alt={item.game.title}
            style={{
              width: '100px',
              height: '130px',
              objectFit: 'cover',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
            loading="lazy"
          />
        </Link>

        {/* Game Info */}
        <div style={{ flex: 1 }}>
          <Link
            to={`/game/${item.game.slug}`}
            style={{
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <h3
              style={{
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '4px',
                color: theme.colors.text,
              }}
            >
              {item.game.title}
            </h3>
          </Link>
          <p
            style={{
              fontSize: '13px',
              color: theme.colors.textMuted,
              marginBottom: '8px',
            }}
          >
            {item.game.platforms && item.game.platforms.length > 0
              ? item.game.platforms.join(', ')
              : 'PC'}
          </p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
            <span
              style={{
                fontSize: '18px',
                fontWeight: '700',
                color: theme.colors.primary,
              }}
            >
              €{itemTotal.toFixed(2)}
            </span>
            {originalTotal && originalTotal > itemTotal && (
              <>
                <span
                  style={{
                    fontSize: '14px',
                    color: theme.colors.textMuted,
                    textDecoration: 'line-through',
                  }}
                >
                  €{originalTotal.toFixed(2)}
                </span>
                {discount > 0 && (
                  <span
                    style={{
                      backgroundColor: theme.colors.primary,
                      color: '#000',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: '700',
                    }}
                  >
                    -{discount}%
                  </span>
                )}
              </>
            )}
          </div>
        </div>

        {/* Actions */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '12px',
          }}
          className="cart-item-actions"
        >
          {/* Quantity Control */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: theme.colors.surfaceLight,
              borderRadius: '8px',
              padding: '4px',
            }}
          >
            <button
              type="button"
              onClick={() => handleQuantityChange(-1)}
              disabled={item.quantity <= 1}
              style={{
                background: 'none',
                border: 'none',
                color: theme.colors.text,
                cursor: item.quantity <= 1 ? 'not-allowed' : 'pointer',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: item.quantity <= 1 ? 0.5 : 1,
              }}
            >
              <Icons.Minus />
            </button>
            <span
              style={{
                fontSize: '14px',
                fontWeight: '600',
                minWidth: '24px',
                textAlign: 'center',
                color: theme.colors.text,
              }}
            >
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => handleQuantityChange(1)}
              style={{
                background: 'none',
                border: 'none',
                color: theme.colors.text,
                cursor: 'pointer',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icons.Plus />
            </button>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              onClick={handleAddToWishlist}
              disabled={isWishlisted || isAddingToWishlist}
              style={{
                background: 'none',
                border: `1px solid ${theme.colors.border}`,
                borderRadius: '8px',
                padding: '8px 12px',
                color: isWishlisted ? theme.colors.primary : theme.colors.text,
                cursor: isWishlisted || isAddingToWishlist ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '13px',
                opacity: isWishlisted ? 0.7 : 1,
              }}
              aria-label={isWishlisted ? 'Already in wishlist' : 'Add to wishlist'}
            >
              <Icons.Heart filled={isWishlisted} />
              {isWishlisted ? 'In Wishlist' : 'Wishlist'}
            </button>
            <button
              type="button"
              onClick={handleRemove}
              disabled={isRemoving}
              style={{
                background: 'none',
                border: 'none',
                color: theme.colors.error,
                cursor: isRemoving ? 'wait' : 'pointer',
                padding: '8px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '13px',
                opacity: isRemoving ? 0.7 : 1,
              }}
              aria-label="Remove from cart"
            >
              <Icons.Trash />
              Remove
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
