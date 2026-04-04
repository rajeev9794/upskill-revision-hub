# Content Addition & Management Guide

**Status:** Active  
**Created:** April 4, 2026  
**Version:** 1.0  
**Audience:** Content Managers, Developers

---

## 📚 Table of Contents

1. [Quick Start](#quick-start)
2. [Card Data Structure](#card-data-structure)
3. [Adding New Cards](#adding-new-cards)
4. [Editing Existing Cards](#editing-existing-cards)
5. [Content Categories](#content-categories)
6. [Resource Links](#resource-links)
7. [Quality Checklist](#quality-checklist)
8. [Best Practices](#best-practices)
9. [Troubleshooting](#troubleshooting)

---

## 🚀 Quick Start

### Add a New Card in 5 Steps

1. **Open** `src/data/topicsData.js`
2. **Copy** the template below
3. **Fill in** your content
4. **Verify** it matches the schema
5. **Test** in the browser

```javascript
{
  id: 'unique-id',
  icon: '🎯',
  title: 'Card Title',
  description: 'Short description...',
  category: 'Core CS',
  difficulty: 'Intermediate',
  dateAdded: new Date(2026, 3, 4),  // April 4, 2026
  links: [
    { platform: 'Website', url: 'https://...' },
  ],
}
```

---

## 📋 Card Data Structure

### Complete Schema

```javascript
{
  // Required Fields
  id: string,                    // Unique identifier (lowercase, hyphenated)
  title: string,                 // Card title (40-60 characters)
  description: string,           // Short description (100-200 characters)
  icon: emoji,                   // Visual emoji icon
  category: string,              // One of allowed categories
  difficulty: string,            // 'Beginner' | 'Intermediate' | 'Advanced'
  dateAdded: Date,               // When card was added

  // Optional Fields
  links: [                        // External resources
    {
      platform: string,          // Resource name/platform
      url: string,               // HTTP(S) URL
    }
  ],
}
```

### Field Specifications

#### `id` (Required)

- **Format:** lowercase, hyphenated, no spaces
- **Length:** 3-30 characters
- **Examples:** `dsa`, `system-design`, `oops-principles`
- **Rules:**
  - Must be unique (no duplicates)
  - Should be descriptive
  - Cannot change after creation
  - Use underscores or hyphens for readability

❌ Bad:

```javascript
id: 'DSA',              // Uppercase
id: 'data structures',  // Space
id: 'd',                // Too short
```

✅ Good:

```javascript
id: 'dsa',
id: 'data-structures-algorithms',
id: 'advanced-dsa'
```

---

#### `title` (Required)

- **Format:** Plain text
- **Length:** 20-60 characters
- **Rules:**
  - Clear and descriptive
  - Capitalize properly (Title Case)
  - No trailing punctuation
  - Unique within the system

❌ Bad:

```javascript
title: 'DSA',                        // Too vague
title: 'Learn data structures and algorithms and practice coding interview questions',  // Too long
title: 'data structures & algorithms',  // Lowercase
```

✅ Good:

```javascript
title: 'Data Structures & Algorithms',
title: 'System Design Fundamentals',
title: 'Object-Oriented Programming',
```

---

#### `description` (Required)

- **Format:** Plain text (no markdown)
- **Length:** 80-200 characters
- **Rules:**
  - Clear summary of what users will learn
  - Include key concepts
  - Start with action verb (optional)
  - No trailing period

❌ Bad:

```javascript
// Too short
description: 'Learn DSA',

// Too long
description: 'In this comprehensive course, you will learn about data structures and algorithms, including arrays, linked lists, trees, graphs, sorting algorithms, searching algorithms, dynamic programming, and more practical patterns used in real-world applications.',

// Too vague
description: 'This is important.',
```

✅ Good:

```javascript
description: 'Master fundamental data structures, algorithms, and problem-solving techniques essential for coding interviews and competitive programming.',

description: 'Learn to design scalable, reliable, and maintainable large-scale systems. Understand distributed systems, databases, and architecture patterns.',
```

---

#### `icon` (Required)

- **Format:** Single emoji character
- **Rules:**
  - One emoji only
  - Relevant to topic
  - Consistent style (not too decorative)
  - Accessible (not just visual)

**Recommended Icons by Category:**

| Category | Icon     | Alternatives |
| -------- | -------- | ------------ |
| Core CS  | 🔢 💻 🎯 | 🧠 📚        |
| Backend  | 🏗️ ⚙️ 🔧 | 🛠️ 🚀        |
| Frontend | 🎨 🖼️ ✨ | 💄 🌈        |
| DevOps   | 🚀 📦 ☁️ | 🐳 🔨        |
| Tools    | 🛠️ ⚙️ 🔧 | 📱 💾        |
| Patterns | 📐 🎭 ✨ | 🏛️ 🧩        |

---

#### `category` (Required)

- **Format:** One of allowed categories
- **Rules:**
  - Must exactly match allowed list
  - Case-sensitive
  - Cannot create new categories without approval

**Allowed Categories:**

```javascript
[
  "Core CS",
  "Backend",
  "Frontend",
  "DevOps",
  "Full Stack",
  "Tools",
  "Design Patterns",
  "Security",
  "Testing",
  "Performance",
];
```

To add a new category:

1. Update allowed list in `CONTENT_ADDITION_GUIDE.md`
2. Update `CATEGORIES` in `src/components/FilterPanel.jsx`
3. Update `FilterImp/README.md` documentation
4. Get approval from team lead

---

#### `difficulty` (Required)

- **Format:** One of three levels
- **Rules:**
  - Exactly match one of: `'Beginner'`, `'Intermediate'`, `'Advanced'`
  - Based on content complexity, not time
  - Consider prerequisite knowledge

**Guidelines:**

| Level        | Criteria                   | Examples                         |
| ------------ | -------------------------- | -------------------------------- |
| Beginner     | No prior knowledge assumed | OOP basics, HTML/CSS, Arrays     |
| Intermediate | Some knowledge required    | System Design prep, Advanced DSA |
| Advanced     | Deep expertise needed      | Distributed Systems, Kernel Dev  |

---

#### `dateAdded` (Required)

- **Format:** JavaScript Date object
- **Rules:**
  - Use `new Date(YYYY, MM-1, DD)` format
  - MM is 0-indexed (0=January, 11=December)
  - Should be current or past date

❌ Bad:

```javascript
dateAdded: '2026-04-04',           // String not Date
dateAdded: new Date('2026-04-04'),  // Error prone
dateAdded: new Date(2026, 4, 4),   // May instead of April!
```

✅ Good:

```javascript
dateAdded: new Date(2026, 3, 4),   // April 4, 2026
dateAdded: new Date(2026, 0, 15),  // January 15, 2026
```

---

#### `links` (Optional but Recommended)

- **Format:** Array of objects with `platform` and `url`
- **Rules:**
  - At least 3-4 links recommended
  - Valid HTTPS URLs required
  - Platform name should be clear
  - Curate high-quality resources

**Link Quality Criteria:**

- Authoritative source ✅
- Actively maintained ✅
- Clear learning path ✅
- Free or clearly paid ✅
- English language (or translated) ✅
- Not spam or low-quality content ❌
- Dead links ❌
- Affiliate links (unless disclosed) ❌

**Platform Examples:**

```javascript
links: [
  { platform: "LeetCode", url: "https://leetcode.com" },
  { platform: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/" },
  { platform: "Educative", url: "https://www.educative.io/" },
  { platform: "Refactoring.Guru", url: "https://refactoring.guru/" },
  { platform: "Dev.to", url: "https://dev.to/" },
  { platform: "YouTube - (Author)", url: "https://youtube.com/..." },
  { platform: "Official Docs", url: "https://docs.example.com/" },
  { platform: "GitHub - (Repo)", url: "https://github.com/.../" },
  { platform: "Medium", url: "https://medium.com/@author/" },
  { platform: "Course - (Platform)", url: "https://..." },
];
```

---

## ➕ Adding New Cards

### Step-by-Step Guide

#### 1. Plan Your Card

Before coding, document:

```markdown
- Topic: [Name of topic]
- Category: [One of allowed]
- Difficulty: [Beginner/Intermediate/Advanced]
- Key Learnings: [3-5 key concepts]
- Resources: [Links to 4+ quality sources]
```

#### 2. Generate ID

Use lowercase hyphenated format:

```
Topic: "Data Structures & Algorithms"
ID: "data-structures-algorithms"

Topic: "System Design Fundamentals"
ID: "system-design-fundamentals"

Topic: "SOLID Principles"
ID: "solid-principles"
```

#### 3. Create Content

Open `src/data/topicsData.js` and add before the final array closing:

```javascript
const topicsData = [
  // ... existing cards

  {
    id: "your-new-id",
    icon: "🎯",
    title: "Your Topic Title",
    description: "Your description here...",
    category: "Core CS",
    difficulty: "Intermediate",
    dateAdded: new Date(2026, 3, 4),
    links: [
      { platform: "Resource 1", url: "https://..." },
      { platform: "Resource 2", url: "https://..." },
      { platform: "Resource 3", url: "https://..." },
      { platform: "Resource 4", url: "https://..." },
    ],
  },

  // Don't forget the comma at the end of the previous card!
];
```

#### 4. Test

```bash
# Check syntax
npm run build 2>&1 | head -20

# Open browser and verify:
# http://localhost:3001/upskill-revision-hub

# Test:
- [ ] Card appears in grid
- [ ] Filters work correctly
- [ ] Icon displays
- [ ] Description shows
- [ ] Category filter includes it
- [ ] Difficulty filter shows it
- [ ] No console errors
```

#### 5. Commit

```bash
git add src/data/topicsData.js
git commit -m "Add new topic: Your Topic Title"
git push origin main
```

---

## ✏️ Editing Existing Cards

### Modify a Card

```javascript
// Find the card by ID
const cardIndex = topicsData.findIndex((t) => t.id === "dsa");

// Update the card
topicsData[cardIndex] = {
  ...topicsData[cardIndex],
  title: "New Title", // Change title
  description: "New description...", // Change description
  // Keep ID, dateAdded same!
};
```

### Rename a Card (Careful!)

Renaming the ID creates a new card:

```javascript
// Old card: { id: 'old-id', ... }
// New card: { id: 'new-id', ... }
// Result: Duplicates!
```

**Instead, if you must rename:**

1. Create new card with new ID
2. Remove old card
3. Update all references
4. Announce change to users

### Delete a Card

Find the card and remove it:

```javascript
const topicsData = [
  { id: 'dsa', ... },
  // Remove line below:
  // { id: 'deprecated-topic', ... },  ❌ DELETED
  { id: 'oops', ... },
];
```

**Before deleting:**

- Notify users in changelog
- Keep in git history (visible via `git log`)
- Consider archiving instead

---

## 🏷️ Content Categories

### Current Categories

| Category        | Purpose                       | Icon | Count |
| --------------- | ----------------------------- | ---- | ----- |
| Core CS         | Computer Science fundamentals | 🔢   | 3     |
| Backend         | Server-side development       | 🏗️   | 2     |
| Frontend        | Client-side development       | 🎨   | 0     |
| DevOps          | Infrastructure & deployment   | 🚀   | 0     |
| Full Stack      | End-to-end development        | 💼   | 0     |
| Tools           | Development tools & IDEs      | 🛠️   | 0     |
| Design Patterns | Software design patterns      | ✨   | 1     |
| Security        | Security & encryption         | 🔒   | 0     |
| Testing         | Testing & QA                  | 🧪   | 0     |
| Performance     | Optimization & scaling        | ⚡   | 0     |

### Adding New Categories

1. Get approval from tech lead
2. Add to this document in `CONTENT_ADDITION_GUIDE.md`
3. Update `CATEGORIES` constant in `src/components/FilterPanel.jsx`
4. Update filter documentation
5. Commit all changes together

---

## 🔗 Resource Links

### Link Quality Standards

**DO:**

- ✅ Link to official documentation
- ✅ Include YouTube channels with proof of expertise
- ✅ Add geeksforgeeks.org, educative.io, leetcode.com links
- ✅ Include GitHub repositories
- ✅ Use medium.com/@expert-username articles
- ✅ Link to active, maintained courses

**DON'T:**

- ❌ Dead or redirect links
- ❌ Sites with excessive ads/spam
- ❌ Unverified/"get rich quick" content
- ❌ Links to paywalled content without indication
- ❌ Outdated or deprecated technology
- ❌ AI-generated content without clear disclaimer

### Verifying Links

Before adding, verify:

```bash
# Check link is reachable
curl -I https://link.example.com 2>&1 | grep "HTTP"
# Should show: HTTP/1.1 200 OK

# Test in browser
# - Page loads correctly
# - Content is relevant
# - No security warnings
# - Works on mobile
```

### Link Organization

Group similar platforms together:

```javascript
// Good grouping
links: [
  // Practice platforms
  { platform: "LeetCode", url: "https://leetcode.com" },
  { platform: "HackerRank", url: "https://hackerrank.com" },

  // Learning resources
  { platform: "Geeks for Geeks", url: "https://www.geeksforgeeks.org/" },
  { platform: "Educative", url: "https://educative.io" },
];
```

---

## ✅ Quality Checklist

Before committing a new card, verify ALL items:

### Content Quality

- [ ] Title is clear and specific
- [ ] Description explains what user will learn
- [ ] Icon matches the topic
- [ ] No spelling or grammar errors
- [ ] Description is 80-200 characters
- [ ] Title is 20-60 characters

### Data Validation

- [ ] ID is unique (not duplicate)
- [ ] ID is lowercase and hyphenated
- [ ] Category is from allowed list
- [ ] Difficulty is correct level
- [ ] dateAdded is a valid Date object
- [ ] No trailing commas cause syntax errors

### Resource Links

- [ ] At least 3 links provided
- [ ] All links return 200 OK (not 404)
- [ ] Links are relevant to topic
- [ ] Platform names are clear
- [ ] No dead/broken links
- [ ] Links work on mobile browsers

### Testing

- [ ] npm run build succeeds (no errors)
- [ ] No console.errors in browser
- [ ] Card appears in grid
- [ ] Filter shows correct category
- [ ] Difficulty filter works
- [ ] Search finds the card
- [ ] All links open correctly

### Documentation

- [ ] Card added to topicsData.js
- [ ] Changelog updated if applicable
- [ ] Team notified if public
- [ ] Commit message is descriptive

---

## 📖 Best Practices

### 1. Write Engaging Descriptions

**Pattern 1: Action-Oriented**

```
"Master fundamental data structures and algorithms for coding interviews and competitive programming."
```

**Pattern 2: Problem-Solving**

```
"Learn to design scalable systems and understand architecture patterns for building production applications."
```

**Pattern 3: Skill-Based**

```
"Develop expertise in object-oriented design principles and create maintainable, flexible code."
```

**Template:**

```
"[Verb] [main topic] [in/for/and] [context]. Understand [key concepts]."

Examples:
- "Explore SOLID principles and write maintainable, flexible code."
- "Master system design fundamentals for building scalable applications."
- "Learn advanced DSA patterns used in real-world tech interviews."
```

### 2. Choose Relevant Icons

- 🎯 For focused topics
- 🔢 For mathematical/algorithmic content
- 🏗️ For architectural/design content
- ⚙️ For implementation/backend
- 🎨 For design/frontend
- ✨ For elegant/advanced patterns
- 🔧 For tools and utilities
- 📚 For foundational knowledge

### 3. Curate Quality Resources

**Per Topic, Include:**

- 1 tutorial/guide (GeeksforGeeks, official docs)
- 1 practice platform (LeetCode, HackerRank)
- 1 course/deep dive (Educative, Udemy, YouTube)
- 1 supplementary (Medium, blog, GitHub)

**Example for System Design:**

```javascript
links: [
  {
    platform: "System Design Primer (GitHub)",
    url: "https://github.com/donnemartin/system-design-primer",
  },
  {
    platform: "Educative - Grokking System Design",
    url: "https://www.educative.io/courses/grokking-the-system-design-interview",
  },
  {
    platform: "Alex Xu - System Design Interview (YouTube)",
    url: "https://www.youtube.com/c/SystemDesignInterview",
  },
  {
    platform: "InterviewBit - System Design",
    url: "https://www.interviewbit.com/courses/system-design/",
  },
];
```

### 4. Maintain Consistency

```javascript
// Consistent formatting
{ id: 'topic-name', icon: '🎯', title: 'Topic Name', ... }
{ id: 'another-topic', icon: '🏗️', title: 'Another Topic', ... }

// NOT
{ id: 'topicName', icon: 'question', title: 'topic name', ... }
```

### 5. Version Your Content

When making major updates, document in commit:

```
git commit -m "Update DSA topic: Added LinkedList content

- Updated description to focus on interview prep
- Added 2 new learning resources
- Changed difficulty from Intermediate to Advanced
"
```

---

## 🔧 Troubleshooting

### Issue: "Duplicate ID" Error

**Problem:** Two cards have the same ID

**Solution:**

```javascript
// Find duplicates
import topicsData from './topicsData';
const ids = topicsData.map(t => t.id);
const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i);
console.log('Duplicates:', duplicates);

// Fix: Use unique IDs
{ id: 'dsa', ... }
{ id: 'dsa-advanced', ... }  // Rename second one
```

---

### Issue: Category Not Appearing in Filter

**Problem:** New category doesn't show in filter dropdown

**Solution:**

1. Check `CATEGORIES` array in `src/components/FilterPanel.jsx`
2. Verify exact spelling matches
3. Rebuild: `npm run build`
4. Check browser console for errors

---

### Issue: Link Returns 404

**Problem:** Resource link is broken

**Solution:**

```javascript
// Before:
{ platform: 'GeeksforGeeks', url: 'https://geeksforgeeks.org/old-path/' }

// After:
{ platform: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org/new-path/' }

// Test:
curl -I https://www.geeksforgeeks.org/new-path/ | grep HTTP
```

---

### Issue: Description Too Long

**Problem:** Description exceeds 200 characters

**Solution:**

```javascript
// Before (234 chars)
"Master fundamental data structures, algorithms, and problem-solving techniques essential for coding interviews and competitive programming. Learn about arrays, linked lists, trees, graphs, sorting, searching, and dynamic programming.";

// After (180 chars)
"Master fundamental data structures, algorithms, and problem-solving techniques essential for coding interviews and competitive programming.";
```

Use online character counter: https://charactercounter.com/

---

## 📊 Content Statistics

### Current Status

```
Total Cards: 4
- Beginner: 1
- Intermediate: 2
- Advanced: 1

By Category:
- Core CS: 3
- Backend: 1
- Design Patterns: 1

Last Updated: April 4, 2026
```

### Growth Targets

| Time       | Target    | Priority  |
| ---------- | --------- | --------- |
| April 2026 | 10 cards  | 🔴 High   |
| May 2026   | 20 cards  | 🔴 High   |
| June 2026  | 30+ cards | 🟡 Medium |

---

## 📞 Support

**Questions about content?**

- Open an issue on GitHub
- Contact: [Team Contact]

**Need a new category?**

- Propose in team meeting
- Get tech lead approval
- Update this guide

**Found broken link?**

- Report in issue tracker
- Include: Card ID, platform, old URL
- We'll fix within 24 hours

---

## 📝 Change Log

| Date        | Change                        | Author   |
| ----------- | ----------------------------- | -------- |
| Apr 4, 2026 | Initial guide created         | Dev Team |
|             | Created template structure    |          |
|             | Defined schema and rules      |          |
|             | Added examples and guidelines |          |

---

**Next Steps:**

1. Read this guide completely
2. Understand data structure
3. Review quality checklist
4. Add your first card!
5. Test thoroughly
6. Submit PR for review

Happy content creation! 🚀
