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

## 🔒 Security

ReelSmith Tasks uses API key authentication to protect your task data.

**⚠️ IMPORTANT: Keep your API key secret!**

### API Authentication

All API endpoints (except `/health`) require an API key in the request headers:

```bash
# Using x-api-key header (recommended)
curl -H "x-api-key: YOUR_API_KEY" http://localhost:3000/api/tasks

# Using Authorization header
curl -H "Authorization: Bearer YOUR_API_KEY" http://localhost:3000/api/tasks
```

### Generating a Secure API Key

Generate a cryptographically secure random key:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
```

This will output something like: `baYVGJLh9A1YozvSNGToQub3a8LJs1yv-DHAZcfdj0k`

**Never commit your API key to Git!** Store it securely in:
- `.env` file (local development - ignored by Git)
- Railway environment variables (production)
- Password manager or secrets vault

### Setting Up API Authentication

1. **Generate your API key** (see above)
2. **Add to `.env` file:**
   ```env
   API_KEY=your-generated-api-key-here
   VITE_API_KEY=your-generated-api-key-here
   ```
3. **For production deployment:**
   - Set `API_KEY` in Railway environment variables
   - Set `VITE_API_KEY` to the same value
4. **Never share your API key** with anyone or commit it to Git

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
   
   Edit `.env` and add your configuration:
   ```env
   # Database
   DATABASE_URL=postgresql://user:password@host.neon.tech/reelsmith_tasks?sslmode=require
   
   # API Configuration
   PORT=3000
   NODE_ENV=development
   
   # Security - Generate a secure API key (see Security section)
   API_KEY=your-secure-api-key-here
   VITE_API_KEY=your-secure-api-key-here
   
   # API URL (for frontend)
   VITE_API_URL=http://localhost:3000
   
   # CORS
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

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `DATABASE_URL` | Neon PostgreSQL connection string | Yes | `postgresql://user:pass@host.neon.tech/db` |
| `API_KEY` | Secure API key for authentication | **Yes** | `baYVGJLh9A1Y...` (generate via crypto) |
| `VITE_API_KEY` | Frontend API key (same as API_KEY) | **Yes** | Same as `API_KEY` |
| `VITE_API_URL` | Frontend API endpoint | Yes | `http://localhost:3000` or production URL |
| `PORT` | Backend API port | No | `3000` (default) |
| `NODE_ENV` | Environment mode | No | `development` or `production` |
| `FRONTEND_URL` | Frontend URL for CORS | No | `http://localhost:5173` or `*` for public |

**Security Note:** `API_KEY` and `VITE_API_KEY` must be kept secret. Never commit them to Git or share publicly.

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
