# Mobile Layout Component Contracts

**Date**: 2024-12-08  
**Feature**: Mobile Responsiveness Fixes

## Container Component Contract

### Props (No Changes)
```typescript
interface ContainerProps {
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  background?: 'default' | 'surface' | 'surfaceLight' | 'transparent';
  className?: string;
  children: React.ReactNode;
}
```

### Responsive Behavior
- **Mobile (320px+)**: Padding reduces to `design-xs` (4px) for `sm`, `design-sm` (8px) for `md`
- **Tablet (768px+)**: Standard padding applies
- **Desktop (1024px+)**: Full padding as specified

### Usage Requirements
- All page main content areas should use Container component
- Avoid inline padding styles that conflict with Container
- Use Container's responsive padding instead of custom media queries

## Grid Layout Contract

### Games Grid Requirements
```css
.games-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr)); /* Desktop */
  gap: 20px;
  width: 100%;
}

@media (max-width: 768px) {
  .games-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }
}

@media (max-width: 480px) {
  .games-grid {
    gap: 10px;
  }
}
```

### Grid Item Requirements
- Must have `min-width: 0` to prevent overflow
- Must respect parent container padding
- Aspect ratio should be maintained (3:4 for game cards)

## Responsive Breakpoint Contract

### Standard Breakpoints (from design-tokens.ts)
- **Mobile**: `320px` (design-mobile)
- **Tablet**: `768px` (design-tablet)
- **Desktop**: `1024px` (design-desktop)
- **Wide**: `1280px` (design-wide)

### Usage
- Use Tailwind breakpoint classes: `design-mobile:`, `design-tablet:`, `design-desktop:`
- For complex rules, use `@media (max-width: 768px)` matching design-tablet
- Avoid custom breakpoints not in design tokens

## Touch Target Contract

### Minimum Sizes
- **Interactive Elements**: 44x44px minimum
- **Spacing Between Targets**: 8px minimum
- **Icon Buttons**: 44x44px including padding

### Implementation
```css
@media (hover: none) and (pointer: coarse) {
  button, a, [role="button"] {
    min-height: 44px;
    min-width: 44px;
  }
}
```

## Page Layout Contract

### Required Structure
```jsx
<Container padding="md">
  <div className="games-grid">
    {/* Grid items */}
  </div>
</Container>
```

### Prohibited Patterns
- ❌ Negative margins extending beyond container
- ❌ Fixed widths exceeding viewport
- ❌ Grid columns using `1fr` without `minmax(0, 1fr)`
- ❌ Inline padding conflicting with Container component

## Validation Rules

1. **No Horizontal Overflow**: `overflow-x: hidden` on body, or ensure no element exceeds viewport
2. **Container Boundaries**: All content must respect Container padding
3. **Grid Constraints**: Grid items must not exceed container width minus padding
4. **Touch Accessibility**: All interactive elements meet minimum size requirements
