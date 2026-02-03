# ReelSmith Kanban - Technical Specification

## Architecture Overview

This document provides detailed technical documentation for the ReelSmith Kanban board application.

## Table of Contents

1. [System Architecture](#system-architecture)
2. [Data Models](#data-models)
3. [State Management](#state-management)
4. [Component Hierarchy](#component-hierarchy)
5. [Persistence Layer](#persistence-layer)
6. [Drag and Drop Implementation](#drag-and-drop-implementation)
7. [Filtering System](#filtering-system)
8. [Performance Optimizations](#performance-optimizations)

---

## System Architecture

### Technology Stack

```
┌─────────────────────────────────────┐
│         React 18.2 + TypeScript     │
├─────────────────────────────────────┤
│  State: useState + useEffect        │
│  Styling: Tailwind CSS              │
│  DnD: React Beautiful DnD           │
│  Icons: React Icons (Feather)       │
│  Build: Vite 5.1                    │
└─────────────────────────────────────┘
```

### Application Flow

```
User Interaction
    ↓
React Components
    ↓
Custom Hooks (useKanban)
    ↓
State Updates
    ↓
LocalStorage Sync
    ↓
UI Re-render
```

---

## Data Models

### Task Interface

```typescript
interface Task {
  id: string;                    // Unique identifier (timestamp-random)
  title: string;                 // Task title (required)
  description: string;           // Markdown description
  status: TaskStatus;            // Column assignment
  priority: TaskPriority;        // High | Medium | Low
  category: TaskCategory;        // Marketing | Product | Research | Automation
  assignee: Assignee;            // Arun | Arc
  dueDate?: string;              // ISO 8601 date string
  createdAt: string;             // ISO 8601 creation timestamp
  archived?: boolean;            // Soft delete flag
}
```

### Type Definitions

```typescript
type TaskStatus = 'backlog' | 'in-progress' | 'done' | 'blocked';
type TaskPriority = 'high' | 'medium' | 'low';
type TaskCategory = 'marketing' | 'product' | 'research' | 'automation';
type Assignee = 'Arun' | 'Arc';
```

### Filter State

```typescript
interface FilterState {
  priority: TaskPriority | 'all';
  category: TaskCategory | 'all';
  assignee: Assignee | 'all';
  search: string;
}
```

---

## State Management

### Custom Hook: `useKanban`

The `useKanban` hook encapsulates all task management logic:

```typescript
const {
  tasks,              // All tasks (including archived)
  filteredTasks,      // Tasks after applying filters
  filter,             // Current filter state
  addTask,            // Create new task
  updateTask,         // Update existing task
  deleteTask,         // Hard delete task
  moveTask,           // Change task status
  archiveCompletedTasks, // Soft delete completed tasks
  clearFilters,       // Reset all filters
  updateFilter,       // Update specific filter
  importTasks,        // Replace all tasks
} = useKanban();
```

### State Persistence

- **Auto-save**: Every state change triggers `localStorage.setItem()`
- **Auto-load**: Initial state loads from `localStorage` on mount
- **Fallback**: If no data exists, loads initial sample tasks
- **Storage Key**: `reelsmith-kanban-tasks`

### State Update Pattern

```typescript
// Immutable updates using functional setState
setTasks((prev) => 
  prev.map((task) => 
    task.id === id ? { ...task, ...updates } : task
  )
);
```

---

## Component Hierarchy

```
App
├── Header
│   ├── Logo & Title
│   ├── Action Buttons (Add, Archive, Export, Import)
│   └── File Input (hidden)
├── FilterBar
│   ├── Search Input
│   ├── Priority Select
│   ├── Category Select
│   └── Assignee Select
├── DragDropContext
│   └── Column (x4)
│       ├── Column Header
│       └── Droppable
│           └── TaskCard (draggable, multiple)
│               ├── Title & Actions
│               ├── Description
│               ├── Tags (Priority, Category)
│               └── Footer (Assignee, Due Date)
├── TaskModal (conditional)
│   └── Form Fields
└── Keyboard Shortcuts Help
```

### Component Responsibilities

| Component | Responsibility |
|-----------|----------------|
| **App** | Root component, state management, drag-drop handling |
| **Header** | Branding, global actions (add, export, import, archive) |
| **FilterBar** | Filter UI and search input |
| **Column** | Column rendering, droppable area |
| **TaskCard** | Task display, edit/delete actions, draggable |
| **TaskModal** | Task creation/editing form |

---

## Persistence Layer

### LocalStorage Schema

```json
{
  "reelsmith-kanban-tasks": [
    {
      "id": "1234567890-abc123",
      "title": "Task title",
      "description": "Task description",
      "status": "in-progress",
      "priority": "high",
      "category": "marketing",
      "assignee": "Arun",
      "dueDate": "2024-12-31T00:00:00.000Z",
      "createdAt": "2024-01-01T12:00:00.000Z",
      "archived": false
    }
  ]
}
```

### Storage Utilities

#### `loadTasks()`
- Reads from localStorage
- Parses JSON
- Returns initial tasks if empty/error

#### `saveTasks(tasks: Task[])`
- Serializes tasks to JSON
- Writes to localStorage
- Error handling with console logging

#### `exportToJSON(tasks: Task[])`
- Creates Blob from JSON
- Triggers browser download
- Filename: `reelsmith-tasks-YYYY-MM-DD.json`

#### `exportToMarkdown(tasks: Task[])`
- Formats tasks as Markdown document
- Groups by status
- Includes all metadata
- Filename: `reelsmith-tasks-YYYY-MM-DD.md`

#### `importFromJSON(file: File)`
- Reads file using FileReader
- Parses JSON
- Returns Promise<Task[]>
- Validation and error handling

---

## Drag and Drop Implementation

### Library: React Beautiful DnD

#### Context Setup

```typescript
<DragDropContext onDragEnd={handleDragEnd}>
  {/* Droppable columns */}
</DragDropContext>
```

#### Column (Droppable)

```typescript
<Droppable droppableId={status}>
  {(provided, snapshot) => (
    <div ref={provided.innerRef} {...provided.droppableProps}>
      {/* Draggable task cards */}
      {provided.placeholder}
    </div>
  )}
</Droppable>
```

#### Task Card (Draggable)

```typescript
<Draggable draggableId={task.id} index={index}>
  {(provided, snapshot) => (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      {/* Task content */}
    </div>
  )}
</Draggable>
```

#### Drag Handler

```typescript
const handleDragEnd = (result: DropResult) => {
  if (!result.destination) return;
  
  const newStatus = result.destination.droppableId as TaskStatus;
  moveTask(result.draggableId, newStatus);
};
```

### Visual Feedback

- **Dragging**: Scale and rotate animation
- **Drop Zone**: Dashed border and background color
- **Shadow**: Elevation increases during drag

---

## Filtering System

### Filter Pipeline

```
All Tasks
    ↓
Exclude Archived
    ↓
Apply Priority Filter
    ↓
Apply Category Filter
    ↓
Apply Assignee Filter
    ↓
Apply Search Filter
    ↓
Filtered Tasks
```

### Implementation

```typescript
export const filterTasks = (tasks: Task[], filter: FilterState): Task[] => {
  return tasks.filter((task) => {
    if (task.archived) return false;
    
    if (filter.priority !== 'all' && task.priority !== filter.priority) 
      return false;
    
    if (filter.category !== 'all' && task.category !== filter.category) 
      return false;
    
    if (filter.assignee !== 'all' && task.assignee !== filter.assignee) 
      return false;
    
    if (filter.search) {
      const searchLower = filter.search.toLowerCase();
      const matchesTitle = task.title.toLowerCase().includes(searchLower);
      const matchesDescription = task.description.toLowerCase().includes(searchLower);
      if (!matchesTitle && !matchesDescription) return false;
    }
    
    return true;
  });
};
```

### Performance

- Filters use `useMemo` to prevent unnecessary recalculation
- Search is case-insensitive
- All filters are additive (AND logic)

---

## Performance Optimizations

### React Best Practices

1. **Memoization**
   ```typescript
   const tasksByStatus = useMemo(
     () => groupTasksByStatus(filteredTasks),
     [filteredTasks]
   );
   ```

2. **Callback Optimization**
   ```typescript
   const addTask = useCallback((taskData) => {
     // Implementation
   }, []);
   ```

3. **Key Props**
   - All list items use stable `task.id` as key
   - Prevents unnecessary re-renders

### Build Optimizations

1. **Code Splitting**: Vite automatically splits vendor chunks
2. **Tree Shaking**: Unused exports are eliminated
3. **Minification**: Production builds are minified
4. **Asset Optimization**: Images and fonts optimized

### Bundle Size

- **Uncompressed**: ~250KB
- **Gzipped**: ~80KB
- **Initial Load**: <1s on 3G

---

## Keyboard Shortcuts

### Implementation: `useKeyboardShortcuts`

```typescript
const shortcuts: ShortcutConfig[] = [
  { key: 'n', action: handleAddTask },
  { key: 'a', action: handleArchive },
  { key: '/', action: focusSearch },
];

useKeyboardShortcuts(shortcuts);
```

### Features

- Ignores events from input fields
- Prevents default browser behavior
- Supports modifier keys (Ctrl, Shift, Alt)

---

## Styling System

### Tailwind Configuration

Custom theme extensions:

```javascript
colors: {
  'reel-dark': '#0a0e17',
  'reel-darker': '#060810',
  'reel-blue': '#1e3a8a',
  'reel-blue-light': '#3b82f6',
  'reel-blue-bright': '#60a5fa',
  'reel-gray': '#1e293b',
  'reel-gray-light': '#334155',
  'reel-accent': '#8b5cf6',
}
```

### Animation System

```javascript
animation: {
  'fade-in': 'fadeIn 0.2s ease-in-out',
  'slide-up': 'slideUp 0.3s ease-out',
}
```

### Responsive Design

- **Mobile First**: Base styles for mobile
- **Breakpoints**: 
  - `sm`: 640px
  - `md`: 768px
  - `lg`: 1024px
- **Grid System**: CSS Grid for stats, Flexbox for columns

---

## Error Handling

### LocalStorage Errors
- Try-catch blocks around all storage operations
- Console logging for debugging
- Graceful fallback to empty array

### Drag and Drop Errors
- Null checks for destination
- Validation of draggable IDs
- Safe type casting for status

### Import Errors
- File type validation
- JSON parsing error handling
- User-friendly alert messages

---

## Testing Strategy

### Manual Testing Checklist

- [ ] Create task with all fields
- [ ] Edit existing task
- [ ] Delete task (with confirmation)
- [ ] Drag task between columns
- [ ] Filter by priority
- [ ] Filter by category
- [ ] Filter by assignee
- [ ] Search tasks
- [ ] Clear filters
- [ ] Archive completed tasks
- [ ] Export to JSON
- [ ] Export to Markdown
- [ ] Import from JSON
- [ ] Test keyboard shortcuts
- [ ] Test responsive design
- [ ] Test localStorage persistence

### Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

---

## Future Enhancements

### Planned Features

1. **Backend Integration**
   - RESTful API
   - Real-time sync
   - Multi-user support

2. **Advanced Features**
   - Task comments
   - File attachments
   - Subtasks
   - Task dependencies
   - Time tracking
   - Activity log

3. **Collaboration**
   - @mentions
   - Notifications
   - Team workspaces

4. **Analytics**
   - Velocity tracking
   - Burndown charts
   - Productivity metrics

5. **Integrations**
   - GitHub issues
   - Slack notifications
   - Calendar sync

---

## Deployment Guide

### Environment Variables

None required for current version (localStorage only).

### Build Process

```bash
# Install dependencies
npm install

# Type check
tsc --noEmit

# Build production bundle
npm run build

# Output: dist/
```

### Hosting Options

1. **Vercel** (Recommended)
   - Zero config deployment
   - Automatic HTTPS
   - CDN distribution

2. **Netlify**
   - Drag-and-drop deployment
   - Form handling
   - Serverless functions ready

3. **GitHub Pages**
   - Free hosting
   - Custom domain support
   - Requires `gh-pages` setup

---

## Maintenance

### Dependency Updates

```bash
# Check for outdated packages
npm outdated

# Update all to latest
npm update

# Update major versions
npx npm-check-updates -u
npm install
```

### Code Quality

- **TypeScript**: Strict mode enabled
- **ESLint**: React hooks and TypeScript rules
- **Prettier**: Code formatting (optional)

---

## Contact & Support

**Project Maintainers:**
- Arun (Founder)
- Arc (AI Assistant)

**Repository:** https://github.com/reelsmithapp/reelsmith-kanban

---

*Last Updated: 2024*
