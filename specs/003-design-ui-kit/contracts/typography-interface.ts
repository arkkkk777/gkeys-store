/**
 * Typography Token Interface Contract
 * 
 * Defines the TypeScript interface for typography tokens used across the application.
 * This contract ensures type safety and consistency when accessing typography values.
 */

export interface TypographyTokens {
  fontFamily: string;  // Updated: 'Onest', sans-serif (was 'Inter', ...)
  fontSize: Record<string, string>;
  fontWeight: Record<string, number>;
  lineHeight: Record<string, number>;
}

export interface DesignTokens {
  colors: Record<string, string>;
  spacing: Record<string, string>;
  borderRadius: Record<string, string>;
  typography: TypographyTokens;  // Updated fontFamily
  breakpoints: Record<string, string>;
  animations: {
    duration: Record<string, string>;
    easing: Record<string, string>;
    transitions: Record<string, string>;
  };
  shadows: Record<string, string>;
}

/**
 * Typography Token Access Contract
 * 
 * Components MUST access font-family through one of these methods:
 * 1. Import from design-tokens.ts: import { typography } from '@/styles/design-tokens'
 * 2. Use Tailwind classes: font-design
 * 3. Inherit from body (global styles use design tokens)
 * 
 * Components MUST NOT:
 * - Hardcode font-family values directly
 * - Use inline font-family strings like "'Inter', sans-serif"
 * - Bypass the design token system
 * 
 * EXCEPTION: Monospace fonts for code/technical content are allowed:
 * - fontFamily: 'monospace'
 * - fontFamily: 'Monaco, Consolas, monospace'
 */
