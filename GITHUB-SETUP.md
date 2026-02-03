# GitHub Setup Instructions

This guide will help you push the ReelSmith Kanban board to GitHub under the `reelsmithapp` organization.

## Prerequisites

- GitHub account with access to `reelsmithapp` organization
- Git configured locally
- SSH key or personal access token set up for GitHub

## Step 1: Create Repository on GitHub

### Option A: Via GitHub Website

1. Go to https://github.com/organizations/reelsmithapp/repositories/new
2. Repository name: `reelsmith-kanban`
3. Description: `Professional Kanban board for ReelSmith task management`
4. Visibility: **Private** (recommended) or Public
5. **Do NOT initialize** with README, .gitignore, or license (we already have these)
6. Click "Create repository"

### Option B: Via GitHub CLI

```bash
gh repo create reelsmithapp/reelsmith-kanban \
  --private \
  --description "Professional Kanban board for ReelSmith task management"
```

## Step 2: Configure Git Remote

From the project directory (`/Users/arun/.openclaw/workspace/reelsmith-kanban/`):

```bash
# Add the GitHub remote
git remote add origin git@github.com-reelsmith:reelsmithapp/reelsmith-kanban.git

# Or if using HTTPS:
# git remote add origin https://github.com/reelsmithapp/reelsmith-kanban.git

# Verify remote was added
git remote -v
```

## Step 3: Push to GitHub

```bash
# Push the main branch
git push -u origin main

# Push tags (if any)
git push --tags
```

## Step 4: Configure Repository Settings

### Enable GitHub Pages (Optional)

If you want to deploy the app via GitHub Pages:

1. Go to repository Settings → Pages
2. Source: Deploy from a branch
3. Branch: `gh-pages` (you'll need to set this up separately)
4. Or use Vercel/Netlify for easier deployment

### Set Repository Description and Topics

Add topics to make the repository discoverable:
- `kanban-board`
- `task-management`
- `react`
- `typescript`
- `reelsmith`
- `productivity`

### Enable Features

- ✅ Issues (for bug tracking)
- ✅ Projects (optional)
- ❌ Wiki (unless needed)
- ❌ Discussions (unless needed)

### Branch Protection Rules (Recommended)

Protect the `main` branch:

1. Settings → Branches → Add rule
2. Branch name pattern: `main`
3. Enable:
   - ✅ Require pull request reviews before merging
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
   - ✅ Include administrators

## Step 5: Set Up Continuous Deployment (Optional)

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel
```

Follow prompts to link to GitHub repository.

### Deploy to Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Initialize
netlify init
```

Or simply:
1. Go to https://app.netlify.com/
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub and select `reelsmithapp/reelsmith-kanban`
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

## Project URLs

After setup, update these in your documentation:

- **Repository**: `https://github.com/reelsmithapp/reelsmith-kanban`
- **Live Demo**: `https://reelsmith-kanban.vercel.app` (or your chosen domain)
- **Issues**: `https://github.com/reelsmithapp/reelsmith-kanban/issues`

## Updating README.md

After deployment, update the badges in README.md:

```markdown
![GitHub Repo](https://img.shields.io/github/stars/reelsmithapp/reelsmith-kanban?style=social)
![GitHub Issues](https://img.shields.io/github/issues/reelsmithapp/reelsmith-kanban)
![Last Commit](https://img.shields.io/github/last-commit/reelsmithapp/reelsmith-kanban)
```

## Team Access

Add team members to the repository:

1. Settings → Collaborators and teams
2. Add `reelsmithapp` organization members
3. Set appropriate permissions:
   - **Admin**: Arun (full access)
   - **Write**: Team members who can push
   - **Read**: View-only access

## Future Development Workflow

### Creating a New Feature

```bash
# Create a feature branch
git checkout -b feature/new-feature-name

# Make changes, commit
git add .
git commit -m "Add new feature"

# Push to GitHub
git push origin feature/new-feature-name

# Create pull request on GitHub
# Merge after review
```

### Keeping Local Repo in Sync

```bash
# Fetch and merge changes
git pull origin main

# Or fetch and rebase
git pull --rebase origin main
```

## Backup Strategy

The repository is now backed up on GitHub, but also consider:

1. **Local backups**: The workspace already has files
2. **Exported data**: Users can export tasks as JSON/Markdown
3. **Tags/Releases**: Create version tags for milestones

```bash
# Create a version tag
git tag -a v1.0.0 -m "Initial production release"
git push origin v1.0.0
```

## Environment Variables

Currently, this app doesn't require environment variables (uses localStorage).

If you add backend integration later, create a `.env.example`:

```env
VITE_API_URL=https://api.reelsmith.app
VITE_AUTH_TOKEN=your_token_here
```

And add `.env` to `.gitignore`.

## Troubleshooting

### SSH Key Issues

If you're using the `github.com-reelsmith` SSH alias:

```bash
# Verify SSH config (~/.ssh/config)
Host github.com-reelsmith
  HostName github.com
  User git
  IdentityFile ~/.ssh/reelsmith_github

# Test connection
ssh -T git@github.com-reelsmith
```

### Permission Denied

Ensure you have write access to the `reelsmithapp` organization.

### Branch Protection Errors

If you can't push directly to `main`, create a feature branch and PR instead.

---

## Quick Reference Commands

```bash
# Clone repository
git clone git@github.com-reelsmith:reelsmithapp/reelsmith-kanban.git

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to Vercel
vercel

# Deploy to Netlify
netlify deploy --prod
```

---

**🎬 ReelSmith Kanban is now ready for production use!**

For questions or issues, contact:
- **Arun** (Founder)
- **Arc** (AI Assistant)
