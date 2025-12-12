# Research: Profile Design Redesign

**Date**: 2024-12-08  
**Feature**: Profile Design Redesign  
**Phase**: 0 - Research & Analysis

## Overview

Research findings for redesigning the personal account (личный кабинет) pages to match provided screenshots. The goal is to implement a consistent two-column layout with left sidebar menu and right content area.

## Screenshot Analysis

### Left Sidebar Menu Structure

**From Screenshots:**
- Simple vertical list of navigation items
- Items: Profile, Orders, Wishlist, Balance, Edit Profile, Log Out
- Active item highlighted with light gray background (`#242424` or `#333333`)
- Non-active items in white text
- "Edit Profile" has green badge with "+5" (notifications/updates)
- "Log Out" in bright green text
- No user stats card visible on some pages (conditional display)
- Consistent padding and spacing between items
- Rounded corners on active state background

**Current Implementation:**
- Uses ProfileSidebar component
- Has user stats card (conditional)
- Menu items with proper active state
- Logout button styled differently

**Gap Analysis:**
- Need to simplify menu structure
- Update active state styling to match screenshots
- Update logout button color to green
- Conditionally hide user stats card on some pages

### Content Area Layout

**From Screenshots:**

1. **ProfileEditPage:**
   - User avatar and name at top (centered)
   - Form sections with proper labels
   - Input fields with dark background
   - "Edit" buttons positioned to the right of email field
   - "Change password" section with proper spacing
   - Green accent buttons for actions
   - Proper field alignment and spacing

2. **ProfileBalancePage:**
   - User avatar and name at top (centered)
   - Balance card with sections:
     - Balance info at top
     - Promo code section in middle
     - Payment methods at bottom
   - All sections within single card
   - Proper spacing between sections
   - Green buttons for actions

3. **ProfileOrdersPage:**
   - Order cards with proper layout
   - Status badges
   - Order information and images
   - Consistent card styling

**Current Implementation:**
- ProfileEditPage has card-based layout but needs alignment updates
- ProfileBalancePage has separate sections that need consolidation
- ProfileOrdersPage has proper card layout

**Gap Analysis:**
- Need to update form field alignment
- Need to consolidate balance card sections
- Need to ensure consistent spacing
- Need to match button placements

## Design System Analysis

### Colors
- **Background**: Dark (`#121212` or similar)
- **Surface**: Dark gray (`#242424` or `#333333`)
- **Primary/Accent**: Bright green (for buttons, active states, badges)
- **Text**: White for primary, light gray for secondary
- **Borders**: Subtle dark borders

### Typography
- Clean sans-serif fonts
- Consistent font sizes for headings
- Proper line heights and spacing

### Spacing
- Consistent padding in cards
- Proper gaps between form fields
- Adequate spacing between sections

### Components
- Cards with rounded corners
- Input fields with dark backgrounds
- Buttons with green accent color
- Badges for notifications/status

## Technical Decisions

### Decision: Simplify ProfileSidebar
**Rationale**: Screenshots show a simpler menu structure without user stats card on all pages.  
**Alternatives Considered**: Keep stats card but make it conditional - **CHOSEN**  
**Implementation**: Add prop to conditionally show/hide user stats card

### Decision: Consolidate Balance Card Sections
**Rationale**: Screenshot shows all balance sections in a single card.  
**Alternatives Considered**: Keep separate cards - **REJECTED** (doesn't match design)  
**Implementation**: Keep single card with all sections inside

### Decision: Update Form Layout Alignment
**Rationale**: Screenshots show specific field and button alignment.  
**Alternatives Considered**: Keep current layout - **REJECTED** (doesn't match design)  
**Implementation**: Update form field layouts and button positions

### Decision: Use Design Tokens
**Rationale**: Maintain consistency with existing design system.  
**Alternatives Considered**: Hardcode colors - **REJECTED** (breaks design system)  
**Implementation**: Use existing design tokens from `design-tokens.ts`

## Responsive Considerations

- Left sidebar should stack or collapse on mobile
- Content area should be full width on mobile
- Form fields should stack vertically on mobile
- Cards should be full width on mobile
- Maintain touch targets (44x44px minimum)

## Accessibility Considerations

- Maintain proper ARIA labels
- Ensure keyboard navigation works
- Maintain focus states
- Ensure color contrast meets WCAG AA
- Screen reader compatibility

## Implementation Notes

1. **ProfileSidebar Updates:**
   - Remove or conditionally show user stats card
   - Update active state background color
   - Update logout button to green
   - Ensure proper spacing

2. **ProfileEditPage Updates:**
   - Center user avatar and name
   - Update form field alignment
   - Position "Edit" buttons correctly
   - Update section spacing

3. **ProfileBalancePage Updates:**
   - Center user avatar and name
   - Consolidate all sections in single card
   - Update spacing between sections
   - Ensure proper button styling

4. **ProfileOrdersPage:**
   - Verify design consistency
   - Update if needed

## Next Steps

1. Generate component contracts
2. Create implementation tasks
3. Begin implementation with ProfileSidebar
4. Update each profile page sequentially
5. Test and verify design matches screenshots
