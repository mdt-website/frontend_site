import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { requireUser } from '@/lib/auth';
import { can, DONATION_STATUS, REQUEST_TYPES, SENSITIVE_TYPES, STATUS } from '@/lib/crm';
import { fmtDate, fmtDateTime } from '@/lib/format';

export default async function PersonDetail({ params }) {
  const user = await requireUser();
  const { id } = await params;
  const p = await db.person.findUnique({
    where: { id },
    include: { requests: { orderBy: { createdAt: 'desc' } }, donations: { orderBy: { createdAt: 'desc' } }, attendance: { orderBy: { createdAt: 'desc' }, include: { service: true } } },
  });
  if (!p) notFound();
  const requests = can.seeSensitive(user) ? p.requests : p.requests.filter((r) => !SENSITIVE_TYPES.has(r.type));

  return (
    <>
      <p><Link href="/admin/people">← Personnes</Link></p>
      <h1>{p.name}</h1>
      <div className="adm__panel"><dl>
        <dt>Téléphone</dt><dd>{p.phone || '—'}</dd><dt>Email</dt><dd>{p.email || '—'}</dd>
        <dt>Quartier</dt><dd>{p.quarter || '—'}</dd><dt>Première interaction</dt><dd>{fmtDate(p.createdAt)} ({REQUEST_TYPES[p.source] || p.source || 'inconnue'})</dd>
      </dl></div>
      <h2>Demandes ({requests.length})</h2>
      <div className="adm__scroll"><table><thead><tr><th>Date</th><th>Type</th><th>Statut</th></tr></thead><tbody>
        {requests.length === 0 && <tr><td colSpan={3}>Aucune.</td></tr>}
        {requests.map((r) => <tr key={r.id}><td>{fmtDateTime(r.createdAt)}</td><td><Link href={`/admin/requests/${r.id}`}>{REQUEST_TYPES[r.type]}</Link></td><td><span className={`badge badge--${r.status}`}>{STATUS[r.status]}</span></td></tr>)}
      </tbody></table></div>
      {can.seeDonations(user) && <>
        <h2>Dons ({p.donations.length})</h2>
        <div className="adm__scroll"><table><thead><tr><th>Date</th><th>Nature</th><th>Montant</th><th>Statut</th></tr></thead><tbody>
          {p.donations.length === 0 && <tr><td colSpan={4}>Aucun.</td></tr>}
          {p.donations.map((d) => <tr key={d.id}><td>{fmtDate(d.createdAt)}</td><td>{d.nature}</td><td>{d.amount != null ? `${d.amount.toLocaleString('fr-FR')} FCFA` : '—'}</td><td><span className={`badge badge--${d.status}`}>{DONATION_STATUS[d.status]}</span></td></tr>)}
        </tbody></table></div>
      </>}
      <h2>Présences ({p.attendance.length})</h2>
      <div className="adm__scroll"><table><thead><tr><th>Culte</th><th>Date</th></tr></thead><tbody>
        {p.attendance.length === 0 && <tr><td colSpan={2}>Aucune.</td></tr>}
        {p.attendance.map((a) => <tr key={a.id}><td>{a.service.title}</td><td>{fmtDate(a.service.date)}</td></tr>)}
      </tbody></table></div>
    </>
  );
}
