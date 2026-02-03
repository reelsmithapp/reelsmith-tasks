import { Hono } from 'hono';
import * as dotenv from 'dotenv';
import * as crypto from 'crypto';

// Load env before accessing process.env
dotenv.config();

const authRouter = new Hono();

// Secret for signing tokens (use AUTH_SECRET from env or generate one)
const AUTH_SECRET = process.env.AUTH_SECRET || 'reelsmith-tasks-secret-key-change-in-production';

// Token expiration: 24 hours
const TOKEN_EXPIRY_MS = 24 * 60 * 60 * 1000;

// Create a simple signed token
function createToken(username: string): string {
  const expiresAt = Date.now() + TOKEN_EXPIRY_MS;
  const payload = JSON.stringify({ username, expiresAt });
  const signature = crypto
    .createHmac('sha256', AUTH_SECRET)
    .update(payload)
    .digest('hex');

  // Base64 encode the payload and append signature
  const encodedPayload = Buffer.from(payload).toString('base64');
  return `${encodedPayload}.${signature}`;
}

// Verify and decode a token
function verifyToken(token: string): { username: string; expiresAt: number } | null {
  try {
    const [encodedPayload, signature] = token.split('.');
    if (!encodedPayload || !signature) return null;

    const payload = Buffer.from(encodedPayload, 'base64').toString('utf8');

    // Verify signature
    const expectedSignature = crypto
      .createHmac('sha256', AUTH_SECRET)
      .update(payload)
      .digest('hex');

    if (signature !== expectedSignature) return null;

    const data = JSON.parse(payload);

    // Check expiration
    if (data.expiresAt < Date.now()) return null;

    return data;
  } catch {
    return null;
  }
}

// Login endpoint
authRouter.post('/login', async (c) => {
  const body = await c.req.json();
  const { username, password } = body;

  // Get credentials from environment
  const validUsername = process.env.AUTH_USERNAME || 'admin';
  const validPassword = process.env.AUTH_PASSWORD || 'admin123';

  if (username === validUsername && password === validPassword) {
    const token = createToken(username);
    const expiresAt = Date.now() + TOKEN_EXPIRY_MS;

    return c.json({
      success: true,
      token,
      username,
      expiresAt,
    });
  }

  return c.json({
    success: false,
    error: 'Invalid username or password',
  }, 401);
});

// Logout endpoint
authRouter.post('/logout', async (c) => {
  // With signed tokens, logout just happens on the client side
  // by removing the token from localStorage
  return c.json({ success: true });
});

// Verify token endpoint
authRouter.get('/verify', async (c) => {
  const token = c.req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return c.json({ valid: false }, 401);
  }

  const data = verifyToken(token);

  if (!data) {
    return c.json({ valid: false }, 401);
  }

  return c.json({
    valid: true,
    username: data.username
  });
});

// Export session validation for middleware
export function validateSession(token: string): boolean {
  return verifyToken(token) !== null;
}

export default authRouter;
