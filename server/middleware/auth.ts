import { Context, Next } from 'hono';
import { validateSession } from '../routes/auth.js';

/**
 * Session Authentication Middleware
 *
 * Validates session token from Authorization header
 * Returns 401 Unauthorized if token is missing or invalid
 */
export async function authMiddleware(c: Context, next: Next) {
  // Extract token from Authorization header
  const token = c.req.header('Authorization')?.replace('Bearer ', '');

  // Validate token
  if (!token || !validateSession(token)) {
    return c.json({
      error: 'Unauthorized',
      message: 'Please log in to access this resource'
    }, 401);
  }

  // Token is valid, proceed to next middleware/handler
  await next();
}
