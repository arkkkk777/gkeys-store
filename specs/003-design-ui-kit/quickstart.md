# Quick Start: New Games Section Design Update

**Feature**: Update "New games" section to match screenshot design  
**Estimated Time**: 30-45 minutes  
**Complexity**: Medium

## Prerequisites

- Access to GameSection.jsx and GameCard.jsx components
- Understanding of design tokens system
- Screenshot reference for visual verification
- Visual testing environment

## Step-by-Step Implementation

### Step 1: Update Section Configuration (2 minutes)

**File**: `src/config/homepageSections.ts`

Enable carousel for "new-games" section:

```typescript
// Line 73: Change carousel from false to true
{
  id: 'new-games',
  title: 'New games',
  description: {
    title: 'New games',
    text: "There's nothing more exciting than trying something new",
  },
  dataSource: {
    type: 'api',
    method: 'getNewGames',
  },
  display: {
    columns: 4,
    carousel: true,  // Changed from false
    showCheckAll: true,
    checkAllLink: '/catalog?filter=new',
    checkAllText: 'Check all',
  },
}
```

### Step 2: Update GameSection Container Styling (10 minutes)

**File**: `src/components/GameSection.jsx`

Add dark container styling for sections with description:

```typescript
// After line 129, wrap the section content in a styled container when description exists
return (
  <section
    style={{
      padding: '40px 0',
      ...sectionStyle,
    }}
  >
    <div
      style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 24px',
      }}
    >
      {/* Add container wrapper for description sections */}
      {description ? (
        <div
          style={{
            backgroundColor: theme.colors.surface,  // #1A1A1A
            borderRadius: '24px',  // Large rounded corners
            padding: '32px 40px',  // Generous padding
            position: 'relative',
            // Decorative background (gradient)
            backgroundImage: 'linear-gradient(135deg, rgba(0, 200, 194, 0.05) 0%, rgba(0, 0, 0, 0.1) 100%)',
          }}
        >
          {/* Rest of content */}
        </div>
      ) : (
        {/* Original content without container */}
      )}
    </div>
  </section>
);
```

### Step 3: Update Typography (5 minutes)

**File**: `src/components/GameSection.jsx`

Update title and subtitle styling for description sections:

```typescript
// In the header section, update when description exists
{description ? (
  <div>
    <h2
      style={{
        fontSize: '2.5rem',  // Large title (40px)
        fontWeight: '700',
        color: theme.colors.text,
        margin: 0,
        lineHeight: 1.2,
      }}
    >
      {description.title}
    </h2>
    <p
      style={{
        fontSize: '1.125rem',  // Medium subtitle (18px)
        color: theme.colors.textSecondary,  // Light gray
        margin: '12px 0 0 0',
        fontWeight: '400',
      }}
    >
      {description.text}
    </p>
  </div>
) : (
  {/* Original title/subtitle */}
)}
```

### Step 4: Add "New" Badge to GameCard (10 minutes)

**File**: `src/components/GameCard.jsx`

Add "New" badge with pin icon:

```typescript
// Add pin icon component
const PinIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L8 7h3v11h2V7h3L12 2z" />
  </svg>
);

// In GameCard component, add "New" badge
{(game.isNew || showNewBadge) && (
  <div
    style={{
      position: 'absolute',
      top: '8px',
      right: '8px',
      zIndex: 10,
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      backgroundColor: theme.colors.accent,  // #00C8C2
      color: theme.colors.text,  // White
      padding: '4px 10px',
      borderRadius: '9999px',  // Pill shape
      fontSize: '11px',
      fontWeight: '600',
    }}
  >
    <PinIcon />
    <span>New</span>
  </div>
)}
```

### Step 5: Update Price Overlay Gradient (3 minutes)

**File**: `src/components/GameCard.jsx`

Update price overlay gradient to match screenshot:

```typescript
// Update price overlay gradient (around line 232)
<div
  style={{
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '40px 12px 12px',
    background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 50%, transparent 100%)',
  }}
>
```

### Step 6: Update "Check all" Button Styling (5 minutes)

**File**: `src/components/GameSection.jsx`

Update button styling for description sections:

```typescript
// Update "Check all" button (around line 368)
{description && showCheckAll && (
  <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center' }}>
    <Link to={checkAllLink} style={{ textDecoration: 'none' }}>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{
          padding: '12px 32px',  // Generous padding
          backgroundColor: theme.colors.accent,  // #00C8C2
          color: '#000',  // Black text
          border: 'none',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
        }}
      >
        {checkAllText}
      </motion.button>
    </Link>
  </div>
)}
```

### Step 7: Add Decorative Background (5 minutes)

**File**: `src/components/GameSection.jsx`

Add subtle decorative background behind title/subtitle:

```typescript
// In the description container, add pseudo-element or background
<div
  style={{
    backgroundColor: theme.colors.surface,
    borderRadius: '24px',
    padding: '32px 40px',
    position: 'relative',
    // Decorative background gradient
    backgroundImage: 'linear-gradient(135deg, rgba(0, 200, 194, 0.05) 0%, rgba(26, 26, 26, 0.8) 50%, rgba(0, 0, 0, 0.1) 100%)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
```

### Step 8: Verification (5 minutes)

1. **Build and Test**
   ```bash
   npm run build
   npm run preview
   ```

2. **Visual Inspection Checklist**
   - [ ] Section container has dark background with rounded corners
   - [ ] Title is large and bold (2.5rem)
   - [ ] Subtitle is medium size and light gray
   - [ ] Carousel displays 4 cards horizontally
   - [ ] Navigation arrows are visible on left and right
   - [ ] Game cards have "New" badge with pin icon in top-right
   - [ ] Price displays in bottom-left with gradient overlay
   - [ ] "Check all" button is centered below carousel
   - [ ] Decorative background is visible behind title/subtitle
   - [ ] All colors match design tokens (accent = #00C8C2)

3. **Compare with Screenshot**
   - [ ] Structure matches 100%
   - [ ] Spacing matches
   - [ ] Typography matches
   - [ ] Colors match (note: accent may differ if screenshot uses old color)

## Common Patterns

### Using Design Tokens

```typescript
import { colors, spacing, borderRadius, typography } from '@/styles/design-tokens';

// Colors
backgroundColor: colors.surface  // #1A1A1A
color: colors.accent  // #00C8C2

// Spacing
padding: spacing.xl  // 32px

// Border Radius
borderRadius: borderRadius.xl  // 24px

// Typography
fontFamily: typography.fontFamily  // 'Onest', sans-serif
fontSize: typography.fontSize.xl  // 20px
fontWeight: typography.fontWeight.bold  // 700
```

### Conditional Styling

```typescript
// Apply special styling when description prop exists
{description ? (
  <div style={{ /* special container styles */ }}>
    {/* Content */}
  </div>
) : (
  <div style={{ /* default styles */ }}>
    {/* Content */}
  </div>
)}
```

## Troubleshooting

### Issue: Carousel not showing
**Solution**: 
1. Verify `carousel: true` in homepageSections.ts
2. Check that games array has items
3. Verify GameSection component carousel logic

### Issue: "New" badge not appearing
**Solution**: 
1. Check that `game.isNew === true` or `showNewBadge === true`
2. Verify badge styles are applied
3. Check z-index (should be 10)

### Issue: Colors don't match screenshot
**Solution**: 
- Screenshot may use old accent color (#b4ff00)
- Current design tokens use new accent color (#00C8C2)
- Use design tokens for consistency
- Note: If user wants screenshot color, accent token would need update

### Issue: Decorative background not visible
**Solution**: 
1. Check background gradient opacity
2. Verify backgroundImage is applied
3. Adjust gradient colors for visibility

## Success Criteria

- ✅ Section container matches screenshot (dark, rounded, padded)
- ✅ Title and subtitle typography match screenshot
- ✅ Carousel displays 4 cards with navigation arrows
- ✅ Game cards have "New" badge with pin icon
- ✅ Price overlay has correct gradient
- ✅ "Check all" button is centered and styled correctly
- ✅ Decorative background is visible
- ✅ All design tokens used correctly
- ✅ Responsive behavior maintained
- ✅ Visual inspection confirms 100% structure match
