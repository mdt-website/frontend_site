import Link from 'next/link';
import { notFound } from 'next/navigation';
import Hero from '@/components/Hero';
import { db } from '@/lib/db';
import { getStudent } from '@/lib/auth';
import { enroll } from '../actions';

export const dynamic = 'force-dynamic';

export default async function CoursePage({ params }) {
  const { slug } = await params;
  const course = await db.course.findFirst({ where: { slug, published: true }, include: { lessons: { orderBy: { position: 'asc' } } } });
  if (!course) notFound();
  const student = await getStudent();
  const enr = student ? await db.enrollment.findUnique({ where: { studentId_courseId: { studentId: student.id, courseId: course.id } } }) : null;
  const done = new Set(enr ? JSON.parse(enr.done || '[]') : []);
  return (
    <>
      <Hero eyebrow="Formation" title={course.title} image="/img/fond1.jpg" text={course.description} />
      <section className="section"><div className="container" style={{ maxWidth: 780 }}>
        {!student && <p className="center"><Link className="btn btn-navy" href="/lms/login?mode=signup">Créer un compte pour suivre ce parcours</Link></p>}
        {student && !enr && <form action={enroll} className="center"><input type="hidden" name="courseId" value={course.id} /><button className="btn btn-navy">M’inscrire à ce parcours</button></form>}
        {enr?.completedAt && <div className="card"><h3>Parcours terminé</h3><p>Félicitations. Votre certificat vous sera adressé par l’équipe de l’église.</p></div>}
        <ol className="stack" style={{ listStyle: 'none', padding: 0, marginTop: '1.5rem' }}>
          {course.lessons.map((l, i) => (
            <li className="card" key={l.id}>
              <h3>{i + 1}. {l.title} {done.has(l.id) && <small>(terminée)</small>}</h3>
              {enr ? <Link href={`/lms/${course.slug}/${l.id}`}>{done.has(l.id) ? 'Revoir' : 'Ouvrir la leçon'}</Link> : <small>Inscrivez-vous pour accéder</small>}
            </li>
          ))}
          {course.lessons.length === 0 && <li className="card"><p>Les leçons arrivent bientôt.</p></li>}
        </ol>
      </div></section>
    </>
  );
}
