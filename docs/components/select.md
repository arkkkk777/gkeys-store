# Select Component

A dropdown select component with open/closed states, built on Radix UI primitives.

## Import

```typescript
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
```

## Props

### Select (Root)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | Selected value |
| `onValueChange` | `(value: string) => void` | - | Value change handler |
| `defaultValue` | `string` | - | Default value |
| `disabled` | `boolean` | `false` | Disable select |

### SelectTrigger

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes |

### SelectItem

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | Option value (required) |
| `disabled` | `boolean` | `false` | Disable this option |
| `children` | `React.ReactNode` | - | Option label (required) |

## Examples

### Basic Usage

```tsx
const [value, setValue] = useState('');

<Select value={value} onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue placeholder="Select an option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
    <SelectItem value="option3">Option 3</SelectItem>
  </SelectContent>
</Select>
```

### With Label

```tsx
<Label htmlFor="select">Choose an option</Label>
<Select>
  <SelectTrigger id="select">
    <SelectValue placeholder="Select..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="1">First</SelectItem>
    <SelectItem value="2">Second</SelectItem>
  </SelectContent>
</Select>
```

### Disabled State

```tsx
<Select disabled>
  <SelectTrigger>
    <SelectValue placeholder="Disabled" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="1">Option 1</SelectItem>
  </SelectContent>
</Select>
```

## Best Practices

1. Always provide a label using the Label component
2. Use descriptive option labels
3. Provide placeholder text when no value is selected
4. Disable select during async operations
5. Group related options when appropriate

## Accessibility

- Full keyboard navigation support
- Screen reader compatible
- Focus management
- ARIA attributes automatically handled by Radix UI
