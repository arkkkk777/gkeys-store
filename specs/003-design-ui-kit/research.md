# Research: New Games Section Design Update

**Feature**: Update "New games" section to match screenshot design  
**Date**: 2025-12-12  
**Status**: Complete

## Research Objectives

1. Analyze screenshot design requirements for "New games" section
2. Identify all visual elements and their specifications
3. Determine component structure and layout requirements
4. Map design elements to existing components and design tokens
5. Identify required changes to match screenshot exactly

## Findings

### 1. Section Container Design

**Decision**: Dark container with rounded corners and padding  
**Rationale**: Screenshot shows a distinct dark container that separates the section from the background  
**Specifications**:
- **Background Color**: `#1A1A1A` (matches design tokens `colors.surface`)
- **Border Radius**: `24px` or `32px` (large rounded corners, matches `borderRadius.xl`)
- **Padding**: Generous internal padding around all content (matches `spacing.xl` or `spacing.xxl`)
- **Background Detail**: Subtle abstract background illustration behind title/subtitle (decorative, non-interactive)
- **Position**: Centered container with max-width constraint

**Implementation**: Update `GameSection.jsx` to add conditional styling for sections with `description` prop, wrapping content in a styled container.

### 2. Header Typography

**Decision**: Large title and subtitle with specific typography  
**Rationale**: Screenshot shows prominent text hierarchy  
**Specifications**:

#### Title: "New games"
- **Font**: Onest (from design tokens `typography.fontFamily`)
- **Size**: Large and prominent (`2.5rem` to `3rem`, or Tailwind `text-5xl`/`text-6xl`)
- **Weight**: Bold (`fontWeight.bold` = 700)
- **Color**: White (`colors.text` = `#FFFFFF`)
- **Position**: Top of container, left-aligned

#### Subtitle: "There's nothing more exciting than trying something new"
- **Font**: Onest (from design tokens `typography.fontFamily`)
- **Size**: Medium (`1.125rem` to `1.25rem`, or Tailwind `text-lg`/`text-xl`)
- **Weight**: Regular (`fontWeight.normal` = 400)
- **Color**: Light gray (`colors.textSecondary` = `#A0A0A0` or similar)
- **Position**: Below title with vertical spacing

**Implementation**: Use existing `description` prop structure in `GameSection.jsx`, update typography to match specifications.

### 3. Game Carousel Layout

**Decision**: Horizontal scrollable carousel with navigation arrows  
**Rationale**: Screenshot shows horizontal carousel, not grid layout  
**Specifications**:
- **Layout**: Horizontal scrollable container
- **Visible Cards**: 4 cards fully visible at once
- **Scroll Behavior**: Smooth scrolling with scroll snap
- **Navigation Arrows**: Circular buttons on left and right edges
  - **Position**: Vertically centered, slightly overlapping cards
  - **Background**: Dark gray (similar to section background)
  - **Icon**: White chevron icons (`<` left, `>` right)
  - **Size**: Circular buttons (~40px diameter)
  - **Hover State**: Scale animation

**Implementation**: 
- Update `homepageSections.ts` to set `carousel: true` for "new-games" section
- Ensure `GameSection.jsx` carousel implementation matches screenshot positioning

### 4. Game Card Design

**Decision**: Cards with "New" badge, price overlay, and specific styling  
**Rationale**: Screenshot shows specific card design requirements  
**Specifications**:

#### Card Container
- **Shape**: Rectangular with moderately rounded corners (`12px` or `16px`, matches `borderRadius.md` or `borderRadius.lg`)
- **Shadow**: Subtle soft shadow for elevation
- **Aspect Ratio**: Maintain `3/4` aspect ratio

#### "New" Badge
- **Text**: "New"
- **Icon**: Small black vertical pin/tag icon to the left of text
- **Background Color**: **Accent color** - Need to clarify: screenshot shows `#b4ff00` (old accent), but design tokens use `#00C8C2` (new accent)
  - **Decision Required**: Use `colors.accent` (`#00C8C2`) or verify with user
- **Text Color**: White
- **Shape**: Pill-shaped with fully rounded horizontal ends (`borderRadius.full`)
- **Position**: Top-right corner, slightly overlapping card border
- **Padding**: Small symmetrical padding around text and icon

#### Price Display
- **Value**: "13€" (example from screenshot)
- **Font**: White, bold, sans-serif
- **Position**: Bottom-left corner of card, slightly offset from edges
- **Overlay**: Transparent dark gradient covering bottom part of game art for text readability
- **Gradient**: `linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 50%, transparent 100%)`

**Implementation**: 
- Add "New" badge support to `GameCard.jsx` (new prop or detect from game data)
- Create pin icon component
- Update price overlay styling to match gradient specification

### 5. "Check all" Button

**Decision**: Centered button below carousel with specific styling  
**Rationale**: Screenshot shows prominent call-to-action button  
**Specifications**:
- **Content**: "Check all"
- **Background Color**: **Accent color** - Need to clarify: screenshot shows `#b4ff00` (old accent), but design tokens use `#00C8C2` (new accent)
  - **Decision Required**: Use `colors.accent` (`#00C8C2`) or verify with user
- **Text Color**: Black or very dark gray
- **Shape**: Rounded rectangle (less rounded than section container, typical button curvature)
- **Position**: Centered horizontally below game carousel
- **Padding**: Generous internal padding (`py-3 px-6` or similar)
- **Font**: Bold, medium size

**Implementation**: Update `GameSection.jsx` button styling for sections with `description` prop.

### 6. Color Discrepancy Resolution

**Decision**: Use design token accent color (`#00C8C2`)  
**Rationale**: Design tokens are single source of truth, recent update changed accent to `#00C8C2`  
**Alternative Considered**: Use screenshot color (`#b4ff00`)  
**Rejected Because**: Design tokens were recently updated to use `#00C8C2`, screenshot may be outdated  
**Action**: Implement with `colors.accent` (`#00C8C2`), note discrepancy in implementation

**Note**: If user wants screenshot color (`#b4ff00`), this would require reverting accent color change, which is out of scope for this feature.

### 7. Decorative Background Element

**Decision**: Add subtle abstract background illustration  
**Rationale**: Screenshot shows decorative element behind title/subtitle  
**Specifications**:
- **Style**: Abstract, dark earthy tones with hints of blue/green
- **Position**: Behind title and subtitle text
- **Opacity**: Low (subtle, not distracting)
- **Implementation**: CSS background-image or pseudo-element with gradient/pattern

**Implementation Options**:
1. CSS gradient with multiple color stops
2. SVG pattern as background
3. Pseudo-element with blur effect
4. Image asset (if provided)

**Chosen**: CSS gradient with multiple color stops for simplicity and performance.

### 8. Responsive Behavior

**Decision**: Maintain responsive design while matching desktop screenshot  
**Rationale**: Application must work on all screen sizes  
**Specifications**:
- **Desktop**: Match screenshot exactly (4 cards visible, full layout)
- **Tablet**: Reduce visible cards, maintain carousel
- **Mobile**: Stack or reduce cards, hide navigation arrows if needed

**Implementation**: Use existing responsive breakpoints from design tokens, ensure carousel adapts gracefully.

## Alternatives Considered

1. **Use screenshot accent color (`#b4ff00`)**: Rejected - conflicts with recent design token update
2. **Remove decorative background**: Rejected - screenshot clearly shows it
3. **Grid layout instead of carousel**: Rejected - screenshot shows horizontal carousel
4. **Different badge design**: Rejected - screenshot shows specific "New" badge with pin icon

## Implementation Strategy

1. **Phase 1**: Update section container styling (dark background, rounded corners, padding)
2. **Phase 2**: Update typography (title and subtitle sizing, spacing)
3. **Phase 3**: Enable carousel for "new-games" section in config
4. **Phase 4**: Add "New" badge to GameCard component
5. **Phase 5**: Update "Check all" button styling
6. **Phase 6**: Add decorative background element
7. **Phase 7**: Visual verification against screenshot

## Dependencies

- Design tokens must be available (`colors`, `spacing`, `borderRadius`, `typography`)
- GameSection component must support carousel mode
- GameCard component must support badge props
- Framer Motion for animations (already available)

## Risks

- **Low Risk**: Accent color discrepancy may require user clarification
- **Mitigation**: Implement with design tokens, note in code comments
- **Low Risk**: Decorative background may not match exactly without design asset
- **Mitigation**: Use CSS gradients to approximate, can be replaced with asset later
- **Low Risk**: Responsive behavior may differ from screenshot
- **Mitigation**: Ensure desktop matches exactly, mobile adapts gracefully

## Success Criteria

- [ ] Section container matches screenshot (dark background, rounded corners, padding)
- [ ] Title and subtitle typography match screenshot exactly
- [ ] Carousel displays 4 cards horizontally with navigation arrows
- [ ] Game cards have "New" badge with pin icon in top-right corner
- [ ] Price displays in bottom-left with gradient overlay
- [ ] "Check all" button is centered below carousel with correct styling
- [ ] Decorative background element is visible behind title/subtitle
- [ ] All colors use design tokens (accent color = `#00C8C2`)
- [ ] Responsive behavior maintained
- [ ] Visual inspection confirms 100% match to screenshot structure
