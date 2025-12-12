# Quickstart Guide: Homepage Sections & Sliders

## Prerequisites

- Node.js 20+
- npm or yarn
- Backend server running (for API calls)
- G2A API credentials configured (optional - uses mock data if not available)

## Setup

1. **Ensure dependencies are installed**:
   ```bash
   npm install
   ```

2. **Verify Framer Motion is installed**:
   ```bash
   npm list framer-motion
   # Should show: framer-motion@12.23.25
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Verify backend is running** (if using API):
   ```bash
   cd backend && npm run dev
   ```

## Testing the Feature

### 1. Basic Functionality Test

**Goal**: Verify all sections load and display correctly.

**Steps**:
1. Navigate to `http://localhost:5173` (or your dev server URL)
2. Scroll through the homepage
3. Verify you see these sections (in order):
   - Hero Section (carousel)
   - Best Sellers (with tabs)
   - New in the Catalog
   - Preorders
   - New Games (with description box)
   - Action
   - Open World
   - Former Sony Exclusives
   - Noir (with description box)
   - Remakes / Remasters / Reboots
   - Role-Playing (RPG)
   - Hit me with something good - Random Picks

**Expected Result**: All 12 sections visible with games displayed

---

### 2. Animation Test

**Goal**: Verify Framer Motion animations work correctly.

**Steps**:
1. Open browser DevTools (F12)
2. Navigate to homepage
3. Scroll slowly through sections
4. Observe:
   - Sections fade in as they enter viewport
   - Game cards animate in with stagger effect
   - Hover effects on game cards
   - Button hover/tap animations

**Expected Result**: 
- Smooth fade-in animations (0.3s duration)
- Staggered card animations (0.05s delay between cards)
- Hover effects on interactive elements
- 60fps performance (check in DevTools Performance tab)

**Test Reduced Motion**:
1. Open browser DevTools
2. Go to Rendering tab
3. Check "Emulate CSS media feature prefers-reduced-motion"
4. Reload page
5. Verify animations are disabled or instant

**Expected Result**: No animations or instant transitions

---

### 3. Data Fetching Test

**Goal**: Verify data loads from API with fallback to mock data.

**Steps**:

**With API Available**:
1. Ensure backend is running
2. Check browser Network tab
3. Navigate to homepage
4. Verify API calls to `/api/games/*` endpoints
5. Verify games load from API

**Without API (Mock Data)**:
1. Stop backend server
2. Navigate to homepage
3. Check browser console for "using mock data" warnings
4. Verify games still display (from mock data)

**Expected Result**: 
- Games load from API when available
- Graceful fallback to mock data when API unavailable
- No blank sections or errors

---

### 4. Responsive Design Test

**Goal**: Verify sections adapt to different screen sizes.

**Steps**:

**Desktop (>1200px)**:
1. Set viewport to 1920x1080
2. Verify:
   - Best Sellers: 6 columns
   - Preorders: 5 columns
   - New Games: 4 columns

**Tablet (900-1200px)**:
1. Set viewport to 1024x768
2. Verify: All sections show 4 columns

**Mobile Tablet (600-900px)**:
1. Set viewport to 768x1024
2. Verify: All sections show 3 columns

**Mobile (<600px)**:
1. Set viewport to 375x667
2. Verify: 
   - All sections show 2 columns
   - Carousel navigation buttons hidden
   - Touch scrolling works

**Expected Result**: Sections adapt correctly to all breakpoints

---

### 5. Carousel Functionality Test

**Goal**: Verify carousel/slider works for sections with `carousel: true`.

**Steps**:
1. Navigate to "New in the Catalog" section (has carousel)
2. Verify:
   - Horizontal scrollable container
   - Prev/Next buttons visible (desktop)
   - Clicking buttons scrolls carousel
   - Touch/swipe works on mobile
   - Scroll snap works (cards snap into place)

**Expected Result**: 
- Smooth scrolling with buttons
- Touch/swipe support on mobile
- Scroll snap alignment

---

### 6. Tabs Functionality Test

**Goal**: Verify Best Sellers tabs filter games correctly.

**Steps**:
1. Navigate to "Best Sellers" section
2. Click different tabs: "All", "Adventure", "Action", "Sci-Fi", etc.
3. Verify:
   - Games filter based on selected tab
   - Tab button highlights when active
   - Smooth transition between filtered states
   - "All" tab shows all games

**Expected Result**: 
- Tabs filter games correctly
- Visual feedback on active tab
- Smooth transitions

---

### 7. Loading States Test

**Goal**: Verify loading skeletons display correctly.

**Steps**:
1. Open browser DevTools
2. Go to Network tab
3. Set throttling to "Slow 3G"
4. Reload homepage
5. Verify:
   - Skeleton loaders appear for each section
   - Sections populate as data loads
   - No layout shift when data loads

**Expected Result**: 
- Skeleton loaders visible during loading
- Smooth transition from skeleton to content
- No layout shift

---

### 8. Error Handling Test

**Goal**: Verify graceful error handling.

**Steps**:
1. Stop backend server
2. Open browser console
3. Navigate to homepage
4. Verify:
   - Error messages logged to console
   - Mock data used as fallback
   - No blank sections
   - User-friendly error messages (if any)

**Expected Result**: 
- Graceful fallback to mock data
- No crashes or blank screens
- Error messages in console (development only)

---

### 9. Performance Test

**Goal**: Verify page performance meets requirements.

**Steps**:
1. Open browser DevTools
2. Go to Performance tab
3. Start recording
4. Navigate to homepage
5. Scroll through all sections
6. Stop recording
7. Analyze:
   - Page load time: Should be < 3 seconds
   - Time to interactive: Should be < 4 seconds
   - FPS during scroll: Should be 60fps
   - No layout shifts

**Expected Result**: 
- Meets performance goals
- Smooth 60fps scrolling
- No performance warnings

---

### 10. Accessibility Test

**Goal**: Verify accessibility features work.

**Steps**:
1. Use keyboard navigation (Tab key)
2. Verify:
   - All interactive elements are focusable
   - Focus indicators visible
   - Can navigate through sections with keyboard
   - Screen reader announces sections correctly

2. Test with screen reader (VoiceOver/NVDA):
   - Sections have proper headings
   - Game cards have proper labels
   - Buttons have accessible names

**Expected Result**: 
- Full keyboard navigation
- Screen reader compatible
- Focus indicators visible

---

## Common Issues & Solutions

### Issue: Sections not loading

**Symptoms**: Blank sections or loading forever

**Solutions**:
1. Check backend is running: `cd backend && npm run dev`
2. Check API endpoints in Network tab
3. Verify G2A API credentials in `backend/.env`
4. Check browser console for errors

---

### Issue: Animations not working

**Symptoms**: No fade-in or stagger effects

**Solutions**:
1. Verify Framer Motion is installed: `npm list framer-motion`
2. Check browser console for errors
3. Verify `prefers-reduced-motion` is not enabled
4. Check component imports: `import { motion } from 'framer-motion'`

---

### Issue: Layout shifts during load

**Symptoms**: Content jumps when data loads

**Solutions**:
1. Ensure skeleton loaders match content dimensions
2. Set fixed heights for game cards
3. Use `aspect-ratio` CSS property
4. Preload images

---

### Issue: Carousel not scrolling

**Symptoms**: Carousel buttons don't work or scroll is jerky

**Solutions**:
1. Check `scrollRef` is properly attached
2. Verify `scrollBy` method is called correctly
3. Check CSS `scroll-snap-type` is set
4. Test on different browsers

---

### Issue: Responsive breakpoints not working

**Symptoms**: Wrong column counts on different screen sizes

**Solutions**:
1. Check CSS media queries in `GameSection.jsx`
2. Verify Tailwind breakpoints match
3. Test with browser DevTools device emulation
4. Clear browser cache

---

## Verification Checklist

After implementation, verify:

- [ ] All 12 sections display correctly
- [ ] Animations work smoothly (60fps)
- [ ] Data loads from API with mock fallback
- [ ] Responsive design works on all breakpoints
- [ ] Carousel functionality works
- [ ] Tabs filter games correctly
- [ ] Loading states display properly
- [ ] Error handling is graceful
- [ ] Performance meets requirements
- [ ] Accessibility features work
- [ ] No console errors
- [ ] No layout shifts
- [ ] Images load correctly
- [ ] "Check all" links work
- [ ] Reduced motion preference respected

---

## Next Steps

After verification:

1. **Code Review**: Review implementation against spec
2. **Testing**: Run full test suite
3. **Performance Audit**: Run Lighthouse audit
4. **Accessibility Audit**: Run aXe or WAVE
5. **Deploy**: Deploy to staging environment
6. **User Testing**: Get feedback from users

---

## Performance Benchmarks

Target metrics:

- **Page Load Time**: < 3 seconds
- **Time to Interactive**: < 4 seconds
- **First Contentful Paint**: < 1.5 seconds
- **Largest Contentful Paint**: < 2.5 seconds
- **Cumulative Layout Shift**: < 0.1
- **Animation FPS**: 60fps
- **Bundle Size Increase**: < 50KB gzipped

Measure with:
- Chrome DevTools Lighthouse
- WebPageTest
- Chrome DevTools Performance tab
