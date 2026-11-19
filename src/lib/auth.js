import 'server-only';
import crypto from 'node:crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { db } from './db';

const COOKIE = 'mdt_session';
const TTL_MS = 7 * 24 * 3600 * 1000;

function secret() {
  const s = process.env.SESSION_SECRET;
  if (!s || s.length < 32) throw new Error('SESSION_SECRET manquant ou trop court (32 caractères minimum). Lancez : npm run db:setup');
  return s;
}
const b64 = (b) => Buffer.from(b).toString('base64url');
const sign = (data) => crypto.createHmac('sha256', secret()).update(data).digest('base64url');

export { hashPassword, verifyPassword } from './password';

export async function createSession(userId) {
  const payload = b64(JSON.stringify({ uid: userId, exp: Date.now() + TTL_MS }));
  const jar = await cookies();
  jar.set(COOKIE, `${payload}.${sign(payload)}`, {
    httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: TTL_MS / 1000,
  });
}

export async function destroySession() {
  (await cookies()).delete(COOKIE);
}

export async function getUser() {
  const raw = (await cookies()).get(COOKIE)?.value;
  if (!raw) return null;
  const [payload, sig] = raw.split('.');
  if (!payload || !sig) return null;
  const good = sign(payload);
  if (sig.length !== good.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(good))) return null;
  let data;
  try { data = JSON.parse(Buffer.from(payload, 'base64url').toString()); } catch { return null; }
  if (!data.exp || data.exp < Date.now()) return null;
  const user = await db.user.findUnique({ where: { id: data.uid } });
  return user && user.active ? user : null;
}

// À appeler en tête de chaque page / action du back-office.
export async function requireUser(check) {
  const user = await getUser();
  if (!user) redirect('/admin/login');
  if (check && !check(user)) redirect('/admin?denied=1');
  return user;
}
