# Card Detail View Implementation Plan

**Status:** Planning Phase  
**Created:** April 4, 2026  
**Last Updated:** April 4, 2026  
**Version:** 1.0

---

## 📋 Executive Summary

This document outlines the comprehensive plan for implementing a detailed view/modal for cards in the UpSkill Revision Hub. Currently, cards display only basic information (title, description, category, difficulty). Users need access to full card details including learning resources, external links, and rich content.

---

## 🎯 Objectives

| Objective                                | Description                                       | Priority  | Status     |
| ---------------------------------------- | ------------------------------------------------- | --------- | ---------- |
| Display card details in modal/side panel | Show complete card information when clicked       | 🔴 High   | ⏳ Pending |
| Restore resource links                   | Display external resource links (platforms, URLs) | 🔴 High   | ⏳ Pending |
| Add rich content support                 | Support formatted text, sections, code snippets   | 🟡 Medium | ⏳ Pending |
| Implement navigation                     | Allow users to browse next/prev cards             | 🟡 Medium | ⏳ Pending |
| Maintain responsive design               | Work on mobile, tablet, desktop                   | 🔴 High   | ⏳ Pending |
| Track user progress                      | Mark cards as read/completed                      | 🟢 Low    | 📋 Future  |

---

## 📊 Current Data Structure

Each card topic has:

```javascript
{
  id: string,                  // Unique identifier
  icon: emoji,                 // Visual icon
  title: string,               // Card title
  description: string,         // Short description
  category: string,            // Filter category
  difficulty: string,          // Difficulty level
  dateAdded: Date,             // Created date
  links: [                      // External resources
    { platform: string, url: string }
  ]
}
```

---

## 🎨 Design Approach

### Option 1: Full-Screen Modal

```
┌─────────────────────────────────────────────────────┐
│ X           Card Title              ← → Close       │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Icon  Difficulty  Category  Date Added            │
│                                                     │
│  ─────────────────────────────────────────────────  │
│                                                     │
│  Description (full text)                           │
│  Lorem ipsum dolor sit amet...                      │
│                                                     │
│  ─────────────────────────────────────────────────  │
│                                                     │
│  📚 Recommended Resources                           │
│  • LeetCode (https://...)                           │
│  • GeeksforGeeks (https://...)                      │
│  • NeetCode (https://...)                           │
│                                                     │
│  ─────────────────────────────────────────────────  │
│                                                     │
│  [✓ Mark Complete]  [Next Card →] [← Prev Card]   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Pros:**

- Full screen for rich content
- Immersive experience
- Good for mobile

**Cons:**

- Can't see grid behind modal
- Need to close to see other cards

### Option 2: Right Sidebar Panel

```
┌─────────────────┬──────────────────────────────────┐
│                 │ X                                │
│   Grid View     │ Card Title                       │
│                 │                                  │
│   ┌───┐ ┌───┐  │ Category | Difficulty            │
│   │   │ │   │  │                                  │
│   └───┘ └───┘  │ ─────────────────────────────── │
│                 │                                  │
│   ┌───┐ ┌───┐  │ Description                      │
│   │   │ │   │  │ Lorem ipsum...                   │
│   └───┘ └───┘  │                                  │
│                 │ 📚 Resources                    │
│                 │ • LeetCode                      │
│                 │ • GeeksforGeeks                 │
│                 │                                  │
│                 │ [← Prev] [Next →]               │
│                 │                                  │
└─────────────────┴──────────────────────────────────┘
```

**Pros:**

- See grid and details simultaneously
- Quick comparison
- Context awareness

**Cons:**

- Limited space on mobile
- Need larger screens

### **Recommended:** Option 1 (Modal) + Option 2 (Sidebar on Desktop)

- Default to modal on mobile/tablet
- Use sidebar on desktop (1200px+)
- Seamless responsive experience

---

## 📁 File Structure Changes

```
src/
├── components/
│   ├── CardDetailModal.jsx       ← NEW: Modal view
│   ├── CardDetailPanel.jsx       ← NEW: Sidebar view
│   ├── CardDetailContent.jsx     ← NEW: Shared content
│   ├── ResourcesList.jsx         ← NEW: Links display
│   └── ...existing components
│
├── context/
│   ├── FilterContext.jsx         ← ADD: selectedCard state
│   └── ...existing context
│
├── hooks/
│   └── useCardDetail.js          ← NEW: Logic hook
│
└── pages/
    └── HomePage.jsx              ← MODIFY: Add modal/sidebar
```

---

## 🔧 Implementation Steps

### Phase 1: Setup (Week 1)

- [ ] Create CardDetailModal component
- [ ] Create CardDetailContent component (shared UI)
- [ ] Add selectedCard state to FilterContext
- [ ] Create useCardDetail hook
- [ ] Update HomePage to render modal

### Phase 2: Desktop View (Week 2)

- [ ] Create CardDetailPanel (sidebar) component
- [ ] Implement responsive logic (modal vs sidebar)
- [ ] Add keyboard navigation (Escape to close)
- [ ] Implement prev/next card navigation
- [ ] Style animations (slide in/fade)

### Phase 3: Mobile Optimization (Week 3)

- [ ] Test modal on mobile devices
- [ ] Optimize touch interactions
- [ ] Adjust font sizes and spacing
- [ ] Test keyboard on mobile browsers
- [ ] Verify accessibility (screen readers)

### Phase 4: Content & Polish (Week 4)

- [ ] Add rich content support (markdown, sections)
- [ ] Implement code snippet display
- [ ] Add external link handling (new tab)
- [ ] Add analytics tracking
- [ ] Performance optimization

---

## 🎯 Component Specifications

### CardDetailModal Component

**Props:**

```javascript
{
  isOpen: boolean,              // Modal visibility
  card: object,                 // Current card data
  onClose: function,            // Close handler
  onNext: function,             // Next card handler
  onPrev: function,             // Prev card handler
  hasNext: boolean,             // Can go forward
  hasPrev: boolean,             // Can go backward
}
```

**Features:**

- Full-screen overlay modal
- Auto-scroll to top on card change
- Keyboard support (Escape, Arrow keys)
- Backdrop click to close
- Smooth transitions

### CardDetailContent Component

**Props:**

```javascript
{
  card: object,                 // Card data
  showNavigation: boolean,      // Show prev/next buttons
  onNext: function,
  onPrev: function,
  hasNext: boolean,
  hasPrev: boolean,
}
```

**Renders:**

- Card header (icon, title)
- Metadata (category, difficulty, date)
- Description
- Resources list
- Navigation buttons

### ResourcesList Component

**Props:**

```javascript
{
  links: array,                 // Resource objects
  maxItems: number,             // Limit display
}
```

**Renders:**

- Platform name as heading
- Clickable link (opens new tab)
- Icon for external link
- fallback if no links

---

## 🎨 UI/UX Details

### Modal Layout

```css
/* Overlay */
- Background: rgba(0, 0, 0, 0.7)
- Z-index: 1000
- Fade in animation

/* Modal Container */
- Max-width: 800px
- Padding: 40px
- Background: Theme cardBg
- Border-radius: 12px
- Box-shadow: 0 20px 60px rgba(0,0,0,0.3)

/* Header */
- Display: flex
- Justify: space-between
- Border-bottom: 1px solid border
- Padding-bottom: 20px

/* Close Button */
- Background: transparent
- Icon: ✕ or ×
- Hover: highlight
- Accessible: aria-label

/* Content */
- Padding: 20px 0
- Max-height: 70vh
- Overflow-y: auto
- Scrollbar-gutter: stable

/* Resources Section */
- Background: surface
- Padding: 16px
- Border-radius: 8px
- Margin: 16px 0

/* Navigation Buttons */
- Display: flex
- Gap: 12px
- Justify: flex-end
- Margin-top: 20px
- Border-top: 1px solid border
- Padding-top: 20px
```

### Responsive Breakpoints

| Screen               | Behavior      | Details                                 |
| -------------------- | ------------- | --------------------------------------- |
| Mobile (< 576px)     | Full Modal    | Max-width: 100%, Padding: 20px          |
| Tablet (576-768px)   | Full Modal    | Max-width: 90%, Padding: 30px           |
| Desktop (768-1200px) | Full Modal    | Max-width: 800px, Padding: 40px         |
| Large (>1200px)      | Sidebar Panel | Width: 400px, Right-align, Overlay grid |

---

## 🔄 State Management

### FilterContext Updates

```javascript
// Add to FilterContext
const [selectedCardId, setSelectedCardId] = useState(null);

// Derived state
const selectedCard = topicsData.find((t) => t.id === selectedCardId);

// Navigation helpers
const currentIndex = topicsData.findIndex((t) => t.id === selectedCardId);
const hasNext = currentIndex < topicsData.length - 1;
const hasPrev = currentIndex > 0;

const selectNextCard = () => {
  if (hasNext) setSelectedCardId(topicsData[currentIndex + 1].id);
};

const selectPrevCard = () => {
  if (hasPrev) setSelectedCardId(topicsData[currentIndex - 1].id);
};

const closeCardDetail = () => {
  setSelectedCardId(null);
};
```

---

## ⌨️ Keyboard Interactions

| Key          | Action               | Notes                  |
| ------------ | -------------------- | ---------------------- |
| Escape       | Close modal          | Always available       |
| ArrowRight → | Next card            | Only if has next       |
| ArrowLeft ←  | Previous card        | Only if has prev       |
| Tab          | Focus navigation     | Standard accessibility |
| Enter        | Click focused button | Standard accessibility |
| Space        | Click focused button | Standard accessibility |

---

## 📱 Mobile Considerations

1. **Touch Interactions:**
   - Swipe right → previous card
   - Swipe left → next card
   - Tap backdrop to close

2. **Keyboard:**
   - Virtual keyboard shouldn't obscure close button
   - Input fields (if added) should be near bottom

3. **Performance:**
   - Lazy load images (if added)
   - Optimize animations for mobile
   - Reduce repaints during scroll

4. **Accessibility:**
   - ARIA labels on all buttons
   - Semantic HTML structure
   - Color contrast ratio ≥ 4.5:1
   - Touch targets ≥ 48px × 48px

---

## 🧪 Testing Checklist

### Functional Testing

- [ ] Modal opens on card click
- [ ] Modal closes with X button
- [ ] Modal closes with Escape key
- [ ] Prev/Next buttons work
- [ ] Resource links open in new tab
- [ ] All card data displays correctly
- [ ] No console errors

### Responsive Testing

- [ ] Mobile (320px, 375px, 414px)
- [ ] Tablet (768px, 1024px)
- [ ] Desktop (1200px, 1440px, 1920px)
- [ ] Orientation change works
- [ ] Modal doesn't overflow

### Accessibility Testing

- [ ] Screen reader announces modal
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Color contrast sufficient
- [ ] ARIA labels present
- [ ] Semantic HTML used

### Performance Testing

- [ ] Modal renders < 500ms
- [ ] Smooth animations (60fps)
- [ ] No memory leaks
- [ ] Bundle size < 10KB (component code)

---

## 📊 Success Metrics

| Metric                | Target  | Current |
| --------------------- | ------- | ------- |
| Modal load time       | < 500ms | TBD     |
| Animation smoothness  | 60fps   | TBD     |
| Keyboard support      | 100%    | 0%      |
| Mobile responsiveness | 100%    | 0%      |
| Accessibility score   | ≥ 90    | TBD     |
| User satisfaction     | ≥ 4.5/5 | TBD     |

---

## 🚀 Deployment Plan

### Pre-Deployment

- [ ] All tests pass
- [ ] Code review completed
- [ ] No accessibility violations
- [ ] Performance optimized
- [ ] Documentation updated

### Deployment

- [ ] Merge to main branch
- [ ] Build succeeds
- [ ] No console errors in prod
- [ ] Mobile testing on real devices
- [ ] Monitor error logs

### Post-Deployment

- [ ] Monitor user engagement
- [ ] Collect feedback
- [ ] Fix issues reported
- [ ] Optimize based on analytics

---

## 📝 Related Documents

**In docs/ContentManagement/:**

- [CONTENT_ADDITION_GUIDE.md](./CONTENT_ADDITION_GUIDE.md) - How to add new cards
- [RESOURCE_LINK_FORMAT.md](./RESOURCE_LINK_FORMAT.md) - Link structure specs
- [DATA_SCHEMA.md](./DATA_SCHEMA.md) - Complete data format

**In docs/FilterImp/:**

- [developer-guide.md](../FilterImp/developer-guide.md) - Component structure
- [README.md](../FilterImp/README.md) - Project overview

---

## 🔗 References

**Design Inspiration:**

- Modal: Similar to YouTube video detail
- Sidebar: Similar to Twitter/X sidebar
- Keyboard nav: Similar to Gmail shortcuts

**Best Practices:**

- React patterns for modals
- Accessible modals (WAI-ARIA)
- Mobile-first responsive design
- Performance optimization

---

## ❓ FAQ

**Q: Why not use a regular link/page for details?**  
A: Modal/sidebar keeps users in context, preserves filter state, faster navigation between cards.

**Q: Will this work on mobile?**  
A: Yes! Uses full modal on small screens, adapts to sidebar on large screens.

**Q: What about browser back button?**  
A: Can be implemented later using URL params (card?id=dsa).

**Q: How do we handle many resources/links?**  
A: Show top 5 by default, "See all" expandable list.

**Q: Can we add more content (images, videos)?**  
A: Yes! Phase 4 will support rich content and markdown.

---

## 👥 Team Assignments

| Task                 | Owner       | Deadline      |
| -------------------- | ----------- | ------------- |
| Component structure  | Dev Team    | Week 1, Day 3 |
| Modal implementation | Dev Team    | Week 2, Day 1 |
| Sidebar panel        | Dev Team    | Week 2, Day 4 |
| Testing & QA         | QA Team     | Week 3, Day 2 |
| Documentation        | Tech Writer | Week 4, Day 1 |

---

## 📞 Questions & Support

**Document Owner:** Development Team  
**Last Reviewed:** April 4, 2026  
**Next Review:** April 15, 2026

For questions, open an issue in the repository or contact the development team.

---

**Status:** ✅ Plan Ready for Review  
**Next Step:** Stakeholder approval → Begin Phase 1 development
