# Deployment Guide - ReelSmith Tasks

Complete guide for deploying ReelSmith Tasks to Railway with Neon PostgreSQL.

## Prerequisites

- [Railway Account](https://railway.app) (free tier available)
- [Neon Account](https://neon.tech) (Arun has paid subscription)
- GitHub repository with code
- Railway CLI (optional but recommended)

## Architecture

```
┌─────────────────┐
│   Railway       │
│  (Web Service)  │
│                 │
│  Frontend +     │
│  Backend API    │
└────────┬────────┘
         │
         │ DATABASE_URL
         │
         ▼
┌─────────────────┐
│   Neon DB       │
│  (PostgreSQL)   │
│                 │
│  Serverless     │
│  Auto-scaling   │
└─────────────────┘
```

## Step 1: Set Up Neon Database

### 1.1 Create Neon Project

1. Log into [Neon Console](https://console.neon.tech)
2. Click **"Create a project"**
3. **Project Name**: `reelsmith-tasks`
4. **Region**: Choose closest to your users (e.g., US East, EU West)
5. **PostgreSQL Version**: 16 (latest)
6. Click **"Create project"**

### 1.2 Get Connection String

1. In your Neon project dashboard, click **"Connection Details"**
2. Copy the **Connection String**:
   ```
   postgresql://username:password@ep-cool-pond-123456.us-east-1.aws.neon.tech/reelsmith_tasks?sslmode=require
   ```
3. Save this - you'll need it for Railway

### 1.3 Configure Database

Neon automatically:
- Creates the database
- Configures SSL
- Sets up connection pooling
- Enables auto-scaling

**No additional configuration needed!**

## Step 2: Prepare Code for Deployment

### 2.1 Verify Build Configuration

Ensure these files exist:

**package.json** - Check scripts:
```json
{
  "scripts": {
    "build": "npm run build:frontend && npm run build:api",
    "build:frontend": "tsc && vite build",
    "build:api": "tsc -p tsconfig.server.json",
    "start": "node dist/server/index.js"
  }
}
```

**railway.json**:
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm run build"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

**nixpacks.toml**:
```toml
[phases.setup]
nixPkgs = ["nodejs_20", "npm"]

[phases.install]
cmds = ["npm ci"]

[phases.build]
cmds = ["npm run build"]

[start]
cmd = "npm start"
```

### 2.2 Push to GitHub

```bash
git add .
git commit -m "Prepare for Railway deployment"
git push origin main
```

## Step 3: Deploy to Railway

### Option A: Railway Dashboard (Recommended for First Deploy)

#### 3.1 Create New Project

1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Authorize Railway to access your GitHub
5. Select **`reelsmithapp/reelsmith-tasks`** repository
6. Railway will automatically detect the configuration

#### 3.2 Generate Secure API Key

**CRITICAL STEP** - Generate a secure API key before deployment:

```bash
# Generate a secure random API key
node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
```

Example output: `baYVGJLh9A1YozvSNGToQub3a8LJs1yv-DHAZcfdj0k`

**⚠️ IMPORTANT:**
- Copy this key and store it securely (password manager)
- Never commit this key to Git
- Use a different key for production vs development
- This key authenticates all API requests

#### 3.3 Configure Environment Variables

1. In your Railway project, click on your service
2. Go to **"Variables"** tab
3. Add these variables:

| Variable | Value | Notes |
|----------|-------|-------|
| `DATABASE_URL` | Your Neon connection string | From Step 1.2 |
| `NODE_ENV` | `production` | Required |
| `PORT` | `3000` | Railway auto-assigns if not set |
| `API_KEY` | Generated secure key | **CRITICAL - Keep secret!** |
| `VITE_API_KEY` | Same as API_KEY | Frontend needs same key |
| `VITE_API_URL` | `https://${{RAILWAY_PUBLIC_DOMAIN}}` | API endpoint for frontend |
| `FRONTEND_URL` | `*` or specific domain | CORS configuration |

**Important**: Use Railway's magic variable for `VITE_API_URL`:
```
https://${{RAILWAY_PUBLIC_DOMAIN}}
```

This automatically resolves to your Railway public URL.

**Security Notes:**
- `API_KEY` protects your API from unauthorized access
- Both backend (`API_KEY`) and frontend (`VITE_API_KEY`) must have the same value
- Never expose `API_KEY` in client-side code or logs
- `FRONTEND_URL` can be `*` for public access or specific domains for restricted access

#### 3.4 Deploy

1. Railway automatically builds and deploys on push
2. Wait for deployment to complete (usually 2-5 minutes)
3. Railway provides a public URL like:
   ```
   https://reelsmith-tasks-production.up.railway.app
   ```

### Option B: Railway CLI (Advanced)

#### 3.1 Install Railway CLI

```bash
npm install -g @railway/cli
```

#### 3.2 Login

```bash
railway login
```

#### 3.3 Initialize Project

```bash
# In your project directory
railway init
```

Choose:
- Create new project
- Name: `reelsmith-tasks`

#### 3.4 Link to GitHub

```bash
railway link
```

#### 3.5 Set Environment Variables

```bash
# Generate secure API key first
API_KEY=$(node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))")
echo "Generated API Key: $API_KEY"
echo "⚠️  Save this key securely!"

# Set database URL
railway variables set DATABASE_URL="postgresql://..."

# Set environment
railway variables set NODE_ENV=production

# Set port
railway variables set PORT=3000

# Set API keys (CRITICAL for security)
railway variables set API_KEY="$API_KEY"
railway variables set VITE_API_KEY="$API_KEY"

# Frontend URL (use magic variable)
railway variables set FRONTEND_URL='*'
railway variables set VITE_API_URL='https://${{RAILWAY_PUBLIC_DOMAIN}}'
```

**⚠️ Security Warning:**
- Save the generated `API_KEY` in a password manager
- Never commit this key to Git
- Use a different key for each environment (dev/staging/prod)

#### 3.6 Deploy

```bash
railway up
```

## Step 4: Initialize Database Schema

After first deployment, initialize the database:

### Option 1: Using Railway Shell

1. In Railway dashboard, open your service
2. Click **"Shell"** (or use `railway run bash`)
3. Run:
   ```bash
   npm run db:push
   ```

### Option 2: Local Migration

```bash
# Set DATABASE_URL to production database
export DATABASE_URL="your_neon_production_url"

# Push schema
npm run db:push
```

**⚠️ Warning**: Be careful running this against production database.

## Step 5: Verify Deployment

### 5.1 Check Health (Public Endpoint)

The health endpoint is publicly accessible without authentication:

```bash
curl https://your-railway-app.railway.app/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "ReelSmith Tasks API",
  "version": "1.0.0",
  "timestamp": "2024-01-15T10:00:00.000Z",
  "environment": "production"
}
```

### 5.2 Test API Authentication

**Test without API key (should fail):**
```bash
curl https://your-railway-app.railway.app/api/tasks
```

Expected response (401 Unauthorized):
```json
{
  "error": "Unauthorized",
  "message": "Invalid or missing API key. Please provide a valid API key in the x-api-key header or Authorization header."
}
```

**Test with valid API key (should succeed):**
```bash
# Replace YOUR_API_KEY with your actual key
curl -H "x-api-key: YOUR_API_KEY" https://your-railway-app.railway.app/api/tasks
```

Expected response (200 OK):
```json
{
  "success": true,
  "data": [],
  "count": 0
}
```

### 5.3 Test API Operations

All API operations require the API key:

```bash
# Get all tasks
curl -H "x-api-key: YOUR_API_KEY" \
  https://your-railway-app.railway.app/api/tasks

# Create a test task
curl -X POST https://your-railway-app.railway.app/api/tasks \
  -H "x-api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test deployment",
    "category": "product",
    "assignee": "Arun",
    "priority": "low",
    "description": "Verify API authentication works"
  }'
```

Expected response:
```json
{
  "success": true,
  "data": {
    "id": "...",
    "title": "Test deployment",
    ...
  },
  "message": "Task created successfully"
}
```

### 5.3 Test Frontend

1. Open your Railway URL in browser
2. Verify the UI loads
3. Create a test task
4. Try drag & drop
5. Test filtering
6. Verify data persists after refresh

## Step 6: Configure Custom Domain (Optional)

### 6.1 Add Domain in Railway

1. In Railway service settings
2. Go to **"Settings"** → **"Domains"**
3. Click **"Add Domain"**
4. Enter your custom domain: `tasks.reelsmith.app`

### 6.2 Update DNS

Add CNAME record in your DNS provider:
```
tasks.reelsmith.app → your-railway-app.railway.app
```

### 6.3 Update Environment Variables

```bash
railway variables set FRONTEND_URL=https://tasks.reelsmith.app
railway variables set VITE_API_URL=https://tasks.reelsmith.app
```

### 6.4 Redeploy

Railway automatically redeploys when variables change.

## Step 7: Set Up Monitoring

### 7.1 Railway Observability

Railway provides built-in monitoring:
- **Metrics**: CPU, Memory, Network usage
- **Logs**: Real-time application logs
- **Deployments**: Deployment history

Access in Railway dashboard → Your service → **"Observability"**

### 7.2 Application Logs

View logs:
```bash
railway logs
```

Or in Railway dashboard → **"Logs"** tab

### 7.3 Health Checks

Railway automatically monitors your service health via HTTP.

Configure healthcheck endpoint (already implemented):
- Path: `/`
- Expected status: `200 OK`

## Step 8: Continuous Deployment

### Automatic Deployments

Railway automatically deploys on:
- Push to `main` branch
- Pull request merge
- Manual trigger

### Deploy Triggers

Configure in Railway dashboard:
- **Settings** → **"Service"**
- **Deploy Trigger**: Choose branches to auto-deploy

### Rollback

If deployment fails:
1. Go to Railway dashboard → **"Deployments"**
2. Find previous successful deployment
3. Click **"Redeploy"**

## Troubleshooting

### Build Fails

**Check build logs:**
```bash
railway logs --deployment
```

**Common issues:**
- TypeScript errors: Fix in code and push
- Missing dependencies: Check `package.json`
- Build command failed: Verify `npm run build` works locally

### Database Connection Issues

**Verify connection string:**
```bash
railway variables get DATABASE_URL
```

**Test connection:**
```bash
railway run bash
psql $DATABASE_URL
```

**Common issues:**
- Missing `?sslmode=require` in connection string
- IP allowlist (not needed for Neon serverless)
- Connection pooling limits (check Neon dashboard)

### CORS Errors

**Verify FRONTEND_URL:**
```bash
railway variables get FRONTEND_URL
```

**Should match your Railway public domain.**

**Update if needed:**
```bash
railway variables set FRONTEND_URL='https://${{RAILWAY_PUBLIC_DOMAIN}}'
```

### 502 Bad Gateway

**Possible causes:**
- Server not listening on correct port
- Application crashed on startup
- Health check failing

**Check logs:**
```bash
railway logs
```

**Verify PORT variable:**
```bash
railway variables get PORT
```

### Out of Memory

**Railway provides:**
- Free tier: 512MB RAM
- Hobby: 8GB RAM

**Check usage:**
- Railway dashboard → **"Metrics"**

**Optimize if needed:**
- Reduce concurrent connections
- Add database connection pooling
- Optimize queries

## Maintenance

### Update Dependencies

```bash
# Update packages
npm update

# Test locally
npm run build
npm start

# Push to GitHub (triggers deploy)
git add package.json package-lock.json
git commit -m "Update dependencies"
git push
```

### Database Backups

Neon automatically backs up your database:
- **Point-in-time recovery**: Up to 7 days (free tier)
- **Branch protection**: Create branches for staging

**Manual backup:**
```bash
# Export database
pg_dump $DATABASE_URL > backup.sql

# Or use Railway CLI
railway run bash
pg_dump $DATABASE_URL > backup.sql
```

### Scale Up

**Vertical scaling (Railway):**
- Upgrade plan for more resources
- Settings → **"Service"** → **"Plan"**

**Database scaling (Neon):**
- Automatic with Neon serverless
- Scales from 0 to max compute based on load

## Cost Estimates

### Free Tier

**Railway:**
- $5 free credits per month
- 512MB RAM
- Shared CPU
- Covers development/testing

**Neon:**
- 10GB storage
- Always-available compute
- Suitable for production

### Paid Plans

**Railway Hobby ($5/month):**
- 8GB RAM
- More CPU
- Custom domains
- Better for production

**Neon Pro (Arun has this):**
- Auto-scaling compute
- More storage
- Point-in-time recovery
- Production-ready

**Estimated monthly cost:**
- Railway: $5-10/month
- Neon: Included in Arun's subscription
- **Total: ~$5-10/month**

## 🔒 Security Best Practices

### API Key Security (CRITICAL)

1. **Generate Strong Keys**: Always use cryptographic random generation
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
   ```

2. **Never Commit Keys**: 
   - Add `.env` to `.gitignore` (already done)
   - Never hardcode API keys in code
   - Don't log API keys in application logs

3. **Rotate Keys Periodically**:
   - Change API keys every 90 days
   - Immediately rotate if compromised
   - Update in Railway variables and notify users

4. **Use Different Keys Per Environment**:
   - Development: One key (can be shared with team)
   - Staging: Different key
   - Production: Unique, highly secure key

5. **Access Control**:
   - Only share API keys with authorized team members
   - Store in password manager (1Password, LastPass, etc.)
   - Revoke access when team members leave

### Deployment Security

1. **Environment Variables**: 
   - Store all secrets in Railway variables (encrypted at rest)
   - Never commit `.env` files to Git
   - Use Railway's secret management

2. **Database Security**:
   - Enable SSL connections (Neon default)
   - Use read-only users for analytics
   - Regular backups (Neon automatic)
   - Never expose `DATABASE_URL` publicly

3. **CORS Configuration**:
   - Development: Allow `http://localhost:5173`
   - Production: Set to specific domain or `*` for public API
   - Don't use `*` if handling sensitive data

4. **HTTPS**:
   - Railway provides free SSL certificates
   - Always use HTTPS in production
   - Enable HSTS headers (Railway default)

5. **Monitoring**:
   - Monitor for unusual API activity
   - Set up alerts for failed authentication attempts
   - Review Railway logs regularly

### Response to Security Incident

If API key is compromised:

1. **Immediately generate new key**:
   ```bash
   NEW_KEY=$(node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))")
   railway variables set API_KEY="$NEW_KEY"
   railway variables set VITE_API_KEY="$NEW_KEY"
   ```

2. **Redeploy application** (automatic with Railway)

3. **Notify authorized users** of new key

4. **Review logs** for unauthorized access

5. **Update documentation** with new security measures

### Regular Security Checklist

- [ ] API keys rotated within last 90 days
- [ ] No API keys in Git history
- [ ] Environment variables are up to date
- [ ] Database backups are working
- [ ] Railway logs reviewed for anomalies
- [ ] CORS configuration is correct
- [ ] All team members using secure storage for keys
- [ ] Inactive team member access revoked

## Support

**Railway:**
- [Railway Docs](https://docs.railway.app)
- [Railway Discord](https://discord.gg/railway)

**Neon:**
- [Neon Docs](https://neon.tech/docs)
- [Neon Discord](https://discord.gg/neon)

**ReelSmith:**
- GitHub Issues: https://github.com/reelsmithapp/reelsmith-tasks/issues
- Email: reelsmith.app@gmail.com

---

## Quick Reference

### Essential Commands

```bash
# Deploy
railway up

# View logs
railway logs

# Open shell
railway run bash

# Set variable
railway variables set KEY=value

# Get variable
railway variables get KEY

# Redeploy
railway redeploy

# Connect to database
railway run psql $DATABASE_URL
```

### Environment Variables Checklist

- [ ] `DATABASE_URL` - Neon connection string
- [ ] `NODE_ENV` - Set to `production`
- [ ] `PORT` - Set to `3000`
- [ ] `API_KEY` - **Generated secure random key (CRITICAL)**
- [ ] `VITE_API_KEY` - **Same as API_KEY (CRITICAL)**
- [ ] `VITE_API_URL` - Railway public domain or `https://${{RAILWAY_PUBLIC_DOMAIN}}`
- [ ] `FRONTEND_URL` - `*` or specific allowed origins

**Security Reminder:** Generate API key with:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
```

---

**Deployment Date**: 2024-01-15  
**Last Updated**: 2024-01-15  
**Version**: 1.0.0
