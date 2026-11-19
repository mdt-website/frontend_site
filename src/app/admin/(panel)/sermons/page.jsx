import Link from 'next/link';
import { db } from '@/lib/db';
import { requireUser } from '@/lib/auth';
import { can } from '@/lib/crm';
import { fmtDate } from '@/lib/format';
import { deleteSermon } from '../../actions';

export default async function SermonsAdmin() {
  await requireUser(can.manageContent);
  const rows = await db.sermon.findMany({ orderBy: { date: 'desc' } });
  return (
    <>
      <h1>Sermons</h1>
      <div className="adm__bar"><Link className="adm__btn" href="/admin/sermons/new">Ajouter un sermon</Link></div>
      <div className="adm__scroll"><table>
        <thead><tr><th>Date</th><th>Titre</th><th>Prédicateur</th><th>Thèmes</th><th>Publié</th><th /></tr></thead>
        <tbody>
          {rows.length === 0 && <tr><td colSpan={6}>Aucun sermon.</td></tr>}
          {rows.map((s) => (
            <tr key={s.id}><td>{fmtDate(s.date)}</td><td><Link href={`/admin/sermons/${s.id}`}>{s.title}</Link></td><td>{s.speaker}</td><td>{s.tags}</td><td>{s.published ? 'Oui' : 'Non'}</td>
              <td><form action={deleteSermon}><input type="hidden" name="id" value={s.id} /><button className="adm__btn adm__btn--danger adm__btn--sm">Supprimer</button></form></td></tr>
          ))}
        </tbody>
      </table></div>
    </>
  );
}
