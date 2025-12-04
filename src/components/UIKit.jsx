// UI-Kit: Core Components for GKEYS
import React, { useState, createContext, useContext } from 'react';

// ============ THEME & CONTEXT ============
const ThemeContext = createContext();

export const theme = {
  colors: {
    primary: '#00FF66',
    primaryDark: '#00CC52',
    background: '#0D0D0D',
    surface: '#1A1A1A',
    surfaceLight: '#2A2A2A',
    surfaceHover: '#333333',
    text: '#FFFFFF',
    textSecondary: '#999999',
    textMuted: '#666666',
    border: '#333333',
    error: '#FF4444',
    warning: '#FFAA00',
    success: '#00FF66',
    discount: '#FF4444',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1280px',
  },
};

// ============ STYLES ============
const styles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
    line-height: 1.5;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
  }

  input {
    font-family: inherit;
  }

  /* Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.surface};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.surfaceLight};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.surfaceHover};
  }
`;

// Inject global styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

// ============ BUTTON COMPONENT ============
export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  disabled = false,
  icon,
  onClick,
  className = '',
  ...props 
}) => {
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontWeight: '600',
    borderRadius: theme.borderRadius.md,
    transition: 'all 0.2s ease',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    width: fullWidth ? '100%' : 'auto',
  };

  const variants = {
    primary: {
      backgroundColor: theme.colors.primary,
      color: '#000000',
      border: 'none',
    },
    secondary: {
      backgroundColor: 'transparent',
      color: theme.colors.text,
      border: `1px solid ${theme.colors.border}`,
    },
    ghost: {
      backgroundColor: 'transparent',
      color: theme.colors.text,
      border: 'none',
    },
    outline: {
      backgroundColor: 'transparent',
      color: theme.colors.primary,
      border: `1px solid ${theme.colors.primary}`,
    },
  };

  const sizes = {
    sm: { padding: '8px 16px', fontSize: '14px' },
    md: { padding: '12px 24px', fontSize: '16px' },
    lg: { padding: '16px 32px', fontSize: '18px' },
  };

  return (
    <button
      style={{ ...baseStyles, ...variants[variant], ...sizes[size] }}
      onClick={onClick}
      disabled={disabled}
      className={className}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
};

// ============ INPUT COMPONENT ============
export const Input = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  icon,
  error,
  fullWidth = false,
  size = 'md',
  className = '',
  ...props
}) => {
  const containerStyle = {
    position: 'relative',
    width: fullWidth ? '100%' : 'auto',
    display: 'inline-flex',
    alignItems: 'center',
  };

  const sizes = {
    sm: { padding: '8px 12px', fontSize: '14px' },
    md: { padding: '12px 16px', fontSize: '16px' },
    lg: { padding: '16px 20px', fontSize: '18px' },
  };

  const inputStyle = {
    width: '100%',
    backgroundColor: theme.colors.surface,
    border: `1px solid ${error ? theme.colors.error : theme.colors.border}`,
    borderRadius: theme.borderRadius.md,
    color: theme.colors.text,
    outline: 'none',
    transition: 'border-color 0.2s ease',
    paddingLeft: icon ? '44px' : sizes[size].padding,
    ...sizes[size],
  };

  const iconStyle = {
    position: 'absolute',
    left: '16px',
    color: theme.colors.textSecondary,
    pointerEvents: 'none',
  };

  return (
    <div style={containerStyle} className={className}>
      {icon && <span style={iconStyle}>{icon}</span>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={inputStyle}
        {...props}
      />
    </div>
  );
};

// ============ CARD COMPONENT ============
export const Card = ({
  children,
  padding = 'md',
  hover = false,
  onClick,
  className = '',
  style = {},
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const paddings = {
    none: '0',
    sm: theme.spacing.sm,
    md: theme.spacing.md,
    lg: theme.spacing.lg,
  };

  const cardStyle = {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: paddings[padding],
    transition: 'all 0.2s ease',
    cursor: onClick ? 'pointer' : 'default',
    transform: hover && isHovered ? 'translateY(-4px)' : 'none',
    boxShadow: hover && isHovered ? '0 8px 24px rgba(0, 255, 102, 0.1)' : 'none',
    ...style,
  };

  return (
    <div
      style={cardStyle}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={className}
      {...props}
    >
      {children}
    </div>
  );
};

// ============ GAME CARD COMPONENT ============
export const GameCard = ({
  image,
  title,
  price,
  originalPrice,
  discount,
  badges = [],
  onBuy,
  onWishlist,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardStyle = {
    width: '100%',
    maxWidth: '200px',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
    transform: isHovered ? 'translateY(-4px)' : 'none',
  };

  const imageContainerStyle = {
    position: 'relative',
    width: '100%',
    aspectRatio: '3/4',
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    marginBottom: theme.spacing.sm,
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  const badgeContainerStyle = {
    position: 'absolute',
    top: theme.spacing.sm,
    left: theme.spacing.sm,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.xs,
  };

  const badgeStyle = {
    backgroundColor: theme.colors.primary,
    color: '#000',
    padding: '4px 8px',
    borderRadius: theme.borderRadius.sm,
    fontSize: '12px',
    fontWeight: '600',
  };

  const priceContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.xs,
  };

  const currentPriceStyle = {
    color: theme.colors.text,
    fontSize: '16px',
    fontWeight: '600',
  };

  const originalPriceStyle = {
    color: theme.colors.textMuted,
    fontSize: '14px',
    textDecoration: 'line-through',
  };

  const discountStyle = {
    backgroundColor: theme.colors.primary,
    color: '#000',
    padding: '2px 6px',
    borderRadius: theme.borderRadius.sm,
    fontSize: '12px',
    fontWeight: '600',
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div style={imageContainerStyle}>
        <img src={image} alt={title} style={imageStyle} />
        {badges.length > 0 && (
          <div style={badgeContainerStyle}>
            {badges.map((badge, index) => (
              <span key={index} style={badgeStyle}>{badge}</span>
            ))}
          </div>
        )}
      </div>
      <div style={priceContainerStyle}>
        <span style={currentPriceStyle}>{price}€</span>
        {originalPrice && (
          <>
            <span style={originalPriceStyle}>{originalPrice}€</span>
            {discount && <span style={discountStyle}>{discount}</span>}
          </>
        )}
      </div>
    </div>
  );
};

// ============ BADGE COMPONENT ============
export const Badge = ({
  children,
  variant = 'primary',
  size = 'md',
}) => {
  const variants = {
    primary: { backgroundColor: theme.colors.primary, color: '#000' },
    secondary: { backgroundColor: theme.colors.surface, color: theme.colors.text },
    success: { backgroundColor: theme.colors.success, color: '#000' },
    warning: { backgroundColor: theme.colors.warning, color: '#000' },
    error: { backgroundColor: theme.colors.error, color: '#fff' },
  };

  const sizes = {
    sm: { padding: '2px 6px', fontSize: '10px' },
    md: { padding: '4px 8px', fontSize: '12px' },
    lg: { padding: '6px 12px', fontSize: '14px' },
  };

  const style = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.borderRadius.sm,
    fontWeight: '600',
    ...variants[variant],
    ...sizes[size],
  };

  return <span style={style}>{children}</span>;
};

// ============ ICON COMPONENTS ============
export const Icons = {
  Search: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8"/>
      <path d="M21 21l-4.35-4.35"/>
    </svg>
  ),
  Heart: ({ filled = false }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  Cart: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="21" r="1"/>
      <circle cx="20" cy="21" r="1"/>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    </svg>
  ),
  Grid: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7"/>
      <rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/>
    </svg>
  ),
  Menu: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  ),
  Close: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  ChevronDown: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="6,9 12,15 18,9"/>
    </svg>
  ),
  ChevronRight: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="9,18 15,12 9,6"/>
    </svg>
  ),
  Plus: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="5" x2="12" y2="19"/>
      <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
  Minus: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
  Trash: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="3,6 5,6 21,6"/>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
    </svg>
  ),
  Home: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9,22 9,12 15,12 15,22"/>
    </svg>
  ),
  News: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1m2 13a2 2 0 0 1-2-2V7m2 13a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2"/>
    </svg>
  ),
  Bolt: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"/>
    </svg>
  ),
  Article: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14,2 14,8 20,8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
    </svg>
  ),
  Steam: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12c0 5.5 3.7 10.1 8.8 11.5l3.1-4.4c-1.3-.1-2.5-.5-3.5-1.2l-2.2 3.1C2.6 19.4 0 15.9 0 12 0 5.4 5.4 0 12 0zm0 2c5.5 0 10 4.5 10 10s-4.5 10-10 10c-1.8 0-3.5-.5-5-1.3l2.2-3.1c.9.5 1.8.8 2.8.8 3.3 0 6-2.7 6-6s-2.7-6-6-6-6 2.7-6 6c0 1.1.3 2.1.8 3l-2.2 3.1C2.5 17.4 2 14.8 2 12 2 6.5 6.5 2 12 2z"/>
    </svg>
  ),
  Key: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
    </svg>
  ),
  Telegram: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  ),
  Instagram: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  ),
  User: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  CreditCard: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
      <line x1="1" y1="10" x2="23" y2="10"/>
    </svg>
  ),
  Media: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
      <line x1="8" y1="21" x2="16" y2="21"/>
      <line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  ),
};

// ============ CONTAINER COMPONENT ============
export const Container = ({ children, maxWidth = '1280px', padding = true }) => {
  const style = {
    width: '100%',
    maxWidth,
    margin: '0 auto',
    padding: padding ? `0 ${theme.spacing.lg}` : '0',
  };

  return <div style={style}>{children}</div>;
};

// ============ GRID COMPONENT ============
export const Grid = ({ children, columns = 4, gap = 'md', style = {} }) => {
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: theme.spacing[gap],
    ...style,
  };

  return <div style={gridStyle}>{children}</div>;
};

// ============ SECTION COMPONENT ============
export const Section = ({ title, action, children }) => {
  const sectionStyle = {
    marginBottom: theme.spacing.xxl,
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  };

  const titleStyle = {
    fontSize: '24px',
    fontWeight: '600',
    color: theme.colors.text,
  };

  const actionStyle = {
    color: theme.colors.primary,
    fontSize: '14px',
    cursor: 'pointer',
  };

  return (
    <section style={sectionStyle}>
      <div style={headerStyle}>
        <h2 style={titleStyle}>{title}</h2>
        {action && <a href="#" style={actionStyle}>{action}</a>}
      </div>
      {children}
    </section>
  );
};

export default {
  theme,
  Button,
  Input,
  Card,
  GameCard,
  Badge,
  Icons,
  Container,
  Grid,
  Section,
};

