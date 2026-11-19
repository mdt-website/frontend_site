import { db } from '@/lib/db';
import { requireUser } from '@/lib/auth';
import { can } from '@/lib/crm';
import { fmtDate } from '@/lib/format';
import { deleteSubscriber } from '../../actions';

export default async function Subscribers() {
  const user = await requireUser();
  const rows = await db.subscriber.findMany({ orderBy: { createdAt: 'desc' }, take: 500 });
  return (
    <>
      <h1>Abonnés à la liste de diffusion</h1>
      <div className="adm__bar"><a className="adm__btn adm__btn--ghost" href="/api/admin/export/subscribers">Exporter CSV</a></div>
      <div className="adm__scroll"><table>
        <thead><tr><th>Email</th><th>Inscrit le</th><th /></tr></thead>
        <tbody>
          {rows.length === 0 && <tr><td colSpan={3} className="adm__empty">Aucun abonné.</td></tr>}
          {rows.map((s) => (
            <tr key={s.id}><td>{s.email}</td><td>{fmtDate(s.createdAt)}</td>
              <td>{can.manageContent(user) && <form action={deleteSubscriber}><input type="hidden" name="id" value={s.id} /><button className="adm__btn adm__btn--ghost adm__btn--sm">Retirer</button></form>}</td></tr>
          ))}
        </tbody>
      </table></div>
    </>
  );
}
