import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { requireUser } from '@/lib/auth';
import { can } from '@/lib/crm';
import { saveSermon } from '../../../actions';

export default async function SermonForm({ params, searchParams }) {
  await requireUser(can.manageContent);
  const { id } = await params;
  const sp = await searchParams;
  const s = id === 'new' ? null : await db.sermon.findUnique({ where: { id } });
  if (id !== 'new' && !s) notFound();
  return (
    <>
      <p><Link href="/admin/sermons">← Sermons</Link></p>
      <h1>{s ? 'Modifier le sermon' : 'Nouveau sermon'}</h1>
      {sp.error && <p className="adm__msg adm__msg--err" role="alert">Vérifiez le titre, la date et le lien (doit commencer par http).</p>}
      <form action={saveSermon} className="adm__panel adm__form">
        {s && <input type="hidden" name="id" value={s.id} />}
        <div><label htmlFor="title">Titre *</label><input id="title" name="title" required defaultValue={s?.title} /></div>
        <div className="adm__row2">
          <div><label htmlFor="speaker">Prédicateur</label><input id="speaker" name="speaker" defaultValue={s?.speaker || 'Pasteur Herbert Donald'} /></div>
          <div><label htmlFor="date">Date *</label><input id="date" name="date" type="date" required defaultValue={s ? s.date.toISOString().slice(0, 10) : ''} /></div>
        </div>
        <div><label htmlFor="url">Lien vidéo (YouTube…) *</label><input id="url" name="url" type="url" required defaultValue={s?.url} /></div>
        <div><label htmlFor="audioUrl">Lien audio (optionnel)</label><input id="audioUrl" name="audioUrl" type="url" defaultValue={s?.audioUrl || ''} /></div>
        <div><label htmlFor="tags">Thèmes (séparés par des virgules : Grâce, Foi…)</label><input id="tags" name="tags" defaultValue={s?.tags} /></div>
        <label><input type="checkbox" name="published" defaultChecked={s ? s.published : true} /> Publié sur le site</label>
        <div><button className="adm__btn">Enregistrer</button></div>
      </form>
    </>
  );
}
