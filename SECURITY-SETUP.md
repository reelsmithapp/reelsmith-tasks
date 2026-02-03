# Security Setup Guide - API Authentication

## Overview

ReelSmith Tasks now uses **API key authentication** to protect all API endpoints. This guide covers:
- Setting up API keys for local development
- Testing authentication
- Deploying with security
- Rotating keys

## 🔐 Quick Start

### 1. Generate API Key

```bash
npm run keygen
```

This will generate a secure random API key like:
```
baYVGJLh9A1YozvSNGToQub3a8LJs1yv-DHAZcfdj0k
```

**⚠️ Save this key securely!** You'll need it for both backend and frontend.

### 2. Configure Environment Variables

Create `.env` file in the project root:

```env
# Database
DATABASE_URL=your_neon_postgresql_url

# API Configuration
PORT=3000
NODE_ENV=development

# Security (CRITICAL)
API_KEY=baYVGJLh9A1YozvSNGToQub3a8LJs1yv-DHAZcfdj0k
VITE_API_KEY=baYVGJLh9A1YozvSNGToQub3a8LJs1yv-DHAZcfdj0k

# API URL
VITE_API_URL=http://localhost:3000

# CORS
FRONTEND_URL=http://localhost:5173
```

**Important:** Both `API_KEY` and `VITE_API_KEY` must have the same value!

### 3. Build and Run

```bash
# Build both frontend and backend
npm run build

# Start the server (serves both API and frontend)
npm start
```

The server will:
- Serve the API at `http://localhost:3000/api/*`
- Serve the frontend at `http://localhost:3000/`
- Require API key for all `/api/*` endpoints
- Allow public access to `/health` endpoint

## 🧪 Testing Authentication

### Test Health Endpoint (Public)

```bash
curl http://localhost:3000/health
```

Expected response (200 OK):
```json
{
  "status": "ok",
  "message": "ReelSmith Tasks API",
  "version": "1.0.0",
  "environment": "development"
}
```

### Test API Without Key (Should Fail)

```bash
curl http://localhost:3000/api/tasks
```

Expected response (401 Unauthorized):
```json
{
  "error": "Unauthorized",
  "message": "Invalid or missing API key. Please provide a valid API key in the x-api-key header or Authorization header."
}
```

### Test API With Valid Key (Should Succeed)

```bash
curl -H "x-api-key: YOUR_API_KEY" http://localhost:3000/api/tasks
```

Expected response (200 OK):
```json
{
  "success": true,
  "data": [...],
  "count": 0
}
```

### Test Creating a Task

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "x-api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test authentication",
    "category": "product",
    "assignee": "Arun",
    "priority": "high",
    "description": "Verify API key authentication works"
  }'
```

### Test Frontend

1. Open http://localhost:3000/ in your browser
2. The frontend should load (served by the backend)
3. Try creating a task - it should work with the API key
4. Open browser console - check for any authentication errors

## 🚀 Production Deployment (Railway)

### 1. Generate Production API Key

```bash
npm run keygen
```

Copy the generated key - you'll use it for both `API_KEY` and `VITE_API_KEY`.

### 2. Set Railway Environment Variables

In Railway dashboard → Variables:

| Variable | Value | Notes |
|----------|-------|-------|
| `DATABASE_URL` | Your Neon PostgreSQL URL | From Neon dashboard |
| `NODE_ENV` | `production` | Required |
| `PORT` | `3000` | Railway auto-assigns |
| `API_KEY` | Generated production key | Keep secret! |
| `VITE_API_KEY` | Same as API_KEY | Must match |
| `VITE_API_URL` | `https://${{RAILWAY_PUBLIC_DOMAIN}}` | Magic variable |
| `FRONTEND_URL` | `*` | For public API |

Or use Railway CLI:

```bash
# Generate key
API_KEY=$(node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))")

# Set variables
railway variables set API_KEY="$API_KEY"
railway variables set VITE_API_KEY="$API_KEY"
railway variables set DATABASE_URL="your_neon_url"
railway variables set NODE_ENV="production"
railway variables set VITE_API_URL='https://${{RAILWAY_PUBLIC_DOMAIN}}'
railway variables set FRONTEND_URL="*"
```

### 3. Deploy

```bash
railway up
```

Or push to GitHub if auto-deploy is enabled.

### 4. Verify Deployment

```bash
# Test health (public)
curl https://your-app.railway.app/health

# Test API without key (should fail)
curl https://your-app.railway.app/api/tasks

# Test API with key (should work)
curl -H "x-api-key: YOUR_PRODUCTION_KEY" https://your-app.railway.app/api/tasks
```

## 🔄 Key Rotation

Rotate API keys every 90 days or if compromised:

### 1. Generate New Key

```bash
npm run keygen
```

### 2. Update Environment Variables

**Local Development:**
Update `.env` file with new key.

**Production (Railway):**
```bash
NEW_KEY="your-new-generated-key"
railway variables set API_KEY="$NEW_KEY"
railway variables set VITE_API_KEY="$NEW_KEY"
```

### 3. Redeploy

Railway automatically redeploys when variables change.

### 4. Update CLI/Automation

If you have any automation scripts or CLI tools using the old key, update them with the new key.

## 🛡️ Security Best Practices

### DO:
✅ Generate keys using cryptographic random (npm run keygen)
✅ Store keys in environment variables only
✅ Use different keys for dev/staging/prod
✅ Store production keys in password manager
✅ Rotate keys every 90 days
✅ Immediately rotate if compromised
✅ Use HTTPS in production (Railway default)

### DON'T:
❌ Commit API keys to Git
❌ Log API keys in application code
❌ Share API keys via email/chat
❌ Use same key across environments
❌ Hardcode keys in source code
❌ Store keys in plain text files

## 📝 Incident Response

If API key is compromised:

1. **Immediately generate new key:**
   ```bash
   npm run keygen
   ```

2. **Update Railway variables:**
   ```bash
   railway variables set API_KEY="NEW_KEY"
   railway variables set VITE_API_KEY="NEW_KEY"
   ```

3. **Redeploy application** (automatic with Railway)

4. **Review logs** for unauthorized access:
   ```bash
   railway logs --filter "401"
   ```

5. **Notify team members** of key rotation

6. **Document incident** for future reference

## 🔍 Monitoring

### Check for Authentication Failures

Railway logs will show 401 errors for failed authentication attempts:

```bash
railway logs --filter "Unauthorized"
```

### Monitor API Usage

Check Railway metrics for:
- Unusual traffic patterns
- High rate of 401 errors
- Requests from unexpected IPs

## 📋 Checklist

### Development Setup
- [ ] Generated API key with `npm run keygen`
- [ ] Created `.env` file with all required variables
- [ ] API_KEY and VITE_API_KEY have same value
- [ ] Tested health endpoint (public)
- [ ] Tested API without key (should fail with 401)
- [ ] Tested API with valid key (should succeed)
- [ ] Frontend loads and can make API calls
- [ ] `.env` is in `.gitignore` (already done)

### Production Deployment
- [ ] Generated new production API key
- [ ] Saved production key in password manager
- [ ] Set all Railway environment variables
- [ ] Deployed to Railway
- [ ] Tested health endpoint
- [ ] Tested API authentication
- [ ] Frontend loads and works correctly
- [ ] Verified CORS configuration

### Ongoing Security
- [ ] API keys rotated within last 90 days
- [ ] No keys committed to Git
- [ ] Production keys stored securely
- [ ] Team members trained on key security
- [ ] Incident response plan documented
- [ ] Logs monitored for anomalies

## 📚 Additional Resources

- **API Documentation:** See `API.md` for detailed endpoint docs
- **Deployment Guide:** See `DEPLOYMENT.md` for Railway setup
- **Main README:** See `README.md` for general information

## 🆘 Troubleshooting

### "Unauthorized" error when making API calls

**Cause:** Missing or invalid API key

**Solution:**
1. Check that API key is set in `.env`
2. Verify API key matches between `API_KEY` and `VITE_API_KEY`
3. Rebuild frontend if key changed: `npm run build:frontend`
4. Restart server: Stop and `npm start`

### "API_KEY environment variable is not set" server error

**Cause:** Backend can't find API_KEY

**Solution:**
1. Check `.env` file exists in project root
2. Verify `API_KEY=...` is in `.env`
3. Restart server to load new environment

### Frontend works but API calls fail

**Cause:** Frontend API key not matching backend

**Solution:**
1. Verify `VITE_API_KEY` matches `API_KEY` in `.env`
2. Rebuild frontend: `npm run build:frontend`
3. Hard refresh browser (Ctrl+Shift+R)

### Railway deployment health check failing

**Cause:** API_KEY not set in Railway variables

**Solution:**
1. Go to Railway dashboard → Variables
2. Add `API_KEY` variable
3. Add `VITE_API_KEY` variable (same value)
4. Redeploy

---

**Document Version:** 1.0.0  
**Last Updated:** February 3, 2025  
**Author:** ReelSmith Development Team
