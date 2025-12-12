# Feedback Component

A component for displaying feedback messages (success, error, warning, info) with optional dismissal.

## Import

```typescript
import { Feedback } from '@/components/ui/feedback'
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'success' \| 'error' \| 'warning' \| 'info'` | - | Feedback type (required) |
| `message` | `string` | - | Message text (required) |
| `dismissible` | `boolean` | `false` | Allow dismissal |
| `onDismiss` | `() => void` | - | Dismiss handler |
| `className` | `string` | - | Additional CSS classes |

## Types

- **success**: Green background with success message
- **error**: Red background with error message
- **warning**: Orange background with warning message
- **info**: Surface background with info message

## Examples

### Success Message

```tsx
<Feedback
  type="success"
  message="Your order has been placed successfully!"
/>
```

### Error Message

```tsx
<Feedback
  type="error"
  message="Failed to process payment. Please try again."
/>
```

### Dismissible Warning

```tsx
const [showWarning, setShowWarning] = useState(true);

{showWarning && (
  <Feedback
    type="warning"
    message="Your session will expire in 5 minutes"
    dismissible
    onDismiss={() => setShowWarning(false)}
  />
)}
```

### Info Message

```tsx
<Feedback
  type="info"
  message="New games added to the catalog"
/>
```

## Best Practices

1. Use appropriate type for the message context
2. Keep messages concise and actionable
3. Use dismissible for non-critical messages
4. Position feedback messages prominently but not intrusively
5. Auto-dismiss success messages after a few seconds
