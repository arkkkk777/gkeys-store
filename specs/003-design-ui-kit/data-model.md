# Data Model: New Games Section Component Structure

**Feature**: New Games Section Design Update  
**Date**: 2025-12-12

## Overview

This feature updates the "New games" section component structure to match the screenshot design. The component uses existing data structures but requires visual styling updates.

## Component Structure

### GameSection Component Entity

```typescript
interface GameSectionProps {
  title: string;                    // "New games"
  subtitle?: string;                // Optional subtitle
  description?: {                    // Description box content
    title: string;                  // "New games"
    text: string;                   // "There's nothing more exciting than trying something new"
  };
  games: Game[];                     // Array of game objects
  tabs?: string[];                   // Optional tabs (not used for "new-games")
  showCheckAll?: boolean;            // true for "new-games"
  checkAllLink?: string;             // '/catalog?filter=new'
  checkAllText?: string;             // 'Check all'
  columns?: number;                  // 4 for "new-games"
  carousel?: boolean;                // true for "new-games" (UPDATED)
  sectionStyle?: React.CSSProperties; // Custom styles
  loading?: boolean;                 // Loading state
  error?: string | null;             // Error state
}
```

### Section Container Styling

```typescript
interface SectionContainerStyle {
  backgroundColor: string;            // colors.surface (#1A1A1A)
  borderRadius: string;              // borderRadius.xl (24px)
  padding: string;                   // spacing.xl or spacing.xxl
  position: 'relative';              // For decorative background
  maxWidth?: string;                 // Container max-width
}
```

### GameCard Component Entity

```typescript
interface GameCardProps {
  game: Game;                         // Game object
  size?: 'small' | 'medium' | 'large'; // Card size
  showNewBadge?: boolean;            // NEW: Show "New" badge
}

interface Game {
  id: string;
  title: string;
  slug: string;
  image: string;
  price: string;                    // "13€"
  originalPrice?: string;            // Optional original price
  discount?: number;                 // Optional discount percentage
  isNew?: boolean;                   // NEW: Flag for "New" badge
  // ... other game properties
}
```

### "New" Badge Entity

```typescript
interface NewBadgeStyle {
  position: 'absolute';
  top: string;                       // '8px'
  right: string;                     // '8px'
  backgroundColor: string;           // colors.accent (#00C8C2)
  color: string;                     // colors.text (#FFFFFF)
  borderRadius: string;              // borderRadius.full (9999px)
  padding: string;                   // '4px 8px' or similar
  fontSize: string;                  // '10px' or '12px'
  fontWeight: number;                // 600 or 700
  display: 'flex';
  alignItems: 'center';
  gap: string;                       // '4px'
  zIndex: number;                    // 10
}
```

### Carousel Navigation Entity

```typescript
interface CarouselNavigationButton {
  position: 'absolute';
  left?: string;                     // '-20px' for left button
  right?: string;                    // '-20px' for right button
  top: '50%';
  transform: 'translateY(-50%)';
  width: string;                     // '40px'
  height: string;                    // '40px'
  borderRadius: string;              // '50%'
  backgroundColor: string;           // colors.surface
  border: string;                    // `1px solid ${colors.border}`
  cursor: 'pointer';
  display: 'flex';
  alignItems: 'center';
  justifyContent: 'center';
  color: string;                     // colors.text
  zIndex: number;                    // 10
}
```

### Price Overlay Entity

```typescript
interface PriceOverlayStyle {
  position: 'absolute';
  bottom: number;                    // 0
  left: number;                       // 0
  right: number;                     // 0
  padding: string;                   // '40px 12px 12px'
  background: string;                // Gradient: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 50%, transparent 100%)'
}
```

## State Transitions

### Section Rendering Flow

```
1. Component receives props (title, description, games, carousel=true)
   ↓
2. Render section container with dark background and rounded corners
   ↓
3. Render title and subtitle with decorative background
   ↓
4. Render carousel container with navigation arrows
   ↓
5. Map games to GameCard components (with showNewBadge prop)
   ↓
6. Render "Check all" button below carousel
```

### Carousel Interaction Flow

```
1. User clicks left arrow
   ↓
2. scrollLeft() function called
   ↓
3. scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' })
   ↓
4. Carousel scrolls left, revealing previous cards
```

## Validation Rules

1. **Section Container**: Must have dark background (`colors.surface`) when `description` prop is provided
2. **Carousel**: Must be enabled (`carousel: true`) for "new-games" section
3. **Game Cards**: Must display "New" badge when `game.isNew === true` or `showNewBadge === true`
4. **Typography**: Title must use `typography.fontFamily` (Onest), `fontWeight.bold` (700)
5. **Colors**: All colors must reference design tokens, not hardcoded values
6. **Responsive**: Must maintain functionality on mobile/tablet/desktop

## Relationships

- **GameSection** → **GameCard**: One-to-many (section contains multiple cards)
- **GameCard** → **NewBadge**: One-to-one (card may have one "New" badge)
- **GameSection** → **SectionContainerStyle**: One-to-one (section has one container style)
- **GameSection** → **CarouselNavigation**: One-to-two (section has left and right navigation buttons)
- **GameCard** → **PriceOverlay**: One-to-one (card has one price overlay)

## Configuration Updates

### homepageSections.ts Update

```typescript
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
    carousel: true,  // UPDATED: Changed from false to true
    showCheckAll: true,
    checkAllLink: '/catalog?filter=new',
    checkAllText: 'Check all',
  },
}
```

## Migration Path

### Current State
- Section container: No special styling for description sections
- Carousel: Disabled for "new-games" (`carousel: false`)
- Game cards: No "New" badge support
- Button: Basic styling, not centered

### Target State
- Section container: Dark background, rounded corners, padding for description sections
- Carousel: Enabled for "new-games" (`carousel: true`)
- Game cards: "New" badge with pin icon support
- Button: Centered, styled with accent color
- Typography: Large title, medium subtitle
- Decorative background: Subtle gradient behind title/subtitle
