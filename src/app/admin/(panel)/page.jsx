import Link from 'next/link';
import { db } from '@/lib/db';
import { requireUser } from '@/lib/auth';
import { can, REQUEST_TYPES, SENSITIVE_TYPES } from '@/lib/crm';
import { CAMPUSES } from '@/lib/campuses';
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

  const recent = await db.request.findMany({ where: { createdAt: { gte: new Date(Date.now() - 14 * 24 * 3600_000) }, ...visible }, select: { createdAt: true, type: true, campus: true } });
  const days = Array.from({ length: 14 }, (_, i) => { const d = new Date(Date.now() - (13 - i) * 24 * 3600_000); return { key: d.toISOString().slice(0, 10), label: d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }), n: 0 }; });
  const byType = {}; const byCampus = {};
  for (const r of recent) {
    const d = days.find((x) => x.key === r.createdAt.toISOString().slice(0, 10)); if (d) d.n++;
    byType[r.type] = (byType[r.type] || 0) + 1;
    byCampus[r.campus || 'calavi'] = (byCampus[r.campus || 'calavi'] || 0) + 1;
  }
  const max = Math.max(1, ...days.map((d) => d.n));
  const rank = (o, label) => { const e = Object.entries(o).sort((a, b) => b[1] - a[1]).slice(0, 6); const m = Math.max(1, ...e.map((x) => x[1])); return e.map(([k, n]) => ({ k, label: label(k), n, w: Math.round((n / m) * 100) })); };
  const types = rank(byType, (k) => REQUEST_TYPES[k] || k);
  const campuses = rank(byCampus, (k) => CAMPUSES[k]?.name || k);
  const hour = new Date().getUTCHours() + 1;
  const hello = hour < 12 ? 'Bonjour' : hour < 18 ? 'Bon après-midi' : 'Bonsoir';

  return (
    <>
      <h1>{hello}, {String(user.name || '').split(' ')[0]}</h1>
      <p className="adm__sub">Voici l’activité de la Maison de la Transformation.</p>
      {sp.denied && <p className="adm__msg adm__msg--err">Accès refusé : cette section est réservée à un autre rôle.</p>}
      <div className="adm__stats">
        <div className={`adm__stat${newReq ? ' adm__stat--alert' : ''}`}><strong>{newReq}</strong><span>Nouvelles demandes</span></div>
        <div className="adm__stat"><strong>{inProgress}</strong><span>En cours</span></div>
        <div className="adm__stat"><strong>{week}</strong><span>Demandes sur 30 jours</span></div>
        <div className="adm__stat"><strong>{people}</strong><span>Personnes (CRM)</span></div>
        <div className="adm__stat"><strong>{subs}</strong><span>Abonnés à la liste</span></div>
        {donationsPending !== null && <div className="adm__stat"><strong>{donationsPending}</strong><span>Dons à confirmer</span></div>}
      </div>
      <div className="adm__grid2">
        <div className="adm__panel"><h2>Demandes — 14 derniers jours</h2>
          <div className="adm__spark">{days.map((d) => <i key={d.key} title={`${d.label} : ${d.n}`} style={{ height: `${Math.max(3, (d.n / max) * 100)}%` }} />)}</div>
          <div className="adm__spark-x"><span>{days[0].label}</span><span>{days[13].label}</span></div>
        </div>
        <div className="adm__panel"><h2>Par type</h2>
          {types.length === 0 ? <p className="adm__sub">Pas encore de données.</p> : <ul className="adm__rank">{types.map((t) => <li key={t.k}><span>{t.label}</span><b>{t.n}</b><span className="bar"><em style={{ width: `${t.w}%` }} /></span></li>)}</ul>}
        </div>
        <div className="adm__panel"><h2>Par lieu</h2>
          {campuses.length === 0 ? <p className="adm__sub">Pas encore de données.</p> : <ul className="adm__rank">{campuses.map((t) => <li key={t.k}><span>{t.label}</span><b>{t.n}</b><span className="bar"><em style={{ width: `${t.w}%` }} /></span></li>)}</ul>}
        </div>
      </div>
      <h2>Dernières demandes</h2>
      <div className="adm__scroll">
        <table>
          <thead><tr><th>Date</th><th>Type</th><th>Personne</th><th>Statut</th></tr></thead>
          <tbody>
            {last.length === 0 && <tr><td colSpan={4} className="adm__empty">Aucune demande pour le moment.</td></tr>}
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
