# Filter UI - Quick Visual Reference Guide

**Status:** 🔴 DESIGN APPROVAL PENDING  
**Date:** April 4, 2026

---

## One-Page Design Overview

```
DESKTOP LAYOUT
═══════════════════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────────────────┐
│ UpSkill Revision Hub                                          🔍 🌙 👤  │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  ┌──────────────────────────────┐  ┌─────────────────────────────────┐  │
│  │                              │  │                                 │  │
│  │    FILTER PANEL              │  │     CONTENT AREA                │  │
│  │    (300px fixed)             │  │     (Grid of Topics)            │  │
│  │                              │  │                                 │  │
│  │  🔍 Search Topics            │  │  Active Filters:                │  │
│  │  ┌────────────────────────┐  │  │  [Core CS ✕] [Inter. ✕]       │  │
│  │  │ Search by name...     ✕│  │  │                                 │  │
│  │  └────────────────────────┘  │  │  Results: 8 of 45 topics       │  │
│  │                              │  │                                 │  │
│  │  📂 Category                 │  │  ┌──────────┐ ┌──────────┐    │  │
│  │  ┌────────────────────────┐  │  │  │ Topic 1  │ │ Topic 2  │    │  │
│  │  │ All Categories       ▼ │  │  │  │ Categ.   │ │ Categ.   │    │  │
│  │  └────────────────────────┘  │  │  │ Diff.    │ │ Diff.    │    │  │
│  │                              │  │  └──────────┘ └──────────┘    │  │
│  │  📊 Difficulty Level         │  │                                 │  │
│  │  ┌────────────────────────┐  │  │  ┌──────────┐ ┌──────────┐    │  │
│  │  │ All Levels           ▼ │  │  │  │ Topic 3  │ │ Topic 4  │    │  │
│  │  └────────────────────────┘  │  │  │ Categ.   │ │ Categ.   │    │  │
│  │                              │  │  │ Diff.    │ │ Diff.    │    │  │
│  │  ⬆️ Sort By                  │  │  └──────────┘ └──────────┘    │  │
│  │  ┌────────────────────────┐  │  │                                 │  │
│  │  │ Alphabetical         ▼ │  │  │  ...                            │  │
│  │  └────────────────────────┘  │  │                                 │  │
│  │                              │  │                                 │  │
│  │  [Apply] [Reset]            │  │                                 │  │
│  │                              │  │                                 │  │
│  └──────────────────────────────┘  └─────────────────────────────────┘  │
│                                                                           │
└─────────────────────────────────────────────────────────────────────────┘


TABLET LAYOUT (≤1024px)
═══════════════════════════════════════════════════════════════════════════

┌──────────────────────────────────────────────┐
│ UpSkill Revision Hub              🔍 🌙 👤  │
├──────────────────────────────────────────────┤
│ [▼ Filters & Sort]  Results: 8 of 45        │
│                                              │
│ Active Filters: [Core CS ✕] [Inter. ✕]     │
│                                              │
│  ┌─────────────────┐  ┌─────────────────┐  │
│  │  Topic 1        │  │  Topic 2        │  │
│  │  Category       │  │  Category       │  │
│  │  Difficulty     │  │  Difficulty     │  │
│  └─────────────────┘  └─────────────────┘  │
│                                              │
│  ┌─────────────────┐  ┌─────────────────┐  │
│  │  Topic 3        │  │  Topic 4        │  │
│  │  Category       │  │  Category       │  │
│  │  Difficulty     │  │  Difficulty     │  │
│  └─────────────────┘  └─────────────────┘  │
│                                              │
│             [► EXPAND FILTERS]              │
│                                              │
└──────────────────────────────────────────────┘


MOBILE LAYOUT (<768px)
═══════════════════════════════════════════════════════════════════════════

┌──────────────────────────────┐
│ UpSkill Revision Hub  🔍 🌙  │
├──────────────────────────────┤
│ [🔽 FILTERS]  Results: 8     │
├──────────────────────────────┤
│                              │
│ Active Filters:              │
│ [Core CS ✕]                  │
│ [Inter. ✕]                   │
│                              │
│ ┌────────────────────────┐   │
│ │ Topic 1                │   │
│ │ Core CS / Beginner     │   │
│ │ [Read More →]          │   │
│ └────────────────────────┘   │
│                              │
│ ┌────────────────────────┐   │
│ │ Topic 2                │   │
│ │ Backend / Advanced     │   │
│ │ [Read More →]          │   │
│ └────────────────────────┘   │
│                              │
└──────────────────────────────┘
   ↕ Swipe up for Filters ↕

┌───────────────────────────────┐
│ ✕ FILTERS & SORT              │
├───────────────────────────────┤
│                               │
│ 🔍 Search Topics              │
│ ┌─────────────────────────┐   │
│ │ Search by name...      │   │
│ └─────────────────────────┘   │
│                               │
│ 📂 Category                   │
│ ☑ Core CS                    │
│ ☐ Backend                    │
│ ☐ Frontend                   │
│                               │
│ 📊 Difficulty                 │
│ ☑ Beginner                   │
│ ☐ Intermediate               │
│ ☐ Advanced                   │
│                               │
│ ⬆️ Sort By                    │
│ ◉ Alphabetical (A-Z)         │
│ ○ Date (Newest)              │
│                               │
│  [Apply]      [Reset All]    │
│                               │
└───────────────────────────────┘
```

---

## Filter Options Available

### Categories

- 💻 **Core CS** - DSA, OOP, SOLID, Fundamentals
- ⚙️ **Backend** - System Design, Databases, APIs
- 🎨 **Frontend** - React, JavaScript, CSS, HTML
- 🚀 **DevOps** - CI/CD, Docker, Kubernetes
- 🌐 **Full Stack** - Complete applications
- 🛠️ **Tools & Productivity** - Version Control, IDEs

### Difficulty Levels

- 📚 **Beginner** - Foundation concepts
- 📖 **Intermediate** - Practical skills
- 🚀 **Advanced** - Expert-level topics

### Sort Options

- 🔤 **Alphabetical (A-Z)** - Default
- 📅 **Date Added** - Newest first
- 📈 **Difficulty (Easy → Hard)**
- 📉 **Difficulty (Hard → Easy)**

---

## Color Palette

### Light Theme

```
┌─────────────────────────────────────────────────────────────┐
│ Background      ▮ #F7FAFC (Off-white gray)               │
│ Card/Panel      ▮ #FFFFFF (White)                         │
│ Text Primary    ▮ #1A202C (Dark gray/black)               │
│ Text Secondary  ▮ #4A5568 (Medium gray)                   │
│ Border          ▮ #E2E8F0 (Light gray)                    │
│ Primary Action  ▮ #4299E1 (Light blue)                    │
│ Primary Hover   ▮ #3182CE (Darker blue)                   │
│ Filter Badge    ▮ #EBF8FF (Very light blue)               │
│ Active Filter   ▮ #48BB78 (Green)                         │
└─────────────────────────────────────────────────────────────┘
```

### Dark Theme

```
┌─────────────────────────────────────────────────────────────┐
│ Background      ▮ #1A202C (Very dark gray)                 │
│ Card/Panel      ▮ #2D3748 (Dark gray)                      │
│ Text Primary    ▮ #F7FAFC (Off-white)                      │
│ Text Secondary  ▮ #CBD5E0 (Light gray)                     │
│ Border          ▮ #4A5568 (Medium dark gray)               │
│ Primary Action  ▮ #4299E1 (Light blue)                     │
│ Primary Hover   ▮ #5CC0EA (Lighter blue)                   │
│ Filter Badge    ▮ #2C5282 (Dark blue)                      │
│ Active Filter   ▮ #22863A (Dark green)                     │
└─────────────────────────────────────────────────────────────┘
```

---

## Typography Scale

| Element            | Size | Weight | Use Case                 |
| ------------------ | ---- | ------ | ------------------------ |
| **Filter Label**   | 12px | 600    | "Category", "Difficulty" |
| **Dropdown Value** | 14px | 400    | Selected value text      |
| **Button Text**    | 14px | 600    | Apply, Reset buttons     |
| **Filter Tag**     | 12px | 500    | Filter pills [Core CS ✕] |
| **Results Count**  | 14px | 500    | "Showing 8 of 45"        |

---

## Spacing Reference

```
XS: 4px     Used for: Gaps between icons and text
SM: 8px     Used for: Input padding, tight spacing
MD: 16px    Used for: Section gaps, button spacing
LG: 24px    Used for: Major section gaps, panel padding
XL: 32px    Used for: Top-level spacing
```

---

## Border Radius Reference

```
Inputs & Buttons:    6px
Filter Tags/Pills:   12px
Cards:               12px
```

---

## Interactive Elements

### Search Input

```
┌─────────────────────────────┐
│ 🔍 Search by topic name...  │
└─────────────────────────────┘
     With text entered:
┌─────────────────────────────┐
│ 🔍 Search term entered      ✕│
└─────────────────────────────┘
```

### Filter Dropdowns

```
Normal State:
┌──────────────────────────┐
│ All Categories         ▼ │
└──────────────────────────┘

Opened State:
┌──────────────────────────┐
│ All Categories         ▲ │
├──────────────────────────┤
│ ☑ Core CS               │
│ ☐ Backend               │
│ ☐ Frontend              │
│ ☐ DevOps                │
│ ☐ Full Stack            │
│ ☐ Tools                 │
└──────────────────────────┘
```

### Active Filter Pills

```
┌─────────┐  ┌──────────────┐  ┌────────┐
│Core CS✕ │  │Intermediate✕ │  │Newest✕ │
└─────────┘  └──────────────┘  └────────┘
     Gap: 8px between pills
```

### Action Buttons

```
Desktop:
[Apply Filters]    [Reset Filters]
   (25%+gap)          (25%)

Mobile:
┌──────────────────┐
│  Apply Filters   │
├──────────────────┤
│  Reset Filters   │
└──────────────────┘
```

---

## Responsive Breakpoints

```
┌────────────────────────────────────────┐
│ Mobile                                 │
│ < 768px                                │
│ Single column layout                   │
│ Full-screen filter modal               │
│ Stacked buttons                        │
└────────────────────────────────────────┘
              ⬇️ SWIPE ⬇️
┌────────────────────────────────────────┐
│ Tablet                                 │
│ 768px - 1024px                         │
│ 2-column grid                          │
│ Collapsible filter panel               │
│ Checkbox-style multi-select            │
└────────────────────────────────────────┘
              ⬇️ SWIPE ⬇️
┌────────────────────────────────────────┐
│ Desktop                                │
│ ≥ 1024px                              │
│ 3-column grid                          │
│ Persistent sidebar filter              │
│ Dropdown-style selections              │
└────────────────────────────────────────┘
```

---

## User Interaction Flow

```
START
  ↓
User Opens App
  ↓
┌─────────────────────────────┐
│ Decide Filter Action?       │
├─────────────────────────────┤
│ • Type Search      ────────→ Auto-filter results (300ms debounce)
│ • Select Category  ────────→ Show selected (checkbox ✓)
│ • Select Difficulty ──────→ Show selected (checkbox ✓)
│ • Select Sort      ────────→ Show selected (auto-close dropdown)
│ • Click Apply      ────────→ Update results display
│ • Click Reset      ────────→ Clear all filters, show all topics
│ • Click X on pill  ────────→ Remove single filter
│ • Click Clear All  ────────→ Reset everything
└─────────────────────────────┘
  ↓
Results Update
  ↓
Active Filters Display: [Filter1 ✕] [Filter2 ✕]
Result Count: "Showing 8 of 45 topics"
  ↓
Topics Rendered with Applied Filters
```

---

## Accessibility Highlights

✅ **Keyboard Navigation**

- Tab through all controls
- Arrow keys in dropdowns
- Enter/Space to select
- Escape to close

✅ **Screen Reading**

- All controls labeled
- ARIA attributes used
- Semantic HTML
- Status updates announced

✅ **Visual Indicators**

- 3px focus outline
- Clear hover effects
- Icons + text (not color only)
- 4.5:1 contrast ratio

✅ **Touch Friendly**

- 44px minimum touch targets
- Gesture support (swipe on mobile)
- Clear visual feedback

---

## Implementation Constraints

### Performance Targets

- Search debounce: **300ms**
- Filter update: **<100ms**
- Component render: **<16.67ms** (60fps)
- Bundle size increase: **<50KB** (gzipped)

### Browser Support

- Chrome (latest 2)
- Firefox (latest 2)
- Safari (latest 2)
- Edge (latest 2)

### Accessibility

- **WCAG 2.1 AA** compliance
- **100% keyboard navigable**
- **Full screen reader support**

---

## Files Ready for Review

📄 **FEATURE_PLAN.md** - Feature planning with phase breakdown  
📄 **FILTER_UI_DESIGN.md** - Complete design specification  
📄 **FILTER_COMPONENT_SPECS.md** - Detailed component specifications  
📄 **FILTER_VISUAL_REFERENCE.md** - This quick reference guide

---

## Design Approval Status

### Current Status: 🔴 PENDING APPROVAL

### Approval Checklist

- [ ] **Layout Design** - Desktop, Tablet, Mobile layouts approved
- [ ] **Color Scheme** - Light and dark theme colors approved
- [ ] **Typography** - Font sizes and weights approved
- [ ] **Components** - All component designs approved
- [ ] **Interactions** - User workflows and animations approved
- [ ] **Accessibility** - WCAG compliance approach approved
- [ ] **Responsive Design** - Breakpoint strategy approved
- [ ] **Performance** - Performance targets agreed upon

### Next Steps (After Approval)

1. ✅ Implement FilterPanel component
2. ✅ Create SearchBar component
3. ✅ Create FilterDropdown components
4. ✅ Create SortDropdown component
5. ✅ Create ActiveFilters component
6. ✅ Implement FilterContext state management
7. ✅ Add responsive styles
8. ✅ Write unit tests
9. ✅ Write integration tests
10. ✅ Performance optimization
11. ✅ Accessibility audit
12. ✅ Code review & merge
13. ✅ Staging deployment
14. ✅ Production release

---

## Questions for Stakeholders

1. **Color Scheme** - Do you approve the light and dark theme colors? 
2. **Layout** - Should filters be collapsible on desktop or always visible?
3. **Interactions** - Approve the suggested multi-select for Category/Difficulty?
4. **Mobile** - Preferred: bottom-sheet modal or full-screen overlay?
5. **Sorting** - Should sort update results immediately, or on "Apply" click?
6. **Spacing** - Is the proposed spacing comfortable and visually balanced?

---

**Status:** 🔴 **AWAITING DESIGN APPROVAL**  
**Important:** Do not begin implementation until all designs are approved  
**Last Updated:** April 4, 2026
