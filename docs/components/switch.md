# Switch Component

A toggle switch component with on/off states, built on Radix UI primitives.

## Import

```typescript
import { Switch } from '@/components/ui/switch'
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | - | Checked state |
| `onCheckedChange` | `(checked: boolean) => void` | - | Checked state change handler |
| `disabled` | `boolean` | `false` | Disable switch |
| `label` | `string` | - | Label text |
| `className` | `string` | - | Additional CSS classes |

## States

- **Off**: Unchecked state, gray background
- **On**: Checked state, primary color background
- **Disabled**: 50% opacity, non-interactive

## Examples

### Basic Usage

```tsx
const [enabled, setEnabled] = useState(false);

<Switch
  checked={enabled}
  onCheckedChange={setEnabled}
/>
```

### With Label

```tsx
<Switch
  checked={enabled}
  onCheckedChange={setEnabled}
  label="Enable notifications"
/>
```

### Disabled State

```tsx
<Switch
  checked={true}
  disabled
  label="Disabled switch"
/>
```

### With Custom Label Component

```tsx
<div className="flex items-center gap-2">
  <Switch
    checked={enabled}
    onCheckedChange={setEnabled}
  />
  <Label htmlFor="switch">Enable feature</Label>
</div>
```

## Best Practices

1. Use switches for binary on/off settings
2. Provide clear labels indicating what the switch controls
3. Use immediate feedback (no confirmation needed)
4. Disable during async operations
5. Group related switches together

## Accessibility

- Full keyboard navigation support
- Screen reader compatible
- ARIA attributes automatically handled by Radix UI
- Minimum touch target: 44px on mobile
