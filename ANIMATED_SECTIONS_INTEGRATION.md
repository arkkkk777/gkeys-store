# Animated Sections Component Integration

## Overview
The `AnimatedSections` component has been successfully integrated into the codebase. This component provides a full-screen animated section carousel with smooth transitions, perfect for showcasing featured games.

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

✅ **Dependencies** - Installed
- `gsap`: Latest version
- `@gsap/react`: Latest version
- `framer-motion`: ^12.23.25 (already installed)
- `lucide-react`: ^0.555.0 (already installed)

## Files Created

1. **`src/components/ui/animated-sections-1.tsx`**
   - Main component file
   - Full-screen animated section carousel
   - Adapted for game titles and images

2. **`src/components/ui/animated-sections-1-demo.tsx`**
   - Demo/example file showing how to use the component
   - Includes sample game data

## Component Props

The component accepts the following props:

```typescript
interface AnimatedSectionsProps {
  sections?: SectionData[];    // Array of section data (text + image)
  className?: string;          // Additional CSS classes
  headerTitle?: string;        // Optional header title (not used in current implementation)
}

interface SectionData {
  text: string;  // Game title or section text
  img: string;   // Background image URL
}
```

## Features

- **Full-screen sections**: Each section takes up the full viewport
- **Smooth animations**: GSAP-powered transitions between sections
- **Scroll navigation**: Navigate using mouse wheel, touch, or pointer
- **Thumbnail navigation**: Click thumbnails to jump to specific sections
- **Counter display**: Shows current section number
- **Image preloading**: Ensures smooth transitions by preloading all images
- **Split text animations**: Text animates line by line for dramatic effect
- **Responsive design**: Works on all screen sizes

## GSAP Plugins Used

- **Observer**: Handles scroll/touch/pointer events for navigation
- **SplitText**: Creates animated text line-by-line effects
- **useGSAP**: React hook for GSAP animations

## Usage Example

```tsx
import AnimatedSections from "@/components/ui/animated-sections-1";

function FeaturedGames() {
  const gameSections = [
    {
      text: "Cyberpunk 2077",
      img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&h=1080&fit=crop"
    },
    {
      text: "Elden Ring",
      img: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1920&h=1080&fit=crop"
    },
    {
      text: "Red Dead Redemption 2",
      img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1920&h=1080&fit=crop"
    }
  ];

  return (
    <AnimatedSections sections={gameSections} />
  );
}
```

## Navigation

- **Scroll Up/Down**: Navigate between sections
- **Touch Swipe**: Swipe up/down on mobile devices
- **Thumbnail Click**: Click thumbnails in bottom-right corner
- **Counter**: Shows current section (e.g., "1 / 3")

## Default Sections

The component includes default game sections:
- Cyberpunk 2077
- Elden Ring
- Red Dead Redemption 2

These use Unsplash stock images and can be overridden by passing custom `sections` prop.

## Integration Points

The component can be used in:
- Homepage hero section
- Featured games showcase
- Game category pages
- Special promotions/events

## Styling

- Full-screen black background
- White text with uppercase styling
- Responsive text sizing using `clamp()`
- Gradient overlay on images for better text readability
- Smooth transitions and animations

## Performance Considerations

- Images are preloaded before animations start
- GSAP animations are hardware-accelerated
- Cleanup functions prevent memory leaks
- Observer is properly killed on unmount

## Accessibility

- Keyboard navigation support
- Proper button elements for interactive thumbnails
- ARIA labels can be added if needed
- Focus management for better UX

## Notes

- Component uses GSAP Observer for scroll detection
- SplitText creates line-by-line text animations
- All animations are optimized for 60fps
- Component is fully typed with TypeScript
- Uses `cn()` utility for className merging (shadcn pattern)
