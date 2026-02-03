import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { serveStatic } from '@hono/node-server/serve-static';
import * as dotenv from 'dotenv';
import { authMiddleware } from './middleware/auth.js';
import authRouter from './routes/auth.js';
import tasksRouter from './routes/tasks.js';
import exportRouter from './routes/export.js';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = new Hono();

// Middleware
app.use('*', logger());
app.use('*', cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
}));

// Health check (public, no auth required)
app.get('/health', (c) => {
  return c.json({
    status: 'ok',
    message: 'ReelSmith Tasks API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// Auth routes (public, no auth required)
app.route('/api/auth', authRouter);

// Apply auth middleware to all other /api/* routes
app.use('/api/*', authMiddleware);

// Protected API Routes
app.route('/api/tasks', tasksRouter);
app.route('/api/export', exportRouter);

// Serve static frontend files (production build)
const clientDistPath = path.join(__dirname, '../client');

if (existsSync(clientDistPath)) {
  console.log(`📁 Serving static files from: ${clientDistPath}`);
  
  // Serve static assets
  app.use('/*', serveStatic({ 
    root: clientDistPath,
    rewriteRequestPath: (p) => p,
  }));
  
  // SPA fallback - serve index.html for all non-API routes
  app.get('*', serveStatic({ 
    path: './index.html',
    root: clientDistPath,
  }));
} else {
  console.warn(`⚠️  Frontend build not found at ${clientDistPath}`);
  console.warn('   Running in API-only mode. Run `npm run build` to generate frontend.');
  
  // Fallback for development - show message at root
  app.get('/', (c) => {
    return c.json({
      status: 'ok',
      message: 'ReelSmith Tasks API (Frontend not built)',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      hint: 'Run `npm run build` to build and serve the frontend',
    });
  });
}

// Error handling
app.onError((err, c) => {
  console.error('Server error:', err);
  return c.json({
    error: 'Internal Server Error',
    message: err.message,
  }, 500);
});

// 404 handler for API routes
app.notFound((c) => {
  const path = c.req.path;
  
  // If it's an API route, return JSON error
  if (path.startsWith('/api/')) {
    return c.json({
      error: 'Not Found',
      message: 'The requested API endpoint was not found',
    }, 404);
  }
  
  // For frontend routes, let React Router handle it (already handled by SPA fallback)
  return c.json({
    error: 'Not Found',
    message: 'The requested resource was not found',
  }, 404);
});

const port = parseInt(process.env.PORT || '3000');

console.log(`🚀 ReelSmith Tasks API starting on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});

export default app;
