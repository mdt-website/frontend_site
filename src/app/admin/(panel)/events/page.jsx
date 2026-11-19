import Link from 'next/link';
import { db } from '@/lib/db';
import { requireUser } from '@/lib/auth';
import { can } from '@/lib/crm';
import { fmtDateTime } from '@/lib/format';
import { deleteEvent } from '../../actions';

export default async function EventsAdmin() {
  await requireUser(can.manageContent);
  const rows = await db.event.findMany({ orderBy: { startsAt: 'desc' } });
  return (
    <>
      <h1>Événements</h1>
      <div className="adm__bar"><Link className="adm__btn" href="/admin/events/new">Ajouter un événement</Link></div>
      <div className="adm__scroll"><table>
        <thead><tr><th>Date</th><th>Titre</th><th>Lieu</th><th>Publié</th><th /></tr></thead>
        <tbody>
          {rows.length === 0 && <tr><td colSpan={5}>Aucun événement.</td></tr>}
          {rows.map((e) => (
            <tr key={e.id}><td>{fmtDateTime(e.startsAt)}</td><td><Link href={`/admin/events/${e.id}`}>{e.title}</Link></td><td>{e.location}</td><td>{e.published ? 'Oui' : 'Non'}</td>
              <td><form action={deleteEvent}><input type="hidden" name="id" value={e.id} /><button className="adm__btn adm__btn--danger adm__btn--sm">Supprimer</button></form></td></tr>
          ))}
        </tbody>
      </table></div>
    </>
  );
}
