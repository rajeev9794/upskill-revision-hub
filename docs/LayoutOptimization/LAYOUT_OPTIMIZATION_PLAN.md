# Layout Optimization Design Plan

**Status:** Design Review Phase (NOT YET IMPLEMENTED)  
**Created:** April 4, 2026  
**Version:** 1.0  
**Audience:** Design Team, Product Managers, Developers

---

## 📋 Executive Summary

The current web layout has excessive vertical spacing in:

1. **Header section** - Title & subtitle take up too much space
2. **Top control bar** - Padding is unnecessarily large
3. **Active filters bar** - Takes space even when empty/no filters
4. **Footer** - Excessive padding and margins

This document presents **3 design options** with mockups showing how to optimize these areas while maintaining good UX.

**Status:** ⏳ AWAITING DESIGN APPROVAL - No implementation has been done

---

## 🔍 Current State Analysis

### Current Spacing Breakdown

```
Theme spacing values:
- xs: 0.5rem  (8px)
- sm: 1rem    (16px)
- md: 1.5rem  (24px)
- lg: 2rem    (32px)
- xl: 2.5rem  (40px)
- xxl: 3rem   (48px)

Current vertical space (desktop view):
┌─────────────────────────────────────────┐
│ Header (padding: xl top + xl bottom)     │  5rem = 80px
│ "UpSkill Revision Hub"                   │
│ + subtitle                               │
├─────────────────────────────────────────┤
│ TopControlBar (md padding)               │  3rem = 48px
│ "Filter | Results | Sort | View Mode"    │
├─────────────────────────────────────────┤
│ ActiveFiltersPills (md padding)          │  3rem = 48px (always present)
│ (empty when no filters applied)          │
├─────────────────────────────────────────┤
│                                          │
│ CONTENT AREA (width: 100%)               │  Remaining space
│ [Cards Grid / List / Compact]            │
│                                          │
└─────────────────────────────────────────┘

Total top space before content: 176px
Percentage of 1080p height (800px): 22% of screen!
```

### Space Usage Issues

| Component             | Current        | Space Waste      | Impact                    |
| --------------------- | -------------- | ---------------- | ------------------------- |
| Header padding        | xl (40px)      | 20px too much    | Takes 80px total          |
| Header title          | 2rem (32px)    | Could be 1.5rem  | Dense but readable        |
| Header subtitle       | 1rem (16px)    | Necessary        | Good readability          |
| TopControlBar padding | md (24px)      | 12px excess      | 48px total height         |
| TopControlBar wrap    | Single-line    | Not wrapping     | Takes minimal height      |
| FilterPills container | Always visible | Hidden if empty? | 48px even with no filters |
| FilterPills padding   | md (24px)      | 12px excess      | Could collapse            |

---

## 🎯 Design Goals

| Goal                              | Priority  | Impact                    |
| --------------------------------- | --------- | ------------------------- |
| Show more cards without scrolling | 🔴 High   | Better discoverability    |
| Reduce cluttered header           | 🔴 High   | Professional appearance   |
| Optimize vertical real estate     | 🔴 High   | Better content visibility |
| Maintain readability              | 🔴 High   | Don't sacrifice UX        |
| Keep accessibility intact         | 🔴 High   | All users can use app     |
| Work on mobile/tablet             | 🟡 Medium | Responsive design         |
| Fast visual feedback              | 🟡 Medium | No layout shifts          |

---

## 📐 Current Space Allocation (Desktop 1920x1080)

```
┌────────────────────────────────────────────────────────────────┐
│ Header Section                                         80px    │
│ ┌─ Title: "UpSkill Revision Hub"                             │
│ └─ Subtitle: "Master CS fundamentals..."                     │
├────────────────────────────────────────────────────────────────┤
│ Control Bar Section                                   48px     │
│ ┌─ [≡ Filter] [12 of 20] [Sort:Newest] [◧][▦][≡]           │
├────────────────────────────────────────────────────────────────┤
│ Active Filters Section                                48px     │
│ ┌─ [Category: DSA ×] [Difficulty: Intermediate ×] [Clear]   │
├────────────────────────────────────────────────────────────────┤
│                                                                  │
│ Content Area (Cards)                                  ~800px   │
│ ┌────────┬────────┬────────┬────────────────────────────────┐ │
│ │ Card 1 │ Card 2 │ Card 3 │ ... (only partially visible)   │ │
│ ├────────┼────────┼────────┼────────────────────────────────┤ │
│ │ Card 4 │ Card 5 │ Card 6 │ ... (need to scroll)           │ │
│ └────────┴────────┴────────┴────────────────────────────────┘ │
│ ... (scroll required to see more)                             │
└────────────────────────────────────────────────────────────────┘

Problem: Only 3-4 cards visible at first glance!
Top section: 176px (22% of screen)
Content area: 624px (78% of screen)
```

---

## 💡 Design Option 1: "Compact Header"

### Overview

Reduce header padding, shift header to single line with title only, move subtitle below filter controls.

### Layout Mockup

```
┌────────────────────────────────────────────────────────────────┐
│ UpSkill Revision Hub                                  40px     │
├────────────────────────────────────────────────────────────────┤
│ [≡ Filter] [12 of 20] [Sort:Newest] [◧][▦][≡]       36px     │
├────────────────────────────────────────────────────────────────┤
│ Master CS fundamentals with curated learning resources        │
│ [Category: DSA ×] [Difficulty: Int ×] [Clear]       32px     │
├────────────────────────────────────────────────────────────────┤
│                                                                  │
│ Content Area (Cards)                                  ~802px   │
│ ┌────────┬────────┬────────┬────────────────────────────────┐ │
│ │ Card 1 │ Card 2 │ Card 3 │ Card 4 completion visible!    │ │
│ ├────────┼────────┼────────┼────────────────────────────────┤ │
│ │ Card 5 │ Card 6 │ Card 7 │ ... (more visible)            │ │
│ ├────────┼────────┼────────┼────────────────────────────────┤ │
│ │ Card 8 │ Card 9 │ Card10 │ ... (much more visible)       │ │
│ └────────┴────────┴────────┴────────────────────────────────┘ │
│ ... (need scroll for rest)                                    │
└────────────────────────────────────────────────────────────────┘

Changes:
├─ Header padding: xl → sm (40px → 16px) = 32px reduction
├─ Title size: 2rem → 1.5rem (32px → 24px) = 8px reduction
├─ Remove: Subtitle from header (moved to filter area)
├─ Add: Subtitle as description in filter section
└─ Total savings: ~48px (27% reduction!)

New space allocation:
├─ Top sections: 108px (down from 176px)
└─ Content area: 872px (up from 624px) = 40% more cards visible!
```

### Specifications

**Header Changes:**

```css
Header {
  padding: sm sm; /* Was: xl lg */  // 16px instead of 40px
}

Title {
  font-size: 1.5rem; /* Was: 2rem */
  margin: 0; /* Was: 0 0 sm 0 */
}

Subtitle {
  display: none; /* Remove from header */
}
```

**Control Bar Changes:**

```css
ControlBar {
  display: flex;
  flex-wrap: wrap;
  gap: md;
  padding: sm md; /* Was: md lg */
  min-height: auto;
}
```

**New: Subtitle Bar**

```css
SubtitleBar {
  padding: xs md; /* Minimal padding */
  font-size: sm;
  color: textSecondary;
  display: flex;
  align-items: center;
  gap: md;

  &:empty {
    display: none; /* Hide if no filters */
  }
}
```

### Pros & Cons

| Aspect                       | Assessment                      |
| ---------------------------- | ------------------------------- |
| ✅ **Space saved**           | 48px = 27% reduction            |
| ✅ **Cards visible**         | 39% more cards without scroll   |
| ✅ **Simple to implement**   | Just remove/reduce padding      |
| ✅ **Responsive**            | Works on mobile too             |
| ⚠️ **Header feels cramped**  | Title looks small at 1.5rem     |
| ⚠️ **Subtitle farther away** | Less obvious context            |
| ⚠️ **Title not prominent**   | Could be confused with controls |

---

## 💡 Design Option 2: "Merged Header+Control Bar"

### Overview

Combine header and control bar into single horizontal row with title on left, controls on right.

### Layout Mockup

```
┌─────────────────────────────────────────────────────────────┐
│ UpSkill Hub    [≡ Filter] [12] [Sort][◧][▦][≡]   28px      │
├─────────────────────────────────────────────────────────────┤
│ Master CS fundamentals with curated learning resources      │
│ [Category: DSA ×] [Difficulty: Int ×] [Clear]    32px      │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│ Content Area (Cards)                                 ~840px   │
│ ┌────────┬────────┬────────┬────────────────────────────── │
│ │ Card 1 │ Card 2 │ Card 3 │ Card 4 (almost visible)      │
│ ├────────┼────────┼────────┼────────────────────────────── │
│ │ Card 5 │ Card 6 │ Card 7 │ Card 8                       │
│ ├────────┼────────┼────────┼────────────────────────────── │
│ │ Card 9 │ Card10 │ Card11 │ Card12                       │
│ └────────┴────────┴────────┴────────────────────────────── │
│ ... (more visible, less scroll)                            │
└─────────────────────────────────────────────────────────────┘

Changes:
├─ Merge header + control bar into single row
├─ Title: "UpSkill Revision Hub" → "UpSkill Hub" (shortened)
├─ Font: 2rem → 1.25rem (20px)
├─ Controls: Same, but on same line
├─ Subtitle: Move below as description
└─ Total savings: ~92px (52% reduction!)

New space allocation:
├─ Top sections: 60px (down from 176px)
└─ Content area: 920px (up from 624px) = 47% more cards visible!
```

### Specifications

**Merged Header Component:**

```css
MergedTopBar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: sm md;
  background: cardBg;
  border-bottom: 1px solid border;
  gap: lg;
  flex-wrap: wrap;
  min-height: 40px;

  /* When controls wrap to second line on smaller screens */
  @media (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
  }
}

BrandSection {
  display: flex;
  align-items: center;
  gap: sm;

  Title {
    font-size: 1.25rem;
    font-weight: 700;
    color: primary;
    margin: 0;
  }
}

ControlsSection {
  display: flex;
  align-items: center;
  gap: md;
  flex: 1;
  justify-content: flex-end;
}
```

**Subtitle Bar (Separate):**

```css
SubtitleBar {
  padding: xs md;
  font-size: sm;
  color: textSecondary;
  background: surface;
  border-bottom: 1px solid border;
}
```

### Pros & Cons

| Aspect                            | Assessment                        |
| --------------------------------- | --------------------------------- |
| ✅ **Maximum space saved**        | 92px = 52% reduction              |
| ✅ **Most cards visible**         | 47% more cards at once            |
| ✅ **Cleaner design**             | Unified top section               |
| ✅ **Modern trend**               | Matches popular web apps          |
| ⚠️ **Title feels abbreviated**    | "Hub" looks incomplete            |
| ⚠️ **Crowded at smaller screens** | Controls wrap awkwardly           |
| ⚠️ **More complex responsive**    | Different layouts for breakpoints |
| ⚠️ **Potentially harder to scan** | Title not visually separated      |

---

## 💡 Design Option 3: "Collapsible Header"

### Overview

Keep header prominent, but make it collapsible/minimizable on scroll or button click. Filter bar stays visible but optimized.

### Layout Mockup - Initial State

```
┌────────────────────────────────────────────────────────────┐
│ ^ UpSkill Revision Hub                              52px   │
│   Master CS fundamentals with curated learning...         │
├────────────────────────────────────────────────────────────┤
│ [≡ Filter] [12 of 20] [Sort:Newest] [◧][▦][≡]  36px    │
├────────────────────────────────────────────────────────────┤
│ [Category: DSA ×] [Difficulty: Int ×] [Clear]   32px    │
├────────────────────────────────────────────────────────────┤
│                                                              │
│ Content Area (Cards)                                 ~730px  │
│ ┌──────┬──────┬──────┬─────────────────────────────── │
│ │Card 1│Card 2│Card 3│ Card 4                        │
│ ├──────┼──────┼──────┼─────────────────────────────── │
│ │Card 5│Card 6│Card 7│ Card 8                        │
│ └──────┴──────┴──────┴─────────────────────────────── │
│ ... (scroll down to see collapse effect)                 │
└────────────────────────────────────────────────────────────┘
```

### Layout Mockup - Collapsed State (After Scroll)

```
┌────────────────────────────────────────────────────────────┐
│ ▼ UpSkill Hub                                      20px   │
├────────────────────────────────────────────────────────────┤
│ [≡ Filter] [12 of 20] [Sort:Newest] [◧][▦][≡]  36px    │
├────────────────────────────────────────────────────────────┤
│ [Category: DSA ×] [Difficulty: Int ×] [Clear]   32px    │
├────────────────────────────────────────────────────────────┤
│                                                              │
│ Content Area (Cards)                                 ~762px  │
│ ┌──────┬──────┬──────┬─────────────────────────────── │
│ │Card 5│Card 6│Card 7│ Card 8                        │
│ ├──────┼──────┼──────┼─────────────────────────────── │
│ │Card 9│Card10│Card11│ Card12                        │
│ └──────┴──────┴──────┴─────────────────────────────── │
│ ... (more visible, header minimized)                      │
└────────────────────────────────────────────────────────────┘

Changes:
├─ Header expands/collapses on scroll
├─ Click toggle icon (^/▼) to control manually
├─ Subtitle hidden when collapsed
├─ Title size: 2rem when expanded, 1.25rem when collapsed
├─ Initial expanded: 52px, Collapsed: 20px
└─ Additional savings while scrolling: 32px
```

### Specifications

**Collapsible Header:**

```css
CollapsibleHeader {
  transition: all 0.3s ease;
  position: sticky;
  top: 0;
  z-index: 100;

  &.expanded {
    padding: lg;
    padding-bottom: md;

    Title {
      font-size: 2rem;
    }
    Subtitle {
      display: block;
    }
  }

  &.collapsed {
    padding: sm;

    Title {
      font-size: 1.25rem;
    }
    Subtitle {
      display: none;
    }
  }
}

ToggleButton {
  appearance: none;
  background: none;
  border: none;
  cursor: pointer;
  color: primary;
  font-size: 1rem;
  padding: 0;
  width: 24px;
  height: 24px;
}
```

**Scroll Detection:**

```javascript
useEffect(() => {
  let timeout;

  const handleScroll = () => {
    clearTimeout(timeout);
    if (window.scrollY > 50) {
      setHeaderCollapsed(true);
    } else {
      setHeaderCollapsed(false);
    }

    timeout = setTimeout(() => {
      // Auto-collapse after 2 seconds of scrolling
      if (window.scrollY > 100) {
        setHeaderCollapsed(true);
      }
    }, 2000);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
```

### Pros & Cons

| Aspect                              | Assessment                         |
| ----------------------------------- | ---------------------------------- |
| ✅ **Best of both worlds**          | Prominent header + compact scroll  |
| ✅ **32px savings while scrolling** | Good space optimization            |
| ✅ **User control**                 | Can toggle with button             |
| ✅ **Familiar pattern**             | Similar to many modern apps        |
| ✅ **No UX loss**                   | Header still visible, just minimal |
| ⚠️ **Animation cost**               | Slight performance impact          |
| ⚠️ **More complex code**            | Scroll listener, state tracking    |
| ⚠️ **Mobile inconsistency**         | Different behavior on touch        |
| ⚠️ **Potential layout shift**       | Content jumps on collapse          |

---

## 📊 Comparison Matrix

| Feature                       | Option 1   | Option 2   | Option 3             |
| ----------------------------- | ---------- | ---------- | -------------------- |
| **Space saved**               | 48px (27%) | 92px (52%) | 32px (18%) on scroll |
| **Cards visible**             | +30%       | +47%       | +37% with scroll     |
| **Implementation complexity** | 🟢 Low     | 🟡 Medium  | 🟠 High              |
| **Header prominence**         | 🟡 Medium  | 🟠 Lower   | 🟢 High              |
| **Responsive breaks**         | 🟢 Simple  | 🟡 Complex | 🟡 Medium            |
| **Code changes**              | ~50 lines  | ~100 lines | ~200 lines           |
| **Performance impact**        | 🟢 None    | 🟢 None    | 🟡 Scroll listeners  |
| **User testing needed**       | 🟢 Minimal | 🟢 Minimal | 🟠 Significant       |
| **Mobile-friendly**           | 🟢 Good    | 🟡 Fair    | 🟢 Good              |

---

## 📱 Responsive Considerations

### Mobile View (375px width)

**Current State:**

```
┌────────┐
│ Header │  (full width, wraps)
├────────┤
│Control │  (stacked)
│  Bar   │
├────────┤
│Filters │  (wraps)
├────────┤
│ Card 1 │  (1 per row)
│ Card 2 │  (need scroll)
│ ...    │
└────────┘
```

**Option 1 Behavior:**

- Works well, slightly more compact
- Subtitle still readable
- ✅ Recommended for mobile

**Option 2 Behavior:**

- Title very small (1.25rem)
- Controls still wrap
- ⚠️ Title hard to read on small screens
- Need special handling

**Option 3 Behavior:**

- Header collapses on scroll
- Works perfectly for mobile
- ✅ Best for mobile experience

### Tablet View (768px width)

All options work well on tablet. Option 2 might look cramped if title + full controls on same line.

### Desktop View (1920px+)

All options work well. Option 2 gives most space:

```
[Title]     [Controls stretched to right]    [More content]
```

---

## ⚠️ Implementation Impacts

### CSS Changes Required

| Option | Files                        | Changes                      |
| ------ | ---------------------------- | ---------------------------- |
| 1      | HomePage, Header             | Padding reduction, font-size |
| 2      | HomePage, Header, ControlBar | Refactor layout, merge       |
| 3      | HomePage, Header, hooks      | Scroll listener, state mgmt  |

### JavaScript Changes Required

| Option | Complexity | Hooks           | Context |
| ------ | ---------- | --------------- | ------- |
| 1      | None       | No              | No      |
| 2      | Low        | No              | No      |
| 3      | High       | Yes (useScroll) | Maybe   |

### Testing Required

| Option | Unit Tests | Integration | E2E       |
| ------ | ---------- | ----------- | --------- |
| 1      | 🟢 Minimal | 🟢 Minimal  | 🟡 Basic  |
| 2      | 🟡 Medium  | 🟡 Medium   | 🟡 Medium |
| 3      | 🟠 High    | 🟠 High     | 🟠 High   |

---

## 🎨 Visual Hierarchy Impact

### Current (Option 0 - Baseline)

```
HEADER (Very Prominent)
├─ Title: 2rem, spacing: xl
├─ Subtitle: 1rem, spacing: sm
└─ Visual weight: 50%

CONTROLS (Moderate)
├─ Everything cramped together
└─ Visual weight: 30%

FILTERS (Moderate)
├─ Always visible even if empty
└─ Visual weight: 20%

CONTENT (Not enough emphasis!)
└─ Visual weight: 0% (just whatever's left)
```

### Option 1 Impact

```
HEADER (More Balanced)
├─ Title: 1.5rem, spacing: xs
├─ Subtitle: moved below filters
└─ Visual weight: 30%

CONTROLS (More Prominent)
├─ Same size, better proportion
└─ Visual weight: 35%

FILTERS (Incorporated)
├─ With subtitle in same area
└─ Visual weight: 20%

CONTENT (Better emphasis!)
└─ Visual weight: 15% (more space given)
```

### Option 2 Impact

```
HEADER (Minimal - Most Balanced)
├─ Title: 1.25rem, inline with controls
├─ Subtitle: separate line
└─ Visual weight: 15%

CONTROLS (Integrated)
├─ Same line as title
└─ Visual weight: 20%

FILTERS & SUBTITLE (Linked)
├─ Together in info bar
└─ Visual weight: 15%

CONTENT (MAXIMUM!)
└─ Visual weight: 50% of screen (nearly!)
```

### Option 3 Impact

```
INITIAL STATE (Best for First Impression)
├─ Header: 52px, very prominent
├─ Visual weight: 45%
└─ Great first impression

SCROLL STATE (Best for Content Discovery)
├─ Header: 20px, minimal
├─ Visual weight: 10%
└─ Maximum content space
```

---

## 🚀 Recommended Option: **Option 2 + Option 3 Hybrid**

### Rationale

**Best Approach:** Combine Option 2 (merged header) with Option 3 (collapsible) behavior

- ✅ Maximum space optimization (92px initial)
- ✅ Header still memorable (branded top bar)
- ✅ Collapses even further on scroll (another 20px)
- ✅ Modern, professional appearance
- ✅ Familiar user pattern (Gmail, Twitter, Slack)
- ✅ Best content visibility

### The Hybrid Mockup

**State 1: Initial Load**

```
┌────────────────────────────────────────────────────────┐
│ UpSkill Hub ^  [≡ Filter] [12] [Sort][◧][▦][≡] 28px  │
├────────────────────────────────────────────────────────┤
│ Master CS fundamentals with curated learning resources │
│ [Category: DSA ×] [Difficulty: Int ×] [Clear]  32px  │
├────────────────────────────────────────────────────────┤
│                                                          │
│ [Cards Start Here - More Visible] 840px              │
```

**State 2: After Scroll**

```
┌────────────────────────────────────────────────────────┐
│ UpSkill ▼ [≡ Filter] [12] [Sort][◧][▦][≡]   20px    │
├────────────────────────────────────────────────────────┤
│ [Category: DSA ×] [Difficulty: Int ×] [Clear]  32px  │
├────────────────────────────────────────────────────────┤
│                                                          │
│ [Cards Continue - Even More Visible] 868px           │
```

**Total benefit:**

- Initial: 60px header (76% reduction from current 176px)
- On scroll: 52px header (70% reduction)
- Content area: 840-868px (34-39% more cards visible)

---

## 🎯 Recommendation Summary

| Decision             | Recommendation                         |
| -------------------- | -------------------------------------- |
| **Primary Option**   | Option 2 (Merged Header)               |
| **Secondary Option** | Add Option 3 (Collapse on scroll)      |
| **Mobile Approach**  | Keep slightly more padding on mobile   |
| **Animation**        | Smooth 0.3s transition                 |
| **Fallback**         | Option 1 if Option 2 breaks responsive |

---

## 📋 Next Steps (AWAITING APPROVAL)

### If Approved for Option 1

1. Reduce header padding: `xl` → `sm`
2. Reduce title font: `2rem` → `1.5rem`
3. Move subtitle to filter bar
4. Test on mobile/tablet
5. Deploy and monitor

### If Approved for Option 2

1. Refactor header structure (merged layout)
2. Create new component: `MergedTopBar`
3. Update HomePage layout
4. Add responsive breakpoints (flex-direction change at 900px)
5. Keep Footer styling same
6. Test extensively on responsive sizes
7. Deploy with feature flag

### If Approved for Option 2 + 3

1. All steps from Option 2
2. Add scroll listener hook
3. Add collapse animation
4. Add toggle button for manual control
5. Handle mobile touch events
6. Full A/B testing recommended
7. Monitor scroll behavior on analytics

---

## 📊 User Impact Expectations

### Positive Impacts

- 30-47% more cards visible initially
- Better discoverability (cards in viewport)
- Professional appearance
- Improved mobile experience
- Reduced scroll fatigue

### Potential Concerns

- Header less prominent (Option 2)
- Animation performance on older devices (Option 3)
- More complex responsive behavior
- Requires thorough QA testing

---

## 🔍 Footer Space Issue (Bonus)

Current footer spacing:

```css
Footer {
  padding: xl lg; /* 40px top + 40px bottom */
  margin-top: xxl; /* 48px extra before footer */
}
```

**Recommendation:** Keep footer as-is for now (it's at bottom, less critical)

- OR reduce margin-top: `xxl` → `lg` (48px → 32px) = 16px savings
- Better to focus on above-the-fold optimization first

---

## ✅ Approval Checklist

Before proceeding with implementation:

- [ ] Design team reviews all 3 options
- [ ] Stakeholders approve preferred option(s)
- [ ] Product team confirms user impact is acceptable
- [ ] Mobile testing plan documented
- [ ] Rollback plan documented
- [ ] Success metrics defined
- [ ] QA testing scope agreed
- [ ] Timeline and resources approved

---

## 📞 Questions for Design Review

1. **Title prominenc**e: Is "UpSkill Hub" (shortened) acceptable for Option 2?
2. **Subtitle placement**: Move below filters better than header? (Option 1/2)
3. **Collapsible behavior**: Want auto-collapse on scroll? (Option 3)
4. **Animation budget**: Any restrictions on scroll listeners/animations?
5. **Mobile priority**: Should mobile get different approach than desktop?
6. **Footer**: Reduce footer margin too, or leave for now?
7. **Feature flag**: Want to A/B test before full rollout?
8. **Accessibility**: Any accessibility concerns with collapsed header?

---

## 📝 Document Version

| Version | Date        | Changes                  | Status               |
| ------- | ----------- | ------------------------ | -------------------- |
| 1.0     | Apr 4, 2026 | Initial design 3 options | 🔄 Awaiting Approval |

---

**STATUS: ⏳ DESIGN REVIEW PHASE**

**Next Step:** Stakeholder approval on preferred option(s)  
**Action:** Do NOT implement until approval received

---

**Questions?** Discuss with design team or product manager.
