import Link from 'next/link';
import Hero from '@/components/Hero';
import { db } from '@/lib/db';
import { getStudent } from '@/lib/auth';
import { studentLogout } from './actions';

export const metadata = { title: 'Formation en ligne', description: 'Apprenez et grandissez dans la foi, où que vous soyez.' };
export const dynamic = 'force-dynamic';

export default async function Page() {
  const student = await getStudent();
  const [courses, enrolled] = await Promise.all([
    db.course.findMany({ where: { published: true }, orderBy: { position: 'asc' }, include: { _count: { select: { lessons: true } } } }),
    student ? db.enrollment.findMany({ where: { studentId: student.id } }) : [],
  ]);
  const byCourse = new Map(enrolled.map((e) => [e.courseId, e]));
  return (
    <>
      <Hero eyebrow="Formation en ligne" title="Grandir dans la foi," accent="à votre rythme" text="Des parcours pour former des disciples et des leaders, disponibles à tout moment." image="/img/fond1.jpg">
        <div className="btn-row" style={{ justifyContent: 'center' }}>
          {student
            ? <form action={studentLogout}><span style={{ marginRight: '1rem' }}>Connecté : {student.name}</span><button className="btn btn-outline">Déconnexion</button></form>
            : <><Link className="btn btn-gold" href="/lms/login?mode=signup">Commencer</Link><Link className="btn btn-outline" href="/lms/login">Se connecter</Link></>}
        </div>
      </Hero>
      <section className="section"><div className="container">
        <div className="grid g3">
          {courses.map((c) => {
            const e = byCourse.get(c.id);
            const done = e ? JSON.parse(e.done || '[]').length : 0;
            return (
              <div className="card" key={c.id}>
                <h3>{c.title}</h3>
                <p>{c.description}</p>
                <p><small>{c._count.lessons} leçon{c._count.lessons > 1 ? 's' : ''}{e ? ` · ${done}/${c._count.lessons} terminées` : ''}{e?.completedAt ? ' · Parcours terminé' : ''}</small></p>
                <div className="btn-row"><Link className="btn btn-navy" href={`/lms/${c.slug}`}>{e ? 'Continuer' : 'Découvrir'}</Link></div>
              </div>
            );
          })}
          {courses.length === 0 && <div className="card"><h3>Bientôt disponible</h3><p>Les premiers parcours (École des membres, Discipulat, Formation au leadership) arrivent prochainement.</p></div>}
        </div>
      </div></section>
    </>
  );
}
