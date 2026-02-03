import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import * as dotenv from 'dotenv';
import tasksRouter from './routes/tasks.js';
import exportRouter from './routes/export.js';

dotenv.config();

const app = new Hono();

// Middleware
app.use('*', logger());
app.use('*', cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

// Health check
app.get('/', (c) => {
  return c.json({
    status: 'ok',
    message: 'ReelSmith Tasks API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.route('/api/tasks', tasksRouter);
app.route('/api/export', exportRouter);

// Error handling
app.onError((err, c) => {
  console.error('Server error:', err);
  return c.json({
    error: 'Internal Server Error',
    message: err.message,
  }, 500);
});

// 404 handler
app.notFound((c) => {
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
