# Filter UI - Component Specifications & Component Tree

**Status:** 🔴 Design Pending Approval - No Implementation Yet  
**Last Updated:** April 4, 2026

---

## Component Hierarchy

```
App
└── HomePage
    └── FilterPanel (CONTAINER)
        ├── SearchBar
        │   ├── Input (text)
        │   └── ClearButton
        ├── FilterSection
        │   ├── CategoryFilter
        │   │   ├── Label
        │   │   ├── Dropdown
        │   │   │   ├── DropdownButton
        │   │   │   └── DropdownMenu
        │   │   │       └── CheckboxItems[]
        │   │   └── HelpText
        │   ├── DifficultyFilter
        │   │   ├── Label
        │   │   ├── Dropdown
        │   │   │   ├── DropdownButton
        │   │   │   └── DropdownMenu
        │   │   │       └── CheckboxItems[]
        │   │   └── HelpText
        │   └── SortFilter
        │       ├── Label
        │       ├── Dropdown
        │       │   ├── DropdownButton
        │       │   └── DropdownMenu
        │       │       └── RadioItems[]
        │       └── HelpText
        ├── ActiveFilters (RENAME FROM FilterTags)
        │   ├── FiltersDisplay
        │   │   └── FilterPill[]
        │   │       ├── Label
        │   │       └── CloseButton
        │   └── ClearAllButton
        └── ActionButtons
            ├── ApplyButton
            └── ResetButton
```

---

## Detailed Component Specifications

### 1. FilterPanel (Container)

**File:** `src/components/FilterPanel.jsx` (UPDATE)

**Props:**

```javascript
{
  isLoading?: boolean,      // Show loading state
  onFiltersChange?: (filters) => void,  // Callback when filters change
  isCollapsible?: boolean,  // Allow collapse on tablet+
}
```

**State (FilterContext):**

```javascript
{
  search: string,           // Search input value
  selectedCategories: string[],
  selectedDifficulties: string[],
  sortBy: string,          // 'alphabetical', 'date', 'difficulty-asc', 'difficulty-desc'
  isExpanded: boolean,     // For mobile/tablet collapse
}
```

**Responsibilities:**

- Render all filter inputs
- Manage filter state
- Handle apply/reset actions
- Display active filters
- Responsive layout switching

---

### 2. SearchBar

**File:** `src/components/SearchBar.jsx` (NEW)

**Props:**

```javascript
{
  value: string,
  onChange: (value: string) => void,
  placeholder?: string,
  debounceMs?: number,  // Default: 300
}
```

**Behavior:**

- Clear button appears when text entered
- Placeholder: "Search by topic name..."
- Icon: 🔍 on left side
- Debounce input changes
- Full width on all screens

**Accessibility:**

- Associated label: "Search Topics"
- aria-label: "Search topics by name or keyword"
- aria-describedby: "search-help-text"

---

### 3. FilterDropdown (Category & Difficulty)

**File:** `src/components/FilterDropdown.jsx` (NEW)

**Props:**

```javascript
{
  label: string,               // "Category", "Difficulty Level"
  options: Array<{
    value: string,            // 'core-cs', 'beginner'
    label: string,            // 'Core CS', 'Beginner'
    icon?: string,            // Optional emoji
  }>,
  selectedValues: string[],    // Multi-select
  onChange: (values: string[]) => void,
  disabled?: boolean,
  isLoading?: boolean,
}
```

**Behavior:**

- Click button to open dropdown
- Click option to toggle selection
- Checkmarks show selected items
- Click outside to close
- Max height: 300px with scroll
- Shows count of selected items in button

**Styles:**

```css
Button:
  - Padding: 12px 16px
  - Border: 1px solid border-color
  - Border-radius: 6px
  - Background: card-bg
  - Color: text
  - Font-size: 14px
  - Hover: border-primary
  - Focus: 3px outline, shadow

Menu:
  - Position: absolute
  - Top: 100%, left: 0
  - Background: card-bg
  - Border: 1px solid border-color
  - Box-shadow: 0 4px 12px rgba(0,0,0,0.15)
  - Z-index: 10

Items:
  - Padding: 12px 16px
  - Display: flex
  - Align-items: center
  - Gap: 8px
  - Hover: background-lighter
  - Selected: checkmark + bold text
```

---

### 4. SortDropdown

**File:** `src/components/SortDropdown.jsx` (NEW)

**Props:**

```javascript
{
  label: string,              // "Sort By"
  options: Array<{
    value: string,            // 'alphabetical', 'date-newest'
    label: string,            // 'Alphabetical (A-Z)'
  }>,
  selectedValue: string,      // Single select
  onChange: (value: string) => void,
  disabled?: boolean,
}
```

**Behavior:**

- Click button to open dropdown
- Click option to select (single only)
- Radio button style selection
- Auto-closes after selection
- Shows selected option in button

---

### 5. ActiveFilters / FilterTags

**File:** `src/components/ActiveFilters.jsx` (NEW, REPLACES FilterTags)

**Props:**

```javascript
{
  filters: Array<{
    id: string,     // 'core-cs', 'difficulty-beginner'
    label: string,  // 'Core CS', 'Beginner'
    type: string,   // 'category', 'difficulty', 'sort'
  }>,
  onRemoveFilter: (filterId: string) => void,
  onClearAll: () => void,
  isEmpty?: boolean,
}
```

**Behavior & Display:**

```
Active Filters: [Core CS ✕] [Intermediate ✕] [Newest First ✕]
Showing 8 of 45 topics
[Clear All Filters]
```

- Display as removable pills/badges
- Click X to remove individual filter
- Show result count
- "Clear All" link below pills
- Multi-line wrap on mobile
- Gap: 8px between pills

**Styles:**

```css
Container:
  - Padding: 16px 0
  - Border-top: 1px solid border-color
  - Margin: 16px 0

Pill:
  - Background: filter-badge-color
  - Color: filter-badge-text
  - Padding: 6px 12px
  - Border-radius: 12px
  - Font-size: 12px
  - Font-weight: 500
  - Display: inline-flex
  - Align-items: center
  - Gap: 4px

CloseButton:
  - Cursor: pointer
  - Opacity: 0.7
  - Hover: opacity 1.0
  - Font-size: 14px

ClearAllButton:
  - Margin-top: 8px
  - Text-decoration: underline
  - Cursor: pointer
  - Hover: opacity 0.8
```

---

### 6. ActionButtons

**File:** `src/components/FilterActions.jsx` (NEW)

**Props:**

```javascript
{
  onApply: () => void,
  onReset: () => void,
  isLoading?: boolean,
  hasChanges?: boolean,       // Disable apply if no changes
}
```

**Button Styles:**

**Apply Button:**

```css
- Background: primary-blue (#4299E1)
- Color: white
- Padding: 12px 24px
- Border: none
- Border-radius: 6px
- Font-weight: 600
- Font-size: 14px
- Cursor: pointer
- Hover: background darker (#3182CE)
- Active: scale(0.98)
- Disabled: background gray, cursor not-allowed
- Width: 100% on mobile, auto on desktop
```

**Reset Button:**

```css
- Background: border-color (#E2E8F0 light / #4A5568 dark)
- Color: text-color
- Padding: 12px 24px
- Border: none
- Border-radius: 6px
- Font-weight: 600
- Font-size: 14px
- Cursor: pointer
- Hover: background darker
- Active: scale(0.98)
- Width: 100% on mobile, auto on desktop
```

**Layout:**

- Desktop: Side by side, gap 16px
- Mobile: Stacked, gap 12px, full width

---

## Data Structures

### Filter Options Data

```javascript
const CATEGORY_OPTIONS = [
  { value: "core-cs", label: "Core CS", icon: "💻" },
  { value: "backend", label: "Backend", icon: "⚙️" },
  { value: "frontend", label: "Frontend", icon: "🎨" },
  { value: "devops", label: "DevOps", icon: "🚀" },
  { value: "full-stack", label: "Full Stack", icon: "🌐" },
  { value: "tools", label: "Tools & Productivity", icon: "🛠️" },
];

const DIFFICULTY_OPTIONS = [
  { value: "beginner", label: "Beginner", icon: "📚" },
  { value: "intermediate", label: "Intermediate", icon: "📖" },
  { value: "advanced", label: "Advanced", icon: "🚀" },
];

const SORT_OPTIONS = [
  { value: "alphabetical", label: "Alphabetical (A-Z)" },
  { value: "date-newest", label: "Date Added (Newest First)" },
  { value: "difficulty-asc", label: "Difficulty (Easy → Hard)" },
  { value: "difficulty-desc", label: "Difficulty (Hard → Easy)" },
];
```

### Filter State Shape

```javascript
const filterState = {
  // Current filter values
  filters: {
    search: "react",
    categories: ["frontend", "full-stack"],
    difficulties: ["beginner", "intermediate"],
    sortBy: "date-newest",
  },

  // UI state
  ui: {
    isSearchFocused: false,
    isCategoryOpen: false,
    isDifficultyOpen: false,
    isSortOpen: false,
    isFilterPanelExpanded: true, // Mobile/Tablet
  },

  // Active filters for display
  activeFilters: [
    { id: "search-react", label: "react", type: "search" },
    { id: "cat-frontend", label: "Frontend", type: "category" },
    { id: "cat-full-stack", label: "Full Stack", type: "category" },
    { id: "diff-beginner", label: "Beginner", type: "difficulty" },
    { id: "diff-intermediate", label: "Intermediate", type: "difficulty" },
    { id: "sort-date-newest", label: "Newest First", type: "sort" },
  ],
};
```

---

## Responsive Behavior Summary

| Feature              | Desktop (1024+) | Tablet (768-1024)   | Mobile (<768)             |
| -------------------- | --------------- | ------------------- | ------------------------- |
| **Panel Position**   | Left sidebar    | Collapsible sidebar | Bottom sheet modal        |
| **Panel Visibility** | Always visible  | Toggle with icon    | Tap "Filters" to open     |
| **Width**            | 300px fixed     | 100% when open      | Full screen               |
| **Dropdowns**        | Multi-select    | Multi-select        | Multi-select (checkboxes) |
| **Topics Grid**      | 3 columns       | 2 columns           | 1 column                  |
| **Apply Button**     | Auto width      | Auto width          | Full width                |
| **Reset Button**     | Auto width      | Auto width          | Full width                |
| **Active Filters**   | Above grid      | Above grid          | Below title               |
| **Collapse Support** | N/A             | Yes, default open   | N/A (modal only)          |

---

## Theme Colors Reference

### Light Theme Variables

```css
--color-bg: #f7fafc --color-card-bg: #ffffff --color-border: #e2e8f0
  --color-text-primary: #1a202c --color-text-secondary: #4a5568
  --color-primary: #4299e1 --color-primary-hover: #3182ce
  --color-primary-light: #bee3f8 --color-primary-lighter: #ebf8ff
  --color-success: #48bb78 --color-success-light: #c6f6d5 --color-gray: #cccccc
  --color-gray-lighter: #f5f5f5;
```

### Dark Theme Variables

```css
--color-bg: #1a202c --color-card-bg: #2d3748 --color-border: #4a5568
  --color-text-primary: #f7fafc --color-text-secondary: #cbd5e0
  --color-primary: #4299e1 --color-primary-hover: #5cc0ea
  --color-primary-light: #2c5282 --color-primary-lighter: #1a365d
  --color-success: #38a169 --color-success-light: #22543d --color-gray: #666666
  --color-gray-lighter: #333333;
```

---

## Responsive Breakpoints

```javascript
const breakpoints = {
  mobile: "480px", // Small phones
  mobileLarge: "768px", // Large phones & small tablets
  tablet: "1024px", // Tablets
  desktop: "1440px", // Desktop
};

const mediaQueries = {
  mobile: `@media (max-width: ${breakpoints.mobile})`,
  tablet: `@media (max-width: ${breakpoints.tablet})`,
  desktop: `@media (min-width: ${breakpoints.tablet})`,
};
```

---

## Accessibility Specifications

### ARIA Attributes

```html
<!-- Filter Panel Container -->
<div role="region" aria-label="Topic Filters">
  <!-- Search Input -->
  <input
    type="text"
    aria-label="Search topics"
    aria-describedby="search-help"
  />
  <p id="search-help">Enter topic keywords to filter results</p>

  <!-- Category Dropdown -->
  <button
    aria-expanded="false"
    aria-haspopup="listbox"
    aria-label="Category filter, All Categories selected"
  >
    Category ▼
  </button>
  <div role="listbox" aria-label="Select categories">
    <div role="option" aria-selected="true">Core CS</div>
    <div role="option" aria-selected="false">Backend</div>
  </div>

  <!-- Active Filters -->
  <div aria-live="polite" aria-label="Applied filters">
    [Core CS ✕] [Intermediate ✕]
  </div>

  <!-- Results Count -->
  <p aria-live="assertive">
    Showing <span id="result-count">8</span> of 45 topics
  </p>
</div>
```

### Keyboard Navigation

| Key               | Action                          |
| ----------------- | ------------------------------- |
| `Tab`             | Move to next filter element     |
| `Shift + Tab`     | Move to previous filter element |
| `Enter` / `Space` | Open dropdown / Select option   |
| `Escape`          | Close dropdown                  |
| `Arrow Up`        | Previous option in dropdown     |
| `Arrow Down`      | Next option in dropdown         |
| `Home`            | First option in dropdown        |
| `End`             | Last option in dropdown         |

### Focus Management

- Focus outline: 3px solid primary-blue
- Focus visible on all interactive elements
- Tab order: logical flow (search → category → difficulty → sort → buttons)
- Focus trap in expanded mobile filter modal (Escape closes)

---

## Testing Specifications

### Unit Test Coverage

```javascript
// SearchBar.jsx
- Renders with placeholder
- Updates state on input change
- Shows clear button when text entered
- Clears input on button click
- Debounces input correctly

// FilterDropdown.jsx
- Renders all options
- Opens/closes dropdown
- Toggles multi-select
- Shows selected state
- Closes on outside click
- Keyboard navigation works

// SortDropdown.jsx
- Renders all options
- Single select only
- Auto-closes after selection
- No multi-select

// ActiveFilters.jsx
- Displays all active filters
- Remove filter callback triggered
- Clear all callback triggered
- Hides when no active filters
- Shows result count

// FilterPanel.jsx (Integration)
- Integrates all sub-components
- Manages filter state
- Applies filters correctly
- Resets filters correctly
- Responsive on different breakpoints
```

### Integration Test Scenarios

```javascript
// Scenario 1: Basic filtering
1. User enters search text
2. User selects category
3. User selects difficulty
4. User clicks Apply
5. Results update correctly
6. Active filters display

// Scenario 2: Multi-filter with sort
1. Select multiple categories
2. Select multiple difficulties
3. Change sort option
4. Apply filters
5. Verify sort order in results

// Scenario 3: Clear filters
1. Apply multiple filters
2. Click "Clear All"
3. Verify all filters reset
4. Verify search clears
5. Verify results show all topics

// Scenario 4: Remove single filter
1. Apply multiple filters
2. Click X on one filter pill
3. Verify only that filter removed
4. Other filters still active
```

---

## Design Sign-Off

Currently: **AWAITING APPROVAL** 🔴

Approval required from:

- [ ] Product Owner / Project Lead
- [ ] UI/UX Designer
- [ ] Tech Lead / Architect
- [ ] QA Lead

All approvals must be obtained before implementation begins.

---

**Status:** 🔴 PENDING DESIGN REVIEW  
**Do Not Implement Until All Sections Approved**  
**Last Updated:** April 4, 2026
