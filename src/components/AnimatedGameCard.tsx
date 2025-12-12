import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

const theme = {
  colors: {
    primary: '#00C8C2',
    surface: '#1A1A1A',
    text: '#FFFFFF',
    textMuted: '#666666',
  },
  borderRadius: {
    lg: '12px',
    sm: '4px',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
  },
};

interface AnimatedGameCardProps {
  image: string;
  title: string;
  price: string | number;
  originalPrice?: string | number;
  discount?: string;
  badges?: string[];
  onClick?: () => void;
  children?: ReactNode;
}

export default function AnimatedGameCard({
  image,
  title,
  price,
  originalPrice,
  discount,
  badges = [],
  onClick,
  children,
}: AnimatedGameCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      onClick={onClick}
      style={{
        width: '100%',
        maxWidth: '200px',
        cursor: onClick ? 'pointer' : 'default',
        position: 'relative',
      }}
    >
      {/* Image Container */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '3/4',
          borderRadius: theme.borderRadius.lg,
          overflow: 'hidden',
          marginBottom: theme.spacing.sm,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        }}
      >
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          src={image}
          alt={title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />

        {/* Badges */}
        {badges.length > 0 && (
          <div
            style={{
              position: 'absolute',
              top: theme.spacing.sm,
              left: theme.spacing.sm,
              display: 'flex',
              flexDirection: 'column',
              gap: theme.spacing.xs,
            }}
          >
            {badges.map((badge, index) => (
              <motion.span
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                style={{
                  backgroundColor: theme.colors.primary,
                  color: '#000',
                  padding: '4px 8px',
                  borderRadius: theme.borderRadius.sm,
                  fontSize: '11px',
                  fontWeight: '600',
                }}
              >
                {badge}
              </motion.span>
            ))}
          </div>
        )}

        {/* Hover Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent)',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '16px',
          }}
        >
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileHover={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            style={{
              color: theme.colors.text,
              fontSize: '14px',
              fontWeight: '600',
              lineHeight: '1.4',
            }}
          >
            {title}
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Price Container */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: theme.spacing.sm,
        }}
      >
        <motion.span
          whileHover={{ scale: 1.1 }}
          style={{
            color: theme.colors.text,
            fontSize: '16px',
            fontWeight: '600',
          }}
        >
          {typeof price === 'number' ? `${price}€` : price}
        </motion.span>
        {originalPrice && (
          <>
            <span
              style={{
                color: theme.colors.textMuted,
                fontSize: '14px',
                textDecoration: 'line-through',
              }}
            >
              {typeof originalPrice === 'number' ? `${originalPrice}€` : originalPrice}
            </span>
            {discount && (
              <motion.span
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                style={{
                  backgroundColor: theme.colors.primary,
                  color: '#000',
                  padding: '2px 6px',
                  borderRadius: theme.borderRadius.sm,
                  fontSize: '12px',
                  fontWeight: '600',
                }}
              >
                {discount}
              </motion.span>
            )}
          </>
        )}
      </div>

      {/* Custom children */}
      {children}
    </motion.div>
  );
}

