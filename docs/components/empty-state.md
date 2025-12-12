# Empty State Component

A component for displaying empty states (empty cart, empty wishlist, etc.) with icon, title, message, and optional action.

## Import

```typescript
import { EmptyState, EmptyCart, EmptyWishlist } from '@/components/ui/empty-state'
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `React.ReactNode` | - | Icon to display |
| `title` | `string` | - | Title text (required) |
| `message` | `string` | - | Message text |
| `action` | `React.ReactNode` | - | Action button/component |
| `className` | `string` | - | Additional CSS classes |

## Variants

- **EmptyState**: Generic empty state component
- **EmptyCart**: Pre-configured empty cart variant
- **EmptyWishlist**: Pre-configured empty wishlist variant

## Examples

### Basic Usage

```tsx
import { ShoppingCart } from 'lucide-react'

<EmptyState
  icon={<ShoppingCart className="h-12 w-12" />}
  title="Your cart is empty"
  message="Add items to your cart to get started"
  action={<Button variant="primary">Browse Games</Button>}
/>
```

### Empty Cart Variant

```tsx
<EmptyCart 
  action={<Button variant="primary">Browse Games</Button>}
/>
```

### Empty Wishlist Variant

```tsx
<EmptyWishlist 
  action={<Button variant="primary">Browse Games</Button>}
/>
```

### Without Action

```tsx
<EmptyState
  icon={<ShoppingCart />}
  title="No items found"
  message="Try adjusting your search filters"
/>
```

## Best Practices

1. Use specific variants (EmptyCart, EmptyWishlist) when available
2. Always provide a clear title
3. Include helpful message explaining the empty state
4. Provide an action button to guide users
5. Use appropriate icons that match the context
