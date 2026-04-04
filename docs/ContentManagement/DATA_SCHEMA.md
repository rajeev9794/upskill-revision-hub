# Data Schema & Format Specification

**Status:** Reference  
**Created:** April 4, 2026  
**Version:** 1.0  
**Audience:** Developers, Data Managers

---

## 📋 Complete Data Structure

### Topic Card Schema

```typescript
interface TopicCard {
  // Core Identity
  id: string; // Unique identifier

  // Display Information
  icon: string; // Emoji character
  title: string; // Card title
  description: string; // Short description

  // Classification
  category: string; // Content category
  difficulty: Difficulty; // Difficulty level

  // Metadata
  dateAdded: Date; // Creation date

  // Resources
  links?: Resource[]; // External links

  // Future Fields (optional)
  tags?: string[]; // For advanced filtering
  prerequisites?: string[]; // Required knowledge
  duration?: string; // Estimated time
  content?: Content; // Rich content
}

interface Resource {
  platform: string; // Platform/source name
  url: string; // HTTP(S) URL
}

type Difficulty = "Beginner" | "Intermediate" | "Advanced";

interface Content {
  sections?: Section[]; // Rich content sections
  codeSnippets?: CodeSnippet[]; // Code examples
  images?: Image[]; // Embedded images
}

interface Section {
  title: string;
  content: string; // Markdown
}

interface CodeSnippet {
  language: string;
  code: string;
}

interface Image {
  url: string;
  alt: string;
  caption?: string;
}
```

---

## 🗂️ JavaScript Implementation

### Current Format (topicsData.js)

```javascript
const topicsData = [
  {
    id: "dsa",
    icon: "🔢",
    title: "Data Structures & Algorithms",
    description:
      "Master fundamental data structures, algorithms, and problem-solving techniques essential for coding interviews and competitive programming.",
    category: "Core CS",
    difficulty: "Intermediate",
    dateAdded: new Date(2024, 0, 15),
    links: [
      { platform: "LeetCode", url: "https://leetcode.com" },
      {
        platform: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/data-structures/",
      },
      { platform: "NeetCode", url: "https://neetcode.io" },
      { platform: "HackerRank", url: "https://www.hackerrank.com" },
    ],
  },
  // ... more cards
];
```

---

## 📐 Field Specifications

### `id` Field

```javascript
{
  type: String,
  required: true,
  unique: true,
  pattern: /^[a-z0-9]+(-[a-z0-9]+)*$/,
  minLength: 3,
  maxLength: 30,
  description: 'Unique identifier in lowercase with hyphens'
}

// Valid examples
'dsa'
'data-structures-algorithms'
'system-design-fundamentals'
'oops-principles'
'solid-design-patterns'

// Invalid examples (these will fail)
'DSA'                    // uppercase
'data_structures'        // underscore
'data structures'        // space
'DataStructures'         // camelCase
```

---

### `icon` Field

```javascript
{
  type: String,
  required: true,
  pattern: /^\p{Emoji}$/u,
  length: 1,
  description: 'Single emoji character'
}

// Valid examples
'🔢', '🏗️', '⚙️', '✨', '🎯', '🚀', '🎨'

// Invalid examples
'icon-1'     // not emoji
'📚📖'       // multiple emoji
'&lt;'       // HTML entity
'[icon]'     // text
```

---

### `title` Field

```javascript
{
  type: String,
  required: true,
  unique: false,
  minLength: 20,
  maxLength: 60,
  description: 'Descriptive title in Title Case'
}

// Valid examples (good length)
'Data Structures & Algorithms'          // 36 chars
'System Design Fundamentals'            // 29 chars
'Object-Oriented Programming'           // 31 chars

// Invalid examples
'DSA'                                   // too short (3 chars)
'Learn Data Structures and Algorithms and Practice Coding Interview Questions'  // too long (85 chars)
'data structures'                       // lowercase
```

---

### `description` Field

```javascript
{
  type: String,
  required: true,
  minLength: 80,
  maxLength: 200,
  format: 'plaintext',  // No markdown
  description: 'Short summary of learning objectives'
}

// Valid examples (good length)
'Master fundamental data structures, algorithms, and problem-solving techniques essential for coding interviews and competitive programming.'  // 146 chars

'Learn to design scalable, reliable, and maintainable large-scale systems. Understand distributed systems, databases, and architecture patterns.'  // 156 chars

// Invalid examples
'Learn DSA'                             // too short (8 chars)
'Learn DSA including arrays, linked lists, trees, graphs, sorting algorithms, searching algorithms, dynamic programming, minimum spanning trees, topological sorting, and more advanced topics used in real-world applications.'  // too long (218 chars)
```

---

### `category` Field

```javascript
{
  type: String,
  required: true,
  enum: [
    'Core CS',
    'Backend',
    'Frontend',
    'DevOps',
    'Full Stack',
    'Tools',
    'Design Patterns',
    'Security',
    'Testing',
    'Performance',
  ],
  description: 'Must be one of allowed categories'
}

// Valid examples
'Core CS'
'Backend'
'Design Patterns'

// Invalid examples (will cause filter errors)
'core cs'                // lowercase
'CoreCS'                 // no space
'Backend Development'    // not in enum
'Web Development'        // not in enum
```

---

### `difficulty` Field

```javascript
{
  type: String,
  required: true,
  enum: ['Beginner', 'Intermediate', 'Advanced'],
  description: 'One of three difficulty levels'
}

// Valid examples
'Beginner'
'Intermediate'
'Advanced'

// Invalid examples
'Easy'                   // not in enum
'Hard'                   // not in enum
'beginner'               // lowercase
'Intermediate1'          // extra characters
```

---

### `dateAdded` Field

```javascript
{
  type: Date,
  required: true,
  format: 'new Date(YYYY, MM-1, DD)',
  description: 'JavaScript Date object'
}

// Valid examples
new Date(2026, 3, 4)    // April 4, 2026 (MM is 0-indexed!)
new Date(2026, 0, 15)   // January 15, 2026
new Date(2024, 11, 25)  // December 25, 2024

// Invalid examples
'2026-04-04'            // string, not Date object
new Date('2026-04-04')  // may not parse correctly
new Date(2026, 4, 4)    // May 4, not April! (4 = May, 0-indexed)
2026/04/04              // invalid format
```

---

### `links` Field

```javascript
{
  type: Array<Resource>,
  required: false,
  recommended: true,
  minItems: 3,
  maxItems: 10,
  description: 'Array of external resource links'
}

interface Resource {
  platform: String,      // 'LeetCode', 'GitHub', etc.
  url: String,          // Valid HTTP(S) URL
}

// Valid example
links: [
  { platform: 'LeetCode', url: 'https://leetcode.com' },
  { platform: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org/data-structures/' },
  { platform: 'NeetCode', url: 'https://neetcode.io' },
  { platform: 'HackerRank', url: 'https://www.hackerrank.com' },
]

// Ensure:
// - Each URL is valid and working
// - URLs use https:// (not http://)
// - No broken or redirect links
// - Platform name clearly describes resource
```

---

## 🔄 Data Transformation

### How Data Flows Through App

```
topicsData (topicsData.js)
    ↓
FilterContext (FilterContext.jsx)
    ├── filterTopics()          // Apply filters
    ├── searchTopics()          // Search
    └── sortTopics()            // Sort
    ↓
HomePage (pages/HomePage.jsx)
    ├── filteredTopics          // Filtered results
    ├── selectedCard            // Detail view
    └── Pass to components
    ↓
ContentGrid (components/ContentGrid.jsx)
    ├── GridCard, ListCard, CompactCard
    └── Render filtered topics
    ↓
CardDetail (components/CardDetail*.jsx)
    └── Show full card info + links
```

---

## 📊 Data Statistics

### Validation Rules

```javascript
// Field counts
totalFields = 7 required + 1 optional = 8 total

// ID uniqueness
Must not have duplicates
.map(t => t.id)
.some((id, i, arr) => arr.indexOf(id) !== i) === false

// Date validation
dateAdded must be Date object
new Date(1970, 0, 1) <= dateAdded <= today

// URL validation
links.forEach(link => {
  URL.parse(link.url).protocol === 'https:' ✓
  linkIsDead(link.url) === false ✓
})

// String lengths
3 <= id.length <= 30
20 <= title.length <= 60
80 <= description.length <= 200
"" < platform.length <= 50
3 <= links.length <= 10
```

---

## 🧪 Validation Examples

### Valid Card Example

```javascript
{
  id: 'system-design',
  icon: '🏗️',
  title: 'System Design',
  description: 'Learn to design scalable, reliable, and maintainable large-scale systems. Understand distributed systems, databases, and architecture patterns.',
  category: 'Backend',
  difficulty: 'Advanced',
  dateAdded: new Date(2024, 0, 20),
  links: [
    { platform: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer' },
    { platform: 'Educative - System Design', url: 'https://www.educative.io/courses/grokking-the-system-design-interview' },
    { platform: 'Alex Xu Videos', url: 'https://www.youtube.com/c/SystemDesignInterview' },
    { platform: 'InterviewBit', url: 'https://www.interviewbit.com/courses/system-design/' },
  ],
}
```

✅ All validations pass:

- ID: `system-design` ✓ (hyphenated, lowercase)
- Icon: `🏗️` ✓ (single emoji)
- Title: Valid length and capitalization ✓
- Description: 156 chars ✓ (80-200 range)
- Category: `Backend` ✓ (in enum)
- Difficulty: `Advanced` ✓ (in enum)
- dateAdded: Valid Date ✓
- Links: 4 links ✓ (3-10 range)

---

### Invalid Card Example

```javascript
{
  id: 'system-design-fundamentals-and-architecture-patterns',  // ❌ Too long (>30)
  icon: '🏗️🌐',                                                // ❌ Multiple emojis
  title: 'system design',                                       // ❌ Not Title Case
  description: 'Learn systems',                                 // ❌ Too short (<80)
  category: 'Backend Development',                              // ❌ Not in enum
  difficulty: 'Hard',                                           // ❌ Not in enum
  dateAdded: '2024-01-20',                                      // ❌ String not Date
  links: [                                                       // ❌ Only 1 link (<3)
    { platform: 'GitHub', url: 'http://github.com' },          // ❌ http not https
  ],
}
```

❌ Multiple validation failures:

- ID too long
- Multiple emojis
- Wrong case for title
- Description too short
- Invalid category
- Invalid difficulty
- Wrong date format
- Too few links
- HTTP instead of HTTPS

---

## 📈 Future Schema Extensions

### Phase 2: Rich Content

```javascript
{
  // Current fields...

  // New: Rich content support
  content: {
    sections: [
      { title: 'Basics', content: '# Introduction\n\nMarkdown...' },
      { title: 'Advanced', content: '# Advanced Topics\n\n...' }
    ],
    codeSnippets: [
      { language: 'javascript', code: 'const x = 1;' }
    ]
  }
}
```

### Phase 3: Learning Paths

```javascript
{
  // Current fields...

  // New: Prerequisites & paths
  prerequisites: ['dsa', 'oops'],
  relatedTopics: ['system-design', 'solid'],
  estimatedTime: '40 hours',
  completionCriteria: 'Solve 50+ problems'
}
```

### Phase 4: User Progress

```javascript
{
  // Current fields...

  // New: Track user progress
  userProgress: {
    completed: false,
    startedDate: Date,
    completedDate: Date,
    bookmarked: boolean,
    lastAccessed: Date,
    progressPercentage: number
  }
}
```

---

## 🛠️ Schema Evolution

### Version History

| Version | Date        | Changes                |
| ------- | ----------- | ---------------------- |
| 1.0     | Apr 4, 2026 | Initial schema         |
| 2.0     | TBD         | Rich content support   |
| 3.0     | TBD         | Learning paths         |
| 4.0     | TBD         | User progress tracking |

### Backward Compatibility

When upgrading schema:

1. New fields are optional
2. Old fields remain unchanged
3. Migration guide provided
4. Old data still works
5. Gradual rollout planned

---

## 📝 Creating Custom Types

### For TypeScript Projects

```typescript
// types/topics.ts
export type Difficulty = "Beginner" | "Intermediate" | "Advanced";
export type Category =
  | "Core CS"
  | "Backend"
  | "Frontend"
  | "DevOps"
  | "Full Stack"
  | "Tools"
  | "Design Patterns"
  | "Security"
  | "Testing"
  | "Performance";

export interface Resource {
  platform: string;
  url: string;
}

export interface TopicCard {
  id: string;
  icon: string;
  title: string;
  description: string;
  category: Category;
  difficulty: Difficulty;
  dateAdded: Date;
  links?: Resource[];
}

// Validation function
export function validateTopicCard(card: TopicCard): boolean {
  return (
    card.id.match(/^[a-z0-9]+(-[a-z0-9]+)*$/) !== null &&
    card.id.length >= 3 &&
    card.id.length <= 30 &&
    card.title.length >= 20 &&
    card.title.length <= 60 &&
    card.description.length >= 80 &&
    card.description.length <= 200 &&
    card.dateAdded instanceof Date &&
    (!card.links || (card.links.length >= 3 && card.links.length <= 10))
  );
}
```

---

## 🔍 Data Quality Checklist

Before deploying, verify:

- [ ] All IDs are unique
- [ ] All IDs match pattern `^[a-z0-9\-]+$`
- [ ] All icons are single emoji
- [ ] All titles are Title Case
- [ ] All descriptions are plaintext
- [ ] All categories are from enum
- [ ] All difficulties are from enum
- [ ] All dates are valid Date objects
- [ ] All links are HTTPS (not HTTP)
- [ ] All links return 200 OK (not 404)
- [ ] No spelling errors in any field
- [ ] No trailing commas in array
- [ ] No duplicate entries
- [ ] Build passes: `npm run build`
- [ ] No console errors

---

## 📞 Schema Support

**Questions about schema?**

- Review examples in `CONTENT_ADDITION_GUIDE.md`
- Check current `src/data/topicsData.js` for reference
- Open GitHub issue for clarification

**Found schema bug?**

- Report with: Field name, current value, expected value
- Include error message if available
- Provide test case

---

**Last Updated:** April 4, 2026  
**Maintained By:** Development Team  
**Next Review:** April 15, 2026
