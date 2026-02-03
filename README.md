# ReelSmith Kanban Board

A professional, cinematic-themed Kanban board for managing ReelSmith marketing tasks, product development, and strategic initiatives.

![ReelSmith Kanban](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![React](https://img.shields.io/badge/React-18.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4)

## ✨ Features

- **📋 Four Column Layout**: Backlog, In Progress, Done, Blocked/Waiting
- **🎨 Dark Cinematic Theme**: ReelSmith brand colors (blues, grays)
- **🖱️ Drag & Drop**: Smooth task movement between columns
- **🔍 Advanced Filtering**: Search, priority, category, and assignee filters
- **💾 Auto-Save**: LocalStorage persistence with instant save
- **📤 Export/Import**: JSON and Markdown export, JSON import
- **⌨️ Keyboard Shortcuts**: Quick actions without mouse
- **📱 Responsive Design**: Works beautifully on mobile and desktop
- **🎯 Task Management**:
  - Priority levels (High, Medium, Low) with color coding
  - Category tags (Marketing, Product, Research, Automation)
  - Assignees (Arun, Arc)
  - Due dates with overdue indicators
  - Rich markdown descriptions
  - Archive completed tasks

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Modern web browser

### Installation

```bash
# Clone the repository
git clone https://github.com/reelsmithapp/reelsmith-kanban.git
cd reelsmith-kanban

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`

### Build for Production

```bash
# Build optimized production bundle
npm run build

# Preview production build
npm run preview
```

## 🎮 Usage

### Keyboard Shortcuts

- **`N`** - Create new task
- **`A`** - Archive completed tasks
- **`/`** - Focus search bar

### Managing Tasks

1. **Create Task**: Click "New Task" button or press `N`
2. **Edit Task**: Click edit icon on any task card
3. **Move Task**: Drag and drop between columns
4. **Delete Task**: Click delete icon (confirmation required)
5. **Filter Tasks**: Use filter bar to narrow down view
6. **Export Data**: Click Export → Choose JSON or Markdown
7. **Import Data**: Click Import → Select JSON file

### Task Properties

- **Title** (required): Short task description
- **Description**: Detailed information (Markdown supported)
- **Status**: Backlog, In Progress, Done, Blocked/Waiting
- **Priority**: High (red), Medium (yellow), Low (green)
- **Category**: Marketing, Product, Research, Automation
- **Assignee**: Arun or Arc
- **Due Date**: Optional deadline with overdue tracking

## 📁 Project Structure

```
reelsmith-kanban/
├── src/
│   ├── components/          # React components
│   │   ├── Column.tsx       # Kanban column component
│   │   ├── TaskCard.tsx     # Individual task card
│   │   ├── TaskModal.tsx    # Add/Edit task modal
│   │   ├── FilterBar.tsx    # Filtering interface
│   │   └── Header.tsx       # App header with actions
│   ├── hooks/               # Custom React hooks
│   │   ├── useKanban.ts     # Kanban state management
│   │   └── useKeyboardShortcuts.ts
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/               # Utility functions
│   │   ├── storage.ts       # LocalStorage & export/import
│   │   ├── filters.ts       # Task filtering logic
│   │   └── helpers.ts       # General helpers
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # React entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── index.html               # HTML template
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
├── tailwind.config.js       # Tailwind CSS config
├── vite.config.ts           # Vite build config
├── README.md                # This file
└── PROJECT-SPEC.md          # Detailed architecture docs
```

## 🎨 Design System

### Colors

- **Dark Background**: `#0a0e17` (reel-dark)
- **Card Background**: `#1e293b` (reel-gray)
- **Primary Blue**: `#3b82f6` (reel-blue-light)
- **Accent Purple**: `#8b5cf6` (reel-accent)

### Typography

- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

## 🔧 Tech Stack

- **React 18.2** - UI library
- **TypeScript 5.3** - Type safety
- **Vite 5.1** - Build tool
- **Tailwind CSS 3.4** - Styling
- **React Beautiful DnD 13.1** - Drag and drop
- **React Icons 5.0** - Icon library
- **date-fns 3.3** - Date formatting

## 📦 Dependencies

### Core

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-beautiful-dnd": "^13.1.1",
  "react-icons": "^5.0.1",
  "date-fns": "^3.3.1"
}
```

### Dev Dependencies

```json
{
  "@vitejs/plugin-react": "^4.2.1",
  "typescript": "^5.3.3",
  "tailwindcss": "^3.4.1",
  "vite": "^5.1.0"
}
```

## 🚢 Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify

```bash
# Build the project
npm run build

# Deploy dist folder to Netlify
```

### Deploy to GitHub Pages

Add to `package.json`:

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

Update `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/reelsmith-kanban/',
  // ... rest of config
})
```

## 🤝 Contributing

This is an internal tool for ReelSmith. Contributions are welcome!

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

Copyright © 2024 ReelSmith. All rights reserved.

## 🎬 About ReelSmith

ReelSmith is building the future of AI-powered film production. This Kanban board helps us stay organized as we launch our platform.

**Team:**
- Arun - Founder & CEO
- Arc - AI Assistant & Automation Lead

---

Built with ❤️ by the ReelSmith team
