# Game Item Card Component Integration

## Overview
The `GameItemCard` component has been successfully integrated into the codebase. This component is an adapted version of the original `MenuItemCard`, specifically designed for displaying game items in the GKEYS store.

## Project Setup Status

✅ **shadcn/ui structure** - Already configured
- Components path: `src/components/ui/`
- Config file: `components.json` exists
- Aliases configured: `@/components/ui` → `src/components/ui`

✅ **Tailwind CSS** - Already installed and configured
- Config file: `tailwind.config.js`
- CSS file: `src/index.css`

✅ **TypeScript** - Already configured
- TypeScript version: 5.9.3
- Config files: `tsconfig.json`, `tsconfig.app.json`

✅ **Dependencies** - Already installed
- `framer-motion`: ^12.23.25
- `lucide-react`: ^0.555.0
- `clsx` and `tailwind-merge` for `cn()` utility

## Files Created

1. **`src/components/ui/game-item-card.tsx`**
   - Main component file
   - Adapted for game items (replaced menu-specific props with game props)

2. **`src/components/ui/game-item-card-demo.tsx`**
   - Demo/example file showing how to use the component
   - Includes sample game data

## Component Props

The component accepts the following props:

```typescript
interface GameItemCardProps {
  imageUrl: string;           // Game cover image URL
  isBestSeller: boolean;      // Whether the game is a best seller
  isNew?: boolean;            // Whether the game is new (optional)
  title: string;              // Game title
  price: number;              // Current price
  originalPrice?: number;     // Original price (for discount calculation)
  platform: string;           // Platform(s) where game is available
  genre?: string;             // Game genre (optional)
  releaseDate?: string;       // Release date (optional)
  onAdd: () => void;          // Callback when "Add to Cart" is clicked
}
```

## Adaptations from MenuItemCard

The component was adapted for games with the following changes:

- `isVegetarian` → `isBestSeller` / `isNew` (boolean flags for game badges)
- `name` → `title` (game title)
- `quantity` → `platform` (platform information)
- `prepTimeInMinutes` → `releaseDate` (game release date)
- Removed vegetarian icon, replaced with Best Seller/New badges
- Added discount badge display
- Updated styling to use neon lime accent color (#b4ff00)

## Accent Color Update

The accent color has been updated to neon lime (#b4ff00) in `src/index.css`:
- Light mode: `--accent: 72 100% 50%`
- Dark mode: `--accent: 72 100% 50%`

## Usage Example

```tsx
import { GameItemCard } from "@/components/ui/game-item-card";

function GameCatalog() {
  const handleAddToCart = (gameTitle: string) => {
    // Add to cart logic
    console.log(`Added ${gameTitle} to cart`);
  };

  return (
    <GameItemCard
      imageUrl="https://example.com/game-cover.jpg"
      isBestSeller={true}
      isNew={false}
      title="Cyberpunk 2077"
      price={29.99}
      originalPrice={59.99}
      platform="Steam, PC"
      genre="RPG, Action"
      releaseDate="2020-12-10"
      onAdd={() => handleAddToCart("Cyberpunk 2077")}
    />
  );
}
```

## Features

- **Animations**: Smooth fade-in and hover effects using Framer Motion
- **Responsive**: Works on all screen sizes
- **Accessible**: Proper ARIA labels and keyboard navigation
- **Interactive**: Hover effects reveal "Add to Cart" button
- **Badges**: Displays Best Seller, New, and Discount badges
- **Price Display**: Shows current price, original price (if discounted), and savings amount

## Integration Points

The component can be used in:
- Game catalog pages
- Search results
- Featured games sections
- Wishlist pages
- Similar games recommendations

## Testing

To test the component, you can:
1. Import and use `GameItemCardDemo` component
2. Or create a test page that uses `GameItemCard` with sample data

## Notes

- All image URLs in the demo use Unsplash stock images
- The component uses the project's existing design system (shadcn/ui)
- Accent color matches the neon lime theme (#b4ff00)
- Component is fully typed with TypeScript
