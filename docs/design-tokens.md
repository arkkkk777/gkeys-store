# Design Tokens

Complete reference for all design tokens in the design system.

## Overview

Design tokens are centralized values that define the visual design of the application. All components use these tokens to ensure consistency.

## Import

```typescript
import { colors, spacing, borderRadius, typography, breakpoints, animations, shadows } from '@/styles/design-tokens'
```

## Color Tokens

```typescript
colors = {
  primary: '#00FF66',           // Bright Green
  primaryDark: '#00CC52',       // Darker green variant
  accent: '#00C8C2',            // Cyan-Turquoise for effects
  background: '#0D0D0D',       // Dark background
  surface: '#1A1A1A',           // Surface/card background
  surfaceLight: '#2A2A2A',      // Lighter surface variant
  surfaceHover: '#333333',      // Hover state surface
  text: '#FFFFFF',              // Primary text
  textSecondary: '#999999',     // Secondary text
  textMuted: '#666666',         // Muted text
  border: '#333333',             // Border color
  error: '#FF4444',             // Error color
  warning: '#FFAA00',           // Warning color
  success: '#00FF66',           // Success color
  discount: '#FF4444',          // Discount/badge color
}
```

## Spacing Tokens

```typescript
spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
}
```

## Border Radius Tokens

```typescript
borderRadius = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '9999px',
}
```

## Typography Tokens

```typescript
typography = {
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
}
```

## Breakpoint Tokens

```typescript
breakpoints = {
  mobile: '320px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1280px',
}
```

## Animation Tokens

```typescript
animations = {
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
}
```

## Shadow Tokens

```typescript
shadows = {
  sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
  glow: '0 0 20px rgba(0, 255, 102, 0.3)',
  glowAccent: '0 0 20px rgba(180, 255, 0, 0.3)',
}
```

## Usage Examples

### In TypeScript/React

```typescript
import { colors, spacing } from '@/styles/design-tokens'

const style = {
  backgroundColor: colors.primary,
  padding: spacing.md,
}
```

### In Tailwind CSS

```tsx
<div className="bg-design-primary p-design-md rounded-design-lg">
  Content
</div>
```

### In CSS

```css
.my-component {
  background-color: var(--design-primary);
  padding: var(--design-spacing-md);
}
```

## Utility Functions

```typescript
import { getColor, getSpacing } from '@/lib/design-tokens'

const primaryColor = getColor('primary')
const mediumSpacing = getSpacing('md')
```

## Validation

```typescript
import { validateDesignTokens } from '@/lib/validate-tokens'

const { valid, errors } = validateDesignTokens()
```
