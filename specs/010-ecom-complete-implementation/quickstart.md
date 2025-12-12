# Quickstart Guide: Complete E-Commerce Platform Implementation

**Date**: 2024-12-10  
**Feature**: 010-ecom-complete-implementation

## Overview

This guide provides step-by-step instructions for testing and validating the complete e-commerce platform implementation based on the technical specification.

## Prerequisites

1. Backend server running on `http://localhost:3000`
2. Frontend server running on `http://localhost:5173`
3. Database with migrations applied
4. G2A API credentials configured (if testing G2A integration)
5. Payment gateway credentials configured (if testing payments)
6. Email service configured (if testing emails)

## Testing Scenarios

### Scenario 1: User Registration and Login

**Steps**:
1. Navigate to homepage
2. Click "Log in" button in header
3. Side menu should open
4. Click "Register" tab
5. Fill in:
   - Email: `test@example.com`
   - Password: `Test123!@#`
   - Check "I agree to terms"
6. Click "Register"
7. Check email for registration confirmation
8. Login with credentials
9. Verify session is created

**Expected Results**:
- ✅ Registration successful
- ✅ Email received
- ✅ Login successful
- ✅ User redirected to homepage
- ✅ Header shows user nickname

### Scenario 2: Homepage Sections

**Steps**:
1. Navigate to homepage (logged out)
2. Verify all sections are visible:
   - Hero Block with carousel
   - Best Sellers with genre tabs
   - New in Catalog carousel
   - Preorders carousel
   - New Games carousel
   - Genre-based carousels
   - Random picks carousel
3. Click genre tab in Best Sellers
4. Verify games filter by genre
5. Click "Check all" on any section
6. Verify redirect to catalog with appropriate filters

**Expected Results**:
- ✅ All sections load
- ✅ Carousels work smoothly
- ✅ Genre filtering works
- ✅ "Check all" links work correctly

### Scenario 3: Catalog with Advanced Filters

**Steps**:
1. Navigate to catalog page
2. Verify game counter shows total
3. Test price range filter:
   - Set min: 10, max: 50
   - Verify games filtered
4. Test "In Stock Only" toggle:
   - Toggle off
   - Verify preorders appear
   - Toggle on
   - Verify preorders hidden
5. Test multi-select filters:
   - Select platforms: Steam, Epic Games
   - Select genres: Action, RPG
   - Verify games filtered
6. Test search:
   - Search for "Metro"
   - Verify results
7. Test sorting:
   - Sort by "Price Low-High"
   - Verify games sorted
8. Test pagination:
   - Navigate to page 2
   - Verify 36 games per page

**Expected Results**:
- ✅ All filters work correctly
- ✅ Filter combinations work
- ✅ Search works
- ✅ Sorting works
- ✅ Pagination works

### Scenario 4: Game Detail Page

**Steps**:
1. Click on any game card
2. Verify game detail page loads:
   - Hero block with game image
   - Title and description
   - Delivery method: "Key"
   - Platform information
   - Activation guide link
   - Price
   - Buy button
   - Wishlist button
3. Click "Buy" button
4. Verify game added to cart
5. Click "Wishlist" button
6. Verify game added to wishlist
7. Scroll to "Similar Games"
8. Verify carousel shows games with 2+ common tags

**Expected Results**:
- ✅ All information displayed
- ✅ Buy button adds to cart
- ✅ Wishlist button works
- ✅ Similar games shown

### Scenario 5: Cart and Checkout

**Steps**:
1. Add multiple games to cart
2. Navigate to cart page
3. Verify cart items displayed:
   - Game image
   - Game name
   - Platform
   - Price (with discount if applicable)
   - Quantity
   - Add to Wishlist button
   - Remove button
4. Update quantity
5. Remove an item
6. Click "Proceed to Checkout"
7. Verify checkout page:
   - Cart summary
   - Total amount
   - Discount total (if applicable)
   - Promo code input
   - User balance
   - Top-up button (if balance insufficient)
   - Pay button
8. If balance sufficient, click "Pay"
9. Verify order created
10. Check email for game key

**Expected Results**:
- ✅ Cart displays correctly
- ✅ Quantity updates work
- ✅ Checkout flow works
- ✅ Order created
- ✅ Game key email received
- ✅ Balance deducted

### Scenario 6: Balance Top-Up

**Steps**:
1. Navigate to Profile → Balance
2. Verify current balance displayed
3. Enter amount: 50 EUR
4. Select payment method
5. Enter promo code (optional)
6. Click "Proceed to pay"
7. Verify redirect to payment gateway
8. Complete payment (use test credentials)
9. Verify redirect back to balance page
10. Verify balance updated
11. Check email for top-up confirmation

**Expected Results**:
- ✅ Balance page loads
- ✅ Payment gateway redirect works
- ✅ Balance updated after payment
- ✅ Confirmation email received

### Scenario 7: Profile and Orders

**Steps**:
1. Navigate to Profile page
2. Verify statistics displayed:
   - Nickname (default: "Newbie Guy")
   - Games purchased count
   - Total savings from discounts
   - Days since registration
3. Navigate to Orders page
4. Verify order history:
   - Order number
   - Order date
   - Game name and price
   - Order status
5. Click on game icon
6. Verify game detail page opens

**Expected Results**:
- ✅ Profile stats displayed correctly
- ✅ Order history displayed
- ✅ Game links work

### Scenario 8: Wishlist

**Steps**:
1. Add games to wishlist
2. Navigate to Wishlist page
3. Verify wishlist items displayed
4. Click on game card
5. Verify game detail page opens
6. Remove item from wishlist
7. Verify item removed
8. If wishlist empty, verify "Go to Catalog" button
9. Scroll to bottom
10. Verify 8 random games displayed

**Expected Results**:
- ✅ Wishlist displays correctly
- ✅ Game links work
- ✅ Remove works
- ✅ Random games shown

### Scenario 9: Profile Editing

**Steps**:
1. Navigate to Profile → Edit
2. Verify field completion counter (if fields empty)
3. Update nickname
4. Update first name
5. Update last name
6. Change password:
   - Enter current password
   - Enter new password
   - Confirm new password
7. Click "Save"
8. Verify profile updated
9. Verify field counter updated

**Expected Results**:
- ✅ All fields editable
- ✅ Field counter works
- ✅ Password change works
- ✅ Email cannot be changed

### Scenario 10: Blog and Articles

**Steps**:
1. Navigate to Blog page
2. Verify article list displayed
3. Test category filter
4. Click on article card
5. Verify article page:
   - Tag displayed
   - Title displayed
   - Introduction displayed
   - Image displayed
   - Full content displayed
   - "Back to feed" button
6. Click "Back to feed"
7. Verify return to blog list

**Expected Results**:
- ✅ Blog list displays
- ✅ Filtering works
- ✅ Article page displays correctly
- ✅ Navigation works

### Scenario 11: FAQ Page

**Steps**:
1. Navigate to Support/FAQ page
2. Verify FAQ items organized by category
3. Test category filter
4. Click on question
5. Verify answer expands
6. Test search functionality

**Expected Results**:
- ✅ FAQ organized by category
- ✅ Expandable questions work
- ✅ Search works

### Scenario 12: Admin Features

**Steps** (Admin user required):
1. Login as admin
2. Navigate to admin panel
3. Test user search:
   - Search by name
   - Search by email
   - Verify results
4. Test transaction filtering:
   - Filter by payment method
   - Filter by date range
   - Search by transaction hash
   - Verify results
5. View user detail page:
   - Verify all top-ups listed
   - Verify all orders listed
6. Generate user summary PDF:
   - Click "Export PDF"
   - Verify PDF downloads
   - Verify PDF contains all data

**Expected Results**:
- ✅ User search works
- ✅ Transaction filtering works
- ✅ User detail page displays all data
- ✅ PDF generation works

### Scenario 13: G2A Integration (Backend)

**Steps** (Backend testing):
1. Verify G2A sync job runs 2x daily
2. Check G2A products synced to database
3. Verify prices have 2% markup
4. Test stock validation
5. Test automated key purchase:
   - Create test order
   - Verify G2A purchase triggered
   - Verify key received
   - Verify email sent

**Expected Results**:
- ✅ G2A sync works
- ✅ Prices marked up correctly
- ✅ Stock validation works
- ✅ Key purchase automated
- ✅ Email sent with key

### Scenario 14: Payment Gateway Integration

**Steps** (Backend testing):
1. Test balance top-up:
   - Create top-up intent
   - Verify payment URL generated
   - Complete payment
   - Verify webhook received
   - Verify balance updated
2. Test terminal transaction parsing:
   - Send test transaction data
   - Verify user created
   - Verify top-up created
   - Verify fake orders generated
   - Verify balance deducted

**Expected Results**:
- ✅ Top-up flow works
- ✅ Webhook processing works
- ✅ Terminal parsing works
- ✅ Fake orders generated correctly

## Performance Testing

### Load Testing
1. Test homepage with 100+ games
2. Test catalog with all filters active
3. Test checkout with 10+ items
4. Verify page load times < 3s
5. Verify API response times < 500ms

### Responsive Testing
1. Test on mobile (375px width)
2. Test on tablet (768px width)
3. Test on desktop (1920px width)
4. Verify all features work on all sizes

## Error Handling Testing

1. Test with invalid credentials
2. Test with insufficient balance
3. Test with out-of-stock games
4. Test with network errors
5. Verify error messages are user-friendly

## Security Testing

1. Test authentication required for protected routes
2. Test CSRF protection
3. Test XSS protection in user inputs
4. Test SQL injection protection
5. Verify sensitive data not exposed

## Conclusion

After completing all scenarios, the platform should be fully functional and ready for production deployment. All features from the technical specification should be implemented and tested.
