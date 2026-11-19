import Link from 'next/link';
import { db } from '@/lib/db';
import { requireUser } from '@/lib/auth';
import { can } from '@/lib/crm';
import { saveCourse } from '../../actions';

export default async function Courses({ searchParams }) {
  await requireUser(can.manageContent);
  const sp = await searchParams;
  const rows = await db.course.findMany({ orderBy: { position: 'asc' }, include: { _count: { select: { lessons: true, enrollments: true } } } });
  return (
    <>
      <h1>Formation en ligne</h1>
      {sp.error && <p className="adm__msg adm__msg--err" role="alert">Titre invalide ou adresse déjà utilisée.</p>}
      <form action={saveCourse} className="adm__panel adm__form">
        <div className="adm__row2">
          <div><label htmlFor="title">Nouveau parcours *</label><input id="title" name="title" required placeholder="École des membres" /></div>
          <div><label htmlFor="description">Description</label><input id="description" name="description" /></div>
        </div>
        <div><button className="adm__btn">Créer le parcours</button></div>
      </form>
      <div className="adm__scroll"><table>
        <thead><tr><th>Parcours</th><th>Leçons</th><th>Inscrits</th><th>État</th></tr></thead>
        <tbody>
          {rows.length === 0 && <tr><td colSpan={4} className="adm__empty">Aucun parcours.</td></tr>}
          {rows.map((c) => (
            <tr key={c.id}>
              <td><Link href={`/admin/courses/${c.id}`}>{c.title}</Link></td><td>{c._count.lessons}</td><td>{c._count.enrollments}</td>
              <td><span className={`badge ${c.published ? 'badge--DONE' : 'badge--ARCHIVED'}`}>{c.published ? 'Publié' : 'Brouillon'}</span></td>
            </tr>
          ))}
        </tbody>
      </table></div>
    </>
  );
}
