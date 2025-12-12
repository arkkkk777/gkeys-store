# Component Best Practices

Guidelines for using UI kit components effectively and consistently.

## General Principles

1. **Always use design tokens** - Never hardcode colors, spacing, or other design values
2. **Follow component APIs** - Use components as designed, don't override styles unnecessarily
3. **Provide accessibility** - Always include labels, ARIA attributes, and keyboard support
4. **Test responsiveness** - Verify components work on mobile, tablet, and desktop
5. **Maintain consistency** - Use the same component patterns throughout the application

## Component Selection

### When to Use Each Component

- **Button**: User actions (submit, cancel, navigate)
- **Input/Textarea**: Text input fields
- **Select**: Dropdown selections
- **Switch**: Binary on/off settings
- **Checkbox**: Multiple selections or agreements
- **Link**: Navigation links
- **Container**: Layout containers
- **EmptyState**: Empty states (cart, wishlist, search results)
- **Feedback**: Success, error, warning, info messages
- **Overlay**: Modal dialogs, popovers

## Form Patterns

### Basic Form

```tsx
<form onSubmit={handleSubmit}>
  <div className="space-y-4">
    <div>
      <Label htmlFor="email" required>Email</Label>
      <Input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
      />
    </div>
    <Button type="submit" variant="primary" fullWidth>
      Submit
    </Button>
  </div>
</form>
```

### Form with Validation

```tsx
<Container padding="lg" background="surface">
  <form>
    <Label htmlFor="name" required>Name</Label>
    <Input
      id="name"
      error={touched.name && errors.name}
      value={name}
      onChange={handleChange}
    />
    
    <Label htmlFor="terms">
      <Checkbox
        id="terms"
        checked={agreed}
        onCheckedChange={setAgreed}
      />
      I agree to the terms
    </Label>
    
    <Button
      type="submit"
      variant="primary"
      disabled={!isValid}
      fullWidth
    >
      Submit
    </Button>
  </form>
</Container>
```

## Layout Patterns

### Page Layout

```tsx
<Section padding="lg" background="default">
  <Container padding="md" spacing="lg">
    <h1>Page Title</h1>
    <p>Page content</p>
  </Container>
</Section>
```

### Card Layout

```tsx
<Frame padding="md" background="surface">
  <h2>Card Title</h2>
  <p>Card content</p>
  <Button variant="primary">Action</Button>
</Frame>
```

### Grouped Elements

```tsx
<Group spacing="md" direction="row">
  <Button variant="primary">Save</Button>
  <Button variant="secondary">Cancel</Button>
</Group>
```

## Error Handling

### Form Errors

```tsx
<Input
  error={errors.email}
  value={email}
  onChange={handleChange}
/>
```

### Feedback Messages

```tsx
{error && (
  <Feedback
    type="error"
    message={error}
    dismissible
    onDismiss={() => setError(null)}
  />
)}
```

## Empty States

### Empty Cart

```tsx
{items.length === 0 && (
  <EmptyCart
    action={<Button variant="primary" href="/catalog">Browse Games</Button>}
  />
)}
```

### Custom Empty State

```tsx
<EmptyState
  icon={<Search className="h-12 w-12" />}
  title="No results found"
  message="Try adjusting your search filters"
  action={<Button variant="primary">Clear Filters</Button>}
/>
```

## Accessibility Checklist

- [ ] All form inputs have associated labels
- [ ] All buttons have accessible text or aria-label
- [ ] Focus indicators are visible
- [ ] Keyboard navigation works for all interactive elements
- [ ] Error messages are announced to screen readers
- [ ] Color contrast meets WCAG AA standards
- [ ] Touch targets are at least 44px on mobile

## Performance Tips

1. Use `React.memo` for components that don't change often
2. Lazy load heavy components
3. Avoid inline styles when Tailwind classes work
4. Use design token classes instead of custom CSS
5. Minimize component re-renders with proper state management

## Common Mistakes to Avoid

1. ❌ Hardcoding colors or spacing values
2. ❌ Creating custom components when UI kit components exist
3. ❌ Skipping labels on form inputs
4. ❌ Using divs instead of semantic HTML
5. ❌ Ignoring mobile responsiveness
6. ❌ Forgetting keyboard navigation
7. ❌ Not testing with screen readers
