# ReelSmith Kanban - Visual Description

## Overview

The ReelSmith Kanban board features a sleek, cinematic dark theme inspired by film production workflows. The interface is clean, professional, and focused on productivity.

---

## Header Section

**Layout**: Full-width header bar with dark gray background (#334155)

**Left Side**:
- 🎬 Film reel icon in blue rounded square
- "ReelSmith Kanban" title (white, bold, 2xl)
- "Task Management Board" subtitle (gray, small)

**Right Side** (Action Buttons):
- **[+ New Task]** - Bright blue button, prominent
- **[Archive]** - Gray button
- **[Export ▼]** - Gray button with dropdown menu
  - Export as JSON
  - Export as Markdown
- **[Import]** - Gray button

All buttons have hover effects (color shift and elevation).

---

## Filter Bar

**Background**: Dark gray card (#1e293b) with rounded corners

**Title**: "Filters" with filter icon 🔍

**Controls** (4-column grid on desktop, stacked on mobile):
1. **Search Box** (spans 2 columns):
   - 🔍 icon inside left
   - Placeholder: "Search tasks..."
   - Real-time filtering as you type

2. **Priority Dropdown**:
   - All Priorities (default)
   - High Priority
   - Medium Priority
   - Low Priority

3. **Category Dropdown**:
   - All Categories (default)
   - Marketing
   - Product
   - Research
   - Automation

4. **Assignee Dropdown**:
   - All Assignees (default)
   - Arun
   - Arc

**Clear Filters Button**: Appears in top-right when filters are active

---

## Kanban Board

**Layout**: Horizontal scrollable row of 4 columns

### Column Design

Each column has:
- **Header**:
  - Emoji icon (📋 🔄 ✅ ⏸️)
  - Column title (white, semibold)
  - Task count badge (right side, gray pill)

- **Body**: Droppable area (minimum 200px height)
  - Shows tasks as cards
  - Dashed border appears when dragging task over
  - Blue glow effect on drag-over
  - Empty state: "Drop tasks here" (gray text)

### Column Details:

1. **📋 Backlog** (Gray)
   - Waiting tasks
   - Light gray background

2. **🔄 In Progress** (Blue)
   - Active work
   - Subtle blue tint on hover

3. **✅ Done** (Green)
   - Completed tasks
   - Subtle green tint

4. **⏸️ Blocked/Waiting** (Red)
   - Tasks requiring attention
   - Subtle red tint

---

## Task Cards

**Design**: Dark card (#334155) with subtle shadow and rounded corners

**Structure** (top to bottom):

1. **Header Row**:
   - Task title (white, medium weight)
   - Edit icon (✏️, hover: blue)
   - Delete icon (🗑️, hover: red)

2. **Description** (if present):
   - Gray text, small font
   - Line clamped to 2 lines
   - Full description visible in edit modal

3. **Tags Row**:
   - Priority badge (colored pill):
     - 🔴 High (red background, red text)
     - 🟡 Medium (yellow background, yellow text)
     - 🟢 Low (green background, green text)
   - Category badge (colored pill):
     - Marketing (purple)
     - Product (blue)
     - Research (cyan)
     - Automation (pink)

4. **Footer Row**:
   - 👤 Assignee name (left)
   - 📅 Due date (right):
     - Normal: gray text with calendar icon
     - Overdue: red text with clock icon
     - Formats: "Due today", "Due in 3 days", "Overdue by 2 days"

**Interactions**:
- **Hover**: Border changes to blue
- **Drag**: Card rotates slightly, increases in size, gets dramatic shadow
- **Click Edit**: Opens modal overlay
- **Click Delete**: Confirmation dialog

---

## Task Modal

**Overlay**: Semi-transparent black background (70% opacity)

**Modal Window**: Large rounded card (max-width 2xl), centered

**Header**:
- "New Task" or "Edit Task" title
- Close button (✕) in top-right

**Form Fields** (vertical layout):

1. **Title** (required):
   - Text input, white border focus
   - Placeholder: "Enter task title..."

2. **Description**:
   - Textarea (4 rows)
   - Placeholder: "Add a description... (Markdown supported)"

3. **Status** and **Priority** (2-column grid):
   - Status dropdown: 📋 🔄 ✅ ⏸️
   - Priority dropdown: 🔴 🟡 🟢

4. **Category** and **Assignee** (2-column grid):
   - Category dropdown: Marketing, Product, Research, Automation
   - Assignee dropdown: Arun, Arc

5. **Due Date**:
   - Date picker input

**Action Buttons**:
- **Create Task** / **Update Task** (blue, primary, full-width)
- **Cancel** (gray, secondary)

---

## Stats Panel

**Location**: Below kanban board

**Layout**: 4-column grid (responsive: 2 columns on mobile)

**Each Stat Card**:
- Column icon (emoji)
- Column name (gray text)
- Task count (large white number, 3xl font)
- Dark gray background (#1e293b)
- Rounded corners

Example:
```
📋 Backlog
2
```

---

## Keyboard Shortcuts Panel

**Location**: Fixed bottom-right corner

**Design**: Small dark card with subtle border

**Title**: "Keyboard Shortcuts"

**Shortcuts**:
- **[N]** New task
- **[A]** Archive completed
- **[/]** Search

Each key is shown in a pill-shaped badge.

---

## Empty State

**When no tasks**:
- Large emoji: 📋
- Heading: "No tasks found"
- Message: "Create your first task to get started!" or "Try adjusting your filters"
- **[Create First Task]** button (blue, prominent)

---

## Animations

1. **Fade In**: Task cards fade in when created (0.2s)
2. **Slide Up**: Modal slides up from bottom (0.3s)
3. **Drag and Drop**: Smooth card movement with rotation
4. **Hover Effects**: Color transitions on buttons (0.2s)
5. **Filter Changes**: Instant re-render with smooth transitions

---

## Responsive Behavior

### Desktop (1024px+):
- 4 columns visible side-by-side
- Full filter bar with all 4 controls
- All button labels visible

### Tablet (768px - 1023px):
- Horizontal scroll for columns
- 3 filter controls visible (assignee hidden)
- Some button labels hidden

### Mobile (< 768px):
- Stack columns if space limited
- 2-column filter layout
- Icon-only buttons
- Simplified task cards

---

## Color Palette

**Backgrounds**:
- Primary: `#0a0e17` (reel-dark)
- Cards: `#1e293b` (reel-gray)
- Card Hover: `#334155` (reel-gray-light)

**Accents**:
- Blue: `#3b82f6` (reel-blue-light)
- Blue Bright: `#60a5fa` (reel-blue-bright)
- Purple: `#8b5cf6` (reel-accent)

**Priority Colors**:
- High: `#ef4444` (red-400)
- Medium: `#facc15` (yellow-400)
- Low: `#4ade80` (green-400)

**Category Colors**:
- Marketing: `#c084fc` (purple-400)
- Product: `#60a5fa` (blue-400)
- Research: `#22d3ee` (cyan-400)
- Automation: `#f472b6` (pink-400)

**Text**:
- Primary: `#ffffff` (white)
- Secondary: `#9ca3af` (gray-400)
- Muted: `#6b7280` (gray-500)

---

## Typography

**Font Family**: Inter (Google Fonts fallback to system-ui)

**Sizes**:
- Heading 1: 2xl (24px)
- Heading 2: lg (18px)
- Body: sm (14px)
- Small: xs (12px)
- Stats: 3xl (30px)

**Weights**:
- Normal: 400
- Medium: 500
- Semibold: 600
- Bold: 700

---

## Accessibility

- High contrast text (WCAG AA compliant)
- Clear visual hierarchy
- Keyboard navigation support
- Focus indicators on interactive elements
- ARIA labels (via React Beautiful DnD)
- Semantic HTML structure

---

## Production Screenshots

Since this is a text description, here's what you'd see:

**Initial Load**:
- 4 columns arranged horizontally
- 6 tasks distributed across columns:
  - Backlog: 2 tasks (Reddit, India Film Festival)
  - In Progress: 2 tasks (Twitter, Automation Plan)
  - Done: 2 tasks (LLM Research, Film Concepts) ✅
  - Blocked: 0 tasks

**Typical Usage**:
- User drags "Reddit Discovery" from Backlog to In Progress
- Card smoothly animates to new position
- Column counts update (Backlog: 1, In Progress: 3)
- Change auto-saves to localStorage

**Filter Example**:
- User searches "twitter"
- Only 1 card visible: "Twitter Strategy - Tweet #1 posting"
- Other columns show empty state
- "Clear all" button appears

---

This visual design creates a professional, cinematic experience perfect for ReelSmith's brand while maintaining excellent usability and productivity features.

**Live Demo**: Run `npm run dev` and open http://localhost:3000
