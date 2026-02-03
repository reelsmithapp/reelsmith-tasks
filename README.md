# ReelSmith Tasks

Full-stack task management system for ReelSmith - tracking marketing, development, and strategic initiatives with persistent database storage.

## 🚀 Features

- **Full-Stack Architecture**: React frontend + Hono.js backend + PostgreSQL database
- **Real-time Task Management**: Create, update, move, and delete tasks with instant sync
- **Offline Support**: LocalStorage fallback when API is unavailable
- **Mobile-Responsive**: Optimized for desktop and mobile devices
- **Drag & Drop**: Intuitive kanban board interface
- **CLI Access**: Command-line tool for programmatic task management
- **REST API**: Full API for automation and integrations
- **Export Functionality**: Export tasks as JSON or Markdown
- **Filtering & Search**: Filter by priority, category, assignee, and search
- **Categories**: Marketing, Product, Research, Automation
- **Assignees**: Arun (human) and Arc (AI agent)
- **Status Tracking**: Backlog, In Progress, Done, Blocked/Waiting

## 📋 Tech Stack

**Frontend:**
- React 18 with TypeScript
- Vite for fast builds
- Tailwind CSS for styling
- React Beautiful DnD for drag and drop
- Date-fns for date formatting

**Backend:**
- Hono.js (lightweight, fast web framework)
- Drizzle ORM for type-safe database queries
- Neon PostgreSQL (serverless)
- Zod for validation

**Deployment:**
- Railway (single service deployment)
- Neon DB (separate managed database)

## 🛠️ Installation & Setup

### Prerequisites

- Node.js 20+ and npm
- Neon PostgreSQL account (free tier available)
- Railway account (for deployment)

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/reelsmithapp/reelsmith-tasks.git
   cd reelsmith-tasks
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your Neon database connection string:
   ```
   DATABASE_URL=postgresql://user:password@host.neon.tech/reelsmith_tasks?sslmode=require
   PORT=3000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```

4. **Set up database:**
   ```bash
   # Generate migration files
   npm run db:generate
   
   # Push schema to database
   npm run db:push
   
   # (Optional) Open Drizzle Studio to view database
   npm run db:studio
   ```

5. **Run development servers:**
   ```bash
   # Run both frontend and backend concurrently
   npm run dev:all
   
   # Or run separately:
   npm run dev      # Frontend on http://localhost:5173
   npm run dev:api  # Backend on http://localhost:3000
   ```

6. **Access the application:**
   - Frontend: http://localhost:5173
   - API: http://localhost:3000
   - API Health: http://localhost:3000/

## 🌐 API Documentation

See [API.md](./API.md) for detailed endpoint documentation.

### Quick API Examples

**Get all tasks:**
```bash
curl http://localhost:3000/api/tasks
```

**Create a task:**
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Launch marketing campaign",
    "description": "Create social media posts",
    "status": "backlog",
    "priority": "high",
    "category": "marketing",
    "assignee": "Arun"
  }'
```

**Move a task:**
```bash
curl -X PATCH http://localhost:3000/api/tasks/{id}/move \
  -H "Content-Type: application/json" \
  -d '{"status": "in-progress"}'
```

## 🖥️ CLI Tool Usage

The CLI tool provides programmatic access for Arc (AI agent) and automation scripts.

### Available Commands

**List all tasks:**
```bash
npm run cli list
```

**Filter tasks:**
```bash
npm run cli list --status=in-progress
npm run cli list --priority=high
npm run cli list --category=marketing
npm run cli list --assignee=Arc
```

**Create a new task:**
```bash
npm run cli add "Task title" \
  --category=marketing \
  --assignee=Arc \
  --priority=high \
  --description="Task details" \
  --due=2024-12-31
```

**Update a task:**
```bash
npm run cli update {task-id} \
  --status=done \
  --priority=low
```

**Move a task:**
```bash
npm run cli move {task-id} in-progress
```

**Show task details:**
```bash
npm run cli show {task-id}
```

**Delete a task:**
```bash
npm run cli delete {task-id}
```

### CLI for Arc (AI Agent)

Arc can use the CLI to manage tasks programmatically:

```bash
# List Arc's tasks
npm run cli list --assignee=Arc

# Create a task for Arc
npm run cli add "Research competitor features" \
  --category=research \
  --assignee=Arc \
  --priority=medium

# Move task to done when complete
npm run cli move {task-id} done
```

## 🚢 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Railway Deployment

1. **Create a new Railway project**
2. **Add Neon PostgreSQL:**
   - Go to your Neon project
   - Copy the connection string
3. **Deploy to Railway:**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login
   railway login
   
   # Link project
   railway link
   
   # Set environment variables
   railway variables set DATABASE_URL=your_neon_connection_string
   railway variables set NODE_ENV=production
   railway variables set FRONTEND_URL=https://your-railway-app.railway.app
   
   # Deploy
   railway up
   ```

4. **Access your deployed app:**
   - Railway will provide a public URL
   - Update `FRONTEND_URL` environment variable with the Railway URL

## 📱 Mobile Usage

ReelSmith Tasks is fully responsive and optimized for mobile devices:

- **Touch-friendly**: Large tap targets for mobile interaction
- **Responsive Layout**: Columns stack on small screens
- **Swipe Navigation**: Horizontal scroll for kanban columns
- **Mobile Keyboard**: Optimized input fields
- **Offline Mode**: Works without internet connection

**Recommended Mobile Browsers:**
- iOS: Safari 14+
- Android: Chrome 90+

## 🧪 Testing

```bash
# Type checking
npm run lint

# Build verification
npm run build

# Test both builds
npm run build:frontend
npm run build:api
```

## 📂 Project Structure

```
reelsmith-tasks/
├── src/                    # Frontend source
│   ├── components/         # React components
│   ├── services/           # API client
│   ├── types/              # TypeScript types
│   └── utils/              # Utilities
├── server/                 # Backend source
│   ├── db/                 # Database schema & connection
│   ├── routes/             # API routes
│   └── index.ts            # Server entry point
├── cli.ts                  # CLI tool
├── dist/                   # Built files
├── docs/                   # Additional documentation
├── .env.example            # Environment template
├── drizzle.config.ts       # Drizzle ORM config
├── package.json            # Dependencies & scripts
├── railway.json            # Railway deployment config
└── tsconfig.json           # TypeScript config
```

## 🔧 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | Neon PostgreSQL connection string | `postgresql://user:pass@host.neon.tech/db` |
| `PORT` | Backend API port | `3000` |
| `NODE_ENV` | Environment (development/production) | `production` |
| `FRONTEND_URL` | Frontend URL for CORS | `https://app.railway.app` |
| `VITE_API_URL` | Frontend API endpoint | `https://api.railway.app` |

## 🤝 Contributing

This is a private project for ReelSmith. For issues or feature requests, contact the development team.

## 📄 License

MIT License - see LICENSE file for details

## 🔗 Links

- **GitHub**: https://github.com/reelsmithapp/reelsmith-tasks
- **API Documentation**: [API.md](./API.md)
- **Deployment Guide**: [DEPLOYMENT.md](./DEPLOYMENT.md)
- **ReelSmith Main**: https://reelsmith.app

## 📞 Support

For questions or issues:
- Create an issue on GitHub
- Contact: reelsmith.app@gmail.com
- Twitter: [@ReelSmithApp](https://twitter.com/ReelSmithApp)

---

**Built with ❤️ by the ReelSmith Team**
