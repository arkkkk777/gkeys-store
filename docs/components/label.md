# Label Component

A label component for form inputs with required and error state support.

## Import

```typescript
import { Label } from '@/components/ui/label'
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `required` | `boolean` | `false` | Mark as required (shows asterisk) |
| `error` | `boolean` | `false` | Error state (changes color) |
| `children` | `React.ReactNode` | - | Label content (required) |
| `className` | `string` | - | Additional CSS classes |

## Examples

### Basic Usage

```tsx
<Label htmlFor="email">Email Address</Label>
<Input id="email" type="email" />
```

### Required Field

```tsx
<Label htmlFor="name" required>Full Name</Label>
<Input id="name" type="text" />
```

### Error State

```tsx
<Label htmlFor="email" error>Email Address</Label>
<Input id="email" type="email" error="Invalid email" />
```

### With Checkbox

```tsx
<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">I agree to the terms</Label>
</div>
```

## Best Practices

1. Always associate labels with inputs using `htmlFor` and `id`
2. Use `required` prop to indicate required fields
3. Use `error` prop when input has validation errors
4. Keep labels concise and descriptive
5. Place labels above inputs for better readability

## Accessibility

- Properly associated with form inputs
- Screen reader compatible
- Required indicator announced to screen readers
- Error state visually and programmatically indicated
