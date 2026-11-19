import Link from 'next/link';
import { db } from '@/lib/db';
import { requireUser } from '@/lib/auth';
import { can, DONATION_STATUS } from '@/lib/crm';
import { fmtDateTime } from '@/lib/format';
import { setDonationStatus } from '../../actions';

export default async function Donations() {
  await requireUser(can.seeDonations);
  const rows = await db.donation.findMany({ orderBy: { createdAt: 'desc' }, take: 200, include: { person: true } });
  const confirmed = rows.filter((d) => d.status === 'CONFIRMED').reduce((s, d) => s + (d.amount || 0), 0);
  return (
    <>
      <h1>Dons</h1>
      <p className="adm__msg">Total confirmé (200 derniers) : <strong>{confirmed.toLocaleString('fr-FR')} FCFA</strong>. Les dons sont annoncés par les fidèles : confirmez-les après vérification du paiement reçu.</p>
      <div className="adm__bar"><a className="adm__btn adm__btn--ghost" href="/api/admin/export/donations">Exporter CSV</a></div>
      <div className="adm__scroll"><table>
        <thead><tr><th>Date</th><th>Personne</th><th>Nature</th><th>Montant</th><th>Moyen</th><th>Statut</th><th /></tr></thead>
        <tbody>
          {rows.length === 0 && <tr><td colSpan={7}>Aucun don annoncé.</td></tr>}
          {rows.map((d) => (
            <tr key={d.id}>
              <td>{fmtDateTime(d.createdAt)}</td>
              <td>{d.person ? <Link href={`/admin/people/${d.person.id}`}>{d.person.name}</Link> : '—'}</td>
              <td>{d.nature}</td><td>{d.amount != null ? `${d.amount.toLocaleString('fr-FR')} FCFA` : '—'}</td><td>{d.method || '—'}</td>
              <td><span className={`badge badge--${d.status}`}>{DONATION_STATUS[d.status]}</span></td>
              <td>
                <form action={setDonationStatus} style={{ display: 'flex', gap: '.4rem' }}>
                  <input type="hidden" name="id" value={d.id} />
                  {d.status !== 'CONFIRMED' && <button name="status" value="CONFIRMED" className="adm__btn adm__btn--sm">Confirmer</button>}
                  {d.status !== 'REJECTED' && <button name="status" value="REJECTED" className="adm__btn adm__btn--ghost adm__btn--sm">Rejeter</button>}
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table></div>
    </>
  );
}
