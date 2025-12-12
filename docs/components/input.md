# Input Component

A form input component with error handling, validation states, and responsive sizing.

## Import

```typescript
import { Input } from '@/components/ui/input'
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'text' \| 'email' \| 'password' \| 'number' \| 'tel' \| 'url' \| 'search'` | `'text'` | Input type |
| `placeholder` | `string` | - | Placeholder text |
| `value` | `string` | - | Input value |
| `onChange` | `(e: React.ChangeEvent<HTMLInputElement>) => void` | - | Change handler |
| `icon` | `React.ReactNode` | - | Icon to display before input |
| `error` | `string \| boolean` | - | Error message or error state |
| `fullWidth` | `boolean` | `true` | Make input full width |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Input size |
| `className` | `string` | - | Additional CSS classes |

## States

- **Default**: Surface background with border
- **Focus**: Border changes to primary, focus ring visible
- **Error**: Border changes to error color, error message displayed
- **Disabled**: 50% opacity, cursor not-allowed

## Examples

### Basic Usage

```tsx
<Input 
  type="email" 
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
```

### With Error

```tsx
<Input 
  type="text"
  error="This field is required"
  value={value}
/>
```

### Different Sizes

```tsx
<Input size="sm" placeholder="Small input" />
<Input size="md" placeholder="Medium input" />
<Input size="lg" placeholder="Large input" />
```

### Disabled State

```tsx
<Input 
  type="text"
  value="Disabled input"
  disabled
/>
```

## Best Practices

1. Always provide a `label` using the Label component
2. Use appropriate `type` for better mobile keyboard support
3. Show error messages using the `error` prop
4. Use `fullWidth` for form inputs (default)
5. Validate input on blur or submit, not on every keystroke

## Accessibility

- Supports keyboard navigation
- Visible focus indicators
- ARIA invalid state for errors
- Error messages announced to screen readers
- Minimum touch target: 44px on mobile
