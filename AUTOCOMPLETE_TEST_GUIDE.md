# Autocomplete Testing Guide

## Quick Test Steps

1. **Start the development server** (if not already running):
   ```bash
   npm run dev
   ```

2. **Navigate to Catalog Page**:
   - Open your browser to `http://localhost:5173` (or your dev server port)
   - Navigate to the Catalog page (`/catalog`)

3. **Test Autocomplete**:
   - Click on the search input in the filter sidebar
   - Type at least 2 characters (e.g., "cyb" for Cyberpunk)
   - Wait 300ms (debounce delay)
   - You should see a dropdown with game suggestions

## Expected Behavior

### ✅ Working Features:
- **Debouncing**: Suggestions appear after 300ms of no typing
- **Minimum Characters**: No suggestions until 2+ characters are typed
- **Keyboard Navigation**:
  - `Arrow Down` - Navigate down through suggestions
  - `Arrow Up` - Navigate up through suggestions
  - `Enter` - Select highlighted suggestion or execute search
  - `Escape` - Close dropdown
- **Mouse Interaction**: Click on any suggestion to select it
- **Loading State**: Shows spinner while fetching suggestions
- **Empty State**: Shows "No games found" when no results
- **Error Handling**: Shows error message if API fails

### 🧪 Test Scenarios:

1. **Basic Search**:
   - Type "elden" → Should show "Elden Ring" and similar games
   - Type "witcher" → Should show "The Witcher 3" and similar games

2. **Keyboard Navigation**:
   - Type "cyb" → Press `Arrow Down` → Press `Enter`
   - Should navigate to the selected game's detail page

3. **Edge Cases**:
   - Type only 1 character → No suggestions should appear
   - Type "xyz123nonexistent" → Should show "No games found"
   - Clear input → Dropdown should close

4. **Performance**:
   - Type quickly multiple characters → Should debounce correctly
   - Check browser DevTools Network tab → Should see `/api/games/autocomplete?q=...` requests

## Troubleshooting

### Issue: No suggestions appearing
- **Check**: Browser console for errors
- **Check**: Network tab - is the API endpoint being called?
- **Check**: Is the backend server running on port 3001?
- **Fallback**: Component uses mock data if API fails

### Issue: Suggestions appear but clicking doesn't work
- **Check**: Browser console for navigation errors
- **Verify**: Game detail route exists (`/game/:slug`)

### Issue: API errors
- **Check**: Backend server is running
- **Check**: Database has games with matching titles
- **Check**: API endpoint `/api/games/autocomplete` is accessible

## Backend Testing

If you want to test the backend endpoint directly:

```bash
# Test autocomplete endpoint
curl "http://localhost:3001/api/games/autocomplete?q=elden&limit=10"
```

Expected response:
```json
{
  "success": true,
  "data": [
    {
      "id": "...",
      "title": "Elden Ring",
      "image": "...",
      "slug": "...",
      "relevanceScore": 0.9
    }
  ]
}
```

## Notes

- The component falls back to mock data if the API is unavailable
- Debounce delay is 300ms (configurable)
- Minimum characters required: 2 (configurable)
- Maximum suggestions: 10 (configurable via limit parameter)
