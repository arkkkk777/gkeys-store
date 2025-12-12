# Quickstart Guide: Profile Design Redesign

**Date**: 2024-12-08  
**Feature**: Profile Design Redesign

## Overview

This guide helps you test and verify the redesigned profile pages after implementation.

## Testing Steps

### 1. Access Profile Pages

Navigate to the following URLs:
- `/profile/edit` - Profile Edit Page
- `/profile/balance` - Balance Page
- `/profile/orders` - Orders Page
- `/wishlist` - Wishlist Page (if applicable)

### 2. Verify Left Sidebar Menu

**Checklist:**
- [ ] Menu items display correctly: Profile, Orders, Wishlist, Balance, Edit Profile, Log Out
- [ ] Active page is highlighted with light gray background
- [ ] Non-active items are white text
- [ ] "Edit Profile" shows green badge with "+5" (if applicable)
- [ ] "Log Out" is in bright green text
- [ ] Menu items have proper spacing
- [ ] User stats card is conditionally displayed (or hidden based on page)

### 3. Verify ProfileEditPage Design

**Checklist:**
- [ ] User avatar and name are centered at top
- [ ] Form fields are properly aligned
- [ ] Labels are above input fields
- [ ] "Edit" buttons are positioned correctly (to the right of email field)
- [ ] "Change password" section has proper spacing
- [ ] All buttons use green accent color
- [ ] Input fields have dark backgrounds
- [ ] Card structure matches screenshot

### 4. Verify ProfileBalancePage Design

**Checklist:**
- [ ] User avatar and name are centered at top
- [ ] Balance card contains all sections:
  - [ ] Balance info at top
  - [ ] Promo code section in middle
  - [ ] Payment methods at bottom
- [ ] All sections are within single card
- [ ] Proper spacing between sections
- [ ] Green buttons for actions
- [ ] Payment method selection works correctly

### 5. Verify ProfileOrdersPage Design

**Checklist:**
- [ ] Order cards display correctly
- [ ] Status badges are visible
- [ ] Order information is properly formatted
- [ ] Images display correctly
- [ ] Design is consistent with other profile pages

### 6. Verify Responsive Design

**Checklist:**
- [ ] Left sidebar stacks or collapses on mobile
- [ ] Content area is full width on mobile
- [ ] Form fields stack vertically on mobile
- [ ] Cards are full width on mobile
- [ ] Touch targets meet 44x44px minimum
- [ ] No horizontal scrolling on mobile

### 7. Verify Design Consistency

**Checklist:**
- [ ] All profile pages use same sidebar design
- [ ] Consistent spacing throughout
- [ ] Consistent typography
- [ ] Consistent color scheme (dark background, green accents)
- [ ] Consistent card styling
- [ ] Consistent button styling

## Common Issues and Fixes

### Issue: Sidebar menu not highlighting active page
**Fix**: Check `useLocation` hook and active state logic in ProfileSidebar

### Issue: Form fields not aligned correctly
**Fix**: Check Tailwind CSS classes for alignment and spacing

### Issue: Buttons not using green color
**Fix**: Verify button variant="primary" uses design-primary color

### Issue: Cards not matching screenshot layout
**Fix**: Check card padding, spacing, and structure

### Issue: Mobile layout broken
**Fix**: Verify responsive classes (design-mobile, design-tablet) are applied

## Design Comparison

Compare the implemented design with screenshots:

1. **Left Sidebar:**
   - Menu structure matches
   - Active state highlighting matches
   - Logout button color matches

2. **Content Area:**
   - Layout matches screenshot
   - Spacing matches screenshot
   - Typography matches screenshot

3. **Forms:**
   - Field alignment matches
   - Button placement matches
   - Section spacing matches

## Debugging Tips

1. **Use Browser DevTools:**
   - Inspect elements to verify classes
   - Check computed styles
   - Verify responsive breakpoints

2. **Check Design Tokens:**
   - Verify colors from `design-tokens.ts`
   - Check spacing values
   - Verify typography settings

3. **Test Different Viewports:**
   - Desktop (1920x1080)
   - Tablet (768x1024)
   - Mobile (375x667)

## Next Steps

After verification:
1. Document any design deviations
2. Update design tokens if needed
3. Create follow-up tasks for any issues found
4. Update this guide with any additional findings
