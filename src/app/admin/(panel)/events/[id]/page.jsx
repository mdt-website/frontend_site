import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { requireUser } from '@/lib/auth';
import { can } from '@/lib/crm';
import { toInputDateTime } from '@/lib/format';
import { saveEvent } from '../../../actions';

export default async function EventForm({ params, searchParams }) {
  await requireUser(can.manageContent);
  const { id } = await params;
  const sp = await searchParams;
  const e = id === 'new' ? null : await db.event.findUnique({ where: { id } });
  if (id !== 'new' && !e) notFound();
  return (
    <>
      <p><Link href="/admin/events">← Événements</Link></p>
      <h1>{e ? 'Modifier l’événement' : 'Nouvel événement'}</h1>
      {sp.error && <p className="adm__msg adm__msg--err" role="alert">Titre et date sont obligatoires.</p>}
      <form action={saveEvent} className="adm__panel adm__form">
        {e && <input type="hidden" name="id" value={e.id} />}
        <div><label htmlFor="title">Titre *</label><input id="title" name="title" required defaultValue={e?.title} /></div>
        <div className="adm__row2">
          <div><label htmlFor="startsAt">Date et heure (Bénin) *</label><input id="startsAt" name="startsAt" type="datetime-local" required defaultValue={toInputDateTime(e?.startsAt)} /></div>
          <div><label htmlFor="location">Lieu</label><input id="location" name="location" defaultValue={e?.location || ''} /></div>
        </div>
        <div><label htmlFor="description">Description</label><textarea id="description" name="description" rows={4} defaultValue={e?.description || ''} /></div>
        <label><input type="checkbox" name="published" defaultChecked={e ? e.published : true} /> Publié sur le site</label>
        <div><button className="adm__btn">Enregistrer</button></div>
      </form>
    </>
  );
}
