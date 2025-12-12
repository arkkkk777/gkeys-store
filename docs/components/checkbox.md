# Checkbox Component

A checkbox component with checked/unchecked states, built on Radix UI primitives.

## Import

```typescript
import { Checkbox } from '@/components/ui/checkbox'
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | - | Checked state |
| `onCheckedChange` | `(checked: boolean) => void` | - | Checked state change handler |
| `disabled` | `boolean` | `false` | Disable checkbox |
| `label` | `string` | - | Label text (use Label component instead) |
| `className` | `string` | - | Additional CSS classes |

## States

- **Unchecked**: Empty checkbox with border
- **Checked**: Primary color background with checkmark
- **Disabled**: 50% opacity, non-interactive

## Examples

### Basic Usage

```tsx
const [checked, setChecked] = useState(false);

<Checkbox
  checked={checked}
  onCheckedChange={setChecked}
/>
```

### With Label

```tsx
<div className="flex items-center gap-2">
  <Checkbox
    checked={agreed}
    onCheckedChange={setAgreed}
  />
  <Label htmlFor="terms">I agree to the terms</Label>
</div>
```

### Disabled State

```tsx
<Checkbox
  checked={true}
  disabled
/>
```

### Multiple Checkboxes

```tsx
<div className="flex flex-col gap-2">
  <div className="flex items-center gap-2">
    <Checkbox checked={option1} onCheckedChange={setOption1} />
    <Label>Option 1</Label>
  </div>
  <div className="flex items-center gap-2">
    <Checkbox checked={option2} onCheckedChange={setOption2} />
    <Label>Option 2</Label>
  </div>
</div>
```

## Best Practices

1. Always provide a label using the Label component
2. Use checkboxes for multiple selections
3. Group related checkboxes together
4. Use clear, descriptive labels
5. Disable during async operations

## Accessibility

- Full keyboard navigation support
- Screen reader compatible
- ARIA attributes automatically handled by Radix UI
- Minimum touch target: 44px on mobile
