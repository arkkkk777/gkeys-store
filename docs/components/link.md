# Link Component

A link component with variants and icon support that follows the design system.

## Import

```typescript
import { Link } from '@/components/ui/link'
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | - | Link URL (required) |
| `variant` | `'default' \| 'primary' \| 'muted'` | `'default'` | Link variant |
| `icon` | `React.ReactNode` | - | Icon to display |
| `external` | `boolean` | `false` | External link (opens in new tab) |
| `children` | `React.ReactNode` | - | Link content (required) |
| `className` | `string` | - | Additional CSS classes |

## Variants

- **default**: Text color with hover to primary
- **primary**: Primary color with hover to darker
- **muted**: Muted text color with hover to text

## Examples

### Basic Usage

```tsx
<Link href="/cart">Go to Cart</Link>
```

### With Icon

```tsx
import { ShoppingCart } from 'lucide-react'

<Link href="/cart" icon={<ShoppingCart />}>
  Cart
</Link>
```

### External Link

```tsx
<Link href="https://example.com" external>
  External Link
</Link>
```

### Different Variants

```tsx
<Link href="/" variant="default">Default Link</Link>
<Link href="/" variant="primary">Primary Link</Link>
<Link href="/" variant="muted">Muted Link</Link>
```

## Best Practices

1. Use `primary` variant for important links
2. Use `muted` variant for less prominent links
3. Always set `external` for external links
4. Provide descriptive link text (avoid "click here")
5. Use icons to enhance link meaning

## Accessibility

- Supports keyboard navigation
- Visible focus indicators
- External links automatically get `rel="noopener noreferrer"`
- Minimum touch target: 44px on mobile
