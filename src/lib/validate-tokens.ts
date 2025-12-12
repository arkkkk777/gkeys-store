/**
 * Design Tokens Validation Utility
 * 
 * Validates design token values and structure.
 */

import designTokens from '../styles/design-tokens';

/**
 * Validate color token format (hex color)
 */
function isValidHexColor(color: string): boolean {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
}

/**
 * Validate spacing/radius value format (number with px unit)
 */
function isValidSizeValue(value: string): boolean {
  return /^\d+px$/.test(value);
}

/**
 * Validate breakpoint format (number with px unit)
 */
function isValidBreakpoint(value: string): boolean {
  return /^\d+px$/.test(value);
}

/**
 * Validate animation duration format (number with ms unit)
 */
function isValidDuration(value: string): boolean {
  return /^\d+ms$/.test(value);
}

/**
 * Validate all design tokens
 */
export function validateDesignTokens(): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Validate colors
  Object.entries(designTokens.colors).forEach(([name, value]) => {
    if (!isValidHexColor(value)) {
      errors.push(`Invalid color format for ${name}: ${value}`);
    }
  });

  // Validate spacing
  Object.entries(designTokens.spacing).forEach(([name, value]) => {
    if (!isValidSizeValue(value)) {
      errors.push(`Invalid spacing format for ${name}: ${value}`);
    }
  });

  // Validate border radius
  Object.entries(designTokens.borderRadius).forEach(([name, value]) => {
    if (name === 'full' && value === '9999px') {
      // Full is valid
      return;
    }
    if (!isValidSizeValue(value)) {
      errors.push(`Invalid border radius format for ${name}: ${value}`);
    }
  });

  // Validate breakpoints
  Object.entries(designTokens.breakpoints).forEach(([name, value]) => {
    if (!isValidBreakpoint(value)) {
      errors.push(`Invalid breakpoint format for ${name}: ${value}`);
    }
  });

  // Validate animation durations
  Object.entries(designTokens.animations.duration).forEach(([name, value]) => {
    if (!isValidDuration(value)) {
      errors.push(`Invalid animation duration format for ${name}: ${value}`);
    }
  });

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Check if design tokens are properly structured
 */
export function validateTokenStructure(): boolean {
  try {
    // Check required token categories exist
    const requiredCategories = ['colors', 'spacing', 'borderRadius', 'typography', 'breakpoints', 'animations', 'shadows'];
    const tokenKeys = Object.keys(designTokens);
    
    for (const category of requiredCategories) {
      if (!tokenKeys.includes(category)) {
        return false;
      }
    }

    return true;
  } catch {
    return false;
  }
}
