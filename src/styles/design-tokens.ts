/**
 * Design Tokens: Centralized Design System Tokens
 * 
 * Single source of truth for all design values (colors, spacing, typography, etc.)
 * Used by components, Tailwind config, and CSS variables.
 */

// ============ COLOR TOKENS ============

export const colors = {
  primary: '#00C8C2',           // Cyan-Turquoise (replaced from #00FF66)
  primaryDark: '#00CC52',       // Darker green variant
  accent: '#00C8C2',            // Cyan-Turquoise for effects
  background: '#121212',        // Dark background
  surface: '#242424',           // Surface/card background
  surfaceLight: '#2A2A2A',      // Lighter surface variant
  surfaceHover: '#2F2F2F',      // Hover state surface
  text: '#FFFFFF',              // Primary text
  textSecondary: '#E5E7EB',     // Secondary text (lighter for contrast)
  textMuted: '#9CA3AF',         // Muted text
  border: '#333333',            // Border color
  error: '#FF4444',             // Error color
  warning: '#FFAA00',           // Warning color
  success: '#00C8C2',           // Success color (same as primary)
  discount: '#FF4444',          // Discount/badge color
} as const;

// ============ SPACING TOKENS ============

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
} as const;

// ============ BORDER RADIUS TOKENS ============

export const borderRadius = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  full: '9999px',
} as const;

// ============ TYPOGRAPHY TOKENS ============

export const typography = {
  fontFamily: "'Onest', sans-serif",
  fontSize: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

// ============ BREAKPOINT TOKENS ============

export const breakpoints = {
  mobile: '320px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1280px',
} as const;

// ============ ANIMATION TOKENS ============

export const animations = {
  duration: {
    fast: '150ms',
    standard: '200ms',
    slow: '300ms',
  },
  easing: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  },
  transitions: {
    all: 'all 0.2s ease',
    colors: 'color 0.2s ease, background-color 0.2s ease',
    transform: 'transform 0.2s ease',
    opacity: 'opacity 0.2s ease',
  },
} as const;

// ============ SHADOW TOKENS ============

export const shadows = {
  sm: '0 2px 6px rgba(0, 0, 0, 0.2)',
  md: '0 8px 20px rgba(0, 0, 0, 0.28)',
  lg: '0 16px 40px rgba(0, 0, 0, 0.32)',
  card: '0 20px 60px rgba(0, 0, 0, 0.35)',
  glow: '0 0 24px rgba(0, 200, 194, 0.3)',
  glowAccent: '0 0 24px rgba(0, 200, 194, 0.3)',
} as const;

// ============ DESIGN TOKENS INTERFACE ============

export interface DesignTokens {
  colors: typeof colors;
  spacing: typeof spacing;
  borderRadius: typeof borderRadius;
  typography: typeof typography;
  breakpoints: typeof breakpoints;
  animations: typeof animations;
  shadows: typeof shadows;
}

// ============ EXPORT ALL TOKENS ============

export const designTokens: DesignTokens = {
  colors,
  spacing,
  borderRadius,
  typography,
  breakpoints,
  animations,
  shadows,
};

// ============ DEFAULT EXPORT ============

export default designTokens;
