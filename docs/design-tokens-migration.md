# Design Tokens Migration Guide

**Purpose**: Guide for migrating from hardcoded values to centralized design tokens

## Overview

All design values (colors, spacing, typography, borders, shadows, animations) are now centralized in `src/styles/design-tokens.ts`. This ensures visual consistency and makes updates easier.

## Migration Steps

### 1. Import Design Tokens

```typescript
// Import specific tokens
import { colors, spacing, borderRadius } from '@/styles/design-tokens';

// Or import utility functions
import { getColor, getSpacing } from '@/lib/design-tokens';
```

### 2. Replace Hardcoded Colors

**Before:**
```typescript
const style = {
  backgroundColor: '#00FF66',
  color: '#FFFFFF',
};
```

**After:**
```typescript
import { colors } from '@/styles/design-tokens';

const style = {
  backgroundColor: colors.primary,
  color: colors.text,
};
```

### 3. Replace Hardcoded Spacing

**Before:**
```typescript
const style = {
  padding: '16px',
  margin: '24px',
};
```

**After:**
```typescript
import { spacing } from '@/styles/design-tokens';

const style = {
  padding: spacing.md,
  margin: spacing.lg,
};
```

### 4. Replace Hardcoded Border Radius

**Before:**
```typescript
const style = {
  borderRadius: '8px',
};
```

**After:**
```typescript
import { borderRadius } from '@/styles/design-tokens';

const style = {
  borderRadius: borderRadius.md,
};
```

### 5. Use Tailwind Design Token Classes

Instead of hardcoded Tailwind classes, use design token classes:

**Before:**
```tsx
<div className="bg-[#00FF66] p-4 rounded-lg">
```

**After:**
```tsx
<div className="bg-design-primary p-design-md rounded-design-lg">
```

Available Tailwind classes:
- Colors: `bg-design-primary`, `text-design-text`, `border-design-border`, etc.
- Spacing: `p-design-sm`, `m-design-md`, `gap-design-lg`, etc.
- Border Radius: `rounded-design-sm`, `rounded-design-md`, etc.
- Shadows: `shadow-design-glow`, `shadow-design-md`, etc.

### 6. Use CSS Variables

For runtime access, use CSS variables:

```css
.my-component {
  background-color: var(--design-primary);
  padding: var(--design-spacing-md);
  border-radius: var(--design-radius-lg);
}
```

## Component Audit Findings

### Components Using Hardcoded Values

The following components in `src/components/ui/` use Tailwind classes that reference CSS variables (shadcn/ui pattern). These are compatible but can be enhanced:

- `button.tsx` - Uses shadcn/ui variant system (compatible)
- `input.tsx` - Uses shadcn/ui classes (compatible)
- `select.tsx` - Uses shadcn/ui classes (compatible)
- `switch.tsx` - Uses shadcn/ui classes (compatible)
- `checkbox.tsx` - Uses shadcn/ui classes (compatible)

### Migration Priority

1. **High Priority**: Components with inline styles or hardcoded hex colors
2. **Medium Priority**: Components using arbitrary Tailwind values (e.g., `bg-[#00FF66]`)
3. **Low Priority**: Components already using CSS variables (shadcn/ui pattern)

## Validation

After migration, validate tokens:

```typescript
import { validateDesignTokens } from '@/lib/validate-tokens';

const { valid, errors } = validateDesignTokens();
if (!valid) {
  console.error('Token validation errors:', errors);
}
```

## Best Practices

1. **Always import from design-tokens.ts** - Never hardcode design values
2. **Use TypeScript types** - Import types from `@/types/design-system`
3. **Prefer Tailwind classes** - Use design token Tailwind classes when possible
4. **Use utility functions** - Use `getColor()`, `getSpacing()` for programmatic access
5. **Validate tokens** - Run validation before committing changes

## Examples

### React Component with Design Tokens

```typescript
import { colors, spacing, borderRadius } from '@/styles/design-tokens';
import type { ButtonProps } from '@/types/design-system';

export function CustomButton({ variant = 'primary', ...props }: ButtonProps) {
  const style = {
    backgroundColor: variant === 'primary' ? colors.primary : colors.surface,
    color: variant === 'primary' ? '#000' : colors.text,
    padding: spacing.md,
    borderRadius: borderRadius.md,
  };

  return <button style={style} {...props} />;
}
```

### Tailwind Component with Design Tokens

```tsx
import { Button } from '@/components/ui/button';

export function MyComponent() {
  return (
    <div className="bg-design-surface p-design-lg rounded-design-lg">
      <Button variant="primary" className="bg-design-primary">
        Click Me
      </Button>
    </div>
  );
}
```

## Need Help?

- See `src/styles/design-tokens.ts` for all available tokens
- See `src/lib/design-tokens.ts` for utility functions
- See `src/types/design-system.ts` for TypeScript interfaces
