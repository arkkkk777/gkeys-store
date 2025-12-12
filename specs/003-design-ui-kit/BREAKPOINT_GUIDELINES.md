# Breakpoint Usage Guidelines

**Date**: 2024-12-08  
**Feature**: Mobile Adaptation and Layout Fixes

## Standard Breakpoints

All responsive design should use the following standard breakpoints from `src/styles/design-tokens.ts`:

- **Mobile**: `320px` (design-mobile)
- **Tablet**: `768px` (design-tablet)  
- **Desktop**: `1024px` (design-desktop)
- **Wide**: `1280px` (design-wide)

## Tailwind CSS Classes

Use Tailwind responsive prefixes:
- `design-mobile:` - applies at 320px and above
- `design-tablet:` - applies at 768px and above
- `design-desktop:` - applies at 1024px and above

## CSS Media Queries

When using inline CSS or `<style>` tags, use these breakpoints:

```css
@media (max-width: 768px) {
  /* Mobile styles */
}

@media (max-width: 1024px) {
  /* Tablet styles */
}
```

## Non-Standard Breakpoints

The following breakpoints are used for specific cases but should be avoided when possible:

- **480px**: Used for very small mobile devices (iPhone SE, etc.)
  - Can be kept for fine-tuning but prefer 320px/768px when possible
- **374px**: Replaced with 320px (standard mobile breakpoint)

## Best Practices

1. **Mobile-First**: Always design for mobile first, then add tablet/desktop styles
2. **Consistent Breakpoints**: Use standard breakpoints from design tokens
3. **Grid Layouts**: Always use `minmax(0, 1fr)` instead of `1fr` to prevent overflow
4. **Container Padding**: Use Container component with responsive padding
5. **Grid Items**: Add `min-width: 0` to grid items to prevent overflow

## Examples

### ✅ Good: Using Standard Breakpoints
```css
@media (max-width: 768px) {
  .games-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
```

### ❌ Bad: Using Non-Standard Breakpoints
```css
@media (max-width: 600px) {
  .games-grid { grid-template-columns: repeat(2, 1fr); }
}
```

### ✅ Good: Using Tailwind Responsive Classes
```jsx
<div className="p-4 design-mobile:p-2 design-tablet:p-6">
```

### ✅ Good: Grid with Overflow Prevention
```css
.games-grid { 
  display: grid; 
  grid-template-columns: repeat(3, minmax(0, 1fr)); 
  width: 100%; 
}
.games-grid > * { min-width: 0; }
```

## Migration Notes

- All `374px` breakpoints have been replaced with `320px`
- `480px` breakpoints are kept for fine-tuning but should be reviewed
- All grid layouts now use `minmax(0, 1fr)` instead of `1fr`
- Container component is used for consistent padding
