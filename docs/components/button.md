# Button Component

A versatile button component with multiple variants, sizes, and states that follow the design system.

## Import

```typescript
import { Button } from '@/components/ui/button'
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'outline'` | `'default'` | Button visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'default'` | Button size |
| `fullWidth` | `boolean` | `false` | Make button full width |
| `disabled` | `boolean` | `false` | Disable button interaction |
| `icon` | `React.ReactNode` | - | Icon to display before text |
| `children` | `React.ReactNode` | - | Button content (required) |
| `className` | `string` | - | Additional CSS classes |

## Variants

- **primary**: Bright green background with black text (default)
- **secondary**: Surface background with text color
- **ghost**: Transparent with hover effect
- **outline**: Bordered with transparent background

## Sizes

- **sm**: Small button (h-8)
- **md**: Medium button (h-9, default)
- **lg**: Large button (h-10)

## States

- **Default**: Normal state
- **Hover**: Darker background or surface hover
- **Active**: Pressed state
- **Disabled**: 50% opacity, non-interactive
- **Focus**: Visible focus ring (2px, primary color)

## Examples

### Basic Usage

```tsx
<Button variant="primary">Click Me</Button>
```

### With Icon

```tsx
import { ShoppingCart } from 'lucide-react'

<Button variant="primary" icon={<ShoppingCart />}>
  Add to Cart
</Button>
```

### Full Width

```tsx
<Button variant="primary" fullWidth>
  Submit
</Button>
```

### Disabled State

```tsx
<Button variant="primary" disabled>
  Disabled Button
</Button>
```

### Different Variants

```tsx
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="outline">Outline</Button>
```

### Different Sizes

```tsx
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

## Best Practices

1. Use `primary` variant for primary actions
2. Use `secondary` for secondary actions
3. Use `ghost` or `outline` for less prominent actions
4. Always provide accessible text (avoid icon-only buttons without aria-label)
5. Use `fullWidth` for form submit buttons
6. Disable buttons during async operations

## Accessibility

- Supports keyboard navigation (Tab, Enter, Space)
- Visible focus indicators
- ARIA attributes for screen readers
- Minimum touch target: 44px on mobile
