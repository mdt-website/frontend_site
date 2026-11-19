import Link from 'next/link';
import { db } from '@/lib/db';
import { requireUser } from '@/lib/auth';
import { can, REQUEST_TYPES, SENSITIVE_TYPES } from '@/lib/crm';
import { fmtDateTime } from '@/lib/format';

export default async function Dashboard({ searchParams }) {
  const user = await requireUser();
  const sp = await searchParams;
  const sensitive = [...SENSITIVE_TYPES];
  const visible = can.seeSensitive(user) ? {} : { type: { notIn: sensitive } };
  const since = new Date(Date.now() - 30 * 24 * 3600_000);

  const [newReq, inProgress, people, subs, last, donationsPending, week] = await Promise.all([
    db.request.count({ where: { status: 'NEW', ...visible } }),
    db.request.count({ where: { status: 'IN_PROGRESS', ...visible } }),
    db.person.count(),
    db.subscriber.count(),
    db.request.findMany({ where: visible, orderBy: { createdAt: 'desc' }, take: 8, include: { person: true } }),
    can.seeDonations(user) ? db.donation.count({ where: { status: 'ANNOUNCED' } }) : Promise.resolve(null),
    db.request.count({ where: { createdAt: { gte: since }, ...visible } }),
  ]);

  return (
    <>
      <h1>Tableau de bord</h1>
      {sp.denied && <p className="adm__msg adm__msg--err">Accès refusé : cette section est réservée à un autre rôle.</p>}
      <div className="adm__stats">
        <div className="adm__stat"><strong>{newReq}</strong><span>Nouvelles demandes</span></div>
        <div className="adm__stat"><strong>{inProgress}</strong><span>En cours</span></div>
        <div className="adm__stat"><strong>{week}</strong><span>Demandes sur 30 jours</span></div>
        <div className="adm__stat"><strong>{people}</strong><span>Personnes (CRM)</span></div>
        <div className="adm__stat"><strong>{subs}</strong><span>Abonnés à la liste</span></div>
        {donationsPending !== null && <div className="adm__stat"><strong>{donationsPending}</strong><span>Dons à confirmer</span></div>}
      </div>
      <h2>Dernières demandes</h2>
      <div className="adm__scroll">
        <table>
          <thead><tr><th>Date</th><th>Type</th><th>Personne</th><th>Statut</th></tr></thead>
          <tbody>
            {last.length === 0 && <tr><td colSpan={4}>Aucune demande pour le moment.</td></tr>}
            {last.map((r) => (
              <tr key={r.id}>
                <td>{fmtDateTime(r.createdAt)}</td>
                <td><Link href={`/admin/requests/${r.id}`}>{REQUEST_TYPES[r.type] || r.type}</Link></td>
                <td>{r.person?.name}</td>
                <td><span className={`badge badge--${r.status}`}>{{ NEW: 'Nouvelle', IN_PROGRESS: 'En cours', DONE: 'Traitée', ARCHIVED: 'Archivée' }[r.status]}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
