/**
 * New Games Section Component Interface Contract
 * 
 * Defines the TypeScript interfaces for the "New games" section component
 * and related styling requirements.
 */

import { Game } from '@/types/game';

/**
 * GameSection Component Props
 * Extended to support "New games" section specific styling
 */
export interface GameSectionProps {
  title: string;
  subtitle?: string;
  description?: {
    title: string;
    text: string;
  };
  games: Game[];
  tabs?: string[];
  showCheckAll?: boolean;
  checkAllLink?: string;
  checkAllText?: string;
  columns?: number;
  carousel?: boolean;  // Must be true for "new-games" section
  sectionStyle?: React.CSSProperties;
  loading?: boolean;
  error?: string | null;
}

/**
 * GameCard Component Props
 * Extended to support "New" badge display
 */
export interface GameCardProps {
  game: Game;
  size?: 'small' | 'medium' | 'large';
  showNewBadge?: boolean;  // NEW: Controls "New" badge visibility
}

/**
 * Section Container Style Contract
 * 
 * When description prop is provided, section MUST:
 * - Use dark background (colors.surface)
 * - Have large rounded corners (borderRadius.xl)
 * - Include generous padding (spacing.xl or spacing.xxl)
 * - Support decorative background element
 */
export interface SectionContainerStyle {
  backgroundColor: string;  // colors.surface
  borderRadius: string;      // borderRadius.xl
  padding: string;           // spacing.xl or spacing.xxl
  position: 'relative';
  maxWidth?: string;
}

/**
 * New Badge Style Contract
 * 
 * "New" badge MUST:
 * - Be positioned top-right corner of card
 * - Use accent color (colors.accent = #00C8C2)
 * - Include pin icon before text
 * - Have pill-shaped border radius
 * - Use white text
 */
export interface NewBadgeStyle {
  position: 'absolute';
  top: string;
  right: string;
  backgroundColor: string;  // colors.accent
  color: string;            // colors.text
  borderRadius: string;     // borderRadius.full
  padding: string;
  fontSize: string;
  fontWeight: number;
  display: 'flex';
  alignItems: 'center';
  gap: string;
  zIndex: number;
}

/**
 * Carousel Configuration Contract
 * 
 * For "new-games" section:
 * - carousel MUST be true
 * - columns MUST be 4
 * - Navigation arrows MUST be visible
 * - 4 cards MUST be visible at once on desktop
 */
export interface CarouselConfig {
  enabled: boolean;    // true for "new-games"
  columns: number;     // 4 for "new-games"
  showArrows: boolean; // true
  cardsVisible: number; // 4 on desktop
}

/**
 * Component Usage Contract
 * 
 * "New games" section MUST:
 * 1. Use GameSection component with description prop
 * 2. Have carousel: true in homepageSections.ts config
 * 3. Display GameCard components with showNewBadge prop
 * 4. Use design tokens for all colors, spacing, typography
 * 5. Match screenshot design exactly in structure and layout
 */
