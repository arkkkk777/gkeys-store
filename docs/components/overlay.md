# Overlay Component

A modal overlay component with backdrop and optional blur effect.

## Import

```typescript
import { Overlay } from '@/components/ui/overlay'
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `visible` | `boolean` | - | Visibility state (required) |
| `onClose` | `() => void` | - | Close handler |
| `blur` | `boolean` | `false` | Enable backdrop blur |
| `children` | `React.ReactNode` | - | Overlay content (required) |
| `className` | `string` | - | Additional CSS classes |

## Examples

### Basic Usage

```tsx
const [isOpen, setIsOpen] = useState(false);

<Overlay visible={isOpen} onClose={() => setIsOpen(false)}>
  <div className="bg-design-surface p-design-lg rounded-design-lg">
    <h2>Modal Content</h2>
    <Button onClick={() => setIsOpen(false)}>Close</Button>
  </div>
</Overlay>
```

### With Blur

```tsx
<Overlay visible={isOpen} onClose={() => setIsOpen(false)} blur>
  <div className="bg-design-surface p-design-lg rounded-design-lg">
    Modal with blurred backdrop
  </div>
</Overlay>
```

### Without Close Handler

```tsx
<Overlay visible={isOpen}>
  <div>Non-dismissible overlay</div>
</Overlay>
```

## Best Practices

1. Always provide `onClose` handler for dismissible overlays
2. Use `blur` for better content separation
3. Include close button in overlay content
4. Prevent body scroll when overlay is open
5. Focus trap within overlay content
