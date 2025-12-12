# Container Component

A flexible container component with configurable padding, spacing, and background variants.

## Import

```typescript
import { Container } from '@/components/ui/container'
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Padding size |
| `spacing` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | - | Spacing between children |
| `background` | `'default' \| 'surface' \| 'surfaceLight' \| 'transparent'` | `'default'` | Background variant |
| `children` | `React.ReactNode` | - | Container content (required) |
| `className` | `string` | - | Additional CSS classes |

## Background Variants

- **default**: Design background color (#0D0D0D)
- **surface**: Surface color (#1A1A1A)
- **surfaceLight**: Light surface color (#2A2A2A)
- **transparent**: Transparent background

## Examples

### Basic Usage

```tsx
<Container padding="md" background="surface">
  <p>Content here</p>
</Container>
```

### With Spacing

```tsx
<Container padding="lg" spacing="md" background="surface">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Container>
```

### Different Backgrounds

```tsx
<Container background="default">Default background</Container>
<Container background="surface">Surface background</Container>
<Container background="surfaceLight">Light surface background</Container>
<Container background="transparent">Transparent background</Container>
```

## Best Practices

1. Use `padding` to control internal spacing
2. Use `spacing` when container has multiple children
3. Choose appropriate `background` based on context
4. Combine with Section or Frame for page-level containers
