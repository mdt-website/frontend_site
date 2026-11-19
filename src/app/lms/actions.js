'use server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { createStudentSession, destroyStudentSession, getStudent, hashPassword, verifyPassword } from '@/lib/auth';
import { clientIp, isEmail, rateLimit } from '@/lib/security';

const str = (fd, k, max = 200) => String(fd.get(k) ?? '').trim().slice(0, max);

export async function studentSignup(_prev, fd) {
  const ip = clientIp(await headers());
  if (!rateLimit(`signup:${ip}`, 5, 60 * 60_000)) return { error: 'Trop de créations de compte. Réessayez plus tard.' };
  if (str(fd, 'website')) return { error: 'Inscription impossible.' }; // champ piège
  const name = str(fd, 'name', 120);
  const email = str(fd, 'email').toLowerCase();
  const password = String(fd.get('password') ?? '');
  if (!name || !isEmail(email)) return { error: 'Nom et email valides requis.' };
  if (password.length < 8) return { error: 'Mot de passe : 8 caractères minimum.' };
  if (await db.student.findUnique({ where: { email } })) return { error: 'Un compte existe déjà avec cet email.' };
  const s = await db.student.create({ data: { name, email, passwordHash: hashPassword(password) } });
  await createStudentSession(s.id);
  redirect('/lms');
}

export async function studentLogin(_prev, fd) {
  const email = str(fd, 'email').toLowerCase();
  const password = String(fd.get('password') ?? '');
  const ip = clientIp(await headers());
  if (!rateLimit(`slogin:${ip}`, 10, 15 * 60_000) || !rateLimit(`slogin:${email}`, 5, 15 * 60_000)) return { error: 'Trop de tentatives. Réessayez dans 15 minutes.' };
  const s = email ? await db.student.findUnique({ where: { email } }) : null;
  const ok = verifyPassword(password, s?.passwordHash || 's1$00$00');
  if (!s || !ok) return { error: 'Identifiants incorrects.' };
  await createStudentSession(s.id);
  redirect('/lms');
}

export async function studentLogout() {
  await destroyStudentSession();
  redirect('/lms');
}

export async function enroll(fd) {
  const s = await getStudent();
  if (!s) redirect('/lms/login');
  const course = await db.course.findFirst({ where: { id: str(fd, 'courseId', 40), published: true } });
  if (!course) redirect('/lms');
  await db.enrollment.upsert({ where: { studentId_courseId: { studentId: s.id, courseId: course.id } }, update: {}, create: { studentId: s.id, courseId: course.id } });
  redirect(`/lms/${course.slug}`);
}

export async function markLesson(fd) {
  const s = await getStudent();
  if (!s) redirect('/lms/login');
  const lesson = await db.lesson.findUnique({ where: { id: str(fd, 'lessonId', 40) }, include: { course: { include: { lessons: true } } } });
  if (!lesson || !lesson.course.published) redirect('/lms');
  const enr = await db.enrollment.findUnique({ where: { studentId_courseId: { studentId: s.id, courseId: lesson.courseId } } });
  if (!enr) redirect(`/lms/${lesson.course.slug}`);
  const done = new Set(JSON.parse(enr.done || '[]'));
  done.add(lesson.id);
  const total = lesson.course.lessons.length;
  const finished = lesson.course.lessons.every((l) => done.has(l.id));
  await db.enrollment.update({ where: { id: enr.id }, data: { done: JSON.stringify([...done]), completedAt: finished && total > 0 ? enr.completedAt || new Date() : null } });
  revalidatePath(`/lms/${lesson.course.slug}`);
  const ordered = [...lesson.course.lessons].sort((a, b) => a.position - b.position);
  const next = ordered[ordered.findIndex((l) => l.id === lesson.id) + 1];
  redirect(next ? `/lms/${lesson.course.slug}/${next.id}` : `/lms/${lesson.course.slug}`);
}
