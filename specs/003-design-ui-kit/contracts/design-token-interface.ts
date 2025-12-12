/**
 * Design Token Interface Contract
 * 
 * Defines the TypeScript interface for design tokens used across the application.
 * This contract ensures type safety and consistency when accessing design values.
 */

export interface ColorTokens {
  primary: string;
  primaryDark: string;
  accent: string;  // Updated: #00C8C2 (was #b4ff00)
  background: string;
  surface: string;
  surfaceLight: string;
  surfaceHover: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  error: string;
  warning: string;
  success: string;
  discount: string;
}

export interface ShadowTokens {
  sm: string;
  md: string;
  lg: string;
  card: string;
  glow: string;
  glowAccent: string;  // Updated: uses rgba(0, 200, 194, 0.3)
}

export interface DesignTokens {
  colors: ColorTokens;
  spacing: Record<string, string>;
  borderRadius: Record<string, string>;
  typography: {
    fontFamily: string;
    fontSize: Record<string, string>;
    fontWeight: Record<string, number>;
    lineHeight: Record<string, number>;
  };
  breakpoints: Record<string, string>;
  animations: {
    duration: Record<string, string>;
    easing: Record<string, string>;
    transitions: Record<string, string>;
  };
  shadows: ShadowTokens;
}

/**
 * Design Token Access Contract
 * 
 * Components MUST access colors through one of these methods:
 * 1. Import from design-tokens.ts: import { colors } from '@/styles/design-tokens'
 * 2. Use Tailwind classes: bg-design-accent, text-design-accent
 * 3. Use CSS variables: var(--design-accent)
 * 
 * Components MUST NOT:
 * - Hardcode color values directly
 * - Use inline color strings like "#b4ff00"
 * - Bypass the design token system
 */
