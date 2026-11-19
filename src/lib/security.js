// Limiteur de débit en mémoire (suffisant pour une instance ; à remplacer par Redis si plusieurs instances).
const buckets = new Map();

export function rateLimit(key, max, windowMs) {
  const now = Date.now();
  const b = (buckets.get(key) || []).filter((t) => now - t < windowMs);
  if (b.length >= max) { buckets.set(key, b); return false; }
  b.push(now);
  buckets.set(key, b);
  if (buckets.size > 5000) {
    for (const [k, v] of buckets) if (!v.some((t) => now - t < windowMs)) buckets.delete(k);
  }
  return true;
}

export function clientIp(headers) {
  return (headers.get('x-forwarded-for') || '').split(',')[0].trim() || headers.get('x-real-ip') || 'local';
}

export function normalizePhone(p) {
  if (!p) return null;
  const s = String(p).trim().replace(/[^\d+]/g, '');
  return s.length >= 7 ? s : null;
}

export const isEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
