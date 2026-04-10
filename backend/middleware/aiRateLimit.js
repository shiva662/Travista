// middleware/aiRateLimit.js
// Basic in-memory rate limiter for AI endpoints, keyed by authenticated user id.

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 25;
const requestStore = new Map();

function aiRateLimit(req, res, next) {
  const userId = req.user?.id;
  const ip = req.headers['x-forwarded-for'] || req.ip || 'unknown-ip';
  const key = userId ? `user:${userId}` : `ip:${String(ip).split(',')[0].trim()}`;

  const now = Date.now();
  const existing = requestStore.get(key);

  if (!existing || now > existing.resetAt) {
    requestStore.set(key, {
      count: 1,
      resetAt: now + WINDOW_MS
    });
    return next();
  }

  if (existing.count >= MAX_REQUESTS) {
    const retryAfterSec = Math.ceil((existing.resetAt - now) / 1000);
    return res.status(429).json({
      message: 'Too many AI requests. Please try again shortly.',
      retryAfterSec
    });
  }

  existing.count += 1;
  requestStore.set(key, existing);
  return next();
}

module.exports = aiRateLimit;
