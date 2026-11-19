import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { getStudent } from '@/lib/auth';
import { markLesson } from '../../actions';

export const dynamic = 'force-dynamic';

// Transforme un lien YouTube en lien d'intégration ; tout autre lien est refusé (pas d'iframe arbitraire).
function embed(url) {
  try {
    const u = new URL(url);
    let id = null;
    if (u.hostname === 'youtu.be') id = u.pathname.slice(1);
    else if (/(^|\.)youtube\.com$/.test(u.hostname)) id = u.searchParams.get('v') || (u.pathname.startsWith('/embed/') ? u.pathname.split('/')[2] : null);
    return id && /^[\w-]{6,20}$/.test(id) ? `https://www.youtube-nocookie.com/embed/${id}` : null;
  } catch { return null; }
}

export default async function LessonPage({ params }) {
  const { slug, lessonId } = await params;
  const student = await getStudent();
  if (!student) redirect('/lms/login');
  const lesson = await db.lesson.findUnique({ where: { id: lessonId }, include: { course: true } });
  if (!lesson || lesson.course.slug !== slug || !lesson.course.published) notFound();
  const enr = await db.enrollment.findUnique({ where: { studentId_courseId: { studentId: student.id, courseId: lesson.courseId } } });
  if (!enr) redirect(`/lms/${slug}`);
  const done = JSON.parse(enr.done || '[]').includes(lesson.id);
  const src = lesson.videoUrl ? embed(lesson.videoUrl) : null;
  return (
    <section className="section"><div className="container" style={{ maxWidth: 820 }}>
      <p><Link href={`/lms/${slug}`}>← {lesson.course.title}</Link></p>
      <h1 className="h2">{lesson.title}</h1>
      {src && <iframe title={lesson.title} src={src} allow="encrypted-media; picture-in-picture" allowFullScreen style={{ border: 0, width: '100%', aspectRatio: '16 / 9', borderRadius: 14, margin: '1rem 0' }} />}
      {lesson.content.split(/(?:\r?\n){2,}/).filter(Boolean).map((p, i) => <p key={i} className="lead">{p}</p>)}
      <form action={markLesson} className="mt"><input type="hidden" name="lessonId" value={lesson.id} />
        <button className="btn btn-navy">{done ? 'Leçon déjà terminée : continuer' : 'Marquer comme terminée'}</button>
      </form>
    </div></section>
  );
}
