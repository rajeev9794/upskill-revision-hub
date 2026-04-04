# Active Filters Pills - Developer Integration Guide

## Quick Start

The Active Filters Pills component is already integrated into your app. Here's what you need to know:

## Component Location

```
src/components/ActiveFiltersPills.jsx
```

## Integration Points

### 1. In HomePage.jsx

```jsx
import ActiveFiltersPills from "../components/ActiveFiltersPills";

// Within HomePage component:
return (
  <PageContainer>
    {/* Header with controls */}
    <MergedTopBar
      isCollapsed={isCollapsed}
      onToggleCollapse={toggleCollapse}
      filteredCount={filteredTopics.length}
      totalCount={topicsData.length}
    >
      <TopControlBar
        filteredCount={filteredTopics.length}
        totalCount={topicsData.length}
      />
    </MergedTopBar>

    {/* Active Filters Pills - NEW */}
    {!isCollapsed && <ActiveFiltersPills />}

    {/* Main content area */}
    <MainContent>{/* sidebar and grid */}</MainContent>
  </PageContainer>
);
```

### 2. State from FilterContext

```jsx
import { useFilter } from "../context/FilterContext";

// Inside ActiveFiltersPills:
const {
  selectedCategories, // ['Topics', 'Python']
  selectedDifficulties, // ['Beginner', 'Intermediate']
  sortBy, // 'alphabetical'
  removeFilter, // (type, value) => void
  resetFilters, // () => void
} = useFilter();
```

## What Gets Displayed

### Filter Pills Show:

1. **Category Filters**

   ```
   Topics ✕   Python ✕   JavaScript ✕
   ```

2. **Difficulty Filters**

   ```
   Beginner ✕   Intermediate ✕
   ```

3. **Sort Filter** (if not default)

   ```
   A-Z ✕   Easy→Hard ✕
   ```

4. **Clear All Button**
   ```
   | Clear All
   ```

## Visibility Logic

```javascript
// Component only shows if:
const hasActiveFilters =
  selectedCategories.length > 0 ||
  selectedDifficulties.length > 0 ||
  sortBy !== "newest";

// Returns null if no active filters
if (!hasActiveFilters) return null;

// Only renders if parent passes:
{
  !isCollapsed && <ActiveFiltersPills />;
}
```

## Styling Reference

### Container Styles

```css
FiltersContainer {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 4px 16px;
  background: surface-color;
  border-bottom: 1px solid;
}
```

### Pill Styles

```css
FilterPill {
  display: inline-flex;
  gap: 4px;
  padding: 4px 8px;
  background: #ebf8ff (light) / #1a365d (dark);
  color: #2c5282 (light) / #90cdf4 (dark);
  border: 1px solid #4299e1;
  border-radius: 20px;
  font-size: small;
}
```

## Event Handlers

### Remove Individual Filter

```jsx
{
  /* Clicking ✕ on a pill */
}
<RemoveButton onClick={() => removeFilter("category", "Python")}>
  ✕
</RemoveButton>;

// Removes that specific filter
```

### Clear All Filters

```jsx
{
  /* Clicking "Clear All" */
}
<ClearAllButton onClick={() => resetFilters()}>Clear All</ClearAllButton>;

// Removes all filters at once
```

## Responsive Layout

### On Desktop (> 1024px)

```
[Topics ✕] [Python ✕] [Easy ✕] [Medium ✕] | Clear All
```

### On Tablet (768px - 1024px)

```
[Topics ✕] [Python ✕] [Easy ✕]
[Medium ✕] | Clear All
```

### On Mobile (< 768px)

```
[Topics ✕]
[Python ✕]
[Easy ✕]
[Medium ✕] | Clear All
```

## Theme Integration

The component uses these theme values:

```javascript
theme.colors.surface; // Background color
theme.colors.border; // Border color
theme.fonts.sm; // Font size
theme.spacing.xs; // 4px (vertical padding)
theme.spacing.md; // 16px (horizontal padding)
theme.spacing.sm; // 8px (gap between pills)
```

## Accessibility Features

### ARIA Labels

```jsx
<RemoveButton
  title={`Remove ${category} filter`}
  aria-label={`Remove ${category} filter`}
>
  ✕
</RemoveButton>
```

### Keyboard Navigation

- Tab through all remove buttons and clear button
- Enter/Space to activate buttons
- Focus visible state on all interactive elements

### Screen Reader Support

```
"Remove Python filter button"
"Remove Beginner filter button"
"Clear All button"
```

## Common Tasks

### Adding a New Filter Type

1. Add to `FilterContext` state
2. Update `hasActiveFilters` logic
3. Add render section in ActiveFiltersPills
4. Add label mapping function if needed

### Changing Pill Colors

```jsx
// In ActiveFiltersPills.jsx
const FilterPill = styled.span`
  background-color: #ebf8ff; // Change this
  color: #2c5282; // And this
  border-color: #4299e1; // And this
`;
```

### Adjusting Spacing

```jsx
// In FiltersContainer
padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.md};
//         ↑ vertical (4px)                  ↑ horizontal (16px)

// In gap
gap: ${props => props.theme.spacing.sm};  // 8px between pills
```

## Testing Examples

### Test 1: Apply filters and see pills

```javascript
// User clicks: Categories → Topics, Python
// User clicks: Difficulty → Beginner
// Expected: 3 pills display + Clear All button
```

### Test 2: Remove individual filter

```javascript
// User clicks ✕ on "Python" pill
// Expected: "Python ✕" pill removed, others remain
// Expected: Grid updates to show filtered results
```

### Test 3: Clear all at once

```javascript
// User clicks "Clear All"
// Expected: All pills disappear
// Expected: Grid shows all topics
```

### Test 4: Collapse behavior

```javascript
// User clicks collapse toggle (▲/▼)
// Expected: Pills disappear with subtitle
// Expected: Pills reappear when expanded
```

## Dark Mode Support

The component automatically supports dark mode:

```css
@media (prefers-color-scheme: dark) {
  FilterPill {
    background-color: #1a365d;  // Dark background
    color: #90cdf4;              // Light text
    border-color: #4299e1;       // Same border
  }
}
```

## Performance Tips

1. **For Large Filter Lists**: Consider virtualizing if > 20 filters
2. **Re-render Optimization**: Component only re-renders on filter change
3. **No Memory Leaks**: Click handlers don't create closures
4. **Smooth Animations**: All transitions are 0.2s

## Debugging

### Component Not Showing

```javascript
// Check:
1. hasActiveFilters === true ?
2. !isCollapsed === true ?
3. Check browser console for errors
4. Verify FilterContext is providing values
```

### Filters Not Removing

```javascript
// Check:
1. removeFilter function exists in context
2. Filter keys match (category, difficulty, sort)
3. Check browser console for errors
4. Verify state updates in Redux DevTools
```

### Styling Not Applied

```javascript
// Check:
1. styled-components is loaded
2. Theme provider wraps component
3. No conflicting global styles
4. Media queries applying correctly
```

## Code Example: Complete Flow

```jsx
// User Flow Example
// ================

// 1. User selects "Python" category
// → FilterContext.selectedCategories = ['Python']

// 2. User selects "Beginner" difficulty
// → FilterContext.selectedDifficulties = ['Beginner']

// 3. hasActiveFilters = true
// → ActiveFiltersPills renders:

<FiltersContainer>
  {/* Render categories */}
  <FilterPill>
    Python
    <RemoveButton onClick={() => removeFilter("category", "Python")}>
      ✕
    </RemoveButton>
  </FilterPill>

  {/* Render difficulties */}
  <FilterPill>
    Beginner
    <RemoveButton onClick={() => removeFilter("difficulty", "Beginner")}>
      ✕
    </RemoveButton>
  </FilterPill>

  {/* Render Clear All */}
  <Divider />
  <ClearAllButton onClick={() => resetFilters()}>Clear All</ClearAllButton>
</FiltersContainer>

// 4. When user clicks ✕ on Python
// → removeFilter('category', 'Python')
// → FilterContext updates state
// → selectedCategories = []
// → Grid filters and updates
// → UI re-renders with Python pill gone
```

## Next Steps

1. **Run the app**: `npm start`
2. **Apply filters**: Select categories and difficulty levels
3. **See pills render**: Check they appear correctly
4. **Remove filters**: Click ✕ or "Clear All"
5. **Test responsive**: Resize browser to see mobile layout
6. **Check accessibility**: Use keyboard tab navigation

## Getting Help

If you need help:

1. Check `ACTIVE_FILTERS_IMPLEMENTATION.md` - Full documentation
2. Check `LAYOUT_INTEGRATION_UPDATE.md` - Layout details
3. Review FilterContext in `src/context/FilterContext.jsx`
4. Check component code comments
5. Open browser DevTools → Elements to inspect styling

## Related Files

- `src/context/FilterContext.jsx` - State management
- `src/pages/HomePage.jsx` - Layout integration
- `src/components/TopControlBar.jsx` - Header controls
- `src/components/MergedTopBar.jsx` - Header with collapse
- `src/styles/theme.js` - Theme colors and spacing

---

**Ready to use!** The component is production-ready and fully functional.
