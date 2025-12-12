/**
 * Design Tokens Utility
 * 
 * Utility functions to access design tokens programmatically.
 */

import designTokens, { type DesignTokens } from '../styles/design-tokens';

/**
 * Get all design tokens
 */
export function getDesignTokens(): DesignTokens {
  return designTokens;
}

/**
 * Get color token by name
 */
export function getColor(name: keyof typeof designTokens.colors): string {
  return designTokens.colors[name];
}

/**
 * Get spacing token by name
 */
export function getSpacing(name: keyof typeof designTokens.spacing): string {
  return designTokens.spacing[name];
}

/**
 * Get border radius token by name
 */
export function getBorderRadius(name: keyof typeof designTokens.borderRadius): string {
  return designTokens.borderRadius[name];
}

/**
 * Get typography token
 */
export function getTypography() {
  return designTokens.typography;
}

/**
 * Get breakpoint token by name
 */
export function getBreakpoint(name: keyof typeof designTokens.breakpoints): string {
  return designTokens.breakpoints[name];
}

/**
 * Get animation token
 */
export function getAnimations() {
  return designTokens.animations;
}

/**
 * Get shadow token by name
 */
export function getShadow(name: keyof typeof designTokens.shadows): string {
  return designTokens.shadows[name];
}

/**
 * Export design tokens for direct access
 */
export { designTokens };
export default designTokens;
