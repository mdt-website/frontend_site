import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { requireUser } from '@/lib/auth';
import { can } from '@/lib/crm';
import { deleteCourse, deleteLesson, saveCourse, saveLesson } from '../../../actions';

export default async function CourseEdit({ params, searchParams }) {
  await requireUser(can.manageContent);
  const { id } = await params;
  const sp = await searchParams;
  const c = await db.course.findUnique({ where: { id }, include: { lessons: { orderBy: { position: 'asc' } } } });
  if (!c) notFound();
  return (
    <>
      <p><Link href="/admin/courses">← Tous les parcours</Link></p>
      <h1>{c.title}</h1>
      {sp.saved && <p className="adm__msg" role="status">Enregistré.</p>}
      {sp.error && <p className="adm__msg adm__msg--err" role="alert">Données invalides ou adresse déjà utilisée.</p>}
      <form action={saveCourse} className="adm__panel adm__form">
        <input type="hidden" name="id" value={c.id} />
        <div className="adm__row2">
          <div><label htmlFor="title">Titre *</label><input id="title" name="title" defaultValue={c.title} required /></div>
          <div><label htmlFor="slug">Adresse (/lms/…)</label><input id="slug" name="slug" defaultValue={c.slug} /></div>
        </div>
        <div><label htmlFor="description">Description</label><textarea id="description" name="description" rows={3} defaultValue={c.description} /></div>
        <div className="adm__row2">
          <div><label htmlFor="position">Ordre</label><input id="position" name="position" type="number" defaultValue={c.position} /></div>
          <div><label><input type="checkbox" name="published" defaultChecked={c.published} /> Publié</label></div>
        </div>
        <div><button className="adm__btn">Enregistrer</button></div>
      </form>

      <h2>Leçons</h2>
      {c.lessons.map((l) => (
        <form action={saveLesson} className="adm__panel adm__form" key={l.id}>
          <input type="hidden" name="id" value={l.id} /><input type="hidden" name="courseId" value={c.id} />
          <div className="adm__row2">
            <div><label>Titre *</label><input name="title" defaultValue={l.title} required /></div>
            <div><label>Vidéo YouTube (lien)</label><input name="videoUrl" defaultValue={l.videoUrl || ''} /></div>
          </div>
          <div><label>Texte (paragraphes séparés par une ligne vide)</label><textarea name="content" rows={4} defaultValue={l.content} /></div>
          <div className="adm__row2"><div><label>Ordre</label><input name="position" type="number" defaultValue={l.position} /></div></div>
          <div className="adm__bar"><button className="adm__btn">Enregistrer la leçon</button><button className="adm__btn adm__btn--ghost" formAction={deleteLesson}>Supprimer</button></div>
        </form>
      ))}
      <form action={saveLesson} className="adm__panel adm__form">
        <input type="hidden" name="courseId" value={c.id} />
        <strong>Ajouter une leçon</strong>
        <div className="adm__row2">
          <div><label htmlFor="nl-title">Titre *</label><input id="nl-title" name="title" required /></div>
          <div><label htmlFor="nl-video">Vidéo YouTube (lien)</label><input id="nl-video" name="videoUrl" /></div>
        </div>
        <div><label htmlFor="nl-content">Texte</label><textarea id="nl-content" name="content" rows={3} /></div>
        <div className="adm__row2"><div><label htmlFor="nl-pos">Ordre</label><input id="nl-pos" name="position" type="number" defaultValue={c.lessons.length + 1} /></div></div>
        <div><button className="adm__btn">Ajouter</button></div>
      </form>

      <form action={deleteCourse} className="adm__panel"><input type="hidden" name="id" value={c.id} /><button className="adm__btn adm__btn--ghost">Supprimer ce parcours</button></form>
    </>
  );
}
