import { Context, Next } from 'hono';

/**
 * API Key Authentication Middleware
 * 
 * Validates API key from request headers (x-api-key or Authorization: Bearer <key>)
 * Returns 401 Unauthorized if API key is missing or invalid
 */
export async function authMiddleware(c: Context, next: Next) {
  // Extract API key from headers
  const apiKey = c.req.header('x-api-key') || c.req.header('Authorization')?.replace('Bearer ', '');
  
  // Get expected API key from environment
  const expectedApiKey = process.env.API_KEY;
  
  // Check if API key is configured
  if (!expectedApiKey) {
    console.error('⚠️  API_KEY environment variable is not set!');
    return c.json({ 
      error: 'Server Configuration Error',
      message: 'API authentication is not properly configured'
    }, 500);
  }
  
  // Validate API key
  if (!apiKey || apiKey !== expectedApiKey) {
    return c.json({ 
      error: 'Unauthorized',
      message: 'Invalid or missing API key. Please provide a valid API key in the x-api-key header or Authorization header.'
    }, 401);
  }
  
  // API key is valid, proceed to next middleware/handler
  await next();
}

/**
 * Optional: Middleware to log API key validation attempts
 * Use only for debugging, disable in production
 */
export async function authLoggerMiddleware(c: Context, next: Next) {
  const apiKey = c.req.header('x-api-key') || c.req.header('Authorization')?.replace('Bearer ', '');
  const path = c.req.path;
  
  if (apiKey) {
    console.log(`🔑 API key provided for ${path}: ${apiKey.substring(0, 8)}...`);
  } else {
    console.log(`🚫 No API key provided for ${path}`);
  }
  
  await next();
}
