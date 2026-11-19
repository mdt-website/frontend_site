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

/* ---------- Formation (LMS) ---------- */
const slugify = (t) => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60);
const RESERVED_SLUGS = new Set(['login']);

export async function saveCourse(fd) {
  await requireUser(can.manageContent);
  const title = str(fd, 'title', 160);
  const id = str(fd, 'id', 40);
  const slug = slugify(str(fd, 'slug', 80) || title);
  if (!title || !slug || RESERVED_SLUGS.has(slug)) redirect(`/admin/courses${id ? `/${id}` : ''}?error=1`);
  const data = { title, slug, description: str(fd, 'description', 1000), published: fd.get('published') === 'on', position: parseInt(str(fd, 'position', 5), 10) || 0 };
  try {
    if (id) await db.course.update({ where: { id }, data }); else { const c = await db.course.create({ data }); revalidatePath('/lms'); redirect(`/admin/courses/${c.id}`); }
  } catch (e) {
    if (e?.digest?.startsWith?.('NEXT_REDIRECT')) throw e;
    redirect(`/admin/courses${id ? `/${id}` : ''}?error=1`); // slug déjà utilisé
  }
  revalidatePath('/lms'); revalidatePath('/admin/courses');
  redirect(`/admin/courses/${id}?saved=1`);
}
export async function deleteCourse(fd) {
  await requireUser(can.manageContent);
  await db.course.delete({ where: { id: str(fd, 'id', 40) } }).catch(() => {});
  revalidatePath('/lms');
  redirect('/admin/courses');
}
export async function saveLesson(fd) {
  await requireUser(can.manageContent);
  const courseId = str(fd, 'courseId', 40);
  const id = str(fd, 'id', 40);
  const title = str(fd, 'title', 160);
  if (!title) redirect(`/admin/courses/${courseId}?error=1`);
  const data = { title, videoUrl: str(fd, 'videoUrl', 500) || null, content: str(fd, 'content', 20000), position: parseInt(str(fd, 'position', 5), 10) || 0 };
  if (id) await db.lesson.update({ where: { id }, data }); else await db.lesson.create({ data: { ...data, courseId } });
  revalidatePath('/lms');
  redirect(`/admin/courses/${courseId}?saved=1`);
}
export async function deleteLesson(fd) {
  await requireUser(can.manageContent);
  const l = await db.lesson.findUnique({ where: { id: str(fd, 'id', 40) } });
  if (l) await db.lesson.delete({ where: { id: l.id } });
  revalidatePath('/lms');
  redirect(`/admin/courses/${l?.courseId ?? ''}`);
}

/* ---------- Certificats ---------- */
const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const newCode = () => Array.from(crypto.randomBytes(10), (b) => CODE_ALPHABET[b % CODE_ALPHABET.length]).join('');

export async function issueCertificates(_prev, fd) {
  await requireUser(can.manageContent);
  const title = str(fd, 'title', 160);
  const issuedOn = new Date(str(fd, 'issuedOn', 30));
  const sender = str(fd, 'sender', 120) || null;
  const subject = str(fd, 'subject', 160) || `Votre certificat : ${title}`;
  if (!title || Number.isNaN(issuedOn.getTime())) return { error: 'Intitulé et date requis.' };

  // Destinataires : cases cochées (parcours terminés) + lignes « Nom, email » saisies à la main
  const people = [];
  for (const id of fd.getAll('enrollment')) {
    const e = await db.enrollment.findUnique({ where: { id: String(id) }, include: { student: true } });
    if (e) people.push({ name: e.student.name, email: e.student.email });
  }
  for (const line of String(fd.get('manual') ?? '').split('\n').slice(0, 300)) {
    const [name, email] = line.split(/[,;\t]/).map((x) => x.trim());
    if (name) people.push({ name: name.slice(0, 120), email: email && isEmail(email.toLowerCase()) ? email.toLowerCase() : null });
  }
  if (!people.length) return { error: 'Aucun destinataire.' };
  if (people.length > 300) return { error: '300 destinataires maximum par lot.' };

  const base = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3100').replace(/\/$/, '');
  const results = [];
  for (const p of people) {
    const cert = await db.certificate.create({ data: { code: newCode(), name: p.name, email: p.email, title, issuedOn, sender } });
    const link = `${base}/certificat/${cert.code}`;
    let status = 'Émis (pas d’email)';
    if (p.email) {
      const { sendMail, mailEnabled } = await import('@/lib/mail');
      if (mailEnabled()) {
        const r = await sendMail({ to: p.email, subject, text: `Bonjour ${p.name},\n\nFélicitations. Votre certificat « ${title} » est disponible ici :\n${link}\n\nLa Maison de la Transformation` });
        status = r.sent ? 'Envoyé' : `Échec : ${r.reason}`;
        if (r.sent) await db.certificate.update({ where: { id: cert.id }, data: { sentAt: new Date() } });
      } else status = 'Émis (SMTP non configuré)';
    }
    results.push({ name: p.name, email: p.email, link, status });
  }
  return { ok: `${results.length} certificat(s) émis.`, results };
}
