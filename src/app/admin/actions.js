'use server';
import crypto from 'node:crypto';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { createSession, destroySession, hashPassword, requireUser, verifyPassword } from '@/lib/auth';
import { isCampus } from '@/lib/campuses';
import { can, DONATION_STATUS, ROLES, SENSITIVE_TYPES, STATUS } from '@/lib/crm';
import { clientIp, isEmail, rateLimit } from '@/lib/security';
import { fromInputDateTime } from '@/lib/format';

const str = (fd, k, max = 500) => String(fd.get(k) ?? '').trim().slice(0, max);

/* ---------- Session ---------- */
export async function login(_prev, fd) {
  const email = str(fd, 'email', 200).toLowerCase();
  const password = String(fd.get('password') ?? '');
  const ip = clientIp(await headers());
  if (!rateLimit(`login:${ip}`, 10, 15 * 60_000) || !rateLimit(`login:${email}`, 5, 15 * 60_000)) {
    return { error: 'Trop de tentatives. Réessayez dans 15 minutes.' };
  }
  const user = email ? await db.user.findUnique({ where: { email } }) : null;
  // On vérifie toujours un hash pour ne pas révéler si l'email existe (temps constant)
  const ok = verifyPassword(password, user?.passwordHash || 's1$00$00');
  if (!user || !user.active || !ok) return { error: 'Identifiants incorrects.' };
  await db.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });
  await createSession(user.id);
  redirect('/admin');
}

export async function logout() {
  await destroySession();
  redirect('/admin/login');
}

export async function changePassword(_prev, fd) {
  const user = await requireUser();
  const current = String(fd.get('current') ?? '');
  const next = String(fd.get('next') ?? '');
  if (!verifyPassword(current, user.passwordHash)) return { error: 'Mot de passe actuel incorrect.' };
  if (next.length < 10) return { error: 'Le nouveau mot de passe doit faire au moins 10 caractères.' };
  await db.user.update({ where: { id: user.id }, data: { passwordHash: hashPassword(next) } });
  return { ok: 'Mot de passe mis à jour.' };
}

/* ---------- Demandes ---------- */
export async function updateRequest(fd) {
  const user = await requireUser();
  const id = str(fd, 'id', 40);
  const req = await db.request.findUnique({ where: { id } });
  if (!req || (SENSITIVE_TYPES.has(req.type) && !can.seeSensitive(user))) redirect('/admin/requests');
  const status = str(fd, 'status', 20);
  const assignedToId = str(fd, 'assignedToId', 40) || null;
  await db.request.update({
    where: { id },
    data: { ...(status in STATUS ? { status } : {}), assignedToId, notes: str(fd, 'notes', 4000) || null },
  });
  revalidatePath('/admin/requests');
  redirect(`/admin/requests/${id}?saved=1`);
}

/* ---------- Dons ---------- */
export async function setDonationStatus(fd) {
  await requireUser(can.seeDonations);
  const status = str(fd, 'status', 20);
  if (!(status in DONATION_STATUS)) return;
  await db.donation.update({ where: { id: str(fd, 'id', 40) }, data: { status } });
  revalidatePath('/admin/donations');
}

/* ---------- Abonnés ---------- */
export async function deleteSubscriber(fd) {
  await requireUser(can.manageContent);
  await db.subscriber.delete({ where: { id: str(fd, 'id', 40) } }).catch(() => {});
  revalidatePath('/admin/subscribers');
}

/* ---------- Sermons ---------- */
function sermonData(fd) {
  const title = str(fd, 'title', 200);
  const url = str(fd, 'url', 500);
  const date = new Date(str(fd, 'date', 30));
  if (!title || !url || Number.isNaN(date.getTime())) return null;
  if (!/^https?:\/\//.test(url)) return null;
  return { title, speaker: str(fd, 'speaker', 120) || 'Pasteur Herbert Donald', date, url, audioUrl: str(fd, 'audioUrl', 500) || null, tags: str(fd, 'tags', 200), published: fd.get('published') === 'on' };
}
export async function saveSermon(fd) {
  await requireUser(can.manageContent);
  const data = sermonData(fd);
  const id = str(fd, 'id', 40);
  if (!data) redirect(`/admin/sermons${id ? `/${id}` : '/new'}?error=1`);
  if (id) await db.sermon.update({ where: { id }, data }); else await db.sermon.create({ data });
  revalidatePath('/sermons'); revalidatePath('/admin/sermons');
  redirect('/admin/sermons');
}
export async function deleteSermon(fd) {
  await requireUser(can.manageContent);
  await db.sermon.delete({ where: { id: str(fd, 'id', 40) } }).catch(() => {});
  revalidatePath('/sermons'); revalidatePath('/admin/sermons');
  redirect('/admin/sermons');
}

/* ---------- Événements ---------- */
function eventData(fd) {
  const title = str(fd, 'title', 200);
  const startsAt = fromInputDateTime(str(fd, 'startsAt', 30));
  if (!title || Number.isNaN(startsAt.getTime())) return null;
  return { title, description: str(fd, 'description', 2000) || null, startsAt, location: str(fd, 'location', 200) || null, published: fd.get('published') === 'on' };
}
export async function saveEvent(fd) {
  await requireUser(can.manageContent);
  const data = eventData(fd);
  const id = str(fd, 'id', 40);
  if (!data) redirect(`/admin/events${id ? `/${id}` : '/new'}?error=1`);
  if (id) await db.event.update({ where: { id }, data }); else await db.event.create({ data });
  revalidatePath('/events'); revalidatePath('/admin/events');
  redirect('/admin/events');
}
export async function deleteEvent(fd) {
  await requireUser(can.manageContent);
  await db.event.delete({ where: { id: str(fd, 'id', 40) } }).catch(() => {});
  revalidatePath('/events'); revalidatePath('/admin/events');
  redirect('/admin/events');
}

/* ---------- Cultes & check-in ---------- */
export async function createService(fd) {
  await requireUser(can.manageContent);
  const title = str(fd, 'title', 120) || 'Culte de célébration';
  const date = fromInputDateTime(str(fd, 'date', 30));
  if (Number.isNaN(date.getTime())) redirect('/admin/services?error=1');
  // Code à 4 chiffres unique parmi les cultes ouverts
  let code;
  for (let i = 0; i < 20; i++) {
    code = String(crypto.randomInt(1000, 10000));
    if (!(await db.service.findFirst({ where: { code, open: true } }))) break;
  }
  const campus = isCampus(str(fd, 'campus', 20)) ? str(fd, 'campus', 20) : 'calavi';
  await db.service.create({ data: { title, date, code, campus } });
  revalidatePath('/admin/services');
  redirect('/admin/services');
}
export async function toggleService(fd) {
  await requireUser(can.manageContent);
  const id = str(fd, 'id', 40);
  const s = await db.service.findUnique({ where: { id } });
  if (s) await db.service.update({ where: { id }, data: { open: !s.open } });
  revalidatePath('/admin/services');
}

/* ---------- Utilisateurs ---------- */
export async function createUser(_prev, fd) {
  await requireUser(can.manageUsers);
  const email = str(fd, 'email', 200).toLowerCase();
  const name = str(fd, 'name', 120);
  const role = str(fd, 'role', 20);
  const password = String(fd.get('password') ?? '');
  if (!isEmail(email) || !name || !(role in ROLES)) return { error: 'Nom, email et rôle valides requis.' };
  if (password.length < 10) return { error: 'Mot de passe : 10 caractères minimum.' };
  if (await db.user.findUnique({ where: { email } })) return { error: 'Cet email est déjà utilisé.' };
  await db.user.create({ data: { email, name, role, passwordHash: hashPassword(password) } });
  revalidatePath('/admin/users');
  return { ok: 'Utilisateur créé.' };
}
export async function setUserActive(fd) {
  const me = await requireUser(can.manageUsers);
  const id = str(fd, 'id', 40);
  if (id === me.id) return; // on ne se désactive pas soi-même
  const u = await db.user.findUnique({ where: { id } });
  if (u) await db.user.update({ where: { id }, data: { active: !u.active } });
  revalidatePath('/admin/users');
}
