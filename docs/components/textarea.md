# Textarea Component

A multi-line text input component with error handling and validation states.

## Import

```typescript
import { Textarea } from '@/components/ui/textarea'
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | `string` | - | Placeholder text |
| `value` | `string` | - | Textarea value |
| `onChange` | `(e: React.ChangeEvent<HTMLTextAreaElement>) => void` | - | Change handler |
| `error` | `string \| boolean` | - | Error message or error state |
| `fullWidth` | `boolean` | `true` | Make textarea full width |
| `rows` | `number` | - | Number of rows |
| `className` | `string` | - | Additional CSS classes |

## States

- **Default**: Surface background with border
- **Focus**: Border changes to primary, focus ring visible
- **Error**: Border changes to error color, error message displayed
- **Disabled**: 50% opacity, cursor not-allowed

## Examples

### Basic Usage

```tsx
<Textarea
  placeholder="Enter your message"
  value={message}
  onChange={(e) => setMessage(e.target.value)}
/>
```

### With Error

```tsx
<Textarea
  placeholder="Enter description"
  error="Description is required"
  value={description}
/>
```

### With Rows

```tsx
<Textarea
  placeholder="Enter long text"
  rows={10}
  value={longText}
/>
```

### Disabled State

```tsx
<Textarea
  value="Disabled textarea"
  disabled
/>
```

## Best Practices

1. Always provide a label using the Label component
2. Use appropriate `rows` for expected content length
3. Show error messages using the `error` prop
4. Use `fullWidth` for form textareas (default)
5. Validate on blur or submit, not on every keystroke

## Accessibility

- Supports keyboard navigation
- Visible focus indicators
- ARIA invalid state for errors
- Error messages announced to screen readers
